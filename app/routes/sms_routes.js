var constants = require("../constants");
const https = require("https")
const twilio = require('twilio')(constants.ACCOUNT_SID, constants.AUTH_TOKEN)

module.exports = function(app) {

    app.get('/', (req, res) => {
        res.send('POC to test Twilio integrations');
    });

    app.get('/send', (req, res) => {
        twilio
            .messages
            .create({
                body: 'this is a test',
                from: `${constants.FROM_NUMBER}`,
                to: `${constants.TO_NUMBER}`
            })
            .then(message => {
                console.log(JSON.stringify(message))
                res.send('Message sent')
            })
            .done();
    });


    app.get('/test', (req, res) => {
        const data = JSON.stringify({"message":"The force is strong with this one..."})

        const options = {
            hostname: "bd4f2f566710a0820539b1bf978912bb.m.pipedream.net",
            port: 443,
            path: "/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
        
        const hookReq = https.request(options, resp => {
            let data = ""
            resp.on("data", chunk => {
              data += chunk
            })
            resp.on("end", () => {
              console.log(JSON.parse(data))
            })
        }).on("error", err => {
            console.error("[error] " + err.message)
        })

        hookReq.write(data)
        hookReq.end()
    });
};