'use strict';
var mongoose = require('mongoose');
var State = mongoose.model('States');

exports.list = () => {
  var promise = State.find();
  return promise.then((result) => {
    return result;
  })
  .catch((err) => {
    return err;
  });
};

exports.read = (id) => {
  var promise = State.findById(id);
  return promise.then((result) => {
    return result;
  })
  .catch((err) => {
    return err;
  });
};

exports.create = (data, success, error) => {
  var content = new State(data);
  content.save((err) => {
    return err ? error(err) : success();
  });
};

exports.update = (id, data, success, error) => {
  State.findByIdAndUpdate(id, {$set: data}, {new: true}, (err, result) => {
    return err ? error(err) : success(result);
  });
};

exports.delete = (id, success, error) => {
  State.findByIdAndRemove(id, (err) => {
    return err ? error(err) : success();
  });
};
