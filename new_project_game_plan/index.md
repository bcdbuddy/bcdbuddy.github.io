# Game plan for new project
There are couple of steps and actions that I take whenever I am building a new project. I am sharing with you my game plan.

## Summary
- Description and estimate
- Issue/ticket as work item
- Benefit of scoping tickets
- Backlog as group of tickets
- CI / CD pipeline

## Description and estimate
- Make a rough project description and estimate
  * client describe project
  * client give budget
  * We roughly estimate the project (budget, execution delay)
  * If that is matching client expectations then we elaborate to deliver a better estimate and schedule
This allows me to quickly weight the client as this will prevent both of us from losing time.

Example: Watson wants a million dollar project but only has $100k

## Issue/ticket as work item
You can see an issue as a result. The goal is have daily incremental progress. For that we keep issue scoped and small enough to be completed the same day. We create the issue with three sections:
- Scope
- Acceptance criteria
- Technical directions
![image](https://user-images.githubusercontent.com/17571380/107214630-12092480-6a02-11eb-9b35-49fb9dbd29ba.png)

## Backlog as group of work item
We define the backlog as collection of tickets (work items). We include everything we think that can/should be done. Backlog should also contain budget, execution delay. These are estimates so not actual due dates. 

We will do anything possible to deliver earlier but more importantly delivery quality. For that I use github
  * setup an org (:insert link) if not exists
  * create repo(s)
  * create project (like trello)
  * create backlog as set of issues sorted this way:
    - backlog
    - validated
    - ready
    - in progress
    - in review (if you are a team)
    - done (means it is )
    

## Benefit of scoping tickets
What's good about this is that you are communicating the desired end result as opposed to communicating the steps.
We find this to be more effective to share goal/result. Everybody coming late can understand what we are trying to achieve.
As opposed to,
- create this file
- add this line
- create this function
Doing something without having an overview of the end goal, the whole picture.

Communicate changes via changelog. What's the best place to communicate change than changelog ?

## CI / CD pipeline
One of the reasons I use github is that I like their new changes since acquired by Microsoft like _github actions_
Create linting and test workflow (action). Our pipeline may differ from yours so I'll leave this part empty but hit me up if you are interested in seeing ours.

### Feature/bug fix flow
- create issue on github that describe the feature or the bug we want to fix.
- create local branch to start coding
```bash
    branch=master|main|develop depending on your case
    issue=123
    git checkout $branch
    # Try to be up to date before creating a new branch
    git pull
    git checkout -b issue/$issue
```
![](blob:https://twitter.com/879fee7a-9651-4800-9282-318c85fd2511)

That's it! Now deliver!

## Wrap up
Some principles of mine
- deliver quality and on time
- bug free (or at least very little)
- Catch any new bug with new issue on github
- TDD to develop and refactor in serenity

I do not pretend to have the truth. These are my thoughts and standards we apply everyday with the team of developers I am leading. Hopefully it will help.
What would change if it was up to you ?

Tweet: https://twitter.com/babacarcissedia/status/1359839653935935491?s=20
