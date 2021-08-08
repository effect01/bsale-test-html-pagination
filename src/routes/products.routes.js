

var express = require('express');
var router = express.Router();
const { getData , getDatas , getCountDatas } =  require('../controller/productos.controller');



/* GET . */
router.route("/")
.get(getDatas)

router.route("/:id")
.get(getData)

router.route("/count")
.get(getCountDatas)


// router.route("/buscar/")
// .get(SearchProductByName)

module.exports = router;


