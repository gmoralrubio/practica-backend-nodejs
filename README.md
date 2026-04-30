# Nodepop — Práctica final módulo Backend con NodeJS

Aplicación web de compraventa de artículos de segunda mano. Permite a usuarios autenticados publicar, editar, eliminar y filtrar productos por nombre, precio y etiquetas.

## Requisitos

- Node.js v24+ (ver `.nvmrc`)
- MongoDB

## Instalación

```bash
npm install
```

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto que siga la estructura de `.env.example`

```env
PORT=
HOST=
MONGODB_URI=
DB_NAME=
SESSION_SECRET=
```

## Inicializar la base de datos

> [!CAUTION]
> Este comando borra todos los datos existentes y los reemplaza con datos de prueba.

```bash
npm run seed:database
```

Esta operación crea dos usuarios de prueba:

| Nombre   | Email             | Contraseña |
| -------- | ----------------- | ---------- |
| John Doe | johndoe@email.com | 1234       |
| Admin    | admin@email.com   | 1234       |

## Arrancar el proyecto

### Modo desarrollo

```bash
npm run dev
```

El servidor estará disponible en el host y puerto definidos en `.env`

### CSS (Tailwind)

El proyecto está maquetado con Tailwind. Para modificar y compilar los estilos están disponibles los siguientes comandos:

```bash
# Una vez
npm run css:build

# En modo watch (recompila al guardar)
npm run css:watch
```

## Rutas disponibles

| Método | Ruta                        | Descripción                                  | Auth |
| ------ | --------------------------- | -------------------------------------------- | ---- |
| GET    | `/`                         | Página de inicio                             | No   |
| GET    | `/login`                    | Formulario de login                          | No   |
| POST   | `/login`                    | Acción de login                              | No   |
| GET    | `/logout`                   | Cerrar sesión                                | No   |
| GET    | `/products`                 | Listado de productos del usuario con filtros | Sí   |
| GET    | `/products/new`             | Formulario para crear producto               | Sí   |
| POST   | `/products`                 | Crear producto                               | Sí   |
| GET    | `/products/edit/:productId` | Formulario para editar producto              | Sí   |
| POST   | `/products/edit/:productId` | Actualizar producto                          | Sí   |
| DELETE | `/products/:productId`      | Eliminar producto                            | Sí   |

## Filtros de productos

Los productos se pueden filtrar por:

- **Nombre**: búsqueda parcial por texto
- **Precio mínimo / máximo**
- **Tags**: `work`, `lifestyle`, `motor`, `mobile`

## Visualización de productos

La página de inicio (`/`) muestra **todos los productos de todos los usuarios** sin necesidad de autenticación. Es una vista pública de todo el catálogo disponible.

Para **gestionar productos** (crear, editar o eliminar) es necesario iniciar sesión. Una vez logado, la sección `/products` muestra únicamente los productos del usuario en sesión y permite operar sobre ellos.

## Estructura del proyecto

```
src/
├── app.js                  # Configuración de Express
├── bin/www                 # Entry point del servidor
├── controllers/            # Lógica de cada ruta
├── middlewares/            # Auth, filtros, datos de vistas
├── models/                 # Modelos Mongoose (User, Product)
├── routes/                 # Definición de rutas
├── lib/database.js         # Conexión a MongoDB
├── scripts/seed-db.js      # Script de inicialización de datos
├── data/                   # Datos iniciales (JSON)
├── styles/                 # Estilos de Tailwind CSS
└── views/                  # Plantillas EJS (.html)
public/
├── css/styles.css          # CSS compilado
└── js/main.js              # JS del cliente
```

## Componentes de diseño

Los componentes de UI están basados en [HyperUI](https://hyperui.dev/), una colección de componentes open source para Tailwind CSS.

## Scripts disponibles

| Script                  | Descripción                         |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | Servidor con auto-reload            |
| `npm run css:build`     | Compilar Tailwind CSS               |
| `npm run css:watch`     | Compilar Tailwind CSS en modo watch |
| `npm run seed:database` | Inicializar BD con datos de prueba  |
| `npm run test:database` | Verificar conexión a MongoDB        |
