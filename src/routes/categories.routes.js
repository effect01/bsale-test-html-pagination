

var express = require('express');
var router = express.Router();
const {  getDatas,getCountDatas} =  require('../controller/categories.controller');

/* GET . */

router.route('/:id')
.get(getDatas)

router.route('/:id/count')
.get(getCountDatas)


module.exports = router;



