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
        { name: res.name },
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
        name: "department_id",
        message: "Enter department id.",
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: res.title,
          salary: res.salary || 0,
          department_id: res.department_id || 0,
        },
        function (err) {
          if (err) throw err;
          console.log("Role successfully added!");
          start();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter employee's first name.",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter employee's last name.",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the employee's role id.",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the employee's manager id.",
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.first_name,
          last_name: res.last_name,
          role_id: res.role_id || 0,
          manager_id: res.manager_id || 0,
        },
        function (err) {
          if (err) throw err;
          console.log("You have successfully added this employee!");
          start();
        }
      );
    });
};

updateEmployee = () => {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "lastName",
          message: "Which employee's role do you want to update?",
          choices: function () {
            var lastName = [];
            for (var i = 0; i < res.length; i++) {
              lastName.push(res[i].last_name);
            }
            return lastName;
          },
        },
      ])
      .then(function (res) {
        inquirer
          .prompt([
            {
              type: "input",
              name: "role",
              message: "Enter employee's new role id number",
            },
          ])
          .then(function (val) {
            db.query("UPDATE employee SET role_id = ? WHERE last_name = ?", [
              val.role,
              res.lastName,
            ]);
            console.log("Employee successfully updated!");
            start();
          });
      });
  });
};

const exit = () => {
  console.log("Completed!");
  db.end();
};

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
