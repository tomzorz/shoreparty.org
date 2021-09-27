---
title: Taking a Diamond Pickaxe to My Notes
description: "After roughly 11 years and ~1200 notes, I left OneNote behind for Obsidian. As you can imagine, this was a gigantic change for someone who literally owns a OneNote cape."
date: 2021-09-28
tags:
  - note taking
  - obsidian
  - markdown
  - onenote
  - feedback
layout: layouts/post.njk
---
After roughly 11 years and ~1200 notes, I left OneNote behind for Obsidian. As you can imagine, this was a gigantic change for someone who literally owns a OneNote cape.

![Obsidian Graph of my notes](/img/obsidian-graph.png)

I want to preface all this by saying, OneNote is a great platform. One of the rare ones that I love. The inking experience is amazing, the sync is great and the capabilities are extensive. But after all these years of use and repeated asks for features I've came to realize that it's not designed for me.  

- 6914 votes for sharing individual pages
- 1642 votes for templates
- 761 votes for code blocks / code editor
- 887 + 717 + 607 votes for find and replace
- 600 votes for proper tags
- 569 votes for markdown
- ...

Just a few of the features I've been asking for and wanting for years. Some of them are understandably not for the mainstream userbase, like code blocks or markdown. But tags, or find and replace? Those are things that should've been available forever.

Anyway.

## Looking for alternatives

I've spent a lot of time looking for alternative solutions. There were a few promising ones, but they all had problems I just couldn't get over. **Bear** looked cool, but they were only on Mac / iOS and as it turns out they've been kind-of silent on the development side for a few years now. **Notion** also looks interesting, but it's just sooo slooow... and then they are insistent on making _everything_ a _thing_ that can expand and have more _things_ in it and I hated that. Then there's the local coolness, **Craft Docs** but then it's Mac/iOS/Web only again, plus they also do this expansion thing I'm not a fan of. (At least it's a much cooler implementation.)

## Enter right: Obsidian

[Obsidian](https://obsidian.md) is essentially a fancy markdown editor with plugins. You have a file browser, tags, formatting options... and then with plugins (including many built-in ones) you get a graph, outlines, starred and recent files and more. It's incredibly capable - while keeping all your data in a human readable, standard format. 

![Screenshot of Obsidian from their website](/img/obsidian-scr.png)

The team also offers 2 services on a subscription basis: Sync and Publish. Sync is a service that - _surprise_ - syncs your notes across your Obsidian clients (PC, Mac, iOS and Android). Publish is essentially an online hosting solution - it lets you host part of your notes online on a per-folder basis. 

As Obsidian is local first, you can use whatever service you want to sync your files - you're not tied to their solution. OneDrive, Git or Dropbox are all valid solutions. This also means you own all your data, in a non-proprietary format. This was also one of my major issues with OneNote. The actual data files are a proprietary format with only complicated ways to export it into anything standardized, and they are also completely hidden from users - Microsoft just wants you to save to OneDrive and forget that files even exist. Which I understand... for the average users. But I'm not the average user.

## Pains of moving over

You might imagine - may I add correctly - that migrating an essentially freeform document format with inking support into markdown wasn't an easy task. The process was made a bit easier by [a few github users and their scripts](https://github.com/SjoerdV/ConvertOneNote2MarkDown) that use Powershell to interact with the desktop OneNote app, which exports files as html, which are then re-converted to markdown. Beautiful.

Then came the sorting, the re-formatting, and the linking and tagging. To use Obsidian efficiently, ideally you should use tags and links to navigate to notes - instead of the more traditional folder structure. This allows you to have notes that belong to multiple main areas of interest - one thing the folder structure was really bad at. I spent roughly 2-3 months cleaning up my notes: remove inking only files that stay in OneNote, clean up bad formatting and figure out the first iteration of my linking (and folder, old habits die hard) structure. In the end I ended up with ~950 notes, from the starting ~1200, removing or collapsing a substantial amount. (I still have a "Might come in handy" and "Dubious importance" category though.)

I ended up with a double-digit indexed folder system that I mostly use for coloring the graph, and then every note is reachable by link or tag based navigation, e.g.: `Main -> Pop Culture Overview -> TV Shows`.  

I'm planing to write more about the structure I'm employing and my customizations later. Until then, [you can find my GitHub repo with my custom theme changes and snippets here](https://github.com/tomzorz/obsidian-toolkit). 