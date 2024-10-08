import express from 'express';
import { UsersController } from '../controllers/user.controller.js';

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

    // Monter le routeur sur l'application Express
    app.use('/users', userRouter);
};

export default initUserRoutes;
