var pool = require('../manager/mysql').mysqlPool;
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var myId = req.query.myId;
    var foodId = req.query.foodId;

    pool.getConnection(function (err, connection) {
        if (err) {
            res.statusCode(503).json({result: false, reason: 'can not get connection'});
            connection.release();
        } else {
            connection.query('select food_name , my_weight, my_food_index from my_info join food_list on my_info.my_food_index = food_list.food_index where user_id = ? and distinction = ? order by my_weight desc limit 10;', [myId, foodId], function (error, cursor) {
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
