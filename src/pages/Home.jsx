import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { useShop } from '../context/ShopContext.jsx'

export default function Home() {
  useDocumentTitle('Inicio')
  const { customer } = useShop()

  return (
    <section className="hero">
      <h1>Todo el equipo, listo para el primer lanzamiento.</h1>
      <p className="lead">
        Pelotas, guantes, zapatillas y uniformes para jugadores individuales y
        equipos completos. Los equipos reciben descuento según su número de
        jugadores.
      </p>
      <div className="hero-actions">
        <Link className="btn" to="/catalogo">Ver catálogo</Link>
        {!customer && (
          <Link className="btn btn-ghost" to="/registro">Registrar mi cuenta</Link>
        )}
      </div>
      {customer && (
        <p className="muted">
          Sesión de cliente activa:{' '}
          <strong>
            {customer.customerType === 'team'
              ? customer.teamName
              : `${customer.firstName} ${customer.lastName}`}
          </strong>
        </p>
      )}
    </section>
  )
}
