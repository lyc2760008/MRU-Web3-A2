require('dotenv').config();
//console.log(process.env.MONGO_URL);

const mongoose = require('mongoose');

const connect = () => {
    const opt = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: "funwebdev"
    };
    mongoose.connect(
    process.env.MONGO_ATLAS_PW, opt);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
    console.log("connected to mongo");
    });
};

module.exports = {
    connect
    };