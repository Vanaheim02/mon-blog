import Database from "./init.db.js";

const CategoryDb = {
    // Fonction pour ajouter une catégorie
    addCategory: async (req, res) => {
        const categoryToAdd = req.body;

        try {
            if (!categoryToAdd || !categoryToAdd.category_name) { // Vérifie si category_name est défini
                return res.status(400).json({ message: 'Aucune catégorie à ajouter.' });
            }

            const { category_name } = categoryToAdd; // Récupération du nom de la catégorie

            // Crée une nouvelle catégorie
            const newCategory = await Database.create(category_name);

            res.status(201).json({ message: 'Catégorie ajoutée avec succès.', category: newCategory });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie : ', error);
            res.status(500).json({ error: 'Erreur lors de l\'ajout de la catégorie.' });
        }
    },

    // Contrôleur pour récupérer toutes les catégories de jeux vidéo
    getAllCategory: async (req, res) => { // Correction ici pour assurer l'uniformité
        try {
            const categories = await Database.readAll(); // Récupère toutes les catégories

            res.status(200).json(categories);
        } catch (err) {
            console.error("Erreur dans le contrôleur getAllCategory :", err);
            res.status(500).json({ error: "Erreur serveur." });
        }
    },

    // Contrôleur pour mettre à jour une catégorie
    updateCategory: async (req, res) => {
        const id_category = req.params.id;
        const updatedCategory = req.body;

        try {
            // Vérifie que category_name est défini dans updatedCategory
            const { category_name } = updatedCategory;

            // Met à jour la catégorie
            await Database.update(id_category, category_name);

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
            await Database.remove(id_category);
            res.status(200).json({ message: 'Catégorie supprimée avec succès.' });
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie : ', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie.' });
        }
    }
};

export { CategoryDb };
