let utils = {};
const connection = require('../config/mysql');

utils.selectAll = async (query, res) => {
	try {
		// call the dba
		connection.query(query, (error, result) => {
			if (error) throw error;
			// if there a result
			if (result.length > 0) {
				return result;
			} else {
				res.sendStatus(500).send("NOT RESULT. query send no data. ");
			}
		});
	} catch (err) {
		res.send(err.message).sendStatus(500);
	}
};
utils.selectOne = async (query, res) => {
	try {
	// call the dba
	connection.query(query, (error, result) => {
		if (error) throw error;
		// if there a result
		if (result.length > 0) {
			console.log(result);
			return result[0];
		} else {
			res.sendStatus(500).send("NOT RESULT. query send no data. ");
		}
	});
	} catch (err) {
		res.send(err.message).sendStatus(500);
	}
};

module.exports = utils;
