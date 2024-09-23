import { CategoryDb } from "../Databases/category.db";

const getAllCategory = async (req, res) => {
    try {
        const Category = await CategoryDb.getAllCategory();
        res.status(200).json(Category);
    } catch (err) {
        console.error("Erreur dans le contrôleur getAllCategory :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
};

const addCategory = async (req, res) => {
    const { category_name } = req.body;

    if (!category_name) {
        return res.status(400).json({ message: 'Le nom du category est requis.' });
    }

    try {
        const existingCategory = await CategoryDb.findCategoryByName(category_name);

        if (existingCategory) {
            return res.status(400).json({ message: `La category '${category_name}' existe déjà.` });
        }

        const newCategory = await CategoryDb.create(category_name);
        res.status(201).json({ message: 'La catégorie à été ajouté avec succès', category: newCategory });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la catégorie : ', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de catégorie.' });
    }
};

export const CategoryController = { getAllCategory, addCategory };
