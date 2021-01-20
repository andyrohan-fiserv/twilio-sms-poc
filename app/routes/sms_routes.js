var constants = require("../constants");
const https = require("https")

const ACCOUNT_SID = process.env.ACCOUNT_SID || constants.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN || constants.AUTH_TOKEN;

const twilio = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)
const MessagingResponse = require('twilio').twiml.MessagingResponse;

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


    app.post('/smsHook', (req, res) => {
        console.log(JSON.stringify({"title":"Incoming SMS", "request": req.body.Body}));
        
        //Send response to Twilio to let them know we got something.
        const twiml = new MessagingResponse();

        twiml.message('Webhook triggered.');
      
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    });
};