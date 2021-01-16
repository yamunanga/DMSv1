const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const e = require('express');
//Mailgun properties
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxfada22a1ab444cb8bc54f94ae8302c00.mailgun.org';
const mg = mailgun({apiKey:process.env.MAILGUN_APIKEY, domain: DOMAIN});
//user created properties
const User = mongoose.model('User');
const ArchivedUser = mongoose.model('archivedUser');
const Dep=mongoose.model('Department');




module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role=req.body.role; //for get role
    user.department=req.body.department;
    user.position=req.body.position;
    const{fullName,email,password,role,department,position}=req.body;
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user){
             return res.status(422).send(['Duplicate email adrress found.']);
        }else{
    
         //To send Token VIA Mailgun
           const Emailtoken=jwt.sign({fullName,email,password,role,department,position},process.env.JWT_ACC_ACTIVATE,{expiresIn:'10m'});
           //Mailgun Property
           const data = {
            from: 'noReply@hello.com',
            to:req.body.email,
            subject: 'ACCOUNT ACTIVATION LINK',
            html:
            `
            <h2>Please Activate Your Account</h2>
            </br>
            <h3>To Activate your acount please go to this link!</h3>
            </br>
            <h4> ${process.env.CLIENT_URL}/activateAccount/${Emailtoken}</h4>
            </br>
            <h3>Thank You!</h4>
            `
        };
        mg.messages().send(data, function (error, body) {
            //eror handling not don properly----------!!!!!
            if(error){
               /*return res.json({
                    //eror:err.message
                    message:'Email Server Failure !'
                })*/
                res.status(503).send(['Email Server Eror']);
            }else{
            res.status(200).send(['Email has been sent,Kindly activate your account']);
           // return res.json({message:'Email has been sent,Kindly activate your account'})
            }
        });
    }
  })
}



//After send mail to user user have to activate his account

module.exports.activateAccount = (req, res, next) =>{
    token:String;
    token=req.body.token;
    //const{token}=req.body;
    //req.body;
    if(token){
        jwt.verify(token,process.env.JWT_ACC_ACTIVATE,function(err,decodedToken){
            if(err){
                return res.status(400).send(['Incorrect or Expired link Contact Admin!']);
                //return res.status(400).json({eror:'Incorrect or Expired link.'})
            }
            const{fullName,email,password,role,department,position}=decodedToken;
            //start here
            var user = new User();
            user.fullName =fullName ;
            user.email =email ;
            user.password =password ;
            user.role=role; //for get role
            user.department=department;
            user.position=position;
            user.save((err, doc) => {
            if (!err){
                res.send(doc);
            } 
       else{
           if (err.code == 11000)
                res.status(422).send(['Email adrress Already Registerd !']);
            else
                 return next(err);
            }

            });

        })
    }else{
        return res.send(['Something went wrong !']);
        //return res.json({eror:"Something went wrong !"})
    }
}

















//ORIGINAL REGISTER USER///////////////////////////////////////////////////////////////////
/*
module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role=req.body.role; //for get role
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}
*/
//////////////////////////////////////////////////////////////////////////////////////////
//duplicated
/*
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user)
        User.findOne({ _id: req._id })
        
        return  res.status(200).json({ "token": user.generateJwt(),user : _.pick(user,['role'])}); 
            
        // unknown user or wrong password
        else return res.status(404).json(info);
    }) (req, res);
}*/
//original
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return  res.status(200).json({ "token": user.generateJwt(),user : _.pick(user,['role'])}); //to get user role
            
        // unknown user or wrong password
        else return res.status(404).json(info);
    }) (req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['_id','fullName','email','role','password']) });//im add role
        }
    );
}
//To forgot Password !

module.exports.forgotPassword = (req, res, next) =>{
    const{email}=req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(422).send(['User With this Email Does Not Exist !']);
       }
       //To send Token VIA Mailgun
       const forgetPasstoken=jwt.sign({_id:user._id},process.env.RESET_PASSWORD_KEY,{expiresIn:'20m'});
       //Mailgun Property
       const data = {
        from: 'noReply@hello.com',
        to:email,
        subject: 'RESET PASSWORD LINK',
        html:
        `
        <h2>Please Reset Your Password</h2>
        </br>
        <h3>To Reset your acount password please go to this link!</h3>
        </br>
        <h4> ${process.env.CLIENT_URL}/resetPassword/${forgetPasstoken}</h4>
        </br>
        <h3>Thank You!</h4>
        `
    };
    return user.updateOne({resetLink:forgetPasstoken},function(err,success){
        if(err){
            return res.status(422).send(['Reset Password Link Eror !']);
       }else{
         mg.messages().send(data, function (error, body) {
            //eror handling not don properly----------!!!!!
            if(error){
               /*return res.json({
                    //eror:err.message
                    message:'Email Server Failure !'
                })*/
                res.status(503).send(['Email Server Eror']);
            }else{
            res.status(200).send(['Email has been sent,Kindly follow instructions']);
           // return res.json({message:'Email has been sent,Kindly activate your account'})
            }
        });

       }

    })

    })

}
//To reset password which come from email token



exports.resetPassword=(req,res)=>{
    const{resetLink,newPass}=req.body;
    if(resetLink){
        jwt.verify(resetLink,process.env.RESET_PASSWORD_KEY,function(error,decodedData){
            if(error){
                return res.status(400).send(['Incorrect or Expired Token!']);
            }
            User.findOne({resetLink},(err,user)=>{
                if(err || !user){
                     return res.status(402).send(['User With this Token Does Not Exist !']);
                }
                else{
                    const obj={
                        password:newPass,
                        resetLink:''
                    }
                    user=_.extend(user,obj);
                    user.save((err,doc)=>{
                        if(err){
                          return res.status(422).send(['Reset Password Link Eror !']);
                        }else{
                          return res.status(200).send(['Your Paasword has been changed !']);
                        }
      
                     })
                    }
            })


        })



    }else{
        return res.status(401).send(['Authentication Eror!']);
    }
}


//To update user name
exports.updateInfo=(req,res)=>{
    const{fullName}=req.body;
    User.findOne({ _id: req._id },(err,user)=>{
        if(err || !user){
            return res.status(404).send(['User With this req Id Does Not Exist !']);
       }else{
        /*const obj1={
            fullName:fullName
        }
        user=_.extend(user,obj1);*/
        user.updateOne({fullName:fullName},function(err,doc){
            if(err){
              return res.status(422).send(['Eror from backend !']);
            }else{
              return res.status(200).send(['Your info has been changed !']);
            }

         })

       }
    })

}

// to update user password via userprofile
exports.updateUserPassword=(req,res)=>{
    const{password}=req.body;
    User.findOne({ _id: req._id },(err,user)=>{
        if(err || !user){
            return res.status(404).send(['User With this req Id Does Not Exist !']);
       }else{
        const obj1={
            password:password,
        }
        user=_.extend(user,obj1);
        user.save((err,doc)=>{
            if(err){
              return res.status(422).send(['Eror from backend !']);
            }else{
              return res.status(200).send(['Your password has been changed !']);
            }

         })

       }
    })

}

//To update user role via user profile
exports.updateUserRole=(req,res)=>{
    const{role}=req.body;
    User.findOne({ _id: req._id },(err,user)=>{
        if(err || !user){
            return res.status(404).send(['User With this req Id Does Not Exist !']);
       }else{
        /*const obj1={
            fullName:fullName
        }
        user=_.extend(user,obj1);*/
        user.updateOne({role:role},function(err,doc){
            if(err){
              return res.status(422).send(['Eror from backend !']);
            }else{
              return res.status(200).send(['Your role has been changed !']);
            }

         })

       }
    })

}

//To get all users without current user and not archived users
module.exports.getUsers = (req, res, next) =>{
    User.find( {arcStatus: {$ne:'yes'},_id:{$ne:req._id}},
        (err, users) => {
            if (!users)
                return res.status(404).json({ status: false, message: 'Error in retrieving data !' });
            else
                return res.send(users);
                //return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','role']) });//im add role
        }
    );
}

//To update user last active data

exports.updateUserActiveData=(req,res)=>{
    const{lastActive}=req.body;
    User.findOne({ _id: req._id },(err,user)=>{
        if(err || !user){
            return res.status(404).send(['User With this req Id Does Not Exist !']);
       }else{
        /*const obj1={
            fullName:fullName
        }
        user=_.extend(user,obj1);*/
        user.updateOne({lastActive:lastActive},function(err,doc){
            if(err){
              return res.status(422).send(['Eror from backend !']);
            }else{
              return res.status(200).send(['Your Last Active has been changed !']);
            }

         })

       }
    })

}
//To update user status
exports.updateUserStatus=(req,res)=>{
    const{status}=req.body;
    User.findOne({ _id: req._id },(err,user)=>{
        if(err || !user){
            return res.status(404).send(['User With this req Id Does Not Exist !']);
       }else{
        /*const obj1={
            fullName:fullName
        }
        user=_.extend(user,obj1);*/
        user.updateOne({status:status},function(err,doc){
            if(err){
              return res.status(422).send(['Eror from backend !']);
            }else{
              return res.status(200).send(['Your  Active status has been changed !']);
            }

         })

       }
    })

}

//To delete an user via user list
exports.deleteUser=(req,res)=>{
    const{_id}=req.body;
    User.findOne({ _id:_id },(err,user)=>{
        if(err || !user){
            return res.status(404).send(['User With this req Id Does Not Exist !']);
       }else{
        User.findByIdAndRemove(_id,function(err,doc){
            if(err){
              return res.status(422).send(['Eror from backend !']);
            }else{
              return res.status(200).send(['User Deleted!']);
            }

         })

       }
    })

}

//To update user role via userList
exports.updateUserRolefromList=(req,res)=>{
    const{_id,role}=req.body;
    User.findOne({ _id: _id },(err,user)=>{
        if(err || !user){
            return res.status(404).send(['User With this req Id Does Not Exist !']);
       }else{
        User.findOneAndUpdate({_id:_id},{role:role},function(err,doc){
            if(err){
              return res.status(422).send(['Eror from backend !']);
            }else{
              return res.status(200).send(['User role has been changed !']);
            }

         })
       

       }
    })

}






//Test 1
module.exports.UserInfo = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','role']) });//im add role
        }
    );
}
module.exports.findUser = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['role']) });//im add role
        }
    );
}
//To view user profile for other users
module.exports.findUserProfile = (req, res, next) =>{
    const{email}=req.body;
    User.findOne({ email:email},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','role','createdAt','lastActive','status', 'department','position']) });
        }
    );
}






//ARCHIVED USER 

module.exports.postArchivedUser=(req,res,next)=>{
    
    User.findOne({email:req.body.email},
        (err,user)=>{
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else{
               var aUser = new ArchivedUser();
               aUser.userId=user._id
               aUser.fullName=user.fullName;
               aUser.email=user.email;
               aUser.password=user.password;
               aUser.role=user.role;
               aUser.uCreatedAt=user.createdAt;
               aUser.uUpdatedAt=user.updatedAt;
               //aUser.resetLink=user.resetLink;
              // aUser.lastActive=user.lastActive;
               //aUser.status=user.status;
               aUser.saltSecret=user.saltSecret;
               aUser.save((err,doc)=>{
                if(err){
                  return res.status(422).send(['Eror from backend !']);
                }else{
                  //return res.status(200).send(['Archived users updated !']);
                  user.updateOne({arcStatus:'yes',email:null},function(err,doc){
                    if(err){
                      return res.status(423).send(['cannot update user data !']);
                    }else{
                      return res.status(200).send(['Your  Archive status has been changed !']);
                    }
        
                 })
                 

                }
    
             })


            }
        }
    )
}

//Restore user data from archived
module.exports.restoreArchivedUser=(req,res,next)=>{
    ArchivedUser.findOne({email:req.body.email},
        (err,aUser)=>{
            if (!aUser)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else{
                User.findOneAndUpdate({_id:aUser.userId},{
                   // fullName:aUser.fullName,
                    arcStatus:'no',
                    email:aUser.email,
                    // password:aUser.password,
                    //role:aUser.role,
                    //saltSecret:aUser.saltSecret
                
                },function(err,doc){
                    if(err){
                      return res.status(422).send(['Eror from backend !']);
                    }else{
                     // return res.status(200).send(['Archived user Restored !']);
                      ArchivedUser.findOneAndRemove({email:req.body.email},(err,aUser)=>{
                        if (!aUser)
                        return res.status(405).json({ status: false, message: 'Archived User record not found.' });
                        else{
                            return res.status(200).send(['Archived user Restored !']);
                        }
                      }) 
                    }
        
                 })
               


            }
        }
    )
}
//To get all archived users 
module.exports.getArchivedUsers = (req, res, next) =>{
    ArchivedUser.find( 
        function(err, users) {
            if (!users)
                return res.status(404).json({ status: false, message: 'Error in retrieving data !' });
            else
                return res.send(users);
                //return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','role']) });//im add role
        }
    );
}

//to delete user from archived
module.exports.deleteArchivedUser = (req, res, next) =>{
    ArchivedUser.findOneAndRemove({email:req.body.email},(err,aUser)=>{
        if (!aUser)
        return res.status(404).json({ status: false, message: 'Archived User record not found.' });
        else{
            //return res.status(200).send(['Archived user Delete !']);
            User.findOneAndRemove({_id:aUser.userId},(err,aUser)=>{
                if (!aUser)
                return res.status(405).json({ status: false, message: 'User record not found.' });
                else{
                    return res.status(200).send(['Archived user Delete !']);
                }
              }) 
        }
      }) 
}


/*
var user = new User();
               user.fullName=aUser.fullName;
               user.email=aUser.email;
               user.password=aUser.password;
               user.role=aUser.role;
               //aUser.resetLink=user.resetLink;
              // aUser.lastActive=user.lastActive;
               //aUser.status=user.status;
               user.saltSecret=aUser.saltSecret;
               user.save((err,user)=>{
                if(err){
                  return res.status(422).send(['Eror from backend !']);
                }else{
                  return res.status(200).send(['Archived user Restored !']);
                }
    
             })
*/

//to change user department --notwork--

module.exports.changeUserDepartmentn=(req,res,next)=>{
    var user_id =req.body._id; 
    User.findByIdAndUpdate(user_id, {department:req.body.name}, 
    function (err, docs) { 
        if (err){ 
            return res.status(404).send(['Cannot find user !']);
        } 
        else{ 
           return res.status(200).send("Department changed !");
        }
    }); 
}

//to change user designation/position--notwork--

module.exports.changeUserPositionn=(req,res,next)=>{
    var user_id =req.body._id; 
    User.findByIdAndUpdate(user_id, {position:req.body.name }, 
    function (err, docs) { 
        if (err){ 
            return res.send(err);
        } 
        else{ 
           return res.send("Position changed !");
        }
    }); 
}

//to change other user department new --working--

exports.changeUserDepartment=(req,res)=>{
    const{name}=req.body;
    User.findOne({ _id: req.body._id },(err,user)=>{
        if(err || !user){
            return res.status(404).send(['User With this req Id Does Not Exist !']);
       }else{
        user.updateOne({department:name},function(err,doc){
            if(err){
              return res.status(422).send(['Eror from backend !']);
            }else{
              return res.status(200).send(['User department has been changed !']);
            }

         })

       }
    })

}

//to change other user position new 
exports.changeUserPosition=(req,res)=>{
    const{name}=req.body;
    User.findOne({ _id: req.body._id },(err,user)=>{
        if(err || !user){
            return res.status(404).send(['User With this req Id Does Not Exist !']);
       }else{
        user.updateOne({position:name},function(err,doc){
            if(err){
              return res.status(422).send(['Eror from backend !']);
            }else{
              return res.status(200).send(['User position has been changed !']);
            }

         })

       }
    })

}