const db = require('./mysql_db');
  
 
const addDepartment = (name) => {

  return new Promise ((resolve, reject) => {
      
          db.query(`INSERT INTO department (name) VALUES (?)`, name, (err, data) => {
          if (err) {
              return reject(err);
          }
          resolve(console.log('New department added.'));
      });
      });
  };


module.exports = addDepartment;