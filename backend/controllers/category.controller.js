import CategoryDb from '../databases/category.db.js';

const CategoryController = {
    addCategory: async (req, res) => {
        const { name, parent } = req.body;



        // Vérifie le nom
        if (!name || name.length === 0) {
            return res.status(400).json({ error: "Le nom de la catégorie est requis." });
        }

        // Vérifie que le nom n'existe pas déjà
        const exists = await CategoryDb.categoryExists(name);
        if (exists) {
            return res.status(400).json({ error: "Le nom de la catégorie existe déjà." });
        }

        // Vérification du parent
        if (parent !== null) {
            if (!Number.isInteger(parent)) {
                return res.status(400).json({ error: "L'identifiant de la catégorie parent doit être un entier." });
            }

            // Vérifie si la catégorie parente existe
            const parentExists = await CategoryDb.categoryExistsById(parent);
            if (!parentExists) {
                return res.status(400).json({ error: "La catégorie parent n'existe pas." });
            }
        }

        // Ajout de la catégorie
        try {
            await CategoryDb.addCategory(name, parent);
            return res.status(201).json({ message: "Catégorie ajoutée avec succès." });
        } catch (error) {

            return res.status(500).json({ error: "Erreur lors de l'ajout de la catégorie." });
        }
    },
};







// // Ajouter toutes les catégories
// addAllCategory: async (req, res) => {
//     try {
//         await CategoryDb.addAllCategory();
//         res.status(201).json({ message: "Toutes les catégories ont été ajoutées avec succès." });
//     } catch (error) {
//         console.error('Erreur lors de l\'ajout des catégories :', error);
//         res.status(500).json({ error: "Erreur lors de l'ajout des catégories." });
//     }
// },

// // Récupérer toutes les catégories
// getAllCategory: async (req, res) => {
//     try {
//         const categories = await CategoryDb.getAllCategory();
//         res.status(200).json(categories);
//     } catch (error) {
//         console.error('Erreur lors de la récupération des catégories :', error);
//         res.status(500).json({ error: "Erreur lors de la récupération des catégories." });
//     }
// },

// // Récupérer une catégorie par ID
// getCategoryById: async (req, res) => {
//     const category_id = req.params.id;
//     try {
//         const category = await CategoryDb.getCategoryById(category_id);
//         if (!category) {
//             return res.status(404).json({ message: "Catégorie non trouvée." });
//         }
//         res.status(200).json(category);
//     } catch (error) {
//         console.error('Erreur lors de la récupération de la catégorie :', error);
//         res.status(500).json({ error: "Erreur lors de la récupération de la catégorie." });
//     }
// },

// // Mettre à jour une catégorie
// updateCategory: async (req, res) => {
//     const category_id = req.params.id;
//     const updatedCategory = req.body;

//     try {
//         await CategoryDb.updateCategory(category_id, updatedCategory);
//         res.status(200).json({ message: "Catégorie mise à jour avec succès." });
//     } catch (error) {
//         console.error('Erreur lors de la mise à jour de la catégorie :', error);
//         res.status(500).json({ error: "Erreur lors de la mise à jour de la catégorie." });
//     }
// },

// // Supprimer une catégorie
// deleteCategory: async (req, res) => {
//     const category_id = req.params.id;

//     try {
//         await CategoryDb.deleteCategory(category_id);
//         res.status(200).json({ message: "Catégorie supprimée avec succès." });
//     } catch (error) {
//         console.error('Erreur lors de la suppression de la catégorie :', error);
//         res.status(500).json({ error: "Erreur lors de la suppression de la catégorie." });
//     }
// }
;

export default CategoryController;
