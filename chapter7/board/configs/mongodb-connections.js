const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/myFirstDatatabse?retryWrites=true&w=majority";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
}