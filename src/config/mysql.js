const mysql = require("mysql");
const {promisify} = require('util');
require('dotenv').config()

const config = {
	host: process.env.MYSQL_HOST_URL,
	user: "bsale_test",
	password: "bsale_test",
	database: "bsale_test",
	insecureAuth: true,
};

const connection = mysql.createPool(config);

connection.getConnection((error, connection) => {
	if (error) {
		switch (error.code) {
			case "PROTOCOL_CONNECTION_LOST":
				console.error("Connection lost");
				break;
			case "ER_CON_COUNT_ERROR":
				console.error("Connection count error");
				break;
			case "ECONREFUSED":
				console.error("Connection refused");
				break;
			case "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR":
				console.error("Connection queue after fatal error");
				break;
			case "ER_ACCESS_DENIED_ERROR":
				console.error("Something is wrong with your user name or password");
				break;
			case "ER_DBACCESS_DENIED_ERROR":
				console.error("Something is wrong with your user name or password");
				break;
			case "ER_BAD_FIELD_ERROR":
				console.error("Column does not exist");
				break;
			case "ER_UNKNOWN_ERROR":
				console.error("Something is wrong. UNKNOWN ERROR !");
				break;
			default:
				console.error("Something is wrong in mysql! ", error);
				return;
		}
		return;
	}
	if(connection) {connection.release();
	console.log("connected to mysql :) !!!")};
	return;
});

// promisify a promise enable to be used in async/await
const MySqlquery = promisify( connection.query  ).bind(connection)
const MySqlConnectionEnd = promisify(connection.end).bind(connection)

module.exports ={MySqlquery,MySqlConnectionEnd, connection} ;

