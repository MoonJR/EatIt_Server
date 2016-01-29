var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
    'host': 'simple.jongrakko.net',
    'user': 'eatit',
    'password': 'eatit123',
    'database': 'eat_it',
});
router.get('/', function (req, res, next) {
    var myId = req.query.myId;
    var friendId = req.query.friendId;

    connection.query('select food_name, food_list.food_index from my_info join user_info join food_list on my_info.my_food_index = user_info.food_index and user_info.food_index=food_list.food_index where my_info.user_id = ? and user_info.user_id=? and my_info.my_weight > 0 and user_info.weight > 0 and food_list.distinction = 0 order by sqrt(pow(my_info.my_weight-((my_info.my_weight+user_info.weight)/2),2) + pow(user_info.weight-((my_info.my_weight+user_info.weight)/2),2)) limit 3;', [myId, friendId], function (error, cursor) {
        if (cursor.length > 0) {
            res.json(cursor);
        }
        else
            res.status(503).json({result: false, reason: "Cannot find selected article"});
    });
});


module.exports = router;
