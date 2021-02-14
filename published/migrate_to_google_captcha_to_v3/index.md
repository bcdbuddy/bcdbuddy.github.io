# google captcha migration to v3. No more "No, I am not a robot"

If you did not have one, you will need to create an app here:
![Google create](https://thepracticaldev.s3.amazonaws.com/i/eov1myobwez63y6sfva6.png)

- no more captcha. Verification happen under the hood 
    * before: 
    ![form before](https://thepracticaldev.s3.amazonaws.com/i/w96ce916rxbdksi7oskt.png)
    * after: 
    ![form after](https://thepracticaldev.s3.amazonaws.com/i/mhu8bid1zj2z23kynaua.png)

- You can check google answer 
![google response](https://thepracticaldev.s3.amazonaws.com/i/w7u61p2sks6ndakefbi2.png)
I consider action: "contactPage", score > .8 to be a valid request. You can use your own

You can give the user ip as optional param. (I don't. Google has already enough data on us)

The front end code ![front](https://thepracticaldev.s3.amazonaws.com/i/krhbftdk6a0q06nyruww.png)
The back end code ![back](https://thepracticaldev.s3.amazonaws.com/i/5db8l5a8h319m9th0w93.png)
Yes I am using @laravelphp.

I also added a new page /contacted to have a better reporting from google analytics conversion for specific goals. Don't worry I protected it, you can't access it except you are coming from the contact form ![twitter](https://thepracticaldev.s3.amazonaws.com/i/wuwarpdyrpc8nz8c8iqh.png)
Let me elaborate: Having a specific page where the user is being redirected is a good practice for analytics since you can then record the hits you are getting from that specific page (for me /contacted). You can have the same for user registration /registred

# Wrap up
It was amazingly fast. The migration v2 -> v3 is straightforward. So if you did not, go ahead it is less than 5min.
Next step for me is to add it on my login form as well.
Happy coding!

Resources:
- display: https://developers.google.com/recaptcha/docs/v3
- verify: https://developers.google.com/recaptcha/docs/verify/
