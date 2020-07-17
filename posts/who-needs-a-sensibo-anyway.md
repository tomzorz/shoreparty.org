---
title: Who needs a Sensibo anyway?
description: "If you're reading this post you're probably in the target audience for a certain Instagram ad alongside with me, advertising Sensibo: a magical IoT gadget that turns your \"dumb\" air conditioner into a \"smart\" one. This is the story of me not buying one."
date: 2020-07-13
tags:
  - iot
  - reverse engineering
  - development
  - dotnet
  - csharp
  - open source
  - python
  - clang
  - raspberry pi
  - ssh
  - infrared
  - air conditioning
layout: layouts/post.njk
---
If you're reading this post you're probably in the target audience for a certain Instagram ad alongside with me, advertising Sensibo: a magical IoT gadget that turns your "dumb" air conditioner (AC) into a "smart" one. This is the story of me not buying one.

![A Sensibo on a wall](/img/wnasa/1.png)

## The origins

Let's roll back the wheel of time far... far into the past: the year is 2016, the month is March-ish. Yours truly suddenly has a flashback to the summer of 2015 and remembers how incredibly hot and unbearable it was, and henceforth orders an AC. The AC installer guy comes out and offers me a few options for a unit, but essentially 2 choices remain that match my requirements:

- AC A: does everything I want, costs $500
- AC B: does exactly the same as AC A, but it has wifi, costs $800. 

Not intending to pay $300 for a chip worth ~$3 and software that can be probably licensed for $20 a unit, I went with option A. 

Years go by until Sensibo becomes a thing, inserting itself into the back of my mind - but somehow I never purchased it (guess this is surprising for someone having 25 devices with IP addresses in their home). Then 2020 rolls around, and I finally decide to do it - obviously prefacing my purchase with my usual check of the internets: this is the point where I come across rumors that Sensibo is considering making their service subscription based. I don't know whether there's any truth to that whatsoever. What I know on the other hand is the following: 

- I've heard about other IoT devices going subscription based later in their lifecycle;
- I have a Raspberry Pi Zero W in my drawer;
- *and finally*, I have a masochistic tendency to reverse engineer protocols.

A plan started to formulate in my mind: I could - in theory - record what my AC's own infrared (IR) remote sends, figure out the encoding and the protocol for the control commands, then recreate said commands from a networked device.

## Ingredients

I dove head first into my "IoT drawer" (which is right above the fabled "cable drawer" everyone in IT has), grabbed the aforementioned raspberry pi and a little plastic bag (which is even older than my AC), containing IR parts. These parts were sadly not really labeled, and while I and others I asked could identify the LED and the receiver - we had no clue what the other bits and bobs (diodes, capacitors or resistors) were. No bits and bobs, no IR signals. Bummer. 

Luckily, a cursory search directed me towards an IR hat, the [Energenie ENER314-IR](https://energenie4u.co.uk/catalogue/product/ENER314-IR) which I managed to find in stock on Amazon. These "hats" are similar to expansion cards in PCs - you just plug them into the pre-existing pins and you're set - no need for any extra tinkering.

![Energenie ENER314-IR hat](/img/wnasa/2.png)

There was only one small problem:

![Raspberry PI Zero W](/img/wnasa/3.png)

The Raspberry Pi Zero W doesn't have the pins on it, I need to solder them on. Luckily it was a good idea earlier...

- to order a soldering iron with some accessories;
- buy a 3D Printer to print a machine vise that'd hold the PCB;
- and upgrade my PC last year so that I'd have a leftover CPU fan.

(I totally planned this, all the purchases were leading me to this, yep.)

## Doing something I never did before

Even though I watched a few tutorials on soldering I dove into the task with the "enthusiasm" of a cat about to get in the shower. I just had this vision in my head of my raspberry's PCB melted to the PLA plastic holding it...

![Raspberry PI Zero W w/ pins, in a 3D Printed vise, with a CPU fan as ventilation. 100% pure, certified, mil. spec. jank™](/img/wnasa/4.png)

BUT, I made it. Woo! It's definitely *not* perfect, but decent enough. And more importantly: it works.

![The results of my handiwork - as I got to the right side it started to become decent](/img/wnasa/5.png)

Quickly popped the IR hat on, a nicely prepared microSD card in, and I was ready to rock. I'll skip the details of the microSD setup - there are many readily available tutorials about doing that. The key is to enable SSH, and add the wireless network's details that the OS needs to connect to after booting.

![The complete setup](/img/wnasa/6.png)

Setting up the IR hat to actually work was a bit harder, as I'm guessing the [official manual](https://energenie4u.co.uk/res/pdfs/ENER314-IR_User_guide_V3.pdf) was a bit out of date. What ended up working for me was to follow [this guide from Anavi](https://github.com/AnaviTechnology/anavi-docs/blob/master/anavi-infrared-phat/anavi-infrared-phat.md#setting-up-lirc) and combine that with the hardware specifics of the manual. An hour of tinkering later my terminal window was finally filled with numbers after entering "IR dump" (dump any incoming signals to the console) mode with `mode2 -d /dev/lirc1`.

![mode2 output showing IR light pulses and spaces inbetween in µs (microsecond, one millionth of a second)](/img/wnasa/7.png)

## Time for the masochistic tendencies

I mean reverse engineering. 

Step zero is checking whether I need to do anything at all. It took me about 10 minutes to realize, I do. My AC (and its rebranded variants) don't seem to exist in any of the online pre-made IR remote databases. *So it goes.*

Step one is data gathering. I tried going the official route, using [irrecord from the LIRC suite](https://www.lirc.org/html/irrecord.html). Sadly my remote seems to be doing something definitely non-standard as irrecord became completely broken during recording. Cutting my losses after half an hour, I tried going the "dumb" route: what if I just pipe the mode2 output into a text file? 

![Thousands of lines](/img/wnasa/8.png)

It obviously worked, but it was basically useless. There was too much ambient IR noise in my apartment even when I tried covering my sensor from most angles, so my file was full of random 10-100µs signals/pauses; plus to top it all off, there wasn't an easy way to distinguish separate signal blocks in it. 

Eventually I managed to find an application designed for exactly my needs: [IrScrutinizer](http://www.harctoolbox.org/IrScrutinizer.html). 

![IrScrutinizer capture settings](/img/wnasa/9.png)

The tricky bit was to get the signals over to it from the raspberry pi. I solved this with the most glorious command chain I ever used: `wsl ssh pi@raspberrypi mode2 -d /dev/lirc1`.  WSL sits in front, because the ssh client built into Windows 10 had troubles setting up the keyfile based authentication. Inside WSL we connect via ssh to the raspberry, which in turn launches into mode2 *aaaaaaaand* all this is piped back to the JVM running IrScrutinizer. Beautiful.

![IrScrutinizer capture mode](/img/wnasa/10.png)

After getting my capture mode up and running, I started going over all the various features of my AC remote: power, mode, temperature, swing, fan speed etc... and making a note of each change, matching the signals. IrScrutinizer helpfully popped up, that indeed this seems like the [NEC Protocol](https://techdocs.altium.com/display/FPGA/NEC+Infrared+Transmission+Protocol), although as we'll find out soon it only seemed like that. After some cleanup, I ended up with the following text file:

![Cleaned up IR recording](/img/wnasa/11.png)

Time for step three, making sense of the pulses. In the text file we can already see that we deal with 140 signals per command, and that this is definitely *not* standard NEC Protocol, as we have a long pause in the middle and at the end. Thankfully "not standard" doesn't mean "completely different", so I jumped into Visual Studio and whipped up PulseWrangler: a simple c# command line tool that'd help me make sense of the timings. In the NEC IR protocol we have 3 different signal pairs to make sense of:

- 9000µs long pulse followed up by 4500µs pause: this indicates the beginning of a signal block,
- ~600µs long pulse followed up by ~600µs pause: this indicates a binary zero signal,
- ~600µs long pulse followed up by ~1650µs pause: this indicates a binary one signal.

As I said, my remote has a 600µs pulse followed up by a ~20000µs pause break in the middle, plus the ending seems to have a gigantic pause with even larger variation. Even the values coming from the NEC standard were all over the place, so the code was really lenient - often allowing for ±50% difference from the specification. While debugging I quickly noticed that some of my signal blocks had 142 signals instead of 140 - I cleared these up by hand after finding them. 

![PulseWrangler parser, nothing magical just a bunch of ifs](/img/wnasa/12.png)

So after running this parser I ended up with a bunch of lines looking like `S00101000...01X100...11000100E`. Much better. I adjusted the output a bit so I got a csv out, and opened it up in Excel for analysis. 

Figuring out the protocol isn't as hard as it looks like - just have to follow two rules:

- make notes of what changed between each signal block,
- only change one thing at a time.

That's it - the whole modus operandi. This way I could quickly identify which bit ranges that were responsible which settings - as these were the only ones changing when I modified said settings. I've also found a Chinese blog post later (that doesn't seem to load anymore 😟) for a slightly similar remote (model YB0F2) compared to mine (YX1F), which had *some* usable information on a few of the unidentified values and the checksum calculation.

![Formatted Excel](/img/wnasa/13.png)

Getting closer. I figured out everything I wanted to, except for the power on/off... which later turned out to be an issue created by IrScrutinizer not having the signals in order when I was making my notes. Let's quickly review the table:

1. not surprisingly we start with the start signal
2. bits 1-3 are for picking the mode: auto, cool,  dry, fan or heat
3. bits 4 and 23 seems to be power
4. bits 5-6 are for fan speed, but apparently on my AC bit 21 indicates fan speed 4 
5. bits 7, 37 and 41 indicate the air direction swing on/off
6. bit 8 is apparently sleep, although I didn't implement this
7. bits 9-12 are for the temperature, offset by 16
8. bits 13 to 20 are the two timings used by the timer features, didn't implement these either
9. in the middle we have the separator signal
10. bits 65-68 are the checksum (calculated by the other values to verify this is a correct signal)
11. and finally at the end we have the end signal

An additional "extra hard" look reveals that all the numbers are little endian encoded.

There are a few other values marked by question marks, these came from that Chinese blog post - I don't think they match my AC as my fan level 4 conflicts with their humidify feature, which isn't even a thing my AC can do. I kept them in nonetheless as they were referenced in the checksum equation, which goes as follows:

1. Calculate `(mode - 1) + (temperature - 16) + 5 + swing - ((1-power) * 8)`
2. Convert to binary
3. Take the least four significant bits and drop the rest

That equation above for the similar remote apparently references two unidentified signals which were always zero in my case, so I dropped those. In turn, the power signal was really different in my case: after recording a bunch more signals and some trial and error I figured out that when I want to turn off the AC I need to subtract 8 from the final checksum value.

## Onto calmer C-s

With the protocol figured out, it was time to try sending it back to the AC. I thought it'll be cakewalk from this point as I was sure there's a way to just do the reverse of what mode2 does: I supply raw timings to the app and it outputs them.

I was wrong.

LIRC's built in tool, [irsend](https://www.lirc.org/html/irsend.html) is apparently made only for sending signal blocks created by irrecord. No go. It supposedly has a raw mode, but this didn't seem to work for me when I tried to replay a few recorded signals. Back to searching again.

I managed to come across a library called [pigpio](http://abyz.me.uk/rpi/pigpio/), which promised raw GPIO control with tight timings. Because I'm lazy, I kept searching for someone who already implemented a "raw irsend" on top of this. My search efforts paid off soon: Brian Schwind's excellent library [ir-slinger](https://github.com/bschwind/ir-slinger) was exactly what I was looking for. I cloned the repo and its dependencies, and set up a convenient dev environment on my raspberry pi. Normally to do that on a remote machine you'd install the VSCode's remote extensions but they don't work on ARMv6 CPUs, which my raspberry pi zero w has. Instead I used [sshfs-win](https://github.com/billziss-gh/sshfs-win) to mount the raspberry's internal storage as a network drive in windows. 

![sshfs-win in action, pretty cool](/img/wnasa/14.png)

After creating a copy of the "send raw message" sample from ir-slinger and adjusting its settings to match my GPIO pins I started tinkering. I began with adding a known-good recorded message as a test... and I got a segmentation fault. As I faced an unknown bug, I started doing the trusty "binary bug search" method - commenting out parts of the source code to find the offending piece. This yielded an interesting result: my message's ending values caused the error.

I did a little math on the the signal lengths and realized that I probably captured the time I spent between issuing the separate commands on the remote. I started cutting the values by a lot, and finally found that a 600µs pulse with a ~40000µs pause did the trick: it worked! 🎉 Took two weekends, but I finally changed a setting on my AC from the terminal. With that morale boost and flashbacks to my 1st programming class in college I started writing my *beautiful* (not) C code. 

![Basic settings and constants, with a pre-set message](/img/wnasa/15.png)

I decided to leave the known good message hardcoded in there with plenty of comments, and just modify that based on the command line arguments coming in. At this point I also learned about the fact that there's no easy way to create enums from strings in C, unless I do templating.

![Getting the command line arguments](/img/wnasa/16.png)

The necessary binary representations are created with the `toBinary` method which outputs the converted number into the specified array. After said array is filled out, I just need to overwrite the preset message based on its values, while paying attention to the endianness. As both the zero and one values start with the same 600µs long pulse, I only need to adjust the 2nd value - the pause - in the pairs with the `signalZero` or `signalOne` constants.

![Modifying the message](/img/wnasa/17.png)

Now I could supply what parameters I want, and the correct signal gets generated:

![Invoking the controls from the command line](/img/wnasa/18.png)

*Excellent! Moving right along.*

## Snakes on a ~~plane~~ board

There was only one step remaining, calling my shiny new tool from the network. Following the pattern of doing things I basically never do, I decided to go with python for this. Helpful folks quickly directed me towards [flask](https://flask.palletsprojects.com/), a truly simple to use python web framework.

A StackOverflow question helped me out with the GET parameters, a second one with doing syscalls and a final one with the int/string conversion. Just look at this beauty: 

![The magnificent server code](/img/wnasa/19.png)

Calling it from the browser on my main PC: not much too look at, but the beep from my AC is music to my ears. 

![Network invoke in action](/img/wnasa/20.png)

Only one more thing remaining, to start the service on every boot. I think I've heard on twitter that we need to hate systemd or whatever, but everyone on SO said that it's what I need to do this... so systemd it is. I created a service description file - or "unit" as it's apparently called - where I find my python3 binary and launch the tiny script with it. A quick reboot test verified it works! 

## Epilogue

There are a few things remaining for me: designing and printing a case, and mounting a raspberry somewhere near my AC - I'm thinking about making a curtain rod mount. 

To you dearest reader - as a thank you for making it through -, I leave my github repo: https://github.com/tomzorz/who-needs-a-sensibo-anyway

In here you can find the following:

- `/data/` contains the cleaned up recordings I made, and the reverse engineering excel;
- for good measure `/docs/` has the manual for the IR hat I used;
- `/source/PulseWrangler/` has the C# code that helped me translate the signal pulses into binary;
- `/source/raspberry/` has the pulse generator C code;
- `/source/raspberry/api/` has the flask python server code;
- and finally `/source/raspberry/service/` has the systemd service definition.

Hope this post inspires at least a few of you to try something new, and make something "dumb" be a bit "smarter".

---

## Footnote(s)

1. I graciously skipped over the question of wavelength. Apparently most IR remotes operate at 38 kHz - including my remote. So luckily I could just leave every configuration option at the default.