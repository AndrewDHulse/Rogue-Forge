const express = require('express')
const router = express.Router();
const sessionsCtrl = require ('../../controllers/api/sessions')


router.get('/index', sessionsCtrl.index)
router.post('/new', sessionsCtrl.create)
router.get('/details/:id', sessionsCtrl.show)
router.delete('/delete/:id', sessionsCtrl.deleteSession)
module.exports = router