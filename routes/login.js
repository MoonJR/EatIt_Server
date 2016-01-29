var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var router = express.Router();
var connection = mysql.createConnection({
    'host': 'simple.jongrakko.net',
    'user': 'eatit',
    'password': 'eatit123',
    'database': 'eat_it',
});

var ok = "no";


router.post('/', function (req, res, next) {
    var user_id = req.body.user_id;
    var user_pw = req.body.user_pw;
    var user_birthdate = req.body.user_birthdate;
    var user_gender = req.body.user_gender;
    var user_email = req.body.user_email;

    var key = 'myKey';

    var cipher = crypto.createCipher('aes192', key);
    cipher.update(user_pw, 'utf8', 'base64');
    var cipheredOutput = cipher.final('base64');

    connection.query('select * from user_list where user_id=? and user_pw = ?;', [user_id, cipheredOutput], function (error, info) {
        if (error == null) {
            if (info.length > 0) {
                ok = "ok";
                res.json({result: true, check: ok});
            }
            else {
                ok = "no";
                res.json({result: true, check: ok});
            }
        }
        else
            res.status(503).json(error);
    });
});
module.exports = router;