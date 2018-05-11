'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StateSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  pib: {
    type: Number,
    required: [true, 'PIB is required.']
  },
  population: {
    type: Number,
    required: [true, 'Population is required.']
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('States', StateSchema);