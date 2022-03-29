---
title: Shared Engine Spaces in the age of Mixed Reality Operating Systems
description: "As we're heading into the brave new world of mixed reality, one of the larger software issues facing everyone has yet to be addressed: shared engine spaces."
date: 2021-03-18
updated: 2021-04-21
tags:
  - mixed reality
  - virtual reality
  - augmented reality
  - operating systems
  - rendering engines
  - airspace issues
  - oculus
  - hololens
  - windows mixed reality
  - magic leap
  - lumin os
layout: layouts/post.njk
---
As we're heading into the brave new world of mixed reality, one of the larger software issues facing everyone has yet to be addressed: shared engine spaces.

## Pancake problems

Users of traditional "2D" or "pancake" operating system user interfaces have long expected multiple different rendering engine powered applications to work together simultaneously. I can easily run a game using Unreal Engine with e.g. DirectX11 backing it in a window next to an enterprise app using Vulkan, while both are eventually placed on screen by Windows's DWM/Composition engine which is probably using DirectX12. And if I were to launch a Unity3D powered app on top of this, it'd just work as well.

![Unreal Engine, WPF, Vulkan, UWP, DX12 playing along](/img/mrosengine/desktop.png)

This integration is obviously not perfect, two issues I'd call out specifically:

Mixing multiple rendering engines within a single application is heavily dependent on the engines' interoperability and "closeness". You can often work around this and embed a window using rendering engine `A` within a window using rendering engine `B`, but that usually also means you can't have rendering engine `B` draw on top of the area that's being used by engine `A`. These issues are dubbed **airspace issues**.

![You can place a Vulkan renderer inside a WPF app, but the WPF app can't draw on top of the Vulkan part](/img/mrosengine/airspace.png)

There's also space to improve in the balanced **sharing of resources** available. However fast computer you might build, a game loading will probably make your youtube playback in a different window start freezing up for a bit. Based on my observations, Windows seems to prioritize the foreground application - which does make sense in most use cases.

I chose these two pain points specifically as in my opinion they are critical to a fully capable 3D / mixed reality operating system's user interface. Let's take a look at what solutions we have today.

## Leaving breakfast foods behind

#### Oculus Home / Windows Mixed Reality

Both of the above simply don't solve the issue, at all: they all guarantee exclusivity to the foreground 3D application the user is interacting with and don't let developers create shared 3D experiences. The only exception (and imagine me using air-quotes here) to this is application icons: developers can provide 3D content in a .gltf file to act as a 3D representation of the application in the users' home space.

Both of the above also try and inject system UI into the foreground 3D applications with various levels of success:

![Quest System UI in an app](/img/mrosengine/quest.mp4)

On the Hololens 2 it's now possible to open and interact with 2D apps while being "inside" a 3D app, but as you can see both in this video and the previous one, the projection looks off and what's really in the foreground or background gets ignored.

![HoloLens 2D app overlay in a 3D app](/img/mrosengine/winmr.mp4)

#### Lumin OS

Magic Leap's operating system is the only OS that at least has an approach to this currently. Applications using their own app building environment can exist in the same shared 3D space, as this example shows me having their browser and 3D gallery open at the same time:

![Lumin OS multiple 3D apps](/img/mrosengine/magicleap.mp4)

With that said, this only works for their own apps… apps using a 3rd party engine like Unity are still only capable of running in exclusive mode.

#### SteamVR

Let's include this one, just for completeness's sake. There aren't multiple 3D experiences allowed here either, BUT I think it's important to mention that using their SDK allows great integrations to be made, [e.g. a twitch chat viewer that's attached to the backside of the controller](https://store.steampowered.com/app/586210/OVRdrop/). It doesn't respect perspectives/foreground-background either, but it's the only platform where 3rd parties are allowed to do this.

## Where to next?

While there'll always be applications that demand and deserve an exclusive 3D space, e.g. games, it's completely realistic to imagine...

...watching a point cloud stream of a sporting event on a coffee table...

...while being in a 3D Skype call with friends placed on the wall...

...and having a browser open on the right with 3D charts and models of the players.

It should be immediately clear to anyone who has a bit of rendering or OS knowledge that this is a **really hard problem to solve**.

To achieve a completely seamless experience we have to share "everything with everyone": all rendering engines need to match camera settings and lighting between them, materials, sounds and more. This is not only complex due to the differing architecture of the engines, but also because of the performance metrics required from such experiences. On desktop it's often accepted to have applications react with a 100-200ms latency, but in MR even a 50ms latency between two applications' interactions will be immediately noticed.

From now on let's jump into the **theorycrafting zone**, and try imagine how these problems are actually going to get solved. I see three possible paths forward... let's start in order of increasing odds by yours truly.

#### 1. No solution whatsoever

Engine developers stay hostile to each other, platforms and operating systems stay hostile to each other... no interop, no cross operation - maybe only within the operating system's own.

I don't think this will be the case. We've seen _some_ historical examples for this, but I think it's a different time now, and if anything, UX demands will make it happen.

#### 2. Engine interoperability gets sorted out

![There are n+1 competing standards](https://imgs.xkcd.com/comics/standards.png)

Imagine a wondrous land where the [XKCD Standards comic](https://xkcd.com/927/) isn't real, and somehow every interested party manages to agree on a common interface, that allows them to share:

- lights,
- shadows,
- textures / materials,
- camera settings

etc. It's not completely out of the range of possibilities - there've been recent endeavours that are going down this avenue, such as [Physically based rendering](https://en.wikipedia.org/wiki/Physically_based_rendering) or the [GLTF](https://www.khronos.org/gltf/) format.

#### 3. A single engine wins

This is one of those things where the more and more I thought about it I went from "nah, that's silly" to "hmm, no, this might actually be it". And I have a current and strong example as to why.

Consider the following: what's something that's probably equally as hard to create as a good 3D rendering engine, features / complexity / portability-wise? If you thought "browser engine" you get a 100 points.

If we look back and see what happened in the last 20 years to browsers a clear pattern emerges:
- Firefox is doing its own thing with Gecko,
- IE's Trident got replaced by EdgeHTML in Edge,
- Opera gave up on Presto, went with webkit/blink,
- Vivaldi, Brave and others went with blink from the start,
- most recently, Microsoft gave up EdgeHTML and moved to blink as well.

Aside from an assortment of tiny players, there are 2 contenders remaining: WebKit/Blink and Gecko (apologies for treating the former two as a group). If you take a look at the [browser market share data](https://gs.statcounter.com/browser-market-share) it's clear that Gecko has ~4% market share, and almost everything else is using its competitor. Personal feelings aside raised by this situation, I don't think we're far from Gecko throwing in the towel as well. The complexity of the problems faced isn't necessarily impossible to solve, but the [engineering effort available is dwindling](https://arstechnica.com/information-technology/2020/08/firefox-maker-mozilla-lays-off-250-workers-says-covid-19-lowered-revenue/)  along with the userbase.

I'd argue that in the past 3D engines were primarily used in the entertainment industry which had differing and often niche requirements, but with mixed reality becoming a commonality this will change. Because of this I feel comfortable applying all that we learned about browser engines to 3D engines, and I see a strong possibility for the single-engine-wins outcome. What is that engine going to be? Not sure. Unreal is already open-source, but Unity has a larger userbase. Those two are clearly strong contenders.

_Thanks to [András Velvárt](https://twitter.com/vbandi) for the HoloLens 2 and Oculus Quest videos._
