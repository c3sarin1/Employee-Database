const db = require('./mysql_db');

const getEmployees = () => {

    return new Promise ((resolve, reject) => {

        // Joining role table to employee table 
        
        db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id;", (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
        // console.log(data)
    });
}

module.exports = getEmployees;