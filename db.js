const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect(process.env.MONGO_URI, { 
    useNewURLParser: true,
    useUnifiedTopology: true
}).catch(
    error => console.log(error)
);

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, required: true, unique: true},
    // password: { type: String, required: true },
    saved: [{url: String, date: String, _id: Schema.Types.ObjectId}]
});

const options = {
    errorMessages: {
        UserExistsError: 'Username already exists. Please try another username.',
        IncorrectUsernameError: 'Please provide a valid email address and password.',
        IncorrectPasswordError: 'Please provide a valid email address and password.'
    }
};

userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", userSchema);