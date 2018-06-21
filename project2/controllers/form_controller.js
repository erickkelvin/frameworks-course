const mainTemplate = require('../views/template-main');
const formTemplate = require('../views/template-form');
const Config = require('../config.json');
const { parse } = require('querystring');
const db = require('../db/mongo').db;

exports.get = (req, res, id) => {
  const config = Config.collection;
  const pageTitle = (id ? 'Edit ' : 'Add new ') + config.name_single.toLowerCase();

  const titleLink = [`Show all ${config.name.toLowerCase()}`, '/'];

  if(id) {
    id = new require('mongodb').ObjectID(id);
    db.collection(config.name).findOne({ '_id': id }).then(result => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(mainTemplate.build(pageTitle, formTemplate.build(id, config.fields, result), titleLink));
      res.end();
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(mainTemplate.build(pageTitle, formTemplate.build(id, config.fields), titleLink));
    res.end();
  }
};

exports.post = (req, res, id) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {      
      if(id) {
        var newvalues = { $set: parse(body)};
        id = new require('mongodb').ObjectID(id);
        db.collection('products').updateOne({ '_id': id }, newvalues, (err, _) => {
          if(err) console.log(err);
          else {
            console.log('product ' + id + ' updated!');
            res.writeHead(301, { 'Location': '/' });
            res.end();
          }
        })
      } else {
        db.collection('products').insertOne(parse(body), (err, _) => {
          if(err) console.log(err);
          else {
            console.log('product created!');
            res.writeHead(301, { 'Location': '/' });
            res.end();
          }
        })
      }
  });
};

exports.delete = (req, res, id) => {
  if(id) {
    id = new require('mongodb').ObjectID(id);
    db.collection(config.name).deleteOne({ '_id': id}, (err, _) => {
      if(err) console.log(err);
      else {
        console.log('product deleted!');
        res.writeHead(301, { 'Location': '/' });
        res.end();
      }
    })
  } else {
    res.writeHead(301, { 'Location': '/' });
    res.end();
  }
}