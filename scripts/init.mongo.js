db.customers.remove({});

const custDB = [
    {
      id: 1, name: 'Albert', number: '97795665',
      timestamp: new Date('2019-01-15'),
    },
    {
      id: 2, name: 'John', number: '88888888',
      timestamp: new Date('2019-02-17'),
    },
  ];

  db.customers.insertMany(custDB);
  const count = db.customers.count();
  print('Inserted', count, 'customers');

  db.counters.remove({ _id: 'customers' });
  db.counters.insert({ _id: 'customers', current: count });
  
  db.customers.createIndex({ id: 1 }, { unique: true });
  db.customers.createIndex({ name: 1 });
  db.customers.createIndex({ number: 1 });
  db.customers.createIndex({ timestamp: 1 });