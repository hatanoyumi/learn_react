import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Second from '../src/Second'

createRoot(document.getElementById('second')!).render(
  <StrictMode>
    <Second />
  </StrictMode>,
)
