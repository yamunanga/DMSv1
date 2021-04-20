const mongoose = require('mongoose');
var config = require('../config/config.json');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const e = require('express');
const fs = require('fs-extra')
const router = e.Router();
const URIpath = require('uri-path');
const url = require('url');
const date = require('date-and-time');
const { encrypt, decrypt } = require('../config/crypto');

//mongoose model
const User = mongoose.model('User');
const Document = mongoose.model('Document');
const tempDocument = mongoose.model('tempDocument');
const approvement=mongoose.model('approvment');
const Message=mongoose.model('Message');
const workflow=mongoose.model('workFlow');
const workFlowDone=mongoose.model('workFlowDone');
//Multer configuration
const multer = require('multer');
var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
       let path=conPath(req.params.path);
       fs.mkdirsSync(path);
       cb(null,path);
    },
   
    filename: function (req, file, cb) {
      
        cb(null, Date.now()+'-' +file.originalname) //this can store file as original
       }
  

})
var upload =multer({ storage: storage1}).single('file');
//Doc upload config over

//to convert text to file upload location
function conPath(path){
    var str=path.split('-');
    newPath=''
    for(var i=0;i<str.length;i++){
      if(i==str.length-1){
        newPath=newPath+str[i]
      }else{
        newPath=newPath+str[i]+'/'
      }
    }
   return newPath
  }

//to convert db path
function dbPath(arr){
    dPath=''
    for(var i=0;i<arr.length;i++){
      dPath=dPath+arr[i]+'\\'               
    }
    return dPath
  }

//update workflow file 
module.exports.postWorkflowFile=(req,res,next)=>{
    var datetime = new Date();
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(422).send(['multer error!']);
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(422).send(['Sent failed !']);
        }
        // Everything went fine.
        //return res.status(200).send(datetime);
        workflow.findOne({_id:req.body.id},
            (err,file)=>{
                if (err)
                 return res.status(404).send(['Doc not find !']);
            else{
                //return res.status(200).send([cd]);
                var myJSON = JSON.stringify(file.file);
                var str=myJSON.split('\\');
                //console.log(str);
                var nStr=str[str.length-1].split('"');
                //console.log(nStr[0]);
                var multerDate=nStr[0].split('-');
                var myPath=file.catPath+'/'+multerDate[0]+'-'+file.name;
                //console.log(myPath);
                fs.unlink(myPath, (err) => {
                  if (err) {
                    return res.status(404).send(['File can not delete Or Unlock Before Delete !']);
                  }
                  let extArray = req.file.originalname.split(".")
                  let extension = extArray[extArray.length - 1];
                  workflow.findOneAndUpdate({_id:req.body.id},{name:req.file.originalname,file:req.file.path,size:req.file.size,type:extension},(err,file)=>{
                  if (!file)
                       return res.status(404).send(['Doc can not find !']);
                  else{
                      
                      return res.status(200).send(['Doc Updated !']);
                  }
                 }) 
               
                  
                })
             }
        })

      })

}

//to rename workflow file 
module.exports.renameWorkflowFile=(req,res,next)=>{
    const{_id,name}=req.body;
    workflow.findOne( {name:name},
      function(err,files) {
        if (!files){
          //secound logic start 
          workflow.findOne({ _id: _id },(err,file)=>{
            if(err || !file){
                return res.status(404).send(['Doc With this req Id Does Not Exist !']);
           }else{
                var conFileName=file.name.split('.'); 
                if(conFileName[0]==name){
                  return res.status(422).send(['File name already use !']);
                }else{
                  var myJSON = JSON.stringify(file.file);
                  //console.log(myJSON);
                  var str=myJSON.split('\\');
                  //console.log(str);
                  var nStr=str[str.length-1].split('"');
                  var multerDate=nStr[0].split('-');
                  //cat path config
                  var str=file.catPath.split('/');
                    var mC=str[3];
                    var dep=str[2];
                    var arr = new Array
                    for(var x=2;x<str.length;x++){
                      if(str[x] !=''){
                        arr.push(str[x]);
                      }
                    }
                  //Over
                  //console.log(nStr);
                    //new filename+type
                    var newName=name+'.'+file.type;
                    var oldpath=file.catPath+multerDate[0]+'-'+file.name;
                    var newpath=file.catPath+multerDate[0]+'-'+name+'.'+file.type;
                    //var toDbPath=config.development.TO_DB_TO_UP_LOCATION+file.department+'\\'+file.category+'\\'+multerDate[0]+'-'+name+'.'+file.type;
                    
                    var toDbPath=config.development.TO_DB_TO_UP_LOCATION+dbPath(arr)+multerDate[0]+'-'+name+'.'+file.type;
                   // console.log(newpath.toString());
                   // console.log(oldpath);
                   // console.log(toDbPath);
                    
                    fs.rename(oldpath.toString(),newpath.toString(), function (err) {
                      if (err){
                        return res.status(422).send(['Cannot rename !']);
                      }
                      //console.log('File Renamed.');
                      workflow.findOneAndUpdate({_id:_id},{name:newName,file:toDbPath},function(err,doc){
                        if(err){
                          return res.status(422).send(['Eror from DB!']);
                        }else{
                          return res.status(200).send(['File name has been changed !']);
                        }
              
                     })
                    });
                }
           
      
           }
        })
      }
      else{
  
          return res.status(422).send(['Duplicate name found !']);
        }
            
            
    }
  );
  }

//workflow process
module.exports.getWorkflowProcessN=(req,res,next)=>{
    User.findOne({_id:req._id}, 
        (err,user)=>{
            if (!user){
                 return res.status(404).send( 'Can not find !' );
            }else{
                workflow.findOne({_id:req.params.id}, 
                    (err,file1)=>{
                        if (!file1){
                             return res.status(404).send( 'Can not find !' );
                        }else{
                            file1.updateOne({$pull:{workflow:user.email},workflowData:file1.workflow[1],workflowNext:file1.workflow[2]},function(err,doc){
                                if(err){
                                  return res.status(422).send(['Cannot update !']);
                                }else{
                                  //return res.status(200).send(['Update Successfull !']);
                                  //console.log(file1.workflow.length);
                                  if(file1.workflow.length==1){
                                    const now = new Date();
                                    var current= date.format(now, 'YYYY-M-D');
                                    var document = new Document();
                                    document.name =file1.name;
                                    document.file =file1.file;
                                    document.type =file1.type;
                                    document.size =file1.size;
                                    document.category=file1.category;
                                    document.catPath=file1.catPath;
                                    document.subCategory=file1.subCategory;
                                    document.department=file1.department;
                                    document.createdBy=file1.createdBy;
                                    document.tags=file1.tags;
                                    document.expDate=file1.expDate;
                                    document.isWorkFlowed=true;
                                    document.workFlowList=file1.workFlowList;
                                    document.workFlowUsers=file1.workFlowList;
                                    document.workflowEndDate=current.toString();
                                    if(file1.isLock==true){
                                      document.isLock=file1.isLock;
                                      document.ePath=file1.ePath;
                                      document.eFile=file1.eFile;
                                      document.pass=file1.pass;
                                    }
                                    document.save(function(err,result){ 
                                      if (err){ 
                                         return res.status(422).send(['Eror from backend !']);
                                      } 
                                      else{ 
                                          //console.log(result) 
                                          workflow.findOneAndRemove({_id:req.params.id},(err,file)=>{
                                            if (!file){
                                              return res.status(404).send(['File Not found !']); 
                                            }
                                             
                                            else{
                                              return res.status(200).send(['Workflow Over!']); 
                                            }
                                          }) 
                                         
                                      } 
                                  }) 

                                  }else{
                                    return res.status(200).send(['Update Successfull !']); 

                                  }
                                }
                    
                             })
                        }
                    })
            }
        })
}

//workflow process new and use !
module.exports.getWorkflowProcess=(req,res,next)=>{
  User.findOne({_id:req._id}, 
      (err,user)=>{
          if (!user){
               return res.status(404).send( 'Can not find !' );
          }else{
              workflow.findOne({_id:req.params.id}, 
                  (err,file1)=>{
                      if (!file1){
                           return res.status(404).send( 'Can not find !' );
                      }else{
                          file1.updateOne({$pull:{workflow:user.email},workflowData:file1.workflow[1],workflowNext:file1.workflow[2]},function(err,doc){
                              if(err){
                                return res.status(422).send(['Cannot update !']);
                              }else{
                                //return res.status(200).send(['Update Successfull !']);
                                //console.log(file1.workflow.length);
                                if(file1.workflow.length==1){
                                  const now = new Date();
                                  var current= date.format(now, 'YYYY-M-D');
                                  var document = new Document();
                                  document.name =file1.name;
                                  document.file =file1.file;
                                  document.type =file1.type;
                                  document.size =file1.size;
                                  document.category=file1.category;
                                  document.catPath=file1.catPath;
                                  document.subCategory=file1.subCategory;
                                  document.department=file1.department;
                                  document.createdBy=file1.createdBy;
                                  document.tags=file1.tags;
                                  document.expDate=file1.expDate;
                                  document.isWorkFlowed=true;
                                  document.workFlowList=file1.workFlowList;
                                  document.workFlowUsers=file1.workFlowList;
                                  document.workflowEndDate=current.toString();
                                  document.createDate=current.toString();
                                  document.workflowId=file1._id;
                                  if(file1.isLock==true){
                                    document.isLock=file1.isLock;
                                    document.ePath=file1.ePath;
                                    document.eFile=file1.eFile;
                                    document.pass=file1.pass;
                                  }
                                  document.save(function(err,result){ 
                                    if (err){ 
                                       return res.status(422).send(['Eror from backend !']);
                                    } 
                                    else{ 
                                        //console.log(result) 
                                        workflow.findOneAndRemove({_id:req.params.id},(err,file)=>{
                                          if (!file){
                                            return res.status(404).send(['File Not found !']); 
                                          }
                                           
                                          else{
                                            //return res.status(200).send(['Workflow Over!']); 
                                            User.findOne({_id:file1.createdBy},(err,userCreate)=>{
                                              if (!userCreate){
                                                return res.status(404).send(['File Not found !']); 
                                              }
                                           else{
                                                //return res.status(200).send(['Workflow Over!']); 
                                                var msg = new Message;
                                                msg.fromId=req._id;
                                                msg.toId=file1.createdBy;
                                                msg.from=user.email;
                                                msg.to=userCreate.email;
                                                msg.body='Dear'+user.email+'your workflow id '+file1._id+' over now.'+'It start at ' +file1.createdAt+'and end at '+current.toString()+'.Users are '+file1.workFlowList +'.You can view it on Documents.Thank you !';
                                                msg.save((err,doc)=>{
                                                    if(err){
                                                        return res.status(422).send(['Sent failed !']);
                                                    }else{
                                                        return res.status(200).send(['Workflow Over!']);
                                                    }
                                                })
                                              }
                                            }) 
                                          }
                                        }) 
                                       
                                    } 
                                }) 

                                }else{
                                  return res.status(200).send(['Update Successfull !']); 

                                }
                              }
                  
                           })
                      }
                  })
          }
      })
}


















//for pass workflow data to front end--work--
module.exports.getWorkflowDataList=(req,res,next)=>{
    User.findOne({_id:req._id}, 
        (err,user)=>{
            if (!user){
                 return res.status(404).send( 'Can not find !' );
            }else{
                var mail=user.email;
                //console.log(mail);
                workflow.find({workflowData:user.email},
                    (err,files)=>{
                        if (!files){
                            return res.status(404).json({ status: false, message: 'Can not find !' });
                        }else{
                            return res.send(files);
                        }
                    }).sort({createdAt: 'desc'})
            }
        })
  }

//to send count of workflow data
module.exports.getWorkflowDataCount=(req,res,next)=>{
    User.findOne({_id:req._id}, 
        (err,user)=>{
            if (!user){
                 return res.status(404).send( 'Can not find !' );
            }else{
                workflow.countDocuments({workflowData:user.email},
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



//if user check and validate workflow 
module.exports.getWorkflowValidate=(req,res,next)=>{
    User.findOne({_id:req._id}, 
        (err,user)=>{
            if (!user){
                 return res.status(404).send( 'Can not find !' );
            }else{
                workflow.findOne({_id:req.body.id},
                    (err,file)=>{
                        if (err)
                         return res.status(404).send(['Doc not find !']);
                    else{
                        //return res.status(200).send([cd]);

                     }
                })
            }
        })
}



//for pass admin users for select workflow
module.exports.getUsersWork = (req, res, next) =>{
    User.find( {arcStatus: {$ne:'yes'},_id:{$ne:req._id},role:'admin'},
        (err, users) => {
            if (!users)
                return res.status(404).json({ status: false, message: 'Error in retrieving data !' });
            else
                return res.send(users);
                //return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','role']) });//im add role
        }
    );
  }



//to add user to workflow for temp doc--old--

module.exports.paasWorkflow=(req,res,next)=>{
    tempDocument.findOne({_id:req.params.id},
      function (err,file) {
          if (!file)
              return res.status(404).send(['Not Found !']);
          else{
            file.updateOne({ $addToSet:{workflow:req.body.name}},function(err,doc){
              if(err){
                return res.status(422).send(['Cannot update !']);
              }else{
                return res.status(200).send(['Update Successfull !']);
              }
  
           })
        }
      }
  );
  }
  
  //to remove user from workflow 
  module.exports.delWorkflowUser=(req,res,next)=>{
    tempDocument.findOne({_id:req.params.id},
      function (err,file) {
          if (!file)
              return res.status(404).send(['Not Found !']);
          else{
            file.updateOne({$pull:{workflow:req.body.name}},function(err,doc){
              if(err){
                return res.status(422).send(['Cannot update !']);
              }else{
                return res.status(200).send(['Update Successfull !']);
              }
  
           })
        }
      }
  );
  }
  
  
  //for pass workflow data to front end 
  module.exports.getWorkflowData=(req,res,next)=>{
    tempDocument.findOne({_id:req.params.id}, 
        (err,file)=>{
            if (!file){
                 return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(file.workflow);
            }
        })
  }
  

//to add user to workflow for temp doc--new-
module.exports.checkWorkflow=(req,res,next)=>{
    tempDocument.findOne({_id:req.params.id},
      function (err,file) {
          if (!file)
              return res.status(404).send(['Not Found !']);
          else{
             var len=file.workflow.length;
             var count=0;
             for(var i=0;i<len;i++){
                 if(file.workflow[i]==req.body.name){
                     count=count+1
                    return res.status(422).send(['Duplicate found ! '+ req.body.name]);
                 }
            }
            file.updateOne({ $addToSet:{workflow:req.body.name}},function(err,doc){
                if(err){
                  return res.status(422).send(['Cannot update !']);
                }else{
                  return res.status(200).send(['Update Successfull !']);
                }
    
             })
        }
      }
  );
  }

//to add user to workflow in workflow table
module.exports.checkWorkflowInWork=(req,res,next)=>{
  workflow.findOne({_id:req.params.id},
    function (err,file) {
        if (!file)
            return res.status(404).send(['Not Found !']);
        else{
           var len=file.workflow.length;
           var count=0;
           for(var i=0;i<len;i++){
               if(file.workflow[i]==req.body.name){
                   count=count+1
                  return res.status(422).send(['Duplicate found ! '+ req.body.name]);
               }
          }
          file.updateOne({ $addToSet:{workflow:req.body.name}},function(err,doc){
              if(err){
                return res.status(422).send(['Cannot update !']);
              }else{
                return res.status(200).send(['Update Successfull !']);
              }
  
           })
      }
    }
);
}
 //to remove user from workflow  in workflow table
 module.exports.delWorkflowUserInWork=(req,res,next)=>{
  workflow.findOne({_id:req.params.id},
    function (err,file) {
        if (!file)
            return res.status(404).send(['Not Found !']);
        else{
          file.updateOne({$pull:{workflow:req.body.name}},function(err,doc){
            if(err){
              return res.status(422).send(['Cannot update !']);
            }else{
              return res.status(200).send(['Update Successfull !']);
            }

         })
      }
    }
);
}

 //for pass workflow data in workflow table to front end 
 module.exports.getWorkflowDataInWork=(req,res,next)=>{
  workflow.findOne({_id:req.params.id}, 
      (err,file)=>{
          if (!file){
               return res.status(404).send( 'Can not find !' );
          }else{
              return res.status(200).send(file.workflow);
          }
      })
}








 //for pass workflow data array length to frontend
 module.exports.getWorkflowDataLen=(req,res,next)=>{
    tempDocument.findOne({_id:req.params.id}, 
        (err,file)=>{
            if (!file){
                 return res.status(404).send( 'Can not find !' );
            }else{
                var len=file.workflow.length;
                return res.status(200).send([len.toString()]);
            }
        })
  }

//to lock document
module.exports.lockDoc = (req, res, next) =>{
  workflow.findOne({_id:req.params.id,isLock: {$ne:true}},
    function (err,file) {
        if (!file)
            return res.status(404).send(['not found']);
        else{
          const hashF = encrypt(file.file);
          const hashP = encrypt(file.catPath);
          const hashPa= encrypt(req.body.pass);
         workflow.findOneAndUpdate({_id:req.params.id},{isLock:true,eFile:hashF,ePath:hashP,file:null,catPath:null,pass:hashPa},
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


//to unlock document
module.exports.unlockDoc = (req, res, next) =>{
  workflow.findOne({_id:req.params.id,isLock: {$ne:null}},
    function (err,file) {
        if (!file)
            return res.status(404).send(['not found']);
        else{
            const dPath = decrypt(file.ePath[0]);
            const dFile = decrypt(file.eFile[0]);
            const dPass = decrypt(file.pass[0]);
            if(dPass==req.body.pass){
              workflow.findOneAndUpdate({_id:req.params.id},{isLock:null,eFile:null,ePath:null,file:dFile,catPath:dPath,pass:null},
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

//to pass ongoing workflow data for creator of workflow
module.exports.getWorkflowDataNow=(req,res,next)=>{
  workflow.find({createdBy:req._id}, 
      (err,files)=>{
          if (!files){
               return res.status(404).send( 'Can not find !' );
          }else{
              return res.status(200).send(files);
          }
      }).sort({createdAt: 'desc'})
}
//to pass ongoing workflow data count for creator of workflow
module.exports.getWorkflowDataNowCount=(req,res,next)=>{
  workflow.countDocuments({createdBy:req._id}, 
      (err,count)=>{
          if (!count){
               return res.status(404).send( 'Can not find !' );
          }else{
              return res.status(200).send([count]);
          }
      })
}

//to delete workflow
module.exports.delWorkflow=(req,res,next)=>{
  workflow.findOne({_id:req.params.id}, 
      (err,file)=>{
          if (!file){
               return res.status(404).send( 'Can not find !' );
          }else{
            var myJSON = JSON.stringify(file.file);
            var str=myJSON.split('\\');
            //console.log(str);
            var nStr=str[str.length-1].split('"');
            //console.log(nStr[0]);
            var multerDate=nStr[0].split('-');
            var myPath=file.catPath+'/'+multerDate[0]+'-'+file.name;
            //console.log(myPath);
            fs.unlink(myPath, (err) => {
              if (err) {
                return res.status(404).send(['File can not delete Or Unlock Before Delete !']);
              }
               //file removed
            workflow.findOneAndRemove({_id:req.params.id},(err,file)=>{
              if (!file)
                   return res.status(404).send(['Doc can not find !']);
              else{
                  return res.status(200).send(['Workflow Delete Successful !']);
              }
             }) 
           
              
            })
          }
      })
}
//to update workflow table when change workflow data
module.exports.getWorkflowDataUpdate=(req,res,next)=>{
  workflow.findOne({_id:req.params.id}, 
      (err,file)=>{
          if (!file){
               return res.status(404).send( 'Can not find !' );
          }else{
            workflow.findOneAndUpdate({_id:req.params.id},{workFlowList:file.workflow,workflowData:file.workflow[0],workflowNext:file.workflow[1]},
              function (err,rfile) {
                  if (!rfile)
                      return res.status(404).send(['not found']);
                  else{
                     return res.status(200).send(['File Updated!']);
                    
                   }
              }
          );
          }
      })
}

//to send workflow done files acording to user
module.exports.getWorkflowDoneFiles=(req,res,next)=>{
  User.findOne({_id:req._id}, 
      (err,user)=>{
          if (!user){
               return res.status(404).send( 'Can not find !' );
          }else{
           //{$or:[{workFlowUsers:user.email},{createdBy:req._id}]}
            Document.find({workFlowUsers:user.email,isWorkFlowed:true} , 
              (err,files)=>{
                  if (!files){
                    return res.status(404).send( 'Can not find !' );
                  }else{
                    return res.status(200).send(files);
                  }
              }).sort({createdAt: 'desc'})
          }
      })
}

//to send workflow done files count acording to user
module.exports.getWorkflowDoneFilesCount=(req,res,next)=>{
  User.findOne({_id:req._id}, 
      (err,user)=>{
          if (!user){
               return res.status(404).send( 'Can not find !' );
          }else{
            Document.countDocuments({workFlowUsers:user.email,isWorkFlowed:true}, 
              (err,cd)=>{
                  if (!cd){
                    return res.status(404).send( 'Can not find !' );
                  }else{
                    return res.status(200).send([cd]);
                  }
              })
          }
      })
}



//to del workflow done file acording to user
module.exports.getWorkflowDoneFileDel=(req,res,next)=>{
  User.findOne({_id:req._id}, 
      (err,user)=>{
          if (!user){
               return res.status(404).send( ['Can not find !' ]);
          }else{
            Document.findOne({_id:req.params.id}, 
              (err,file)=>{
                  if (!file){
                    return res.status(404).send( ['Can not find !'] );
                  }else{
                    file.updateOne({$pull:{workFlowUsers:user.email}}, 
                      (err,file)=>{
                          if (!file){
                            return res.status(404).send( ['Can not find !']);
                          }else{
                            return res.status(200).send( ['List Updated'] );
                          }
                      })
                  }
              })
          }
      })
}









/*
router.post('/postDoc',upload.single('file'),jwtHelper.verifyJwtToken,function (req, res, next) {
    let extArray = req.file.originalname.split(".")
    let extension = extArray[extArray.length - 1];
                    
    if(req.body.name ==''){
      
      Document.findOne({name:req.file.originalname},(err,doc)=>{
         if(doc){
          return res.status(422).send(['Duplicate name Found!']);
         }else{
          var document = new Document();
          // let nameArray= req.file.originalname.split(".");
          //let name=nameArray[nameArray.length-2];
           document.name =req.file.originalname;
           document.file= req.file.path ;
           document.type=extension;
           document.size=req.file.size;
           document.category=req.body.category;
           document.department=req.body.department;
           document.createdBy=req.body.createdBy;
           document.tags=req.body.tags;
           document.save((err, doc) =>{
             if (!err){
               return res.status(200).send(['File Uploaded Successfully !']);
             }else if(err){
               return next(err);
             }else{
               return res.status(422).send(['Eror from backend !']);
             }
            })
          }
      })
}else{
  Document.findOne({name:req.body.name},(err,doc)=>{
  if(doc){
    return res.status(422).send(['Duplicate name Found!']);
  }else{
    var document = new Document();
    document.name =req.body.name;
    document.file= req.file.path ;
    document.type=extension;
    document.size=req.file.size;
    document.category=req.body.category;
    document.department=req.body.department;
    document.createdBy=req.body.createdBy;
    document.tags=req.body.tags;
    document.save((err, doc) =>{
      if (!err){
        return res.status(200).send(['File Uploaded Successfully !']);
      }else if(err){
        return next(err);
      }else{
        return res.status(422).send(['Eror from backend !']);
      }
     })

  }
})
}

})
*/