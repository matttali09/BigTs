const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// passport local package for easier mongoose passport setup
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  scheduled: Array,
  role: String,
  date: { type: Date, default: Date.now }
});


userSchema.plugin(passportLocalMongoose, { usernameField : 'username' });

// create the User export based off the schema and plugin
const User = mongoose.model("User", userSchema);

module.exports = User;