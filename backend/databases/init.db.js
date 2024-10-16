import mysql from 'mysql2';

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        return console.error('Erreur de connexion à la base de données :', err.stack);
    }
    console.log('Connecté à la base de données avec l\'ID : ', connection.threadId);
});

export default connection;
