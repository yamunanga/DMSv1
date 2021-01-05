const mongoose = require('mongoose');
const _ = require('lodash');

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
//to sent message 
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

//to view sent messages 
module.exports.viewSentMessage=(req,res,next)=>{
    Message.find({fromId:req._id},
        (err,msg)=>{
            if (!msg){
                return res.status(404).json({ status: false, message: 'Can not find !' });
            }else{
                return res.send(msg);
            }
        })

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
        })

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