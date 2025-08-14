import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Global styles
import './index.css'
import './styles/topbar.css'   // keeps TopBar styles loaded globally

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)