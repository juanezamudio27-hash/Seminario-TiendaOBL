import { useEffect } from 'react'
import { useShop } from '../context/ShopContext.jsx'

// Aviso temporal. Demuestra el ciclo de vida con useEffect:
//  - MONTAJE/ACTUALIZACIÓN: al aparecer un mensaje nuevo, arranca un temporizador.
//  - DESMONTAJE/LIMPIEZA: la función que devuelve el efecto cancela el temporizador
//    si el mensaje cambia o el componente desaparece (evita errores y fugas).
export default function Notice() {
  const { notice, setNotice } = useShop()

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 3500)
    return () => clearTimeout(timer)
  }, [notice, setNotice])

  if (!notice) return null

  return (
    <div className="notice" role="status">
      <span>{notice}</span>
      <button type="button" onClick={() => setNotice('')} aria-label="Cerrar aviso">
        Cerrar
      </button>
    </div>
  )
}
