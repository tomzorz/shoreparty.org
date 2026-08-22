import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";
import implicitFigures from "markdown-it-implicit-figures";
import { html5Media } from "markdown-it-html5-media";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy. MM. dd.");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // ~300 wpm, same output as the retired eleventy-plugin-reading-time package
  eleventyConfig.addFilter("readingTime", post => {
    const html = typeof post === "string" ? post : post.templateContent;
    if (!html) return "0 minutes";
    const text = html.replace(/(<([^>]+)>)/gi, "");
    const words = text.match(/[Ѐ-ӿ]+|\S+\s*/g)?.length ?? 0;
    return `${Math.ceil(words / 300)} min`;
  });

  eleventyConfig.addCollection("tagList", collection => {
    const tagSet = new Set();
    for (const item of collection.getAll()) {
      if (!("tags" in item.data)) continue;
      for (const tag of item.data.tags) {
        // this list should match the `filter` list in tags.njk
        if (["all", "nav", "post", "posts"].includes(tag)) continue;
        tagSet.add(tag);
      }
    }
    return [...tagSet];
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.addPassthroughCopy("_redirects");

  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      class: "direct-link",
      symbol: "#",
      placement: "after"
    })
  }).use(html5Media, {
    videoAttrs: 'class="video-embed" autoplay controls muted loop',
    audioAttrs: 'class="audio-embed" data-collapse'
  }).use(implicitFigures, {
    figcaption: true
  }).use(markdownItFootnote);
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    templateFormats: [
      "md",
      "njk",
      "html"
    ],

    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",

    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
