// src/Product.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

function Product() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      const product = products.find((product) => product.id === parseInt(id));
      if (product) {
        setCurrentProduct(product);
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
        setEditing(true);
      }
    }
  }, [id]);

  const handleSaveProduct = () => {
    const newProduct = {
      id: editing ? currentProduct.id : Date.now(),
      name,
      price,
      category,
      image,
    };

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (editing) {
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? newProduct : product
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } else {
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
    }

    setName('');
    setPrice('');
    setCategory('');
    setImage('');
    setEditing(false);
    setCurrentProduct(null);
    navigate('/list');
  };

  return (
    <div className="form-container">
      <h1>{editing ? 'Edit Product' : 'Add Product'}</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={handleSaveProduct}>
          {editing ? 'Update Product' : 'Add Product'}
        </button>
      </div>
      <button className="view-list-button" onClick={() => navigate('/list')}>
        View Product List
      </button>
    </div>
  );
}

export default Product;
