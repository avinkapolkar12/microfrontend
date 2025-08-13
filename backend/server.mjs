import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data stores
let products = [
  { id: 1, name: 'MacBook Pro 14"', price: 1999.99, category: 'Electronics', stock: 8 },
  { id: 2, name: 'iPhone 15 Pro', price: 999.99, category: 'Electronics', stock: 25 },
  { id: 3, name: 'Programming Book - Clean Code', price: 34.99, category: 'Books', stock: 50 },
  { id: 4, name: 'Wireless Headphones', price: 299.99, category: 'Electronics', stock: 30 },
  { id: 5, name: 'Gaming Chair', price: 459.99, category: 'Furniture', stock: 12 },
  { id: 6, name: 'Coffee Mug', price: 15.99, category: 'Kitchen', stock: 100 },
  { id: 7, name: 'Mechanical Keyboard', price: 149.99, category: 'Electronics', stock: 20 },
  { id: 8, name: 'Desk Lamp', price: 79.99, category: 'Furniture', stock: 35 },
  { id: 9, name: 'Water Bottle', price: 24.99, category: 'Sports', stock: 75 },
  { id: 10, name: 'Bluetooth Speaker', price: 89.99, category: 'Electronics', stock: 18 },
  { id: 11, name: 'Notebook Set', price: 12.99, category: 'Office', stock: 200 },
  { id: 12, name: 'Yoga Mat', price: 39.99, category: 'Sports', stock: 40 }
];

let orders = [
  { id: 1, customerId: 1, productId: 1, quantity: 1, total: 1999.99, status: 'Completed', date: '2024-01-15' },
  { id: 2, customerId: 2, productId: 2, quantity: 2, total: 1999.98, status: 'Pending', date: '2024-01-16' },
  { id: 3, customerId: 1, productId: 4, quantity: 1, total: 299.99, status: 'Shipped', date: '2024-01-17' },
  { id: 4, customerId: 2, productId: 7, quantity: 1, total: 149.99, status: 'Processing', date: '2024-01-18' },
  { id: 5, customerId: 1, productId: 10, quantity: 2, total: 179.98, status: 'Delivered', date: '2024-01-19' }
];

let customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St', phone: '555-0123' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', address: '456 Oak Ave', phone: '555-0456' }
];

// Authentication endpoint (simple mock)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true, token: 'fake-jwt-token', user: { username, role: 'admin' } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Products endpoints
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: 'Product deleted' });
});

// Orders endpoints
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
    date: new Date().toISOString().split('T')[0]
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...req.body };
    res.json(orders[index]);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Customers endpoints
app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.post('/api/customers', (req, res) => {
  const newCustomer = {
    id: customers.length + 1,
    ...req.body
  };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

app.put('/api/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...req.body };
    res.json(customers[index]);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

app.delete('/api/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  customers = customers.filter(c => c.id !== id);
  res.json({ message: 'Customer deleted' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
