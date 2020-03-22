---
title: ExpressJS guards, middlewares and policies
published: false
description: What to use as guard for your NodeJS applications
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: beginners, webdev, tutorial, productivity
---
# ExpressJS guards, middlewares and policies
or What to use as guard for your NodeJS applications

HTTP is stateless so we need a way to know which user is asking for a resource.
Say welcome to token header
- Authorization: Basic $username:$password
- Authorization: Bearer $token
- Authorization: JWT $token
- You can even go with a brand new fancy header like: My-awesome-header: $token but wouldn't be a standard.

Middlewares in ExpressJS are chains of functions called to process user request.
bar ==> foo ==> baz
each of this middleware can: alter both of the request & response or end the request by sending data.

In this article, we'll learn how to guard an express route using middleware then policy or both.

## Middlewares
First with auth middleware. I think we all are familiar with this one. But nevertheless code sample below
### Auth middleware
This version of mine allows you to tweak your middleware as you wanted. For instance you can need to have the auth user but do not require to redirect if there is no user logged in.
```typescript
import {NextFunction, Request, Response} from "express";
import UserRepository from "../repository/UserRepository";
import AuthenticationException from '../exception/AuthenticationException';
import AppException from "../exception/AppException";


const getHeaderToken = (request: Request) => {
  if (request.headers.authorization) {
    const parts = request.headers.authorization.split(" ")
    const [_, token] = parts
    return token
  }
  return null
}

const getCookieToken = (request: Request) => {
  return request.cookies.token
}

const getUserFromSession = async (request: Request) => {
  // @ts-ignore
  const {userUuid} = request.session
  if (!userUuid) {
    return null
  }
  const users = await UserRepository.findAll({
    uuid: userUuid
  })
  return users[0]
}


/**
 *
 * @param {object} options
 * @param {boolean} [options.required=true]
 */
export default function authMiddleware (options = {required: true}) {
  return async (request: Request, response: Response, next: NextFunction) => {
    // get user from cookie or authorization header
    // TODO: check if token matching session

    let user
    try {
      // user = await getUserFromSession(request)
      // console.log('got user from session %o', user)
      const token = getCookieToken(request) || getHeaderToken(request)
      if (options.required && !token) {
        throw new AuthenticationException()
      }
      const users = await UserRepository.findAll({
        api_token: token
      })
      if (options.required && users.length === 0) {
        throw new AppException({status: 419, message: "No user found for this API token"})
      }
      user = users[0]
      request.user = user
      response.locals.authUser = request.user
      console.log('request user %o', user)
      next()
    } catch (error) {
      console.log('auth middleware error', error)
      request.user = user
      response.locals.authUser = request.user
      console.log('request user %o', user)
      next(error)
    }
  }
}

```
Then with role middleware

## Policy
- permissions: add, edit, delete, view, view all
- used for this project: https://neptune-store.now.sh


## Conception
- class with static methods representing a permission (or action)
  * take authUser and the resource as parameters
  * would have loved it be static but seems like static can't be type ts`AppPolicy <U, T>`. Any way around? please let me know in the comments below

```ts
class AppPolicy<U,T> {
  view (user: U, T)
}
```
