const db = require('./mysql_db');
const inquirer = require('inquirer')


 const finalQuestion = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'finalQuestion',
                message: 'Would you like to perform another task?',
                choices: ['Yes', 'No']
            }
        ]).then(answer => {
            if (answer.finalQuestion === 'Yes') {
                init();
            } else {
                console.log("Employee DB is up to date.");
                db.end()
            }
    });
}


module.exports = finalQuestion;