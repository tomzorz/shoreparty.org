---
title: Trim, crop and more - basic video editing with ffmpeg
description: "Learn how to accomplish a few simple video editing tasks in the terminal using ffmpeg - in this session we'll make videos smaller"
date: 2022-04-29
tags:
  - software
  - video-editing
  - ffmpeg
  - tutorial
  - guide
layout: layouts/post.njk
---

In this first installment of ffmpeg tutorials, let's take a look at trimming (something that makes a video smaller), cropping (something that makes a video smaller) and also, making videos smaller. These three might be the most often needed use cases I encounter. In the following examples I'll always use `input.mp4` and `output.mp4` as input and output respectively - just replace these with your actual filenames. The `-i` flag specifies _an_ input, and they generally always come in the beginning. The last parameter is always the output name, conveniently no flag needed for that.

## Trimming

Trimming lets us slice out a desired timespan from a video, and with ffmpeg we can do this without re-encoding it - this means that this action is almost "instant", opposed to regular video editors. The time trimming will take only depends on your storage speed, copying the necessary parts into a new file.

To trim a video, call:

```
ffmpeg -ss 00:01:00 -i input.mp4 -to 00:02:00 -c copy output.mp4
```

Where the options are as follows:

- `-ss` is the start of the trim in the `HH:MM:SS.xxx` or `SS.xxx` format,
- `-to` is the end of the trim in the `HH:MM:SS.xxx` or `SS.xxx` format,
- you can also specify `-t` instead of `-to` if you want to trim X seconds after the starting point, e.g. `-t 10` will take 10 seconds after the starting point.

You can skip either the `-ss ...` or the `-to ...` parts if you don't want to cut anything from the beginning, or from the end. The `-c copy` part will make sure that ffmpeg does this without re-encoding the video.

## Cropping

Cropping works exactly as you'd crop pictures - it lets you keep the desired area of the frame and throw away everything else. To crop videos, we'll use the `-filter:v` flag - a video filter, specifically the `crop` one:

```
ffmpeg -i input.mp4 -filter:v "crop=out_w:out_h:x:y" output.mp4
```

Where the options are as follows:

- `out_w` is the width of the output rectangle in pixels,
- `out_h` is the height of the output rectangle in pixels,
- `x` and `y` specify the top left corner of the output rectangle, also in pixels.

To crop an 800×600 section, starting from position 100,50 you'd call...

```
ffmpeg -i input.mp4 -filter:v "crop=800:600:100:50" -c:a copy output.mp4
```

Or to crop the bottom right quarter, you'd call...

```
ffmpeg -i input.mp4 -filter:v "crop=in_w/2:in_h/2:in_w/2:in_h/2" -c:a copy output.mp4
```

You can see here how you can use the `in_w` and `in_h` parameters to refer to the original height and width of the input. The `-c:a copy` flag tells ffmpeg to copy the audio as-is. The crop filter has a few more options and tricks up its sleeve - for these I recommend checking out the [examples in the ffmpeg filters documentation](https://ffmpeg.org/ffmpeg-filters.html#crop).

Important to remember, that most of these flags and filters can be used in combination, e.g. applying the `-ss 00:00:10` flag to the beginning of the crop commands above would also remove the first 10 seconds of the video.

## Reducing file size

Finally, it's also a very typical task is to reduce a video file's size, preferably without noticeable change in quality. To do so, we can re-encode videos with high efficiency codecs and / or use different quality settings in them.

Typically, I would recommend using the H.264 and H.265 codecs to encode things for consumption nowadays. If you're not familiar with codecs, they are the algorithms that turn raw image data (which is huge) into a compressed format (which is much smaller). The more modern a codec is, the less support you might find in consumer devices and software for them, but at the same time they might offer significantly better compression rates for similar quality video. H.264 is supported by almost everything, while H.265 might not be supported yet by your 10-year-old smart TV, or your in-laws' old browser that they never updated.

To re-encode a video using H.265, call:

```
ffmpeg -i input.mp4 -vcodec libx265 -crf QUALITY output.mp4
```

To re-encode a video using H.264, call:

```
ffmpeg -i input.mp4 -vcodec libx264 -crf QUALITY output.mp4
```

Where the options are as follows for both calls:

- `-crf` (which stands for "constant rate factor") is the quality, experiment with values between 24 to 30 for H.265; and 18 to 24 for H.264. A higher CRF value corresponds to lower bitrates, therefore they'll make your video's file size smaller.

If you want to target a specific file size, that's also possible, albeit [significantly more complicated](https://stackoverflow.com/a/29082672/4788286). Thankfully you don't have to understand everything those commands do: you can just replace the few marked parts of the command to match your desired outcome.
