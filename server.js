const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure static middleware
// to serve from the production 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});