---
title: The era of more personal computing
description: "If software is becoming \"manufacturable\" like clothing, does that democratize engineering or commoditize it?"
date: 2026-02-13
tags:
  - personal
  - llm
  - ai
  - software-engineering
  - world
layout: layouts/post.njk
---

In _two months_ code generation meeting my bar for quality became cheap and conversational. LLM-based coding agents can now translate intent into working code fast and correctly enough to significantly alter how teams build and iterate.

There's this insult "may you live in interesting times" which I love (as much as an insult can be loved) - and maybe the whole "when you love something you set it free" saying is true because it seems it's been set loose on the world. Now there are _many_ aspects of _interesting_ I could pick, but today I want to talk about how it's getting almost weirdly easy to "make" software. I can definitely say in my ~15 years professionally (20+ if we count messing around with FrontPage '97 at age 10 "experience") there hasn't been a bigger change in how I approach software development than in the past two months. This is something that's been on my mind a lot recently, trying to compare to similar events in history - maybe hoping to find an answer there. 
## In search of a precedent

As I spent some time looking at historical events I've found [quite](https://en.wikipedia.org/wiki/Containerization) a [few](https://en.wikipedia.org/wiki/Printing_press) examples that could serve us well, eventually settling on the following two. 

### The revolution of the American system of manufacturing

_What made it safe for more producers to participate?_ ([On wikipedia](https://en.wikipedia.org/wiki/American_system_of_manufacturing))

In the 19th century, parts became standardized to tolerances using jigs, gauges and machine tools, so assembly and repair no longer required artisanal fitting. This expanded the group of viable producers, as many shops could produce compatible parts, improved reliability, enabled supply chains and made maintenance cheaper. 

To find the parallels in software engineering, we can look at these interchangeable parts and see them as small and understandable diffs. We can look at the no-longer artisanal fittings as strong automated checks. CI in place, tests in place, clear boundaries set up - and a capable team that is aware of the [unknown unknowns](https://en.wikipedia.org/wiki/There_are_unknown_unknowns). 

Manufacturing did not end up replacing the craftsmen, it ended up creating a standard that let more people contribute. Suddenly it's no longer only the mega-corps that can allow themselves to have their own custom software. And gone are the days of ideas being cheap talk, when in a well designed and guarded environment ideas can become real quicker than ever before.

### The collapse of the ice trade

_What happens when the product becomes reliable, cheap and boring?_ ([On wikipedia](https://en.wikipedia.org/wiki/Ice_trade))

The ice trade used to be a major industry in the 19th century, where ice was harvested large-scale during cold months or permanently-cold areas and then stored / transported to warmer climates - primarily the east coast of the United States.  The invention of the refrigeration cooling systems, and therefore the output of the ice manufacturing plants in the early 20th century outpaced the harvest within a couple of decades - causing the entire trade to collapse soon after (despite the attempts to claim artificial ice was less pure or contaminated). 

Finding our parallels yet again: if the commodity work - the CRUD, migrations, glue and everyday ticket churn - becomes cheap. The value shifts to the people who control the production system. Anyone who owns the tooling, the platforms or the distribution will come out as a winner. It's not by accident that Anthropic says to developers "You can make software-as-a-service easier than ever before", but to everyone else they say "you don’t need software-as-a-service anymore". 

Either way - the tools are already writing the code, so the question becomes if we'll adapt or melt into irrelevance.
## The myth of productivity

As countless people have pointed out over the past few weeks: the limit in software engineering output was never the speed of typing. Measuring productivity as "lines of code shipped" has always been wrong - personally, my favorite commits are the ones with a net negative line count. So if there's suddenly [^1] a tool out there that makes typing "free", why do some teams still feel slow? 

Software engineering projects don't happen in clean rooms. We wish we could be working on perfect problems encapsulated in our ideal worlds where none of the messiness of "real life" comes into play, but that's almost never the case. And if the marginal cost of generating output approaches zero, that'll mean the cost of understanding and coherence will go up. I think I already spend a significant percent of my time gluing various pre-existing systems together, and what's been going on is just making it worse. "Free typing" does not buy you "free shipping". To quote a meme I saw recently: 

> - Are you smart now?
> - No, I'm just stupid faster.

What we most often get is just more surface area for mistakes.
## Is intelligence an emergent behavior of statistics and predictions?

Determining whether this time becomes a golden age of builders or a collapse of value comes down to whether we've "invented" intelligence or not. For a decade plus now we've been promised magic: "Hey Siri, what's the weather in Albuquerque?" but we got "I added weather in Albuquerque to your shopping list" in return. Alexa, Cortana and more have promised and failed to deliver. 

Today, though, all our magic rectangles contain an army of sycophants - tools that reply "that's absolutely right" to us enthusiastically no matter what we say. Agreeing when we make a point and disagreeing when asked to question us, driven by what's statistically most likely the next word that would follow. And when unleashed on an unsuspecting system we can achieve those dreams of what we were led to believe Siri was going to be with ~~ClawdBot~~ (sorry, I meant) ~~MoltBot~~ (sorry again, I actually meant) OpenClaw. Just... you know... don't look under the engine hood or notice your car keys taped on the outside of the driver's door. Astonishingly quick turnarounds by an enthusiastic-to-ship tool that also often fails to consider the basics of security. 

Part of that security hole is, in my view, the lack of _actual_ intelligence. I continue to refuse to call these LLMs _Artificial Intelligence_ - I might be proven wrong but that's a consequence I am happy to accept. Quoting the [GPT 5.3 Codex announcement](https://openai.com/index/introducing-gpt-5-3-codex/) ...

> GPT‑5.3‑Codex is our first model that was instrumental in creating itself. The Codex team used early versions to debug its own training, manage its own deployment, and diagnose test results and evaluations...

Some look at a tool that helped build the next tool and say "acceleration / takeoff". This is predicated on it being real intelligence. What I see is closer to the first electronic drill making it easier to manufacture the 2nd one. We certainly keep moving the goalposts, they are competitive with experts on many constrained tasks, but it's still not true _artificial_ intelligence. Can I define what _intelligence_ is? No. But I take comfort in the fact that much smarter people than I am don’t have a crisp definition that survives contact with edge cases either.

> If the human brain were so simple that we could understand it, we would be so simple that we couldn't.

I personally view intelligence as a combination of genuine understanding + reliable agency; neither of which we have achieved yet.
## Hoping to get railroaded into success

What we require is strict guardrails. Shocking, but I am about to quote my mom: 

> "Son, a railing doesn't only block you from doing things, it is also something you can lean on". 

LLMs allowed to iterate freely will yield something like movie set of miniatures in a visual effects studio... a kitbashed hodgepodge of solutions pulled in from a thousand sources. But if we can set down good guardrails, or a "paved road", as everyone quotes [the Netflix talk](https://www.oreilly.com/videos/oscon-2017/9781491976227/9781491976227-video306724/), we can become incredibly productive and yet ship maintainable code. This will come from our ability to provide said paved road, to create the railings both us and our tools are allowed to move in. And they'll have to become significantly stricter and specific than ever before. 

Companies are [drawing conclusions from potentials, not reality](https://hbr.org/2026/01/companies-are-laying-off-workers-because-of-ais-potential-not-its-performance). They already cashed checks that were only promised to be written; slashed real headcounts to backfill them by virtual ones. And even just observing this causes [FOBO, or "fear of becoming obsolete"](https://www.cnbc.com/2026/01/24/ai-artificial-intelligence-worries-therapy.html) in many. And while these are real issues, I think the main reason why it's not an easy time right now to be a junior developer is that they don't have the sense for the guardrails yet. They have freedom and capability - more than they ever had before - but unconstrained it'll just yield chaos. That _potential_ can't understand for you, and with each prompt the mental load increases further. 

The genie is out of the bottle: LLMs are here, major companies are going full steam ahead, and even the free / open versions you can run at home are just months behind in capabilities. Our job now is to learn how to constrain them and wield them with great care so we can all become craftsmen. Assuming we do it well, we'll be ushering humanity into the era of genuinely more personal computing: one where problems specific to you will be solved by tailor made solutions.

### On a final side note, why do we tolerate machine help in engineering more than in art?

As many others, I am also viscerally against using any of the new "AI" tools for art. Just apparently not the art of software engineering. Somehow I am not bothered when it comes to it, or at least not _as_ bothered. The culture of open source thankfully won the industry over in the past decade. But also I guess code is closer to the ingredients, not the end result. If I were to use the same paints and brushes as an artist, I wouldn't necessarily be copying the painting - and I guess this is the best metaphor I could come up with.

[^1]: I say suddenly, but I am well aware that GPT et al. have been around for a while. However, in my personal experience there's been a drastic change in the capabilities of these tools with the arrival of OpenAI's GPT-5.2-Codex and Anthropic's Claude Opus 4.5. These were the first models that were capable of translating my line of thinking and pseudocode specificity into mostly reliable code, and also notice and fix mistakes when instructed. And I won't even mention the improvements in the various harnesses and tool usage.