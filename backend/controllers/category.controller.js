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

                if (typeof exists.error !== 'undefined')
                    return res.status(400).json({ error: exists.error });

                if (exists.length > 0)
                    return res.status(409).json({ error: 'Cette catégorie existe déjà' });
            }
            else
                return res.status(400).json({ error: "L'identifiant de la catégorie parent doit être un entier." });

            // Vérifier si la catégorie parente existe
            if (parent !== null) {
                let parentExists = await CategoryDb.getCategoryById(parent);

                if (typeof parentExists.error !== 'undefined')
                    return res.status(400).json({ error: parentExists.error });
                else if (parentExists.length == 0)
                    return res.status(400).json({ error: "La catégorie parent n'existe pas." })
            }

            let response = await CategoryDb.addCategory(name, parent);

            if (typeof response.error !== 'undefined')
                return res.status(400).json({ error: response.error });

            // Tout est OK donc message de validation
            return res.status(201).json({ message: "Catégorie ajoutée avec succès à l'ID : " + response.insertId + (parent !== null ? ' avec comme ID parent : ' + parent : '') });
        } catch (error) {
            if (process.env.APP_ENV == 'dev')
                console.error(error.stack);

            return res.status(500).json({ error: "Erreur lors de l'ajout de la catégorie." });
        }
    },
    listCategory: async (req, res) => {
        try {
            let categories = await CategoryDb.listCategory();

            if (typeof categories.error !== 'undefined')
                return res.status(400).json({ error: categories.error });

            return res.status(200).json(categories);
        } catch (error) {
            if (process.env.APP_ENV == 'dev')
                console.error(error.stack);

            return res.status(500).json({ error: "Erreur lors de la sélection des catégories." });
        }
    },
    getCategoryById: async (req, res) => {
        try {
            // On vérifie que la paramètre soit un nombre
            if (isNaN(req.params.id))
                return res.status(400).json({ error: 'L\'ID de la catégorie doit être un entier' });

            // On transforme la donnée en entier décimal (base 10)
            const categoryId = parseInt(req.params.id, 10);
            let category = await CategoryDb.getCategoryById(categoryId);

            if (category.error) {
                return res.status(400).json({ error: category.error });
            } else if (category.length === 0) {
                return res.status(404).json({ message: "Catégorie introuvable" });
            }

            // statut 200 OK + on renvoie la catégorie en JSON
            return res.status(200).json(category);
        } catch (error) {
            if (process.env.APP_ENV === 'dev')
                console.error(error.stack);

            return res.status(500).json({ error: "Erreur lors de la récupération de la catégorie par son ID" });
        }
    },
    // TODO: Sélectionner une catégorie parente via l'ID parent d'une catégorie (à faire plus tard)
    // getParentById: async (req, res) => {
    //     const parentIdParam = req.params.id;
    //     try {
    //         const parent = await CategoryDb.getParentById(parentIdParam);

    //         if (!parent || parent.length === 0) {
    //             return res.status(404).json({ message: "Impossible de récupérer l'id parent d'une catégorie" });
    //         }

    //         return res.status(200).json({ message: "Id de la catégorie parent trouvé avec succès", data: parent });
    //     } catch (error) {
    //         console.error("Erreur lors de la récupération de l'id parent de la catégorie:", error);
    //         return res.status(400).json({ error: "Erreur lors de la récupération de l'id parent de la catégorie" });
    //     }
    // },
    // TODO: Mettre à jour une catégorie par son ID
    updateCategory: async (req, res) => {
        const category_id = req.params.id;
        const { category_name } = req.body;

        if (!category_name) {
            return res.status(400).json({ error: "Le nom de la catégorie est requis." });
        }

        try {
            const result = await CategoryDb.getUpdateCategory(category_name, category_id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Catégorie non trouvée." });
            }

            res.status(200).json({ message: "Catégorie mise à jour avec succès." });
        } catch (error) {
            console.error("Erreur dans le contrôleur de mise à jour de catégorie :", error);
            res.status(500).json({ error: "Erreur lors de la mise à jour de la catégorie." });
        }
    },
    // TODO: Supprimer une catégorie par son ID
    deleteCategory: async (req, res) => {
        const category_id = req.params.id;

        if (!category_id) {
            return res.status(400).json({ error: "L'ID de la catégorie est requis." });
        }

        try {
            const result = await CategoryDb.getDeleteCategory(category_id);

            if (!result || result.length === 0) {
                return res.status(404).json({ message: "Catégorie non trouvée." });
            }

            res.status(200).json({ message: "Catégorie supprimée avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie.", error);
            res.status(500).json({ error: "Erreur lors de la suppression de la catégorie." });
        }

    }
};

export default CategoryController;