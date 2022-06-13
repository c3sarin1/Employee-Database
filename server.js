const { response } = require('express');
const inquirer = require('inquirer');
const db = require('./lib/mysql_db');
const consoleTable = require('console.table');
const sequelize = require('./lib/mysql_db')

// Get functions
const getDepartments = require('./lib/getDepartments');
const getRole = require('./lib/getRole');
const getEmployees = require('./lib/getEmployees');
// Add functions
const addDepartment = require('./lib/addDepartment');
const addRole = require('./lib/addRole');
const addEmployee = require('./lib/addEmployee');
// Update Role function
const updateEmployeeRole = require('./lib/updateEmployee');
// Final Prompt
const finalQuestion = require('./lib/finalQuestion');

// Initial application prompt 
init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'request',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments', 
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update Employee Role'
                ]
            }
        ])

        .then(response => {
            switch (response.request) {
                // Get department table
                case 'View All Departments':
                    getDepartments()
                        .then(department => console.table(department))
                        .then(() => finalQuestion())
                        .catch((err) => console.log(err));
                break;
                // Get role table
                case 'View All Roles':
                        getRole()
                        .then(role => console.table(role))  
                        .then(()=> finalQuestion())
                        .catch((err) => console.log(err));
                break;
                // Get employee table
                case 'View All Employees':
                    getEmployees()
                        .then(employee => console.table(employee))
                        .then(() => finalQuestion())
                        .catch((err) => console.log(err));
                break;
                
                case 'Add a Department':
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'Enter new department.',
                            name: 'department'
                        }
                    ])
                    .then(response => addDepartment(response.department))
                    .then(() => finalQuestion())
                    .catch((err) => console.log(err));
                break;

                case 'Add a Role': 
                    addRole(db);
                break;

                case 'Add an Employee':
                    addEmployee(db);
                break;

                case 'Update Employee Role':
                    updateEmployeeRole(db);
                break;
               
            }; 
        });
    };


        init();