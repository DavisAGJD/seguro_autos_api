# 📁 Estructura del Proyecto - Backend API Seguro de Autos

## ✅ Archivos Creados

### 📄 Configuración del Proyecto

```
├── package.json                          # Dependencias y scripts del proyecto
├── package-lock.json                     # Versiones exactas de dependencias
├── .env                                  # Variables de entorno (NO compartir)
├── .env.example                          # Template de variables de entorno
├── .gitignore                           # Archivos a ignorar en Git
├── README.md                            # Documentación completa del proyecto
├── GUIA_RAPIDA.md                       # Guía de inicio rápido
└── API_Seguro_Autos.postman_collection.json  # Colección de Postman
```

### 🗂️ Código Fuente (src/)

```
src/
├── app.js                               # Aplicación Express principal
├── config/
│   └── database.js                      # Configuración de MySQL
├── controllers/
│   ├── estadisticas.controller.js       # Lógica de estadísticas
│   ├── personas.controller.js           # CRUD de personas
│   └── polizas.controller.js            # CRUD de pólizas
├── middlewares/
│   └── error.middleware.js              # Manejo de errores
└── routes/
    ├── estadisticas.routes.js           # Rutas de estadísticas
    ├── personas.routes.js               # Rutas de personas
    └── polizas.routes.js                # Rutas de pólizas
```

### 🚀 Punto de Entrada

```
├── index.js                             # Servidor principal
└── test-db.js                           # Script de prueba de BD
```

### 💾 Datos de Prueba

```
└── data_prueba.sql                      # Script SQL con datos de ejemplo
```

---

## 📊 Resumen de Funcionalidades

### 1. Estadísticas (endpoints principales para la tarea)

✅ Número total de accidentes
✅ Número total de infracciones
✅ Horas donde surgen más accidentes
✅ Municipios con más frecuencia de accidentes
✅ Personas con mayor índice de accidentes
✅ Personas con menor índice de accidentes
✅ Resumen general consolidado

### 2. CRUD de Personas

✅ Listar todas las personas
✅ Obtener persona por ID
✅ Crear nueva persona
✅ Actualizar persona
✅ Eliminar persona
✅ Historial completo (pólizas, accidentes, infracciones)

### 3. CRUD de Pólizas

✅ Listar todas las pólizas
✅ Obtener pólizas activas
✅ Obtener póliza por ID
✅ Crear nueva póliza
✅ Actualizar póliza
✅ Eliminar póliza

---

## 🛠️ Tecnologías Utilizadas

| Tecnología            | Versión | Propósito                     |
| --------------------- | ------- | ----------------------------- |
| **Node.js**           | 16+     | Runtime JavaScript            |
| **Express**           | 4.18.2  | Framework web                 |
| **MySQL2**            | 3.6.5   | Driver MySQL con Promises     |
| **dotenv**            | 16.3.1  | Variables de entorno          |
| **CORS**              | 2.8.5   | Cross-Origin Resource Sharing |
| **Morgan**            | 1.10.0  | Logger HTTP                   |
| **Express Validator** | 7.0.1   | Validación de datos           |
| **Nodemon**           | 3.0.2   | Auto-reload en desarrollo     |

---

## 🎯 Endpoints de la API

### Base URL: `http://localhost:3000`

#### 🏠 General

- `GET /` - Documentación de la API
- `GET /health` - Health check

#### 📊 Estadísticas

- `GET /api/estadisticas/resumen` - Resumen general
- `GET /api/estadisticas/accidentes/total` - Total de accidentes
- `GET /api/estadisticas/infracciones/total` - Total de infracciones
- `GET /api/estadisticas/accidentes/horas` - Horas con más accidentes
- `GET /api/estadisticas/accidentes/municipios` - Municipios con más accidentes
- `GET /api/estadisticas/personas/mayor-indice?limit=10` - Mayor índice
- `GET /api/estadisticas/personas/menor-indice?limit=10` - Menor índice

#### 👥 Personas

- `GET /api/personas` - Listar todas
- `GET /api/personas/:id` - Obtener por ID
- `GET /api/personas/:id/historial` - Historial completo
- `POST /api/personas` - Crear
- `PUT /api/personas/:id` - Actualizar
- `DELETE /api/personas/:id` - Eliminar

#### 📄 Pólizas

- `GET /api/polizas` - Listar todas
- `GET /api/polizas/activas` - Solo activas
- `GET /api/polizas/:id` - Obtener por ID
- `POST /api/polizas` - Crear
- `PUT /api/polizas/:id` - Actualizar
- `DELETE /api/polizas/:id` - Eliminar

---

## 🚀 Scripts Disponibles

```bash
npm start       # Iniciar servidor en producción
npm run dev     # Iniciar servidor en desarrollo (auto-reload)
npm run test:db # Verificar conexión a la base de datos
```

---

## 📝 Notas Importantes

### Variables de Entorno (.env)

El archivo `.env` contiene información sensible:

- Credenciales de base de datos
- Puerto del servidor
- Configuración de entorno

⚠️ **NUNCA** compartas el archivo `.env` en repositorios públicos.
✅ Usa `.env.example` como template.

### Datos de Prueba

El archivo `data_prueba.sql` incluye:

- 8 municipios
- 15 personas
- 15 vehículos
- 15 pólizas
- 15 accidentes
- 20 infracciones

Datos diseñados para probar todas las funcionalidades de la API.

### Arquitectura

El proyecto sigue el patrón **MVC** (Model-View-Controller):

- **Models**: Representados por las consultas SQL en los controladores
- **Views**: La API REST (JSON responses)
- **Controllers**: Lógica de negocio en `src/controllers/`
- **Routes**: Definición de endpoints en `src/routes/`

---

## ✨ Características Destacadas

1. **Pool de Conexiones**: Manejo eficiente de conexiones a MySQL
2. **Manejo de Errores**: Middleware global para errores
3. **Logging**: Morgan para registro de peticiones HTTP
4. **CORS**: Habilitado para desarrollo frontend
5. **Validación**: Express Validator para validar datos
6. **Documentación**: Inline en la ruta raíz de la API
7. **Health Check**: Endpoint para verificar estado del servidor
8. **Graceful Shutdown**: Cierre limpio del servidor

---

## 🎓 Para tu Tarea

### Consultas Requeridas ✅

1. **Número de accidentes**
   - Endpoint: `/api/estadisticas/accidentes/total`

2. **Infracciones**
   - Endpoint: `/api/estadisticas/infracciones/total`

3. **Horas donde surgen más accidentes**
   - Endpoint: `/api/estadisticas/accidentes/horas`

4. **Municipios con más frecuencias de accidentes**
   - Endpoint: `/api/estadisticas/accidentes/municipios`

5. **Personas con mayor índice de accidentes**
   - Endpoint: `/api/estadisticas/personas/mayor-indice?limit=10`

6. **Personas con menor índice de accidentes**
   - Endpoint: `/api/estadisticas/personas/menor-indice?limit=10`

### Endpoint Todo-en-Uno

Para obtener toda la información de una vez:

- Endpoint: `/api/estadisticas/resumen`

---

## 🔗 Próximos Pasos Sugeridos

1. ✅ Configurar base de datos
2. ✅ Ejecutar script de datos de prueba
3. ✅ Probar conexión (`npm run test:db`)
4. ✅ Iniciar servidor (`npm run dev`)
5. ✅ Probar endpoints con Postman
6. 📝 Documentar resultados para la tarea
7. 🎨 (Opcional) Crear un dashboard frontend
8. 📊 (Opcional) Agregar gráficas con Chart.js
9. 🔐 (Opcional) Agregar autenticación JWT
10. 📱 (Opcional) Crear app móvil con React Native

---

**Desarrollado para Base de Datos - UTM 🎓**
**Enero 2026**
