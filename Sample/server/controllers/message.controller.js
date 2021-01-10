const mongoose = require('mongoose');
const _ = require('lodash');
//Multer configuration
const multer = require('multer');
var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'attachments/')
    },
    
    filename: function (req, file, cb) {
      
        cb(null, Date.now()+'-' +file.originalname) //this can store file as original
       }
  
  })
var uploadA = multer({ storage: storage2}).single('file');
var uploadAMulti = multer({ storage: storage2}).array('files');
  

const User = mongoose.model('User');
const Message=mongoose.model('Message');

/*
module.exports.postMessage=(req,res,next)=>{
    var msg = new Message;
    msg.from=req.body.fromEmail;
    msg.to=req.body.toEmail;
    msg.body=req.body.msgBody;
    msg.save((err,doc)=>{
        if(err){
            return res.status(422).send(['Sent failed !']);
        }else{
            return res.status(200).send(['Message sent !']);
        }
    })
              

}*/
//to sent message --not used---
module.exports.postMessage=(req,res,next)=>{
    User.findOne({email:req.body.toEmail},
        (err,user)=>{
            if (!user)
            return res.status(404).json({ status: false, message: 'User record not found.' });
        else{
            var msg = new Message;
            msg.fromId=req._id;
            msg.toId=user._id;
            msg.from=req.body.fromEmail;
            msg.to=req.body.toEmail;
            msg.body=req.body.msgBody;
            msg.save((err,doc)=>{
                if(err){
                    return res.status(422).send(['Sent failed !']);
                }else{
                    return res.status(200).send(['Message sent !']);
                }
            })
         }
    })
}


//test

module.exports.postMessageWithFile=(req,res,next)=>{
    var datetime = new Date();
    uploadA(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(422).send(['multer error!']);
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(422).send(['Sent failed !']);
        }
        // Everything went fine.
        //console.log(now.Date());
        return res.status(200).send(datetime);
      })

}


//post multiple attachments with message --used--

module.exports.postMessageWithFiles=(req,res,next)=>{
    uploadAMulti(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(422).send(['multer error!']);
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(422).send(['unknown !']);
        }
        // Everything went fine.
        var len=req.files.length;
        var arr = new Array();
        for(var i=0;i<len;i++){
            arr.push(req.files[i].path)
        }
        //console.log(arr);
        User.findOne({email:req.body.toEmail},
            (err,user)=>{
                if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else{
                var msg = new Message;
                msg.fromId=req._id;
                msg.toId=user._id;
                msg.from=req.body.fromEmail;
                msg.to=req.body.toEmail;
                msg.body=req.body.msgBody;
                msg.file=arr;
                msg.save((err,doc)=>{
                    if(err){
                        return res.status(422).send(['Sent failed !']);
                    }else{
                        return res.status(200).send(['Message sent !']);
                    }
                })
             }
        })
     })
}


















//copy of post multiple attachments
/*
module.exports.postMessageWithFiles=(req,res,next)=>{
    uploadAMulti(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(422).send(['multer error!']);
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(422).send(['Sent failed !']);
        }
        // Everything went fine.
         res.status(200).send(['sucess!']);
      })
}*/











//to view sent messages 
module.exports.viewSentMessage=(req,res,next)=>{
    Message.find({fromId:req._id},
        (err,msg)=>{
            if (!msg){
                return res.status(404).json({ status: false, message: 'Can not find !' });
            }else{
                return res.send(msg);
            }
        }).sort({createdAt: 'desc'})

}

//to view recived
module.exports.viewRecievedMessage=(req,res,next)=>{
    Message.find({toId:req._id},
        (err,msg)=>{
            if (!msg){
                return res.status(404).json({ status: false, message: 'Can not find !' });
            }else{
                return res.send(msg);
            }
        }).sort({createdAt: 'desc'})

}

//to delete sent message
module.exports.deleteSentMessage=(req,res,next)=>{
      Message.findOne({_id:req.body._id}, //post message id from frontend
           (err,msg)=>{
            if (!msg){
                return res.status(404).json({ status: false, message: 'Can not find !' });
            }else{
                msg.updateOne({fromId:null},function(err,doc){
                    if(err){
                      return res.status(422).send(['Cannot update message data !']);
                    }else{
                      return res.status(200).send(['Message Deleted !']);
                    }
        
                 })
            }
        })
}

//to delete recived message 

module.exports.deleteReciveMessage=(req,res,next)=>{
    Message.findOne({_id:req.body._id}, //post message id from frontend
         (err,msg)=>{
          if (!msg){
              return res.status(404).json({ status: false, message: 'Can not find !' });
          }else{
              msg.updateOne({toId:null},function(err,doc){
                  if(err){
                    return res.status(422).send(['Cannot Delete !']);
                  }else{
                    return res.status(200).send(['Message Deleted !']);
                  }
      
               })
          }
      })
}

//to update msg status 
module.exports.readReciveMessage=(req,res,next)=>{
    Message.findOne({_id:req.body._id}, //post message id from frontend
        (err,msg)=>{
            if (!msg){
                return res.status(404).json({ status: false, message: 'Can not find !' });
            }else{
                msg.updateOne({isRead:'READ'},function(err,doc){
                    if(err){
                      return res.status(422).send(['Cannot update !']);
                    }else{
                      return res.status(200).send(['Message read !']);
                    }
        
                 })
            }
        })
}