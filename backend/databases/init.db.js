import mysql from 'mysql2';
import dotenv from 'dotenv';

// Charger le fichier .env
dotenv.config();

const dbConfig = {
    host: 'localhost',
    user: 'mon-blog',
    password: 'NZku_8:3,8R;kc5X',
    database: 'mon-blog'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        return console.error('Erreur de connexion à la base de données :', err.stack);
    }
    console.log('Connecté à la base de données avec l\'ID : ', connection.threadId);
});

export default connection;
