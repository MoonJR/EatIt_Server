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

    connection.query('insert into user_list(user_id, user_pw, user_birthdate, user_gender,user_email) values (?, ?, ?, ?, ?);', [user_id, cipheredOutput, user_birthdate, user_gender, user_email], function (error, info) {
        if (error == null) {
            connection.query('select * from user_list where user_id=?;', [info.insertId], function (error, cursor) {
                if (cursor.length > 0) {
                    res.json({result: true, user_id: cursor[0].user_id});
                }
                else {
                    console.log(error);
                    res.status(503).json({result: false, reason: "Cannot post article"});
                }
            });
        }
        else {
            console.log(error);
            res.status(503).json(error);
        }
    });
});
module.exports = router