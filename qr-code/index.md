---
title: Implement a QR code
published: false
description: Generate and scan QR code 
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: vuejs, webdev, tutorial, javascript
---

# Summary
I've met some people saying weird stuff about QR code (like saving a QR code in a database)
After this article, you should have a better understanding of what a QR code is and be able to generate & scan QR code right in the browser with only two libraries


## Install
```bash
yarn add qrcode # (or npm i -S qrcode)
yarn add qrcode-decoder # (or npm i -S qrcode-decoder)
```
## Vanilla javascript version

## The vue component version
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
