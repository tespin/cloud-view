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
    saved: [{url: String, id: Schema.Types.ObjectId}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);