// const User = require('../../models/shared/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var config = require('../../config/common').config;
const User = require('../../models').User;
//var ActiveDirectory = require('activedirectory');
var ActiveDirectory = require('activedirectory2').promiseWrapper;

module.exports = {
    /**
     * params: {phone, password, role} 
     * */
     authenticate: async(request, response)=>{
        try{
            if(request.body.authType == 'rest'){
                const user = await User.findOne({ where: { username: request.body.username, password:request.body.password } });
                if (user === null) {
                    response.status(401).json({
                        success: false,
                        error: 'Unauthorized User'
                    });
                } else {
                    var finalObj = {id:user.id, username:user.username};
                    finalObj.token = jwt.sign({username: user.username}, request.app.get('secretKey'), {expiresIn: '1h'});
                    
                    response.render(finalObj);
                }
            }else{
                var con = {
                    url: config.adds.url,
                    baseDN: config.adds.baseDn,
                    username: `${request.body.username}@${config.adds.domain}`,
                    password: request.body.password
                };
                var ad = new ActiveDirectory(con);
                //var username = 'gpo-health\test01';
                //var password = 'test@123';
                // Authenticate
                ad.authenticate(con.username,con.password, function(err, auth) {
                    if (err) {
                        console.log('ERROR: '+JSON.stringify(err));
                        response.render([],err,err.toString());
                        return;
                    }
                    if (auth) {
                        ad.getGroupMembershipForUser(con.username, function(err, groups) {
                            if (err) {
                              console.log('ERROR: ' +JSON.stringify(err));
                              return;
                            }
                           
                            if (! groups) console.log('User: ' + con.username + ' not found.');
                            else console.log(con.username, groups);
                        });

                       User.findOne({ where: { username: request.body.username} }).then(function(u){
                        if(u){
                            var finalObj =  {id:u.id, username:u.username};
                            finalObj.token = jwt.sign({username: u.username}, request.app.get('secretKey'), {expiresIn: '1h'});
                            response.render(finalObj);
                        }else{
                            User.create({username:request.body.username, password:""}).then(function(data) {
                                  data.token = jwt.sign({username: data.username}, request.app.get('secretKey'), {expiresIn: '1h'});
                                  response.status(200).json(data)
                            });
                        }
                       });                        
                        
                    }
                    else {
                        console.log('Authentication failed!');
                    }
                });
            }
            
        }catch(err){
            console.log(err);
            response.render([],err,err.toString());
        }
    },
    
}