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
    saltSecret: String
},{timestamps:true});

mongoose.model('archivedUser',archivedUserSchema);