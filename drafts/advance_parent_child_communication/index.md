# Advance parent child communication
Sometimes I am doing so complicate / advanced programming stuffs that I want to share but then I realize that I might not have the right audience for it.
That's so sad. I guess I'll just blog about it

FYI it is about @vuejs 

Before I actually describe it, let me start by reminding you message exchange between parent and child components:
- parent to child: props
- child to parent: event

What if you need the child component to be notified when the parent is doing a particular event. We can sure try to set a `prop` and pass it down through the components tree. There is a better solution involving `provide/inject`. 

But that's still do not solve my problem. Let me explain the situation:
- I have a layout (root component) that have a _return button_
- There is `details page` that should redirect to the `list page`
- The `layout component` does not know about the `details page`

Let me know how you guys would solve this ?
cc @youyuxi

the layout is in charge of the return button
but we needed the financial page to handle the return button that's the problem
