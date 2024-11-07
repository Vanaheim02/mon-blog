import db from './init.db.js';

const ArticleDB = {

    // Récupérer tous les articles
    async listarticle() {
        try {
            const query = 'SELECT * FROM Article;';
            const [results] = await db.promise().execute(query);
            return results;
        } catch (error) {
            console.error("Erreur lors de la sélection des articles");
            return { error: error.message };
        }
    },

    // Ajouter un article
    async addArticle(article_name, article_content, fk_article_category_id, fk_profile_id, article_state) {
        try {
            const query = 'INSERT INTO article (article_name, article_content, fk_article_category_id, fk_profile_id, article_state, article_created) VALUES (?, ?, ?, ?, ?, NOW());';
            const [results] = await db.promise().execute(query, [article_name, article_content, fk_article_category_id, fk_profile_id, article_state]);
            return results;
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article");
            return { error: error.message };
        }
    },

    // Mettre à jour un article
    async UpdateArticle(article_id, article_name, article_content, article_state) {
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
    async DeleteArticle(article_id) {
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
    }
};

export default ArticleDB;






