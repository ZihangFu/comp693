const mongoose = require('mongoose');

// Connect to the MongoDB database (running locally on port 27017) and use the 'app' database
mongoose.connect('mongodb://localhost:27017/app');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connect");
});
module.exports = mongoose;