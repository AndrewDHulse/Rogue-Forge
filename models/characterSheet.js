const mongoose = require()

const fieldSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['text', 'number', 'checkbox', 'dropdown'], // Possible field types
    },
    value: {
        type: mongoose.Schema.Types.Mixed, //??????????? maybe?
    },
});

const characterSheetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fields: [fieldSchema], // Array of field objects
});

