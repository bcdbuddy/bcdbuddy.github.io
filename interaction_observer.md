# Interaction Observer

# Intro

# Use case
- lazy load image. See [the link](image-lazy-loading.md) for more.
- cool css transition when element appear or disappear
  * TODO: GIF from website about and resume
  * fade in when showing for the first time
```js
  const ratio = .1
  const options = {
  root: null,
  rootMargin: '0px',
  threshold: ratio
  }
  
  const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > ratio) {
        // $element is visible
        entry.target.classList.add('.visible')
        observer.unobserve(entry.target)
        // compare with method above observer.disconnect()
      }
    })
  }
  
  const observer = new IntersectionObserver(handleIntersect, options)
  const $elements = document.querySelectorAll('.appear')
  $elements.forEach($element => {
    observer.observe($element)
  })
```

# Note: if javascript is disabled
Be cautious though because if javascript is disabled on the browser the end user won't see the expected behavior

_Solution:_ Use a wrapping css class for before applying your custom behavior
```js
function onLoaded () {
  document.documentElement.classList.add('.appear-enabled')
}
// Method A:
window.addEventListener('load', onLoaded)

// Method B:
if (document.readyState === 'complete') {
  onLoaded()
} else {
  document.addEventListener('DOMContentLoaded', onLoaded)
}
```

```css
.appear-enabled .appear {

}
/* instead of */
.appear {
  
}

```
_I personally prefer Method B_


# Wrap up
You can see what we could take from Web API new feature (not so new) InteractionObserver without any heavy computing (window scroll)
