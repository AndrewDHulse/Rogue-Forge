const express = require('express')
const router = express.Router();
const sessionsCtrl = require ('../../controllers/api/sessions')


router.get('/', sessionsCtrl.index)
router.post('/new', sessionsCtrl.create)
module.exports = router