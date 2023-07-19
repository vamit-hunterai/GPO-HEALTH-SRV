var jwt = require('jsonwebtoken');
//const User = require('../../models/shared/user');
const User = require('../../models').User;
const config = require('../../config/common').config;

module.exports = {
    hasAccess: function(accessLevel) {
       // console.log(accessLevel)
        return function(req, res, next) {
            if(accessLevel == 'anon')  return next();
            jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
                if (err) {
                return res.status(401).json({success:false, message: err.message, err:err});
                }else{
                    User.findOne({ where: { username: decoded.username } }).then(function(user){
                        if(user) {
                            //console.log(user)
                            req.params.userId = user.username;
                            req.params.role = "user"//user.role;
                            return next();
                        }else{
                            return res.status(401).json({
                                success: false,
                                error: 'Unauthorized User'
                            });
                        }
                    });
                    
                }
            }); 
        }
    },
    verifyUserRecord:function(rec, params){
        if(params.role === config.role.ADMIN) return;
        var authorized = false;
        if(rec && rec.user && rec.user._id.toString() == params.userId){
            authorized = true;   
        }else if(rec && rec.employer && rec.employer._id.toString() == params.userId){
            authorized = true;   
        }
        if(!authorized)
        throw new Error('Unauthorized action');
    }
}