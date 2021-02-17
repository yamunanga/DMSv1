//this is for add sub Category
const mongoose = require('mongoose');
var subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required:'Name is required !',
        //unique: true
        
    },
    catId:{
        type:String,
        required:true
    },
    subId:{
        type:String,
        default:null
    },
    parent:{
        type:Boolean,
        default:false
    },
    path:{
        type:String,
        required:true
    }
},{timestamps:true});

mongoose.model('subCategory',subCategorySchema);