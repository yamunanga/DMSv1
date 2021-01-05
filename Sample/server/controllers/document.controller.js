const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const e = require('express');
const router = e.Router();
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })

const Document = mongoose.model('Document');
const jwtHelper = require('../config/jwtHelper');

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