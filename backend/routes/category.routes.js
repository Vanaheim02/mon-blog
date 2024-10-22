import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const categoryRouter = express.Router();

const initCategoryRoutes = (app) => {
    // // Route pour récupérer toutes les catégories
    // categoryRouter.get('/', CategoryController.getAllCategory);

    // Route pour ajouter une nouvelle catégorie
    categoryRouter.post('/add', jsonParser, CategoryController.addCategory);

    // // Route pour récupérer une catégorie par ID
    // categoryRouter.get('/:id', CategoryController.getCategoryById);

    // // Route pour mettre à jour une catégorie
    // categoryRouter.put('/:id', CategoryController.updateCategory);

    // // Route pour supprimer une catégorie
    // categoryRouter.delete('/:id', CategoryController.deleteCategory);

    app.use('/category', categoryRouter);
};

export default initCategoryRoutes;