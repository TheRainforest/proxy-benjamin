require('dotenv').config();
const nr = require('newrelic');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/items/:id', createProxyMiddleware({
  target: 'http://3.132.5.204:3001/',
  changeOrigin: true,
}));

app.use('/items/:id', createProxyMiddleware({
  target: 'http://34.201.53.74:3002/',
  changeOrigin: true,
}));

app.use('/api/related_products/:id', createProxyMiddleware({
  target: 'http://localhost:3003/',
  changeOrigin: true,
}));

// app.post('/api/related_products/', createProxyMiddleware({
//   target: 'http://localhost:3003/',
//   changeOrigin: true,
// }));

app.use('/api/allreviews', createProxyMiddleware({
  target: 'http://18.212.184.37:3004/',
  changeOrigin: true,
}));

app.listen(port);
