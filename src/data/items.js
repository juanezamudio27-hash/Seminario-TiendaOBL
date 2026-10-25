// Datos de ejemplo del inventario de OBL (entidades ITEM e ITEM_CATEGORY del modelo).
export const CATEGORIES = [
  'Pelotas',
  'Zapatillas',
  'Guantes',
  'Camisas',
  'Camisetas',
  'Pantalones',
]

export const ITEMS = [
  { id: 1, name: 'Pelota oficial de liga', category: 'Pelotas', price: 9.99, stock: 120, description: 'Cuero genuino con costuras rojas. Reglamentaria para partidos de liga.' },
  { id: 2, name: 'Pelota de práctica (docena)', category: 'Pelotas', price: 54.0, stock: 40, description: 'Pack de 12 pelotas para entrenamientos de equipo.' },
  { id: 3, name: 'Zapatillas de tacos metálicos', category: 'Zapatillas', price: 79.9, stock: 35, description: 'Tacos metálicos para césped natural. Tallas 36 a 46.' },
  { id: 4, name: 'Zapatillas de tacos de goma', category: 'Zapatillas', price: 59.9, stock: 50, description: 'Aptas para césped sintético y tierra compacta.' },
  { id: 5, name: 'Guante de jardinero 12.5"', category: 'Guantes', price: 89.0, stock: 22, description: 'Cuero tratado, bolsillo profundo para jugadas en el jardín.' },
  { id: 6, name: 'Guante de infielder 11.5"', category: 'Guantes', price: 84.5, stock: 18, description: 'Bolsillo corto para transferencias rápidas.' },
  { id: 7, name: 'Camisa de juego manga larga', category: 'Camisas', price: 34.0, stock: 80, description: 'Tela transpirable con cuello abotonado.' },
  { id: 8, name: 'Camisa de entrenamiento', category: 'Camisas', price: 24.0, stock: 95, description: 'Ligera, secado rápido, ideal para práctica diaria.' },
  { id: 9, name: 'Camiseta serigrafiada del equipo', category: 'Camisetas', price: 19.5, stock: 150, description: 'Serigrafía personalizada con nombre y número del jugador.' },
  { id: 10, name: 'Camiseta básica OBL', category: 'Camisetas', price: 14.0, stock: 200, description: 'Algodón suave con el logo de la liga.' },
  { id: 11, name: 'Pantalón de juego blanco', category: 'Pantalones', price: 39.0, stock: 70, description: 'Reforzado en rodillas para deslizamientos.' },
  { id: 12, name: 'Pantalón de entrenamiento', category: 'Pantalones', price: 29.0, stock: 85, description: 'Cintura elástica y bolsillos laterales.' },
]

// Descuento de equipos según el número de jugadores (supuesto del proyecto,
// equivale a la tabla DISCOUNT_TIER del modelo lógico).
export const DISCOUNT_TIERS = [
  { min: 15, rate: 0.15 },
  { min: 10, rate: 0.1 },
  { min: 1, rate: 0.05 },
]

export function getDiscountRate(players) {
  const n = Number(players) || 0
  const tier = DISCOUNT_TIERS.find((t) => n >= t.min)
  return tier ? tier.rate : 0
}

// Los tres representantes de ventas de OBL.
export const SALES_REPS = ['Ana Morales', 'Luis Herrera', 'Carla Núñez']