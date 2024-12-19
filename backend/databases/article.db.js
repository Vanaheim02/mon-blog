import db from './init.db.js';

const ArticleDB = {

    // Récupérer tous les articles
    async listArticle() {
        try {
            const query = 'SELECT * FROM article';
            const [results] = await db.poolQuery(query);
            return results;
        } catch (error) {
            console.error("Erreur lors de la sélection des articles:", error.message);
            return { error: error.message };
        }
    },

    // Fonction pour ajouter un article
    async addArticle(article_name, article_content, fk_user_id, article_state) {
        const query = `
                INSERT INTO article (article_name, article_content, fk_user_id, article_state, article_created)
                VALUES (?, ?, ?, ?, NOW());
            `;

        try {
            const [result] = await db.poolQuery(query, [article_name, article_content, fk_user_id, article_state]);
            return result;
        } catch (error) {
            if (process.env.APP_ENV === 'dev') {
                console.error(error.stack);
            }
            return { error: "Erreur lors de l'ajout de l'article" };
        }
    },


    // Mettre à jour un article
    async updateArticle(article_id, article_name, article_content, article_state) {
        try {
            const query = 'UPDATE article SET article_name = ?, article_content = ?, article_state = ?, article_updated = NOW() WHERE article_id = ?';
            const [results] = await db.poolQuery(query, [article_name, article_content, article_state, article_id]);
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
            const [results] = await db.poolQuery(query, [article_id]);
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
            const [results] = await db.poolQuery(query, [article_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'article par ID ");
            return { error: error.message };
        }
    },
};

export default ArticleDB;







