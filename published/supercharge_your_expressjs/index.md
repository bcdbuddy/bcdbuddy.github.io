# Supercharge your expressJs Views
On the following few lines, I want to share with you how I added mixins to my expressjs application.

# Add mixins to your views
- Mix from laravel-mix (if you're from php world you know what I am saying)
With laravel and mix, you're very likely to have the following snippets in your code base:
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/2mh24xhvgwgwryrysykv.png)

Yes this is Pug (ex jade) syntax

## Explanation of express mix helper
You are most likely asking yourself where the hell this `mix` method is coming from so here it is.
![WTH meme](https://media.giphy.com/media/3oEjHOezvV1v2GN07S/giphy.gif)

TLDR;
```js
  this.app.locals.mix = (filename) => {
    const fileObject = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/mix-manifest.json'), 'utf8'))
    const requestedFilename = fileObject[filename]
    if (!requestedFilename) {
      throw new Error(`${filename} not found in mix manifest. Manifest: ${JSON.stringify(fileObject, null, 2)}`)
    }
    return requestedFilename
  }
```

I read the file outputed by webpack on build
```js
  const fileObject = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/mix-manifest.json'), 'utf8'))
```

then I return the value matching to the key which is the filename in our case
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/bykyuvc2n7pabko3x1ee.png)
```js
    const requestedFilename = fileObject[filename]
    return requestedFilename
```

Raise server error in case the file is not there. Should not happen but hey you never know when things can go wrong ![meme:dont-know](https://media.giphy.com/media/U6Fxnc2jTlBh2GKCTU/giphy.gif)
```js
    if (!requestedFilename) {
      throw new Error(`${filename} not found in mix manifest. Manifest: ${JSON.stringify(fileObject, null, 2)}`)
    }
```


# Wrap up
Now you have some a nice helper function serving the latest build of webpack with a content hash to be fully efficient cache wise.
You're welcome!
