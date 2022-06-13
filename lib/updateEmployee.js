const db = require('./mysql_db');
const inquirer = require('inquirer')
const finalQuestion = require('./finalQuestion');
const getEmployees = require('./getEmployees');
const { response } = require('express');

const updateEmployeeRole = (db) => {

    db.query('select * from employee', (err, response) => {
        const employee = response.map(employee => {
            return {
                name: employee.first_name,
                value: employee.id
            }
        })

    db.query('select * from role', (err, response) => {
        const role = response.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })

        inquirer
        .prompt ([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Enter Id of Employee you would like to update.',
                choices: employee
            },
            {
                type: 'list',
                name: 'updateRole',
                message: 'Enter Id of Employee you would like to update.',
                choices: role

            }
        ])

        .then(function (response) {

            const query = `UPDATE employee SET role_id = ${response.updateRole} WHERE id = ${response.employeeId}`;

        db.query(query, (err, response) => {
            if(err) {
                throw err;
            }
            console.table(response);
            console.log('Employee Role Updated')
            finalQuestion();
        })
        console.log(response);
        })
    })
})
}

module.exports = updateEmployeeRole;