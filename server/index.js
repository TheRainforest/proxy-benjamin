const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3005;

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/items/:id', createProxyMiddleware({
  target: 'http://127.0.0.1:3001/',
  changeOrigin: true,
}));

app.use('/items/:id', createProxyMiddleware({
  target: 'http://127.0.0.1:3002/',
  changeOrigin: true,
}));

app.use('/api/related_products/:id', createProxyMiddleware({
  target: 'http://127.0.0.1:3003/',
  changeOrigin: true,
}));

app.use('/api/allreviews', createProxyMiddleware({
  target: 'http://127.0.0.1:3004/',
  changeOrigin: true,
}));

app.listen(port, () => {
  console.log(`Proxy server listening on http://127.0.0.1:${port}`);
});
