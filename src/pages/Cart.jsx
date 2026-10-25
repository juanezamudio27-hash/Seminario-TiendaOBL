import { Link, useNavigate } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { money, useShop } from '../context/ShopContext.jsx'

export default function Cart() {
  useDocumentTitle('Carrito')
  const navigate = useNavigate()
  const {
    lines, subtotal, discountRate, discount, total,
    customer, setQty, removeFromCart, clearCart, setNotice,
  } = useShop()

  const handleCheckout = () => {
    if (!customer) {
      setNotice('Regístrate antes de confirmar tu pedido.')
      navigate('/registro')
      return
    }
    setNotice(`Pedido confirmado por ${money(total)}. ¡Gracias por tu compra!`)
    clearCart()
    navigate('/')
  }

  if (lines.length === 0) {
    return (
      <section>
        <h1>Carrito</h1>
        <p className="empty">
          Tu carrito está vacío. <Link to="/catalogo">Elige artículos del catálogo</Link>.
        </p>
      </section>
    )
  }

  return (
    <section>
      <h1>Carrito</h1>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Importe</th>
              <th><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {lines.map(({ item, qty }) => (
              <tr key={item.id}>
                <td><Link to={`/catalogo/${item.id}`}>{item.name}</Link></td>
                <td>{money(item.price)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={qty}
                    aria-label={`Cantidad de ${item.name}`}
                    onChange={(e) =>
                      setQty(item.id, Math.min(Math.max(Number(e.target.value) || 1, 1), item.stock))
                    }
                  />
                </td>
                <td>{money(item.price * qty)}</td>
                <td>
                  <button type="button" className="link-btn" onClick={() => removeFromCart(item.id)}>
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="totals">
        <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
        {discountRate > 0 && (
          <div>
            <dt>Descuento de equipo ({Math.round(discountRate * 100)}%)</dt>
            <dd>−{money(discount)}</dd>
          </div>
        )}
        <div className="grand"><dt>Total</dt><dd>{money(total)}</dd></div>
      </dl>

      <div className="hero-actions">
        <button type="button" className="btn" onClick={handleCheckout}>
          Confirmar pedido
        </button>
        <button type="button" className="btn btn-ghost" onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>
      {!customer && (
        <p className="muted">Necesitas <Link to="/registro">registrarte</Link> para confirmar.</p>
      )}
    </section>
  )
}
