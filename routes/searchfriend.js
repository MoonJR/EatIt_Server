var pool = require('../manager/mysql').mysqlPool;
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var myId = req.query.myId;
    var friendId = req.query.friendId;

    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(503).json({result: false, reason: 'can not get connection'});
        } else {
            connection.query('select food_name, food_list.food_index from my_info join user_info join food_list on my_info.my_food_index = user_info.food_index and user_info.food_index=food_list.food_index where my_info.user_id = ? and user_info.user_id=? and my_info.my_weight > 0 and user_info.weight > 0 and food_list.distinction = 0 order by sqrt(pow(my_info.my_weight-((my_info.my_weight+user_info.weight)/2),2) + pow(user_info.weight-((my_info.my_weight+user_info.weight)/2),2)) limit 3;', [myId, friendId], function (error, cursor) {
                connection.release();
                if (cursor.length > 0) {
                    res.json(cursor);
                } else {
                    res.status(503).json({result: false, reason: "Cannot find selected article"});
                }
            });
        }
    });


});


module.exports = router;
