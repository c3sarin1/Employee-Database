const db = require("./mysql_db");
const inquirer = require("inquirer");
const finalQuestion = require("./finalQuestion");


const addRole = (db) => {
    db.query('select * from department', (err, response) => {
        const departments = response.map(department =>{
            return  {
                name: department.name,
                value: department.id
            }
        }) 

    inquirer
    .prompt ([
        {
            type: 'input',
            message: 'Enter New Role Title',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter Role Salary',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What Department is this Role Under?',
            name: 'department',
            choices: departments
        }
    ])
    .then(function (response) {
       
      const query = `INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.department}')`;

    db.query(query, (err, response) => {
        if(err) {
            throw err;
        } console.table(response);
        console.log("New Role Added")
        finalQuestion();
    })
    console.log(response);
    })
  })
}


module.exports = addRole;