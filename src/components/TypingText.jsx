import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * TypingText — types, pauses, deletes and cycles through `words` with a
 * classic 90s terminal block cursor (█).
 * Screen readers get the full list once (the animated text is aria-hidden).
 */
export default function TypingText({ words, typeSpeed = 70, deleteSpeed = 40, pause = 1600, className = '' }) {
  const reduceMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion) return undefined
    const current = words[wordIndex % words.length]

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
      return undefined
    }

    const t = setTimeout(
      () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
      deleting ? deleteSpeed : typeSpeed,
    )
    return () => clearTimeout(t)
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause, reduceMotion])

  return (
    <span className={className}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">
        {reduceMotion ? words[0] : text}
        {/* Classic 90s block cursor */}
        <span className="animate-caret ml-1 inline-block h-[0.95em] w-[0.55em] translate-y-[0.12em] bg-accent align-baseline" />
      </span>
    </span>
  )
}
