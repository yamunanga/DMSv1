const mongoose = require('mongoose');
var workflowSchema = new mongoose.Schema({
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
        default:null
    },
    size:{type:String,default:''},
    needApproveBy:{
        type:Array,
        default:[]
    },
    workflow:{
        type:Array,
        default:null
    },
    workflowData:{
        type:String,
        default:null
    },
    workflowNext:{
       type:String,
       default:null
    },
    workFlowList:{
       type:Array,
       default:null
    },
    catPath:{type:String,default:null},
    isLock:{type:Boolean,default:null},
    category:{type:String,required:true},
    subCategory:{type:Array,default:null},
    department:{type:String,default:''},
    createdBy:{type:String,default:''},
    tags:{type:String,default:''},
    pass:{type:Array,default:null},
    expDate:{type:String,default:null},
    ePath:{type:Array,default:null},
    eFile:{type:Array,default:null}
},{timestamps:true});

mongoose.model('workFlow',workflowSchema);