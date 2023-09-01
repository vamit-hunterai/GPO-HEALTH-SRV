const msal = require('@azure/msal-node');
const jwt = require('jsonwebtoken');
const { msalConfig, REDIRECT_URI } = require('../config/authConfig');
const User = require('../models').User;

class AuthProvider {
    msalConfig;

    constructor(msalConfig) {
        this.msalConfig = msalConfig;
    };

    async acquireToken(req, res) {
        try {
            const msalInstance = this.getMsalInstance(this.msalConfig);
            
            var tokenRequest = {
                "scopes": ["profile", "offline_access", "openid", "email"],
                "redirectUri":REDIRECT_URI,
                "code": req.body.code
            };
            var authCodePayLoad = {
                "code": req.body.code
            };

            const tokenResponse = await msalInstance.acquireTokenByCode(tokenRequest, authCodePayLoad)

            req.session.tokenCache = msalInstance.getTokenCache().serialize();
            req.session.accessToken = tokenResponse.accessToken;
            req.session.idToken = tokenResponse.idToken;
            req.session.idToken = tokenResponse.refreshToken;
            req.session.account = tokenResponse.account;
            console.log(tokenResponse);
            const username = tokenResponse.account.username;
            
            /*var finalObj =  {id:0, username:username};
            finalObj.token = jwt.sign({username: username}, req.app.get('secretKey'), {expiresIn: '1h'});
            //response.render(finalObj);            
            res.status(200).json(finalObj);*/


            User.findOne({ where: { username:  username } }).then(function (u) {
                if (u) {
                    var finalObj = { id: u.id, username: u.username };
                    finalObj.token = jwt.sign({ username: u.username }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.render(finalObj);
                } else {
                    User.create({ username: username, password: "" }).then(function (data) {
                        data.token = jwt.sign({ username: data.username }, req.app.get('secretKey'), { expiresIn: '1h' });
                        res.status(200).json(data)
                    });
                }
            });

        } catch (error) {
            res.status(500).json(error);            
        }
    }

    logout(options = {}) {
        return (req, res, next) => {

            let logoutUri = `${this.msalConfig.auth.authority}/oauth2/v2.0/`;

            if (options.postLogoutRedirectUri) {
                logoutUri += `logout?post_logout_redirect_uri=${options.postLogoutRedirectUri}`;
            }

            req.session.destroy(() => {
                res.redirect(logoutUri);
            });
        }
    }

    getMsalInstance(msalConfig) {
        return new msal.ConfidentialClientApplication(msalConfig);
    }
}

const authProvider = new AuthProvider(msalConfig);

module.exports = authProvider;