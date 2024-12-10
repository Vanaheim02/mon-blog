import express from 'express';
import UserController from '../controllers/user.controller.js';
import bodyParser from 'body-parser';

const userRouter = express.Router();
const jsonParser = bodyParser.json();

const initUserRoutes = (app) => {

    // Route pour créer un utilisateur
    userRouter.post('/create', jsonParser, UserController.createUser);

    // Route pour mettre à jour un utilisateur
    userRouter.put('/user/:id/state', jsonParser, UserController.updateUserState);

    // Route pour créer une permission
   // userRouter.post('/createPermission', UserController.createPermission);

    // Route pour lier une permission à un profil
    //userRouter.post('/permissionProfil', UserController.permissionProfil);

    // // Route pour se connecter
    // userRouter.post('/login', jsonParser, UserController.login);

    // // Route pour changer de mot de passe
    // userRouter.put('/updatePassword', jsonParser, UserController.updatePassword);

    // // Route pour supprimer un utilisateur
    // userRouter.delete('/deleteUser', jsonParser, UserController.deleteUser);


    // Profil utilisateur

    userRouter.post('/user/:id/profile', UserController.getUserProfile);


    // Mets à jour le profil utilisateur
    //userRouter.put('/user/:id/profile', jsonParser, UserController.updateUserProfile);

    // Supprimer le profil utilisateur
    //userRouter.delete('/user/:id/profile', UserController.deleteUserProfile);
    app.use('/user', userRouter);
};

export default initUserRoutes;