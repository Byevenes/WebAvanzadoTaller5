'use strict';
const express = require('express');

const app = express();

const Persona = require('../modelos/persona');

// Creamos un método en el controlador, eneste caso una accion de pruebas
function creaPersona(req, res) {
  let persona = new Persona();
  persona.nombre = req.body.nombre;
  persona.apellido = req.body.apellido;
  persona.save((err, personaStore) => {
    if (err) res.status(500).send(`Error base de datos> ${err}`);

    res.status(200).send({ persona: personaStore });
  });
}

function listarpersonas(req, res) {
  Persona.find({}).then(function(personas) {
    res.send({ personas });
  });
}

// Exportamos las funciones de un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
  creaPersona,
  listarpersonas
};
