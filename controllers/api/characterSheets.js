const User = require('../../models/user')
const Session = require('../../models/session')
const CharacterSheet = require('../../models/characterSheet')
const characterSheetTemplate = require('../../models/characterSheetTemplate')

module.exports={
    createTemplate,
    showTemplate,
    createCharacterSheet,
    showTemplatesForSession
}

async function createTemplate(req, res) {
    try {
        const session = await Session.findById(req.params.sessionId);
        const templateData = {
            session: session._id,
            fields: req.body.fields,
            templateName: req.body.templateName
        };
        const createdTemplate = await characterSheetTemplate.create(templateData);
        res.json(createdTemplate);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
}

async function showTemplate(req, res){
    try{
        const templateId = req.params.templateId;
        const template = await characterSheetTemplate.findById(templateId);

        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }
        res.json(template);
    } catch(err){
        console.log(err);
        res.status(500).json({err: 'error while fetching template'})
    }
}

async function createCharacterSheet(req, res){
    try {
        const template = await characterSheetTemplate.findById(req.params.templateId);

        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        const values = template.fields.map(field => ({
            field: field._id, 
            value: req.body[field.label] 
        }));

        const formData = {
            characterName: req.body.characterName, 
            user: req.user._id,
            template: template._id,
            values: values
        };

        const createdCharacterSheet = await CharacterSheet.create(formData);
        res.json(createdCharacterSheet);
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'error while creating character sheet'})
    }
}

async function showTemplatesForSession(req, res) {
    try {
        const sessionId = req.params.sessionId;
        const templates = await characterSheetTemplate.find({ session: sessionId });

        res.json(templates);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Error while fetching templates' });
    }
}