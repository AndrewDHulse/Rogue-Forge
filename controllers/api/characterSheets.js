const Session = require('../../models/session')
const CharacterSheet = require('../../models/characterSheet')
const characterSheetTemplate = require('../../models/characterSheetTemplate')

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
            fields: req.body.fields.map(field => {
                if (field.type === 'dropdown') {
                    return {
                        label: field.label,
                        type: field.type,
                        options: field.dropdownOptionsArray.map(option => ({
                            label: option.label,
                            value: option.value,
                        })),
                    };
                } else {
                    return {
                        label: field.label,
                        type: field.type,
                    };
                }
            }),
            templateName: req.body.templateName,
        };
        const createdTemplate = await characterSheetTemplate.create(templateData);
        res.json(createdTemplate);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
}
async function showTemplate(templateId) {
    try {
        const template = await sendRequest(`${BASE_URL}/showTemplate/${templateId}`, 'GET');
        const templateWithOptions = {
            ...template,
            fields: template.fields.map(field => {
                if (field.type === 'dropdown') {
                    field.dropdownOptionsArray = field.dropdownOptions.split(',').map(option => ({
                        value: option.trim(),
                        label: option.trim()
                    }));
                }
                return field;
            })
        };
        return templateWithOptions;
    } catch (error) {
        console.log(error);
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
            let value;
            if (templateField.type === 'dropdown') {
                const selectedOptionLabel = req.body[templateField.label];
                const selectedOption = templateField.options.find(option => option.label === selectedOptionLabel);
                value = selectedOption ? selectedOption.value : null;
            } else {
                value = req.body[templateField.label];
            }

            return {
                field: templateField._id,
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
        const template = await characterSheetTemplate.findOne({ "fields._id": templateFieldId });
        if (!template) {
            return res.status(404).json({ message: 'Field not found' });
        }
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
        const updatedValues = req.body.values;
        const characterSheet = await CharacterSheet.findById(characterSheetId);

        if (!characterSheet) {
            return res.status(404).json({ message: 'Character sheet not found' });
        }
        for (const updatedField of updatedValues) {
            const { field, value } = updatedField;
            const existingField = characterSheet.values.find(f => f.field.equals(field));
            if (existingField) {
                existingField.value = field.type === 'dropdown' ? value.value : value;
            } else {
                console.log(`Field ${field} not found in character sheet`);
            }
        }
        const updatedCharacterSheet = await characterSheet.save();
        res.json(updatedCharacterSheet);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Error while editing character sheet', details: err.message });
    }
}