# Centro de Eventos 🎭

Aplicación web completa para explorar eventos. Desarrollada con **React, HTML, CSS y JavaScript**. Integra APIs REST y GraphQL.

**Proyecto Duoc UC - 2025**

---

## 🚀 Inicio Rápido

### Opción A: Inicio Automático (Windows)

**PowerShell:**
```powershell
.\start.ps1
```

**CMD:**
```cmd
start.bat
```

Esto iniciará automáticamente los 3 servidores en ventanas separadas.

---

### Opción B: Inicio Manual

```bash
# 1. Instalar dependencias
npm install

# 2. Terminal 1 - REST API
npx json-server server/db.json --port 3001

# 3. Terminal 2 - GraphQL  
node server/index.js

# 4. Terminal 3 - React App
npm run dev

# 5. Abrir http://localhost:3000
```

## ✨ Características

✅ Lista de 8 eventos con filtros por categoría  
✅ Vista detallada de cada evento  
✅ API REST Mock (JSON Server - puerto 3001)  
✅ API GraphQL Mock (Express - puerto 4000)  
✅ React Router para navegación SPA  
✅ Diseño responsive moderno  

---

## 💻 Tecnologías

- React 18 + React Router DOM
- Axios (REST) + Apollo Client (GraphQL)
- Vite + CSS3
- JSON Server + Express

---

## 📁 Estructura

```
src/
├── components/
│   ├── Layout.jsx          # Header y footer
│   ├── EventList.jsx       # Lista con filtros
│   ├── EventCard.jsx       # Tarjeta de evento
│   └── EventDetail.jsx     # Vista completa
├── App.jsx                 # Router
└── main.jsx               

server/
├── db.json                 # 8 eventos REST
└── index.js                # Servidor GraphQL
```

---

## 🔌 APIs Mock

### REST API (Puerto 3001)
```
GET http://localhost:3001/eventos
```
Retorna: id, nombre, fecha, lugar, categoría, imagen

### GraphQL (Puerto 4000)
```graphql
query {
  eventoDetalle(id: 1) {
    organizador
    asistentesConfirmados
    descripcion
    capacidadMaxima
    precio
    requisitos
  }
}
```

**Verificar**: Abre `test-graphql.html` en el navegador

---

## 📱 Uso

**Página Principal** `/`:
- Ver todos los eventos
- Filtrar: [Todos] [Conciertos] [Conferencias]
- Click "Ver Detalles"

**Detalle** `/evento/:id`:
- Info completa (REST + GraphQL)
- Organizador, asistentes, precios
- Barra de progreso ocupación
- Botón "← Volver"

---

## 📤 Subir a GitHub y Desplegar en GitHub Pages

### 🔧 Paso 1: Configurar vite.config.js

**IMPORTANTE:** Antes de subir, actualiza `vite.config.js` con el nombre exacto de tu repositorio:

```javascript
base: '/eventos-TuNombre-TuApellido-SiglaCurso/',
```

**Ejemplo:** Si tu repo es `eventos-juan-perez-pgy3121`:
```javascript
base: '/eventos-juan-perez-pgy3121/',
```

---

### 📦 Paso 2: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. **Nombre:** `eventos-TuNombre-TuApellido-SiglaCurso`
3. Dejar en **Público**
4. **NO** inicializar con README
5. Click **Create repository**

---

### 🚀 Paso 3: Subir el Proyecto

Ejecuta en la terminal (reemplaza con tu información):

```powershell
# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Aplicación Centro de Eventos completa"

# Conectar con GitHub (reemplaza TuUsuario y nombre del repo)
git remote add origin https://github.com/TuUsuario/eventos-TuNombre-TuApellido-SiglaCurso.git

# Crear rama main
git branch -M main

# Subir el código
git push -u origin main
```

---

### 🌐 Paso 4: Activar GitHub Pages (Deploy Automático)

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú izquierdo → **Pages**
4. En **Source** → Selecciona **GitHub Actions**
5. ¡Listo! El workflow se ejecutará automáticamente

**Tu sitio estará en:**
```
https://TuUsuario.github.io/eventos-TuNombre-TuApellido-SiglaCurso/
```

⏱️ Espera 1-2 minutos para que se complete el despliegue.

---

### 🔄 Actualizaciones Futuras

Cada vez que hagas cambios y los subas, se despliega automáticamente:

```powershell
git add .
git commit -m "Descripción de los cambios"
git push
```

---

### ⚠️ Notas Importantes sobre GitHub Pages

1. **APIs Mock NO funcionarán** en GitHub Pages (solo acepta contenido estático)
2. Los servidores REST y GraphQL **requieren ejecución local**
3. En el sitio desplegado verás la interfaz completa pero sin datos dinámicos
4. **Para demostración completa:** Usa el proyecto localmente con los 3 servidores
5. **Para producción real:** Las APIs necesitarían estar en servicios como Railway, Vercel, o Render

---

### 📝 Checklist de Entrega

- [ ] `vite.config.js` actualizado con nombre del repo
- [ ] Repositorio creado en GitHub con nombre correcto
- [ ] Código subido con `git push`
- [ ] GitHub Pages activado (Settings → Pages → GitHub Actions)
- [ ] Sitio desplegado y funcionando
- [ ] URL del repositorio compartida con docente
- [ ] URL del sitio desplegado compartida con docente

---

### 🆘 Solución de Problemas GitHub Pages

**Página en blanco:**
- Verifica que `base` en `vite.config.js` coincida **exactamente** con el nombre del repo
- Debe tener barras: `/nombre-repo/`
- Rebuild: `npm run build`

**Error 404:**
- Confirma que GitHub Pages está en modo **GitHub Actions**
- Espera unos minutos, puede tardar

**CSS/imágenes no cargan:**
- Revisa que `base` en `vite.config.js` sea correcto
- Verifica que el build se completó sin errores en la pestaña **Actions**

**No aparecen los eventos:**
- Normal, las APIs mock requieren servidores Node.js (no funcionan en GitHub Pages estático)
- Muestra el proyecto funcionando localmente para la demostración completa

---

## 🐛 Solución de Problemas

### "npm no se reconoce"
→ Instala Node.js: https://nodejs.org/

### "Error al cargar eventos"
→ REST API no corre:  
`npx json-server server/db.json --port 3001`

### "Error detalles adicionales"
→ GraphQL no corre:  
`node server/index.js`

### Puerto en uso
```powershell
# Ver proceso
netstat -ano | findstr :3000

# Matar proceso (reemplaza PID)
taskkill /PID [número] /F
```

### Vulnerabilidades esbuild (moderadas)
→ Solo afectan desarrollo local  
→ Ignorar para proyecto educativo

---

## ❓ FAQ

**¿Por qué 3 terminales?**  
3 servidores independientes: REST (3001), GraphQL (4000), React (3000)

**¿Agregar más eventos?**  
Edita `server/db.json` y `server/index.js`

**¿Los cambios se guardan?**  
No, datos mock se resetean al reiniciar

**¿Cambiar colores?**  
Edita `.css`, busca `#667eea` y `#764ba2`

**¿Cambiar puerto?**  
Edita `vite.config.js` → `server.port`

---

## 📦 Scripts NPM

```bash
npm run dev      # Dev server React (3000)
npm run build    # Build producción
npm run preview  # Preview build
npm install      # Instalar dependencias
```

---

## 🎨 Componentes React

1. **Layout** - Estructura (header/footer)
2. **EventList** - Lista + filtros
3. **EventCard** - Tarjeta con imagen
4. **EventDetail** - Vista completa REST+GraphQL


---

## ✅ Checklist Entrega

Antes de entregar verifica:

- [ ] `npm install` sin errores
- [ ] Los 3 servidores inician OK
- [ ] App carga en localhost:3000
- [ ] Filtros por categoría funcionan
- [ ] Vista de detalles funciona
- [ ] Sin errores en consola navegador
- [ ] Código subido a GitHub
- [ ] Repo: `eventos-nombre-apellido-sigla`
- [ ] URL compartida con docente

---

## 🎓 Requisitos Cumplidos

✅ HTML, JavaScript, CSS, React  
✅ API REST Mock (JSON Server)  
✅ API GraphQL Mock (Express)  
✅ Lista eventos + vista detalles  
✅ React Router configurado  
✅ Listo para GitHub  

---

## 📚 Recursos

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Vite](https://vitejs.dev/)
- [Node.js](https://nodejs.org/)
