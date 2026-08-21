import { ReportBlock } from "./types"

const HEADING_PATTERN = /^(#{1,6})\s+(.*)$/
const LIST_ITEM_PATTERN = /^[-*+]\s+(.*)$/
const HORIZONTAL_RULE_PATTERN = /^[-*_]{3,}$/

const stripInlineMarkdown = (text: string) =>
  text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .trim()

export const parseMarkdownBlocks = (markdown: string): ReportBlock[] =>
  markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !HORIZONTAL_RULE_PATTERN.test(line))
    .map<ReportBlock>((line) => {
      const heading = HEADING_PATTERN.exec(line)
      if (heading) {
        return {
          type: "heading",
          level: Math.min(heading[1].length, 3) as 1 | 2 | 3,
          text: stripInlineMarkdown(heading[2]),
        }
      }

      const listItem = LIST_ITEM_PATTERN.exec(line)
      if (listItem) {
        return { type: "listItem", text: stripInlineMarkdown(listItem[1]) }
      }

      return { type: "paragraph", text: stripInlineMarkdown(line) }
    })
