const express = require('express');

const app = express();

const routes = require('./routes');
const config = require('./config');

app.use(express.json());

app.use('/', routes);

app.listen(config.port, () => {
    console.log(`Server starting on http://localhost:${config.port}`);
});