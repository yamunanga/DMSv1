//this is for add department
const mongoose = require('mongoose');
var departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
        
    },

},{timestamps:true});

mongoose.model('Department',departmentSchema);