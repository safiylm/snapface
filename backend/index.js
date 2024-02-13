const express = require('express');
const app = express();
const port = 4200;
const path = require('path');

 const mongoose = require('mongoose');


 mongoose.connect('mongodb://localhost/facesnap', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.static(path.join(__dirname, '../dist/snapface')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/snapface/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});