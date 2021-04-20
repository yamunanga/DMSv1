const mongoose = require('mongoose');
var arcDocumentSchema = new mongoose.Schema({
    docId:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required:false,
        //unique: true
        //required: 'name can\'t be empty'
    },
    arcBy: {
        type: String,
        default:null
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
    tags:{type:String,default:''},
    expDate:{type:String,default:null},
    arcPath:{type:String,default:null},
    createDate:{type:String,default:null},
},{timestamps:true});

mongoose.model('arcDocument',arcDocumentSchema);