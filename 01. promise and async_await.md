# Networking 
Networking operations take time and are common things that we need to do in nowadays applications where everything is dynamic and connected (shoutout to the graph community) 
(:Buddy)-[LOVES]->(graphs)

# Javascript
Javascript is single thread programming language and yet everything we do in the web tend to be blocking therefore we needed a way to make that happen: 
```html
  // 
  <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/JS?src=hash&amp;ref_src=twsrc%5Etfw">#JS</a> is called a &quot;high-level single-threaded, garbage-collected, interpreted (or just-in-time compiled),  prototype-based, multi-paradigm, dynamic language with a non-blocking event loop&quot;<br><br>thanks to <a href="https://t.co/TP7crsSdPA">https://t.co/TP7crsSdPA</a></p>&mdash; Buddy Prime (@babacarcissedia) <a href="https://twitter.com/babacarcissedia/status/1146362361558786048?ref_src=twsrc%5Etfw">July 3, 2019</a></blockquote>
  <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">For those who did not understand the event loop, here&#39;s an oversimplification:<a href="https://twitter.com/hashtag/Javascript?src=hash&amp;ref_src=twsrc%5Etfw">#Javascript</a> will run tasks in this order:<br>- synchonous code first<br>- Micro task queue (e.g Promise)<br>- async task callback task queue (e.g setTimeout)</p>&mdash; Buddy Prime (@babacarcissedia) <a href="https://twitter.com/babacarcissedia/status/1146362363102277633?ref_src=twsrc%5Etfw">July 3, 2019</a></blockquote>
  
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

If you have any doubts out that feel free to run this code. You'll be happy to notice that the page freezes and the mouse is not even moving
```js
  function codeBlocker () {
    let i = 0;
    while (i< Infinity) {
      i++
    }
  }
```

So as mentioned, Javascript is single thread and yet we manage to make it seem like it can do multiple stuff at a time. All of this is made possible by `The event looper`
Let's say you are visiting a blog like this one. It is very likely that you're fetching the `posts` list from somewhere but at the same time you don't want your script to hang there and waiting for the response before moving on to other things you're setting up.
```js
  // fetch posts
  fetch('https://my-awesome.blog/posts')
```
## Javascript - callback
- will run all synchronous code before 

## Javascript - Promise

## Javascript - Async/await
Async function returns a promise
### Async/await as solution to callback promise hell
TODO: example
### Be aware of async/await hell as well
TODO: example

## Async/await and Promise symbiose
Async/await is not a replacement for Promise It was meant to resolve a different problem. An asynchronous function returns a promise.

```js
  async function badSmoothie () {
    try {
      const a = getFruit('pineapple')
      const b = getFruit('strawberry')
      const smoothie = await Promise.all([a, b])
      return smoothie
    } catch (error) {
      console.error(error)
    }
  }
```

# Wrap up
- event loop run things in this order
  1. all sync code first
  1. then micro tasks come (Promise)
  1. callbacks

Once you get comfortable with the concepts exposed here you can take further by watching this video from [Fireship.io](https://www.youtube.com/watch?v=vn3tm0quoqE) then understand then there is this nice talk for a better understanding of [the event looper](https://youtu.be/cCOL7MC4Pl0)
That's it for now. Thank you for your attention. :peace:
