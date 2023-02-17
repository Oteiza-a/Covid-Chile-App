const express = require('express');
const app = express();
const favicon = require('serve-favicon');

app.use(favicon('./public/images/favicon.ico'));
// app.use(express.json());
app.use(express.static('public'));

var PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

module.exports = app
