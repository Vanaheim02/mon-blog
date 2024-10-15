import express from 'express';
import { CategoryDb } from '../databases/category.db.js';

const categoryRouter = express.Router();

const initCategoryRoutes = (app) => {
    // Route pour récupérer toutes les catégories
    categoryRouter.get('/', CategoryDb.getAllCategory); // Correction de getAllCategories à getAllCategory

    // Route pour ajouter une nouvelle catégorie
    categoryRouter.post('/add', CategoryDb.addCategory);

    // Route pour mettre à jour une catégorie
    categoryRouter.put('/:id', CategoryDb.updateCategory);

    // Route pour supprimer une catégorie
    categoryRouter.delete('/:id', CategoryDb.deleteCategory);

    return categoryRouter;
};

export default initCategoryRoutes;
