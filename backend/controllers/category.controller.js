import CategoryDb from '../databases/category.db.js';

const CategoryController = {
    addCategory: async (req, res) => {
        try {
            const { name, parent } = req.body;
            await CategoryDb.addCategory(name, parent);
            return res.status(201).json({ message: "Catégorie ajoutée avec succès." });
        } catch (error) {
            if (process.env.APP_ENV == 'dev') {
                console.error('Erreur lors de l\'ajout de la catégorie :', error);
            }
            return res.status(500).json({ error: "Erreur lors de l'ajout de la catégorie." });
        }
    },
    // Vérifie le nom d'une catégorie
    checkCategory: async (req, res) => {
        try {
            const { name, parent } = req.body;
            await CategoryDb.checkCategory(name, parent);
            return res.status(200).json({ message: "Le nom de la catégorie est valide" });
        } catch (error) {
            console.error("Erreur lors de la vérification de la catégorie");
            return res.status(500).json({ error: "Erreur lors de la verification de la categorie" });
        }
    },
    // Vérifie si le nom de la catégorie existe
    categoryExists: async (req, res) => {
        try {
            const { name, category } = req.body;
            if (!category || !name) {
                return res.status(400).json({ message: "Les champs 'name' et 'category' sont requis." });
            }
            const exists = await CategoryDb.checkCategory(name, category);
            return res.status(200).json({ exists });
        } catch (error) {
            console.error("Le nom de la categorie existe dejà");
            return res.status(500).json({ error: "Le nom de la categorie existe dejà" });
        }
    },
};  // Vérification parent
verifyParent: async (req, res) => {
    const { name, parentId } = req.body;

    // Validation du nom
    if (!name || name.length === 0) {
        return res.status(400).json({ error: "Le nom de la catégorie est requis" });
    }

    // Validation du parent
    if (parentId) {
        const parentExists = await categoryExistsById(parentId);
        if (!parentExists) {
            return res.status(400).json({ error: "La catégorie parent n'existe pas" });
        } else {
            return res.status(200).json({ message: "La catégorie parent existe" });
        }
    }
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
