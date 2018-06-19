const mainTemplate = require('../views/template-main');
const inputConfig = require('../model/test-data');

exports.get = function(req, res) {
  const config = inputConfig.config;

  const titleLink = [`Add new ${config.name_single.toLowerCase()}`, '/new'];

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(mainTemplate.build(inputConfig.config.name, 'All items', titleLink));
  res.end();
};