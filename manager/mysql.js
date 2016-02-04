/**
 * Created by MoonJR on 2016. 2. 3..
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 30,
    host: 'simple.jongrakko.net',
    user: 'eatit',
    password: 'eatit123',
    database: 'simple_memo',
    multipleStatements: true

});

exports.mysqlPool = pool;
