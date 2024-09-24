const mongoose = require('mongoose');



const clientSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String
});
module.exports = mongoose.model('Client', clientSchema)