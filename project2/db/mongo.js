var MongoClient = require('mongodb').MongoClient;
const config = require('../config.json');
const url = config.db.url;
const dbName = config.db.name;

exports.db = null;

exports.connect = (callback) => {
    console.log('Initializing database connection...');
    MongoClient.connect(url, (err, db) => {
        if (err) callback(err);
        exports.db = db.db(dbName);
        console.log('Database connected!');

        createDatabase();
        callback();
    })
};

var createDatabase = () => {
    var collection = config.collection;
    exports.db.createCollection(collection.name, (err, res) => {
        if(err) throw err;
        console.log('Collection ' + collection.name + ' created!');
    });
}