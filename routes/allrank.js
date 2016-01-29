var express = require('express');
var mysql = require('mysql');
var router = express.Router();


var connection = mysql.createConnection({
    'host': 'simple.jongrakko.net',
    'user': 'eatit',
    'password': 'eatit123',
    'database': 'eat_it',
});

router.get('/:content_id', function (req, res, next) {
    connection.query('select food_name, rank, food_index from food_list where distinction = ? ' + 'order by rank desc limit 10;', [req.params.content_id], function (error, cursor) {
        if (cursor.length > 0) res.json(cursor);
        else
            res.status(503).json({result: false, reason: "Cannot find selected article"});
    });
});

module.exports = router;
