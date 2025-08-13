# Micro-Frontend Ecommerce Application

A simple ecommerce application built with micro-frontend architecture using React and Express.js.

## Architecture

- **Shell App** (Port 3000): Authentication outer frame that hosts other microfrontends
- **Products MF** (Port 3002): Product management with forms and tables
- **Orders MF** (Port 3003): Order management with forms and tables
- **Customers MF** (Port 3004): Customer management with forms and tables
- **Backend API** (Port 3001): Express.js REST API server

## Features

### Authentication Shell

- Simple login/logout functionality
- Navigation between microfrontends
- Iframe-based microfrontend integration

### Products Microfrontend

- View products in a table
- Add new products via form
- Edit existing products
- Delete products
- Product fields: Name, Price, Category, Stock

### Orders Microfrontend

- View orders in a table with status indicators
- Create new orders via form
- Edit order status
- Automatic total calculation
- Order fields: Customer, Product, Quantity, Status, Total, Date

### Customers Microfrontend

- View customers in a table
- Add new customers via form
- Edit customer information
- Delete customers
- Customer fields: Name, Email, Phone, Address

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### 1. Install Dependencies

Navigate to each directory and install dependencies:

```powershell
# Backend
cd backend
npm install

# Shell App
cd ../shell-app
npm install

# Products Microfrontend
cd ../products-mf
npm install

# Orders Microfrontend
cd ../orders-mf
npm install

# Customers Microfrontend
cd ../customers-mf
npm install
```

### 2. Start the Backend Server

```powershell
cd backend
npm start
```

The backend API will be available at http://localhost:3001

### 3. Start All Microfrontends

Open separate terminal windows for each microfrontend:

**Terminal 1 - Shell App:**

```powershell
cd shell-app
npm start
```

**Terminal 2 - Products MF:**

```powershell
cd products-mf
npm start
```

**Terminal 3 - Orders MF:**

```powershell
cd orders-mf
npm start
```

**Terminal 4 - Customers MF:**

```powershell
cd customers-mf
npm start
```

### 4. Access the Application

Open your browser and navigate to http://localhost:3000

**Login Credentials:**

- Username: `admin`
- Password: `admin`

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders

- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order

### Customers

- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

## Technologies Used

- **Frontend**: React 18, Webpack 5, Babel
- **Backend**: Express.js, Node.js
- **Styling**: CSS3 with responsive design
- **Module Format**: ES Modules (.mjs)
- **Build**: Webpack with minification

## Project Structure

```
micro/
├── backend/               # Express.js API server
│   ├── package.json
│   └── server.mjs
├── shell-app/            # Authentication shell (Port 3000)
│   ├── src/
│   │   ├── index.mjs
│   │   ├── App.mjs
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── webpack.config.js
├── products-mf/          # Products microfrontend (Port 3002)
│   ├── src/
│   │   ├── index.mjs
│   │   ├── App.mjs
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── webpack.config.js
├── orders-mf/            # Orders microfrontend (Port 3003)
│   ├── src/
│   │   ├── index.mjs
│   │   ├── App.mjs
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── webpack.config.js
├── customers-mf/         # Customers microfrontend (Port 3004)
│   ├── src/
│   │   ├── index.mjs
│   │   ├── App.mjs
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── webpack.config.js
└── README.md
```

## Development Notes

- All JavaScript files use `.mjs` extension for ES modules
- Webpack is configured to compile and minify the code
- Each microfrontend runs independently on different ports
- The shell app loads microfrontends via iframes
- CORS is enabled for cross-origin requests
- In-memory data storage (resets on server restart)

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- JWT authentication
- Module federation instead of iframes
- Unit and integration tests
- Docker containerization
- CI/CD pipeline
- Error handling and logging
- Data validation
- Pagination for tables
