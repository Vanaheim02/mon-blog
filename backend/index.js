import './config.js';
import express from 'express';
import initRoutes from './routes/init.routes.js';
import initMiddlewares from './middlewares/init.mdlwr.js';

// Initialisation d'Express
const app = express();

// Initialisation des composants
initMiddlewares(app);
initRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});