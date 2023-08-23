const User = require('../../models/user')
const Session = require('../../models/session')
const CharacterSheet = require('../../models/characterSheet')
const characterSheetTemplate = require('../../models/characterSheetTemplate')

module.exports={
    createTemplate
}

async function createTemplate(req, res) {
    try {
        const session = await Session.findById(req.params.sessionId);
        const templateData = {
            session: session._id,
            fields: req.body.fields,
        };
        const createdTemplate = await characterSheetTemplate.create(templateData);
        res.json(createdTemplate);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}