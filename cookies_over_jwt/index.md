---
title: Cookies over JWT
published: false
description: How to build a thousand of followers in 90 days
cover_image: 
tags: beginners, webdev, tutorial, career
---
Some common misconception I read is that 
> JWT is more secure for webapp

or
> I have to use JWT to authenticate my SPA 
# Summary
- Cookies vs JWT
- When to use JWT

- Reminder that you can use still use cookies to authenticate your SPA
- This means you don't always need JWT


# Cookies vs JWT
> JWT is not more secured

JWT token can be decrypted. So you should not store in it sensitive data.
Cookie is more secure because you can set the domain and make it http only so that Javascript can't mess with it.

# When to use JWT
Use JWT for shared or distributed architecture
Example: How a single account is used to authenticate all apps (google product)
