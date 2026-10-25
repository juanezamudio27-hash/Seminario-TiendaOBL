import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { CATEGORIES, ITEMS } from '../data/items.js'

export default function Catalog() {
  useDocumentTitle('Catálogo')

  // Estados del componente
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('name')
  const [minPrice, setMinPrice] = useState('') // guarda precio min y actualiza
  const [maxPrice, setMaxPrice] = useState('') // guarda precio max y actualiza
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

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
  const filteredItems = items.filter((item) => {

    const matchesText = item.name.toLowerCase().includes(search.trim().toLowerCase()) // nombre (ya sea en minuscula o con espacios)
    const matchesCategory = category === '' || item.category === category // categoria
    const matchesMin = minPrice === '' || item.price >= Number(minPrice) // precio min
    const matchesMax = maxPrice === '' || item.price <= Number(maxPrice) // precio max

    return (matchesText && matchesCategory && matchesMin && matchesMax)
  })

  const visible = [...filteredItems].sort((a, b) => { //productos que pasaron el filtro
    switch (sortBy) { // elegir orden para ordenar
      case 'price-asc': return a.price - b.price // menor a mayor
      case 'price-desc': return b.price - a.price // mayor a menor
      case 'popularity': return (b.popularity ?? 0) - (a.popularity ?? 0) // mas populares 
      case 'name': // A a Z
      default: return a.name.localeCompare(b.name, 'es') // in spanish
    }
  })

  
  return (
    <section>
      <h1>Catálogo</h1>

      <form className="filters" onSubmit={(e) => e.preventDefault()}>
        <label> Buscar
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ej: guante"
          />
        </label>

        <label> Categoría
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        {/* filtro minimo */}
        <label> Precio mínimo
          <input
            type="number"
            min="0"
            step="0.01"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Ej: 20"/>
        </label>

        {/* filtro maximo */}
        <label> Precio máximo
          <input
            type="number"
            min="0"
            step="0.01"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Ej: 100"
          />
        </label>

        {/* filtros diversos */}
        <label> Ordenar por
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Nombre: A-Z</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="popularity"> Más populares</option>
          </select>
        </label>

        {/* mejora del boton para limpiar todo */}
        <button type="button" className="btn btn-ghost" onClick={() => {
          setSearch(''), setCategory(''), setMinPrice(''), setMaxPrice(''), setSortBy('name')
        }}>
        Limpiar filtros
        </button>
      </form>

      {/* cuenta los productos por el filtro añadido */}
      {loading && (<p className="muted">Cargando artículos…</p>)}
      {!loading && (
        <p className="results-count" aria-live="polite">
          {visible.length === 1
            ? 'Se encontró 1 producto'
            : `Se encontraron ${visible.length} productos`}
          {' '}de {items.length} en total
        </p>
      )}

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
