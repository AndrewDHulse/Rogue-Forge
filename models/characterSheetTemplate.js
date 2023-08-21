const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['text', 'number', 'checkbox', 'dropdown'], // Might Change
    }
});

const characterSheetTemplateSchema = new mongoose.Schema({
    session: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true,
    },
    fields: [fieldSchema],
});

module.exports = mongoose.model('CharacterSheetTemplate', characterSheetTemplateSchema);