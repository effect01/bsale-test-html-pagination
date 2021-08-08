

var express = require('express');
var router = express.Router();
const { getData , getDatas , getCountDatas } =  require('../controller/products.controller');



router.route("/count/")
.get(getCountDatas)
/* GET . */
router.route("/")
.get(getDatas)

router.route("/:id")
.get(getData)



module.exports = router;


