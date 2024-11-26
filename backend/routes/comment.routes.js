import express from 'express';
import { CommentController } from '../controllers/comment.controller.js';

const commentRouter = express.Router();

const initCommentRoutes = (app) => {
    // Route pour récupérer tous les commentaires
    commentRouter.get('/', express.json(), CommentController.getAllComments);

    // Route pour ajouter un nouveau commentaire
    commentRouter.post('/add', express.json(), CommentController.createComment);

    // Route pour récupérer un commentaire par son ID
    commentRouter.get('/read/:id', express.json(), CommentController.getCommentById);

    // Route pour mettre à jour un commentaire
    commentRouter.put('/update/:id', express.json(), CommentController.updateComment);

    // Route pour supprimer un commentaire
    commentRouter.delete('/delete/:id', express.json(), CommentController.deleteComment);

    // Route pour récupérer tous les commentaires d'un article
    commentRouter.get('/article/:article_id', express.json(), CommentController.getCommentsByArticle);

    // Route pour récupérer tous les commentaires d'un utilisateur
    commentRouter.get('/user/:id_user', express.json(), CommentController.getCommentsByUser);

    // Route pour la pagination des commentaires
    commentRouter.get('/pagination', express.json(), CommentController.paginateComments);

    // Route pour ajouter un like à un commentaire
    commentRouter.post('/like/:id', express.json(), CommentController.likeComment);


    app.use('/comment', commentRouter);
};

export default initCommentRoutes;

