
## Push notifications on mobile
Here we're working with an Android app (kotlin) backed by an ExpressJS server (nodejs/typescript)
### Outline
- Create a pusher account
  * what is pusher ?
  * get credentials (appId, appKey, cluster)
- Server: initialize and emit event
- App: listen to event and display notification
```kotlin
private fun setUpPusher(authUser: User) {
        val options = PusherOptions()
        options.setCluster(BuildConfig.PUSHER_CLUSTER)
        val pusher = Pusher(BuildConfig.PUSHER_KEY, options)
        pusher.connect(object : ConnectionEventListener {
            override fun onConnectionStateChange(change: ConnectionStateChange) {
                Log.i("Pusher", "State changed from $change.previousState to $change.currentState")
            }

            override fun onError(message: String, code: String,e: Exception) {
                Log.e("Pusher", """
                 There was a problem connecting! 
                 code: $code
                 message: $message
                 Exception: $e
                 """.trimIndent()
                )
            }
        }, ConnectionState.ALL)

        // this is the global channel. Will be useful for global event
        // val channel: Channel = pusher.subscribe(BuildConfig.PUSHER_CHANNEL)

        // this is a user specific channel
        val privateChannel = BuildConfig.PUSHER_USER_CHANNEL.replace(":user", authUser.id)
        val channel: Channel = pusher.subscribe(privateChannel)
        channel.bind("order.new", { event ->
            Log.i("Pusher", "Received event order.new with data: $event")
            val payload = JSONObject(event.data)
            val message = payload.getString("message")
        })
        channel.bind("order.ready", { event ->
            Log.i("Pusher", "Received event order.ready with data: $event")
            val payload = JSONObject(event.data)
            val message = payload.getString("message")
            val order = payload.getJSONObject("order")
            val orderId = order.getString("id")
            runOnUiThread {
                messageSuccess(String.format("%s for order id %s", message, orderId))
            }
        })
    }
```
- First problem: user won't receive notification when app is closed
To solve this we can spin a service that would be running as long as user is registered. That service would run in the background, even when the app is not opened just like you are receiving a notification when someone shoot you a DM on twitter, facebook or instagram
- Wrap up
  * Here we're using it just to display a notification:
    - to the restaurant manager when an order has been passed
    - to the customer when the order has been processed and ready
Keep in mind that we could've used pusher for real time purpose. Examples:
- real time chat like whatsapp,
- create/update data and show it live as it is happening
- update UI accordingly that way user won't have to refresh to see the changes
