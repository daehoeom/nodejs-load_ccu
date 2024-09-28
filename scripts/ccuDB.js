const mysql = require('mysql2/promise');

const getRecentlyLog = async (host, database, user, password) =>
{
    const connection = await mysql.createConnection(
        {
            host : host,
            port : 3306,
            database : database,
            user : user,
            password : password,
            dateStrings : "date",
            connectTimeout : 20000,
        });

    const [rows] = await connection.query('select * from server_ccu_logs order by created_at desc limit 1');
    await connection.end();
    return rows;
};

module.exports =
{
    getRecentlyLog
};