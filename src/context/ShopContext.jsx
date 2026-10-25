import { createContext, useContext, useEffect, useState } from 'react'
import { ITEMS, getDiscountRate } from '../data/items.js'

// Context: estado global compartido (carrito, cliente registrado y avisos).
const ShopContext = createContext(null)

// Lee de localStorage con protección: si falla o no hay datos, devuelve el valor por defecto.
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function ShopProvider({ children }) {
  // useState con función inicial: se ejecuta solo en el primer render.
  const [cart, setCart] = useState(() => load('obl-cart', []))
  const [customer, setCustomer] = useState(() => load('obl-customer', null))
  const [notice, setNotice] = useState('')

  // useEffect con dependencias: guarda el carrito cada vez que cambia.
  useEffect(() => {
    try {
      localStorage.setItem('obl-cart', JSON.stringify(cart))
    } catch {
      /* si el almacenamiento falla, la app sigue funcionando */
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('obl-customer', JSON.stringify(customer))
    } catch {
      /* ignorado */
    }
  }, [customer])

  const addToCart = (itemId, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.itemId === itemId)
      if (found) {
        return prev.map((l) =>
          l.itemId === itemId ? { ...l, qty: l.qty + qty } : l,
        )
      }
      return [...prev, { itemId, qty }]
    })
  }

  const setQty = (itemId, qty) => {
    setCart((prev) =>
      prev.map((l) => (l.itemId === itemId ? { ...l, qty } : l)),
    )
  }

  const removeFromCart = (itemId) =>
    setCart((prev) => prev.filter((l) => l.itemId !== itemId))

  const clearCart = () => setCart([])

  // Valores derivados: se calculan en cada render, no se guardan en estado.
  const lines = cart
    .map((l) => ({ ...l, item: ITEMS.find((i) => i.id === l.itemId) }))
    .filter((l) => l.item)
  const subtotal = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0)
  const discountRate =
    customer?.customerType === 'team'
      ? getDiscountRate(customer.numberOfPlayers)
      : 0
  const discount = subtotal * discountRate
  const total = subtotal - discount
  const count = lines.reduce((sum, l) => sum + l.qty, 0)

  const value = {
    cart,
    lines,
    count,
    subtotal,
    discountRate,
    discount,
    total,
    customer,
    setCustomer,
    notice,
    setNotice,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

// Hook propio para consumir el contexto de forma segura.
export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop debe usarse dentro de <ShopProvider>')
  return ctx
}

export const money = (n) =>
  new Intl.NumberFormat('es', { style: 'currency', currency: 'USD' }).format(n)
