const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
const { consoleTable } = require("console.table");
const { printTable } = require("console-table-printer");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + db.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Roles",
        "Update Employee Role",
        "Exit",
      ],
    })

    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewEmployee();
          break;

        case "View All Departments":
          viewDepartment();
          break;

        case "View All Roles":
          viewRole();
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
