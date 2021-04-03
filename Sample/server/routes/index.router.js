const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
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
const ctrlWorkflow=require('../controllers/workflow.controller');
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
//to send department by user email
router.put('/getUserDepByMail',ctrlUser.getUserDepByMail);
//to send designation by user email
router.get('/getUserDesigByMail/:id',jwtHelper.verifyJwtToken,ctrlUser.getUserDesigByMail);

//Document Routes Start--------------------------------------------------------

router.get('/getDocs',jwtHelper.verifyJwtToken,ctrlDoc.getDocs);
router.post('/postDocFile',jwtHelper.verifyJwtToken,ctrlDoc.postDocWithFile);
//if document expire it automattically move to archivedoc
router.get('/chkDocs',ctrlDoc.checkExpiration);
//to manual  archive doc
router.get('/toArc/:id',jwtHelper.verifyJwtToken,ctrlDoc.toArchived);
//to manual restore archive doc
router.put('/fromArc/:id',jwtHelper.verifyJwtToken,ctrlDoc.fromArcDoc);
//to pass archived docs/files
router.get('/getArc',ctrlDoc.getArcDocs);
//to pass count of document schema
router.get('/getCountDocs',ctrlDoc.getCountDocs);
//to pass count of archive documents schema
router.get('/getArcCountDocs',ctrlDoc.getArcCountDocs );
//to delete an archived file
router.delete('/delArcFile/:id',ctrlDoc.delArcDoc);
//to rename file via doc list 
router.put('/renameFile',ctrlDoc.renameFile);
//to delete document/file from list
router.delete('/delDoc/:id',ctrlDoc.deleteFile);
//to extend doc expire data via list
router.put('/extendExp',ctrlDoc.extendExp);
//testing file movement
router.get('/test22',ctrlDoc.tM);
//testing crypto
router.put('/unlockDoc/:id',ctrlDoc.unlockDoc);
//to lock document
router.put('/lockDoc/:id',ctrlDoc.lockDoc);


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
//to set doc expiration date individually
router.put('/setExpSingle',jwtHelper.verifyJwtToken,ctrlTempD.setExpSingle);
//to lock temp doc
router.put('/lockTdoc/:id',ctrlTempD.lockDoc);
//to unlock temp doc
router.put('/unlockTdoc/:id',ctrlTempD.unlockDoc);


//Doc Approvement routes start ----------------------------------------------------------

//to send approvement data for assaigned admins
router.get('/getApprovementData',jwtHelper.verifyJwtToken,ctrlApprove.getApprovementDataList);
//approved doc moved to documents
router.get('/saveApprovment/:id',jwtHelper.verifyJwtToken,ctrlApprove.saveApprovementData);
//reject doc from approvment
router.put('/rejectApprovment/:id',jwtHelper.verifyJwtToken,ctrlApprove.rejectApprovementData);
//to send count of need approvment data
router.get('/getApprovmentDataCount',jwtHelper.verifyJwtToken,ctrlApprove.getApprovmentDataCount);

//Doc Workflow routes start----------------------------------------------------------------

//to send workflow data for relevent admins
router.get('/getWorkflowData',jwtHelper.verifyJwtToken,ctrlWorkflow.getWorkflowDataList);
//to sent count of workflow data
router.get('/getWorkflowDataCount',jwtHelper.verifyJwtToken,ctrlWorkflow.getWorkflowDataCount);
//to post file to workflow
router.put('/postWorkflowFile/:path',jwtHelper.verifyJwtToken,ctrlWorkflow.postWorkflowFile);
//to rename workflow file
router.put('/renameWorkflowFile',jwtHelper.verifyJwtToken,ctrlWorkflow.renameWorkflowFile);
//to process workflow
router.get('/toWorkflow/:id',jwtHelper.verifyJwtToken,ctrlWorkflow.getWorkflowProcess);
//for pass admin users for select workflow
router.get('/userForWork',jwtHelper.verifyJwtToken,ctrlWorkflow.getUsersWork);
//to add workflow to temp doc
router.put('/addWorkflow/:id',ctrlWorkflow.paasWorkflow);
//to remove user from workflow 
router.put('/delWorkflowUser/:id',ctrlWorkflow.delWorkflowUser);
//for pass workflow data to front end 
router.get('/getWorkflowData/:id',ctrlWorkflow.getWorkflowData);
//to check workflow
router.put('/chkWorkflow/:id',ctrlWorkflow.checkWorkflow);
//for pass workflow data array length to frontend
router.get('/getWorkflowDataLen/:id',ctrlWorkflow.getWorkflowDataLen);
//to lock doc via workflow
router.put('/lockWorkFile/:id',ctrlWorkflow.lockDoc);
//to unlock doc via workflow
router.put('/unlockWorkFile/:id',ctrlWorkflow.unlockDoc);

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
//post multiple attachments with message for popup use(toEmail)
router.post('/postMsgToEmail',jwtHelper.verifyJwtToken,ctrlMsg.postMessagePopupFromEmail);
//post multiple attachments with message for popup use(toId)
router.post('/postMsgToId',jwtHelper.verifyJwtToken,ctrlMsg.postMessagePopupFromId);
//view sent messages
router.get('/viewSents',jwtHelper.verifyJwtToken,ctrlMsg.viewSentMessage);
//viewRecievedMessage
router.get('/viewRecived',jwtHelper.verifyJwtToken,ctrlMsg.viewRecievedMessage);
//to delete sent message
router.put('/deleteSentMessage',jwtHelper.verifyJwtToken,ctrlMsg.deleteSentMessage);
//To delete recive message 
router.put('/deleteReciveMessage',jwtHelper.verifyJwtToken,ctrlMsg.deleteReciveMessage);
//readReciveMessage
router.put('/readReciveMessage',jwtHelper.verifyJwtToken,ctrlMsg.readReciveMessage);
// to get count of new messages for current user
router.get('/countnew',jwtHelper.verifyJwtToken,ctrlMsg.countNewMessages);








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




