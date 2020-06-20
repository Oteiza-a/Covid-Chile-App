const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

var PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('App listening on port 3000');
})