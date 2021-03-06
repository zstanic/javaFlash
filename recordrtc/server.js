// 2013, Muaz Khan - www.MuazKhan.com
// MIT License     - www.WebRTC-Experiment.com/licence/
// Experiments     - github.com/muaz-khan/WebRTC-Experiment

var config = require('./config'),
    http = require('http'),
    url = require('url');

function start(route, handle) {

    function onRequest(request, response) {

        var pathname = url.parse(request.url).pathname,
            postData = '';

        request.setEncoding('utf8');

        request.addListener('data', function(postDataChunk) {
            postData += postDataChunk;
        });

        request.addListener('end', function() {
            route(handle, pathname, response, postData);
        });
    }

    http.createServer(onRequest).listen(config.port,'0.0.0.0');
}

exports.start = start;
