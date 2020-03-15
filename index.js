'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./modelos/product');
const PersonaController = require('./controladores/personaController');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST OPTIONS, PUT, DELETE');
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
);
app.use(bodyParser.json());

app.post('/persona', PersonaController.creaPersona);

app.get('/personas', PersonaController.listarpersonas);

app.get('/hola', (req, res) => {
  res.status(200).send({ message: 'Bienvenido' });
});

app.get('/api/product', (req, res) => {
  Product.find().exec((err, product) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      product
    });
  });
});

app.get('/api/product/:productId', (req, res) => {
  let ProductId = req.params.productId;
  Product.findById(ProductId).exec((err, product) => {
    if (err)
      return res.status(500).send({ message: 'error al realizar peticion' });
    if (!product)
      return res.status(404).send({ message: 'Erro el producto no existe' });

    res.json({
      ok: true,
      product
    });
  });
});

app.post('/api/product', (req, res) => {
  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStore) => {
    if (err) res.status(500).send(`Error base de datos> ${err}`);

    res.status(200).send({ product: productStore });
  });
});

app.put('/api/product/:id', (req, res) => {
  let id = req.params.id;

  let body = req.body;

  Product.findByIdAndUpdate(id, body, { new: true }, (err, product) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      product
    });
  });
});

app.delete('/api/product/:id', (req, res) => {
  let id = req.params.id;

  Product.findByIdAndDelete(id, (err, productBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productBorrado) {
      return res.status(400).json({
        ok: false,
        err: { message: 'El producto no existe' }
      });
    }

    res.json({
      ok: true,
      producto: productBorrado,
      mensaje: 'Producto borrado'
    });
  });
});

mongoose.connect(
  'mongodb+srv://UserMaster:DikeTfWxH1ZoGEgp@webavanzado-eplgz.mongodb.net/test?retryWrites=true&w=majority',
  (err, res) => {
    if (err) throw err;
    console.log('Conexion establecida');

    app.listen(8000, () => {
      console.log('Esta corriendo en puerto 8000');
    });
  }
);
