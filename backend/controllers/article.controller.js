import ArticleDb from '../databases/article.db.js';

const ArticleController = {
    listArticle: async (req, res) => {
        try {
            const { article_name, article_id } = req.query;
            const articles = await ArticleDb.listArticle(article_name, article_id);

            if (articles.error) {
                return res.status(400).json({ error: articles.error });
            }

            res.status(200).json(articles);
        } catch (error) {
            console.error("Erreur lors de la sélection des articles");
            res.status(500).json({ error: "Erreur lors de la sélection des articles" });
        }
    },

    addArticle: async (req, res) => {
        const { article_name, article_content, fk_article_category_id, fk_profile_id, article_state } = req.body;

        if (!article_name || !article_content || !fk_article_category_id || !fk_profile_id || !article_state) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        try {
            const result = await ArticleDb.addArticle(article_name, article_content, fk_article_category_id, fk_profile_id, article_state);
            res.status(201).json({ message: "Article ajouté avec succès" });
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article");
            res.status(500).json({ error: "Erreur lors de l'ajout de l'article." });
        }
    },

    getArticleById: async (req, res) => {
        const id_article = req.params.id;

        try {
            const article = await ArticleDb.getArticleById(id_article);

            if (!article || article.length === 0) {
                return res.status(404).json({ message: "Article non trouvé." });
            }

            res.status(200).json(article);
        } catch (err) {
            console.error("Erreur lors de la récupération de l'article");
            res.status(500).json({ error: "Erreur lors de la récupération de l'article." });
        }
    },

    updateArticle: async (req, res) => {
        const id_article = req.params.id;
        const { article_name, article_content, article_state } = req.body;
        const id_user = req.user.id;

        try {
            const article = await ArticleDb.getArticleById(id_article);

            if (!article || article.fk_profile_id !== id_user) {
                return res.status(403).json({ message: "Vous n'avez pas l'autorisation de modifier cet article." });
            }

            const updatedArticle = await ArticleDb.updateArticle(id_article, article_name, article_content, article_state);

            res.status(200).json({ message: "Article mis à jour avec succès.", article: updatedArticle });
        } catch (err) {
            console.error("Erreur lors de la mise à jour de l'article");
            res.status(500).json({ error: "Erreur lors de la mise à jour de l'article." });
        }
    },

    deleteArticle: async (req, res) => {
        const id_article = req.params.id;
        const id_user = req.user.id;

        try {
            const article = await ArticleDb.getArticleById(id_article);

            if (!article || article.fk_profile_id !== id_user) {
                return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer cet article." });
            }

            await ArticleDb.deleteArticle(id_article);

            res.status(200).json({ message: "Article supprimé avec succès." });
        } catch (err) {
            console.error("Erreur lors de la suppression de l'article");
            res.status(500).json({ error: "Erreur lors de la suppression de l'article." });
        }
    },

    // // Pagination d'article
    // async listPaginationArticle(req, res) {

    //     try {
    //         const page = Math.max(1, parseInt(req.query.page) || 1);
    //         const limit = Math.max(1, parseInt(req.query.limit) || 5);
    //         const offset = (page - 1) * limit;

    //         const [countResult] = await db.promise().execute('SELECT COUNT(*) AS total FROM article');
    //         const total = countResult[0].total;
    //         const [articles] = await db.promise().execute(
    //             'SELECT * FROM article LIMIT ? OFFSET ?',
    //             [limit, offset]
    //         );

    //         if (articles.length === 0) {
    //             return res.status(404).json({ message: "Aucun article trouvé." });
    //         }
    //         return res.json({
    //             posts: articles,
    //             page,
    //             totalPosts: total
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(404).json({ error: "Aucun article trouvé." });
    //     }
    // },


    // // Recherche d'un article
    // async searchArticle(req, res) {
    //     const article_id = req.params.id;
    //     const article_name = req.query.article_name;

    //     try {
    //         if (!article_id || !article_name) {
    //             return res.status(400).json({ message: "L'ID et le nom sont requis." });
    //         }

    //         const query = 'SELECT * FROM article WHERE article_id = ? AND article_name LIKE ?';
    //         const [results] = await db.promise().execute(query, [article_id, `%${article_name}%`]);

    //         if (results.length === 0) {
    //             return res.status(404).json({ message: "Aucun article trouvé." });
    //         }

    //         return res.json({ article: results[0] });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ error: "Aucun article trouvé" });
    //     }
    // },

    // async searchByAuthor(req, res) {
    //     const fk_profile_id = req.params.id;

    //     try {
    //         if (!fk_profile_id) {
    //             return res.status(400).json({ message: "L'ID de l'utilisateur est requis." });
    //         }
    //         let params = [fk_profile_id];
    //         const [results] = await db.promise().execute(query, params);

    //         if (results.length === 0) {
    //             return res.status(404).json({ message: "Aucun article trouvé pour cet utilisateur." });
    //         }

    //         return res.json({ article: results });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ error: "Erreur serveur lors de la récupération des articles." });
    //     }
    // }

}

export default ArticleController;