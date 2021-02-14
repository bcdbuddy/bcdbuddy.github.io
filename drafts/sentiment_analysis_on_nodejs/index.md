---
title: Sentiment analysis with nodejs
published: false
description: Sentiment analysis with nodejs 
cover_image: https://dev-to-uploads.s3.amazonaws.com/i/3733yv68c6z8ks460e0n.png
tags: node, machinelearning, webdev, javascript
---
# Sentiment analysis with nodejs
In this tutorial we will go through the different steps needed to somehow determine whether a sentence or paragraph is `positive`, `negative` or `neutral`

# Summary
- Sentiment Analysis as subfield of NLP
- Sentiment analysis with nodejs
  * The API specs
- Other use cases
- wrap up

# Sentiment Analysis as subfield of NLP
AI > NLP > Sentiment analysis

# Sentiment analysis with nodejs
We will be using expressjs framework with nodejs

Quick note: `I usually would do this in Typescript but for simplicity purpose we're going to stick with same old nodejs`

## The API specs
- we just want 

# Other use cases
- determine customer mood based on facial expression then recommend products accordingly to uplift mood

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Let me be evil. Couple it with some facial recognition system to analyse one’s mood (maybe when entering a specific building) and recommend them some product that can improve their mood?? <a href="https://t.co/ytVBD3bAEW">https://t.co/ytVBD3bAEW</a></p>&mdash; MLCissé 🇸🇳 🧡 (@lakhassane) <a href="https://twitter.com/lakhassane/status/1222479365604302849?ref_src=twsrc%5Etfw">January 29, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# Wrap up
Feel free to fork it, use it as you wish.
This is not a final or optimal version and should not, in any cases, be considered to be state of the Art in sentiment analysis. It was for educational purpose.
- Code is available at https://github.com/bcdbuddy/sentiment-analysis. 
- deployed at: https://prime-sentiment-analysis.herokuapp.com

TODO:
  - migrate to typescript
  - implement tests for both API and sentiment analysis with sample phrase
  - train a custom and better model

Useful resources:
