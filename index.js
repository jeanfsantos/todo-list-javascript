var httpServer = require('http-server');
var port = (process.env.PORT || 5000);

httpServer.createServer().listen(port);
