import express from 'express';
import { ArticleController } from '../controllers/article.controller.js';

const initArticleRoutes = (app) => {
    const articleRouter = express.Router();

    // Route de test
    articleRouter.get('/test', (req, res) => {
        console.log('yo');
        res.send('Route de test fonctionne');
    });

    // // Définir les routes des articles
    // articleRouter.get('/:id', ArticleController.getArticleById);

    // articleRouter.post('/addArticle', ArticleController.createArticle);

    // articleRouter.put('/:id', ArticleController.updateArticle);

    // articleRouter.delete('/:id', ArticleController.deleteArticle);

    app.use('/article', articleRouter);
};

export default initArticleRoutes;