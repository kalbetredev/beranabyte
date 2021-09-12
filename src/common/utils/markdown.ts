import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import TocItem from "../types/TocItem";
import * as cheerio from "cheerio";
import hljs from "highlight.js";

const getMarkdownItInstance = (
  options: { enableTocPlugin: boolean } = { enableTocPlugin: false }
): MarkdownIt => {
  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return "";
    },
  });

  md.use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: "§",
  });

  if (options.enableTocPlugin) md.use(markdownItTocDoneRight);

  return md;
};

export const getRenderedHtml = (text: string): string => {
  const md = getMarkdownItInstance();
  return md.render(text);
};

export const getTableOfContent = (text: string): TocItem[] => {
  const md = getMarkdownItInstance({ enableTocPlugin: true });
  const renderedBlogWithTOC = md.render("[[toc]]\n\n" + text);
  const $ = cheerio.load(renderedBlogWithTOC);
  const $ol = $(".table-of-contents > ol");
  return getToc($, $ol);
};

const getToc = (
  $: cheerio.CheerioAPI,
  ele: cheerio.Cheerio<cheerio.Element>,
  level: number = 1
): TocItem[] => {
  const tocItems: TocItem[] = [];
  if (ele.children.length == 0) return tocItems;

  ele.children().each((i, item) => {
    const $a = $(item).children("a:first-of-type");
    const tocItem: TocItem = {
      id: $a.attr("href"),
      label: $a.text().trim(),
      level: level,
      subTocItems: [],
    };

    if (item.children.length > 1) {
      var $innerOl = $(item).children("ol:first-of-type");
      const innerTocItems: TocItem[] = getToc($, $innerOl, level + 1);
      innerTocItems.forEach((iTocItem) => tocItem.subTocItems.push(iTocItem));
    }

    tocItems.push(tocItem);
  });

  return tocItems;
};
