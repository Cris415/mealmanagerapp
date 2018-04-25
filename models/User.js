const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
});

// Let mongoose know that we want to create a collection called users
mongoose.model('users', userSchema);
