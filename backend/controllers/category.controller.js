import CategoryDb from '../databases/category.db.js';

const CategoryController = {
    addCategory: async (req, res) => {
        // Ajout de la catégorie
        try {
            const { name, parent } = req.body;

            // Vérifie le nom
            if (typeof name === 'undefined' || !name || name.length === 0) {
                return res.status(400).json({ error: "Le nom de la catégorie est requis." });
            }

            // Vérifie que la catégorie n'existe pas déjà
            if (parent === null || Number.isInteger(parent)) {
                // Vérifie que la catégorie n'existe pas déjà (vérifier nom + parent)
                let exists = await CategoryDb.categoryExists(name, parent);
                let existsError = exists.error;

                if (existsError)
                    return res.status(400).json({ error: existsError });

                if (exists.length > 0)
                    return res.status(409).json({ error: 'Cette catégorie existe déjà' });
            }
            else
                return res.status(400).json({ error: "L'identifiant de la catégorie parent doit être un entier." });

            return;
            // Vérifier si la catégorie parente existe
            if (fk_category_parent !== null) {
                const parentExists = await CategoryDb.getCategoryById(fk_category_parent);
                if (!parentExists) {
                    return res.status(400).json({ error: "La catégorie parent n'existe pas." });
                }
            }



            // TODO: Vérifier si la catégorie parente existe
            //     const parentExists = await CategoryDb.getCategoryById(parent);
            //     if (!parentExists) {
            //         return res.status(400).json({ error: "La catégorie parent n'existe pas." });
            //     }

            // On insère la donnée
            let response = await CategoryDb.addCategory(name, parent);
            let responseError = response.error;

            if (responseError)
                return res.status(400).json({ error: responseError });

            // Tout est OK donc message de validation
            return res.status(201).json({ message: "Catégorie ajoutée avec succès à l'ID : " + response.insertId });
        } catch (error) {
            if (process.env.APP_ENV == 'dev')
                console.error(error.stack);

            return res.status(500).json({ error: "Erreur lors de l'ajout de la catégorie." });
        }
    },
    // TODO: Lister toutes les catégories

    ListCategory: async (req, res) => {
        try {
            const categories = await CategoryDb.getAllCategories();
            if (categories.error) {
                return res.status(500).json({ error: categories.error });
            }
            return res.status(200).json({ message: "Catégorie ajouté avec succès" });
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
            return res.status(500).json({ error: "Impossible de récupérer une catégorie" });
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
