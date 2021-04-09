const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const e = require('express');
const router = e.Router();
const date = require('date-and-time');
var config = require('../config/config.json');
const fs = require('fs-extra')
const { encrypt, decrypt } = require('../config/crypto');
//Multer configuration
const multer = require('multer');
var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
   
    filename: function (req, file, cb) {
       let extArray = file.originalname.split(".")
       let extension = extArray[extArray.length - 1];
       if(req.body.name==''){
        cb(null,file.originalname) //this can store file as original
       }else{
        cb(null,req.body.name +'.'+extension)//this can store file by user given name
       }
      }

})
var upload = multer({ storage: storage1}).array('files');
//Doc upload config over

const Document = mongoose.model('Document');
const arcDocument=mongoose.model('arcDocument');
const Dep=mongoose.model('Department');
const Category= mongoose.model('Category');
const jwtHelper = require('../config/jwtHelper');

//to post document
module.exports.postDocWithFile=(req,res,next)=>{
    upload(req, res, function (err) {
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
        //let extArray = req.files.originalname.split(".")
        //let extension = extArray[extArray.length - 1];
                        
        if(req.body.name ==''){
          
          Document.findOne({name:req.file.originalname},(err,doc)=>{
             if(doc){
              return res.status(422).send(['Duplicate name Found!']);
             }else{
              var document = new Document();
              // let nameArray= req.file.originalname.split(".");
              //let name=nameArray[nameArray.length-2];
               //document.name =req.files.originalname;
               document.file= arr;
               //document.type=extension;
               //document.size=req.file.size;
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
                   return res.status(422).send(['Error from backend !']);
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
                    document.file=arr;
                  //  document.type=extension;
                   // document.size=req.file.size;
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
                        return res.status(422).send(['Error from backend !']);
                    }
                    })

                }
                })
            }
     })
}

//to rename doc/file with document view list

module.exports.renameFile=(req,res,next)=>{
  Document.findOne( {name:req.body.name},
    function(err,name) {
      if (!name){
        Document.findOne({ _id:req.body._id },(err,file)=>{
          if(err || !file){
              return res.status(404).send(['Doc With this req Id Does Not Exist !']);
         }else{
              var conFileName=file.name.split('.');
              if(conFileName[0]==req.body.name){
                return res.status(422).send(['File name already use !']);
              }else{
                var myJSON = JSON.stringify(file.file);
                var str=myJSON.split('\\');
                var nStr=str[str.length-1].split('"');
                var multerDate=nStr[0].split('-');
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
                  //new filename+type
                  var newName=req.body.name+'.'+file.type;
                  var oldpath=file.catPath+multerDate[0]+'-'+file.name;
                  var newpath=file.catPath+multerDate[0]+'-'+req.body.name+'.'+file.type;
                  //var toDbPath=config.development.TO_DB_TO_UP_LOCATION+file.department+'\\'+file.category+'\\'+multerDate[0]+'-'+name+'.'+file.type;
                  
                  var toDbPath=config.development.TO_DB_TO_UP_LOCATION+dbPath(arr)+multerDate[0]+'-'+req.body.name+'.'+file.type;
                  console.log(toDbPath);
                  fs.rename(oldpath.toString(),newpath.toString(), function (err) {
                    if (err){
                      return res.status(422).send(['Cannot rename !']);
                    }
                    Document.findOneAndUpdate({_id:req.body._id},{name:newName,file:toDbPath},function(err,doc){
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

//to delete document/file from list
module.exports.deleteFile=(req,res,next)=>{
  Document.findOne({ _id:req.params.id },(err,file)=>{
      if(err || !file){
          return res.status(404).send(['File Does Not Exist !']);
     }else{
          var myJSON = JSON.stringify(file.file);
          var str=myJSON.split('\\');
          var nStr=str[str.length-1].split('"');
          var multerDate=nStr[0].split('-');
          var myPath=file.catPath+'/'+multerDate[0]+'-'+file.name;
          fs.unlink(myPath, (err) => {
            if (err) {
              return res.status(404).send(['File Not found in Local Storage !']);
            }
             //file removed
          Document.findOneAndRemove({_id:req.params.id},(err,file)=>{
            if (!file)
                 return res.status(404).send(['Doc can not find !']);
            else{
                
                return res.status(200).send(['Doc Delete !']);
            }
           }) 
         
            
          })
     }
  })
  
}

//to extend doc expire data via list
module.exports.extendExp=(req,res,next)=>{
  Document.findOne({ _id:req.body._id},(err,file)=>{
      if(err || !file){
          return res.status(404).send(['File Does Not Exist !']);
     }else{
      file.updateOne({expDate:req.body.expDate},function(err,doc){
        if(err){
          return res.status(422).send(['Db eror !']);
         }else{
          return res.status(200).send(['Exp Date Updated !']);
         }
     })
    }
  })
  
}


//if document expire it automatically move to archived docs
module.exports.checkExpiration=(req,res,next)=>{
  const now = new Date();
  var current= date.format(now, 'YYYY-M-D');
 // console.log(current.toString());
  var errArr=[];
  var resArr=[];
  Document.find({expDate:current.toString()}, 
    (err,files)=>{
        if (!files){
            return res.status(404).send( 'Can not find !' );
        }else{
            var count=files.length;
            for(var i=0;i<count;i++){
              Document.findOne({_id:files[i]._id},
              (err,file) => {
                  if (!file){
                      return res.status(404).send('not found');
                  }else{
                      //console.log(doc);
                      var document = new arcDocument();
                      document.docId=file._id;
                      document.name =file.name;
                      document.file =file.file;
                      document.type =file.type;
                      document.size =file.size;
                      document.category=file.category;
                      document.catPath=file.catPath;
                      document.subCategory=file.subCategory;
                      document.department=file.department;
                      document.createdBy=file.createdBy;
                      document.tags=file.tags;
                      document.expDate=file.expDate;
                      document.save(function(err,result){ 
                        if (err){ 
                            return res.status(422).send(['Error from backend !']);
                        } 
                        else{ 
                          file.updateOne({arcStatus:'yes',expDate:null},function(err,doc){
                            if(err){
                             errArr.push(err);
                             if(count==errArr.length){
                               return res.status(422).send(['Auto File Archived Unsuccessful !']);
                           }
                            }else{
                              resArr.push(doc);
                              if(count==resArr.length){
                                 return res.status(200).send(['Auto File Archived Successful !']);
                              }
                             
                            }
                
                         })
      
                        }
                    }) 
                    
                  }
              }
          );
            }
        }
    })

}


//if document expire it automatically move to archived docs testing
module.exports.checkExpiration1=(req,res,next)=>{
  const now = new Date();
  var current= date.format(now, 'YYYY-M-D');
  console.log(current.toString());
  var errArr=[];
  var resArr=[];
  Document.find({expDate:current.toString()}, 
    (err,files)=>{
        if (!files){
            return res.status(404).send( 'Can not find !' );
        }else{
            var count=files.length;
            for(var i=0;i<count;i++){
              Document.findOne({_id:files[i]._id},
              (err,file) => {
                  if (!file){
                      return res.status(404).send('not found');
                  }else{
                    //for get file now path
                    var myJSON = JSON.stringify(file.file);
                    var str=myJSON.split('\\');
                    var nStr=str[str.length-1].split('"');
                    var multerDate=nStr[0].split('-');
                    var nowPath=file.catPath+multerDate[0]+'-'+file.name;
                    //over
                    var arr=new Array;
                    var str=file.catPath.split('/');
                    for(var x=2;x<str.length;x++){
                      if(str[x] !=''){
                        arr.push(str[x]);
                      }
                    }
                    var path=config.development.ARC_PATH+arPath(arr);
                    fs.mkdirsSync(path);
                    var desPath=config.development.ARC_PATH+arPath(arr)+multerDate[0]+'-'+file.name
                    fs.move(nowPath,desPath, err => {
                      if (err){
                        return res.status(422).send('fs eror !');
                      }else{
                              //console.log(doc);
                              var document = new arcDocument();
                              document.docId=file._id;
                              document.name =file.name;
                              document.file =file.file;
                              document.type =file.type;
                              document.size =file.size;
                              document.category=file.category;
                              document.catPath=file.catPath;
                              document.subCategory=file.subCategory;
                              document.department=file.department;
                              document.createdBy=file.createdBy;
                              document.tags=file.tags;
                              document.expDate=file.expDate;
                              document.arcPath=desPath;
                              document.save(function(err,result){ 
                                if (err){ 
                                    return res.status(422).send(['Error from backend !']);
                                } 
                                else{ 
                                  file.updateOne({arcStatus:'yes',expDate:null},function(err,doc){
                                    if(err){
                                    errArr.push(err);
                                    if(count==errArr.length){
                                      return res.status(422).send(['Auto File Archived Unsuccessful !']);
                                  }
                                    }else{
                                      resArr.push(doc);
                                      if(count==resArr.length){
                                        return res.status(200).send(['Auto File Archived Successful !']);
                                      }
                                    
                                    }
                        
                                })
              
                                }
                            }) 
                      }
                    })
                  }
              }
          );
            }
        }
    })

}

//To manual restore doc --working---

module.exports.fromArcDoc=(req,res,next)=>{
  arcDocument.findOne({_id:req.params.id}, 
      (err,file)=>{
          if (!file){
              return res.status(404).send( ['Can not find !']);
          }else{
            //for get file destination path
            var myJSON = JSON.stringify(file.file);
            var str=myJSON.split('\\');
            var nStr=str[str.length-1].split('"');
            var multerDate=nStr[0].split('-');
            var desPath=file.catPath+multerDate[0]+'-'+file.name;
            //over
            fs.move(file.arcPath,desPath, err => {
              if (err){
                return res.status(422).send(['fs eror !']);
              }else{
                Document.findOneAndUpdate({_id:file.docId},{arcStatus:null,expDate:req.body.expDate},function(err,doc){
                  if(err){
                     return res.status(422).send(['File Restore Unsuccessful !']);
                  }else{
                    //return res.status(200).send([' File Restore Successful !']);
                    arcDocument.findOneAndRemove({_id:req.params.id},
                    (err,rfile) => {
                      if (!rfile){
                          return res.status(404).send(['not found']);
                      }else{
                           return res.status(200).send(['File Restored!']);
                      }
                    }
                   );
                  }
      
               })
              }
            })
            
          }
      })
      
}

//to manual  archive doc
module.exports.toArchived=(req,res,next)=>{
  Document.findOne({_id:req.params.id}, 
      (err,file)=>{
          if (!file){
              return res.status(404).send( 'Can not find !' );
          }else{
            //for get file now path
            var myJSON = JSON.stringify(file.file);
            var str=myJSON.split('\\');
            var nStr=str[str.length-1].split('"');
            var multerDate=nStr[0].split('-');
            var nowPath=file.catPath+multerDate[0]+'-'+file.name;
            //over
            var arr=new Array;
            var str=file.catPath.split('/');
            for(var x=2;x<str.length;x++){
              if(str[x] !=''){
                arr.push(str[x]);
              }
            }
            var path=config.development.ARC_PATH+arPath(arr);
            fs.mkdirsSync(path);
            var desPath=config.development.ARC_PATH+arPath(arr)+multerDate[0]+'-'+file.name
            fs.move(nowPath,desPath, err => {
              if (err){
                return res.status(422).send('fs eror !');
              }else{
                var document = new arcDocument();
                document.docId=file._id;
                document.name =file.name;
                document.file =file.file;
                document.type =file.type;
                document.size =file.size;
                document.category=file.category;
                document.catPath=file.catPath;
                document.subCategory=file.subCategory;
                document.department=file.department;
                document.createdBy=file.createdBy;
                document.arcBy=req._id;
                document.tags=file.tags;
                document.expDate=file.expDate;
                document.arcPath=desPath;
                document.save(function(err,result){ 
                  if (err){ 
                      return res.status(422).send(['Error from backend !']);
                  } 
                  else{ 
                    file.updateOne({arcStatus:'yes',expDate:null},function(err,doc){
                      if(err){
                         return res.status(422).send(['File Archived Unsuccessful !']);
                     
                      }else{
                         return res.status(200).send(['File Archived Successful !']);
                       
                      }
          
                   })
 
                  }
              }) 
 
              }
             
            })
            
          }
      })
      
}
//testing file movement
module.exports.tM = (req, res, next) =>{
  var arr=new Array;
  var catPath='./uploads/finance/paysheet2/';
  var str=catPath.split('/');
  console.log(str);
  for(var x=2;x<str.length;x++){
    if(str[x] !=''){
      arr.push(str[x]);
    }
  }
 console.log(arr);
 var path=config.development.ARC_PATH+arPath(arr);
 fs.mkdirsSync(path);
 console.log(path);
}


//to pass docs without archived docs
module.exports.getDocs = (req, res, next) =>{
    Document.find({arcStatus:null},
        function (err, docs) {
            if (!docs)
                return res.status(404).json({ status: false, message: ' record not found.' });
            else
                return res.send(docs);
        }
    ).sort({createdAt: 'desc'});
}

//to pass archived docs/files
module.exports.getArcDocs = (req, res, next) =>{
  arcDocument.find(
      function (err, docs) {
          if (!docs)
              return res.status(404).json({ status: false, message: ' record not found.' });
          else
              return res.status(200).send(docs);
      }
  ).sort({createdAt: 'desc'});
}

//to pass count of document schema 
module.exports.getCountDocs = (req, res, next) =>{
  Document.countDocuments({arcStatus:null},
      function (err,count) {
          if (!count)
              return res.status(404).send('not found');
          else
              return res.status(200).send([count]);
      }
  );
}

//to pass count of archive documents schema
module.exports.getArcCountDocs = (req, res, next) =>{
  arcDocument.countDocuments(
      function (err,count) {
          if (!count)
              return res.status(404).send('not found');
          else
              return res.status(200).send([count]);
      }
  );
}

//to delete archive doc 
module.exports.delArcDoc = (req, res, next) =>{
  arcDocument.findOneAndRemove({_id:req.params.id},
      function (err,file) {
          if (!file)
              return res.status(404).send('not found');
          else{
            //return res.status(200).send('File Deleted !');
            Document.findOneAndRemove({_id:file.docId},
              function (err,rfile) {
                  if (!rfile)
                      return res.status(404).send('not found');
                  else{
                     return res.status(200).send('File Deleted !');
                    
                   }
              }
          );
           }
      }
  );
}

//to unlock document
module.exports.unlockDoc = (req, res, next) =>{
  Document.findOne({_id:req.params.id,isLock: {$ne:null}},
    function (err,file) {
        if (!file)
            return res.status(404).send(['not found']);
        else{
            const dPath = decrypt(file.ePath[0]);
            const dFile = decrypt(file.eFile[0]);
            const dPass = decrypt(file.pass[0]);
            if(dPass==req.body.pass){
              Document.findOneAndUpdate({_id:req.params.id},{isLock:null,eFile:null,ePath:null,file:dFile,catPath:dPath,pass:null},
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


//to lock document
module.exports.lockDoc = (req, res, next) =>{
  Document.findOne({_id:req.params.id,isLock: {$ne:true}},
    function (err,file) {
        if (!file)
            return res.status(404).send(['not found']);
        else{
          const hashF = encrypt(file.file);
          const hashP = encrypt(file.catPath);
          const hashPa= encrypt(req.body.pass);
         Document.findOneAndUpdate({_id:req.params.id},{isLock:true,eFile:hashF,ePath:hashP,file:null,catPath:null,pass:hashPa},
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

//filter docs acording to department
module.exports.findDocsForDep=(req,res,next)=>{
  Dep.findOne({_id:req.params.id},
      (err,dep)=>{
          if (!dep)
           return res.status(404).send(['Department not find !']);
      else{
        Document.find({department:dep.name,arcStatus:null},
          (err,docs)=>{
              if (!docs)
               return res.status(404).send(['Not find !']);
          else{
                return res.status(200).send(docs);
           }
      }).sort({createdAt: 'desc'});
       }
  })
}

//filter docs acording to category
module.exports.findDocsForCat=(req,res,next)=>{
  Category.findOne({_id:req.params.id},
      (err,cat)=>{
          if (!cat)
           return res.status(404).send(['Category not find !']);
      else{
        Dep.findOne({_id:cat.depId},
          (err,dep)=>{
              if (!dep)
               return res.status(404).send(['Not find !']);
          else{
            Document.find({department:dep.name,category:cat.name,arcStatus:null},
              (err,docs)=>{
                  if (!docs)
                   return res.status(404).send(['Not find !']);
              else{
                   return res.status(200).send(docs);
               }
          }).sort({createdAt: 'desc'});
           }
      })
       }
  })
}

//find docs using created at date
module.exports.findDocsUsingCreatedDate=(req,res,next)=>{
  var date=req.params.date;
 // console.log(date);
  Document.find({createDate:{ $regex: '.*' +date+ '.*' },arcStatus:null},
      (err,docs)=>{
          if (!docs)
           return res.status(404).send(['Not find !']);
      else{
          return res.status(200).send(docs);
       }
  }).sort({createdAt: 'desc'});
}

//find docs using Exp date
module.exports.findDocsUsingExpDate=(req,res,next)=>{
  var date=req.params.date;
 // console.log(date);
  Document.find({expDate:{ $regex: '.*' +date+ '.*' },arcStatus:null},
      (err,docs)=>{
          if (!docs)
           return res.status(404).send(['Not find !']);
      else{
          return res.status(200).send(docs);
       }
  }).sort({createdAt: 'desc'});
}
//to get documets types available ,
module.exports.findDocsTypes=(req,res,next)=>{
  Document.distinct("type",
      (err,types)=>{
          if (!types)
           return res.status(404).send(['Not find !']);
      else{
          return res.status(200).send(types);
       }
  }).sort({type: 'asc'});
}
//to convert to archive path
function arPath(arr){
  aPath=''
  for(var i=0;i<arr.length;i++){
    aPath=aPath+arr[i]+'/';             
  }
  return aPath
}

//to convert db path
function dbPath(arr){
  dPath=''
  for(var i=0;i<arr.length;i++){
    dPath=dPath+arr[i]+'\\'               
  }
  return dPath
}