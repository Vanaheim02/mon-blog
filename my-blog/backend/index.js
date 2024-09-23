import express from 'express';
import initArticleRoutes from './Routes/article.routes.js';
import initMiddlewares from './middlewares/index.js';

const app = express();

// Initialise les middlewares
initMiddlewares(app);

// Initialise les routes
initArticleRoutes(app);

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
