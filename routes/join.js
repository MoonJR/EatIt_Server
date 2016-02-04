var pool = require('../manager/mysql').mysqlPool;
var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.post('/', function (req, res) {

    var user_id = req.body.user_id;
    var user_pw = req.body.user_pw;
    var user_birthdate = req.body.user_birthdate;
    var user_gender = req.body.user_gender;
    var user_email = req.body.user_email;

    var key = 'myKey';

    var cipher = crypto.createCipher('aes192', key);
    cipher.update(user_pw, 'utf8', 'base64');
    var cipheredOutput = cipher.final('base64');

    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(503).json({result: false, reason: 'can not get connection'});
            connection.release();
        } else {
            connection.query('insert into user_list(user_id, user_pw, user_birthdate, user_gender,user_email) values (?, ?, ?, ?, ?);', [user_id, cipheredOutput, user_birthdate, user_gender, user_email], function (error, info) {
                connection.release();
                if (!err) {
                    res.json({result: true, user_id: user_id});
                } else {
                    res.status(503).json(error);
                }
            });
        }
    });


});
module.exports = router