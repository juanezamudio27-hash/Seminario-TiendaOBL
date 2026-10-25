import { useRef, useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { SALES_REPS } from '../data/items.js'

// Formulario NO CONTROLADO: el DOM guarda los valores; React los lee solo al enviar
// (con una referencia useRef y FormData). Sirve para formularios simples y rápidos.
export default function Complaint() {
  useDocumentTitle('Quejas')

  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [complaints, setComplaints] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()                       // evita recargar la página
    const data = new FormData(formRef.current)   // lee los valores actuales del formulario
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()

    // Validación manual
    const found = {}
    if (name.length < 2) found.name = 'Escribe tu nombre (mínimo 2 letras)'
    if (!/^\S+@\S+\.\S+$/.test(email)) found.email = 'Escribe un correo válido'
    if (message.length < 10) found.message = 'Cuéntanos más: mínimo 10 caracteres'
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Los 3 representantes se turnan para atender las quejas (asignación rotativa).
    const rep = SALES_REPS[complaints.length % SALES_REPS.length]
    setComplaints((prev) => [
      { id: Date.now(), name, message, rep, date: new Date().toLocaleDateString('es') },
      ...prev,
    ])
    formRef.current.reset()                      // vacía el formulario sin estado
  }

  return (
    <section>
      <h1>Quejas y comentarios</h1>
      <p className="muted">
        Un representante de ventas revisará tu mensaje. Atendemos a clientes individuales y a equipos.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="form">
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <input id="name" name="name" defaultValue="" autoComplete="name" />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" name="email" type="email" defaultValue="" autoComplete="email" />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="field">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" rows="4" defaultValue="" />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <button type="submit" className="btn">Enviar queja</button>
      </form>

      <h2>Quejas enviadas</h2>
      {complaints.length === 0 ? (
        <p className="empty">Aún no has enviado ninguna queja.</p>
      ) : (
        <ul className="complaints">
          {complaints.map((c) => (
            <li key={c.id}>
              <strong>{c.name}</strong> · {c.date}
              <p>{c.message}</p>
              <p className="muted">Asignada a {c.rep}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
