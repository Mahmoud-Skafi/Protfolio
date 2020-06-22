var mysql = require('mysql');
let db_config = {
    host: 'localhost',
    user: 'Skafi',
    password: 'mahmoudskafi00',
    database: 'MaD',
    charset: "utf8mb4_unicode_ci"
}
let db = null;


function handleDisconnect() {
    db = mysql.createPool(db_config);
}
handleDisconnect();
exports.db = db;
exports.handleDisconnect = handleDisconnect();
console.log("DataBase../.");