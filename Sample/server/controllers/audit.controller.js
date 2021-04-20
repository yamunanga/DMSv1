const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const e = require('express');
const router = e.Router();
const date = require('date-and-time');
var config = require('../config/config.json');
const fs = require('fs-extra');


const Document = mongoose.model('Document');
const arcDocument=mongoose.model('arcDocument');
const Dep=mongoose.model('Department');
const Category= mongoose.model('Category');
const User = mongoose.model('User');
const ArchivedUser = mongoose.model('archivedUser');
const approvement=mongoose.model('approvment');
const workflow=mongoose.model('workFlow');



//to pass today aded users
module.exports.getUsersToday=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    User.find({createDate:current}, 
        (err,users)=>{
            if (!users){
                 return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(users);
            }
        }).sort({createdAt: 'desc'})
}

//to pass today aded users count
module.exports.getUsersTodayCount=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    User.countDocuments({createDate:current}, 
        (err,users)=>{
            if (!users){
                 return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send([users]);
            }
        })
}


//to pass today archived users
module.exports.getArcUsersToday=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    ArchivedUser.find({createDate:current}, 
        (err,users)=>{
            if (!users){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(users);
            }
        }).sort({createdAt: 'desc'})
}
//to pass today archived users count
module.exports.getArcUsersTodayCount=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    ArchivedUser.countDocuments({createDate:current}, 
        (err,users)=>{
            if (!users){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send([users]);
            }
        })
}
//to pass today created  docs
module.exports.getDocsToday=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    Document.find({createDate:current,arcStatus:null}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(docs);
            }
        }).sort({createdAt: 'desc'})
}
//to pass today created  docs count
module.exports.getDocsTodayCount=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    Document.countDocuments({createDate:current,arcStatus:null}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send([docs]);
            }
        })
}
//to pass today manual archived docs
module.exports.getArcDocsToday=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    arcDocument.find({createDate:current,arcBy:{$ne:null}}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(docs);
            }
        }).sort({createdAt: 'desc'})
}
//to pass today manual archived docs count
module.exports.getArcDocsTodayCount=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    arcDocument.countDocuments({createDate:current,arcBy:{$ne:null}}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send([docs]);
            }
        })
}
//to pass today automatic archived docs
module.exports.getArcDocsTodayAuto=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    arcDocument.find({createDate:current,arcBy:null}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(docs);
            }
        }).sort({createdAt: 'desc'})
}
//to pass today automatic archived docs count
module.exports.getArcDocsTodayAutoCount=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    arcDocument.countDocuments({createDate:current,arcBy:null}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send([docs]);
            }
        })
}
//to pass today assaigned documents
module.exports.getAssaignedDocsToday=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    approvement.find({createDate:current}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(docs);
            }
        }).sort({createdAt: 'desc'})
}
//to pass today assaigned documents count
module.exports.getAssaignedDocsTodayCount=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    approvement.find({createDate:current}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send([docs]);
            }
        })
}

//to pass today workflowed documents
module.exports.getWorkflowedDocsToday=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    workflow.find({createDate:current}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(docs);
            }
        }).sort({createdAt: 'desc'})
}
//to pass today workflowed documents count
module.exports.getWorkflowedDocsTodayCount=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    workflow.countDocuments({createDate:current}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send([docs]);
            }
        })
}
//to pass today approved documents
module.exports.getApprovedDocsToday=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    Document.find({createDate:current,approvedBy:{$ne:null}}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(docs);
            }
        }).sort({createdAt: 'desc'})
}
//to pass today approved documents count
module.exports.getApprovedDocsTodayCount=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    Document.countDocuments({createDate:current,approvedBy:{$ne:null}}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send([docs]);
            }
        })
}
//to pass today ended workflow data
module.exports.getWorkflowedEndDocsToday=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    Document.find({workflowEndDate:current,isWorkFlowed:true}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send(docs);
            }
        }).sort({createdAt: 'desc'})
}
//to pass today ended workflow data count
module.exports.getWorkflowedEndDocsTodayCount=(req,res,next)=>{
    const now = new Date();
    var current= date.format(now, 'YYYY-M-D');
    Document.countDocuments({workflowEndDate:current,isWorkFlowed:true}, 
        (err,docs)=>{
            if (!docs){
                return res.status(404).send( 'Can not find !' );
            }else{
                return res.status(200).send([docs]);
            }
        })
}