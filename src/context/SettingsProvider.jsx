import { useCallback, useEffect, useState } from 'react'
import { SettingsContext } from './reports'

const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

export function SettingsProvider({ children }) {
  const [largeText, setLargeText] = useState(false)
  const [readAloud, setReadAloud] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = largeText ? '125%' : ''
  }, [largeText])

  const speak = useCallback((text) => {
    if (!readAloud || !canSpeak) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'pt-BR'
    u.rate = 0.9
    window.speechSynthesis.speak(u)
  }, [readAloud])

  return (
    <SettingsContext.Provider value={{ largeText, setLargeText, readAloud, setReadAloud, canSpeak, speak }}>
      {children}
    </SettingsContext.Provider>
  )
}
