---
title: Image lazy loading and their implications your SEO score
published: false
description: Image lazy loading and their implications your SEO score
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: seo, webdev, tutorial, javascript
---
This is part of a series: [Lazy load them all](/lazy_load_them_all)

# Image lazy loading
If you are always trying to reduce load time 10ms to 100ms, if optimizing your algorithms is important to you then this is for you because today I will be sharing with you how you can enhance your UI/UX by lazy loading your image
![](about_example.gif)
![](portfolio_example.gif)

This can be part of 
- _Be at the top of your SEO game_
- _Your SEO rank performance +10_
- _Image lazy loading and their implication_

## Summary
- how image are fetched ?

## how images are fetched ?
- get a page
[insert:visual]
[insert:visual] as graph
- browser gets sub resources (css, js, img) for you 
[insert:visual] as graph
[insert:visual]

[insert:page: ten sections page]

Sum up: You are asking for one page but you're doing (10 + 1) network requests

## First improvement attempt
- defer, async


 # Intro
Defer or loading the image content of our site can improve our first render
- improve load time 
  * bots care about content and how fast it is delivered
  * first paint, first meaningful paint
  * important for SEO
  

# How to ?
Load the image only when needed, only when image come into view. No need to load something we may not need.

## Listener to window scroll
- not viable solution. Too much computing
```js
// get the elements once page loads
let $elements = document.querySelectorAll('.element')

window.addEventListener('scroll', () => {
  $elements.forEach($element => {
    if ($element.getBoundingClientRect().top < window.innerHeight) {
      // element is visible
      $element.setAttribute('src', $element.getAttribute('data-src'))
      $element.addEventListener('load', () => {
        // element is now available
        // add class for nice css transition
      })
      $element.addEventListener('error', () => {
        // may be interesting to catch this error when network image is not available or failed to load for any server issue
      })
      $element.removeAttribute('data-src')
    }
    
  })
})
```
## Listener to window scroll - improvement
Debounce listener to scroll. 


## Use Web api new InteractionObserver
Realize that even when all image are loaded, we are still listening to the window scroll. This is when interaction observer come in handy
[with interaction observer](https://www.youtube.com/watch?v=aUjBvuUdkhg)

```js
  const defaultOptions = {
    attribute: 'data-src',
    onVisibleClass: 'visible',
    removeOnVisible: true,
  }
  options = Object.assign({}, defaultOptions, options)

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // element is visible
        const element = entry.target
        const src = element.getAttribute(options.attribute)
        element.setAttribute('src', src)
        element.classList.add(options.onVisibleClass)
        if (options.removeOnVisible) {
          observer.disconnect()
        }
      }
    })
  })

  const $element = options.selector instanceof HTMLElement ? options.selector : document.querySelector(options.selector)
  io.observe($element)
```

# Wrap up
- pros
  * improve first render time
- cons
  * UI wise problem: flickering
    - reflow coming from image render. Image is taking space it did not have in first place since it had no width nor height
  * solution needs javascript
    - no javascript then you're content won't show


[Lazy load them all](lazy_load_them_all/index.md)
