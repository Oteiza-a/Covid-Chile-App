const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

var port = process.env.port || 5000;

app.listen(port, () => {
    console.log('App listening on port 3000');
})