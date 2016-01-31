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

    console.log(contact);


    var query = 'UPDATE my_info ' +
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
        'WHERE my_info.my_food_index IN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) AND my_info.user_id=?';

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
                    if (con.weight > 0) {

                        connection.query('UPDATE user_info SET weight = weight + ?  WHERE user_id = ? and food_index = ? ; ', [con.weight, con.user_id, con.food_index], function (error2, info2) {
                            if (error2 != null) {
                                console.log(error2);
                                res.status(503).json(error);
                            }
                        });

                        connection.query('UPDATE food_list SET rank = rank + ? WHERE food_index = ? ; ', [con.weight, con.food_index], function (error2, info2) {
                            if (error2 != null) {
                                console.log(error2);
                                res.status(503).json(error);
                            }
                        });
                    }
                }

                queryArray = queryArray.concat(queryArrayTmp);
                queryArray.push(contact.user_id);
                connection.query(query, queryArray, function (error2, info2) {
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
module.exports = router;