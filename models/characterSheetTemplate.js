const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
    },
});

const fieldSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['text', 'number', 'checkbox', 'dropdown'], // Might Change
    },
    options: [optionSchema]
});

const characterSheetTemplateSchema = new mongoose.Schema({
    templateName:{
        type: String,
        required: true,
    },
    session: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true,
    },
    fields: [fieldSchema],
});

module.exports = mongoose.model('CharacterSheetTemplate', characterSheetTemplateSchema);