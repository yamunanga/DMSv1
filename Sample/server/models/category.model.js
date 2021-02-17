//this is for add Category
const mongoose = require('mongoose');
const { setApprovement } = require('../controllers/tempDocument.controller');
var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required:'Name is required !',
       // unique: true
        
    },
    depId:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    }
},{timestamps:true});

mongoose.model('Category',categorySchema);