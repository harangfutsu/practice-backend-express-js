const mysql = require('mysql2')
const config = require('../config')
const connection = mysql.createConnection({
user: config.db.user,
password: config.db.password,
database: config.db.database,
host: config.db.host,
port: config.db.port
})
connection.connect((err) => {
if (err) {
console.error('Database connection failed', err)
}
else {
console.log('Connected to Database')
}
})
module.exports = connection
