import { useMemo } from 'react'
import { codeSnippets } from '@/data/codeSnippets'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTypewriter } from '@/hooks/useTypewriter'
import { tokenize, type TokenType } from '@/lib/highlight'
import type { SnippetLanguage } from '@/types'

// Constantes calculées une seule fois : références stables pour le hook.
const SNIPPET_CODES: readonly string[] = codeSnippets.map((snippet) => snippet.code)
const MAX_LINES = Math.max(...codeSnippets.map((snippet) => snippet.code.split('\n').length))

const TOKEN_CLASSES: Record<TokenType, string> = {
  keyword: 'text-violet-400',
  string: 'text-emerald-300',
  comment: 'italic text-slate-500',
  number: 'text-amber-300',
  function: 'text-cyan-300',
  decorator: 'text-amber-200',
  type: 'text-sky-300',
  plain: 'text-slate-200',
}

const LANGUAGE_LABELS: Record<SnippetLanguage, string> = {
  python: 'Python',
  typescript: 'TypeScript',
  tsx: 'TypeScript React',
  sql: 'SQL',
}

interface CodeWindowProps {
  readonly className?: string
}

/**
 * Fenêtre décorative façon éditeur de code qui écrit puis efface des extraits.
 * Masquée aux lecteurs d'écran, mise en pause hors écran, statique si
 * l'utilisateur préfère réduire les animations.
 */
export function CodeWindow({ className = '' }: CodeWindowProps) {
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>()
  const typed = useTypewriter({ texts: SNIPPET_CODES, paused: reducedMotion || !inView })

  const activeIndex = reducedMotion ? 0 : typed.index
  const snippet = codeSnippets[activeIndex]
  const language: SnippetLanguage = snippet === undefined ? 'typescript' : snippet.language
  const visibleText = reducedMotion ? (snippet?.code ?? '') : typed.text

  const tokens = useMemo(() => tokenize(visibleText, language), [visibleText, language])
  const lineCount = visibleText.split('\n').length

  return (
    <div ref={ref} aria-hidden="true" className={`relative isolate ${className}`}>
      {/* Halo lumineux diffus */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-linear-to-r from-brand-cyan/20 to-brand-violet/20 blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/40 backdrop-blur-md">
        {/* Barre de titre et onglets */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex min-w-0 flex-1 gap-1 overflow-hidden font-mono text-xs">
            {codeSnippets.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <span
                  key={item.id}
                  className={`shrink-0 rounded-md px-3 py-1 ${
                    isActive ? 'bg-white/10 text-slate-100' : 'hidden text-slate-500 sm:block'
                  }`}
                >
                  {item.fileName}
                </span>
              )
            })}
          </div>
        </div>

        {/* Zone de code : hauteur fixe pour éviter tout saut de mise en page */}
        <div
          className="flex gap-4 overflow-hidden p-4 font-mono text-xs leading-6 sm:text-[13px]"
          style={{ minHeight: `${MAX_LINES * 1.5 + 2}rem` }}
        >
          <div className="select-none text-right text-slate-600">
            {Array.from({ length: lineCount }, (_, lineIndex) => (
              <div key={lineIndex}>{lineIndex + 1}</div>
            ))}
          </div>
          <pre className="min-w-0 flex-1 overflow-hidden whitespace-pre">
            <code>
              {tokens.map((token, tokenIndex) => (
                <span key={tokenIndex} className={TOKEN_CLASSES[token.type]}>
                  {token.text}
                </span>
              ))}
              <span className="ml-px inline-block h-4 w-0.5 translate-y-0.5 animate-caret bg-brand-cyan motion-reduce:animate-none" />
            </code>
          </pre>
        </div>

        {/* Barre d'état */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-1.5 font-mono text-[11px] text-slate-500">
          <span>{LANGUAGE_LABELS[language]}</span>
          <span>UTF-8 · Ln {lineCount}</span>
        </div>
      </div>
    </div>
  )
}