var express = require('express');
var router = express.Router();
const { Live } = require('../controller/absensi.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.post('/', Live);
// router.get('/', Get);
// router.get('/:id', GetByID);
// router.put('/:id', UpdateByID);
// router.delete('/:id', DeleteByID);
// router.get('/auth', function(req, res){res.redirect('/auth/login')});

module.exports = router;
