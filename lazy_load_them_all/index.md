---
title: Lazy load them all
published: false
description: Lazy load them all: only load what you need by the time you need it
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: beginners, webdev, tutorial, productivity
---
# Lazy load them all
- Styles
- Scripts
- [Image](../image_lazy_loading/image_lazy_loading.md)

## General advices
- bundle your resources (css, js, img, fonts) in one file - If you're using font-awesome or glyphicons you can use sprite to group all your images 
- otherwise lazy load them - only load them when need

```js
```

## Wrap up
- pros
  * improve first render time
- cons
  * UI wise problem: flickering
    - reflow coming from image render. Image is taking space it did not have in first place since it had no width nor height
  * solution needs javascript
    - no javascript then you're content won't show
