# Micro-Frontend Ecommerce Setup Script
# Run this script to install all dependencies

Write-Host "Installing dependencies for Micro-Frontend Ecommerce App..." -ForegroundColor Green

# Backend
Write-Host "`nInstalling backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Backend installation failed!" -ForegroundColor Red
    exit 1
}

# Shell App
Write-Host "`nInstalling shell-app dependencies..." -ForegroundColor Yellow
Set-Location ../shell-app
npm install
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Shell-app installation failed!" -ForegroundColor Red
    exit 1
}

# Products MF
Write-Host "`nInstalling products-mf dependencies..." -ForegroundColor Yellow
Set-Location ../products-mf
npm install
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Products-mf installation failed!" -ForegroundColor Red
    exit 1
}

# Orders MF
Write-Host "`nInstalling orders-mf dependencies..." -ForegroundColor Yellow
Set-Location ../orders-mf
npm install
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Orders-mf installation failed!" -ForegroundColor Red
    exit 1
}

# Customers MF
Write-Host "`nInstalling customers-mf dependencies..." -ForegroundColor Yellow
Set-Location ../customers-mf
npm install
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Customers-mf installation failed!" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "`n✅ All dependencies installed successfully!" -ForegroundColor Green
Write-Host "`nTo start the application:" -ForegroundColor Cyan
Write-Host "1. Run 'npm start' in backend/ directory" -ForegroundColor White
Write-Host "2. Run 'npm start' in shell-app/ directory" -ForegroundColor White
Write-Host "3. Run 'npm start' in products-mf/ directory" -ForegroundColor White
Write-Host "4. Run 'npm start' in orders-mf/ directory" -ForegroundColor White
Write-Host "5. Run 'npm start' in customers-mf/ directory" -ForegroundColor White
Write-Host "`nThen visit http://localhost:3000 and login with admin/admin" -ForegroundColor Cyan
