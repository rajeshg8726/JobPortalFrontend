import React from "react";
import { Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

const MarkdownRenderer = ({ content }) => {
  const parseMarkdown = (markdown) => {
    if (!markdown || typeof markdown !== "string") return "";

    let html = markdown;

    // Headers
    html = html.replace(/^###### (.*$)/gm, "<h6>$1</h6>");
    html = html.replace(/^##### (.*$)/gm, "<h5>$1</h5>");
    html = html.replace(/^#### (.*$)/gm, "<h4>$1</h4>");
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

    // Bold and Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/\_\_\_(.*?)\_\_\_/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\_\_(.*?)\_\_/g, "<strong>$1</strong>");
    html = html.replace(/\_(.*?)\_/g, "<em>$1</em>");

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
      return `<pre class="code-block" data-language="${
        lang || "text"
      }"><code>${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Images
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" class="markdown-image" />'
    );

    // Lists
    html = html.replace(/^\* (.+)/gm, "<li>$1</li>");
    html = html.replace(/^- (.+)/gm, "<li>$1</li>");
    html = html.replace(/^\d+\. (.+)/gm, "<li>$1</li>");

    // Wrap list items
    html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
      return `<ul>${match}</ul>`;
    });

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr class="markdown-hr" />');
    html = html.replace(/^\*\*\*$/gm, '<hr class="markdown-hr" />');

    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");

    // Alert boxes
    html = html.replace(
      /^!!! (info|warning|success|tip) (.*)$/gm,
      (match, type, content) => {
        const icons = {
          info: "info",
          warning: "warning",
          success: "success",
          tip: "tip",
        };
        return `<div class="alert alert-${type}" data-type="${icons[type]}">${content}</div>`;
      }
    );

    // Line breaks
    html = html.replace(/  \n/g, "<br>");
    html = html.replace(/\n\n/g, "</p><p>");

    // Wrap in paragraphs
    if (
      !html.includes("<p>") &&
      !html.includes("<h") &&
      !html.includes("<ul>")
    ) {
      html = `<p>${html}</p>`;
    }

    // Cleanup
    html = html.replace(/<p><\/p>/g, "");
    html = html.replace(/<p>(<h[1-6]>)/g, "$1");
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1");
    html = html.replace(/<p>(<blockquote>)/g, "$1");
    html = html.replace(/(<\/blockquote>)<\/p>/g, "$1");
    html = html.replace(/<p>(<pre)/g, "$1");
    html = html.replace(/(<\/pre>)<\/p>/g, "$1");
    html = html.replace(/<p>(<ul>|<ol>)/g, "$1");
    html = html.replace(/(<\/ul>|<\/ol>)<\/p>/g, "$1");
    html = html.replace(/<p>(<div class="alert)/g, "$1");
    html = html.replace(/(<\/div>)<\/p>/g, "$1");
    html = html.replace(/<p>(<hr)/g, "$1");
    html = html.replace(/(<\/hr>)<\/p>/g, "$1");

    return html;
  };

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
};

export default MarkdownRenderer;