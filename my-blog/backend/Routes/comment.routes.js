import express from 'express';
import { CommentController } from '../Controllers/comment.controller.js';
import jwtMdlwr from '../middlewares/jwt.mdlwr.js';
import checkAdmin from '../middlewares/check.admin.js';

const commentRouter = express.Router();

// Route pour créer un commentaire
commentRouter.post('/create', jwtMdlwr, CommentController.createComment);

// Route pour récupérer les commentaires d'un article
commentRouter.get('/article/:articleId', CommentController.getCommentsByArticle);

// Route pour supprimer un commentaire
commentRouter.delete('/:commentId', jwtMdlwr, checkAdmin, CommentController.deleteComment);

export default commentRouter;
