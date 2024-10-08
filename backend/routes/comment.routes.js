import express from 'express';
import { CommentController } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

// Route pour créer un commentaire
commentRouter.post('/create', CommentController.createComment);

// Route pour récupérer les commentaires d'un article
commentRouter.get('/article/:articleId', CommentController.getCommentsByArticle);

// Route pour supprimer un commentaire
commentRouter.delete('/:commentId', CommentController.deleteComment);

export default commentRouter;
