import { useEffect } from 'react'

// Hook personalizado: cambia el título de la pestaña cada vez que cambia `title`.
// Es un efecto secundario típico: sincroniza React con algo externo (el DOM del navegador).
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} | OBL Store`
  }, [title])
}
