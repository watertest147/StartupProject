// runใช้ Pnpm dev เพื่อเริ่มต้นเซิร์ฟเวอร์และดูผลลัพธ์ในเบราว์เซอร์ที่ http://localhost:5173
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './pages/App.jsx'
import './style.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)