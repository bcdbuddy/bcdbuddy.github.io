# Twitter bot
- Bots in general ?
- usage ?
- build bot that will retweet topics that matter to me
- subscribe to hashtag or word that you like
- get tweets on a custom feed (list ? retweet ?)
```js
var retweet = function () {
    var params = {
        q: '#100DaysOfCode, #301DaysOfCode, #JavaScript, #PHP, #NodeJs', // Hashtags to search tweets within
        result_type: 'recent',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function (err, data) {
        if (!err) {
                var retweetId = data.statuses[0].id_str;
                Twitter.post('statuses/retweet/:id', {
                    id: retweetId
                }, function (err, response) {
                    if (response) {
                        console.log('Retweeted!!!');
                    }
                    if (err) {
                          console.log(err);
                        console.log('Problem when retweeting. Possibly already retweeted this tweet!');
                    }
                });
        }
        else {
            console.log('Error during tweet search call');
        }
    });
};
```
- resource: https://www.codewall.co.uk/twitter-bot-tutorial-retweet-nodejs/?utm_source=babacarcissedia@twitter&utm_medium=social