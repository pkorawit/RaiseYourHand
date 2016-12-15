

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HandSchema   = new Schema({
    name: String,
    message: String
});

module.exports = mongoose.model('Hand', HandSchema);
