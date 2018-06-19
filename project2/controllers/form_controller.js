const mainTemplate = require('../views/template-main');
const formTemplate = require('../views/template-form');
const inputConfig = require('../model/test-data');
const { parse } = require('querystring');

exports.get = (req, res, id) => {
  const config = inputConfig.config;

  const pageTitle = (id ? 'Edit ' : 'Add new ') + config.name_single.toLowerCase();

  const titleLink = [`Show all ${config.name.toLowerCase()}`, '/'];

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(mainTemplate.build(pageTitle, formTemplate.build(id, config.fields), titleLink));
  res.end();
};

exports.post = (req, res, id) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
      console.log(parse(body));
      res.writeHead(301, { 'Location': '/' });
      res.end();
  });
};