import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Scene from './Components/Hero/Experimental/Scene.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    

    <App />
  </StrictMode>,
)
