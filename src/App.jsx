import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import ItemDetail from './pages/ItemDetail.jsx'
import Cart from './pages/Cart.jsx'
import Register from './pages/Register.jsx'
import Complaint from './pages/Complaint.jsx'
import NotFound from './pages/NotFound.jsx'

// Tabla de rutas de la SPA. Layout dibuja la barra de navegación y,
// en su <Outlet />, la página que corresponda a la URL.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalog />} />
        {/* Ruta dinámica: :itemId cambia según el artículo */}
        <Route path="catalogo/:itemId" element={<ItemDetail />} />
        <Route path="carrito" element={<Cart />} />
        <Route path="registro" element={<Register />} />
        <Route path="quejas" element={<Complaint />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
