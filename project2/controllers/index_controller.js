const mainTemplate = require('../views/template-main');
const Config = require('../config.json');
const db = require('../db/mongo').db;

exports.get = function(req, res) {
  const config = Config.collection;
  const titleLink = [`Add new ${config.name_single.toLowerCase()}`, '/new'];

  db.collection(config.name).find({}).toArray((err, result) => {
    var listItens = '';

    result.forEach(item => {
      listItens += `<li><a href='/edit/${item['_id']}'>`;
      config.fields.forEach(field => {
        listItens += item[field.label] + '\t|\t';
      });
      listItens += '</a></li>';
    });
  
    var list = '<ul>' + listItens + '</ul>';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(mainTemplate.build(config.name, list, titleLink));
    res.end();
  })
};