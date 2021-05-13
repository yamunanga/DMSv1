const mongoose = require('mongoose');
var approvmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
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
    catPath:{type:String,default:null},
    category:{type:String,required:true},
    subCategory:{type:Array,default:null},
    department:{type:String,default:''},
    createdBy:{type:String,default:''},
    tags:{type:String,default:''},
    approvedBy:{type:String,default:null},
    expDate:{type:String,default:null},
    pass:{type:Array,default:null},
    isLock:{type:Boolean,default:null},
    ePath:{type:Array,default:null},
    eFile:{type:Array,default:null},
    createDate:{type:String,default:null},
},{timestamps:true});

mongoose.model('approvment',approvmentSchema);