import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ShopProvider } from './context/ShopContext.jsx'
import './index.css'

// BrowserRouter habilita el enrutamiento del lado del cliente (History API).
// ShopProvider comparte carrito y cliente con toda la aplicación.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <App />
      </ShopProvider>
    </BrowserRouter>
  </StrictMode>,
)
