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

var key = 'myKey';

router.post('/', function (req, res, next) {
    connection.query('select * from user_list where user_id=?;', [req.body.user_id], function (error, info) {
        if (error == null) {
            if (info.length > 0) {
                res.json({
                    result: true,
                    user_id: info[0].user_id,
                    user_pw: info[0].user_id,
                    user_gender: info[0].user_gender,
                    user_email: info[0].user_email,
                    user_birthdate: info[0].user_birthdate
                });
            }
        }
        else
            res.status(503).json(error);
    });
});
module.exports = router;
