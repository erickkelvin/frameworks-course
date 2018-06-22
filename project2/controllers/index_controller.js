const mainTemplate = require('../views/template-main');
const { app } = require('../config.json');
const { db } = require('../db/mongo');

exports.get = function(req, res) {
  const titleLink = [`&#xf0fe; Add new ${app.name_single.toLowerCase()}`, '/new'];

  db.collection(app.name).find({}).toArray((err, result) => {
    var listItens = '';

    result.forEach(item => {
      listItens += `<li><a href='/edit/${item['_id']}'>`;
      app.fields.forEach(field => {
        listItens += item[field.label] + '\t|\t';
      });
      listItens += '</a></li>';
    });
  
    var list = '<ul>' + listItens + '</ul>';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(mainTemplate.build(app.name, list, titleLink));
    res.end();
  })
};