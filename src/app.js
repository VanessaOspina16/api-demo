const express = require('express');
const app = express();

// Middleware: parsear cuerpo JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: logger de peticiones
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware: CORS simplificado
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rutas
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando', version: '1.0.0', endpoints: { productos: '/api/productos' } });
});

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada', ruta: req.originalUrl });
});

module.exports = app;