'use strict';
var mongoose = require('mongoose');
var State = mongoose.model('States');

exports.list = function() {
  var promise = State.find();
  return promise.then( (result) => {
    return result;
  })
  .catch( (err) => {
    return err;
  });
};

exports.create = function(data) {
  var content = new State(data);
  content.save(function(err){
    if(err){
      console.log(err);
      return err;
    }
  });
};

exports.read = function(id) {
  var promise = State.findById(id);
  return promise.then( (result) => {
    return result;
  })
  .catch( (err) => {
    return err;
  });
};

exports.delete = function(id) {
  State.findByIdAndRemove(id, function(err) {
    if (err){
      console.log(err);
      return err;
    }
  });
};

exports.update = function(id, data) {
  State.findByIdAndUpdate(id, {$set: data}, {new: true}, function(err, result) {
    if (err){
      console.log(err);
      return err;
    }
  });
};

exports.read_by_criteria = function(filters) {
  var query = State.find();

  for (var i = 0; i < filters.length; i++) {
    query.where(filters[i].fieldName).equals(filters[i].value)
  }
  var promise = query.exec();

  return promise.then( (result) => {
    return result;
  })
  .catch( (err) => {
    return err;
  });
};
