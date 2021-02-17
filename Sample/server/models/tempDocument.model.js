const mongoose = require('mongoose');
var tempDocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:false,
        //unique: true
        //required: 'name can\'t be empty'
    },
    type:{type:String,default:''},
    file:{
        type:String,
       // default:[],
        required:true
    },
    size:{type:String,default:''},
    needApproveBy:{
        type:Array,
        default:[]
    },
    catPath:{type:String,required:true},
    category:{type:String,required:true},
    subCategory:{type:Array,default:null},
    department:{type:String,default:''},
    createdBy:{type:String,default:''},
    tags:{type:String,default:''}
},{timestamps:true});

mongoose.model('tempDocument',tempDocumentSchema);