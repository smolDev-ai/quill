const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    database: process.env.DATABASE_URL,
    dbEnv: process.env.DB_ENV
}