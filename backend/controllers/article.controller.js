import ArticleDb from '../databases/article.db.js';

const ArticleController = {
    // Créer un nouvel article
    createArticle: async (req, res) => {
        const { title, content, categories, tags } = req.body;
        const id_user = req.user.id;

        try {
            if (!title || !content) {
                return res.status(400).json({ message: "Le titre et le contenu sont requis." });
            }

            const newArticle = await ArticleDb.create({
                title,
                content,
                fk_id_author: id_user,
                categories,
                tags
            });


            res.status(201).json({ message: "Article créé avec succès.", article: newArticle });
        } catch (err) {
            console.error("Erreur lors de la création de l'article :", err);
            res.status(500).json({ error: "Erreur lors de la création de l'article." });
        }
    }
}

// // Récupérer un article par ID
// const getArticleById = async (req, res) => {
//     const id_article = req.params.id;

//     try {
//         const article = await ArticleDb.getById(id_article);

//         if (!article) {
//             return res.status(404).json({ message: "Article non trouvé." });
//         }

//         res.status(200).json(article);
//     } catch (err) {
//         console.error("Erreur lors de la récupération de l'article :", err);
//         res.status(500).json({ error: "Erreur lors de la récupération de l'article." });
//     }
// };


// // Mettre à jour un article
// const updateArticle = async (req, res) => {
//     const id_article = req.params.id;
//     const { title, content, categories, tags } = req.body;
//     const id_user = req.user.id;

//     try {
//         const article = await ArticleDb.getById(id_article);

//         if (!article || article.id_user !== id_user) {
//             return res.status(403).json({ message: "Vous n'avez pas l'autorisation de modifier cet article." });
//         }

//         const updatedArticle = await ArticleDb.update(id_article, { title, content, categories, tags });

//         res.status(200).json({ message: "Article mis à jour avec succès.", article: updatedArticle });
//     } catch (err) {
//         console.error("Erreur lors de la mise à jour de l'article :", err);
//         res.status(500).json({ error: "Erreur lors de la mise à jour de l'article." });
//     }
// };

// // Supprimer un article
// const deleteArticle = async (req, res) => {
//     const id_article = req.params.id;
//     const id_user = req.user.id;

//     try {
//         const article = await ArticleDb.getById(id_article);

//         if (!article || article.fk_id_author !== id_user) {
//             return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer cet article." });
//         }

//         await ArticleDb.delete(id_article);

//         res.status(200).json({ message: "Article supprimé avec succès." });
//     } catch (err) {
//         console.error("Erreur lors de la suppression de l'article :", err);
//         res.status(500).json({ error: "Erreur lors de la suppression de l'article." });
//     }
// };

export { ArticleController };