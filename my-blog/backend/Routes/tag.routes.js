import express from 'express';
import { TagController } from '../Controllers/tag.controller.js';
import jwtMdlwr from '../middlewares/jwt.mdlwr.js';  // Middleware d'authentification JWT

const initTagRoutes = (app) => {
    const tagRouter = express.Router();

    // Route pour récupérer tous les tags
    tagRouter.get('/', jwtMdlwr, TagController.getAllTags);

    // Route pour ajouter un nouveau tag
    tagRouter.post('/addTag', jwtMdlwr, TagController.addTag);

    // Monter le routeur sur l'application Express
    app.use('/tags', tagRouter);
};

export default initTagRoutes;
