require('dotenv').config();
const mongooseClient = require('mongoose');

/* check mongo DB connection*/
// console.log(process.env)
mongooseClient.connect(process.env.DB_URL, { useNewUrlParser: true ,useUnifiedTopology: true  });
mongooseClient.connection.once('open', () => console.log('Connected to a MongoDB instance'));
mongooseClient.connection.on('error', error => console.error(error));

export {mongooseClient};