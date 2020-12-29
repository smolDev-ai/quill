const dotenv = require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    db_url: process.env.DATABASE_URL,
    db: process.env.DATABASE,
    db_user: process.env.DATABASE_USER,
    dbEnv: process.env.DB_ENV
}
