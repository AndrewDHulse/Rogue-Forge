const express = require('express')
const router = express.Router();
const characterSheetCtrl=require('../../controllers/api/characterSheets')


router.post('/createTemplate', characterSheetCtrl.createTemplate)

module.exports = router