var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
    'host': 'simple.jongrakko.net',
    'user': 'eatit',
    'password': 'eatit123',
    'database': 'eat_it',
});

router.post('/', function (req, res, next) {

    var jsontext = JSON.stringify(req.body[0]);
    var contact = JSON.parse(jsontext);

    connection.query('select * from user_info where user_id= ?  and food_index=? ;', [contact.user_id, contact.food_index], function (error, info1) {
        if (error == null) {
            if (info1.length > 0) {
                var queryArray = [];
                var queryArrayTmp = [];
                for (var i = 0; i < 64; i++) {  //for문시작
                    var js = JSON.stringify(req.body[i]);
                    var con = JSON.parse(js);
                    if (con.weight > 0) {
                        queryArray.push(con.food_index);
                        queryArray.push(con.weight);
                        queryArrayTmp.push(con.food_index);
                    }

                }

                queryArray = queryArray.concat(queryArrayTmp);
                queryArray.push(contact.user_id);

                queryArray = queryArray.concat(queryArray).concat(queryArray);

                connection.query(query_my_info + query_user_info + query_food_list, queryArray, function (error2, info2) {
                    if (error2 != null) {
                        console.log(error2);
                        res.status(503).json(error);
                    }
                });


            }
            else if (info1.length <= 0) {
                console.log('test');
                for (var i = 0; i < 64; i++) {  //for문시작


                    var js = JSON.stringify(req.body[i]);
                    var con = JSON.parse(js);

                    connection.query('insert into user_info(user_id, food_index, weight, distinction) values(?,?,?,?);', [con.user_id, con.food_index, con.weight, con.distinction], function (error3, info3) {
                        if (error3 != null) {
                            console.log(error3);
                            res.status(503).json(error3);
                        }
                    });

                    connection.query('insert into my_info(user_id, my_food_index, my_weight, my_distinction) values(?,?,?,?);', [con.user_id, con.food_index, con.weight, con.distinction], function (error3, info3) {
                        if (error3 != null) {
                            console.log(error3);
                            res.status(503).json(error3);
                        }
                    });

                    connection.query('UPDATE food_list SET rank = rank + ? WHERE food_index = ? and distinction = ?; ', [con.weight, con.food_index, con.distinction], function (error3, info3) {
                        if (error3 != null) {
                            console.log(error3);
                            res.status(503).json(error3);
                        }
                    });
                }
            }
        }
        else {
            console.log(error);
            res.status(503).json(error);
        }
    });
});


var query_my_info = 'UPDATE my_info ' +
    'SET my_info.my_weight=CASE ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'WHEN my_info.my_food_index=? THEN my_info.my_weight+? ' +
    'END ' +
    'WHERE my_info.my_food_index IN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) AND my_info.user_id=?;';
var query_user_info = 'UPDATE user_info ' +
    'SET user_info.weight=CASE ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'WHEN user_info.food_index=? THEN user_info.weight+? ' +
    'END ' +
    'WHERE user_info.food_index IN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) AND user_info.user_id=?;';
var query_food_list = 'UPDATE food_list ' +
    'SET food_list.rank=CASE ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'WHEN food_list.food_index=? THEN food_list.rank+? ' +
    'END ' +
    'WHERE food_list.food_index IN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
module.exports = router;