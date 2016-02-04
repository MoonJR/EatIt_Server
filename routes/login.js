var pool = require('../manager/mysql').mysqlPool;
var express = require('express');
var crypto = require('crypto');
var router = express.Router();

var ok = "no";

router.post('/', function (req, res) {
    var user_id = req.body.user_id;
    var user_pw = req.body.user_pw;
    var key = 'myKey';

    var cipher = crypto.createCipher('aes192', key);
    cipher.update(user_pw, 'utf8', 'base64');
    var cipheredOutput = cipher.final('base64');

    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(503).json({result: false, reason: 'can not get connection'});
        } else {
            connection.query('select * from user_list where user_id=? and user_pw = ?;', [user_id, cipheredOutput], function (error, info) {
                connection.release();
                if (!err) {
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
        }
    });


});
module.exports = router;