const mongoose = require('mongoose');
mongoose.connect('mongodb://118.89.49.117/app');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connect");
  
});

module.exports = mongoose;