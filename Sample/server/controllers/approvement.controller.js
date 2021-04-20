const mongoose = require('mongoose');
var config = require('../config/config.json');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const e = require('express');
const fs = require('fs-extra')
const router = e.Router();
const URIpath = require('uri-path');
const url = require('url');
const date = require('date-and-time')
const { encrypt, decrypt } = require('../config/crypto');
//mongoose model
const User = mongoose.model('User');
const Document = mongoose.model('Document');
const tempDocument = mongoose.model('tempDocument');
const approvement=mongoose.model('approvment');
const Message=mongoose.model('Message');

//for pass need approvement data to front end--work--

module.exports.getApprovementDataList=(req,res,next)=>{
    User.findOne({_id:req._id}, 
        (err,user)=>{
            if (!user){
                 return res.status(404).send( 'Can not find !' );
            }else{
                var mail=user.email;
                //console.log(mail);
                approvement.find({needApproveBy:user.email},
                    (err,files)=>{
                        if (!files){
                            return res.status(404).json({ status: false, message: 'Can not find !' });
                        }else{
                            return res.send(files);
                        }
                    })
            }
        })
  }
//to send cound of need approvment data
module.exports.getApprovmentDataCount=(req,res,next)=>{
    User.findOne({_id:req._id}, 
        (err,user)=>{
            if (!user){
                 return res.status(404).send( 'Can not find !' );
            }else{
                approvement.countDocuments({needApproveBy:user.email},
                    (err,cd)=>{
                        if (err)
                         return res.status(404).send(['Docs not find !']);
                    else{
                       // return res.send(cats);
                        return res.status(200).send([cd]);
                     }
                })
            }
        })
}


  //approved doc moved to documents
  module.exports.saveApprovementData=(req,res,next)=>{
    User.findOne({_id:req._id}, 
        (err,user)=>{
            if (!user){
                 return res.status(404).send( 'Can not find !' );
            }else{
                approvement.findOne({_id:req.params.id}, 
                    (err,file)=>{
                        if (!file){
                             return res.status(404).send( 'Can not find !' );
                        }else{
                          const now = new Date();
                          var current= date.format(now, 'YYYY-M-D');
                          var document = new Document();
                          document.name =file.name;
                          document.file=file.file;
                          document.type=file.type;
                          document.size=file.size;
                          document.category=file.category;
                          document.catPath=file.catPath;
                          document.department=file.department;
                          document.createdBy=file.createdBy;
                          document.tags=file.tags;
                          document.approvedBy=user.email;
                          document.addedAt=file.createDate;
                          document.createDate=current.toString();
                          document.save(function(err,result){ 
                            if (err){ 
                                return res.status(422).send(['Eror from backend !']);
                            } 
                            else{ 
                                User.findOne({_id:file.createdBy}, 
                                    (err,muser)=>{
                                        if (!muser){
                                             return res.status(404).send( 'Can not find !' );
                                        }   
                                            const now = new Date();
                                            var current= date.format(now, 'YYYY-M-D');
                                            var msg = new Message;
                                            msg.fromId=req._id;
                                            msg.toId=file.createdBy;
                                            msg.from=user.email;
                                            msg.to=muser.email;
                                            msg.body=file.name+' File Approved At'+' '+current.toString();
                                            msg.save((err,doc)=>{
                                                if(err){
                                                    return res.status(422).send(['Sent failed !']);
                                                }else{
                                                    //return res.status(200).send(['Message sent !']);
                                                    approvement.findOneAndRemove({_id:req.params.id},(err,dfile)=>{
                                                        if (!dfile)
                                                            return res.status(404).send(['Doc can not find !']);
                                                        else{
                                                            return res.status(200).send(['File Approved !']);
                                                           
                                                        }
                                                       }) 
                                                }
                                            })
                                       
                                    })
                            } 
                        }) 
                        }
                    })
            }
        })
}

//reject doc from approvment
module.exports.rejectApprovementData=(req,res,next)=>{
    User.findOne({_id:req._id}, 
        (err,user)=>{
            if (!user){
                 return res.status(404).send( 'Can not find !' );
            }else{
                approvement.findOne({_id:req.params.id}, 
                    (err,file)=>{
                        if (!file){
                             return res.status(404).send( 'Can not find !' );
                        }else{
                            var myJSON = JSON.stringify(file.file);
                            var str=myJSON.split('\\');
                            console.log(str);
                            var nStr=str[str.length-1].split('"');
                            console.log(nStr[0]);
                            var multerDate=nStr[0].split('-');
                            var myPath=file.catPath+'/'+multerDate[0]+'-'+file.name;
                            console.log(myPath);
                            console.log(req.body.msg);
                            fs.unlink(myPath, (err) => {
                                if (err) {
                                  return res.status(404).send(['File can not delete !']);
                                }else{
                                  //file removed
                                  User.findOne({_id:file.createdBy}, 
                                    (err,muser)=>{
                                        if (!muser){
                                             return res.status(404).send( 'Can not find !' );
                                        }
                                            var msg = new Message;
                                            msg.fromId=req._id;
                                            msg.toId=file.createdBy;
                                            msg.from=user.email;
                                            msg.to=muser.email;
                                            msg.body=file.name+'File Rejected Because'+' '+req.body.msg;
                                            msg.save((err,doc)=>{
                                                if(err){
                                                    return res.status(422).send(['Sent failed !']);
                                                }else{
                                                    //return res.status(200).send(['Message sent !']);
                                                    approvement.findOneAndRemove({_id:req.params.id},(err,dfile)=>{
                                                        if (!dfile)
                                                            return res.status(404).send(['Doc can not find !']);
                                                        else{
                                                            return res.status(200).send(['File Rejected !']);
                                                           
                                                        }
                                                       }) 
                                                }
                                            })
                                       
                                    })
                                }
                           })
                        }
                    })
            }
        })
}


//to lock document in approvement
module.exports.lockDoc = (req, res, next) =>{
    approvement.findOne({_id:req.params.id,isLock: {$ne:true}},
      function (err,file) {
          if (!file)
              return res.status(404).send(['not found']);
          else{
            const hashF = encrypt(file.file);
            const hashP = encrypt(file.catPath);
            const hashPa= encrypt(req.body.pass);
           approvement.findOneAndUpdate({_id:req.params.id},{isLock:true,eFile:hashF,ePath:hashP,file:null,catPath:null,pass:hashPa},
              function (err,rfile) {
                  if (!rfile)
                      return res.status(404).send(['not found']);
                  else{
                     return res.status(200).send(['File Locked!']);
                    
                   }
              }
          );
        }
      }
  );
  }

//to unlock document in approvment
module.exports.unlockDoc = (req, res, next) =>{
    approvement.findOne({_id:req.params.id,isLock: {$ne:null}},
      function (err,file) {
          if (!file)
              return res.status(404).send(['not found']);
          else{
              const dPath = decrypt(file.ePath[0]);
              const dFile = decrypt(file.eFile[0]);
              const dPass = decrypt(file.pass[0]);
              if(dPass==req.body.pass){
                approvement.findOneAndUpdate({_id:req.params.id},{isLock:null,eFile:null,ePath:null,file:dFile,catPath:dPath,pass:null},
                  function (err,rfile) {
                      if (!rfile)
                          return res.status(404).send(['not found']);
                      else{
                         return res.status(200).send(['File unLocked!']);
                        
                       }
                  }
              );
    
              }else{
                return res.status(422).send(['Wrong Password']);
              }
           }
      }
  );
  }