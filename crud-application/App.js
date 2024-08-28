// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './Product';
import List from './List';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/list" element={<List />} />
          <Route path="/edit/:id" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
