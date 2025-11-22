# 🚀 Guía de Despliegue en GitHub Pages

## Paso 1: Configurar el Repositorio

### 1.1 Actualizar vite.config.js
Cambia la línea `base` en `vite.config.js` con el nombre de tu repositorio:

```javascript
base: '/eventos-TuNombre-TuApellido-SiglaCurso/',
```

**Ejemplo:** Si tu repositorio es `eventos-juan-perez-pgy3121`, usa:
```javascript
base: '/eventos-juan-perez-pgy3121/',
```

### 1.2 Crear Repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repositorio: `eventos-TuNombre-TuApellido-SiglaCurso`
3. Dejar en **Público**
4. NO inicializar con README
5. Click en **Create repository**

## Paso 2: Subir el Proyecto

Ejecuta estos comandos en la terminal (reemplaza con tu información):

```powershell
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Aplicación Centro de Eventos completa"

# Conectar con GitHub (reemplaza TuUsuario y el nombre correcto)
git remote add origin https://github.com/TuUsuario/eventos-TuNombre-TuApellido-SiglaCurso.git

# Crear rama main
git branch -M main

# Subir el código
git push -u origin main
```

## Paso 3: Activar GitHub Pages

### Opción A: Con GitHub Actions (Automático - Recomendado)

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú izquierdo, click en **Pages**
4. En **Source**, selecciona: **GitHub Actions**
5. ¡Listo! El workflow se ejecutará automáticamente

**Cada vez que hagas `git push`, tu sitio se actualizará automáticamente.**

Tu sitio estará en:
```
https://TuUsuario.github.io/eventos-TuNombre-TuApellido-SiglaCurso/
```

### Opción B: Deploy Manual

Si prefieres desplegar manualmente:

```powershell
# Construir el proyecto
npm run build

# Ir a la carpeta dist
cd dist

# Inicializar git en dist
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# Subir a la rama gh-pages (reemplaza con tu info)
git push -f https://github.com/TuUsuario/eventos-TuNombre-TuApellido-SiglaCurso.git main:gh-pages

# Volver a la raíz
cd ..
```

Luego en **Settings → Pages**:
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **(root)**
- Click **Save**

## Paso 4: Verificar el Despliegue

1. Espera 1-2 minutos
2. Ve a **Settings → Pages**
3. Verás un mensaje: "Your site is live at https://..."
4. Click en el enlace para ver tu sitio

## 🔧 Actualizaciones Futuras

Para actualizar tu sitio después de hacer cambios:

### Con GitHub Actions (Opción A):
```powershell
git add .
git commit -m "Descripción de cambios"
git push
```
¡Y listo! Se despliega automáticamente.

### Con Deploy Manual (Opción B):
```powershell
npm run build
cd dist
git init
git add -A
git commit -m "Update"
git push -f https://github.com/TuUsuario/eventos-TuNombre-TuApellido-SiglaCurso.git main:gh-pages
cd ..
```

## ⚠️ Notas Importantes

1. **APIs Mock**: Los servidores REST y GraphQL NO funcionarán en GitHub Pages (solo funciona contenido estático)
2. **Para producción real**: Necesitarías APIs en un servidor (Heroku, Railway, Vercel, etc.)
3. **Para este proyecto educativo**: GitHub Pages es perfecto para mostrar la interfaz
4. **Si quieres que las APIs funcionen**: Considera usar servicios como:
   - Mocky.io para REST
   - StepZen o Apollo Studio para GraphQL
   - O mencionar en el README que requiere ejecución local

## 📝 Checklist Final

- [ ] Actualizar `base` en `vite.config.js` con el nombre correcto del repo
- [ ] Crear repositorio en GitHub
- [ ] Hacer commit y push inicial
- [ ] Activar GitHub Pages en Settings
- [ ] Verificar que el sitio está en línea
- [ ] Compartir la URL con el docente

## 🆘 Solución de Problemas

**Página en blanco:**
- Verifica que `base` en `vite.config.js` coincida exactamente con el nombre del repo
- Debe incluir las barras: `/nombre-repo/`

**Error 404:**
- Asegúrate de que GitHub Pages esté configurado en la rama correcta
- Espera unos minutos, puede tardar en actualizarse

**CSS no carga:**
- Revisa que `base` en `vite.config.js` sea correcto
- Haz rebuild: `npm run build`
