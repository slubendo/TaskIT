const mysql = require('mysql2/promise');

const db = {
	host: "sql.freedb.tech",
	user: "freedb_mainUser",
	password: "w!EkbAgRCVzh7@?",
	database: "freedb_todoist",
	multipleStatements: false,
	namedPlaceholders: true,
};

var database = mysql.createPool(db);
module.exports = database;
		
