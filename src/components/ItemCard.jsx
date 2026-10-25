import { Link } from 'react-router-dom'
import { money, useShop } from '../context/ShopContext.jsx'

// Componente reutilizable. Recibe datos por props y los dibuja con JSX.
export default function ItemCard({ item }) {
  const { addToCart, setNotice } = useShop()

  // Manejador de evento: se ejecuta al hacer clic en el botón.
  const handleAdd = () => {
    addToCart(item.id, 1)
    setNotice(`"${item.name}" se agregó al carrito.`)
  }

  return (
    <article className="card">
      <span className="tag">{item.category}</span>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">{money(item.price)}</p>
      <div className="card-actions">
        {/* Link navega sin recargar la página (clave en una SPA) */}
        <Link className="btn btn-ghost" to={`/catalogo/${item.id}`}>
          Ver detalle
        </Link>
        <button type="button" className="btn" onClick={handleAdd}>
          Agregar
        </button>
      </div>
    </article>
  )
}
