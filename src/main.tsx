import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CustomQueryClientProvider from './api/QueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomQueryClientProvider>
      <App />
    </CustomQueryClientProvider>
  </StrictMode>,
)
