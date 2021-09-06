var DB_CONECTION = require("./urlDb");

var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fileUpload = require("express-fileupload");
var fs = require("fs");
app.use(fileUpload());
app.use("/Photos", Express.static(__dirname + "/Photos"));

var cors = require("cors");
app.use(cors());

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
  response.json("Hello, World!");
});

// Department

app.get("/api/department", (request, response) => {
  database
    .collection("Departament")
    .find({})
    .toArray((error, result) => {
      if (error) {
        console.log(error);
      }

      response.json(result);
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

    response.json("Added Successfuly");
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

  response.json("Added Successfuly");
});

app.delete("/api/department/:id", (request, response) => {
  database
    .collection("Departament")
    .deleteOne({ DepartmentId: parseInt(request.params.id) });

  response.json("Delete Successfuly");
});

// Employee

app.get("/api/employee", (request, response) => {
  database
    .collection("Employee")
    .find({})
    .toArray((error, result) => {
      if (error) {
        console.log(error);
      }

      response.json(result);
    });
});

app.post("/api/employee", (request, response) => {
  database.collection("Employee").count({}, function (error, numOfDocs) {
    if (error) {
      console.log(error);
    }

    database.collection("Employee").insertOne({
      EmployeeId: numOfDocs + 1,
      EmployeeName: request.body["EmployeeName"],
      Department: request.body["Department"],
      DateOfJoining: request.body["DateOfJoining"],
      PhotoFileNAme: request.body["PhotoFileNAme"],
    });

    response.json("Added Successfuly");
  });
});

app.put("/api/employee", (request, response) => {
  database.collection("Employee").updateOne(
    {
      EmployeeId: request.body["EmployeeId"],
    },
    {
      $set: {
        EmployeeName: request.body["EmployeeName"],
        Department: request.body["Department"],
        DateOfJoining: request.body["DateOfJoining"],
        PhotoFileNAme: request.body["PhotoFileNAme"],
      },
    }
  );

  response.json("Added Successfuly");
});

app.delete("/api/employee/:id", (request, response) => {
  database
    .collection("Employee")
    .deleteOne({ EmployeeId: parseInt(request.params.id) });

  response.json("Delete Successfuly");
});

app.post("/api/employee/savefile", (request, response) => {
  fs.writeFile(
    "./Photos/" + request.files.file.name,
    request.files.file.data,
    function (err) {
      if (err) {
        console.log(err);
      }
      response.json(request.files.file.name);
    }
  );
});
