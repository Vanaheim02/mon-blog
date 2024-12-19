import './config.js';
import express from 'express';
import initRoutes from './routes/init.routes.js';
import initMiddlewares from './middlewares/init.mdlwr.js';

// Initialisation d'Express
const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use((req, res, next) => {
    console.log(`[Requête reçue] Méthode: ${req.method}, URL: ${req.url}`);
    console.log('Corps de la requête :', req.body);  // Affiche le corps de la requête pour vérifier ce qui est envoyé
    next();  // Passe à la suite (les middlewares et routes)
});

// Initialisation des composants
initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});