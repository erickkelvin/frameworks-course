const http_IP = '127.0.0.1';  
const http_port = 3000;  
const http = require('http');  
var mongo = require('./db/mongo');

mongo.connect((err) => {
  if(!err) {
    const server = http.createServer(function(req, res) {  
      require('./router').get(req, res);
    });
    
    server.listen(http_port, http_IP);  
    console.log('\nListening to http://' + http_IP + ':' + http_port);
  } else {
    console.log(err);
  }
});