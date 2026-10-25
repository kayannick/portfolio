import type { SnippetLanguage } from '@/types'

export type TokenType =
  | 'keyword'
  | 'string'
  | 'comment'
  | 'number'
  | 'function'
  | 'decorator'
  | 'type'
  | 'plain'

export interface Token {
  readonly text: string
  readonly type: TokenType
}

const PYTHON_KEYWORDS: ReadonlySet<string> = new Set([
  'def', 'class', 'return', 'if', 'else', 'elif', 'raise', 'import', 'from',
  'as', 'with', 'try', 'except', 'for', 'in', 'not', 'is', 'and', 'or',
  'None', 'True', 'False', 'self', 'lambda', 'pass', 'yield',
])

const TYPESCRIPT_KEYWORDS: ReadonlySet<string> = new Set([
  'const', 'let', 'function', 'return', 'import', 'from', 'export', 'default',
  'if', 'else', 'interface', 'type', 'async', 'await', 'new', 'null',
  'true', 'false', 'undefined',
])

// Comparaison en majuscules pour le SQL (insensible à la casse).
const SQL_KEYWORDS: ReadonlySet<string> = new Set([
  'SELECT', 'FROM', 'JOIN', 'ON', 'AS', 'WHERE', 'AND', 'OR', 'ORDER', 'BY',
  'ASC', 'DESC', 'LIMIT', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
  'DELETE', 'GROUP', 'HAVING', 'NULL', 'NOT', 'IN',
])

const KEYWORDS: Record<SnippetLanguage, ReadonlySet<string>> = {
  python: PYTHON_KEYWORDS,
  typescript: TYPESCRIPT_KEYWORDS,
  tsx: TYPESCRIPT_KEYWORDS,
  sql: SQL_KEYWORDS,
}

/**
 * Groupes : 1 commentaire, 2 chaîne (même non terminée, pendant la frappe),
 * 3 nombre, 4 décorateur, 5 mot, 6 autre caractère.
 */
const TOKEN_PATTERN =
  /(#.*|\/\/.*|--.*)|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?|`(?:[^`\\]|\\.)*`?)|(\b\d+(?:\.\d+)?\b)|(@[A-Za-z_][\w.]*)|([A-Za-z_$][\w$]*)|([\s\S])/g

function classifyWord(
  word: string,
  nextChar: string | undefined,
  language: SnippetLanguage,
): TokenType {
  const normalized = language === 'sql' ? word.toUpperCase() : word
  if (KEYWORDS[language].has(normalized)) return 'keyword'
  if (nextChar === '(') return 'function'
  if (/^[A-Z]/.test(word)) return 'type'
  return 'plain'
}

/** Découpe un extrait de code (même incomplet) en jetons colorables. */
export function tokenize(code: string, language: SnippetLanguage): Token[] {
  const tokens: Token[] = []

  const push = (text: string, type: TokenType): void => {
    const last = tokens[tokens.length - 1]
    if (last !== undefined && last.type === type && type === 'plain') {
      tokens[tokens.length - 1] = { text: last.text + text, type }
    } else {
      tokens.push({ text, type })
    }
  }

  for (const match of code.matchAll(TOKEN_PATTERN)) {
    const text = match[0]
    if (match[1] !== undefined) push(text, 'comment')
    else if (match[2] !== undefined) push(text, 'string')
    else if (match[3] !== undefined) push(text, 'number')
    else if (match[4] !== undefined) push(text, 'decorator')
    else if (match[5] !== undefined) {
      const endIndex = (match.index ?? 0) + text.length
      push(text, classifyWord(text, code[endIndex], language))
    } else push(text, 'plain')
  }

  return tokens
}