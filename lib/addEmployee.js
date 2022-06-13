const db = require('./mysql_db');
const inquirer = require('inquirer')
const finalQuestion = require('./finalQuestion');
const getRole = require('./getRole');
const getEmployees = require('./getEmployees');


const addEmployee = (db) => {
    db.query('select * from role', (err, response) => {
        const roleList = response.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })

    db.query('select * from employee', (err, response) => {
        const managerList = response.map(employee => {
            return {
                 name: employee.manager_id,
                 value: employee.id
             }
        })
 
     inquirer
     .prompt([
        {
            type: 'input',
            message: 'What is employees First Name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is employees Last Name?',
            name: 'last_name'
        },
          {
              type: 'list',
              message: 'Enter employees title.',
              name: 'title',
              choices: roleList
          },
        {
          type: 'list',
          message: 'Who is the employees managerID?',
          name: 'employ_manager',
          choices: managerList
      }

      ])
      .then(response =>  {
    
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.title}', '${response.employ_manager}')`;
    
          db.query(query, (err, response) => {
            if(err) {
                throw err;
            } console.table(response);
          console.log('New employee added.'); 
          finalQuestion();
      })
      console.log(response);
    })
  })
})
}


module.exports = addEmployee;
