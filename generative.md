---
title: Generative Policy
description: "The generative policy of Tamás Deme, also known as an AI policy or LLM policy: what generative tools may and may not do to content published under my name."
permalink: /generative/
layout: layouts/base.njk
templateClass: tmpl-post
---

# Generative Policy

> **This page is a mirror.** The canonical copy of this policy lives at [github.com/tomzorz/generative-policy](https://github.com/tomzorz/generative-policy), and that copy is the one in effect.

This document is the generative policy of Tamás Deme. Also known as "AI policy" or "LLM policy", although I have disagreements with both those names, so I ended up with "generative".

The core of this document is not to say "no-LLMs", it's to make sure that you know things originate from me and that I am personally accountable for everything I publish. I use LLMs in my daily work a LOT, as any experienced developer should do so in the 2nd half of 2026. Doing it any other way would be deciding to stick with a shovel because you don't like rotary plows. Reasonable for grandma's backyard, probably ridiculous for a 20ha (~50-acre) field.

The rules below are not perfectly defined, this is for a reason - I don't think they can really be. I will execute my best judgement to stay true to the intent of the rules.

### Why?

Trying to hold myself publicly accountable to my own rules - and also this way people know where I stand. There are numerous people out there doing this already and I also think it's a great idea. 

> "It is easier to fight for one's principles than to live up to them." -  Alfred Adler

## Scope 

**This policy covers content published under my name.** Three key things to pay attention to in the previous sentence:

- "Under my name", therefore it does not apply to work product I do for someone else.
- "Published", therefore it does not apply to anything private (which is nobody's business).
- "Content" which cannot really be well defined, but some examples here so you have a rough idea: blog posts, podcasts, speeches, source code, photographs, videos, music, newsletters etc.

## Rules

### The Divide

Content I publish shall fall under two different groups, based on **intended use** and not location. Content you consume *because of me* has to pass the **Origination Threshold**. Content you consume *to act on it* has to pass the **Ownership Threshold**.

1. The origination threshold, or **expression**. Blog posts, talks, presentations, comments etc. under my name: everything is written by me. I can/will use generative tools the same way I would use a friend/coworker: find me sources, check claims, point at weak arguments or maybe argue back. Generative tools may not draft or rewrite anything you read from me. You cannot outsource understanding, and writing is most of thinking - I want you to read my thoughts, not the generated ones.

- 1a. Generative tools may always ask. Having something question me until the fully formed idea comes out of my own head - a.k.a. [the Socratic Method](https://en.wikipedia.org/wiki/Socratic_method) - is allowed and encouraged. (You should do this too.) My line is at ideas coming out of the generative tools - it is allowed to question me. (Yes, technically you can "lead the witness" but eh, I believe myself to be smart enough to see that happening.)

- 1b. Generative tools may edit, as long as the edits are mechanical. The line here roughly equals anything that Microsoft Word in 2023 could do: generative tools may also do the same. Select, reorder, cut, paste, fix spelling and punctuation - things like that. I might look up inspiration when I am stuck on phrasing, or synonyms / antonyms, but nothing a dictionary website or similar wouldn't be able to provide me with.

- 1c. Generative tools may translate, as long as the translation is not intended as art and can be personally reviewed by me. (Therefore presently limited to Hungarian, English, Korean and German - in order of fluency and capability of verification. So not including French and Spanish where I only know enough not to starve or get kidnapped.) Translations are held under the threshold set in rule 2 below. Generated translations will carry a note when substantial enough (admittedly vague, I know).

2. The ownership threshold, or **coordination**. Issues, PR descriptions, code comments, specs, READMEs, docs, commit messages: a generative tool may draft these, and often will do so. The moment I publish them means that I will stand behind every sentence. "Oh an LLM wrote that, ignore it" cannot be an accepted answer for a question about anything under this threshold. Your time matters just as much as my convenience, and I'll endeavor to share any prompts as well when they communicate the idea better or more succinctly.

### General

3. Quoting generative output is fine anywhere as long as it's clearly marked as such. 

4. As of September 2026, a lot of my code is openly built using LLMs. I am relying on my 15+ YoE in the industry to do so responsibly - my quality bar for publication has not changed, and I think has been monotonically increasing over the years - I don't expect this to change. I direct the work, review changes and understand the architecture of what I am building. I won't be making a claim to having read every line I publish - this already feels unrealistic, but at the same time: every bug is my bug - the tools are never the excuse.

5. Commits should carry my name primarily, generative tool co-authors may or may not be present on them. Attribution lives at the project level, and as I interact with my projects via generative tools, those projects _should_ all eventually get a reference to this document.

6. Functional media such as diagrams, charts or UI mockups may be created using generative tools, and should get labelled as such when this is not obvious. As mentioned in this section's first paragraph, the line for expression is intent. Nothing I create should be generated with artistic intent. 

- 6a. The rule for editing my own photos is the same as the rules for text just applied to pixels. Every meaningful pixel traces back to something I captured. Tools may rearrange, remove and blend things: culling, lens corrections, denoising, healing with pixels from my own frames, compositing my own skies etc. have been part of traditional photo editing tools forever - some, [like digital composition](https://en.wikipedia.org/wiki/Erik_Johansson_(artist)) are even own genre of art. Similarly to above, generative tools may do anything that Photoshop or Lightroom could do in 2023. I will add one specific carve-out here for convenience: removing small distractions, such as a stone, blade of grass, graffiti or a skin blemish is acceptable - even if the tool invents the pixels. (As there isn't always a matching pixel to heal/clone from.) These changes may not change the meaning of the image in any way, or add details that have never existed. The factual claims made by the photo before and after editing cannot differ - this is why I say "every meaningful pixel" and not "every pixel".

- 6b. None of the above in 6a is really only about photos. These rules should apply to any other forms of media generalized to applicable tools there. Denoising and mastering my own audio is editing, but voice cloning is contributing material which should not be passed along pretending to be me. Same goes for videos and other media. I am leaving things a bit more undefined, as things get blurry here... video editing (in this sentence I specifically mean the timing of cuts etc.) is artistic output, but e.g., auto-cutting the silence from clips is not so much. Is rotoscoping artistic output? Yeah. Does it make sense to let automated tools generate masks for me? It also kinda does. Did you know that several famous and celebrated painters have [basically called their studio](https://web.archive.org/web/20210421092910/https://www.moma.org/collection/works/78747) and [explained to their people what to paint for them](https://web.archive.org/web/20250318214519/https://lacmaonfire.blogspot.com/2017/03/did-moholy-nagy-phone-in-these-paintings.html)? Apparently many did, I first heard about this during a guided tour of Victor Vasarely's work here in Budapest. Funny how my line for "expression vs. origination" first got blurred during an art exhibition.

7. Generative tools are not sources. If I state a fact, I should have checked it against other sources, and when relevant link those sources so you can read them too.

### Musings

Is code art? I guess sometimes it can be. Interesting how I have such strong, yet opposing feelings for things that share a non-empty intersection set. Thankfully we are smart human beings, capable of holding conflicting thoughts in our heads at the same time.

## Provenance

The authoritative copy of this policy lives at [github.com/tomzorz/generative-policy](https://github.com/tomzorz/generative-policy). Whatever is published there is the policy in-effect at all times, unless the github page itself says otherwise in the future. Amendments to the policy get dated entries below. 

Dates below follow ISO8601.

| Date | Note |
| ---- | ---- |
| 2026-09-01 | First published |

## Acknowledgements

A lot of these rules and ideas are not original, and I don't claim them to be. They are a mix of things I've read elsewhere and adopted into my own policies with my personal modifications. I have also used LLMs to gather my thoughts for this policy itself, before taking every argument and rewriting it into this document.

A few specific inspirations:

- <https://slashai.page>
- <https://www.bydamo.la/p/ai-manifesto>
- <https://cassidoo.co/ai/>
- <https://www.hankgreen.com/ai-policy/>
- <https://www.clay.com/blog/ai-writing-policy>

## Final thoughts on the naming

"LLM" is too narrow, it doesn't quite cover things like image/video/audio/model generation tools - therefore it's out. 

"AI" is currently a marketing term, not an actual description. If something is actually intelligent, I will personally stop viewing it as a tool. I'm not convinced the LLMs of today (or tomorrow) will be the avenue leading humanity to "actual" artificial intelligence. These tools are incredibly powerful, admittedly. Today they are also the worst they'll ever be. For more of my thoughts on this, read [this blog post](https://shoreparty.org/posts/the-era-of-more-personal-computing/#is-intelligence-an-emergent-behavior-of-statistics-and-predictions%3F). Anyway, I might be wrong on all this. Oh well.
