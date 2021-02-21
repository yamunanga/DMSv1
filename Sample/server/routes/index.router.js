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
const ctrlDep=require('../controllers/department.controller');
const ctrlPost=require('../controllers/position.controller');
const ctrlTempD=require('../controllers/tempDocument.controller');
const ctrlCat=require('../controllers/category.controller');
const ctrlApprove=require('../controllers/approvement.controller');
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

//changeUserDepartment this is for change other user department
router.put('/changeDep',jwtHelper.verifyJwtToken,ctrlUser.changeUserDepartment);
//to update current user departments
router.put('/changeDepCurrent',jwtHelper.verifyJwtToken,ctrlUser.changeUserDepartmentCurrent);
//this is for change user position
router.put('/changePosition',jwtHelper.verifyJwtToken,ctrlUser.changeUserPosition);
//this is for change current user designation
router.put('/changePositionCurrent',jwtHelper.verifyJwtToken,ctrlUser.changeUserPositionCurrent);
//getUserDetailes by id for other
router.get('/getUserDetailesById/:id',jwtHelper.verifyJwtToken,ctrlUser.getUserDetailes);




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
//Document routes start
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


router.post('/postDocFile',jwtHelper.verifyJwtToken,ctrlDoc.postDocWithFile);


//Temp documents routes starts----------------------------------------------------------
router.post('/postTempDocFile/:dep/:mC',jwtHelper.verifyJwtToken,ctrlTempD.postTempDocWithFile);
router.post('/postTempDocFileSub/:path',jwtHelper.verifyJwtToken,ctrlTempD.postTempDocWithFile);
//postDocNewLocation
router.get('/changeLocation',ctrlTempD.postDocNewLocation);

//to get to view temp docs
router.get('/viewTempFiles',jwtHelper.verifyJwtToken,ctrlTempD.viewTempFiles);

//to update need approvment array
router.put('/pushNeedApprove',ctrlTempD.setApprovement);
//to del user from approvment array
router.put('/delApprovement',ctrlTempD.delApprovement);
//to delete doc from tempdoc
//deleteTempFile
router.delete('/deleteTempFile/:id',jwtHelper.verifyJwtToken,ctrlTempD.deleteTempFile);
//rename temp file
router.put('/renameTemp',ctrlTempD.renameTempFile);
//to transfer data from temp collection to document collection and needApprove collection
//.transferToDocument
router.get('/transferData/:id',ctrlTempD.transferToDocument);
//to testing purpose
router.post('/viewLog/:path',ctrlTempD.test);
//getTempCount
router.get('/getTempCount',jwtHelper.verifyJwtToken,ctrlTempD.getTempCount);
// for pass need approvement data to front end 
router.get('/getApprovementData/:id',ctrlTempD.getApprovementData);
//to post checklist data to frontend
router.get('/getCheckList/:id',jwtHelper.verifyJwtToken,ctrlTempD.getCheckList);
// to pass count of need approve array 
router.get('/getCountArr/:id',ctrlTempD.getCountApprovementData);


//Doc Approvement routes start 

//to send approvement data for assaigned admins
router.get('/getApprovementData',jwtHelper.verifyJwtToken,ctrlApprove.getApprovementDataList);
//approved doc moved to documents
router.get('/saveApprovment/:id',jwtHelper.verifyJwtToken,ctrlApprove.saveApprovementData);
//reject doc from approvment
router.put('/rejectApprovment/:id',jwtHelper.verifyJwtToken,ctrlApprove.rejectApprovementData);
//to send cound of need approvment data
router.get('/getApprovmentDataCount',jwtHelper.verifyJwtToken,ctrlApprove.getApprovmentDataCount);



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


//Department routes Started----------------------------------------------------------------------------------

//to add department
router.post('/postDep',jwtHelper.verifyJwtToken,ctrlDep.postDepartment);
//to get department list
router.get('/getDep',jwtHelper.verifyJwtToken,ctrlDep.getDepartment);
//to delete department
router.delete('/depDel/:id',jwtHelper.verifyJwtToken,ctrlDep.delDepartment);
//to put user to department
router.put('/depUser',ctrlDep.addDepartmentUser);
//To count department users  
router.get('/getCount/:id',jwtHelper.verifyJwtToken,ctrlDep.countDepUsers);
//to get departments without current departments
router.get('/getDepsWithout',jwtHelper.verifyJwtToken,ctrlDep.getDepartmentWithout);
//to get departments without current department to update other user department
router.get('/getDepOther/:id',jwtHelper.verifyJwtToken,ctrlDep.getDepartmentWithoutOther);



//this is for position/designation routes---------------------------

//to add position/designation
router.post('/postDesignation',ctrlPost.postPosition);
//to get designation list
router.get('/getDesignations',ctrlPost.getPosts);
//to delete designation
router.delete('/designationDel/:id',ctrlPost.delDesignation);

//To count department users  
router.get('/getCountDesig/:id',ctrlPost.countDesignations);

//to get position without current position to update other user position
router.get('/getPositionOther/:id',ctrlPost.getPositionWithoutOther);
//getPositionWithout current user position for update position via userprofile
router.get('/getPositionWithout',jwtHelper.verifyJwtToken,ctrlPost.getPositionWithout);






//this is for category routes------------------------------------------------------
router.post('/postCategory',ctrlCat.createCategory);
//to create sub category
router.post('/postSubCategory',ctrlCat.createSubCategory);
//to delete category
router.delete('/delCategory/:id',ctrlCat.delCategory);
//to delete subCategory
router.delete('/delsubCategory/:id',ctrlCat.delSubCategory);
//to get categories list 
router.get('/getCats/:id',ctrlCat.getCategories);
//to get sub categories list 
router.get('/getsCats/:id',ctrlCat.getSubCategories);
//to get count of categories of relevent dep
router.get('/getCatCount/:id',ctrlCat.getCategoriesCount);
//to get  sub categories inside another sub category by relevent sub category id
router.get('/getSSCat/:id',ctrlCat.getSSubCategories);
//to get subcategory count by catId getSubCategoriesCount
router.get('/getSubCategoriesCount/:id',ctrlCat.getSubCategoriesCount);
//to get count of subcategory inside of another sub category
router.get('/getSubSubCategoriesCount/:id',ctrlCat.getSubSubCategoriesCount);
module.exports = router;




