import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'//Bảo trình duyệt gọi đến file index.css
import App from './App.jsx'//Bảo trình duyệt gọi đến file App.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
