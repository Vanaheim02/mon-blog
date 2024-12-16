import express from 'express';
import articleController from '../controllers/article.controller.js';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const articleRouter = express.Router();

const initArticleRoutes = (app) => {
    // // Pour récupérer toutes les articles
    // articleRouter.get('/', jsonParser, ArticleController.listArticle);

    // Route pour ajouter une nouvelle article
    articleRouter.post('/add', jsonParser, articleController.addArticle);

    // // Route pour mettre à jour un article
    // articleRouter.put('/update/:id', jsonParser, ArticleController.updateArticle);

    // // Route pour supprimer un article
    // articleRouter.delete('/delete/:id', jsonParser, ArticleController.deleteArticle)

    // // Récupérer un article par son Id
    // articleRouter.get('/read-:id', jsonParser, ArticleController.getArticleById);

    // // Pagination des article
    // articleRouter.get('/page', jsonParser, ArticleController.listPaginationArticle)

    // // Recherche d'un article par utilisateur
    // articleRouter.get('/search', jsonParser, ArticleController.searchArticle)

    app.use('/article', articleRouter);
};

export default initArticleRoutes;