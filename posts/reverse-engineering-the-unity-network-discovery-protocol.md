---
title: Reverse engineering the Unity Network Discovery protocol
description: I’m working on a project where a .net core backend is used as a server to provide data for multiple Unity clients. To ease development and usage in Unity it’d be great if we could use the built-in network discovery module, so that’s what I did.
date: 2017-12-19
tags:
  - unity
  - reverse engineering
  - development
  - dotnet
  - csharp
  - open-source
layout: layouts/post.njk
---
I’m working on a project where a .net core backend is used as a server to provide data for multiple Unity clients. To ease development and usage in Unity it’d great if we could use the built-in network discovery module, so that’s what I did.

### First steps: how it works in Unity

Clickety clicks: [New Project], [New > Create Empty], [Add Component], [NetworkDiscovery]. Upon hitting the play button we’re presented with a simple GUI allowing us to start broadcasting or listening.

![I like to live dangerously, I didn’t even save the scene](/img/1_ty4q3ju6ljqK1Mw5TuBdzQ.png)

![Why can’t I hold all these fields?](/img/1_COW7aP8fFe8V84o4QwQx2A.png)

I noticed that the component says “(Script)” at the end, so let’s check that out before breaking out Wireshark. Clicking the little [cog] icon and selecting [edit script] results in nothing as it’s compiled into the UnityEngine.Networking.dll. Luckily a quick search results in [the source](https://github.com/jameslinden/unity-decompiled/blob/master/UnityEngine.Networking/NetworkDiscovery.cs) where we can see that the StartAsServer method calls the NetworkTransport.StartBroadcastDiscover method. Again a little searching to find [the NetworkTransport source](https://github.com/MattRix/UnityDecompiled/blob/master/UnityEngine/UnityEngine.Networking/NetworkTransport.cs) *aaaand that how far down the rabbit hole goes.*

    [GeneratedByOldBindingsGenerator]
    [MethodImpl(MethodImplOptions.InternalCall)]
    private static extern bool StartBroadcastDiscoveryWithoutData(int hostId, int broadcastPort, int key, int version, int subversion, int timeout, out byte error);

### Well, Wireshark it is…

Select your main network interface, and enter udp.port == 64764 as a filter to match the port specified in the component. If you now start broadcasting in Unity you’ll see the following:

![Packets, one per second as specified above](/img/1_eoII0XQwUsiGAkCI8PXjIw.png)

Selecting any packet and opening the Data part shows us the interesting stuff:

![We don’t care about the first 4 things, except taking note of the subnet broadcast address: 192.168.xxx.255](/img/1_2f2PJusbufJsA5Zz8MhKqA.png)

### We need more data

Let’s open up Unity again, and start changing around values to see what happens with the data bytes. After a few variations I ended up with the following text file:

![Key, Version, Subversion, Data (just in case it wasn’t clear)](/img/1_BYLc2r0jM1_-v8KOtgKzdQ.png)

Immediately we can see patterns emerging:

* all the samples have a bunch of zeroes in the middle

* all the samples start with [0x00 0x00 0x09]

* the data field is at the end, as the beginnings look similar enough

With a little trial and error it’s not hard to figure it all out:

1. We begin with the mentioned [0x00 0x00 0x09] sequence

1. Two random bytes are inserted that remain the same for the broadcasting session (So if you change nothing except restart the broadcast these will be different)

1. The key integer appears in 4 bytes using the reversed endianness of the windows default.

1. We see 8 4 byte blocks of zeroes, probably for future fields

1. We have the version integer on the same reversed endian 4 bytes

1. We have the subversion integer the same way

1. And finally we see the data string, ASCII encoded with a 0x00 byte between every character

Replicating this in C# is simple enough, a few byte arrays, a little LINQ and a BitConverter here and there — [here is the GitHub Gist for a .net core console app](https://gist.github.com/tomzorz/4ee9a03af84d2e83056b6a7acedcd16e).

To make sure that we did everything right let’s see it in action:

![\o/](/img/1_KTYBKc1CK0XKzkgmUqj4NQ.png)

I hope this served as a little introduction on network protocol reverse engineering, and is useful for interacting with Unity as well.