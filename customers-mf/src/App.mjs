import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await fetch(`http://localhost:3001/api/customers/${id}`, {
          method: 'DELETE',
        });
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCustomer(null);
    fetchCustomers();
  };

  return (
    <div className="customers-app">
      <div className="header">
        <h1>Customers Management</h1>
        <button onClick={handleAddCustomer} className="add-btn">
          Add New Customer
        </button>
      </div>

      {showForm && (
        <CustomerForm 
          customer={editingCustomer} 
          onClose={handleFormClose}
        />
      )}

      <CustomerTable 
        customers={customers}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
      />
    </div>
  );
};

const CustomerForm = ({ customer, onClose }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    address: customer?.address || '',
    phone: customer?.phone || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = customer 
        ? `http://localhost:3001/api/customers/${customer.id}`
        : 'http://localhost:3001/api/customers';
      
      const method = customer ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{customer ? 'Edit Customer' : 'Add New Customer'}</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="customer-form">
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              rows="3"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {customer ? 'Update' : 'Add'} Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <div className="customer-name">
                  <strong>{customer.name}</strong>
                </div>
              </td>
              <td>
                <a href={`mailto:${customer.email}`} className="email-link">
                  {customer.email}
                </a>
              </td>
              <td>
                <a href={`tel:${customer.phone}`} className="phone-link">
                  {customer.phone}
                </a>
              </td>
              <td className="address-cell">
                {customer.address}
              </td>
              <td className="actions">
                <button 
                  onClick={() => onEdit(customer)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(customer.id)}
                  className="delete-btn"
                >
                  Delete
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
