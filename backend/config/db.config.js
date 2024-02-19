const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost/facesnap';
const client = new MongoClient(url);
// Database Name
const dbName = 'facesnap';

client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);


module.exports = db; 
//module.exports =  collection_publications ;

