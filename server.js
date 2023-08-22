const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));



app.use(require('./config/checkToken'));
const port = process.env.PORT || 3001;

app.use('/api/users', require('./routes/api/users'));
app.use('/api/sessions', require('./routes/api/sessions'))
app.use('/api/sheets', require('./routes/api/characterSheets'))

//Catch All
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//Listener
app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});