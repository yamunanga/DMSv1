const mongoose = require('mongoose');
var messageSchema = new mongoose.Schema({
    from: {
        type: String,
        required:true
        
    },
    fromId:{
        type: String,
        required:true
    },
    toId:{
        type: String,
        required:true
    },
    to:{
        type:String,
        required:true 
    },
    body: { type: String, 
        required:true
     },
    isRead:{
        type:String,
        default:'NEW'
    },
    file:{
        type:Array,
        default:[]
    }

},{timestamps:true});

mongoose.model('Message', messageSchema);