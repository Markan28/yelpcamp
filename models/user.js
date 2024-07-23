const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Kisedi email same nahi ho skdi
    }
});

UserSchema.plugin(passportLocalMongoose); // This is gonna add in Username and password
// and its gonna ensure they r unique and will give us some additional methods that we can use

module.exports = mongoose.model('User', UserSchema);