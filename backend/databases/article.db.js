import db from './init.db.js';

const ArticleDB = {

    // Récupérer tous les articles
    async listArticle(article_name, article_id) {
        try {
            const query = 'SELECT * FROM Article(article_name, article_id);';
            const [results] = await db.promise().execute(query, article_id, article_name);
            return results;
        } catch (error) {
            console.error("Erreur lors de la sélection des articles");
            return { error: error.message };
        }
    },

    // Fonction pour ajouter un article
    async addArticle(article_name, article_content, fk_article_id, fk_user_id, article_state,fk_category_id) {
    try {
        const query = `
            INSERT INTO article (article_name, article_content, fk_article_id, fk_user_id, article_state, article_created,fk_category_id)
            VALUES (?, ?, ?, ?, ?, NOW());
        `;
        const [results] = await db.promise().execute(query, [article_name, article_content, fk_article_id, fk_user_id, article_state,fk_category_id]);
        return results;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'article", error);
        return { error: error.message };
    }
},



    // Mettre à jour un article
    async updateArticle(article_id, article_name, article_content, article_state) {
        try {
            const query = 'UPDATE article SET article_name = ?, article_content = ?, article_state = ?, article_updated = NOW() WHERE article_id = ?';
            const [results] = await db.promise().execute(query, [article_name, article_content, article_state, article_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article");
            return { error: error.message };
        }
    },

    // Supprimer un article
    async deleteArticle(article_id) {
        try {
            const query = 'DELETE FROM article WHERE article_id = ?';
            const [results] = await db.promise().execute(query, [article_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article");
            return { error: error.message };
        }
    },

    // Récupérer un article par son id
    async getArticleById(article_id) {
        try {
            const query = 'SELECT * FROM article WHERE article_id = ?';
            const [results] = await db.promise().execute(query, [article_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'article par ID ");
            return { error: error.message };
        }
    },

    // Pagination d'un article
    async listPaginationArticle(article_id = 0, Page = 5) {
        try {
            const query = 'SELECT * FROM article WHERE article_id > ? ORDER BY article_id LIMIT ?';
            const [results] = await db.promise().execute(query, [article_id, Page]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la pagination des articles");
            return { error: error.message };
        }
    },

    // Recherche d'un artiche

    async searchArticle(article_id, article_name) {
        try {
            const query = 'SELECT * FROM article LIKE article_id, article_name = ?, ?';
            const [results] = await db.promise().execute(query, [article_id, article_name])
            return results;
        } catch (error) {
            console.error("Erreur lors de la recherche d'un article");
            return { error: error.message }
        }

    },
    //  Liste des articles par utilisateur / Auteur

    async searchByAuthor(fk_profile_id) {
        try {
            const query = 'SELECT * FROM article WHERE fk_profile_id = ?';
            const [results] = await db.promise().execute(query, [fk_profile_id])
            return results;
        } catch (error) {
            console.error("Erreur lors de la recherche d'un utilisateur");
            return { error: error.message }
        }
    },
}
// Article aimé / pas aimé

export default ArticleDB;






