import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle('Página no encontrada')
  return (
    <section>
      <h1>Página no encontrada</h1>
      <p className="empty">
        Esa dirección no existe. <Link to="/">Ir al inicio</Link>.
      </p>
    </section>
  )
}
