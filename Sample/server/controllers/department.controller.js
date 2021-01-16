const mongoose = require('mongoose');
const _ = require('lodash');
const User = mongoose.model('User');
const Dep=mongoose.model('Department');



//to post department
module.exports.postDepartment=(req,res,next)=>{
    var reqName=req.body.name;
    var name=reqName.toLowerCase();
    Dep.findOne({name:name},
        (err,dep)=>{
            if (dep)
            return res.status(404).send(['Department Already Exist !']);
        else{
            var dep = new Dep;
            dep.name=req.body.name.toLowerCase();
            dep.save((err,doc)=>{
                if(err){
                    return res.status(422).send(['Save failed !']);
                }else{
                    return res.status(200).send(['Department Aded !']);
                }
            })
         }
    })
}

//to get department list
module.exports.getDepartment=(req,res,next)=>{
    Dep.find(
        (err,dep)=>{
            if (!dep)
              return res.status(404).send(['Department Not Exist !']);
        else{
            return res.send(dep);
         }
    })
}

//to delete department--not used--
module.exports.delDepartmentNew=(req,res,next)=>{
    Dep.deleteOne({_id:req.params.id},
        (err,dep)=>{
            if (!dep)
            return res.status(404).send(['Department Not Exist !']);
        else{
            return res.status(200).json({ message: 'Department removed !' });
        }
    })
}

//front end emplementation
/*deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
*/

//to delete and update user 

module.exports.delDepartment=(req,res,next)=>{
    Dep.findOne({_id:req.params.id},
        (err,dep)=>{
            if (!dep)
            return res.status(404).send(['Department Not Exist !']);
        else{
           // return res.status(200).json({ message: 'Department removed !' });
           //return res.send(dep.name);
           User.updateMany({department:dep.name},  
            {department:null}, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Updated Docs : ", docs); 
            } 
            Dep.deleteOne({_id:req.params.id},
                (err,dep)=>{
                    if (!dep)
                    return res.status(404).send(['Department Not Exist !']);
                else{
                    return res.status(200).json({ message: 'Department removed !' });
                }
            })
        }); 
        }
    })
}


//to add department user
module.exports.addDepartmentUser=(req,res,next)=>{
    var reqName=req.body.name;
    var name=reqName.toLowerCase();
    Dep.findOne({name:name},
        (err,dep)=>{
            if (!dep)
            return res.status(404).send(['Department Not Exist !']);
        else{
            dep.updateOne({ $push: {users:req.body.email} },function(err,doc){
                if(err){
                  return res.status(422).send(['Eror from backend !']);
                }else{
                  return res.status(200).send(['User Added to list!']);
                }
    
             })
         }
    })
}

//to get count users in each department
module.exports.countDepUsers=(req,res,next)=>{
    Dep.findOne({_id:req.params.id},
        (err,dep)=>{
            if (!dep)
            return res.status(404).send(['Department Not Exist !']);
        else{
            User.find({department:dep.name},
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

//To get all departments without current user department

module.exports.getDepartmentWithout = (req, res, next) =>{
    User.findOne({_id:req._id},
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            }
            else{
                Dep.find( {name:{$ne:user.department}},
                    (err, deps) => {
                        if (!deps)
                            return res.status(404).send(['Eror retriving data !']);
                        else
                            return res.send(deps);
                            //return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','role']) });//im add role
                    }
                );
            }
                
        }
    );
}

//to get departments without current department to update other user department

module.exports.getDepartmentWithoutOther = (req, res, next) =>{
    User.findOne({_id:req.params.id},
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            }
            else{
                Dep.find( {name:{$ne:user.department}},
                    (err, deps) => {
                        if (!deps)
                            return res.status(404).send(['Eror retriving data !']);
                        else
                            return res.send(deps);
                            
                    }
                );
            }
                
        }
    );
}