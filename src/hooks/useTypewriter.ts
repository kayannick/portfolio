import { useEffect, useState } from 'react'

interface TypewriterOptions {
  /** Liste stable (définie hors du composant) des textes à écrire en boucle. */
  readonly texts: readonly string[]
  readonly typingSpeed?: number
  readonly erasingSpeed?: number
  readonly holdDuration?: number
  readonly pauseBetween?: number
  readonly paused?: boolean
}

interface TypewriterState {
  readonly index: number
  readonly length: number
  readonly phase: 'typing' | 'erasing'
}

export interface TypewriterResult {
  readonly text: string
  readonly index: number
}

const INITIAL_STATE: TypewriterState = { index: 0, length: 0, phase: 'typing' }
const TYPING_JITTER_MS = 25
const ERASE_CHUNK = 4

export function useTypewriter({
  texts,
  typingSpeed = 18,
  erasingSpeed = 12,
  holdDuration = 2600,
  pauseBetween = 450,
  paused = false,
}: TypewriterOptions): TypewriterResult {
  const [state, setState] = useState<TypewriterState>(INITIAL_STATE)

  useEffect(() => {
    if (paused || texts.length === 0) return undefined

    const current = texts[state.index] ?? ''
    let delay: number
    let next: TypewriterState

    if (state.phase === 'typing') {
      if (state.length < current.length) {
        delay = typingSpeed + Math.random() * TYPING_JITTER_MS
        next = { ...state, length: state.length + 1 }
      } else {
        delay = holdDuration
        next = { ...state, phase: 'erasing' }
      }
    } else if (state.length > 0) {
      delay = erasingSpeed
      next = { ...state, length: Math.max(0, state.length - ERASE_CHUNK) }
    } else {
      delay = pauseBetween
      next = { index: (state.index + 1) % texts.length, length: 0, phase: 'typing' }
    }

    const timeoutId = window.setTimeout(() => setState(next), delay)
    return () => window.clearTimeout(timeoutId)
  }, [state, paused, texts, typingSpeed, erasingSpeed, holdDuration, pauseBetween])

  const currentText = texts[state.index] ?? ''
  return { text: currentText.slice(0, state.length), index: state.index }
}