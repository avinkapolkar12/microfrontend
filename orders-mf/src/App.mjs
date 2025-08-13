import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingOrder(null);
    fetchOrders();
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown';
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown';
  };

  return (
    <div className="orders-app">
      <div className="header">
        <h1>Orders Management</h1>
        <button onClick={handleAddOrder} className="add-btn">
          Add New Order
        </button>
      </div>

      {showForm && (
        <OrderForm 
          order={editingOrder} 
          products={products}
          customers={customers}
          onClose={handleFormClose}
        />
      )}

      <OrderTable 
        orders={orders}
        getCustomerName={getCustomerName}
        getProductName={getProductName}
        onEdit={handleEditOrder}
      />
    </div>
  );
};

const OrderForm = ({ order, products, customers, onClose }) => {
  const [formData, setFormData] = useState({
    customerId: order?.customerId || '',
    productId: order?.productId || '',
    quantity: order?.quantity || '',
    status: order?.status || 'Pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const product = products.find(p => p.id === parseInt(formData.productId));
    const total = product ? product.price * formData.quantity : 0;
    
    const orderData = {
      ...formData,
      customerId: parseInt(formData.customerId),
      productId: parseInt(formData.productId),
      quantity: parseInt(formData.quantity),
      total: total
    };

    try {
      const url = order 
        ? `http://localhost:3001/api/orders/${order.id}`
        : 'http://localhost:3001/api/orders';
      
      const method = order ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    const product = products.find(p => p.id === parseInt(formData.productId));
    return product ? (product.price * formData.quantity).toFixed(2) : '0.00';
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{order ? 'Edit Order' : 'Add New Order'}</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label>Customer:</label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
            >
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Product:</label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          {formData.productId && formData.quantity && (
            <div className="total-display">
              <strong>Total: ${calculateTotal()}</strong>
            </div>
          )}
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {order ? 'Update' : 'Add'} Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const OrderTable = ({ orders, getCustomerName, getProductName, onEdit }) => {
  return (
    <div className="table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{getCustomerName(order.customerId)}</td>
              <td>{getProductName(order.productId)}</td>
              <td>{order.quantity}</td>
              <td>${order.total}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.date}</td>
              <td className="actions">
                <button 
                  onClick={() => onEdit(order)}
                  className="edit-btn"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
