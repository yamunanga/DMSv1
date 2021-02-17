const mongoose = require('mongoose');
var config = require('../config/config.json');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const e = require('express');
//for directory operations
const fs = require('fs-extra')
const router = e.Router();
const URIpath = require('uri-path');
const url = require('url');
const date = require('date-and-time')
const User = mongoose.model('User');
//const needApprove=mongoose.model('needApprove');
//const pathU = require('../uploads/hrm');

//Multer configuration
var uploadPath;
const multer = require('multer');
const { compact } = require('lodash');
var storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
     /*if((req.params.mC != null)&&(req.params.sC != null)){
      let path =config.development.UPLOAD_LOCATION+req.params.dep+'/'+req.params.mC+'/'+req.params.sC;
      fs.mkdirsSync(path);
      cb(null,path);

     }else{
      let path =config.development.UPLOAD_LOCATION+req.params.dep+'/'+req.params.mC;
      fs.mkdirsSync(path);
      cb(null,path);
     }*/
     //to original format
     //var originalPath=JSON.parse(req.params.path);
      //var opath=".-uploads-finance-paysheet2-last";
     let path=conPath(req.params.path)
     console.log(path);
     fs.mkdirsSync(path);
     cb(null,path);

    },
   
    filename: function (req, file, cb) {
      cb(null,Date.now()+'-'+file.originalname) //this can store file as original
    }

})
var uploadTemp = multer({ storage: storage3}).array('files');
//temp Doc upload config over
const Document = mongoose.model('Document');
const tempDocument = mongoose.model('tempDocument');
const approvement=mongoose.model('approvment');

/*
 let path = `./uploads/`+req.params.dep+'/'+req.params.mC;
      fs.mkdirsSync(path);
      cb(null,path);
*/


//post temp doc
module.exports.postTempDocWithFile=(req,res,next)=>{
  uploadTemp(req, res, function (err) {
    
      //var arr = new Array();
    
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(422).send(['multer error!']);
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(422).send(['unknown !']);
      }
      // Everything went fine.
      let path=conPath(req.params.path)
      //path=req.params.path;
      var str=path.split('/');
      var mC=str[3];
      var dep=str[2];
      var arr = new Array
      for(var x=4;x<str.length;x++){
        if(str[x] !=''){
           arr.push(str[x]);
        }
      }
      console.log(arr);
      if(arr.length != 0){ //req.params.sC !=null
        var len=req.files.length;
        for(var i = 0; i < len; i++){
          //arr.push(req.files[i].path)
              let extArray = req.files[i].originalname.split(".")
              let extension = extArray[extArray.length - 1];
              var document = new tempDocument();
              document.name =req.files[i].originalname;
              document.file=req.files[i].path;
              document.catPath=path;
              document.type=extension;
              document.size=req.files[i].size;
              document.category=mC;
              //document.subCategory=req.params.sC;
             
              for(var j=0;j<arr.length;j++){
                document.subCategory.push(arr[j]);
              }
              document.department=dep;
              document.createdBy=req._id;
              document.tags=req.body.tags;
              document.save(function(err,result){ 
                if (err){ 
                    console.log(err);
                    //return res.status(422).send(['Eror from backend !']);
                } 
                else{ 
                    console.log(result) 
                    //return res.status(200).send(['File Uploaded Successfully !']);
                } 
            }) 
      }
      if(i==len){
        return res.status(200).send(['File Uploaded Successfully !']);
      }else {
        return res.status(422).send(['File upload unsuccessfull !']);
      }

      }else {
        var len=req.files.length;
        for(var i = 0; i < len; i++){
          //arr.push(req.files[i].path)
              let extArray = req.files[i].originalname.split(".")
              let extension = extArray[extArray.length - 1];
              var document = new tempDocument();
              document.name =req.files[i].originalname;
              document.file=req.files[i].path;
              document.type=extension;
              document.size=req.files[i].size;
              document.category=mC;
              document.catPath=path;
              document.department=dep;
              document.createdBy=req._id;
              document.tags=req.body.tags;
              document.save(function(err,result){ 
                if (err){ 
                    console.log(err);
                    //return res.status(422).send(['Eror from backend !']);
                } 
                else{ 
                    console.log(result) 
                    //return res.status(200).send(['File Uploaded Successfully !']);
                } 
            }) 
      }
      if(i==len){
        return res.status(200).send(['File Uploaded Successfully !']);
      }else {
        return res.status(422).send(['File upload unsuccessfull !']);
      }
    }
  })
}




//to get tempory doc
module.exports.viewTempFiles=(req,res,next)=>{
  tempDocument.find({createdBy:req._id},
      (err,files)=>{
          if (!files){
              return res.status(404).json({ status: false, message: 'Can not find !' });
          }else{
              return res.send(files);
          }
      }).sort({createdAt: 'desc'})

}


//to get count of temory doc for req id

module.exports.getTempCount=(req,res,next)=>{
  tempDocument.countDocuments({createdBy:req._id},
      (err,tcount)=>{
          if (err)
           return res.status(404).send(['Doc not find !']);
      else{
         // return res.send(cats);
          return res.status(200).send([tcount]);
       }
  })
}



             
//to delete file from storage and temp db collection--not use---

module.exports.deleteTempFile1=(req,res,next)=>{
tempDocument.findOne({ _id:req.params.id },(err,file)=>{
    if(err || !file){
        return res.status(404).send(['File Does Not Exist !']);
   }else{
    var myJSON = JSON.stringify(file.file);
    var str=myJSON.split('\\');
    console.log(str);
    var nStr=str[str.length-1].split('"');
    console.log(nStr[0]);
    var multerDate=nStr[0].split('-');
    if(file.subCategory ==null){
      var opath=config.development.UPLOAD_LOCATION+file.department+'/'+file.category+'/'+multerDate[0]+'-'+file.name;
      //console.log(opath);
      //fs.removeSync(opath);
      fs.unlink(opath, (err) => {
        if (err) {
          return res.status(404).send(['File can not delete !']);
        }
         //file removed
      tempDocument.findOneAndRemove({_id:req.params.id},(err,file)=>{
        if (!file)
             return res.status(404).send(['Doc can not find !']);
        else{
            
            return res.status(200).send(['Doc Delete !']);
        }
       }) 
     
        
      })

    }else{
      var opath=config.development.UPLOAD_LOCATION+file.department+'/'+file.category+'/'+file.subCategory+'/'+multerDate[0]+'-'+file.name;
      console.log(opath);
      //fs.removeSync(opath);
      fs.unlink(opath, (err) => {
        if (err) {
          return res.status(404).send(['File can not delete !']);
        }
         //file removed
      tempDocument.findOneAndRemove({_id:req.params.id},(err,file)=>{
        if (!file)
             return res.status(404).send(['Doc can not find !']);
        else{
            
            return res.status(200).send(['Doc Delete !']);
        }
       }) 
     })
     }
   }
})

}



//testing delete--use---
module.exports.deleteTempFile=(req,res,next)=>{
  tempDocument.findOne({ _id:req.params.id },(err,file)=>{
      if(err || !file){
          return res.status(404).send(['File Does Not Exist !']);
     }else{
          var myJSON = JSON.stringify(file.file);
          var str=myJSON.split('\\');
          console.log(str);
          var nStr=str[str.length-1].split('"');
          console.log(nStr[0]);
          var multerDate=nStr[0].split('-');
          var myPath=file.catPath+'/'+multerDate[0]+'-'+file.name;
          console.log(myPath);
          fs.unlink(myPath, (err) => {
            if (err) {
              return res.status(404).send(['File can not delete !']);
            }
             //file removed
          tempDocument.findOneAndRemove({_id:req.params.id},(err,file)=>{
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




//to rename document via temp-doc --not work--


module.exports.renameTempFile1=(req,res,next)=>{
  const{_id,name}=req.body;
  tempDocument.findOne( {name:name},
    function(err,files) {
      if (!files){
        //secound logic start 
        tempDocument.findOne({ _id: _id },(err,file)=>{
          if(err || !file){
              return res.status(404).send(['Doc With this req Id Does Not Exist !']);
         }else{
              if(file.name==name){
                return res.status(422).send(['File name already use !']);
              }else{
                var myJSON = JSON.stringify(file.file);
                console.log(myJSON);
                var str=myJSON.split('\\');
                console.log(str);
                var nStr=str[str.length-1].split('"');
                var multerDate=nStr[0].split('-');
                console.log(nStr);
                if(file.subCategory ==null){
                  //new filename+type
                  var newName=name+'.'+file.type;
                  var opath=config.development.UPLOAD_LOCATION+file.department+'/'+file.category+'/'+multerDate[0]+'-'+file.name;
                  var npath=config.development.UPLOAD_LOCATION+file.department+'/'+file.category+'/'+multerDate[0]+'-'+name+'.'+file.type;
                  var toDbPath=config.development.TO_DB_TO_UP_LOCATION+file.department+'\\'+file.category+'\\'+multerDate[0]+'-'+name+'.'+file.type;
                  console.log(npath.toString());
                  console.log(opath);
                  console.log(toDbPath);
                  
                  fs.rename(opath.toString(),npath.toString(), function (err) {
                    if (err){
                      return res.status(422).send(['Cannot rename !']);
                    }
                    console.log('File Renamed.');
                    tempDocument.findOneAndUpdate({_id:_id},{name:newName,file:toDbPath},function(err,doc){
                      if(err){
                        return res.status(422).send(['Eror from DB!']);
                      }else{
                        return res.status(200).send(['File name has been changed !']);
                      }
            
                   })
                  });

                 
                  
                }else{
                  var newName=name+'.'+file.type;
                  var opath=config.development.UPLOAD_LOCATION+file.department+'/'+file.category+'/'+file.subCategory+'/'+multerDate[0]+'-'+file.name;
                  var npath=config.development.UPLOAD_LOCATION+file.department+'/'+file.category+'/'+file.subCategory+'/'+multerDate[0]+'-'+name+'.'+file.type;
                  var toDbPath=config.development.TO_DB_TO_UP_LOCATION+file.department+'\\'+file.category+'\\'+file.subCategory+'\\'+multerDate[0]+'-'+name+'.'+file.type;
                  console.log(opath);
                  console.log(npath);
                  fs.rename(opath.toString(),npath.toString(), function (err) {
                    if (err){
                      return res.status(422).send(['Cannot rename !']);
                    }
                    console.log('File Renamed.');
                    tempDocument.findOneAndUpdate({_id:_id},{name:newName,file:toDbPath},function(err,doc){
                      if(err){
                        return res.status(422).send(['Eror from DB!']);
                      }else{
                        return res.status(200).send(['File name has been changed !']);
                      }
            
                   })
                  });
                  
                  
                }
                
               
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

//to rename document via temp-doc --work--
module.exports.renameTempFile=(req,res,next)=>{
  const{_id,name}=req.body;
  tempDocument.findOne( {name:name},
    function(err,files) {
      if (!files){
        //secound logic start 
        tempDocument.findOne({ _id: _id },(err,file)=>{
          if(err || !file){
              return res.status(404).send(['Doc With this req Id Does Not Exist !']);
         }else{
              if(file.name==name){
                return res.status(422).send(['File name already use !']);
              }else{
                var myJSON = JSON.stringify(file.file);
                console.log(myJSON);
                var str=myJSON.split('\\');
                console.log(str);
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
                console.log(nStr);
                  //new filename+type
                  var newName=name+'.'+file.type;
                  var oldpath=file.catPath+multerDate[0]+'-'+file.name;
                  var newpath=file.catPath+multerDate[0]+'-'+name+'.'+file.type;
                  //var toDbPath=config.development.TO_DB_TO_UP_LOCATION+file.department+'\\'+file.category+'\\'+multerDate[0]+'-'+name+'.'+file.type;
                  
                  var toDbPath=config.development.TO_DB_TO_UP_LOCATION+dbPath(arr)+multerDate[0]+'-'+name+'.'+file.type;
                  console.log(newpath.toString());
                  console.log(oldpath);
                  console.log(toDbPath);
                  
                  fs.rename(oldpath.toString(),newpath.toString(), function (err) {
                    if (err){
                      return res.status(422).send(['Cannot rename !']);
                    }
                    console.log('File Renamed.');
                    tempDocument.findOneAndUpdate({_id:_id},{name:newName,file:toDbPath},function(err,doc){
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



















//to set need approve to relevent documents
module.exports.setApprovement=(req,res,next)=>{
  tempDocument.findOne({_id:req.body._id}, //post tempDoc id from frontend
      (err,file)=>{
          if (!file){
              return res.status(404).json({ status: false, message: 'Can not find !' });
          }else{
              //var arr=['a','b','c'];
              /*var str=req.body.arr.split(',');
              var len=str.length;
              var arrN = new Array();
              for(var i=0;i<len;i++){
                 arrN.push(str[i])
              }*/
              file.updateOne({ $addToSet:{needApproveBy:req.body.name}},function(err,doc){
                if(err){
                  return res.status(422).send(['Cannot update !']);
                }else{
                  return res.status(200).send(['Update Successfull !']);
                }
    
             })

          }
      })
}

//to remove user from needapprove array

module.exports.delApprovement=(req,res,next)=>{
  tempDocument.findOne({_id:req.body._id}, //post tempDoc id from frontend
      (err,file)=>{
          if (!file){
              return res.status(404).json({ status: false, message: 'Can not find !' });
          }else{
            
            file.updateOne({$pull:{needApproveBy:req.body.name}},function(err,doc){
              if(err){
                return res.status(422).send(['Cannot update !']);
              }else{
                return res.status(200).send(['Update Successfull !']);
              }
  
           })
          }
      })
}

//for pass need approvement data to front end 

module.exports.getApprovementData=(req,res,next)=>{
  tempDocument.findOne({_id:req.params.id}, //post tempDoc id from frontend
      (err,file)=>{
          if (!file){
               return res.status(404).send( 'Can not find !' );
          }else{
              //return res.status(200).send(user : _.pick(user,['role']));
              //return  res.status(200).json({ info : _.pick(file,['_id','needApproveBy'])})
              return res.status(200).send(file.needApproveBy);
          }
      })
}
//to pass count of need approve array --use--

module.exports.getCountApprovementData=(req,res,next)=>{
  tempDocument.findOne({_id:req.params.id}, //post tempDoc id from frontend
      (err,file)=>{
          if (!file){
               return res.status(404).send( 'Can not find !' );
          }else{
              var arr=new Array;
              var count=0;
              for(var i=0;i<file.needApproveBy.length;i++){
                 count++;
              }
              return res.status(200).send(count.toString());
          }
      })
}





//to send check list data to front end assaign doc model --not work--
module.exports.getCheckListd=(req,res,next)=>{
  tempDocument.findOne({_id:req.params.id}, //post tempDoc id from frontend
      (err,file)=>{
          if (!file){
              return res.status(404).send( 'Can not find !' );
          }else{
            if(file.needApproveBy.length !=0){
              //return res.status(200).send(file.needApproveBy);
              var arr=new Array;
              for(var i=0;i<file.needApproveBy.length;i++){
                //console.log(file.needApproveBy[i]);
                //{email:file.needApproveBy[i]}
                
                User.findOne( {email:{$ne:file.needApproveBy[i]},_id:{$ne:req._id}},
                (err, user) => {
                    if (!user){
                        arr.push(null);
                    }else{
                        arr.push(user);
                        if(arr.length == file.needApproveBy.length){
                           //console.log(arr);
                           return res.send(arr);
                        }
                        
                        
                    }
                }
            );
              }
            }else{
             // var arr=new Array;
              User.find({_id:{$ne:req._id}},
                (err, users) => {
                    if (!users){
                        //arr.push(null);
                        return res.status(404).send('not found');
                    }else{
                         return res.status(200).send(users);
                    }
                }
            );
            }
          }//main else over
      })
      
}

//to send check list data to front end assaign doc model --working--
module.exports.getCheckList=(req,res,next)=>{
  tempDocument.findOne({_id:req.params.id}, //post tempDoc id from frontend
      (err,file)=>{
          if (!file){
              return res.status(404).send( 'Can not find !' );
          }else{
            User.find({_id:{$ne:req._id},role:'admin'},
              (err, users) => {
                  if (!users){
                      //arr.push(null);
                      return res.status(404).send('not found');
                  }else{
                       return res.status(200).send(users);
                  }
              }
          );
          }
      })
      
}


/*
    User.findOne( {email:{$ne:file.needApproveBy[i]},_id:{$ne:req._id}},
                (err, user) => {
                    if (!user){
                        arr.push(null);
                    }else{
                        arr.push(user);
                        if(arr.length == file.needApproveBy.length){
                           //console.log(arr);
                           return res.send(arr);
                        }
                        
                        
                    }
                }
            );
*/
























//not use-----
function PUSH(e) 
{ 
  arr.push(e); 
  console.log(arr.length); 
}





//User.findOne( {email:{$elemMatch:{$ne:file.needApproveBy[i]}},_id:{$ne:req._id},role:'admin'}




//to rename and save file in new location--not used--
module.exports.postDocNewLocation=(req,res,next)=>{
  var id="6005b0dbf03698256031bb43";
  tempDocument.findOne({_id:id}, //post tempDoc id from frontend
    (err,file)=>{
        if (!file){
            return res.status(404).json({ status: false, message: 'Can not find !' });
        }else{
          if(file.subCategory !=null){
            var myJSON = JSON.stringify(file.file);
            var str=myJSON.split('\\');
            var nStr=str[str.length-1].split('"');
            //console.log(nStr);
            var path='./uploads/'+file.department+'/'+file.category+'/'+nStr[0];
            console.log(path)
            fs.removeSync(path);
          }else{
            var myJSON = JSON.stringify(file.file);
            var str=myJSON.split('\\');
            var nStr=str[str.length-1].split('"');
            console.log(nStr);
            var path='./uploads/'+file.department+'/'+file.category+'/'+file.subCategory+'/'+nStr[0];
            console.log(path)
            fs.removeSync(path);
          }
        }
    })
        
}


//to post data from temp to documents
module.exports.transferToDocument=(req,res,next)=>{
  tempDocument.findOne({ _id:req.params.id },(err,file)=>{
    if(err || !file){
      return res.status(404).send(['Cannot find !']);
   }else{
       if(file.needApproveBy.length== 0|| file.needApproveBy==null || file.needApproveBy==[]){
        var document = new Document();
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
        document.save(function(err,result){ 
          if (err){ 
              console.log(err);
              //return res.status(422).send(['Eror from backend !']);
          } 
          else{ 
              //console.log(result) 
              tempDocument.findOneAndRemove({_id:req.params.id},(err,file)=>{
                if (!file){
                  return res.status(404).send(['File Not found !']); 
                }
                 
                else{
                  return res.status(200).send(['File Saved !']); 
                }
              }) 
             
          } 
      }) 
      }else{
        //return res.status(400).send(['eror happen !']); needApproveDoc
        tempDocument.findOne({ _id:req.params.id },(err,file)=>{
          if(err || !file){
            return res.status(404).send(['Cannot find !']);
         }else{
          var document = new approvement();
          document.name =file.name;
          document.file =file.file;
          document.type =file.type;
          document.size =file.size;
          document.category=file.category;
          document.catPath=file.catPath;
          document.subCategory=file.subCategory;
          document.needApproveBy=file.needApproveBy;
          document.department=file.department;
          document.createdBy=file.createdBy;
          document.tags=file.tags;
          document.save(function(err,result){ 
            if (err){ 
                console.log(err);
                //return res.status(422).send(['Eror from backend !']);
            } 
            else{ 
                //console.log(result) 
                tempDocument.findOneAndRemove({_id:req.params.id},(err,file)=>{
                  if (!file){
                    return res.status(404).send(['File Not found !']); 
                  }
                   
                  else{
                    return res.status(200).send(['File Saved !']); 
                  }
                }) 
               
            } 
        }) 








         }
        })

       }

   }
})
}

/*
path='./uploads/finance/paysheet2'
      var str=path.split('/');
      console.log(path)
*/

module.exports.test=(req,res,next)=>{
 // var myJSON = JSON.stringify(path);
 // var pass=JSON.parse(myJSON);
 // var str=path.split('/');
 // var Mc=str[3];
 /*  console.log(str)
   console.log(myJSON);
   console.log(path);
   console.log(pass);*/
   
 /*  for(var i=0;i<str.length;i++){
      newPath=newPath+str[i]+'/'
   }*/
  var newPath=conPath(req.params.path)
   console.log(newPath);
}

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

/*
for(var i=0;i<str.length;i++){
    newPath=newPath+str[i]+'/'
  }
*/