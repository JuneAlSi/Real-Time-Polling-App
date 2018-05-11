const mongoose = require('mongoose')

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect('mongodb://<username>:<password>@ds119820.mlab.com:19820/realtime_polling')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));