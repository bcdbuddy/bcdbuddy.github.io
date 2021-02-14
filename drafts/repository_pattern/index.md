---
title: Design pattern - repository
published: false
description: Separation of data layer with repository pattern
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: javascript, typescript, tutorial, database
---
# Design pattern: repository

# Summary
- What is a design pattern ?
- Design pattern repository
  * What ?
  * How ?
  * Why ?


## What is a design pattern ?
[insert:wikipedia definition]
Proven solution of recurrent developers' problem (from code architecture to best practices with names or stuff). See a design pattern as inheritance or advices from someone who has been through something and passing it down to you.
[insert:meme playing catch]


## Design pattern repository ?
### What ?
TODO

### How ?
TODO

...
Role 
- increase modularity and testability
Understanding its role let you see today why you need to adopt this design pattern to your day to day programming.


## How ? Repository pattern implementation 
### Front end (Javascript)
Most likely you are either using axios or fetch. If you have something else in your toolbox please let me know in the comment section.
For the following I will be using `axios`
A typical call would look like this
```js
  loading = true
  axios({
    url: 'https://your-domain.com/api/users',
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => doSomethingWith(response.data))
    .catch(error => handleError(error))
    .then(() => loading = false)
```

Imagine having to retrieve the list of users on a different file, you would duplicate this code snippet. Same goes if you just switch from axios to fetch.
```js
  // front end
  UserRepository.findAll()
    .then(users => )
```
With the design pattern repository you have a single signature handling all about the data and even more. When you 

### Back end (Typescript)
We all have a user model defined similarly like this for simplicity let's say we just have a email, name and password (hash of course) fields.
```ts
  interface IUser {
    email: string,
    name: string,
    password: string,
  }
```

Then 
```ts
  class UserRepository {
    static findAll(): Promise<IUser[]> {
      return new Promise((resolve, reject) => {
        Store.find({})
          .then((stores) => {
            resolve(stores)
          })
          .catch((error: Error) => reject(error))
      })
    }
  }
```

## Why ?
- Separation of data layer
This became important to me when on a project I decided to switch from MySQL to MondoDB. The switch went smoothly. I went from 
this

to this
The public API, interface used in controllers did not changed at all because of this separation.


## Where to go from here ?
- action classes
Supposing you know model view controller
Code from controller could be duplicated for both web, api, and script controller
```ts
// web controller
class UserController {
  create (request: Request, response: Response) {
    const user = (new CreateUser()).execute(request.body)
    response.render('user_created', { user })
  }
}
```

```ts
class ApiController {
  create (request: Request, response: Response) {
    const user = (new CreateUser()).execute(request.body)
    response.json({ user })
  }
}
```


// creating users for development purpose: fixtures
```ts
class ImportUsers {
  constructor (action: CreateUser) {
    this.action = action
  }

  execute (rows: []) {
    return rows.map(row => (new CreateUser()).execute(request.body))
  }
}
```