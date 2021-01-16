const mongoose = require('mongoose');
const _ = require('lodash');
const User = mongoose.model('User');
const Dep=mongoose.model('Department');
const Position=mongoose.model('Position');




//to post position/designation
module.exports.postPosition=(req,res,next)=>{
    var reqName=req.body.name;
    var name=reqName.toLowerCase();
    Position.findOne({name:name},
        (err,dep)=>{
            if (dep)
            return res.status(404).send(['Designation Already Exist !']);
        else{
            var post = new Position;
            post.name=req.body.name.toLowerCase();
            post.save((err,doc)=>{
                if(err){
                    return res.status(422).send(['Save failed !']);
                }else{
                    return res.status(200).send(['Designation Aded !']);
                }
            })
         }
    })
}


//to get designation/post list
module.exports.getPosts=(req,res,next)=>{
    Position.find(
        (err,posts)=>{
            if (!posts)
              return res.status(404).send(['Position Not Exist !']);
        else{
            return res.send(posts);
         }
    })
}

//to delete and update user designation

module.exports.delDesignation=(req,res,next)=>{
    Position.findOne({_id:req.params.id},
        (err,post)=>{
            if (!post)
            return res.status(404).send(['Position Not Exist !']);
        else{
           // return res.status(200).json({ message: 'Department removed !' });
           //return res.send(dep.name);
           User.updateMany({position:post.name},  
            {position:null}, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Updated Docs : ", docs); 
            } 
            Position.deleteOne({_id:req.params.id},
                (err,post)=>{
                    if (!post)
                    return res.status(404).send(['Designation Not Exist !']);
                else{
                    return res.status(200).send(['Designation Removed !']);
                }
            })
        }); 
        }
    })
}

//to get count users in each position
module.exports.countDesignations=(req,res,next)=>{
    Position.findOne({_id:req.params.id},
        (err,post)=>{
            if (!post)
            return res.status(404).send(['Designation Not Exist !']);
        else{
            User.find({position:post.name},
                (err,user)=>{
                    if (!user)
                        return res.status(404).send(['Not Found!']);
                else{
                    var count=user.length;
                    var n = count.toString();
                    return res.send(n);
                 }
            })
         }
    })
}

//to get position without current position to update other user position

module.exports.getPositionWithoutOther = (req, res, next) =>{
    User.findOne({_id:req.params.id},
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            }
            else{
                Position.find( {name:{$ne:user.position}},
                    (err,posts) => {
                        if (!posts)
                            return res.status(404).send(['Eror retriving data !']);
                        else
                            return res.send(posts);
                            
                    }
                );
            }
                
        }
    );
}