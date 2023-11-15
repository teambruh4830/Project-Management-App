import pkg from 'pg';
const { Client } = pkg;
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
// Choose the appropriate connection string based on the environment
const connectionString = isTest
    ? 'postgres://localhost:5432/test_pms'
    : process.env.DATABASE_URL || 'postgres://localhost:5432/pms';
const client = new Client({
    connectionString,
    ssl: isProduction
        ? { rejectUnauthorized: false }
        : undefined,
});
export default client;
