const url = require('url');  
const fs = require('fs');
const index_controller = require('./controllers/index_controller');
const form_controller = require('./controllers/form_controller');
const show_controller = require('./controllers/show_controller');

exports.get = function(req, res) {
  const url_parts = url.parse(req.url, true);
  const path = url_parts.pathname;

  if (/.(css)$/.test(path)) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    
    fs.readFile(__dirname + path, 'utf8', function(err, data) {
      if (err) throw err;
      res.write(data, 'utf8');
      res.end();
    });
  } else {
    if (path === '/' && req.method === 'GET') {
      if (url_parts.query) {
        index_controller.get(req, res, url_parts.query);
      } 
      else {
        index_controller.get(req, res);
      }
    }
    else if (/(\/show\/.+)$/.test(path) && req.method === 'GET') {
      show_controller.get(req, res, /(\/show\/)(.+)$/.exec(path)[2]);
    }
    else if (path === '/new' && req.method === 'GET') {
      form_controller.get(req, res);
    }
    else if (/(\/edit\/.+)$/.test(path) && req.method === 'GET') {
      form_controller.get(req, res, /(\/edit\/)(.+)$/.exec(path)[2]);
    }
    else if (path === '/create' && req.method === 'POST') {
      form_controller.post(req, res);
    }
    else if (/(\/update\/.+)$/.test(path) && req.method === 'POST') {
      form_controller.post(req, res, /(\/update\/)(.+)$/.exec(path)[2]);
    }
    else if (/(\/delete\/.+)$/.test(path) && req.method === 'GET') {
      form_controller.delete(req, res, /(\/delete\/)(.+)$/.exec(path)[2]);
    }
    else {
      require('./controllers/404_controller').get(req, res);
    }
  }
};