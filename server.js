const express = require('express'),
    app = express(),
    path = require('path'),
    mysql = require('mysql');

var conn = mysql.createConnection({host: 'localhost', user: 'root', password: 'Noah2014!', database: 'foobar'});
conn.connect();

app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, "public")));

// Default route
app.get('/', function (req, res) {
    var q = 'SELECT * FROM foobar.lookups';
    conn.query(q, function (error, results) {
        if (error) {
            res
                .status(400)
                .send('Error in database operation');
            console.log(req.params.query, q)
        } else {
            if (results.length > 0) {
                res.render('index', {
                    title: 'Lookups',
                    message: 'Welcome to Lookups.',
                    table: results
                })
            } else {
                res.render('index', {
                    title: 'Lookups',
                    message: 'Welcome to Lookups',
                    table: []
                })
            }
        }
    });
});
// Create a new entry
app.get('/add/:key/:value', function (req, res) {
    var data = {
        key: req.params.key,
        value: req.params.value
    }
    var q = "INSERT INTO foobar.lookups SET ?";
    conn.query(q, data, function (error, results) {
        if (error) {
            res.send({error: error, status: 400});
        } else {
            res
                .status(200)
                .send("OK")
        }
    });
})
// Update an entry
app.get('/update/:key/:value', function (req, res) {
    var data = {
        key: req.params.key,
        value: req.params.value
    }
    var q = "UPDATE foobar.lookups SET ? WHERE lookups.key='" + req.params.key + "'";
    conn.query(q, data, function (error, results) {
        if (error) {
            res.send({error: error, status: 400});
        } else {
            res
                .status(200)
                .send("OK")
        }
    });
})

app.get('/delete/:key', function (req, res) {
    var data = {
        key: req.params.key,
        value: req.params.value
    }
    var q = "DELETE FROM foobar.lookups WHERE lookups.key='" + req.params.key + "'";
    conn.query(q, data, function (error, results) {
        if (error) {
            res.send({error: error, status: 400});
        } else {
            res
                .status(200)
                .send("OK")
        }
    });
})

app.listen(8000);