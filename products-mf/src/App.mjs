import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`http://localhost:3001/api/products/${id}`, {
          method: 'DELETE',
        });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="products-app">
      <div className="header">
        <h1>Products Management</h1>
        <button onClick={handleAddProduct} className="add-btn">
          Add New Product
        </button>
      </div>

      {showForm && (
        <ProductForm 
          product={editingProduct} 
          onClose={handleFormClose}
        />
      )}

      <ProductTable 
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

const ProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    category: product?.category || '',
    stock: product?.stock || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = product 
        ? `http://localhost:3001/api/products/${product.id}`
        : 'http://localhost:3001/api/products';
      
      const method = product ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
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
          <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {product ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td className="actions">
                <button 
                  onClick={() => onEdit(product)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(product.id)}
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
