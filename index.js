const express = require("express");
const sqlite3 = require("sqlite3");
const reader = require("xlsx");
// const reader = require();

//folder
// const Db= require ('./database/connectDb');
const port = 3001;

const app = express();

// app.use(Db);
const Db = new sqlite3.Database(".cashbookbalance.db");

Db.serialize(() => {
  //create table name cashbook
  //-------------------------------------
  //VOUCHER ENTRY TABLE
  Db.run(`CREATE TABLE IF NOT EXISTS voucherentry (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Date TEXT,
        VoucherNo TEXT,
        Aspect INTEGER,
        TransactionName TEXT,
        Nature TEXT,
        Type TEXT,
        TransctionAmount INTEGER,
        Description TEXT,
        BillValue INTEGER
        )`);
  //Status Table
  Db.run(`CREATE TABLE IF NOT EXISTS status(
  Id INTEGER,
  Status TEXT,
  Balance INTEGER
)`);
  //create table if need
});

const approute = express.Router();

approute.get("/", (req, res) => {
  res.send("Cash Book Maintanence");
});

//Insert data from database
function xlsxReading() {
  const file = reader.readFile("./uploadFile/forms.xlsx");
  let data = [];
  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }
  return data;
}
approute.get("/insert", (req, res) => { 
  
  const data = xlsxReading();
  console.log(data);
  
  const insertQueries = [];
  data.forEach((row, idx) => {
    let insertQuery = '';
    insertQuery = `${idx > 0 ? ', ':''}('${row.Date}','${row.VoucherNo}','${row.Aspect}','${row.TransactionName}','${row.Nature}','${row.Type}',${row.TransactionAmount},'${row.Description}',${row.BillValue})`
    insertQueries.push(insertQuery);
  });
  console.log(insertQueries);
  Db.run(
    `INSERT INTO voucherentry(Date,VoucherNo,Aspect,TransactionName,Nature,Type,TransctionAmount,Description,BillValue) VALUES ${insertQueries.join('')}`,
    (result, err) => {
      console.log(result, err);
      if (err) {
        return res
          .status(500)
          .send({ error: "Error in inserting the records" });
      } else {
        return res
          .status(201)
          .send({ message: "successful inserting the records" });
      }
    }
  );
  /*  Db.run(
      "INSERT INTO voucherentry(Date,VoucherNo,Aspect,TransactionName,Nature,Type,TransactionAmount,Description,BillValue) VALUES(?,?,?,?,?,?,?,?)",
      // [
      //   "30/09/2023",
      //   "Investment",
      //   50000,
      //   1,
      //   "capital Invesment for commencement of business",
      // ],

      [
        row.Date,
        row.VoucherNo,
        row.Aspect,
        row.TransactionName,
        row.Nature,
        row.Type,
        row.TransactionAmount,
        row.Description,
        row.BillValue,
      ],
      //err is callback function
      (err) => {
        if (err) {
          return res
            .status(500)
            .send({ error: "Error in inserting the records" });
        } else {
          return res
            .status(201)
            .send({ message: "successful inserting the records" });
        }
      }
    );
  });*/
});
//Uploading xlsx file :
approute.get("/getfile", (req, res) => {
  //Reading our test file
  const file = reader.readFile("./uploadFile/forms.xlsx");
  let data = [];
  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }
  return console.log(data);
});

// Get data from database
approute.get("/get", (req, res) => {
  const data = [];
  Db.all(`SELECT * FROM voucherentry`, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: "Error in getting the records" });
    } else {
      return res.status(200).send({ data: rows });
    }
  });
});
app.use("/", approute);

app.listen(port, () => {
  console.log("server is running successfully", port);
});
