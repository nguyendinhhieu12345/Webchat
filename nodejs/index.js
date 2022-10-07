const port = 9000;
const express = require('express');
// const morgan = require('morgan');
const app = express();
const route = require('./routes');
const db = require('./config/db');


db.connect();

route(app);

// app.use(morgan('combined'))

app.listen(port, () => {
    console.log('app ' + port);
});
