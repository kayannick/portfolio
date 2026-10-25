import { useContext } from 'react'
import { LanguageContext, type LanguageContextValue } from './LanguageContext'

export function useTranslation(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (context === null) {
    throw new Error('useTranslation doit être utilisé à l’intérieur de <LanguageProvider>.')
  }
  return context
}