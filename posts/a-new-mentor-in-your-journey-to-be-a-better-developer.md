---
title: A new mentor in your journey to be a better developer
description: "I won’t surprise anyone who knows me when I say static analysis tools made me a better developer. I’m willing to go even further, just as the title of this post says: these tools can be our mentors."
date: 2020-02-26
tags:
  - development
  - dotnet
  - csharp
  - ndepend
  - static analysis
  - showcase
layout: layouts/post.njk
---
I won’t surprise anyone who knows me when I say static analysis tools made me a better developer. I’m willing to go even further, just as the title of this post says: these tools can be our mentors.

We all know the quote “the plural of anecdote is not data”, but I’m still comfortable saying that e.g. ReSharper and CodeMaid made me a better developer. Today I’m diving into a new tool, **NDepend** — which is the nicest entry into the category I’ve had the chance of using.

![](/img/1_J0Qdv0zP-xu8ZVLwyOdfmw.png)

As a first foray into its capabilities I decided I’d first try it on the smallest project I have — see if I made any grave mistakes in those 3 files: WhoseEndpointItIsAnyway.

![](/img/1_-xdmYNR5RC5O5MrBYpsFNg.png)

After making sure that I was in Debug configuration I attached a new NDepend Project to my solution, just accepting the defaults in the dialog popping up. After waiting for a few seconds I was greeted with a friendly dialog and a summary opening up in my browser:

![](/img/1_Yyvo0_smk6WcAqFM3gRfiQ.png)

I picked the first option — but first let’s take a look at the summary:

![](/img/1_KGptkBdlN5HS7CPGmehz5A.png)

The page continues on with more stats, including quality gates and rules: thankfully I only have 2 rule warnings — but that complexity map is probably also worth a look. Let’s jump back into VS and see what’s that all about.

![](/img/1_0R8ZBwIxf57sVaExA7XPcA.png)

Here we’re greeted by a similar but much more interactive version of the data. First let’s get those 2 rule violations sorted:

![](/img/1_ke9avD2e_gkBizkFphuq9Q.png)

We get a helpful description with reasoning behind it, and **actual numbers**! I find these estimations tremendously helpful as they are a powerful tool in our hands to get time. — Now in these two particular cases I’d have a hard time convincing my imaginary management to let me fix this, as we’d need 5 years to break even. *Aaaanyway*, after drilling into my non-sealed class issue I get a nice list of the affected types immediately:

![](/img/1_3cxlCv8wNSBcePAwUupuXA.png)

After adding the sealed keyword to my demo class we’re already done.

Now let’s tackle the seemingly bigger issue: cyclomatic complexity. If I click the “24 Max” row in the dashboard I immediately see a list of all my methods in descending order, and a peek into the other insanely powerful feature of NDepend — the code quality linq queries. (I’ll attempt to tackle these in a future article.)

![](/img/1_T0lKjq37b4NBtdziCUCogg.png)

![](/img/1_VWkw9mJVqh6UhKXFFGn90Q.png)

Clicking the RankEndpoints() method navigates me to it, and also shows a handy popup detailing statistics and any issues. Definitely great to see stats about the IL too, often with recursion or generics we can accidentally create real monstrosities on the flipside — this feature definitely helps avoiding that.

Thankfully after further inspection I see that its debt rating is excellent, has ~40% comments and it’s not that complex as the chart suggests. *(Pats past self on the back…)*

We have a few more charts on the dashboard, including a dependency graph / matrix and an abstractness-vs-instability diagram. These are pretty boring in this tiny project but we’ll definitely give them a more intense look in the coming article.

I want to give a shout-out to one last awesome feature: trends over time. Every analysis we run gets saved in a detail, and NDepend has a built-in way to create trends from these, showing our team whether we’re progressing towards an easily maintainable codebase, or just how hardly were we hit by that last crunch in the last sprint to add that one small checkbox. (I’m sure we’re all familiar with *that* request.)

*I want to thank the NDepend team for providing me with an MVP license. I appreciate this excellent software I’m now slowly integrating into my everyday work. — Find them at [https://www.ndepend.com/](https://www.ndepend.com/)*
