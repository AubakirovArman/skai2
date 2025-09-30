"use client"

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRenderProps {
  content: string
  className?: string
  compactLists?: boolean
}

// Utility to slugify heading text for anchors
function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-я0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const MarkdownRender: React.FC<MarkdownRenderProps> = ({ content, className = '', compactLists }) => {
  return (
    <div className={`markdown-body ${compactLists ? 'markdown-compact' : ''} ${className}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1({ node, ...props }) {
            const text = String(props.children)
            const id = slugify(text)
            return (
              <h1 id={id} {...props} className="group scroll-mt-24 text-[1.65rem] font-semibold tracking-tight text-slate-800">
                <a href={`#${id}`} className="no-underline">
                  <span className="mr-2 inline-block opacity-0 transition group-hover:opacity-50">#</span>
                  {props.children}
                </a>
              </h1>
            )
          },
          h2({ node, ...props }) {
            const text = String(props.children)
            const id = slugify(text)
            return (
              <h2 id={id} {...props} className="group mt-10 scroll-mt-24 border-l-4 border-[#d7a13a]/50 pl-3 text-xl font-semibold text-slate-800">
                <a href={`#${id}`} className="no-underline">
                  <span className="mr-2 inline-block opacity-0 transition group-hover:opacity-50">#</span>
                  {props.children}
                </a>
              </h2>
            )
          },
          h3({ node, ...props }) {
            const text = String(props.children)
            const id = slugify(text)
            return (
              <h3 id={id} {...props} className="group mt-8 scroll-mt-24 text-lg font-semibold text-slate-800">
                <a href={`#${id}`} className="no-underline">
                  <span className="mr-2 inline-block opacity-0 transition group-hover:opacity-50">#</span>
                  {props.children}
                </a>
              </h3>
            )
          },
          p({ node, ...props }) {
            return <p {...props} className="my-3 leading-relaxed text-[0.92rem] text-slate-700" />
          },
            ul({ node, ordered, ...props }) {
            return <ul {...props} className="my-3 list-disc space-y-1 pl-6 marker:text-[#d7a13a]" />
          },
          ol({ node, ordered, ...props }) {
            return <ol {...props} className="my-3 list-decimal space-y-1 pl-6 marker:text-[#d7a13a]" />
          },
          li({ node, ...props }) {
            return <li {...props} className="pl-1 text-[0.9rem] leading-snug text-slate-700" />
          },
          strong({ node, ...props }) {
            return <strong {...props} className="font-semibold text-slate-800" />
          },
          em({ node, ...props }) {
            return <em {...props} className="text-slate-600" />
          },
          a({ node, ...props }) {
            return (
              <a
                {...props}
                className="font-medium text-[#b87b0d] underline decoration-[#e5b961]/40 underline-offset-[3px] transition hover:text-[#d7a13a] hover:decoration-[#d7a13a]"
                target={props.href?.startsWith('http') ? '_blank' : undefined}
                rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              />
            )
          },
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return (
                <code
                  {...props}
                  className={`rounded bg-slate-100 px-1.5 py-0.5 text-[0.75rem] font-medium text-slate-800 ${className || ''}`}
                >
                  {children}
                </code>
              )
            }
            return (
              <pre className="my-4 overflow-x-auto rounded-xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-slate-100 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.4)]">
                <code className="text-[0.75rem] leading-relaxed">{children}</code>
              </pre>
            )
          },
          blockquote({ node, ...props }) {
            return (
              <blockquote
                {...props}
                className="my-5 border-l-4 border-[#d7a13a]/40 bg-[#fffaf1] px-5 py-3 text-[0.9rem] italic text-[#5d5438] shadow-[inset_0_0_0_1px_rgba(215,161,58,0.15)]"
              />
            )
          },
          table({ node, ...props }) {
            return (
              <div className="my-6 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <table {...props} className="w-full border-collapse text-sm [--tw-border-opacity:1]" />
              </div>
            )
          },
          thead({ node, ...props }) {
            return <thead {...props} className="bg-slate-50 text-slate-700" />
          },
          th({ node, ...props }) {
            return <th {...props} className="border-b border-slate-200 px-3 py-2 text-left font-semibold" />
          },
          td({ node, ...props }) {
            return <td {...props} className="border-b border-slate-100 px-3 py-2 align-top text-slate-600" />
          },
          hr() {
            return <hr className="my-10 h-px w-full border-0 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRender
