let control = {};
const utils = require("./utils");

control.getDatas = async (req, res) => {
	try {
		const table = `SELECT * FROM category`;
		// if req have queryes then try to get results with the querys
		if (Object.entries(req.query).length > 0) utils.get_result_with_queries(table, req, res);
		if (Object.entries(req.query).length === 0) {
            result = await utils.selectAll(table, res);
            res.json({ data: result });
        }
	} catch (e) {
		res.status(500).send("find categories error " + e);
	}
};
control.getData = async (req, res) => {
	try {
		const table = `SELECT * FROM category where id = ${req.params.id}`;
		res.json({ data: await utils.selectOne(table, res) });
	} catch {
		res.status(500).send("find categories error ");
	}
};
control.getCountDatas = async (req, res) => {
	try { 
		const table = "select COUNT(id) as count from category";
		if (Object.entries(req.query).length > 0){
			// in this case we need to know all result without limit and start params, so we deleted 
			delete req.query._limit;
			delete req.query._start;
			 utils.get_result_with_queries(table, req, res);
			}
		if (Object.entries(req.query).length === 0) {
			
			res.json({data:await utils.selectOne(table, res) });
        }
	} catch (e) {
		res.status(500).send("find categories error " + e);
	}
};


module.exports = control;
