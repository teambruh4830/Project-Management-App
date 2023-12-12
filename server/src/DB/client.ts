import pkg from 'pg';
const { Client } = pkg;

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

// Connection details
const dbConfig = {
  user: 'bruhdb_dev', // replace with your database username
  host: isTest ? 'ec2-52-13-3-131.us-west-2.compute.amazonaws.com' : 'localhost', // replace with the public IP of your EC2 instance
  database: isTest ? 'bruhdb_testing' : 'bruhdb', // database name
  password: 'bruhdb_dev_pass', // replace with your database password
  port: 5432,
};

const connectionString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

const client = new Client({
    connectionString,
    ssl: isProduction
    ? { rejectUnauthorized: false }
    : undefined,
});

export default client;


// Configuration for testing on local machine
// import pkg from 'pg';
// const { Client } = pkg;

// const isProduction = process.env.NODE_ENV === 'production';
// const isTest = process.env.NODE_ENV === 'test';

// // Choose the appropriate connection string based on the environment
// const connectionString = isTest
//   ? 'postgres://localhost:5432/test_pms'
//   : process.env.DATABASE_URL || 'postgres://localhost:5432/pms';

// const client = new Client({
//     connectionString,
//     ssl: isProduction
//     ? { rejectUnauthorized: false }
//     : undefined,
// });

// export default client;
