# Sistema de Gestión de Farmacia Penitenciaria

Sistema web integral para la gestión de medicamentos, stock y seguimiento de medicaciones en unidades sanitarias penitenciarias.

## Descripción

Este sistema permite la gestión completa de:
- **Stock de medicamentos** por unidad sanitaria
- **Registro de ingresos y egresos** de medicamentos
- **Seguimiento de medicaciones** entregadas a detenidos
- **Gestión de usuarios** con roles (Admin/Actor)
- **Administración de unidades sanitarias** y personal asignado
- **Carga masiva de datos** vía archivos Excel

Desarrollado originalmente en 2023 con React 18, Vite y Material-UI.

---

## Características Principales

### Gestión de Stock
- ✅ Visualización de inventario actual por unidad sanitaria
- ✅ Registro de ingresos de medicamentos
- ⚠️ Registro de egresos/salidas (en desarrollo)
- ⚠️ Control de lotes y fechas de vencimiento (en desarrollo)
- ⚠️ Alertas de stock mínimo (en desarrollo)
- ⚠️ Historial completo de movimientos (en desarrollo)

### Gestión de Medicaciones
- Registro de medicamentos asignados a detenidos
- Seguimiento de fechas de entrega
- Tabla de medicados con historial
- Control de entregas por fecha

### Administración
- Gestión completa de usuarios (CRUD)
- Roles de acceso: Administrador y Actor
- Carga masiva de actores desde Excel
- Carga masiva de detenidos desde Excel
- Estadísticas por unidad sanitaria
- Panel de control administrativo

### Seguridad
- Autenticación con JWT
- Protección de rutas por rol
- Cambio de contraseña obligatorio en primer acceso
- Validación de contraseñas (mínimo 8 caracteres, mayúsculas, minúsculas, números)
- Tokens persistentes en localStorage

---

## Tecnologías Utilizadas

### Frontend
- **React** 18.2.0 - Biblioteca UI
- **Vite** 4.4.5 - Build tool y dev server
- **React Router** 6.15.0 - Enrutamiento SPA
- **Material-UI** 5.14.5 - Framework de componentes
- **Emotion** 11.11.0 - CSS-in-JS

### Estado y Datos
- **Zustand** 4.4.1 - Gestión de estado (autenticación)
- **React Query** 3.39.3 - Caché y sincronización de datos
- **Axios** 1.4.0 - Cliente HTTP

### Formularios y Validación
- **Formik** - Manejo de formularios
- **Yup** - Validación de esquemas

### Utilidades
- **date-fns** 2.30.0 - Manejo de fechas
- **XLSX** 0.18.5 - Procesamiento de archivos Excel
- **PapaParse** 5.4.1 - Procesamiento de CSV
- **@tanstack/react-table** 8.9.3 - Tablas avanzadas

---

## Requisitos Previos

- **Node.js** >= 16.x
- **npm** o **yarn**
- Backend API corriendo en `http://localhost:3000/api` (configurable)

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd project1
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 5. Build para producción

```bash
npm run build
npm run preview
```

---

## Estructura del Proyecto

```
project1/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Actores/        # Gestión de actores/personal
│   │   ├── admin/          # Componentes del panel admin
│   │   ├── Detenidos/      # Gestión de detenidos
│   │   ├── DragDrop/       # Carga de archivos drag & drop
│   │   ├── forms/          # Componentes de formularios
│   │   ├── Medicados/      # Seguimiento de medicaciones
│   │   ├── Stock/          # Gestión de inventario
│   │   ├── US/             # Unidades sanitarias
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── MainContent.jsx
│   │   └── Navbar.jsx
│   │
│   ├── pages/              # Páginas/vistas principales
│   │   ├── admin/          # Páginas administrativas
│   │   │   ├── FileUpload.jsx
│   │   │   ├── UsStats.jsx
│   │   │   └── Users.jsx
│   │   ├── ActoresSA.jsx
│   │   ├── Admin.jsx
│   │   ├── Almacen.jsx     # Página de stock/almacén
│   │   ├── DestinosUS.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   └── TablaMedicados.jsx
│   │
│   ├── services/           # Servicios de API
│   │   ├── actoresService.js
│   │   ├── adminService.js
│   │   ├── detenidosService.js
│   │   ├── stockService.js
│   │   ├── usService.js
│   │   └── userService.js
│   │
│   ├── hooks/              # Custom React Hooks
│   │   ├── useActores.js
│   │   ├── useAuth.js
│   │   ├── useDetenidos.js
│   │   ├── useFileUpload.js
│   │   ├── useMedicados.js
│   │   ├── useProtectedRoute.js
│   │   ├── useStock.js
│   │   ├── useUnidadesSanitarias.js
│   │   └── useUsers.js
│   │
│   ├── routes/             # Configuración de rutas
│   │   ├── AdminRoute.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── utils/              # Utilidades
│   │   ├── api.js          # Cliente Axios configurado
│   │   ├── constants.js
│   │   ├── excelProcessing.js
│   │   ├── fileProcessing.js
│   │   ├── jwtHelper.js
│   │   ├── mockData.js
│   │   ├── schemas.js
│   │   └── validation.js
│   │
│   ├── App.jsx             # Componente principal
│   ├── Main.jsx            # Punto de entrada
│   ├── config.js           # Configuración de API
│   └── theme.js            # Tema Material-UI
│
├── public/                 # Archivos estáticos
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Uso

### Credenciales por Defecto

**Administrador:**
- Usuario: `Admin`
- Contraseña: `Farma22`

### Roles y Permisos

#### Administrador
- ✅ Acceso total al sistema
- ✅ Gestión de usuarios
- ✅ Carga masiva de datos
- ✅ Visualización de estadísticas
- ✅ Configuración de unidades sanitarias

#### Actor
- ✅ Gestión de stock de su unidad sanitaria asignada
- ✅ Registro de ingresos de medicamentos
- ✅ Registro de entregas a detenidos
- ✅ Visualización de detenidos
- ❌ No puede acceder al panel de administración

### Flujo de Trabajo Típico

#### 1. Registro de Ingreso de Medicamentos

1. Iniciar sesión como Actor o Admin
2. Ir a **Almacén** (`/almacen`)
3. Completar el formulario "Registrar Ingreso de Medicamentos":
   - Medicamento (ID o nombre)
   - Cantidad
4. Click en "Registrar Ingreso"
5. El stock se actualiza automáticamente

#### 2. Visualización de Stock Actual

- En la página **Almacén**, panel derecho "Stock Actual"
- Se muestra:
  - Nombre del medicamento
  - Cantidad disponible
  - Fecha del último ingreso

#### 3. Registro de Medicación a Detenidos

1. Ir a **Tabla de Medicados** (`/tabla-medicados`)
2. Seleccionar detenido
3. Registrar medicamento y fecha de entrega
4. El sistema registra la entrega

#### 4. Carga Masiva de Datos (Admin)

1. Ir a **Admin > Cargar Archivos** (`/admin/uploads`)
2. Seleccionar tipo de archivo (Actores o Detenidos)
3. Arrastrar archivo Excel o hacer click para seleccionar
4. El sistema procesa y carga los datos

**Formato de Excel para Actores:**
- Columna A: Unidad Sanitaria
- Columna J: Nombre completo

---

## API Endpoints Esperados

El frontend espera un backend con los siguientes endpoints:

### Autenticación
```
POST   /api/auth/login
POST   /api/auth/change-password
```

### Stock
```
GET    /api/stock?unidadSanitariaId={id}
POST   /api/stock/ingreso
```

### Medicaciones
```
GET    /api/medicaciones
POST   /api/medicaciones
```

### Detenidos
```
GET    /api/detenidos
```

### Actores
```
GET    /api/actores
POST   /api/actores/sync
```

### Unidades Sanitarias
```
GET    /api/unidades-sanitarias
PUT    /api/unidades-sanitarias/{id}
```

### Usuarios
```
GET    /api/users
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

### Admin
```
POST   /api/admin/actores/upload
POST   /api/admin/detenidos/upload
GET    /api/admin/us-stats/{id}
```

---

## Modelos de Datos

### Usuario
```javascript
{
  id: string,
  username: string,
  nombre: string,
  rol: 'admin' | 'actor',
  unidadSanitariaId?: string,
  unidadSanitariaNombre?: string
}
```

### Stock
```javascript
{
  id: string,
  medicamentoId: string,
  cantidad: number,
  fechaIngreso: string (ISO 8601),
  unidadSanitariaId?: string
}
```

### Detenido
```javascript
{
  id: string,
  nombre: string,
  unidadSanitariaId: string,
  medicamentos: [
    {
      id: string,
      nombre: string,
      cantidadDiaria: number,
      fechaRecetado: string
    }
  ]
}
```

### Actor
```javascript
{
  id: string,
  nombre: string,
  apellido: string,
  dni: string,
  unidadesSanitarias: string[]
}
```

### Unidad Sanitaria
```javascript
{
  id: string,
  nombre: string,
  actorId: string | null
}
```

---

## Modo Desarrollo con Mock Data

El sistema incluye datos de prueba para desarrollo sin backend:

```javascript
// src/utils/mockData.js
export const mockStock = [...]
export const mockDetenidos = [...]
export const mockUnidadesSanitarias = [...]
export const mockActores = [...]
```

Cuando `import.meta.env.DEV === true`, los servicios usan estos datos mock automáticamente.

---

## Roadmap - Funcionalidades Pendientes

### Prioridad Alta
- [ ] **Catálogo de medicamentos** - Base de datos maestra
- [ ] **Registro de egresos** - Salidas de stock
- [ ] **Conexión automática** - Entrega de medicación descuenta stock
- [ ] **Control de lotes** - Número de lote y fecha de vencimiento
- [ ] **Alertas de stock mínimo** - Notificaciones configurables

### Prioridad Media
- [ ] **Historial de movimientos** - Auditoría completa (ingresos + egresos)
- [ ] **Reportes básicos** - Stock actual, movimientos, consumos
- [ ] **Kardex por medicamento** - Historial detallado
- [ ] **Alertas de vencimientos** - Medicamentos próximos a vencer
- [ ] **Búsqueda y filtros** - En tablas de stock

### Prioridad Baja
- [ ] **Transferencias entre almacenes** - Movimientos inter-unidades
- [ ] **Gestión de proveedores** - Catálogo de proveedores
- [ ] **Órdenes de compra** - Gestión de pedidos
- [ ] **Código de barras** - Escaneo de medicamentos
- [ ] **Costeo de inventario** - Valorización de stock
- [ ] **Exportación a Excel/PDF** - Reportes descargables

---

## Problemas Conocidos

1. **Stock sin egresos**: Actualmente no se descuenta stock cuando se entrega medicación a detenidos
2. **Campo medicamentoId**: Se ingresa como texto libre, debería ser un selector de un catálogo
3. **Sin control de stock negativo**: No hay validación que impida egresos mayores al stock disponible
4. **Sin trazabilidad de lotes**: No se puede rastrear medicamentos por lote/partida
5. **Tabla sin paginación**: Las tablas grandes pueden tener problemas de rendimiento

---

## Contribuir

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia

Este proyecto fue desarrollado como sistema interno. Consultar con el propietario para términos de uso.

---

## Soporte

Para reportar bugs o solicitar funcionalidades, crear un issue en el repositorio.

---

## Historial de Versiones

### v1.0.0 (2023)
- Versión inicial desarrollada con Claude y Bolt.new
- Gestión básica de stock (solo ingresos)
- Sistema de autenticación
- Panel administrativo
- Carga masiva de datos

### v2.0.0 (En desarrollo - 2024)
- Refactorización completa del sistema de stock
- Catálogo de medicamentos
- Control de egresos
- Sistema de lotes y vencimientos
- Reportería avanzada
- Mejoras de UX/UI

---

## Créditos

Desarrollado en 2023 utilizando:
- Claude AI (Anthropic)
- Bolt.new
- React ecosystem

Actualizado y mejorado en 2024.
