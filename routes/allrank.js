var pool = require('../manager/mysql').mysqlPool;
var express = require('express');
var router = express.Router();

router.get('/:content_id', function (req, res) {

    pool.getConnection(function (err, connection) {
        if (err) {
            res.statusCode(503).json({result: false, reason: 'can not get connection'});
            connection.release();
        } else {
            connection.query('select food_name, rank, food_index from food_list where distinction = ? ' + 'order by rank desc limit 10;', [req.params.content_id], function (error, cursor) {
                connection.release();
                if (cursor.length > 0)
                    res.json(cursor);
                else
                    res.status(503).json({result: false, reason: "Cannot find selected article"});
            });
        }
    });

});

module.exports = router;
