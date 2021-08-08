let utils = {};
const { MySqlquery ,MySqlConnectionEnd } = require("../config/mysql");

utils.selectAll = async (query, res) => {
	try {
		// call the dba
		const result = await MySqlquery(query).catch((err) => {
			console.error(err);
			res.status(500).send(err.message);
		});
		return result;

	} catch (err) {
		MySqlConnectionEnd()
		res.status(500).send(err.message)
	}
};
utils.selectOne = async (query, res) => {
	try {
		// call the dba
		const result = await MySqlquery(query).catch((err) => {
			console.log(err);
			res.status(500).send(err.message);
		});
		console.log(result);
		return result[0];
	} catch (err) {
		MySqlConnectionEnd()
		res.status(500).send(err.message)
	}
};



// query with params
utils.get_result_with_queries = async (table, { query }, res) => {
    try{
    //  if where or order exits they need have a json. for example "_where={"category":1}" 
	if ( IsAJsonString(query._where)) {
		// get all "where" params and add to old table query string to make a new one
		const array_wheres = Object.keys(JSON.parse(query._where)).map((key) => {
            if (key == "name") {
                return  key  + " LIKE '%" + JSON.parse(query._where)[key] + "%'";
            }
			return key + " = " + "'" + JSON.parse(query._where)[key] + "'";
		});
        // join every "where" params with "AND". example : name = "value" AND other = "value", to make a correct where query sintax
		table = table + " where " + array_wheres.join(" AND ");
	}
	if (IsAJsonString(query._order)) {
		// get all "order" params and add to old table query string to make a new one with correct query sintax
		const array_order_by = Object.keys(JSON.parse(query._order)).map((key) => key + " " + JSON.parse(query._order)[key]);
		table = table + " order by " + array_order_by.join(" , ");
	}
	// if queries have _limit or _start  set then to query string, if is missing one of them then add default value
	if ( !isNaN(query._limit) || !isNaN(query._start) ) {
		table = table + ` LIMIT ${query._start ?? 0}, ${query._limit ?? 10}`;
	}
	console.log(table);
	// call the dba
	result = await utils.selectAll(table, res);
	res.json({ data: result });
} catch (err) {
    console.error('something is wrong getting result with queries')
}
};

module.exports = utils;
const IsAJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}