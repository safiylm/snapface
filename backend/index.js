var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./routes/user.routes")
app.use(router )


app.use(express.static(path.join(__dirname, '../dist/snapface')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/snapface/index.html'));
});


app.listen(4200, function () {
  console.log('Example app listening on port 4200!')
})