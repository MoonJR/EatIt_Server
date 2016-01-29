var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
    'host': 'simple.jongrakko.net',
    'user': 'eatit',
    'password': 'eatit123',
    'database': 'eat_it',
});

var no = "no";

router.get('/:content_id', function (req, res, next) {
    connection.query('select * from user_list where user_id=?; ', [req.params.content_id], function (error, cursor) {
        if (error == null) {
            if (cursor.length > 0) {
                no = "ok";
                res.json({check: no});
            }
            else {
                no = "no";
                res.json({check: no});
            }
        }
        else
            res.status(503).json({result: false, reason: "Cannot find selected article"});
    });
});


module.exports = router;
