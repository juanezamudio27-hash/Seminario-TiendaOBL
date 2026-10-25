import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { CATEGORIES, ITEMS } from '../data/items.js'

export default function Catalog() {
  useDocumentTitle('Catálogo')

  // Estados del componente
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')      // formulario CONTROLADO
  const [category, setCategory] = useState('')  // formulario CONTROLADO

  // Ciclo de vida: al MONTAR el componente se "cargan" los datos.
  // Simulamos una llamada a un servidor con setTimeout.
  // El array vacío [] significa "ejecutar solo una vez, al montar".
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(ITEMS)
      setLoading(false)
    }, 600)
    // Limpieza al DESMONTAR: si el usuario cambia de página antes, se cancela.
    return () => clearTimeout(timer)
  }, [])

  // Valor derivado: se recalcula en cada render según los estados.
  const visible = items.filter((item) => {
    const matchesText = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === '' || item.category === category
    return matchesText && matchesCategory
  })

  return (
    <section>
      <h1>Catálogo</h1>

      <form className="filters" onSubmit={(e) => e.preventDefault()}>
        <label>
          Buscar
          {/* value + onChange = input controlado por React */}
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ej: guante"
          />
        </label>
        <label>
          Categoría
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => { setSearch(''); setCategory('') }}
        >
          Limpiar filtros
        </button>
      </form>

      {loading && <p className="muted">Cargando artículos…</p>}

      {!loading && visible.length === 0 && (
        <p className="empty">
          No hay artículos con esos filtros. Prueba con otra palabra o limpia los filtros.
        </p>
      )}

      <div className="grid">
        {visible.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
