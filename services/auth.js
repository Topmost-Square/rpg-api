const promisePool = require('../db/connection');

const register = async (email, password) => {
    const [rows, fields] = await promisePool.query(`INSERT INTO users (email, password) VALUES ('${email}', '${password}')`);

    return rows;
}

const userExists = async (email) => {
    const [ rows ] = await promisePool.query(`SELECT * FROM users WHERE email='${email}'`);

    return rows;
}

module.exports = {
    register, userExists
}