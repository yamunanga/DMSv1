const mongoose = require('mongoose');
var documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:false
        //required: 'name can\'t be empty'
    },
    type:{type:String,default:''},
    file:{
        type:String,
       // default:[],
        required:true
    },
    subCategory:{type:Array,default:null},
    catPath:{type:String,required:true},
    size:{type:String,default:''},
    category:{type:String,default:''},
    approvedBy:{type:String,default:null},
    department:{type:String,default:''},
    createdBy:{type:String,default:''},
    tags:{type:String,default:''}
},{timestamps:true});

mongoose.model('Document', documentSchema);