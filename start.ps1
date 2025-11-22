# Script para iniciar todos los servidores en PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   INICIANDO CENTRO DE EVENTOS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Este script iniciará los 3 servidores necesarios:" -ForegroundColor Yellow
Write-Host "1. REST API (Puerto 3001)" -ForegroundColor Green
Write-Host "2. GraphQL Server (Puerto 4000)" -ForegroundColor Green
Write-Host "3. React App (Puerto 3000)" -ForegroundColor Green
Write-Host ""

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js no está instalado. Por favor instálalo desde https://nodejs.org/" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "IMPORTANTE: Se abrirán 3 ventanas" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1: REST API Mock" -ForegroundColor Magenta
Write-Host "Terminal 2: GraphQL Server" -ForegroundColor Magenta
Write-Host "Terminal 3: React Application" -ForegroundColor Magenta
Write-Host ""
Write-Host "NO CIERRES estas ventanas mientras uses la app" -ForegroundColor Red
Write-Host ""
pause

# Iniciar REST API
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'REST API Mock - Puerto 3001' -ForegroundColor Green; npx json-server server/db.json --port 3001"
Start-Sleep -Seconds 3

# Iniciar GraphQL Server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'GraphQL Server - Puerto 4000' -ForegroundColor Blue; node server/index.js"
Start-Sleep -Seconds 3

# Iniciar React App
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'React App - Puerto 3000' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   SERVIDORES INICIADOS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "REST API: http://localhost:3001" -ForegroundColor Yellow
Write-Host "GraphQL: http://localhost:4000/graphql" -ForegroundColor Yellow
Write-Host "React App: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "La aplicación debería abrirse automáticamente en tu navegador" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona cualquier tecla para cerrar esta ventana..." -ForegroundColor Gray
pause
