export const sqlite3 = require("sqlite3");

//Create a sqlite database

const Db = new sqlite3.Database('.cashbookbalance.db');

Db.serialize(()=>{

    //create table
    Db.run(`CREATE TABLE IF NOT EXIST cashbook(
        cbId INTEGER PRIMARY KEY AUTOINCREAMENT,
        CbDate TEXT,
        cbName TEXT,
        cbAmount INTEGER,
        cbTransaction_type INTEGER,
        dbDescription TEXT
    )`);
});