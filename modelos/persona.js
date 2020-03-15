'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonaSchema = Schema({
  nombre: String,
  apellido: String
});

module.exports = mongoose.model('Persona', PersonaSchema);
