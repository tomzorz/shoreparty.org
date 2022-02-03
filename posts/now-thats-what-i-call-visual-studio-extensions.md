---
title: Now That's What I Call Visual Studio Extensions (2022 edition)
description: "Endorsing essential extensions to enhance your development environment."
date: 2022-02-03
tags:
  - visual-studio
  - development
  - extensions
  - xaml
  - csharp
layout: layouts/post.njk
---

Funnily enough I've started this article when I was using Visual Studio 2017... and somehow never ended up finishing it. Nevertheless, finally with the release of Visual Studio 2022, I had an "opportunity" to move my extensions over from 2019 - make a list, check it twice and all that. Not all of the things I used are compatible _yet_, but on the other hand I've found a few good new ones.

You might be wondering "Won't installing all these extensions slow down Visual Studio?", to which the answer is a resounding **yes**... **BUT** they'll save you magnitudes more time by increasing your productivity. It's definitely a tradeoff, but I strongly have a preference. I barely ever close VS, so for example the 30 seconds lost at launch waiting for things to load are nothing compared to the minutes I often save on refactoring something.

## ReSharper

This here "extension" gets its own category. [ReSharper](https://www.jetbrains.com/resharper/) is JetBrains's mega-extension for Visual Studio, adding way more [new features, improvements and straight up replacements](https://www.jetbrains.com/resharper/features/) that I could list here. I recommend visiting the features page I just linked and reading about its various capabilities. It's also one of the tools that I credit with making me a better developer - the static analysis provided by it made me write better, faster and more secure code. (Although it's worth mentioning that VS has been catching up in the area somewhat since Roslyn arrived.)

ReSharper itself has its own extensions and text templates - some of which are pretty cool, e.g. [this one for Unity developers](https://plugins.jetbrains.com/plugin/11629-unity-support) that aligns its suggestions more with the Unity standard practices, or [this one that enhances the built-in tooltips](https://plugins.jetbrains.com/plugin/11621-enhanced-tooltip).

Unlike all the other extensions I'll list, this one needs a [paid subscription](https://www.jetbrains.com/resharper/buy/#personal) but I think it's a $ value that gets returned to you in saved time and effort within weeks.

💾 **VS2010 to VS2022** https://www.jetbrains.com/resharper/download/#section=offline-installer

## Productivity

### Productivity Power Tools

Microsoft DevLab's extension bundle is a true gem: it includes ~10 smaller extensions (that you can install separately if you'd like) that add small but handy enhancements to VS. My two favorites are [Match Margin](https://marketplace.visualstudio.com/items?itemName=VisualStudioPlatformTeam.MatchMargin2022) that highlights other occurrences of the selected text in the editor scrollbar, and [Shrink Empty Lines](https://marketplace.visualstudio.com/items?itemName=VisualStudioPlatformTeam.SyntacticLineCompression2022) that saves screen space by shrinking empty lines vertically, letting me see more of the actual code.

💾 **VS2022** https://marketplace.visualstudio.com/items?itemName=VisualStudioPlatformTeam.ProductivityPowerPack2022
💾 **VS2017 to VS2019** https://marketplace.visualstudio.com/items?itemName=VisualStudioPlatformTeam.ProductivityPowerPack2017

### Output Enhancer

This extension by Nikolay Balakin adds coloring to the Build and Output windows, making them a lot easier to digest.

💾 **VS2012 to VS2022** https://marketplace.visualstudio.com/items?itemName=NikolayBalakin.Outputenhancer

### File Icons

Mads Kristensen is a VS giant by day and apparently by night too - while working on VS itself at Microsoft (at least at the time of writing this) [he has also authored over a 100+ extensions for it](https://marketplace.visualstudio.com/publishers/MadsKristensen). The one I'm recommending here adds a bunch of new icons to the Solution Explorer, so various non-code related files are more easily identifiable.

💾 **VS2017 to VS2022** https://marketplace.visualstudio.com/items?itemName=MadsKristensen.FileIcons

## Code Understanding

### CodeBlockEndTag

KhaosPrinz's extension might be my favorite tiny enhancement to VS. Whenever the beginning of a block is not visible, it adds little tags to the block's end reminding you of their beginning.

A bit of extra history _as a treat_: I first came across this feature in the VSCommands extension, but sadly both the extension and the company behind it disappeared around 2014 - with no upgrades available to new VS versions.

💾 **VS2015 to VS2022** https://marketplace.visualstudio.com/items?itemName=KhaosPrinz.CodeBlockEndTag

### CI CodeLens Info

CodeLens is a much loved VS feature that adds a little extra context to classes, interfaces and methods. Thankfully it's also extendable, so now next to the default source control and reference information we can get a little more information about the selected element itself. We can thank Luiz Fernando DINATO for authoring this one.

💾 **VS2022** https://marketplace.visualstudio.com/items?itemName=LuizFernandoDINATO.CICodeLensInfo2022
💾 **VS2019** https://marketplace.visualstudio.com/items?itemName=LuizFernandoDINATO.cicodelensinfoextension

### microscope

Robert Hofmann's extension adds a few windows and a CodeLens bit that allow us to see the generated IL of methods, lambdas, closures and more. As Robert phrases on the extension's page _"It's mostly useful for learning and getting a better understanding of how C# works internally"_ and I completely agree. Trying to be smarter than the compiler is often futile, but at least it's nice to see what it's doing.

💾 **VS2022** https://marketplace.visualstudio.com/items?itemName=bert.microscope

This extension is also available for VS2019 but you'll have to manually install it - see the linked VS2022 page above for instructions.

## Debugging

### ArrayPlotter

Clue's in the name, as always - Rodney Thomson's extension adds various ways to visualize C, C++ and C# arrays in multitudes of ways. Understanding large numerical arrays in the debug tooltips as endless lines of numbers is hard - and this is an excellent way to alleviate that problem.

💾 **VS2022** https://marketplace.visualstudio.com/items?itemName=RodneyThomson.ArrayPlotter64
💾 **VS2012 to VS2019** https://marketplace.visualstudio.com/items?itemName=RodneyThomson.ArrayPlotter

### ArrayVisualizer

More of the same, originally by Amir Liberman, but more recently by Manuel Eisenschink. This time it's less _plotting_ but more _visualizing_ of tables, cubes and more. I've found this extension very useful during the most recent Advent of Code challenge, where almost every time we had to deal with various 2D arrays.

💾 **VS2015 to VS2022** https://github.com/Skyppid/Array-Visualizer/

You'll have to find and pick the proper release for your VS version following the link above.

## Formatting

### CodeMaid

This superb code-cleanup extension by Steve Cadwallader helps a ton with arranging, formatting and cleaning up code. Highly customizable and a treat to use, especially with the exponentially growing files. _(That we should definitely refactor into multiple files, we just need to fit it into one of these sprints coming up. One of these days.)_

💾 **VS2022** https://marketplace.visualstudio.com/items?itemName=SteveCadwallader.CodeMaidVS2022

This extension is also available for older VS versions but you'll have to manually install it - see the linked VS2022 page above for instructions.

### Trailing Whitespace Visualizer

The 2nd extension in my list from Mads Kristensen, this time - as the title suggests - to highlight trailing whitespaces in your code. They are invisible and annoying by default - this helps with getting rid of them.

💾 **VS2017 to VS2022** https://marketplace.visualstudio.com/items?itemName=MadsKristensen.TrailingWhitespaceVisualizer

(The marketplace page doesn't list VS2022 but it installed for me just fine.)

### XamlStyler

Probably the most niche extension in the list, this is only useful for the XAML based UI developers. Xavalon's tremendous addition to VS helps with (optionally auto-) formatting your XAML documents. Highly customizable to fit your team's preferences, and helps a lot with maintaining consistency and readibility.

💾 **VS2022** https://marketplace.visualstudio.com/items?itemName=TeamXavalon.XAMLStyler2022
💾 **VS2017 to VS2019** https://marketplace.visualstudio.com/items?itemName=TeamXavalon.XAMLStyler

## Other

### Font Sizer 2.0

The third and final extension from Mads - something that's mostly useful for screen sharing / casts or presentations. The extension provides a quick and easy way to adjust the font size of the UI or code.

💾 **VS2017 to VS2022** https://marketplace.visualstudio.com/items?itemName=MadsKristensen.FontSizer2
