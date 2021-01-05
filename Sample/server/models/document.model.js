const mongoose = require('mongoose');
var documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:false
        //required: 'name can\'t be empty'
    },
    type:{type:String,default:''},
    file: { type: String, required:true },
    size:{type:String,default:''},
    category:{type:String,default:''},
    department:{type:String,default:''},
    createdBy:{type:String,default:''},
    tags:{type:String,default:''}
},{timestamps:true});

mongoose.model('Document', documentSchema);