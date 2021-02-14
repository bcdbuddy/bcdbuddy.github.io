/**
 * @param {object} options
 * @param {string} [options.previewSelector]
 * @param {string} [options.onDecode]
 */
export const qrCodeDecoder = (options) => {
  const stop = () => {
    const video = this.$el.querySelector(options.previewSelector)
    const stream = video.srcObject
    if (stream) {
      const tracks = stream.getTracks()
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i]
        track.stop()
      }
    }
    video.srcObject = null
  }
  const start = async () => {
    const qr = new QrcodeDecoder();
    if (!qr.isCanvasSupported()) {
      console.log("Your browser doesn't match the required specs.");
      throw new Error("Canvas and getUserMedia are required");
    }
    const onSuccess = async (stream) => {
      const video = this.$el.querySelector(options.previewSelector)
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      const result = await qr.decodeFromCamera(video);
      const orderUuid = result?.data
      options.onDecode(orderUuid)
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
  return {
    stop,
    start
  }
}
