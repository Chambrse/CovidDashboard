var mysql = require('mysql2');

var con = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: 'OWID'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;