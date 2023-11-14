var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  // process HTTP request. 
});
server.listen(3000, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// Array to store all connected clients
var clients = [];

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  console.log("Connection accepted");

  // Add the new connection to the list of clients
  clients.push(connection);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log("Received message from client: ", message.utf8Data);

      // Broadcast the message to all connected clients
      clients.forEach(function(client) {
        if (client !== connection) {
          client.sendUTF(message.utf8Data);
        }
      });
    }
  });

  connection.on('close', function(reasonCode, description) {
    console.log("Connection closed");

    // Remove the closed connection from the list of clients
    clients = clients.filter(function(client) {
      return client !== connection;
    });
  });
});
