const mainTemplate = require('../views/main_template');
const showTemplate = require('../views/show_template');
const { app } = require('../config.json');
const { db } = require('../db/mongo');

exports.get = function(req, res, id) {
  const pageTitle = app.name_single + ' details';
  const titleLink = [
    {'value': `&#xf022; Show all ${app.name.toLowerCase()}`, 'href': '/'},
    {'value': `&#xf044; Edit ${app.name_single.toLowerCase()}`, 'href': `/edit/${id}`}
  ];

  id = new require('mongodb').ObjectID(id);
  db.collection(app.name).findOne({ '_id': id }).then(result => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(mainTemplate.build(pageTitle, showTemplate.build(result, app.fields), titleLink));
    res.end();
  });
}