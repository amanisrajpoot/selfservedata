const fs = require('fs')
const csvtojson = require('csvtojson')
const csvfilepath = "simple.csv"
const mysql = require("mysql");
var outputData;

const hostname = "localhost",
    username = "root",
    password = "34aman12",
    databasename = "csvtomysql"

        let con = mysql.createConnection({
            host: hostname,
            user: username,
            password: password,
            database: databasename,
        });

        csvtojson()
        .fromFile(csvfilepath)
        .then((json) => {
            console.log(json)
            outputData = json

            fs.writeFileSync("output.json", JSON.stringify(json), "utf-8", (err) => {
                if (err) console.log(err)
            })
        })

        con.connect((err) => {
            if (err) return console.error(
                'error: ' + err.message);

            con.query("DROP TABLE sample",
                (err, drop) => {

                    // Query to create table "sample"
                    var createStatament =
                        "CREATE TABLE sample(Name char(50), " +
                        "Email char(50), Age int, city char(30))"

                    // Creating table "sample"
                    con.query(createStatament, (err, drop) => {
                        if (err)
                            console.log("ERROR: ", err);
                    });
                });
        });

        function createtable(){
            for (var i = 0; i < outputData.length; i++) {
                var Name = outputData[i]["Name"],
                    Email = outputData[i]["Email"],
                    Age = outputData[i]["Age"],
                    City = outputData[i]["City"]

                var insertStatement =
                    `INSERT INTO sample values(?, ?, ?, ?)`;
                var items = [Name, Email, Age, City];

                // Inserting data of current row
                // into database
                con.query(insertStatement, items,
                    (err, results, fields) => {
                        if (err) {
                            console.log(
                                "Unable to insert item at row ", i + 1);
                            return console.log(err);
                        }
                    });
            }
            console.log(
                "All items stored into database successfully");
}

