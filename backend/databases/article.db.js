const ArticleDb = {

    addArticle: async (req, res) => {
        const articleToAdd = req.body;

        try {
            if (!articleToAdd || !articleToAdd.article_title) {
                return res.status(400).json({ message: "Aucun article à ajouter" });
            }

            const { article_title, article_content, fk_id_author } = articleToAdd;

            // Créer un nouvel article
            const newArticle = await db.create({ article_title, article_content, fk_id_author });

            res.status(201).json({ message: "L'article a été ajouté avec succès", article: newArticle });
        } catch (error) {
            console.error("Une erreur est survenue lors de l'ajout d'un article :", error);
            res.status(500).json({ error: "Erreur lors de l'ajout d'un article" });
        }
    },

    getAllArticles: async (req, res) => {
        try {
            const articles = await db.readAll();

            res.status(200).json(articles);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles :", error);
            res.status(500).json({ error: "Erreur serveur lors de la récupération des articles." });
        }
    },

    updateArticle: async (req, res) => {
        const id_article = req.params.id;
        const update_at = req.body;

        try {
            const { article_title } = update_at;

            await db.update(id_article, { article_title });

            res.status(200).json({ message: "L'article a été mis à jour avec succès." });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article :", error);
            res.status(500).json({ error: "Erreur lors de la mise à jour de l'article." });
        }
    },

    deleteArticle: async (req, res) => {
        const id_article = req.params.id;

        try {
            await db.remove(id_article);

            res.status(200).json({ message: "Article supprimé avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article :", error);
            res.status(500).json({ error: "Erreur lors de la suppression de l'article." });
        }
    }
};

export default ArticleDb;

