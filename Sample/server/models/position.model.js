//this is for add department
const mongoose = require('mongoose');
var positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required:'Name is required !',
        unique: true
        
    },

},{timestamps:true});

mongoose.model('Position',positionSchema);