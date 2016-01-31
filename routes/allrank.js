var express = require('express');
var mysql = require('mysql');
var router = express.Router();


var connection = mysql.createConnection({
    'host': 'simple.jongrakko.net',
    'user': 'eatit',
    'password': 'eatit123',
    'database': 'eat_it',
});


//var dir = ["아메리카노", "블루베리 빙수", "브라우니", "버블티", "카페라떼", "과일케이크", "사탕", "치즈타르트", "초코빙수", "블루베리 타르트", "카나페", "초콜릿",
//    "츄러스", "쿠키", "솜사탕", "도넛", "에그타르트", "생과일주스", "과일차", "녹차라떼", "허니브레드", "아이스크림", "카놀리", "치즈케이크", "크레페", "젤리", "레몬머랭파이", "마카롱",
//    "망고빙수", "마쉬멜로우", "멜론빙수", "머핀", "오레오빙수", "팬케이크", "판나코타", "빼빼로", "파이", "감자칩", "프레첼", "푸딩", "팥죽", "떡", "롤케이크", "쉐이크", "슈크림",
//    "스무디", "딸기타르트", "딸기빙수", "고구마", "탕후루", "차", "티라미수", "와플", "약과", "요거트", "붕어빵", "자판기 커피", "데자와", "스콘", "핫도그", "새우깡", "닭강정", "감자튀김", "호떡"];
//
//for (var i = 0; i < dir.length; i++) {
//    connection.query('insert into food_list values(?,?,?,?)', [dir[i], i, 1, i], function (err, result) {
//        if (err)
//            console.log(err);
//        else
//            console.log(dir[i]);
//    });
//}


router.get('/:content_id', function (req, res, next) {
    connection.query('select food_name, rank, food_index from food_list where distinction = ? ' + 'order by rank desc limit 10;', [req.params.content_id], function (error, cursor) {
        if (cursor.length > 0) res.json(cursor);
        else
            res.status(503).json({result: false, reason: "Cannot find selected article"});
    });
});

module.exports = router;
