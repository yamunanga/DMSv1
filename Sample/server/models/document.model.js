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
        default:null
    },
    arcStatus:{
        type:String,
        default:null
     },
     workFlowList:{
        type:Array,
        default:null
     },
     workFlowUsers:{
        type:Array,
        default:null
     },
    workflowEndDate:{type:String,default:null},
    subCategory:{type:Array,default:null},
    isLock:{type:Boolean,default:null},
    catPath:{type:String,default:null},
    size:{type:String,default:''},
    category:{type:String,default:''},
    approvedBy:{type:String,default:null},
    addedAt:{type:String,default:null},
    department:{type:String,default:''},
    createdBy:{type:String,default:''},
    tags:{type:String,default:''},
    expDate:{type:String,default:null},
    createDate:{type:String,default:null},
    pass:{type:Array,default:null},
    ePath:{type:Array,default:null},
    eFile:{type:Array,default:null},
    isWorkFlowed:{type:Boolean,default:null},
    workflowId:{type:String,default:null},
},{timestamps:true});

mongoose.model('Document', documentSchema);