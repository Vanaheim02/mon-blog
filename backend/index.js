import './config.js';
import express from 'express';
import initRoutes from './routes/init.routes.js';
import initMiddlewares from './middlewares/init.mdlwr.js';

// Initialisation d'Express
const app = express();
const PORT = process.env.APP_PORT || 5000;

// Initialisation des composants
initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});