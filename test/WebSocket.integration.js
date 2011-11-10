var assert = require('assert')
  , WebSocket = require('../')
  , server = require('./testserver');

var port = 20000;

function getArrayBuffer(buf) {
    var l = buf.length;
    var arrayBuf = new ArrayBuffer(l);
    for (var i = 0; i < l; ++i) {
        arrayBuf[i] = buf[i];
    }
    return arrayBuf;
}

function areArraysEqual(x, y) {
    if (x.length != y.length) return false;
    for (var i = 0, l = x.length; i < l; ++i) {
        if (x[i] !== y[i]) return false;
    }
    return true;
}

module.exports = {
    'communicates successfully with echo service': function(done) {
        var ws = new WebSocket('ws://echo.websocket.org/', {protocolVersion: 8, origin: 'http://websocket.org'});
        var str = Date.now().toString();
        ws.on('connected', function() {
            ws.send(str, {mask: true});
        });
        ws.on('message', function(data, flags) {
            assert.equal(str, data);
            ws.terminate();
            done();
        });
    },
}