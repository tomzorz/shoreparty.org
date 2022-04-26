---
title: Tiny Tools of the Trade - Part I.
description: "Small software solutions that are big time savers, for small everyday problems that are big annoyances. This time let's learn about yt-dlp, RipMe and ffmpeg."
date: 2022-04-26
tags:
  - software
  - recommendations
  - open source
  - showcase
  - tools
layout: layouts/post.njk
---

Fairly soon after I started my collection of tiny tools I had the idea to write about them, and share the awesomeness that might be flying under the radar. According to the folder metadata, I started actively collecting in February of 2013. I called the folder "um" for "ultra-mini" which sort of stuck over the years, so this is the story of `D:\um\` - somewhat grouped by frequency of usage and function. This time in Part I, let's take a look at various media-wrangling tools.

## Grab any video with yt-dlp
A fork of the no-longer maintained youtube-dl, [yt-dlp](https://github.com/yt-dlp/yt-dlp) is a simple command line tool that lets you grab essentially any video from any site. Amongst [many other things](https://github.com/yt-dlp/yt-dlp#usage-and-options), it supports grabbing entire youtube channels or playlists, grabbing subtitles or outputting just audio files if that's what you need.

Using yt-dlp is as simple as it gets. After making sure you [installed it by following the steps appropriate for your operating system](https://github.com/yt-dlp/yt-dlp#installation), type `yt-dlp https://www.youtube.com/watch?v=dQw4w9WgXcQ` into the terminal and let it do its thing.

## Grab any image with RipMe
Same idea as before, just in a small java UI instead of a command line, and with images instead of videos. Want to grab that cool album of wallpapers from Flickr, or those _dank_ memes from imgur? [RipMe is your friend](https://github.com/RipMeApp/ripme). Just plop a URL into the UI, press the button and let the magic happen.

![RipMe UI - focus your attention on the top row, it has all the things you need.](/img/ripme.png)

## Trim, crop, edit and more with ffmpeg
Underlying a significant amount of products that deal with media nowadays, you'll find [ffmpeg](https://ffmpeg.org). To twist a quote from The Martian a little, _ffmpeg is magic and should be worshipped_. While simple conversion using it is relatively simple, I wouldn't call the rest of it that... maybe quite the opposite. With that said, the capabilities are surprisingly advanced - if you're patient enough writing complex filter "code" you can edit entire videos with transitions and more - just from the terminal.

Two extra capabilities are also worth mentioning: 1) because ffmpeg is a terminal based tool, it's easy to do scripting to mass process large batches of media; and 2) many actions, like trimming or replacing audio tracks can be done without re-encoding the entire media file, which makes these tasks _significantly_ faster to do compared to re-rendering in a "proper" video editor.

To make sure I don't scare anyone away, here's a simple example making an audio file out of a video: `ffmpeg -i never.mkv never.mp3` - simple, right? For more advanced examples keep an eye out on this blog. I've been collecting my own ffmpeg scripts and templates, and I'm planning to share them in a few follow-up posts here soon™.
