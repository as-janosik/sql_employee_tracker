const express = require('express');
const sequelize = require('./config/connection');
const inquirer = require('inquirer');
//bring in classes
const DepartmentClass = require("./lib/department");
const Intern = require("./lib/Role");
const Engineer = require("./lib/Employee")
//bring in model
const dept = require("./Model/department");
const { Router } = require('express');
// const Intern = require("./Model/Role");
// const Engineer = require("./Model/Employee");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

const choiceList = [{
  type: 'list',
  message: 'What would you like to do?',
  name: 'choice',
  choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'EXIT'],
},
];
const departmentAdd = [{
  type: 'input',
  message: 'what is the department id?',
  name: 'dept_Id',
},
{
  type: 'input',
  message: 'what is the department name?',
  name: 'dept_Name',
},];

const roleAdd = [{
  type: 'input',
  message: 'what is the role id?',
  name: 'role_Id',
},
{
  type: 'input',
  message: 'what is the role title?',
  name: 'role_title',
},
{
  type: 'input',
  message: 'what is the role salary?',
  name: 'role_salary',
},
{
  type: 'input',
  message: 'what is the role department_id?',
  name: 'role_DepId',
},];

const employeeAdd = [{
  type: 'input',
  message: 'what is the employee id?',
  name: 'emp_Id',
},
{
  type: 'input',
  message: 'what is the employee first name?',
  name: 'emp_fname',
},
{
  type: 'input',
  message: 'what is the employee last name?',
  name: 'emp_lname',
},
{
  type: 'input',
  message: 'what is the employee role iD?',
  name: 'emp_roleId',
},
{
  type: 'input',
  message: 'what is the employee managers id?',
  name: 'emp_managerId',
},];

const updateRole = [{
  type: 'input',
  message: 'Please provide id of employee to update?',
  name: 'emp_up_id',
},
{
  type: 'input',
  message: 'what is the employees new role?',
  name: 'emp_up_role',
},];

// function addDept() {
//   inquirer
//     .prompt(departmentAdd)
//     .then((response) => {
//       const department = new DepartmentClass(response.id, response.name)
//       return department;
//     }
//     );
// };
function init() {
  inquirer
    .prompt(choiceList)
    .then(async (response) => {
      if (response.choice === "view all departments") {

        sequelize.query('SELECT name, id FROM department')
          .then(([rows, fields]) => {

            console.table(fields);
          })
          .catch(console.log());

        setTimeout(function () { init(); }, 5000);
      }
      else if (response.choice === "view all roles") {

        //I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        sequelize.query('SELECT title, r.id, dt.name, salary FROM role r JOIN department dt ON r.department_id = dt.id')
          .then(([rows, fields]) => {

            console.table(fields);
          })
          .catch(console.log());
        setTimeout(function () { init(); }, 5000);

      } else if (response.choice === "view all employees") {

        //I am presented with a formatted table showing employee data, including employee ids, first names, last names, job 
        //titles, departments, salaries, and managers that the employees report to
        sequelize.query('SELECT e.id,first_name,last_name, r.title, dt.name, r.salary, e.manager_id FROM employee e, role r, department dt WHERE e.role_id=r.id AND r.department_id = dt.id')
          .then(([rows, fields]) => {

            console.table(fields);
          })
          .catch(console.log());

        setTimeout(function () { init(); }, 5000);

      } else if (response.choice === "add a department") {

        inquirer
          .prompt(departmentAdd)
          .then((response) => {
            console.log(response.dept_Id, response.dept_Name)

            sequelize.query(`INSERT INTO department (id,name) VALUES (${response.dept_Id},"${response.dept_Name}")`, (err, result) => {
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              }
              res.json({
                message: 'success',
                data: body
              });
            })

          })

        //I am prompted to enter the name of the department and that department is added to the database
        setTimeout(function () { init(); }, 50000);

      } else if (response.choice === "add a role") {


        inquirer
          .prompt(roleAdd)
          .then((response) => {
            console.log(response)

            sequelize.query(`INSERT INTO role (id, title, salary, department_id) VALUES (${response.role_Id},"${response.role_title}",${response.role_salary},${response.role_DepId})`, (err, result) => {
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              }
              res.json({
                message: 'success',
                data: body
              });
            })

          })
        //funEngineer();
        //I am prompted to enter the name, salary, and department for the role and that role is added to the database
        setTimeout(function () { init(); }, 50000);

      } else if (response.choice === "add an employee") {



        inquirer
          .prompt(employeeAdd)
          .then((response) => {
            console.log(response)

            sequelize.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${response.emp_Id},"${response.emp_fname}","${response.emp_lname}",${response.emp_roleId},${response.emp_managerId})`, (err, result) => {
              if (err) {
                res.status(400).json({ error: err.message });
                return;
              }
              res.json({
                message: 'success',
                data: body
              });
            })

          })
        //funEngineer();
        //I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
        setTimeout(function () { init(); }, 50000);

      } else if (response.choice === "update an employee role") {


        inquirer
        .prompt(updateRole)
        .then((response) => {
          console.log(response)

          sequelize.query(`UPDATE employee SET role_id = ${response.emp_up_role} WHERE id = ${response.emp_up_id}`, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: body
            });
          })

        })


        
        //funEngineer();
        //I am prompted to select an employee to update and their new role and this information is updated in the database
        setTimeout(function () { init(); }, 50000);
      }
      else {
        //exit
        process.exit(1);
      }
    });
}

//Start Program
init();