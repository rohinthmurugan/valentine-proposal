import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Basic Error Boundary for debugging
window.addEventListener('error', (e) => {
  document.body.innerHTML += `<div style="color: red; padding: 20px; font-size: 24px;">Runtime Error: ${e.message}</div>`;
  console.error(e);
});

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (e: any) {
  document.body.innerHTML += `<div style="color: red; padding: 20px; font-size: 24px;">Render Error: ${e.message}</div>`;
}
