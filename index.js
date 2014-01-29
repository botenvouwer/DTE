var handler = function(req, res) {
        fs.readFile('./page.html', function (err, data) {
            if(err) throw err;
            res.writeHead(200);
                res.end(data);
        });
}
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var port = 3250;

app.listen(port);

var jsondb = null;
fs.readFile('./database.json', function (err, data) {
    if(err) throw err;
    jsondb = JSON.parse(data);
});

// socket.io
io.sockets.on('connection', function (socket) {
        
        socket.emit("welcome", jsondb);
        socket.on('disconnect', function () {
            
        });
      	socket.on("click", function() {
            
      	});          
		  
		socket.on("add", function(data) {
			//fake it - just example
			console.log(data);
            jsondb.push(['99',data.name,data.sirname,data.age]);
			io.sockets.emit("update", jsondb);
        });
});

