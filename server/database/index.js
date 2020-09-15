const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/mvp';

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

db
  .then(db => console.log(`Connected to: ${mongoURI}`))
  .catch(err => {

    console.log(err);
  });

module.exports = db;