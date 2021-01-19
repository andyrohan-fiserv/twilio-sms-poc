const routes = require('./sms_routes.js');

module.exports = function(app) {
    routes(app);
};