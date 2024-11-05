import db from './init.db.js';

const CategoryDb = {
    addCategory: async (category_name, fk_category_parent) => {
        try {
            let query = 'INSERT INTO category (category_name, fk_category_parent) VALUES (?, ?);';
            let [results] = await db.promise().execute(query, [category_name, fk_category_parent]);
            return results;
        } catch (error) {
            console.error('Erreur lors de l\'insertion :', error);
            return { error: error.message };
        }
    },
    categoryExists: async (category_name, fk_category_parent) => {
        try {
            let query = `
                SELECT
                    category_name,
                    fk_category_parent
                FROM category
                WHERE
                    category_name = ?
                    AND fk_category_parent ` + (fk_category_parent === null ? `IS NULL;` : `= ?;`);

            let data = [category_name];
            if (fk_category_parent !== null)
                data.push(fk_category_parent);

            let [results] = await db.promise().execute(query, data);
            return results;
        } catch (error) {
            console.error('Erreur lors de la sélection :', error);
            return { error: error.message };
        }
    },
    getCategoryById: async (fk_category_parent) => {
        try {
            const query = 'SELECT * FROM category WHERE category_id = ?;';
            const [results] = await db.promise().execute(query, [fk_category_parent]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la sélection");
            return { error: error.message };
        }
    },
    listCategory: async () => {
        try {
            const query = 'SELECT * FROM category;';
            const [results] = await db.promise().execute(query);
            return results;
        } catch (error) {
            console.error('Erreur lors de la sélection des catégories');
            return { error: error.message };
        }
    },

    getParentId: async (fk_category_parent) => {
        try {
            const query = 'SELECT * FROM Category WHERE category_id = ?;';
            const [results] = await db.promise().execute(query, [fk_category_parent]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'id du parent");
            return { error: error.message };
        }
    },

    getParentById: async (category_id) => {
        try {
            const query = "SELECT * FROM Category WHERE category_id = ?;";
            const [results] = await db.promise().execute(query, [category_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération de la catégorie parente");
            return { error: error.message };
        }
    },

    getUpdateCategory: async (category_name, category_id) => {
        try {
            const query = "UPDATE Category SET category_name = ? WHERE category_id = ?;";
            const [results] = await db.promise().execute(query, [category_name, category_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la catégorie", error);
            return { error: error.message };
        }
    },


    getDeleteCategory: async (category_id) => {
        try {
            const query = "DELETE FROM Category WHERE category_id = ?;";
            const [results] = await db.promise().execute(query, [category_id]);
            return results;

        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie");
            return { error: error.message };
        }
    },

};









// // Récupérer toutes les catégories
// getAllCategory: async () => {
//     try {
//         const category = await db.query("SELECT * FROM category");
//         return category;
//     } catch (error) {
//         console.error('Erreur lors de la récupération des catégories :', error);
//         throw new Error('Erreur lors de la récupération des catégories');
//     }
// },
// // Récupérer une catégorie par ID
// getCategoryById: async (category_id) => {
//     try {
//         const [category] = await db.query("SELECT * FROM category WHERE category_id = ?", [category_id]);
//         return category;
//     } catch (error) {
//         console.error('Erreur lors de la récupération de la catégorie :', error);
//         throw new Error('Erreur lors de la récupération de la catégorie');
//     }
// },

// // Mettre à jour une catégorie
// updateCategory: async (category_id, updatedCategory) => {
//     try {
//         if (!updatedCategory || !updatedCategory.category_name) {
//             throw new Error('Nom de la catégorie manquant');
//         }

//         const { category_name } = updatedCategory;

//         // Mettre à jour la catégorie
//         await db.query(
//             "UPDATE category SET category_name = ? WHERE category_id = ?",
//             [category_name, category_id]
//         );
//     } catch (error) {
//         console.error('Erreur lors de la mise à jour de la catégorie :', error);
//         throw new Error('Erreur lors de la mise à jour de la catégorie');
//     }
// },

// // Supprimer une catégorie
// deleteCategory: async (category_id) => {
//     try {
//         // Supprimer la catégorie
//         await db.query("DELETE FROM category WHERE category_id = ?", [category_id]);
//     } catch (error) {
//         console.error('Erreur lors de la suppression de la catégorie :', error);
//         throw new Error('Erreur lors de la suppression de la catégorie');
//     }
// }
;

export default CategoryDb;


