---
title: Things without windows on Windows
description: "Where should binaries, command line tools and similar things live on Windows? We should figure it out."
date: 2025-01-01
updated: 2025-01-02
tags:
  - windows
  - developer
  - shell
  - command-line
layout: layouts/post.njk
---

It's a new year, and a new opportunity to start a blog post series: talking about dev improvements we need. The excitement is palpable. And I immediately start it off with a lie, because this one is not just for devs, I guess? Both power-users and developers use some, or sometimes **many** command line tools in their daily lives: me included. I have been known to have somewhat controversial opinions on all this, but let's leave those behind for a different blog post... today I'd like to talk about the ways we manage these binaries. Or the lack thereof.

## But first, a little history

It's generally a good idea to start out with a little history lesson to understand where we are and how did we get there. Originally, back in ye olden days of DOS and even Windows 3.1 I believe, there wasn't really a location for applications to be installed at. It was sort of a Wild West - everyone was free to put their applications anywhere. This included applications just literally placing themselves in the root of your C drive or one folder below that.

Then Windows 95 arrived and introduced the folder that we all know and well... not love (probably[^1]), called `Program Files`. Microsoft at the same time [required developers to play nice](https://devblogs.microsoft.com/oldnewthing/20120307-00/?p=8153) and install the files of their applications inside Program Files, if they wanted to be part of the various certification programs. Side note: this is why this folder is called `Program Files` as opposed to `Programs`: because it contains the libraries, other media or documentation etc... included with the files - not just the binaries. (As opposed to Mac OS where you would have a "single file entity" inside an applications folder.)

The ones who pay attention might have already noticed what the key issue here is. I used the word **install**. A lot of these command line tools (and especially libraries) aren't really "installed". There's a binary somewhere online... you grab that... you place it somewhere on your system. You "install it" - sort of -, but **you install it** as opposed to the **software developer installing** it via some sort of installer. The installer is of course "just" a copy operation. All installers are mostly just copy operations of course, but you are not required, to make a nicely and appropriately named folder in `Program Files` or `Program Files (x86)` if you were on a 64-bit system installing a 32-bit app. And generally, most people just can't be bothered. And why should they?

Fun fact: my own collection of small binaries is named `um`, which I think originally stood for "ultra-mini" more than a decade ago now. It lives in the root of my D as in "development" drive, and it has 153 *things* in it, that I've been gathering and migrating from system to system since probably around 2009.

## Why we don't want to be nice

There are of course, many completely valid reasons why we wouldn't want to use the `Program Files` folders as individual users. 

First of all, we want to have a centralized and easy location to have all of these like tiny tools to be in. If we place them in `Program Files` there are a lot of things there that we don't manage but the system or other applications do, which also means it is **hard to find** these tools. Not having all of them collected in one place also makes it really **hard to move** these files around. Whenever developers blow away their entire system (which does tend to happen more often than with average users), they want to grab all of these tiny tools and just quickly move them to their new install. If they are scattered around in two different places and also mixed with of a bunch of different things that they don't manage, that makes that very hard to do.

## It's not just about being nice

Of course, there are a lot of issues with acquiring these tiny binaries from all over the internet other than their placement:
- we don't really know where we got them from;
- we don't have a standardized way to tell which version they are;
- we have a hard time keeping them up to date;
- we have a hard time verifying that they are what they should be;
- ... because often we don't have a standardized way to check the validity of these binaries.

This also means that because we don't have a guarantee for any of these points above, and we simultaneously don't know where they are on the system (if they are there at all), **no application that the user installs can rely on the fact that we have these**. Which is why on Windows, generally the culture is "my application will have all of its dependencies come and install with it". And when my application is removed, all of those dependencies are going to be removed with it. Now, this is certainly an improvement over the *DLL Hell* of ye olden days again, where every application installs their required DLLs into a common location and then when we would delete those applications, they might delete those DLLs that other applications may have depended on. So from the perspective of the developer that always wants to make sure that their applications work, it makes sense. Also storage is cheap, and binaries are usually relatively small, so this is probably a sensible trade-off. 

At the same time, we should recognize the fact that it is not very elegant. We are still wasting both bandwidth and storage, and this is more-or-less a solved problem elsewhere.

## There are some semi-solutions

There are *some* solutions to *some* of these problems that I have stated already. The one I think I like most is called [Scoop](https://scoop.sh) - especially as it prevents PATH pollution with its shims solution and doesn't require admin rights to install things. There are also Chocolatey, winget and a bunch of other tools that also make it easy to download and manage binaries. Both Scoop and Chocolatey make it relatively easy to list what you have installed so it can be recreated [^2], unlike winget [where it's a bit muddled at the moment](https://github.com/microsoft/winget-cli/issues/1155#issuecomment-908534967). If the binary you want exists on one of these platforms, great. If not though... you're still a little in the weeds. 

What I'd like to see is an official recommendation on Windows for the following:
- a single, centralized location for installer-less binaries;
- a way for any package manager to embrace this location;
- but also enable "user-managed" binaries in this, help them add a manifest etc...;
- make it easy to move this location within the same install;
- make it easy to replicate this setup on any other installation (for system reinstalls, or just even giving it to coworkers or friends);
- make it easy to surface these tools in the PATH - with the ability to choose which version, in case there are multiple installed.

I want to specifically call out the 2nd point in this list: I'd love to see scoop et al flourish after these recommendations are made, competition is a great way to make sure end-users win in the long run. Now achieving all that is understandably not as easy, but maybe a similar solution to scoop's own shims could be a way to do it.

Not having an officially recommended location means that I, as a developer, can't rely on external systems to provide dependencies to me. Which means that the current system gets perpetuated. 

## This may all be more necessary than you think

If you got through all of this you might still think "Hey, things are generally okay the way they are. I don't really mind having my own folder and copying things around. And I also don't really mind having duplicates of the libraries because, again, the entire folder is going to be about 3 gigabytes and it does not matter." Fair.

Now, on the other hand, in 2025 we live in the world of large language models (LLMs) or let's be more generic and say large machine learning models. And we increasingly live in a world where people would like to run these models locally on their own machines: both because of costs and privacy reasons - both of which are great reasons, I believe. **But these models are gigantic.** And now we are getting to the point where when I say "we are wasting both storage and bandwidth", we are no longer talking about a tens or hundreds megabytes. We are talking about 5 sometimes or 50 gigabytes potentially, for a single one of these models. And suddenly sharing these between applications - as multiple applications might want to use these -, is a much more interesting question. Downloading that much data takes a significant time, even today. And storing that much data repeatedly takes a lot of storage away. Especially because we live in a world where certain companies *cough* ~~Apple~~ *cough* make you pay almost as much as the entire computer costs if you want to upgrade your storage from 256 GBs to 1 TB.

All this to say, let's simultaneously get an official recommendation going for ML models as well.

[^1]: I think a large part of the hate comes from the fact that the folder name has spaces in it. I wish they didn't. Same goes for `Documents and Settings`, although that was thankfully renamed later.

[^2]: It's probably a fair question to ask: why do I want to just file-copy migrate my binaries, as opposed to re-install them via a script? My two main reasons are: a) I might have binaries I want that can't be re-acquired anymore; b) I want to easily migrate the binaries I have acquired manually.