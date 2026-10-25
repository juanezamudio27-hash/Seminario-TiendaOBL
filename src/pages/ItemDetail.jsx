import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { money, useShop } from '../context/ShopContext.jsx'
import { ITEMS } from '../data/items.js'

// Ruta dinámica: /catalogo/:itemId
export default function ItemDetail() {
  const { itemId } = useParams()          // lee el parámetro de la URL
  const navigate = useNavigate()          // navegación desde el código
  const { addToCart, setNotice } = useShop()
  const [qty, setQty] = useState(1)

  const item = ITEMS.find((i) => i.id === Number(itemId))
  useDocumentTitle(item ? item.name : 'Artículo no encontrado')

  if (!item) {
    return (
      <section>
        <h1>Artículo no encontrado</h1>
        <p className="empty">
          El artículo "{itemId}" no existe. <Link to="/catalogo">Volver al catálogo</Link>
        </p>
      </section>
    )
  }

  const handleAdd = () => {
    addToCart(item.id, qty)
    setNotice(`${qty} × "${item.name}" en tu carrito.`)
    navigate('/carrito')                  // redirige al carrito
  }

  return (
    <section className="detail">
      <button type="button" className="link-btn" onClick={() => navigate(-1)}>
        Volver
      </button>
      <span className="tag">{item.category}</span>
      <h1>{item.name}</h1>
      <p className="lead">{item.description}</p>
      <p className="price big">{money(item.price)}</p>
      <p className="muted">Disponibles: {item.stock}</p>

      <label className="qty">
        Cantidad
        <input
          type="number"
          min="1"
          max={item.stock}
          value={qty}
          onChange={(e) => {
            const n = Number(e.target.value)
            setQty(Math.min(Math.max(n || 1, 1), item.stock))
          }}
        />
      </label>
      <button type="button" className="btn" onClick={handleAdd}>
        Agregar al carrito
      </button>
    </section>
  )
}
