import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState('products');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const loadMicroFrontend = (moduleName) => {
    setActiveModule(moduleName);
  };

  if (!isAuthenticated) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  return (
    <div className="shell-app">
      <header className="header">
        <h1>Ecommerce Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <nav className="navigation">
        <button 
          className={activeModule === 'products' ? 'active' : ''}
          onClick={() => loadMicroFrontend('products')}
        >
          Products
        </button>
        <button 
          className={activeModule === 'orders' ? 'active' : ''}
          onClick={() => loadMicroFrontend('orders')}
        >
          Orders
        </button>
        <button 
          className={activeModule === 'customers' ? 'active' : ''}
          onClick={() => loadMicroFrontend('customers')}
        >
          Customers
        </button>
      </nav>
      
      <main className="main-content">
        <div className="microfrontend-container">
          {activeModule === 'products' && (
            <iframe 
              src="http://localhost:3002" 
              title="Products Microfrontend"
              className="microfrontend-iframe"
            />
          )}
          {activeModule === 'orders' && (
            <iframe 
              src="http://localhost:3003" 
              title="Orders Microfrontend"
              className="microfrontend-iframe"
            />
          )}
          {activeModule === 'customers' && (
            <iframe 
              src="http://localhost:3004" 
              title="Customers Microfrontend"
              className="microfrontend-iframe"
            />
          )}
        </div>
      </main>
    </div>
  );
};

const LoginComponent = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Ecommerce Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (admin)"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (admin)"
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="demo-credentials">Demo: username: admin, password: admin</p>
      </div>
    </div>
  );
};

export default App;
