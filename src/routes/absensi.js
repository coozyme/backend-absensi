var express = require('express');
var router = express.Router();
const { Live } = require('../controller/absensi.js')


router.post('/', Live);

module.exports = router;
