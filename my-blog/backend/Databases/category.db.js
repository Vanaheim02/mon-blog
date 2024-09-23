import Database from "./init.db.js";

const CategoryDb = {
    addCategory: async (req, res) => {
        const categoryToAdd = req.body;

        try {
            if (!categoryToAdd || !categoryToAdd.nom) {
                return res.status(400).json({ message: 'Aucune catégorie à ajouter.' });
            }

            const { category_name } = categoryToAdd;

            // Créez une nouvelle catégorie
            const newCategory = await Database.create(category_name);

            res.status(201).json({ message: 'Catégorie ajoutée avec succès.', category: newCategory });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de catégories : ', error);
            res.status(500).json({ error: 'Erreur lors de l\'ajout de catégories.' });
        }
    },

    // Contrôleur pour récupérer toutes les catégories de jeux vidéo
    getAllCategories: async (req, res) => {
        try {
            const categories = await Database.readAll();

            res.status(200).json(categories);
        } catch (err) {
            console.error("Erreur dans le contrôleur getAllCategories :", err);
            res.status(500).json({ error: "Erreur serveur." });
        }
    },

    // Contrôleur pour mettre à jour une catégorie
    updateCategory: async (req, res) => {
        const id_category = req.params.id;
        const updatedCategory = req.body;

        try {
            // Assurez-vous que category_name est défini dans updatedCategory
            const { category_name } = updatedCategory;

            // Mettez à jour la catégorie
            await Database.update(id_category, category_name); // Utilisez category_name ici

            res.status(200).json({ message: 'Catégorie mise à jour avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la catégorie : ', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie.' });
        }
    },

    // Contrôleur pour supprimer une catégorie
    deleteCategory: async (req, res) => {
        const id_category = req.params.id;

        try {
            // Supprimez la catégorie
            await Database.remove(id_category);

            res.status(200).json({ message: 'Catégorie supprimée avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie : ', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie.' });
        }
    }
}

export { CategoryDb };