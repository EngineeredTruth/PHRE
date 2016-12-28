var app = require('./server.js');
var db = app.get('db');

module.exports = {
  loggedin: (req, res, next) => {
    return res.json({
      "test": "is working"
    })
  }
}
