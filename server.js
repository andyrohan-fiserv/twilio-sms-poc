const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app);

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});