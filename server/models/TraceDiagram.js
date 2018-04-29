const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const traceDiagSchema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  pagesVisited: [{
    type: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

let TraceDiag = mongoose.model('usertrace', traceDiagSchema);

module.exports = TraceDiag;
