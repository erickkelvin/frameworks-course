const url = require('url');  
const fs = require('fs');
const index_controller = require('./controllers/index_controller');
const form_controller = require('./controllers/form_controller');

exports.get = function(req, res) {
  req.requrl = url.parse(req.url, true);
  const path = req.requrl.pathname;

  if (/.(css)$/.test(path)) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    
    fs.readFile(__dirname + path, 'utf8', function(err, data) {
      if (err) throw err;
      res.write(data, 'utf8');
      res.end();
    });
  } else {
    if (path === '/' && req.method === 'GET') {
      index_controller.get(req, res);
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
    else {
      require('./controllers/404_controller').get(req, res);
    }
  }
};