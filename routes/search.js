var pool = require('../manager/mysql').mysqlPool;
var express = require('express');
var router = express.Router();

var no = "no";

router.get('/:content_id', function (req, res) {

    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(503).json({result: false, reason: 'can not get connection'});
            connection.release();
        } else {
            connection.query('select * from user_list where user_id=?; ', [req.params.content_id], function (error, cursor) {
                connection.release();
                if (!error) {
                    if (cursor.length > 0) {
                        no = "ok";
                        res.json({check: no});
                    }
                    else {
                        no = "no";
                        res.json({check: no});
                    }
                } else {
                    res.status(503).json({result: false, reason: "Cannot find selected article"});
                }
            });
        }
    });


});


module.exports = router;
