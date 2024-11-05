import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const categoryRouter = express.Router();

const initCategoryRoutes = (app) => {
    // Route pour récupérer toutes les catégories
    categoryRouter.get('/', jsonParser, CategoryController.listCategory);

    // Route pour ajouter une nouvelle catégorie
    categoryRouter.post('/add', jsonParser, CategoryController.addCategory);

    // Route pour récupérer une catégorie par ID
    categoryRouter.get('/read/:id', jsonParser, CategoryController.getCategoryById);

    // // Route pour Sélectionner une catégorie parente via la catégorie parent Id
    // categoryRouter.get('/:id', jsonParser, CategoryController.getParentById);

    // // Route pour mettre à jour une catégorie
    // categoryRouter.put('/:id', jsonParser, CategoryController.getUpdateCategory);

    // // Route pour supprimer une catégorie
    // categoryRouter.delete('/:id', jsonParser, CategoryController.getDeleteCategory);

    app.use('/category', categoryRouter);
};

export default initCategoryRoutes;