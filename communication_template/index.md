# Build your own communication (email, sms) template component
From marketing, sale, or simple newletters, communication is key. 
If you would like to know how to send the same template content to an audience of people without having to manually type every single of them then you have come to the right place. Today I want to share with you how I built a template sms few weeks back. 

Opening note: `My sharings here are applicable to both email and sms but for email in particular I got more advance feature`

# Summary
- Objectives
- How it works ?
- Wrap up

# Objectives
- Send text content (email, sms) to a bulk of users
- populate for each and every user with their own data (name, order count, etc)

# How it works ?
- define a function js`send (content, recipient)`
- call it in a loop and you are done here. 
```js
  // const content = "Some random"
  // ... 
  [john, jane, alice, bob].forEach(recipient => send(content, recipient))
```
Congratulations!
[insert:meme:we're done here]
- [insert:meme:more seriously]
- But basically this is all you need

# Wrap up
Feel free to fork it and use it as you wish. I encourage you to do the Angular and React version