const express = require('express')
const router = express.Router();
const sessionsCtrl = require ('../../controllers/api/sessions')


router.post('/', sessionsCtrl.create)

module.exports = router