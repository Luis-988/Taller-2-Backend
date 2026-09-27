const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.json());

const productos = [
  { id: 1, nombre: "Laptop", precio: 2500000, categoria: "Electrónica" },
  { id: 2, nombre: "Mouse", precio: 45000, categoria: "Accesorios" },
  { id: 3, nombre: "Teclado", precio: 90000, categoria: "Accesorios" },
];

app.get('/', (req, res) => {   
    res.json({
        nombre: "API de Productos",
        version: "1.0.0",
        endpoints: ["GET /", "GET /health", "GET /api/products", "GET api/products/:id" ]
    });
});


app.get('/health', (req, res) => {
    res.json({status : "ok", service: "backend-api" });
});

app.get('/api/products', (req, res) => { 
   res.json(productos); 
});    


app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});