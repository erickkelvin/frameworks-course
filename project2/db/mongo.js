const { MongoClient } = require('mongodb');
const { db, app } = require('../config.json');

exports.db = null;

exports.connect = (callback) => {
    console.log('Initializing database connection...');
    MongoClient.connect(db.url, (err, db) => {
        if (err) callback(err);
        exports.db = db.db(db.name);
        console.log('Database connected!');

        createDatabase();
        callback();
    })
};

var createDatabase = () => {
    exports.db.createCollection(app.name, (err, res) => {
        if(err) throw err;
        console.log('Collection ' + app.name + ' created!');
    });
}