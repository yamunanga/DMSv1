//to swap user to archibed user
const mongoose = require('mongoose');
const  archivedUserSchema =new mongoose.Schema({
    userId:{
       type:String,
       default:''
    },
    fullName: {
        type: String,
        default:''
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        default:''
    },
    //For the role
    role:{  
        type: String,
        default:''
    },
    resetLink:{
        type:String,
        default:''
    },
    lastActive:{
        type:String,
        default:''
    },
    status:{
        type:String,
        default:''
    },
    uCreatedAt:{
        type:Date,
        default:''
    },
    uUpdatedAt:{
        type:Date,
        default:''
    },
    arcBy:{
        type:String,
        default:null
    },
    department:{
        type:String,
        required: 'Department can\'t be empty'
    },
    position:{
        type:String,
        required: 'Position can\'t be empty'
    },
    createDate:{type:String,default:null},
    saltSecret: String
},{timestamps:true});

mongoose.model('archivedUser',archivedUserSchema);