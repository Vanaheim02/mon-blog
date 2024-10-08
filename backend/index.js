import express from 'express';
import initRoutes from './Routes/init.routes.js';
import initMiddlewares from './middlewares/index.js';

const app = express();


initMiddlewares(app);


initRoutes(app);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
