const express = require('express')
const router = express.Router();
const characterSheetCtrl=require('../../controllers/api/characterSheets')


router.post('/createTemplate/:sessionId', characterSheetCtrl.createTemplate);


module.exports = router