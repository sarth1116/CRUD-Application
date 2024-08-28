// src/List.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function List() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = () => {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="list-container">
      <h1>Product List</h1>
      <button onClick={() => navigate('/')}>Add New Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} width="50" />
            {product.name} - ₹{product.price} - {product.category}
            <button onClick={() => handleEdit(product.id)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
