const express = require('express')
const router = express.Router();
const characterSheetCtrl=require('../../controllers/api/characterSheets')


router.post('/createTemplate/:sessionId', characterSheetCtrl.createTemplate);
router.get('/showTemplate/:templateId', characterSheetCtrl.showTemplate);
router.post('/createSheet/:templateId', characterSheetCtrl.createCharacterSheet);
router.get('/showTemplatesForSession/:sessionId', characterSheetCtrl.showTemplatesForSession);
router.get('/showCharacterSheets/:userId', characterSheetCtrl.showCharacterSheetsforUser);
router.get('/getField/:templateFieldId', characterSheetCtrl.getField)
module.exports = router