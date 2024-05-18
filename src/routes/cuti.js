var express = require('express');
var router = express.Router();
const { SetCuti, RequestCuti, GetAllCutiByCutiId, ApproveCuti } = require('../controller/cuti.js')


router.post('/set-leave', SetCuti);
router.post('/request-leave', RequestCuti);
router.get('/:cutiId', GetAllCutiByCutiId);
router.post('/approval/:id', ApproveCuti);

module.exports = router;
