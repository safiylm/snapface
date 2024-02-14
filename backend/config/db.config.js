const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost/facesnap';
const client = new MongoClient(url);
// Database Name
const dbName = 'facesnap';

client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const collection_user = db.collection('users');


module.exports = collection_user;

