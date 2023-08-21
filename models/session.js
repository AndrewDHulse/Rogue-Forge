const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
        DM: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User',
                required: true,
                unique: true,
        },
        players:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
        }],
        name:{
                type: String,
                required: true,   
        },
        characterSheets:[{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'CharacterSheet',
        }],
        characterSheetTemplate: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CharacterSheetTemplate'
        }]
},{
        timestamps: true,
});

module.exports = mongoose.model('Session', sessionSchema);
