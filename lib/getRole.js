const db = require('./mysql_db');

const getRole = () => {

    return new Promise ((resolve, reject) => {
        
        db.query('SELECT * FROM role', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
        // console.log(data)
    });
}

module.exports = getRole;