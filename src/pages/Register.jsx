import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { getDiscountRate } from '../data/items.js'
import { useShop } from '../context/ShopContext.jsx'

// Esquema de validación con Yup (las reglas cambian según el tipo de cliente).
const schema = Yup.object({
  customerType: Yup.string().oneOf(['individual', 'team']).required(),
  email: Yup.string()
    .email('Escribe un correo válido, por ejemplo nombre@correo.com')
    .required('El correo es obligatorio'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]{7,15}$/, 'Usa entre 7 y 15 dígitos (se permiten + - y espacios)')
    .required('El teléfono es obligatorio'),
  address: Yup.string().min(5, 'Escribe al menos 5 caracteres').required('La dirección es obligatoria'),
  firstName: Yup.string().when('customerType', {
    is: 'individual',
    then: (s) => s.min(2, 'Mínimo 2 letras').required('El nombre es obligatorio'),
    otherwise: (s) => s,
  }),
  lastName: Yup.string().when('customerType', {
    is: 'individual',
    then: (s) => s.min(2, 'Mínimo 2 letras').required('El apellido es obligatorio'),
    otherwise: (s) => s,
  }),
  teamName: Yup.string().when('customerType', {
    is: 'team',
    then: (s) => s.min(3, 'Mínimo 3 caracteres').required('El nombre del equipo es obligatorio'),
    otherwise: (s) => s,
  }),
  numberOfPlayers: Yup.number()
    // Un campo vacío llega como "", que Yup leería como NaN; lo convertimos en undefined.
    .transform((value, original) => (original === '' ? undefined : value))
    .typeError('Escribe un número')
    .when('customerType', {
      is: 'team',
      then: (s) =>
        s
          .integer('Debe ser un número entero')
          .min(1, 'Mínimo 1 jugador')
          .max(40, 'Máximo 40 jugadores')
          .required('El número de jugadores es obligatorio'),
      otherwise: (s) => s,
    }),
})

const emptyForm = {
  customerType: 'individual',
  firstName: '',
  lastName: '',
  teamName: '',
  numberOfPlayers: '',
  email: '',
  phone: '',
  address: '',
}

// Componente auxiliar: campo con etiqueta y mensaje de error.
function TextField({ name, label, type = 'text', ...rest }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type} {...rest} />
      <ErrorMessage name={name} component="p" className="error" />
    </div>
  )
}

export default function Register() {
  useDocumentTitle('Registro')
  const navigate = useNavigate()
  const { customer, setCustomer, setNotice } = useShop()

  return (
    <section>
      <h1>{customer ? 'Mi cuenta' : 'Registro de cliente'}</h1>
      <p className="muted">
        Los clientes individuales y los equipos pueden comprar cualquier artículo. Los equipos reciben descuento según su número de jugadores.
      </p>

      <Formik
        initialValues={{ ...emptyForm, ...customer }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setCustomer(values)
          setNotice('Datos guardados. Ya puedes confirmar pedidos.')
          setSubmitting(false)
          navigate('/catalogo')
        }}
      >
        {({ values, isSubmitting, resetForm }) => (
          <Form noValidate className="form">
            <fieldset className="field">
              <legend>Tipo de cliente</legend>
              <label className="inline">
                <Field type="radio" name="customerType" value="individual" /> Individual
              </label>
              <label className="inline">
                <Field type="radio" name="customerType" value="team" /> Equipo
              </label>
            </fieldset>

            {values.customerType === 'individual' ? (
              <>
                <TextField name="firstName" label="Nombre" autoComplete="given-name" />
                <TextField name="lastName" label="Apellido" autoComplete="family-name" />
              </>
            ) : (
              <>
                <TextField name="teamName" label="Nombre del equipo" />
                <TextField name="numberOfPlayers" label="Número de jugadores" type="number" min="1" />
                {Number(values.numberOfPlayers) > 0 && (
                  <p className="hint">
                    Descuento aplicable: {Math.round(getDiscountRate(values.numberOfPlayers) * 100)}%
                  </p>
                )}
              </>
            )}

            <TextField name="email" label="Correo electrónico" type="email" autoComplete="email" />
            <TextField name="phone" label="Teléfono" type="tel" autoComplete="tel" />
            <TextField name="address" label="Dirección" autoComplete="street-address" />

            <div className="hero-actions">
              <button type="submit" className="btn" disabled={isSubmitting}>
                {customer ? 'Guardar cambios' : 'Crear cuenta'}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => resetForm({ values: emptyForm })}
              >
                Limpiar formulario
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}