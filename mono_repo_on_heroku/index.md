---
title: Heroku mono repo deploy
published: false
description: Deploy a mono repo on Heroku for free following the steps below
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: beginners, webdev, tutorial, career
---
# Heroku mono repo deploy
In this one we will deploy a blog that has as ReactJS as front end and ExpressJS for the back end.
- respository available at https://github.com/kouna77/blog

## TL;DR
- Create a bunch of Heroku apps.
- For each app, set APP_BASE=relative/path/to/app/root, and of course: heroku buildpacks:add -a <app> https://github.com/lstoll/heroku-buildpack-monorepo
For each app, git push git@heroku.com:<app> master

source: instruction available at: https://elements.heroku.com/buildpacks/lstoll/heroku-buildpack-monorepo

## Summary
- 