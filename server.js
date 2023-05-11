const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "xh1394jln",
    database: "employee_info_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected" + connection.threadId);
  beginScreen();

  });
  
  function beginScreen() {
    inquirer
      .prompt({
        type: "list",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee role",
          "Quit"
        ],
        message: "Please choose an option.",
        name: "option"
      })
      .then(function(result) {
        console.log("You entered: " + result.option);
  
        switch (result.option) {
          case "Add department":
            addDepartment();
            break;
          case "Add role":
            addRole();
            break;
          case "Add employee":
            addEmployee();
            break;
          case "View departments":
            viewDepartment();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
            quit();
        }
      });
  }
  
  
  function addDepartment() {
  
  
      inquirer.prompt({
        
          type: "input",
          message: "What is the name of the department?",
          name: "deptName"
  
      }).then(function(answer){
  
  
  
          connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
              if (err) throw err;
              console.table(res)
              beginScreen()
      })
      })
  }
  
  
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter name of role.",
          name: "roleName"
        },
        {
          type: "input",
          message: "Enter salary of role.",
          name: "salaryTotal"
        },
        {
          type: "input",
          message: "Enter department ID number",
          name: "deptID"
        }
      ])
      .then(function(answer) {
  
  
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
          if (err) throw err;
          console.table(res);
          beginScreen();
        });
      });
  }
  
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter first name.",
          name: "eeFirstName"
        },
        {
          type: "input",
          message: "Enter last name.",
          name: "eeLastName"
        },
        {
          type: "input",
          message: "Enter employee ID number.",
          name: "roleID"
        },
        {
          type: "input",
          message: "Enter manager ID number.",
          name: "managerID"
        }
      ])
      .then(function(answer) {
  
        
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function(err, res) {
          if (err) throw err;
          console.table(res);
          beginScreen();
        });
      });
  }
  
  
  
  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "eeUpdate"
        },
  
        {
          type: "input",
          message: "What do you want to update to?",
          name: "updateRole"
        }
      ])
      .then(function(answer) {
       
  
        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.eeUpdate],function(err, res) {
          if (err) throw err;
          console.table(res);
          beginScreen();
        });
      });
  }
  
  function viewDepartment() {
   
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      beginScreen();
    });
    
  }
  
  function viewRoles() {
 
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      beginScreen();
    });
 
  }
  
  function viewEmployees() {
   
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      beginScreen();
    });
    
  }
  
  function quit() {
    connection.end();
    process.exit();
  }