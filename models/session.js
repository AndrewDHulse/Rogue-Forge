const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    DM: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true,   
    },
    characterSheets:{
        type: mongoose.Schema.Types.ObjectId, ref: 'CharacterSheet',
        required: true,
    }
},{
        timestamps: true,
});

module.exports = mongoose.model('Session', sessionSchema);
