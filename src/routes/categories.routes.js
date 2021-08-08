

var express = require('express');
var router = express.Router();
const { getData, getDatas,getCountDatas} =  require('../controller/categories.controller');

/* GET . */
router.route('/:id/count')
.get(getCountDatas)
router.route('/')
.get(getDatas)
router.route('/:id')
.get(getData)




module.exports = router;



