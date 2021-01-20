var constants = require("../constants");
const https = require("https")
const twilio = require('twilio')(constants.ACCOUNT_SID, constants.AUTH_TOKEN)
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
        console.log(req.body);
        const data = JSON.stringify({"title":"Incoming SMS", "request": req.body})
        res.send(data);

        //Send response to Twilio to let them know we got something.
        const twiml = new MessagingResponse();

        twiml.message('POST: The Robots are coming! Head for the hills!');
      
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    });


    app.get('/smsHook', (req, res) => {
        console.log(req.body);
        const data = JSON.stringify({"title":"Incoming SMS", "request": req.body})
        res.send(data);

        //Send response to Twilio to let them know we got something.
        const twiml = new MessagingResponse();

        twiml.message('GET: The Robots are coming! Head for the hills!');
      
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    });
};