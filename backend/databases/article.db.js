import db from './init.db.js';

const ArticleDB = {

    // Ajouter un article
    async addArticle(article_name, article_content, fk_article_category_id, fk_profile_id, article_state) {
        try {
            const query = 'INSERT INTO article (article_name, article_content, fk_article_category_id, fk_profile_id, article_state, article_created) VALUES (?, ?, ?, ?, ?,';
            const [results] = await db.promise().execute(query, [article_name, article_content, fk_article_category_id, fk_profile_id, article_state]);
            return results;
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article:");
            return { error: error.message };
        }
    },

    // Mettre à jour un article
    async getUpdateArticle(article_id, article_name, article_content, article_state) {
        try {
            const query = 'UPDATE article SET article_name = ?, article_content = ?, article_state = ?, article_updated = NOW() WHERE article_id = ?';
            const [results] = await db.promise().execute(query, [article_name, article_content, article_state, article_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article:");
            return { error: error.message };
        }
    },

    // Supprimer un article
    async getDeleteArticle(article_id) {
        try {
            const query = 'DELETE FROM article WHERE article_id = ?';
            const [results] = await db.promise().execute(query, [article_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article:");
            return { error: error.message };
        }
    },

    // Associer un article à un profil d'utilisateur
    async getArticleToUser(article_id, fk_profile_id) {
        try {
            const query = 'UPDATE article SET fk_profile_id = ?, article_updated = NOW() WHERE article_id = ?';
            const [results] = await db.promise().execute(query, [fk_profile_id, article_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de l'association de l'article à l'utilisateur:");
            return { error: error.message };
        }
    },

    // Récupérer un article par son ID
    async getArticleById(article_id) {
        try {
            const query = 'SELECT * FROM article WHERE article_id = ?';
            const [results] = await db.promise().execute(query, [article_id]);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'article:");
            return { error: error.message };
        }
    },
};

export default ArticleDB;





