---
title: Typescript can't catch these errors
published: false
description: Typescript can't catch this error
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: beginners, tutorial, typescript, productivity
---
# Typescript can't catch these errors
Typescript can't catch these errors is problem for which my solution is Single parameter functions

## Summary
- Main reasons


## Main reasons
- evolutivity & maintenance
- named parameter
  * you know what to expect under which name
  * you can add one when you need to without disrupting the previous order
  In my express app I systematically send this response
  ```js
    class AppResponse {
      constructor (data, type, message) {
        // ...
      }
    }
  ```
  Two weeks into the projects I may forget which signature is the good one.
  I am using typescript but it can't catch this errors
  ```js

    // user retrieved from the database
    const user = {name: 'John Doe', email: 'john@doe.com'}

    const response = new AppResponse(user, 'success', 'You )
  ```
- bug prevention