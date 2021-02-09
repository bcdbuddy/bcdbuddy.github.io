---
title: Product specs
published: false
description: How to build a thousand of followers in 90 days
cover_image: https://thepracticaldev.s3.amazonaws.com/i/deadbeef.png
tags: beginners, webdev, tutorial, career
---
# Product specs
## Summary
- User story
- Work item
- Backlog
- Contributing

## User story 
are just simple sentence describing what you want
ie 
> as a user, I can login to my account
> as a user, I can pay my order online

- Can be used by the different team on an organization. Managing team, marketing team as well as developers
- Can be used to speech the project. User stories are usually a good way to list out all the features. I usually decide on what to work on depending on the priority.

## Work item
user story can be small in term of efforts ie
> as an admin, I can see the delete/edit button

sometimes you can have other that require more efforts
> as a user, I can pay my order online
- setup payment processing (stripe, paypal, OrangeMoney, FreeMoney)
- design checkout flow UI (shopping cart, product listing, checkout form)

Work item should be small. Ideally work item is something that can start and finish the same day. What we don't want to have an issue that is too big to be reviewed. With size comes complexity, breaking changes, and so on


## Backlog
User story list constitute your backlog. You should then order your backlog by priority. Often it is driven by the value of the user story addition to the current product.
> if changing app logo is bringing more value than having checkout form working then it should be app logo change first

**Project manager or developers can order the user stories but does not dictate his will over the client wants.** 

We developers have that bad habits of putting our wants first before the clients ones.

## Contributing
- put together standards which can include linting so that the code base can be uniform.
- testing (unit, feature, integration, smoke) so that you can rely a bit more on your software. This is also allow incremental changes without breaking the previous features

### Contributing - Github
The rule of thumb is **one issue, one branch, one PR**

- The issue is the user story in general
- The branch is your little word where you are building the user story
- The PR is the request to have your implementation of the user story in the current product. You just need to mention `closes #issue-number` ie closes #110 Github will automatically close the issue when the PR is merged. Closing an issue is like marking it as done.
