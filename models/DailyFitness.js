'use strict';
var cradle = require('cradle');
//var config = require('../config.js');
var db = new(cradle.Connection)().database('test');


var isExists = function () {
    db.exists(function (err, exists) {
        if (err) {
          console.log('error', err);
        } else if (exists) {
          console.log('the force is with you.');
        } else {
          console.log('database does not exists.');
          db.create();
        }
      });
};



module.exports = {
    isExists:isExists,
    //getDocument:getDocument,
    //getAll:getAll
};
