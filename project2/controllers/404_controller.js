const template = require('../views/main_template');

exports.get = function(req, res) {  
  res.writeHead(404, { 'Content-Type': 'text/html' });

  res.write(template.build("404 Page not found", "<p>It looks like the page you're looking for does not exist</p>"));

  res.end();
};