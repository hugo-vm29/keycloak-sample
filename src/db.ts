import { MongoClient, Db } from 'mongodb';

let db: Db;
let client: MongoClient;

export default {
  connect: async () => {
   
    if (db) return db;

    const dbURL =  process.env.DB_URL;
    const dbName =  process.env.DB_NAME;

    if(dbURL && dbName){
    
      console.log('Connecting database');
      client = await MongoClient.connect(dbURL);

      if (!client) {
        throw new Error('Could not establish Mongo connection');
      }

      db = client.db(dbName);
      console.log(`Connected to database ${dbName}`);

      return db;
    
    }else{
      console.log(`No database found`);
    }

  },

  collection: (collectionName: string) => db.collection(collectionName),
  get: () => db,
  close: () => client.close(),
};
