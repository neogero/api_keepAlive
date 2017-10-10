'use strict';

// Load required packages
var mongoose = require('mongoose');

// Define our schema
var MessageSchema   = new mongoose.Schema({
    clientIp: String,
    uuid: String,
    model: String,
    platform: String,
    version: String,
    manufacturer: String,
    serial: String,
    message: String,
    date:{ type: Date, default: Date.now }
});

// Export the Mongoose model
module.exports = mongoose.model('message', MessageSchema);