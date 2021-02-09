# New project flow
There are couple of steps and actions that I take whenever I am building a new project. I am sharing with you my gameplan.

## Summary
- rough project description and estimate
  * client describe project
  * client give budget
  * We roughly estimate the project (budget, execution delay)
  * If that is matching client expectations then we elaborate to deliver a better estimate and schedule
This allows me to quickly weight the client as this will prevent both of us from losing time.
Example: Watson wants a million dollar project but only has $100k
- Backlog
  * budget, execution delay as always
  P.S. These are estimates so not actual due dates.
  We will do anything possible to deliver earlier but more importantly delivery quality.
For that I use github
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
- CI / CD pipeline
One of the reasons I use github is that I like their new changes since acquired by Microsoft like _github actions_
Create linting and test workflow (action)
(:insert workflows)

## Issue
We create the issue with three sections:
- Scope
- Acceptance criteria
- Technical directions
![image](https://user-images.githubusercontent.com/17571380/107214630-12092480-6a02-11eb-9b35-49fb9dbd29ba.png)

What's good about this is that you are communicating the desired end result as opposed to communicating the steps.
We find this to be more effective to share goal/result. Everybody coming late can understand what we are trying to achieve.
As opposed to,
- create this file
- add this line
- create this function 

## Communicate changes via changelog
What's the best place to communicate change than changelog ?

## Feature/bug fix flow
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


That's it! Now deliver

## Wrap up
Some principles of mine
- deliver quality and on time
- bug free (or at least very little)
- Catch any new bug with new issue on github
- TDD to develop and refactor in serenity
- Be open minded: Business is business. See everything as an opportunity to discuss
> Watson can still have an MVP for his $100k budget instead of the complete $1M project
