import express from 'express';
import { CategoryDb } from '../Databases/category.db.js';
import { jwtMdlwr } from '../middlewares/jwt.mdlwr.js';

const categoryRouter = express.Router();

// Route pour récupérer toutes les catégories
categoryRouter.get('/', jwtMdlwr, CategoryDb.getAllCategories);

// Route pour ajouter une nouvelle catégorie
categoryRouter.post('/add', jwtMdlwr, CategoryDb.addCategory);

// Route pour mettre à jour une catégorie
categoryRouter.put('/:id', jwtMdlwr, CategoryDb.updateCategory);

// Route pour supprimer une catégorie
categoryRouter.delete('/:id', jwtMdlwr, CategoryDb.deleteCategory);

export default categoryRouter;
