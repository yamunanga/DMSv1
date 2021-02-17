const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const e = require('express');
const router = e.Router();
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
                        return res.status(422).send(['Eror from backend !']);
                    }
                    })

                }
                })
            }
     })
}






























module.exports.getDocs = (req, res, next) =>{
    Document.find(
        function (err, docs) {
            if (!docs)
                return res.status(404).json({ status: false, message: ' record not found.' });
            else
                return res.send(docs);
        }
    );
}

module.exports.toArchivedDocs=(req,res,next)=>{
      
}