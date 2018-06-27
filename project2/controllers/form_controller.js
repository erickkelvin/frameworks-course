const mainTemplate = require('../views/main_template');
const formTemplate = require('../views/form_template');
const { app } = require('../config.json');
const { parse } = require('querystring');
const { db } = require('../db/mongo');

exports.get = (req, res, id) => {
  const pageTitle = (id ? 'Edit ' : 'Add new ') + app.name_single.toLowerCase();
  const titleLink = [{'value': `&#xf022; Show all ${app.name.toLowerCase()}`, 'href': '/'}];

  if (id) {
    id = new require('mongodb').ObjectID(id);
    db.collection(app.name).findOne({ '_id': id }).then(result => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(mainTemplate.build(pageTitle, formTemplate.build(id, app.fields, result), titleLink));
      res.end();
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(mainTemplate.build(pageTitle, formTemplate.build(id, app.fields), titleLink));
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
        db.collection(app.name).updateOne({ '_id': id }, newvalues, (err, _) => {
          if(err) console.log(err);
          else {
            console.log('product ' + id + ' updated!');
            res.writeHead(301, { 'Location': '/' });
            res.end();
          }
        })
      } else {
        db.collection(app.name).insertOne(parse(body), (err, _) => {
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
    db.collection(app.name).deleteOne({ '_id': id}, (err, _) => {
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