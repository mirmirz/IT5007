const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/customerwaitinglist';

function testWithCallbacks(callback) {
    console.log('\n--- testWithCallbacks ---');
    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect(function(err, client) {
      if (err) {
        callback(err);
        return;
      }
      console.log('Connected to MongoDB');
  
      const db = client.db();
      const collection = db.collection('customers');
  
      const customer = { id: 1, name: 'Babushka', number: '98989898' };
      collection.insertOne(customer, function(err, result) {
        if (err) {
          client.close();
          callback(err);
          return;
        }
        console.log('Result of insert:\n', result.insertedId);
        collection.find({ _id: result.insertedId})
          .toArray(function(err, docs) {
          if (err) {
            client.close();
            callback(err);
            return;
          }
          console.log('Result of find:\n', docs);
          client.close();
          callback(err);
        });
      });
    });
  }

async function testWithAsync() {
    console.log('\n--- testWithAsync ---');
    const client = new MongoClient(url, { useNewUrlParser: true });
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      const db = client.db();
      const collection = db.collection('customers');
  
      const customer = { id: 2, name: 'Babushka2', number: '11112222' };
      const result = await collection.insertOne(customer);
      console.log('Result of insert:\n', result.insertedId);
  
      const docs = await collection.find({ _id: result.insertedId })
        .toArray();
      console.log('Result of find:\n', docs);
    } catch(err) {
      console.log(err);
    } finally {
      client.close();
    }
  }
  
  testWithCallbacks(function(err) {
    if (err) {
      console.log(err);
    }
    testWithAsync();
  });