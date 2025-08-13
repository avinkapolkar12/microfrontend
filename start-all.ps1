# Quick Start Script - Starts all services in separate windows
# Run this after setup.ps1

Write-Host "Starting Micro-Frontend Ecommerce Application..." -ForegroundColor Green

$currentPath = Get-Location

# Start Backend
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\backend'; npm start"

Start-Sleep -Seconds 2

# Start Shell App
Write-Host "Starting Shell App..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\shell-app'; npm start"

Start-Sleep -Seconds 2

# Start Products MF
Write-Host "Starting Products Microfrontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\products-mf'; npm start"

Start-Sleep -Seconds 2

# Start Orders MF
Write-Host "Starting Orders Microfrontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\orders-mf'; npm start"

Start-Sleep -Seconds 2

# Start Customers MF
Write-Host "Starting Customers Microfrontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentPath\customers-mf'; npm start"

Write-Host "`n✅ All services are starting up!" -ForegroundColor Green
Write-Host "`nPlease wait for all services to start, then visit:" -ForegroundColor Cyan
Write-Host "http://localhost:3000" -ForegroundColor White
Write-Host "`nLogin credentials: admin / admin" -ForegroundColor Yellow
