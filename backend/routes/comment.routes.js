import express from 'express';
import CommentController from '../controllers/comment.controller.js'
import bodyParser from 'body-parser';



const jsonParser = bodyParser.json()
const commentRouter = express.Router();


const initCommentRoutes = (app) => {
    // Route pour récupérer tous les commentaires
   // commentRouter.get('/', jsonParser, CommentController.getAllComments);

    // Route pour ajouter un nouveau commentaire
    commentRouter.post('/add', jsonParser, CommentController.addComment)

    // Route pour récupérer un commentaire par son ID
   // commentRouter.get('/read/:id', jsonParser, CommentController.getCommentById);

    // Route pour mettre à jour un commentaire
   // commentRouter.put('/update/:id', jsonParser, CommentController.updateComment);

    // Route pour supprimer un commentaire
   // commentRouter.delete('/delete/:id',jsonParser, CommentController.deleteComment);

    app.use('/comment', commentRouter);
};

export default initCommentRoutes;

