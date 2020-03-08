---
title: Introduction to Javascript
published: false
description: Introduction to javascript
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: beginners, webdev, javascript, career
---
# Introduction to Javascript

## Summary
# Introduction to Javascript
- What is Javascript ?
  * high level
  * interpreted programming language -- now JIT (Just in time compiled)
  * dynamic language
  * prototype based
  * multi paradigm
  * single threaded
  * with ++non blocking event loop
  * History
- Specification
  * Truthy/Falsy
- Run your first javascript program
  * Where does this run ?
- Closing notes
  * What I like about Javascript
  * What I dislike about Javascript
  * Useful resources
  
  
## Presentation notes
### Who am I ?
- Babacar Cissé DIA
- Software engineer (6 years)
- Senior Developer (4 years)
- Full time problem solver
  * Whenever a problem occurs, there is a solution
  * if there is no solution then there is no problem

### This talk
Interactive
  * Stop me if there is anything you would like me elaborate more
  * I speak fast
  * If we reach the end of this talk and you've no question that means:
    - you got it all (you're experts already) 
    - you did not got a dime
### Your background ?
You know a bit about programming (python)
  * who are you ?
  * why are you attending this talk ?
  * what are your expectations ?



## What is Javascript ?
### high level
- abstraction or simplification that the language provide over the computer hardware
- Otherwise you would know about memory allocation, CPU, Thread to run your program. Lowest level is machine code or byte code (set of 0 and 1)
    
### interpreted programming language -- now JIT (Just in time compiled)
- Interpreted
  * need of an interpreter that convert every instruction one by one as your program goes
- Compiled
  * analyze all your code in advance and turn it down to a binary (.exe, .sh, ...) that can run on the machine 
### dynamic language
- Dynamic weakly typed language
No explicit type declaration just like in Python.
The type is associated with the runtime value. Once your program starts, the language is able to squeeze the type of the value
```java
  String welcome = "Hello world";
  public final static bar = 34;
```

```js
  let welcome = 'Hello world';
  const bar = 34;
```

### prototype based
Boring stuff I hope you won't need to know unless you're in charge of maintaining legacy code. So I'll skip for now.
My purpose is to give you the latest way to write JS since you're the new generation. Then you can walk your way back in the past to learn how to understand legacy code if you ever have to deal with it

### multi paradigm
You can use Imperative or Object oriented programming
```js
// The following below is pseudo code

// Server update
// - Imperative
const updates = findNewSoftwares()
const localSoftwares = System.softwares
// find


// - Object Oriented
const salade = Salade.fromProvider()
const meat = Meat.fromProvider()
const hamburger = compose(meat, bun, salade)
```

### single threaded
Javascript can only do one single task at a time
Try running 
```js
  white (true) {}
  // this line will never run
  console.log('hello are you here ?')
```

### with ++non blocking event loop
Single threaded so how to do multiple tasks ? We expect multi tasking from a computer
// listening to the music while running your idea when coding and terminal opened as well
```js
while (queue.waitForMessage()) {
  quue.process.NextMessage();
}
```

This is why javascript is non blocking since all it does is listen to events and handle it with callback. It is not actually waiting for the return value of a function. Oversimplification here but just know that the event loop handles events in this order:
1. Run sync code
2. Run promise or microtask callbacks
3. Run async task callbacks 


### History
- Mocha => LiveScript => Javascript (1995) to make it sound like a cousin of the famous programming language of the time
- Microsoft built JScript != Javascript 1996
- Ecma (European Computer Manufacturer Association [1961]) as Standard for Javascript since 1997
  * [insert:puzzle peace not fitting]
  This first version missed a lot of things: try catch bloc
  * ECMA 1999
  * 2000 - ES4 => ActionScript then died 
  * 2000 - ES3.1
  * 2008 V8
  * 2009 NodeJs - server side Javascript
  * 2009 ES5
  * 2010 Backbone - AngularJS
  Making the DOM manipulations smoother
  * 2015 ES6
  Every ES version added new set of features to the language but older browser does not support them. This is where transcompiler comes into place (Babel/Typescript)
  * ES2019
  * WebAssembly as a lower level of building web application
  WebAssembly lowest level after bytecode
## Spec
You don't need to know all to run your first javascript program
- Primitives
  * Boolean
  * Undefined: missing value
  * Null: represent empty value
  * Number
  * BigInt
  * String
  * Symbol
- Object
  * all the previous primitives are in fact objects
  * you can make your own objects
  
### Truthy/Falsy
Falsy values: false, 0, '', null, undefined
all that is not Falsy
`Note`: Be aware that 
```js
  if (0) {
    doSomething() // will never run
  }
  // as well as all falsy values
```
C-like so
- conditions: if, switch
- logical operators: &&, ||
- loops: for, while
- try catch bloc
you can use triple equal to get force type comparison
```js
const A = 34 == '34' // true 
const B = 34 === '34' // false
``` 

## Run your first javascript program
### Where does this run ?
You need an interpreter remember.
- NodeJS 
  * Install nodejs on your computer
  * create a file (whatever the name you want) index.js with
  ```js
    console.log("hello world")
  ```
  * run `node index.js`
- Or use your browser console. F12 to open the developer function
- Or include it in a html file with
```html
<script src="index.js"/>
```

## What I like about Javascript
## What I dislike about Javascript
- interpreted which mean if there is an error somewhere in your code you may not find it even on production
```js
function average (notes) {
  if (notes.length == 0) {
    throw Error("Can't divide by 0")
  }
  var stack = 0
  for (var i=0; i<notes.length; i++) {
    stack += notes[i]
  }
  const sum = stack
  const sum = notes.reduce((acc, note) => note + acc, 0)
  return sum / notes.length
}

average([10,12,16]) // 14
average([]) // throw error: can't divide by 0
```

## Closing notes

### Useful resources
- Javascript: How it's made ?https://www.youtube.com/watch?v=Sh6lK57Cuk4&list=PL0vfts4VzfNixzfaQWwDUg3W5TRbE7CyI
