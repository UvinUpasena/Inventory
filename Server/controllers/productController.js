const pool = require('../config/db');
const asyncHandler = require('express-async-handler');

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM Products');
  res.status(200).json(rows);
});

// Get product by ID
const getProductsById = asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM Products WHERE id = ?', [req.params.id]);
  if (rows.length === 0) throw new Error("Product not found");
  res.status(200).json(rows[0]);
});

// Get product by Name
const getProductsByName = asyncHandler(async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Products WHERE name = ?', [req.params.name]);
    if (rows.length === 0) throw new Error("Product not found");
    res.status(200).json(rows[0]);
  });

// Create a new product
const createProducts = asyncHandler(async (req, res) => {
  const { name, quantity, price, image } = req.body;
  const [result] = await pool.query(
    'INSERT INTO Products (name, quantity, price, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
    [name, quantity, price, image]
  );
  const [newProduct] = await pool.query('SELECT * FROM Products WHERE id = ?', [result.insertId]);
  res.status(201).json(newProduct[0]);
});

// Update a product
const updateProducts = asyncHandler(async (req, res) => {
  const { name, quantity, price, image } = req.body;
  const id = req.params.id;

  const [result] = await pool.query(
    'UPDATE Products SET name = ?, quantity = ?, price = ?, image = ?, updatedAt = NOW() WHERE id = ?',
    [name, quantity, price, image, id]
  );

  if (result.affectedRows === 0) throw new Error("Product not found");

  const [updatedProduct] = await pool.query('SELECT * FROM Products WHERE id = ?', [id]);
  res.status(200).json(updatedProduct[0]);
});

// Delete a product
const deleteProducts = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const [result] = await pool.query('DELETE FROM Products WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw new Error("Product not found");
  res.status(200).json({ message: 'Deleted successfully' });
});

module.exports = {
  getProducts,
  getProductsById,
  getProductsByName,
  createProducts,
  updateProducts,
  deleteProducts
};
