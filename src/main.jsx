// StrictMode is intentionally removed — GSAP ScrollTrigger's pin:true
// modifies the DOM directly and conflicts with React's double-invoke
// behaviour in strict development mode.
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
