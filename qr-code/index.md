---
title: Implement a QR code
published: false
description: Generate and scan QR code 
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: vuejs, react, qrcode, javascript
---

# Summary
I've met some people saying weird stuff about QR code like:
> "saving a QR code in a database"

or 
> "it is safe 4to save data in a QR code"

I'm bringing some light on this topic.
After this, you should have a better understanding of what a QR code is and be able to generate & scan QR code right in the browser with only two libraries
- What is a QR Code ?
- How to write a QR code ?
- How to read a QR code ?
- Vanilla javascript implementation
- VueJS version
- React version


## What is a QR Code ?
Simply put, it is an image containing data that can be a URL, a contact card or any random text. In other words, a QR code is an encoded version of data.
> Keep in mind that encode is not encrypt. Which means everybody can see what information you put in a QR code.

## How to write a QR code ?
It is about decoding data from an image.
```bash
yarn add qrcode # (or npm i -S qrcode)
```

## How to read a QR code ?
It is about encoding data to an image in some way.
```bash
yarn add qrcode-decoder # (or npm i -S qrcode-decoder)
```

## Vanilla javascript implementation

## VueJS version
## React version
```vue
<template lang="pug">
  .qr-code
    video.order_qr-code__preview#order_qr-code__preview
    #result
    .form-actions
      button.button(@click="start") Start
      button.button(@click="stop") Stop
</template>

<script>
  import QrcodeDecoder from 'qrcode-decoder';
  import toast from '~/toast'
  import sweetConfirm from '~/sweet-confirm'

  export default {
    methods: {
      stop () {
        const video = this.$el.querySelector('#order_qr-code__preview')
        var stream = video.srcObject;
        if (stream) {
          var tracks = stream.getTracks();
          for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i]
            track.stop()
          }
        }
        video.srcObject = null
      },
      async start() {
        var qr = new QrcodeDecoder();
        if (!qr.isCanvasSupported()) {
          console.log("Your browser doesn't match the required specs.");
          throw new Error("Canvas and getUserMedia are required");
        }
        const onSuccess = async (stream) => {
          const video = this.$el.querySelector('#order_qr-code__preview')
          video.srcObject = stream
          video.addEventListener('loadedmetadata', () => {
            video.play()
          })
          const result = await qr.decodeFromCamera(video);
          const orderUuid = result?.data
          if (orderUuid && await sweetConfirm({
            text: `Do you want to open order ${orderUuid}`,
            confirmButtonText: 'Yes, open it'
          })) {
            window.location = `/order/${orderUuid}`
          }
        }
        const onFailure = (error) => {
          console.error(error)
          toast({
            type: 'error',
            title: 'Permission error',
            message: 'App needs to access your webcam to scan QR code'
          })
        }
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })
            .then(onSuccess)
            .catch(onFailure)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .order_qr-code__preview {
    width: 100%;
    height: 400px;
  }

</style>

```

# Wrap up
Browser is the new native
