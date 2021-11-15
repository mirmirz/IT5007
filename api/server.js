const fs = require('fs');
require('dotenv').config();
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL ||'mongodb://localhost/customerwaitinglist';

let db;

let aboutMessage = "Waiting List API";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    customerList,
  },
  Mutation: {
    setAboutMessage,
    customerAdd,
    customerRemove,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function customerList() {
  const custDB = await db.collection('customers').find({}).toArray();
  return custDB;
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

function customerValidate(cust) {
  const errors = [];
  if (isNaN(parseInt(cust.number))) {
    errors.push('Field "number" should only contain integers.');
  }
  if (cust.number.length < 8) {
    errors.push('Field "number" must be at leaset 8 characters long.');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

function validateIDForRemoval(custID) {
  const errors = [];
  if ((custID > db.collection('customers').count()) || (custID <= 0)) {
    errors.push('ID is out of range.');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function customerAdd(_, { customer }) {
  customerValidate(customer);
  customer.timestamp = new Date();
  customer.id = await getNextSequence('customers');

  const result = await db.collection('customers').insertOne(customer);
  const savedCustomer = await db.collection('customers').findOne({_id: result.insertedId});

  return savedCustomer;
}

async function customerRemove(_, { custSn} ) {
  validateIDForRemoval(custSn)
  try {
    await db.collection('customers').deleteOne({id: custSn});
    return custSn;
  } catch (err) {
    return 0;
  }
  //validateIDForRemoval(custID);
  //bla = parseInt(custID);
  // const savedCustomer = await db.collection('customers').findOne({id: bla});

  // const savedCustomer = await db.collection('customers').findOne({id: custID});
  // //await db.collection('customers').deleteOne({id: custID});

  // await db.collection('customers').deleteOne({id: custID});
  

  //await db.collection('customers').deleteOne({id: idCust});
  //custDB.find(cust => cust.id === id);
  // if (cust) {
  //   custDB.splice(id-1, 1);
  //   for (let i = 0; i < custDB.length; i++)
  //   {
  //     custDB[i].id = i + 1;
  //   }
  //   return cust;
  // }
  // return custID;
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

const enableCors = (process.env.ENABLE_CORS || 'true') == 'true';
console.log('CORS setting:', enableCors);
server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

const port = process.env.API_SERVER_PORT || 3000;

(async function () {
  try {
    await connectToDb();
    app.listen(port, function () {
      console.log('API server started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();