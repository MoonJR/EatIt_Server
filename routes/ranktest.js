var pool = require('../manager/mysql').mysqlPool;
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    var contact = req.body[0];

    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(503).json({result: false, reason: 'can not get connection'});
            connection.release();
        } else {
            connection.query('select * from user_info where user_id= ?  and food_index=? ;', [contact.user_id, contact.food_index], function (error, info1) {
                if (!error) {
                    if (info1.length > 0) {
                        var queryArray = [];
                        var queryArrayTmp = [];
                        for (var i = 0; i < req.body.length; i++) {  //for문시작
                            var con = req.body[i]
                            if (con.weight > 0) {
                                queryArray.push(con.food_index);
                                queryArray.push(con.weight);
                                queryArrayTmp.push(con.food_index);
                            }

                        }
                        queryArray = queryArray.concat(queryArrayTmp);
                        queryArray.push(contact.user_id);
                        queryArray = queryArray.concat(queryArray).concat(queryArray);
                        connection.query(update_query, queryArray, function (error2, info2) {
                            connection.release();
                            if (error2 != null) {
                                console.log(error2);
                                res.status(503).json(error);
                            } else {
                                res.status(200).send();
                            }
                        });
                    }
                    else {

                        var queryArray = [];
                        var queryArrayUpdate = [];
                        var queryArrayUpdateTmp = [];

                        for (var i = 0; i < req.body.length; i++) {  //for문시작
                            var con = req.body[i];

                            queryArray.push(con.user_id);
                            queryArray.push(con.food_index);
                            queryArray.push(con.weight);
                            queryArray.push(con.distinction);

                            if (con.weight > 0) {
                                queryArrayUpdate.push(con.food_index);
                                queryArrayUpdate.push(con.weight);
                                queryArrayUpdateTmp.push(con.food_index);
                            }
                        }
                        queryArrayUpdate = queryArrayUpdate.concat(queryArrayUpdateTmp);
                        var insertQuery = queryArray.concat(queryArray);
                        insertQuery = insertQuery.concat(queryArrayUpdate);

                        connection.query(insert_query, insertQuery, function (err, result) {
                            connection.release();
                            if (err) {
                                res.status(503).json(err);
                            } else {
                                res.status(200).send();
                            }
                        });
                    }
                } else {
                    connection.release();
                    res.status(503).json(error);
                }
            });
        }
    });

});

var insert_query = 'insert into user_info(user_id, food_index, weight, distinction) ' +
    'values (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?);' +
    'insert into my_info(user_id, my_food_index, my_weight, my_distinction) ' +
    'values (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),' +
    '(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?);'
    + 'UPDATE food_list ' +
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
    'WHERE food_list.food_index IN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); ';


var update_query = 'UPDATE my_info ' +
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
    'WHERE my_info.my_food_index IN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) AND my_info.user_id=?; '
    + 'UPDATE user_info ' +
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
    'WHERE user_info.food_index IN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) AND user_info.user_id=?; '
    + 'UPDATE food_list ' +
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
    'WHERE food_list.food_index IN(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); ';
module.exports = router;