const mongoose = require('mongoose');

const characterSheetSchema = new mongoose.Schema({
    characterName:{
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CharacterSheetTemplate',
        required: true,
    },
    values: [{ 
        field: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CharacterSheetTemplate.fields' // Reference to the fields within the template
        },
        value: {
            type: mongoose.Schema.Types.Mixed
        }
    }],
});

module.exports = mongoose.model('CharacterSheet', characterSheetSchema);
