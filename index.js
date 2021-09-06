var DB_CONECTION = require("./urlDb");

var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require("mongodb").MongoClient;
var CONNECTION_STRING = DB_CONECTION;

var DATABASE = "testdb";
var db;

app.listen(49146, () => {
  MongoClient.connect(
    CONNECTION_STRING,
    { useNewUrlParser: true },
    (error, client) => {
      database = client.db(DATABASE);
      console.log("Mongo DB connection successful");
    }
  );
});

app.get("/", (request, response) => {
  response.send("Hello, World!");
});

app.get("/api/department", (request, response) => {
  database
    .collection("Departament")
    .find({})
    .toArray((error, result) => {
      if (error) {
        console.log(error);
      }

      response.send(result);
    });
});

app.post("/api/department", (request, response) => {
  database.collection("Departament").count({}, function (error, numOfDocs) {
    if (error) {
      console.log(error);
    }

    database.collection("Departament").insertOne({
      DepartmentId: numOfDocs + 1,
      DepartmentName: request.body["DepartmentName"],
    });

    response.send("Added Successfuly");
  });
});

app.put("/api/department", (request, response) => {
  database.collection("Departament").updateOne(
    {
      DepartmentId: request.body["DepartmentId"],
    },
    {
      $set: {
        DepartmentName: request.body["DepartmentName"],
      },
    }
  );

  response.send("Added Successfuly");
});
