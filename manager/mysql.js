/**
 * Created by MoonJR on 2016. 2. 3..
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 30,
    host: 'simple.jongrakko.net',
    user: 'eatit',
    password: 'eatit123',
    database: 'eat_it',
    multipleStatements: true
});

exports.mysqlPool = pool;
