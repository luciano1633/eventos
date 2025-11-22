@echo off
echo ========================================
echo   INICIANDO CENTRO DE EVENTOS
echo ========================================
echo.
echo Este script iniciara los 3 servidores necesarios:
echo 1. REST API (Puerto 3001)
echo 2. GraphQL Server (Puerto 4000)  
echo 3. React App (Puerto 3000)
echo.
echo Asegurate de tener Node.js instalado
echo.
pause

echo.
echo Instalando dependencias...
call npm install

echo.
echo ========================================
echo IMPORTANTE: Se abriran 3 ventanas
echo ========================================
echo.
echo Terminal 1: REST API Mock
echo Terminal 2: GraphQL Server
echo Terminal 3: React Application
echo.
echo NO CIERRES estas ventanas mientras uses la app
echo.
pause

start "REST API - Puerto 3001" cmd /k "npx json-server server/db.json --port 3001"
timeout /t 3 /nobreak >nul

start "GraphQL Server - Puerto 4000" cmd /k "node server/index.js"
timeout /t 3 /nobreak >nul

start "React App - Puerto 3000" cmd /k "npm run dev"

echo.
echo ========================================
echo   SERVIDORES INICIADOS
echo ========================================
echo.
echo REST API: http://localhost:3001
echo GraphQL: http://localhost:4000/graphql
echo React App: http://localhost:3000
echo.
echo La aplicacion se abrira automaticamente en tu navegador
echo.
pause
