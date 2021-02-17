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

const Department = mongoose.model('Department');
const Category= mongoose.model('Category');
const subCategory=mongoose.model('subCategory');


//to create category--working---
module.exports.createCategory=(req,res,next)=>{
    Department.findOne({_id:req.body._id},
        (err,dep)=>{
            if (!dep){
                return res.status(404).json({ status: false, message: 'Can not find !' });
            }else{
                Category.findOne({name:req.body.mC,depId:dep._id},
                    (err,cat)=>{
                        if (cat){
                            return res.status(422).send(['Duplicate Name Found!']);
                        }else{
                            let path =config.development.UPLOAD_LOCATION+dep.name+'/'+req.body.mC;
                            //fs.mkdirsSync(path);
                            var document = new Category();
                            document.name=req.body.mC.toLowerCase(),
                            document.depId=dep._id,
                            document.path=path.toLowerCase(),
                            document.save(function(err,result){ 
                                if (err){ 
                                    return res.status(422).send(['Eror from backend !']);
                                } 
                                else{ 
                                    fs.mkdirsSync(path);
                                    return res.status(200).send(['Category Created !']);
                                } 
                            }) 
                               
                           
                        }
                    })
                   
               
            }
        })
  
  }


//create sub category --work--
module.exports.createSubCategory=(req,res,next)=>{
    if(req.body.time==1){
        Category.findOne({_id:req.body._id},
            (err,cat)=>{
                if (!cat){
                    return res.status(404).send(['Can not Found!']);
                }else{
                    subCategory.findOne({name:req.body.sC,catId:cat._id},
                        (err,scat)=>{
                            if (scat){
                                return res.status(422).send(['Duplicate Name Found!']);
                            }else{
                                let path =cat.path+'/'+req.body.sC;
                                //fs.mkdirsSync(path);
                                var document = new subCategory();
                                document.name=req.body.sC.toLowerCase(),
                                document.catId=cat._id,
                                document.path=path.toLowerCase(),
                                document.save(function(err,result){ 
                                    if (err){ 
                                        return res.status(422).send(['Eror from backend !']);
                                    } 
                                    else{ 
                                        fs.mkdirsSync(path);
                                        return res.status(200).send(['Sub Category Created !']);
                                    } 
                                }) 
                                            
                               
                            }
                        })
                
                       
                   
                }
            })
    
    }else{
        subCategory.findOne({_id:req.body._id},
            (err,scat)=>{
                if (!scat){
                    return res.status(404).send(['Can not Found!']);
                }else{
                    subCategory.findOne({name:req.body.sC,subId:scat._id},
                        (err,sscat)=>{
                            if (sscat){
                                return res.status(422).send(['Duplicate Name Found!']);
                            }else{
                                let path =scat.path+'/'+req.body.sC;
                                //fs.mkdirsSync(path);
                                var document = new subCategory();
                                document.name=req.body.sC.toLowerCase(),
                                document.catId=scat.catId,
                                document.subId=scat._id,
                                document.path=path.toLowerCase(),
                                document.save(function(err,result){ 
                                    if (err){ 
                                        return res.status(422).send(['Eror from backend name must be unique !']);
                                    } 
                                    else{ 
                                        fs.mkdirsSync(path);
                                        
                                        subCategory.findOneAndUpdate({_id:req.body._id},{parent:true},function(err,doc){
                                            if(err){
                                              return res.status(422).send(['Eror from DB!']);
                                            }else{
                                              return res.status(200).send(['Sub Category Created !']);
                                            }
                                  
                                         })
                                    } 
                                }) 
                                   
                               
                            }
                        })
                       
                   
                }
            })
    }
  
}
/*
 subCategory.findOne({_id:req.body._id},
            (err,scat)=>{
                if (!scat){
                    return res.status(404).json({ status: false, message: 'Can not find !' });
                }else{
                    let path =scat.path+'/'+req.body.sC;
                    //fs.mkdirsSync(path);
                    var document = new subCategory();
                    document.name=req.body.sC.toLowerCase(),
                    document.catId=scat.catId,
                    document.subId=scat._id,
                    document.path=path.toLowerCase(),
                    document.save(function(err,result){ 
                        if (err){ 
                            return res.status(422).send(['Eror from backend name must be unique !']);
                        } 
                        else{ 
                            fs.mkdirsSync(path);
                            return res.status(200).send(['Sub Category Created !']);
                        } 
                    }) 
                       
                   
                }
            })

*/

//to delete main category--work

module.exports.delCategory=(req,res,next)=>{
    Category.findOne({_id:req.params.id},
        (err,cat)=>{
            if (!cat){
                return res.status(404).json({ status: false, message: 'Can not find !' });
            }else{
                let path =cat.path;
                //fs.mkdirsSync(path);
                subCategory.deleteMany({catId:req.params.id},(err,files)=>{
                    if (!files)
                         return res.status(404).send(['Sub Categories not find !']);
                    else{
                        //fs.removeSync(path);
                        //return res.status(200).send(['Categories Delete !']);
                        Category.findOneAndRemove({_id:req.params.id},(err,file)=>{
                            if (!file)
                                 return res.status(404).send(['Category not find !']);
                            else{
                                fs.removeSync(path);
                                return res.status(200).send(['Category Delete !']);
                            }
                           }) 
                    }
                   }) 
                   
               
            }
        })
  
  }


//to delete sub category---not fixed---
module.exports.delSubCategory=(req,res,next)=>{
    subCategory.findOne({_id:req.params.id},
        (err,scat)=>{
            if (!scat){
                return res.status(404).json({ status: false, message: 'Can not find !' });
            }else{
                if(scat.parent != true){
                    let path =scat.path;
                    subCategory.findOneAndRemove({_id:req.params.id},(err,file)=>{
                        if (!file)
                             return res.status(404).send(['Sub Category not find !']);
                        else{
                            fs.removeSync(path);
                            return res.status(200).send(['Sub Category Delete !']);
                        }
                       }) 
                }else{
                    subCategory.deleteMany({subId:scat._id},(err,files)=>{
                        if (!files)
                             return res.status(404).send(['Sub Categories not find !']);
                        else{
                            let path =scat.path;
                            //fs.removeSync(path);
                            //return res.status(200).send(['Categories Delete !']);
                            subCategory.findOneAndRemove({_id:req.params.id},(err,file)=>{
                                if (!file)
                                     return res.status(404).send(['Category not find !']);
                                else{
                                    fs.removeSync(path);
                                    return res.status(200).send(['Category Delete !']);
                                }
                               }) 
                        }
                       }) 
                }
               
            }
        })
  
  }



//to get categories by relevent department id

module.exports.getCategories=(req,res,next)=>{
    Category.find({depId:req.params.id},
        (err,cats)=>{
            if (!cats)
             return res.status(404).send(['Category not find !']);
        else{
            return res.send(cats);
         }
    }).sort({createdAt: 'desc'})
}


//to get count of categories according to relevent department


module.exports.getCategoriesCount=(req,res,next)=>{
    Category.countDocuments({depId:req.params.id},
        (err,cats)=>{
            if (err)
             return res.status(404).send(['Category not find !']);
        else{
           // return res.send(cats);
            return res.status(200).send([cats]);
         }
    })
}



//to get  sub categories by relevent category id

module.exports.getSubCategories=(req,res,next)=>{
    subCategory.find({catId:req.params.id,subId:null},
        (err,scats)=>{
            if (!scats)
             return res.status(404).send(['Category not find !']);
        else{
            return res.send(scats);
         }
    }).sort({createdAt: 'desc'})
}


//to get  sub categories inside another sub category by relevent sub category id

module.exports.getSSubCategories=(req,res,next)=>{
    subCategory.find({subId:req.params.id},
        (err,sscats)=>{
            if (!sscats)
             return res.status(404).send(['Category not find !']);
        else{
            return res.send(sscats);
         }
    }).sort({createdAt: 'desc'})
}

//to get subcategory count by catId

module.exports.getSubCategoriesCount=(req,res,next)=>{
    subCategory.countDocuments({catId:req.params.id,subId:null},
        (err,scats)=>{
            if (err)
             return res.status(404).send(['Category not find !']);
        else{
           // return res.send(cats);
            return res.status(200).send([scats]);
         }
    })
}

//to get count of subcategory inside of another sub category

module.exports.getSubSubCategoriesCount=(req,res,next)=>{
    subCategory.countDocuments({subId:req.params.id},
        (err,sscats)=>{
            if (err)
             return res.status(404).send(['Category not find !']);
        else{
           // return res.send(cats);
            return res.status(200).send([sscats]);
         }
    })
}




/*
Category.findOneAndRemove({_id:req.params.id},(err,file)=>{
                    if (!file)
                         return res.status(404).send(['Category not find !']);
                    else{
                        fs.removeSync(path);
                        return res.status(200).send(['Category Delete !']);
                    }
                   }) 
*/









  
//to create category with sub
/*

                let path =config.development.UPLOAD_LOCATION+dep.name+'/'+req.body.mC;
                //fs.mkdirsSync(path);
                var document = new Category();
                document.name=req.body.mC,
                document.depId=dep._id,
                document.path=path,
                document.save(function(err,result){ 
                    if (err){ 
                        return res.status(422).send(['Eror from backend !']);
                    } 
                    else{ 
                        fs.mkdirsSync(path);
                        return res.status(200).send(['Category Created !']);
                    } 
                }) 


*/