import db from './init.db.js';

const ArticleDb = {

    addArticle: async (req, res) => {
        const articleToAdd = req.body;

        try {
            if (!articleToAdd || !articleToAdd.article_name) {
                return res.status(400).json({ message: "Aucun article à ajouter" });
            }

            const { article_name } = articleToAdd;

            // Créer un nouvel article
            const newArticle = await db.create(article_name); // Assurez-vous que `create` est une fonction valide dans `init.db.js`

            res.status(201).json({ message: "L'article a été ajouté avec succès", article: newArticle });
        } catch (error) {
            console.error("Une erreur est survenue lors de l'ajout d'un article :", error);
            res.status(500).json({ error: "Erreur lors de l'ajout d'un article" });
        }
    },

    getAllArticles: async (req, res) => { // Correction de `getAllarticle`
        try {
            const articles = await db.readAll(); // Assurez-vous que `readAll` est une fonction valide dans `init.db.js`

            res.status(200).json(articles);
        } catch (error) {
            console.error("Erreur lors de la récupération des articles :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    updateArticle: async (req, res) => { // Correction pour transformer `updateArticle` en fonction
        const id_article = req.params.id;
        const updatedArticle = req.body;

        try {
            const { article_name } = updatedArticle;

            // Mise à jour de l'article
            await db.update(id_article, article_name); // Assurez-vous que `update` est une fonction valide dans `init.db.js`

            res.status(200).json({ message: "L'article a été mis à jour avec succès." });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article :", error);
            res.status(500).json({ error: "Erreur lors de la mise à jour de l'article." });
        }
    },

    deleteArticle: async (req, res) => {
        const id_article = req.params.id;

        try {
            // Suppression de l'article
            await db.remove(id_article); // Assurez-vous que `remove` est une fonction valide dans `init.db.js`

            res.status(200).json({ message: "Article supprimé avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression de l'article :", error);
            res.status(500).json({ error: "Erreur lors de la suppression de l'article." });
        }
    }
};

// Exportation de l'objet ArticleDB
export default ArticleDb;
