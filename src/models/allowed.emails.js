// allowedEmailsModel.js

const mongoose = require('mongoose');

const allowedEmailsSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

const AllowedEmails = mongoose.model('AllowedEmails', allowedEmailsSchema);

module.exports = AllowedEmails;
