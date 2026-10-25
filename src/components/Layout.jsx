import { NavLink, Outlet } from 'react-router-dom'
import { useShop } from '../context/ShopContext.jsx'
import Notice from './Notice.jsx'

// Estructura común de todas las páginas: cabecera con navegación + contenido + pie.
export default function Layout() {
  const { count, customer } = useShop()

  // NavLink recibe isActive para marcar la página actual.
  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand">
            OBL Store
          </NavLink>
          <nav aria-label="Principal">
            <NavLink to="/" end className={linkClass}>Inicio</NavLink>
            <NavLink to="/catalogo" className={linkClass}>Catálogo</NavLink>
            <NavLink to="/carrito" className={linkClass}>
              Carrito{count > 0 && <span className="badge">{count}</span>}
            </NavLink>
            <NavLink to="/registro" className={linkClass}>
              {customer ? 'Mi cuenta' : 'Registro'}
            </NavLink>
            <NavLink to="/quejas" className={linkClass}>Quejas</NavLink>
          </nav>
        </div>
      </header>

      <Notice />

      <main className="content">
        {/* Aquí React Router dibuja la página que coincide con la URL */}
        <Outlet />
      </main>

      <footer className="site-footer">
        Oracle Baseball League · Proyecto de diseño de base de datos y SPA con React
      </footer>
    </div>
  )
}
