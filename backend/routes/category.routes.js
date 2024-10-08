import express from 'express';
import { CategoryDb } from '../databases/category.db.js';

const categoryRouter = express.Router();

// Route pour récupérer toutes les catégories
categoryRouter.get('/', CategoryDb.getAllCategories);

// Route pour ajouter une nouvelle catégorie
categoryRouter.post('/add', CategoryDb.addCategory);

// Route pour mettre à jour une catégorie
categoryRouter.put('/:id', CategoryDb.updateCategory);

// Route pour supprimer une catégorie
categoryRouter.delete('/:id', CategoryDb.deleteCategory);

export default categoryRouter;
