import express from 'express';
import { UsersController } from '../Controllers/user.controller.js';
import jwtMdlwr from '../middlewares/jwt.mdlwr.js'; // Middleware d'authentification JWT

const initUserRoutes = (app) => {
    const userRouter = express.Router();

    // Route pour créer un utilisateur
    userRouter.post('/register', UsersController.createUser);

    // Route pour se connecter
    userRouter.post('/login', UsersController.login);

    // Route pour changer de mot de passe (authentification requise)
    userRouter.put('/updatePassword', jwtMdlwr, UsersController.updatePassword);

    // Route pour supprimer un utilisateur (authentification requise)
    userRouter.delete('/deleteUser', jwtMdlwr, UsersController.deleteUser);

    // Route pour récupérer la liste personnelle de jeux de l'utilisateur (authentification requise)
    userRouter.get('/myList', jwtMdlwr, UsersController.getMyList);

    // Route pour ajouter un jeu à la liste personnelle de l'utilisateur (authentification requise)
    userRouter.post('/addToMyList', jwtMdlwr, UsersController.addToMyList);

    // Route pour supprimer un jeu de la liste personnelle de l'utilisateur (authentification requise)
    userRouter.delete('/removeFromMyList', jwtMdlwr, UsersController.removeFromMyList);

    // Monter le routeur sur l'application Express
    app.use('/users', userRouter);
};

export default initUserRoutes;
