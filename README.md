# OBL Store: SPA con React, Vite, React Router, Formik y Yup

Proyecto guiado que aplica los conceptos de desarrollo frontend con React usando como caso la tienda **Oracle Baseball League (OBL)** del proyecto de diseño de base de datos (clientes individuales y equipos, catálogo, pedidos, quejas atendidas por representantes).

> Esta guía va de lo simple a lo complejo. Cada paso explica **qué haces**, **por qué** y **cómo comprobarlo**.

---

## Índice

0. Mapa: concepto → archivo del proyecto
1. Fundamentos: qué es una SPA y sus ventajas
2. Requisitos previos
3. Crear el proyecto con Vite
4. Instalar dependencias
5. Estructura de carpetas
6. Ejecutar la aplicación
7. JSX y componentes
8. Estado y Hooks (`useState`, `useEffect`) y ciclo de vida
9. Compartir estado con Context
10. Enrutamiento y navegación con React Router
11. Eventos
12. Formularios: controlados, no controlados, Formik + Yup
13. Checklist de pruebas en el navegador
14. Problemas frecuentes
15. Relación con el modelo de datos de OBL y ejercicios de ampliación

---

## 0. Mapa: concepto → archivo

| Concepto del temario | Dónde verlo |
|---|---|
| Concepto y ventajas de SPA | `index.html` (un solo HTML), `src/main.jsx`, sección 1 |
| Entorno React con Vite | `package.json`, `vite.config.js`, secciones 3 a 6 |
| Estructura de proyecto | Sección 5 |
| JSX y componentes | `src/components/*.jsx`, `src/pages/*.jsx` |
| `useState` | `Catalog.jsx`, `ItemDetail.jsx`, `ShopContext.jsx` |
| `useEffect` y ciclo de vida | `Catalog.jsx`, `Notice.jsx`, `ShopContext.jsx`, `hooks/useDocumentTitle.js` |
| React Router (instalación, rutas) | `main.jsx`, `App.jsx`, `Layout.jsx` |
| Rutas dinámicas y navegación | `ItemDetail.jsx` (`useParams`, `useNavigate`), `ItemCard.jsx` (`Link`) |
| Formularios controlados | `Catalog.jsx` (filtros), `Cart.jsx` (cantidades) |
| Formularios no controlados | `Complaint.jsx` (`useRef` + `FormData`) |
| Formik y Yup | `Register.jsx` |
| Eventos | `onClick`, `onChange`, `onSubmit` en todo el proyecto |

---

## 1. Fundamentos: qué es una SPA

Una **SPA (Single Page Application)** es una aplicación web que carga **un único documento HTML** una sola vez. A partir de ahí, JavaScript (aquí React) cambia lo que se ve en pantalla sin pedir al servidor una página nueva en cada clic.

| | Sitio tradicional (MPA) | SPA |
|---|---|---|
| Al navegar | El navegador pide un HTML nuevo y recarga todo | React cambia solo la parte que cambia |
| Experiencia | Parpadeo entre páginas | Fluida, parecida a una app |
| Datos | Cada página trae sus datos | Se piden solo los datos necesarios (API) |
| URL | Una por archivo | Las gestiona un enrutador en el navegador |

**Ventajas de una SPA:** navegación rápida, experiencia fluida, estado que se conserva entre pantallas (por ejemplo, el carrito) y un frontend separado del backend, lo que permite reutilizar la misma API.

**Desventajas a tener en cuenta:** la primera carga puede ser más pesada, el posicionamiento en buscadores (SEO) requiere trabajo extra y el servidor debe devolver siempre `index.html` para URLs como `/catalogo/3` (ver sección 14).

**Dónde se ve en este proyecto:** abre `index.html`. Solo contiene `<div id="root"></div>`. Todo lo demás lo dibuja React.

---

## 2. Requisitos previos

1. **Node.js 18 o superior** (incluye `npm`). Comprueba la versión:
   ```bash
   node -v
   npm -v
   ```
   Si no lo tienes, instálalo desde https://nodejs.org (versión LTS).
2. Un editor de código, por ejemplo **Visual Studio Code**.
3. Un navegador moderno (Chrome, Edge, Firefox).

---

## 3. Crear el proyecto con Vite

**Vite** es la herramienta que prepara el entorno: servidor de desarrollo rápido, recarga instantánea al guardar y generación del paquete final.

Tienes dos caminos.

### Camino A: usar este proyecto ya hecho (recomendado)

1. Descomprime `obl-store.zip`.
2. Abre una terminal dentro de la carpeta `obl-store`.
3. Continúa en la sección 4.

### Camino B: crearlo desde cero siguiendo la guía

1. En una terminal, ejecuta:
   ```bash
   npm create vite@latest obl-store -- --template react
   ```
   Si el asistente pregunta algo, elige **React** y **JavaScript**.
2. Entra en la carpeta:
   ```bash
   cd obl-store
   ```
3. Borra lo que no usarás: `src/App.css`, `src/assets/` y el contenido de `src/index.css`.
4. Ve creando los archivos de `src/` tal como aparecen en este proyecto, siguiendo las secciones 7 a 12.

---

## 4. Instalar dependencias

### Camino A (proyecto ya hecho)

```bash
npm install
```

Lee `package.json` y descarga lo necesario en `node_modules/`.

### Camino B (desde cero)

Instala las versiones que usa este proyecto:

```bash
npm install react@18 react-dom@18
npm install react-router-dom@6 formik yup
```

| Paquete | Para qué sirve |
|---|---|
| `react`, `react-dom` | Biblioteca principal y su conexión con el navegador |
| `react-router-dom` | Enrutamiento y navegación entre páginas |
| `formik` | Manejo de estado, envío y errores de formularios |
| `yup` | Reglas de validación (esquemas) |
| `vite`, `@vitejs/plugin-react` | Entorno de desarrollo y compilación (dependencias de desarrollo) |

> Se fija `react-router-dom@6` porque este código usa su API (`Routes`, `Route`, `Outlet`, `NavLink`). Versiones más nuevas cambian algunos detalles de importación.

**Comprobación:** al terminar debe existir la carpeta `node_modules/` sin mensajes de error rojos.

---

## 5. Estructura de carpetas

```
obl-store/
├── index.html              # Único HTML de la SPA
├── package.json            # Dependencias y scripts
├── vite.config.js          # Configuración de Vite
└── src/
    ├── main.jsx            # Punto de entrada: monta React en #root
    ├── App.jsx             # Tabla de rutas
    ├── index.css           # Estilos globales
    ├── components/         # Piezas reutilizables
    │   ├── Layout.jsx      # Cabecera, navegación y pie
    │   ├── ItemCard.jsx    # Tarjeta de artículo
    │   └── Notice.jsx      # Aviso temporal
    ├── pages/              # Una por pantalla/ruta
    │   ├── Home.jsx
    │   ├── Catalog.jsx
    │   ├── ItemDetail.jsx
    │   ├── Cart.jsx
    │   ├── Register.jsx
    │   ├── Complaint.jsx
    │   └── NotFound.jsx
    ├── context/
    │   └── ShopContext.jsx # Estado compartido (carrito, cliente, avisos)
    ├── hooks/
    │   └── useDocumentTitle.js  # Hook propio
    └── data/
        └── items.js        # Datos de ejemplo (inventario, descuentos)
```

**Regla de organización:** `pages/` contiene lo que corresponde a una URL; `components/` contiene piezas que se reutilizan en varias páginas.

---

## 6. Ejecutar la aplicación

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en http://localhost:5173 y abre el navegador |
| `npm run build` | Genera la versión de producción en la carpeta `dist/` |
| `npm run preview` | Sirve la carpeta `dist/` para probar la versión final |

Pasos:

1. En la terminal: `npm run dev`.
2. Se abre `http://localhost:5173`. Debes ver la portada con la cabecera verde.
3. Edita un texto en `src/pages/Home.jsx` y guarda: el navegador se actualiza solo (*Hot Module Replacement*).
4. Para detener el servidor: `Ctrl + C`.

---

## 7. JSX y componentes

### 7.1 El punto de entrada (`src/main.jsx`)

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <App />
      </ShopProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

- `createRoot(...)` conecta React con el `<div id="root">` de `index.html`.
- Los componentes se anidan como etiquetas: `BrowserRouter` da rutas, `ShopProvider` da estado compartido, `App` es la aplicación.
- `StrictMode` ayuda a detectar errores en desarrollo (por eso verás ciertos efectos ejecutarse dos veces al desarrollar; es normal).

### 7.2 ¿Qué es JSX?

**JSX** es una sintaxis que permite escribir estructura parecida a HTML dentro de JavaScript. Reglas esenciales:

| Regla | Ejemplo |
|---|---|
| Un componente empieza con mayúscula | `<ItemCard />` |
| Un componente devuelve **un solo elemento raíz** (o un fragmento `<>...</>`) | `return (<> ... </>)` |
| `class` se escribe `className`; `for` se escribe `htmlFor` | `<label htmlFor="name">` |
| JavaScript va entre llaves `{}` | `<h3>{item.name}</h3>` |
| Toda etiqueta se cierra | `<input />` |
| Listas con `.map()` y `key` única | `{items.map(i => <ItemCard key={i.id} item={i} />)}` |
| Renderizado condicional con `&&` o `? :` | `{loading && <p>Cargando…</p>}` |

### 7.3 Primer componente con props (`src/components/ItemCard.jsx`)

```jsx
export default function ItemCard({ item }) {
  // ...
  return (
    <article className="card">
      <h3>{item.name}</h3>
      <p className="price">{money(item.price)}</p>
      ...
    </article>
  )
}
```

- Un componente es **una función que devuelve JSX**.
- `{ item }` son las **props**: datos que el componente padre le pasa (`<ItemCard item={item} />`).
- Las props son de solo lectura.

**Comprobación:** en el catálogo, cada artículo es una instancia del mismo componente con datos distintos.

---

## 8. Estado y Hooks

### 8.1 `useState`: memoria del componente

```jsx
const [search, setSearch] = useState('')
```

- `search` es el valor actual; `setSearch` lo cambia.
- Al llamar a `setSearch(...)`, React **vuelve a ejecutar el componente** y actualiza la pantalla.
- Nunca modifiques el estado directamente (`search = 'x'` no funciona).
- Para estado de lista u objeto, crea una copia nueva (`[...prev, nuevo]`, `{...obj, campo}`). Mira `addToCart` en `ShopContext.jsx`.

**Regla:** si un dato se puede **calcular** a partir de otros, no lo guardes en estado. En `Catalog.jsx`, `visible` se calcula en cada render a partir de `items`, `search` y `category`.

### 8.2 `useEffect`: efectos secundarios

Un efecto es código que sale del "dibujar la pantalla": pedir datos, usar temporizadores, cambiar el título de la pestaña, guardar en `localStorage`.

```jsx
useEffect(() => {
  // código del efecto
  return () => {
    // limpieza (opcional)
  }
}, [dependencias])
```

| Array de dependencias | Cuándo se ejecuta |
|---|---|
| `[]` | Una vez, al **montar** el componente |
| `[a, b]` | Al montar y cada vez que `a` o `b` cambian |
| (sin array) | Después de cada render (casi nunca se desea) |

### 8.3 Ciclo de vida en componentes de función

| Fase | Qué ocurre | Cómo se refleja |
|---|---|---|
| **Montaje** | El componente aparece por primera vez | Efecto con `[]` |
| **Actualización** | Cambian su estado o props | Efecto con dependencias |
| **Desmontaje** | El componente desaparece | Función de **limpieza** que devuelve el efecto |

**Ejemplo real 1: `Catalog.jsx` (montaje y desmontaje)**

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    setItems(ITEMS)
    setLoading(false)
  }, 600)
  return () => clearTimeout(timer)   // limpieza al salir de la página
}, [])
```

Simula la llamada a un servidor. Si cambias de página antes de 600 ms, la limpieza cancela el temporizador.

**Ejemplo real 2: `Notice.jsx` (actualización con dependencias)**

```jsx
useEffect(() => {
  if (!notice) return
  const timer = setTimeout(() => setNotice(''), 3500)
  return () => clearTimeout(timer)
}, [notice, setNotice])
```

Cada vez que llega un aviso nuevo, se reinicia el temporizador de cierre.

**Ejemplo real 3: `hooks/useDocumentTitle.js` (hook propio)**

Un hook propio es una función cuyo nombre empieza por `use` y que reutiliza otros hooks. Aquí cambia el título de la pestaña en cada página.

**Cómo comprobarlo:**
1. Ve a **Catálogo**: aparece "Cargando artículos…" medio segundo y luego las tarjetas (efecto de montaje).
2. Pulsa **Agregar** en un artículo: aparece un aviso que desaparece solo a los 3,5 segundos.
3. Navega entre páginas y mira el título de la pestaña del navegador: cambia en cada una.

### Reglas de los Hooks
1. Se llaman **solo en el nivel superior** del componente (no dentro de `if`, bucles o funciones anidadas).
2. Se llaman **solo en componentes o en otros hooks**.

---

## 9. Compartir estado con Context

El carrito y el cliente registrado se usan en varias páginas. En lugar de pasarlos por props a través de muchos niveles, se usa **Context** (`src/context/ShopContext.jsx`).

Pasos:

1. `createContext(null)` crea el contexto.
2. `ShopProvider` guarda los estados con `useState` y los ofrece mediante `<ShopContext.Provider value={value}>`.
3. En `main.jsx` se envuelve la app con `<ShopProvider>`.
4. Cualquier componente usa `const { count, addToCart } = useShop()`.

Además, el carrito se guarda en `localStorage` con `useEffect`, así que **al recargar la página no se pierde**.

**Comprobación:** agrega artículos, recarga el navegador (F5) y entra al carrito: siguen ahí.

---

## 10. Enrutamiento y navegación con React Router

### 10.1 Instalación y configuración

Instalación (ya hecha en la sección 4): `npm install react-router-dom@6`.

Configuración en tres piezas:

1. **`main.jsx`**: envolver la app en `<BrowserRouter>`.
2. **`App.jsx`**: declarar las rutas con `<Routes>` y `<Route>`.
3. **`Layout.jsx`**: ofrecer la navegación y un `<Outlet />`.

### 10.2 Tabla de rutas (`src/App.jsx`)

```jsx
<Routes>
  <Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="catalogo" element={<Catalog />} />
    <Route path="catalogo/:itemId" element={<ItemDetail />} />
    <Route path="carrito" element={<Cart />} />
    <Route path="registro" element={<Register />} />
    <Route path="quejas" element={<Complaint />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

| URL | Página |
|---|---|
| `/` | Inicio |
| `/catalogo` | Lista de artículos |
| `/catalogo/5` | Detalle del artículo 5 (**ruta dinámica**) |
| `/carrito` | Carrito |
| `/registro` | Alta de cliente |
| `/quejas` | Formulario de quejas |
| cualquier otra | Página 404 |

- La ruta padre sin `path` (con `element={<Layout />}`) es una **ruta de diseño**: sus hijas se dibujan dentro del `<Outlet />`.
- `index` es la ruta por defecto del padre (`/`).
- `path="*"` captura todo lo que no coincide: la página 404.

### 10.3 Navegación

| Herramienta | Uso | Dónde |
|---|---|---|
| `<Link to="/catalogo">` | Enlace que **no recarga** la página | `ItemCard.jsx`, `Cart.jsx` |
| `<NavLink>` | Como `Link`, pero sabe si está activo (`isActive`) para resaltar el menú | `Layout.jsx` |
| `useNavigate()` | Navegar desde el código (después de guardar, confirmar, etc.) | `ItemDetail.jsx`, `Register.jsx`, `Cart.jsx` |
| `navigate(-1)` | Volver a la página anterior | `ItemDetail.jsx` |

### 10.4 Rutas dinámicas (`ItemDetail.jsx`)

```jsx
const { itemId } = useParams()
const item = ITEMS.find((i) => i.id === Number(itemId))
```

- `:itemId` en la ruta se convierte en un valor que lees con `useParams()`.
- **Los parámetros de la URL siempre llegan como texto**, por eso se convierte con `Number(...)`.
- Si el artículo no existe (`/catalogo/999`), el componente muestra un mensaje en lugar de fallar.

**Cómo comprobarlo:**
1. Entra a **Catálogo** y pulsa **Ver detalle**: la URL cambia a `/catalogo/3` sin recargar.
2. Escribe a mano `http://localhost:5173/catalogo/999`: aparece "Artículo no encontrado".
3. Escribe `http://localhost:5173/algo-raro`: aparece la página 404.
4. En el detalle, pulsa **Volver**: regresa a la página anterior.

---

## 11. Eventos

En React los eventos se escriben en camelCase y reciben una **función** (no un texto):

| Evento | Ejemplo en el proyecto |
|---|---|
| `onClick` | Botón **Agregar** (`ItemCard.jsx`), **Quitar** y **Vaciar carrito** (`Cart.jsx`) |
| `onChange` | Búsqueda y categoría (`Catalog.jsx`), cantidades (`Cart.jsx`, `ItemDetail.jsx`) |
| `onSubmit` | Formularios de registro y quejas |

Puntos clave:

- `onClick={handleAdd}` pasa la función. `onClick={handleAdd()}` la **ejecutaría al dibujar**: error común.
- Para pasar argumentos: `onClick={() => removeFromCart(item.id)}`.
- `event.preventDefault()` evita que el formulario recargue la página (`Complaint.jsx`).
- `event.target.value` es el valor del campo que cambió.

---

## 12. Formularios

### 12.1 Formularios **controlados**

React es la "fuente de la verdad": el valor vive en el estado.

```jsx
const [search, setSearch] = useState('')
<input value={search} onChange={(e) => setSearch(e.target.value)} />
```

Ventajas: puedes reaccionar en cada tecla (filtrar en vivo, validar al instante, limpiar con un botón). **Dónde:** filtros de `Catalog.jsx`, cantidades de `Cart.jsx`.

**Comprobación:** en Catálogo escribe "guante": la lista se filtra mientras escribes. Pulsa **Limpiar filtros**: el campo se vacía porque su valor viene del estado.

### 12.2 Formularios **no controlados**

El navegador guarda los valores; React solo los lee cuando hace falta, con una **referencia** (`useRef`).

```jsx
const formRef = useRef(null)
const data = new FormData(formRef.current)
const name = data.get('name')
```

Ventajas: menos código y menos renderizados. Útil cuando solo importa el valor **al enviar**. **Dónde:** `Complaint.jsx` (usa `defaultValue`, no `value`).

**Comprobación:** en **Quejas** envía el formulario vacío: aparecen los errores. Luego completa los campos y envía: la queja se agrega a la lista con un representante asignado (rotan los 3 representantes) y el formulario se vacía con `reset()`.

### 12.3 Validación con **Formik + Yup**

Para formularios con muchas reglas conviene una librería:

- **Formik**: gestiona valores, errores, "campo tocado" y envío.
- **Yup**: define las reglas en un **esquema**.

Piezas en `Register.jsx`:

| Pieza | Función |
|---|---|
| `<Formik initialValues validationSchema onSubmit>` | Contenedor: valores iniciales, reglas y qué hacer al enviar |
| `<Form>` | `<form>` conectado a Formik (maneja `onSubmit`) |
| `<Field name="email">` | Input conectado al estado de Formik (sin `value`/`onChange` manuales) |
| `<ErrorMessage name="email">` | Muestra el error del campo cuando existe |
| `Yup.object({...})` | Esquema con las reglas de cada campo |

Reglas de ejemplo:

```jsx
email: Yup.string()
  .email('Escribe un correo válido, por ejemplo nombre@correo.com')
  .required('El correo es obligatorio'),
```

Validación **condicional** con `when`: el formulario cambia según el tipo de cliente.

```jsx
teamName: Yup.string().when('customerType', {
  is: 'team',
  then: (s) => s.min(3, 'Mínimo 3 caracteres').required('El nombre del equipo es obligatorio'),
  otherwise: (s) => s,
}),
```

- Si el cliente es **individual**: se piden nombre y apellido.
- Si es **equipo**: se piden nombre del equipo y número de jugadores, y se muestra el **descuento** correspondiente (5% de 1 a 9 jugadores, 10% de 10 a 14, 15% con 15 o más; supuesto del proyecto).

**Comprobación:**
1. Ve a **Registro** y pulsa **Crear cuenta** con todo vacío: aparecen los mensajes de error.
2. Escribe un correo mal formado (`pepe@`) y sal del campo: aparece el error de formato.
3. Cambia a **Equipo**, escribe `12` jugadores: se muestra "Descuento aplicable: 10%".
4. Completa todo y envía: aviso de éxito y redirección al catálogo.
5. Agrega artículos al carrito: en **Carrito** aparece la línea de **Descuento de equipo**.

### 12.4 Comparación

| | Controlado | No controlado | Formik + Yup |
|---|---|---|---|
| Quién guarda el valor | Estado de React | El DOM | Formik |
| Validación en vivo | Fácil | Difícil | Integrada |
| Código | Medio | Poco | Poco (la librería hace el trabajo) |
| Cuándo usarlo | Filtros, buscadores | Formularios simples | Formularios con muchas reglas |

---

## 13. Checklist de pruebas

Recorre este flujo completo después de `npm run dev`:

1. **Inicio** muestra la portada y los botones.
2. **Catálogo**: ver "Cargando…", filtrar por texto, filtrar por categoría, limpiar filtros.
3. **Ver detalle** de un artículo y comprobar que la URL cambia a `/catalogo/<número>`.
4. **Agregar al carrito** con cantidad 3: redirige al carrito y la insignia del menú muestra la cantidad.
5. **Carrito**: cambiar cantidad, quitar un artículo, ver el total.
6. **Confirmar pedido** sin cuenta: te lleva a **Registro**.
7. **Registrarse como equipo** de 15 jugadores: volver al carrito y ver el descuento del 15%.
8. **Confirmar pedido**: aviso de pedido confirmado y carrito vacío.
9. **Quejas**: probar errores y envío correcto.
10. URL inexistente: página 404.
11. Recargar con F5: el carrito y la cuenta se conservan.

Para ver la versión final: `npm run build` y luego `npm run preview`.

---

## 14. Problemas frecuentes

| Síntoma | Causa probable | Solución |
|---|---|---|
| `npm: command not found` | Node.js no instalado | Instalar Node.js LTS |
| `Cannot find module 'formik'` o `'yup'` | Falta instalar dependencias | `npm install` (o `npm install formik yup`) |
| Pantalla en blanco | Error en un componente | Abrir la consola del navegador (F12) y leer el mensaje |
| Error `useShop debe usarse dentro de <ShopProvider>` | El componente está fuera del proveedor | Revisar que `main.jsx` envuelva `<App />` con `<ShopProvider>` |
| Puerto 5173 ocupado | Otra instancia de Vite abierta | Cerrarla o `npm run dev -- --port 3000` |
| Al **recargar** una URL como `/catalogo/3` en un servidor real da 404 | El servidor busca ese archivo | Configurar el servidor para devolver siempre `index.html` (en `npm run dev` y `npm run preview` ya funciona) |
| El campo "jugadores" da error al estar vacío en cliente individual | Yup lee `''` como número inválido | Ya resuelto con `.transform(...)` en `Register.jsx` |
| Los efectos se ejecutan dos veces en desarrollo | Comportamiento de `StrictMode` | Es normal; en producción ocurre una sola vez |

---

## 15. Relación con el modelo de datos y ejercicios

### Entidades del modelo → piezas de la aplicación

| Entidad (modelo lógico) | En la aplicación |
|---|---|
| CUSTOMER → INDIVIDUAL_CUSTOMER / TEAM_CUSTOMER | Formulario de `Register.jsx` (tipo de cliente) |
| DISCOUNT_TIER | `DISCOUNT_TIERS` y `getDiscountRate` en `data/items.js` |
| ITEM_CATEGORY / ITEM | `CATEGORIES` e `ITEMS` en `data/items.js`, `Catalog.jsx` |
| CUSTOMER_ORDER / ORDER_ITEM | Carrito y confirmación en `Cart.jsx` |
| SALES_REP / COMPLAINT | `SALES_REPS` y `Complaint.jsx` |

### Ejercicios de ampliación (de menor a mayor dificultad)

1. Agrega una séptima categoría en `data/items.js` y comprueba que aparece en el filtro.
2. Muestra el stock restante en `ItemCard.jsx` y desactiva **Agregar** cuando sea 0.
3. Crea una página `/pedidos` (ruta nueva) que liste los pedidos confirmados guardados en `localStorage`.
4. Reemplaza los datos de `items.js` por una llamada `fetch` a una API (por ejemplo, un `json-server` local) dentro del `useEffect` de `Catalog.jsx`.
5. Convierte `Complaint.jsx` a Formik + Yup y compara el código con la versión no controlada.
6. Protege la ruta `/carrito` para que solo se pueda acceder con una cuenta registrada.

---

*Versiones usadas: React 18, React Router 6, Formik 2, Yup 1, Vite 5 (Node 18 o superior).*
