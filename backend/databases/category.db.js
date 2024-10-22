import db from './init.db.js';

const CategoryDb = {
    // Ajouter une catégorie
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
};

export default CategoryDb;


