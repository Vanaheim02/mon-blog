import { ArticleDb } from "../Databases/article.db";

// Créer un nouvel article
const createArticle = async (req, res) => {
    const { title, content, categories, tags } = req.body;
    const userId = req.user.id;

    try {
        if (!title || !content) {
            return res.status(400).json({ message: "Le titre et le contenu sont requis." });
        }

        const newArticle = await ArticleDb.create({
            title,
            content,
            authorId: userId,
            categories,
            tags
        });

        res.status(201).json({ message: "Article créé avec succès.", article: newArticle });
    } catch (err) {
        console.error("Erreur lors de la création de l'article :", err);
        res.status(500).json({ error: "Erreur lors de la création de l'article." });
    }
};

// Récupérer un article par ID
const getArticleById = async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await ArticleDb.getById(articleId);

        if (!article) {
            return res.status(404).json({ message: "Article non trouvé." });
        }

        res.status(200).json(article);
    } catch (err) {
        console.error("Erreur lors de la récupération de l'article :", err);
        res.status(500).json({ error: "Erreur lors de la récupération de l'article." });
    }
};


// Mettre à jour un article
const updateArticle = async (req, res) => {
    const articleId = req.params.id;
    const { title, content, categories, tags } = req.body;
    const userId = req.user.id; // ID de l'utilisateur connecté

    try {
        const article = await ArticleDb.getById(articleId);

        if (!article || article.authorId !== userId) {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de modifier cet article." });
        }

        const updatedArticle = await ArticleDb.update(articleId, { title, content, categories, tags });

        res.status(200).json({ message: "Article mis à jour avec succès.", article: updatedArticle });
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'article :", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'article." });
    }
};

// Supprimer un article
const deleteArticle = async (req, res) => {
    const articleId = req.params.id;
    const userId = req.user.id; // ID de l'utilisateur connecté

    try {
        const article = await ArticleDb.getById(articleId);

        if (!article || article.authorId !== userId) {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer cet article." });
        }

        await ArticleDb.delete(articleId);

        res.status(200).json({ message: "Article supprimé avec succès." });
    } catch (err) {
        console.error("Erreur lors de la suppression de l'article :", err);
        res.status(500).json({ error: "Erreur lors de la suppression de l'article." });
    }
};

export const ArticleController = { createArticle, getArticleById, updateArticle, deleteArticle };
