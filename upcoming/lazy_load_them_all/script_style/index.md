This is part of a series: [Lazy load them all](/lazy_load_them_all)

# Scripts & Styles lazy loading

## Lazy loading in general
- Definition on the [series intro](/lazy_load_them_all)
- Helper to lazy load anything
```js
import hash from 'object-hash'
/**
 * Idempotent lazy load script
 * @param {object} options
 * @param {string} [options.type]
 * @param {string} [options.id]
 * @returns {Promise}
 */
export function lazyLoad (options) {
  return new Promise((resolve, reject) => {
    if (!options.type) {
      return reject(new Error('LazyLoad is expecting { type: string } as argument'))
    }
    if (!options.id) {
      options.id = `${options.type}${hash(options)}`
    }
    let element = document.querySelector(`#${options.id}`)
    if (element) {
      console.warn(`Element ${options.type} you are trying to lazy load already exists with id = ${options.id}`)
      return resolve(element)
    }
    element = document.createElement(options.type)
    Object.keys(options).forEach(key => {
      if (key !== 'type') {
        element.setAttribute(key, options[key])
      }
    })
    element.addEventListener('load', () => {
      resolve(element)
    })
    element.addEventListener('error', (e) => {
      reject(e)
    })
    document.body.append(element)
  })
}
```

## Scripts
```js

/**
 * @param options
 * @returns {Promise}
 */
export function lazyLoadScript (options) {
  return lazyLoad({
    type: 'script',
    ...options
  })
}

```
## Styles
```js
/**
 * @param options
 * @returns {Promise}
 */
export function lazyLoadCss (options) {
  return lazyLoad({
    rel: 'stylesheet',
    type: 'link',
    ...options
  })
}
```

## Perspectives
* Todo:
    - Use an element on the page to know when to load the
* Alternatives
    - prefetch `<link rel="prefetch" href="<$your-resource>"/>` 

## Wrap up
Note that the `lazyLoad` function we defined above can be used to lazy load anything you want ie video, audio and so on. 
Page loads matter, as well as other metrics such as:
- first contentfull paint
Those metrics would make or break your user experience. Improving them could set you apart from your competition.
