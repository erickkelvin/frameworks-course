const mainTemplate = require('../views/main_template');
const listTemplate = require('../views/list_template');
const { app } = require('../config.json');
const { db } = require('../db/mongo');

exports.get = function(req, res, sort) {
  const titleLink = [{'value': `&#xf0fe; Add new ${app.name_single.toLowerCase()}`, 'href': '/new'}];

  const sortBy = `${sort ? sort.sortBy : '$natural'}`;
  const order = parseInt(`${sort && sort.order ? sort.order : 1}`);

  db.collection(app.name).find().sort(sortBy, order).toArray((err, result) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(mainTemplate.build(app.name, listTemplate.build(result, app.fields, sort), titleLink));
    res.end();
  })
};