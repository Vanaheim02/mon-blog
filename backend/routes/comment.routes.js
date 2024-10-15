import express from 'express';
import { CommentController } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

const initCommentRoutes = (app) => {
    // Route pour créer un commentaire
    commentRouter.post('/create', CommentController.createComment);

    // Route pour récupérer les commentaires d'un article
    commentRouter.get('/article/:articleId', CommentController.getCommentsByArticle);

    // Route pour supprimer un commentaire
    commentRouter.delete('/:commentId', CommentController.deleteComment);

    return commentRouter; // Retourne le routeur
};

export default initCommentRoutes;

