"use strict";

var _http = _interopRequireDefault(require("http"));

var _websocket = _interopRequireDefault(require("websocket"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WebSocketServer = _websocket["default"].server;

var server = _http["default"].createServer(function (req, res) {
  console.log('request received');

  _fs["default"].readFile('./index.html', null, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.write('File not found');
    } else {
      res.write(data);
    }

    res.end();
  });
});

var connection = null;
var websocket = new WebSocketServer({
  "httpServer": server
}); // this is for the sake of first handshake

websocket.on("request", function (request) {
  // if someone request a websocket the following will happen
  connection = request.accept(null, request.origin);
  connection.on("close", function (reasonCode, description) {
    console.log('peer with address: ', connection.remoteAddress, ' disconnected');
    console.log('reasonCode: ', reasonCode, 'desc: ', description);
  });
  connection.on("message", function (message) {
    if (message.binaryData) {
      console.log('received binary data of', message.binaryData.length, ' bytes');
      connection.sendBytes(message.binaryData, function (err) {
        return console.log('error while sending binary data ', err);
      });
    } else if (message.utf8Data) {
      console.log('Received message :', message.utf8Data);
    }
  });
});
var port = 8080 || process.env.PORT;
server.listen(port, function () {
  return console.log("server listening to ".concat(port));
});