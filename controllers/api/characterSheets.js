const User = require('../../models/user')
const Session = require('../../models/session')
const CharacterSheet = require('../../models/characterSheet')
const characterSheetTemplate = require('../../models/characterSheetTemplate')
const characterSheet = require('../../models/characterSheet')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


module.exports={
    createTemplate,
    showTemplate,
    createCharacterSheet,
    showTemplatesForSession,
    showCharacterSheetsforUser,
    getField,
    deleteCharacterSheet,
    deleteTemplate,
    updateCharacterSheet,
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

async function createCharacterSheet(req, res) {
    try {
        const template = await characterSheetTemplate.findById(req.params.templateId);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        const values = template.fields.map(templateField => {
            const value = req.body[templateField.label]; 
            return {
                field: new ObjectId (templateField._id), 
                value: value
        };
        });

        const formData = {
            characterName: req.body.characterName,
            user: req.user._id,
            template: template._id,
            values: values
        };

        const createdCharacterSheet = await CharacterSheet.create(formData);
        res.json(createdCharacterSheet);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'error while creating character sheet' });
    }
}

async function showTemplatesForSession(req, res) {
    try {
        const sessionId = req.params.sessionId;
        const templates = await characterSheetTemplate.find({ session: sessionId });
        const templatesWithData = templates.map(template => ({
            ...template.toObject(),
            formData: { characterName: '' } 
        }));
        res.json(templatesWithData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Error while fetching templates' });
    }
}

async function showCharacterSheetsforUser(req, res) {
    try {
        const userId = req.user._id;

        const characterSheets = await CharacterSheet.find({ user: userId })
            .populate('template')
            .exec();

        const characterSheetsWithData = characterSheets.map((characterSheet) => {
            const formData = {
                characterName: characterSheet.characterName,
            };
            return {
                ...characterSheet.toObject(),
                formData: formData,
            };
        });

        res.json(characterSheetsWithData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'error while fetching Character Sheets' });
    }
}

async function getField(req, res) {
    try {
        const templateFieldId = req.params.templateFieldId;

        // Find the template that contains my fields
        const template = await characterSheetTemplate.findOne({ "fields._id": templateFieldId });

        if (!template) {
            return res.status(404).json({ message: 'Field not found' });
        }

        // Find tfield within  templates fields array
        const field = template.fields.find(field => field._id.toString() === templateFieldId);

        if (!field) {
            return res.status(404).json({ message: 'Field not found' });
        }

        res.json(field);
    } catch(err) {
        console.log(err);
        res.status(500).json({ err: 'Error while fetching field' });
    }
}

async function deleteTemplate(req, res) {
    try {
        const templateId = req.params.templateId;
        const deletedTemplate = await characterSheetTemplate.findByIdAndDelete(templateId);

        if (!deletedTemplate) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.json({ message: 'Template deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Error while deleting template' });
    }
}

async function deleteCharacterSheet(req, res) {
    try {
        const characterSheetId = req.params.characterSheetId;
        const deletedCharacterSheet = await CharacterSheet.findByIdAndDelete(characterSheetId);

        if (!deletedCharacterSheet) {
            return res.status(404).json({ message: 'Character sheet not found' });
        }

        res.json({ message: 'Character sheet deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Error while deleting character sheet' });
    }
}

async function updateCharacterSheet(req, res) {
    try {
        const characterSheetId = req.params.characterSheetId;
        const updatedValues = req.body.values; // Array of updated field values

        // Find the character sheet by ID
        const characterSheet = await CharacterSheet.findById(characterSheetId);

        if (!characterSheet) {
            return res.status(404).json({ message: 'Character sheet not found' });
        }

        console.log('Received updated values:', updatedValues); // Add this line

        // Iterate through the updated values and update the corresponding fields in the character sheet
        for (const updatedField of updatedValues) {
            const { field, value } = updatedField;
        
            // Find the field in the character sheet's values array using the `equals` method
            const existingField = characterSheet.values.find(f => f.field.equals(field));
        
            if (existingField) {
                // Update the field's value
                existingField.value = value;
            } else {
                // Handle the case where the field is not found (optional)
                console.log(`Field ${field} not found in character sheet`);
            }
        }

        // Save the updated character sheet
        const updatedCharacterSheet = await characterSheet.save();

        res.json(updatedCharacterSheet);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Error while editing character sheet', details: err.message });
    }
}