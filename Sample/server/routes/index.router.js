const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
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
var upload = multer({ storage: storage1});
//Doc upload config over
const User = mongoose.model('User');
const Document = mongoose.model('Document');
const ctrlUser = require('../controllers/user.controller');
const ctrlDoc = require('../controllers/document.controller');
const ctrlMsg =require('../controllers/message.controller');

const jwtHelper = require('../config/jwtHelper');






//This routs for UserSchema
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);//,
router.get('/userInfo',jwtHelper.verifyJwtToken,ctrlUser.UserInfo);
//test
router.get('/findUser',jwtHelper.verifyJwtToken,ctrlUser.findUser);
router.get('/getUsers',jwtHelper.verifyJwtToken,ctrlUser.getUsers);

//register only works for authenticated users 
router.post('/reguser',jwtHelper.verifyJwtToken,ctrlUser.register);/*, (req, res) => {
    res.send('Register Works!');
}*/
router.post('/emailActivate',ctrlUser.activateAccount);
router.put('/forgot-password',ctrlUser.forgotPassword);
router.put('/reset-password',ctrlUser.resetPassword);
router.put('/updateInfo',jwtHelper.verifyJwtToken,ctrlUser.updateInfo);
router.put('/updatePass',jwtHelper.verifyJwtToken,ctrlUser.updateUserPassword);
router.put('/updateUserRole',jwtHelper.verifyJwtToken,ctrlUser.updateUserRole);
router.put('/updateUserLastActive',jwtHelper.verifyJwtToken,ctrlUser.updateUserActiveData);
router.put('/updateUserStatus',jwtHelper.verifyJwtToken,ctrlUser.updateUserStatus);
router.put('/deleteUser',jwtHelper.verifyJwtToken,ctrlUser.deleteUser);
//for update userRole via user list
router.put('/updateOtherUserRole',jwtHelper.verifyJwtToken,ctrlUser.updateUserRolefromList);
//findUserProfile
router.put('/findUserProfile',jwtHelper.verifyJwtToken,ctrlUser.findUserProfile);
/*
//routs for documentSchema
router.post('/postDoc',upload.single('file'),jwtHelper.verifyJwtToken,function (req, res, next) {
    var document = new Document();
    let nameArray= req.file.originalname.split(".");
    let name=nameArray[nameArray.length-2];
    document.name =name;
    document.file= req.file.path ;
    document.save((err, doc) => {
        if (!err)
            //res.send(doc);
            return res.status(200).send(['File Uploaded Successfully !']);
        else {
            return next(err);
                
        }

    });
    
  })*/
//Test
/*
router.post('/postDoc',upload.single('file'),jwtHelper.verifyJwtToken,function (req, res, next) {
           if(req.body.name ==''){
            var document = new Document();
           // let nameArray= req.file.originalname.split(".");
            //let name=nameArray[nameArray.length-2];
            document.name =req.file.originalname;
            document.file= req.file.path ;
            document.save((err, doc) =>{
              if (!err){
                return res.status(200).send(['File Uploaded Successfully !']);
              }else if(err){
                return next(err);
              }else{
                return res.status(422).send(['Eror from backend !']);
              }
             })
           }else{
            var document = new Document();
            document.name =req.body.name;
            document.file= req.file.path ;
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
*/

//Test2
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

router.get('/getDocs',jwtHelper.verifyJwtToken,ctrlDoc.getDocs);
//Archive user routes -------------------------------------------------------------------
//To get Archived User
router.put('/postArchivedUser',jwtHelper.verifyJwtToken,ctrlUser.postArchivedUser);
//To restore Archived User
//restoreArchivedUser
router.put('/restoreArchivedUser',jwtHelper.verifyJwtToken,ctrlUser.restoreArchivedUser);
//getArchivedUsers
router.get('/getArchivedUsers',jwtHelper.verifyJwtToken,ctrlUser.getArchivedUsers);
//for delete archived user 
router.put('/deleteArchivedUser',jwtHelper.verifyJwtToken,ctrlUser.deleteArchivedUser);


//Message Routes-----------------------------------------------------------------------------
//send message--not used--
router.post('/postmessage',jwtHelper.verifyJwtToken,ctrlMsg.postMessage);

//postMessageWithFile ---not used---
router.post('/postFile',jwtHelper.verifyJwtToken,ctrlMsg.postMessageWithFile);

//postMessageWith multiple files

router.post('/postFiles',jwtHelper.verifyJwtToken,ctrlMsg.postMessageWithFiles);






//view sent messages
router.get('/viewSents',jwtHelper.verifyJwtToken,ctrlMsg.viewSentMessage);
//view recived messages
//viewRecievedMessage
router.get('/viewRecived',jwtHelper.verifyJwtToken,ctrlMsg.viewRecievedMessage);
//to delete sent message
//deleteSentMessage
router.put('/deleteSentMessage',jwtHelper.verifyJwtToken,ctrlMsg.deleteSentMessage);
//deleteReciveMessage
//To delete recive message 
router.put('/deleteReciveMessage',jwtHelper.verifyJwtToken,ctrlMsg.deleteReciveMessage);
//readReciveMessage
router.put('/readReciveMessage',jwtHelper.verifyJwtToken,ctrlMsg.readReciveMessage);
module.exports = router;




