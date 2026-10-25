import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App'
import { LanguageProvider } from '@/i18n/LanguageProvider'

const rootElement = document.getElementById('root')
if (rootElement === null) {
  throw new Error('Élément #root introuvable dans index.html.')
}

createRoot(rootElement).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)