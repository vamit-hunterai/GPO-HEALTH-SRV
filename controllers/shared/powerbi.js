const { Curl  } = require('node-libcurl');
const path = require('path');
const tls = require('tls')
const fs = require('fs')


module.exports = {
    powerBiAuth: async (req, res) => {
        const certFilePath = path.join(__dirname, 'cert.pem')
        const tlsData = tls.rootCertificates.join('\n')
        fs.writeFileSync(certFilePath, tlsData)

        const url = 'https://login.microsoftonline.com/common/oauth2/token';
        const opts = [
            { name: 'grant_type', contents: 'password'},
            { name: 'scope', contents: 'openid'},
            { name: 'resource', contents: 'https://analysis.windows.net/powerbi/api'},
            { name: 'client_id', contents: '6854b857-3971-46a1-a507-683701540b48'},
            { name: 'username', contents: 'test1@gpo-health.com'},
            { name: 'password', contents: 'Lov03887'},
        ];

        const curl = new Curl();
        curl.setOpt('URL', url);
        curl.setOpt('FOLLOWLOCATION', true);
        curl.setOpt('caInfo', certFilePath);
        curl.setOpt('verbose', true);
        curl.setOpt(Curl.option.HTTPPOST, opts);

        curl.on('end', function (statusCode, data, headers) {
           
            console.info(statusCode);
            console.info('---');
            console.info(data.length);
            console.info('---');
            console.info(this.getInfo('TOTAL_TIME'));
            res.render(data);
            this.close();
        });

        curl.on('error', function(err){
            console.log(err)
        });
        curl.perform();

       
    },
}

