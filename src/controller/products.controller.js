let control = {};
const utils = require("./utils");

control.getDatas = async (req, res) => {
	try {
		const table = `SELECT * FROM product`;
		// if req have queryes then try to get results with the querys
		if (Object.entries(req.query).length > 0) utils.get_result_with_queries(table, req, res);
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
		res.json( await utils.selectOne(table, res)  );
	} catch (e) {
		res.status(500).send("find products error " + e);
	}
};


module.exports = control;
