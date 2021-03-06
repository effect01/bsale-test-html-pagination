let control = {};
const utils = require("./utils");

control.getDatas = async (req, res) => {
	try {
		const table = `SELECT * FROM product`;
		// if req have queryes then try to get results with the querys
		if (Object.entries(req.query).length > 0)
		res.json({ data: await utils.get_result_with_queries(table, req, res)});
		if (Object.entries(req.query).length === 0) {
			result = await utils.selectAll(table, res);
			res.json({ data: result });
		}
	} catch (e) {
		res.status(500).send("find products error " + e);
	}
};
control.getData = async (req, res) => {
	try {
		const table = `SELECT * FROM product where id = ${req.params.id}`;
		res.json({ data: await utils.selectOne(table, res) });
	} catch {
		res.status(500).send("find products error ");
	}
};
control.getCountDatas = async (req, res) => {
	try {
		const table = "select COUNT(id) as count from product";
		const queries = { ...req.query };
		// in this case we need to know all result without limit and start params, so we deleted
		delete queries._limit;
		delete queries._start;
		if (Object.entries(queries).length > 0) {
			res.json({ data: await utils.get_result_with_queries(table, {query:{...queries} }, res)});
			
		}

		if (Object.entries(queries).length === 0) {
			res.json({ data: [await utils.selectOne(table, res)] });
		}
	} catch (e) {
		res.status(500).send("find products error " + e);
	}
};

module.exports = control;
