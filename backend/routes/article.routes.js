import express from 'express';
import ArticleController from '../controllers/article.controller.js';
import bodyParser from 'body-parser';

const initArticleRoutes = (app) => {
    const articleRouter = express.Router();
    const jsonParser = bodyParser.json();

    // Route de test
    articleRouter.get('/test', (req, res) => {
        res.send('Route de test fonctionne');
    });

    // Route pour ajouter une nouvelle article
    articleRouter.post('/add', jsonParser, ArticleController.addArticle);


    // Route pour mettre à jour un article
    articleRouter.put('/update/:id', jsonParser, ArticleController.updateArticle);

    // Route pour supprimer un article
    articleRouter.delete('/delete/:id', jsonParser, ArticleController.deleteArticle)

    // Pour récupérer toutes les articles
    articleRouter.get('/', jsonParser, ArticleController.listArticle)

    // Récupérer un article par son Id
    articleRouter.get('/read/:id', jsonParser, ArticleController.getArticleById);

    // Pagination des article
    articleRouter.get('/page', jsonParser, ArticleController.listPaginationArticle)

    // Recherche d'un article par utilisateur
    articleRouter.get('/search', jsonParser, ArticleController.searchArticle)



    app.use('/article', articleRouter);
};

export default initArticleRoutes;