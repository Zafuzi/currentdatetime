var express = require('express');
var app = express();

var mysql = require('mysql');

var conn = mysql.createConnection({host: 'localhost', user: 'root', password: 'Noah2014!', database: 'foobar'});

conn.connect();

// Default route
app.get('/', function (request, response) {
    response.send("Welcome to Foobar lookups. Try searching for an entry by appending it to the add" +
            "ress of the page. ");
});

// Routes with extra data
app.get('/:query', function (request, response) {
    var q = 'SELECT value FROM foobar.lookups WHERE lookups.key="' + request.params.query + '"';
    conn.query(q, function (error, results) {
        if (error) {
            response
                .status(400)
                .send('Error in database operation');
            console.log(request.params.query, q)
        } else {
            if (results.length > 0) {
                response.send('value=' + results[0].value);
            } else {
                response.send('Value for key "' + request.params.query + '" not found.')
            }
        }
    });
});

app.listen(8000);