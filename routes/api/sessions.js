const express = require('express')
const router = express.Router();
const sessionsCtrl = require ('../../controllers/api/sessions')


router.get('/index', sessionsCtrl.index)
router.post('/new', sessionsCtrl.create)
module.exports = router