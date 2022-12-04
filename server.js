const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
const { consoleTable } = require("console.table");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "employee_DB",
});

db.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + db.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Employee",
        "Add Department",
        "Add Roles",
        "Update Employee Role",
        "Exit",
      ],
    })

    .then(function (value) {
      switch (value.choices) {
        case "View All Departments":
          getDepartment();
          break;

        case "View All Roles":
          getRole();
          break;

        case "View All Employees":
          getEmployee();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Roles":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "Exit":
          exit();
          break;
      }
    });
}

const getDepartment = () => {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const getRole = () => {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const getEmployee = () => {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "Enter new department.",
    })
    .then(function (res) {
      db.query(
        "INSERT INTO department SET ?",
        { name: res.department },
        function (err) {
          if (err) throw err;
          console.log("You have successfully added this department!");
          start();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Please enter the role's title.",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter new role's salary.",
      },
      {
        type: "input",
        name: "department",
        message: "Enter department id.",
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: res.title,
          salary: res.salary || 0,
          department: res.department || 0,
        },
        function (err) {
          if (err) throw err;
          console.log("Role successfully added!");
          start();
        }
      );
    });
};
