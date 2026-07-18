"use client";

import { Fragment, ReactNode, useEffect, useState } from "react";

const RAW_URL =
  "https://raw.githubusercontent.com/daniel-bu-98/AI-Data-Engine/main/3.Data%20Operation.md";

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; text: string }
  | { type: "table"; rows: string[][] };

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    const token = match[0];

    if (token.startsWith("**")) {
      parts.push(<strong key={`${token}-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      parts.push(<code key={`${token}-${match.index}`}>{token.slice(1, -1)}</code>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        parts.push(
          <a href={linkMatch[2]} key={`${token}-${match.index}`} rel="noreferrer" target="_blank">
            {linkMatch[1]}
          </a>
        );
      }
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

function parseMarkdown(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "code", text: code.join("\n") });
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", text: quote.join(" ") });
      continue;
    }

    const isTable =
      trimmed.includes("|") &&
      index + 1 < lines.length &&
      /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1]);
    if (isTable) {
      const tableLines: string[] = [lines[index]];
      index += 2;
      while (index < lines.length && lines[index].trim().includes("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      blocks.push({
        type: "table",
        rows: tableLines.map((row) =>
          row
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((cell) => cell.trim())
        ),
      });
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const orderedList = Boolean(ordered);
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].trim().match(orderedList ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: "list", ordered: orderedList, items });
      continue;
    }

    const paragraph: string[] = [trimmed];
    index += 1;
    while (index < lines.length && lines[index].trim()) {
      const next = lines[index].trim();
      if (/^(#{1,4})\s+/.test(next) || /^[-*]\s+/.test(next) || /^\d+\.\s+/.test(next) || next.startsWith(">")) {
        break;
      }
      paragraph.push(next);
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

function MarkdownBlock({ block, index }: { block: Block; index: number }) {
  if (block.type === "heading") {
    if (block.level <= 1) return <h2>{renderInline(block.text)}</h2>;
    if (block.level === 2) return <h3>{renderInline(block.text)}</h3>;
    return <h4>{renderInline(block.text)}</h4>;
  }

  if (block.type === "paragraph") {
    return <p>{renderInline(block.text)}</p>;
  }

  if (block.type === "quote") {
    return <blockquote>{renderInline(block.text)}</blockquote>;
  }

  if (block.type === "code") {
    return (
      <pre>
        <code>{block.text}</code>
      </pre>
    );
  }

  if (block.type === "table") {
    const [head, ...body] = block.rows;
    return (
      <div className="article-table-wrap">
        <table>
          <thead>
            <tr>
              {head.map((cell) => (
                <th key={`${index}-${cell}`}>{renderInline(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={`${index}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${index}-${rowIndex}-${cellIndex}`}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const ListTag = block.ordered ? "ol" : "ul";
  return (
    <ListTag>
      {block.items.map((item) => (
        <li key={item}>{renderInline(item)}</li>
      ))}
    </ListTag>
  );
}

export default function AIDataEnginePage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadMarkdown() {
      try {
        const response = await fetch(RAW_URL);
        if (!response.ok) throw new Error("Failed to load markdown");
        const markdown = await response.text();
        if (!ignore) setBlocks(parseMarkdown(markdown));
      } catch {
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadMarkdown();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="article-page">
      <header className="article-header">
        <a href="/#projects">返回作品集</a>
        <p>AI Data Engine</p>
        <h1>Data Operation</h1>
        <span>来自 AI Data Engine 的方法论文档，整理为站内阅读页。</span>
      </header>

      <article className="markdown-article">
        {loading ? <p>正在加载文章内容...</p> : null}
        {error ? (
          <div className="article-error">
            <h2>文章内容暂时无法加载</h2>
            <p>当前网络无法访问 GitHub Raw 内容。你仍可以打开原始文档查看。</p>
            <a href={RAW_URL} rel="noreferrer" target="_blank">
              打开原始 Markdown
            </a>
          </div>
        ) : null}
        {!loading && !error
          ? blocks.map((block, index) => (
              <Fragment key={`${block.type}-${index}`}>
                <MarkdownBlock block={block} index={index} />
              </Fragment>
            ))
          : null}
      </article>
    </main>
  );
}
