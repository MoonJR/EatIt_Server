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
    var foodId = req.query.foodId;

    connection.query('select food_name , my_weight, my_food_index from my_info join food_list on my_info.my_food_index = food_list.food_index where user_id = ? and distinction = ? order by my_weight desc limit 10;', [myId, foodId], function (error, cursor) {
        if (cursor.length > 0) {
            res.json(cursor);
        }
        else
            res.status(503).json({result: false, reason: "Cannot find selected article"});
    });
});


module.exports = router;
