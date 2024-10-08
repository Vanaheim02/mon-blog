import { CommentDb } from "../Databases/comment.db"

// Fonctionnalités pour tous les utilisateurs
const createComment = async (req, res) => {
    try {
        const { content, articleId } = req.body;
        // Ajout d'un nouveau commentaire
        const newComment = await CommentDb.create(content, req.user.id, articleId);
        res.status(201).json({ message: "Commentaire créé avec succès.", comment: newComment });
    } catch (err) {
        console.error("Erreur lors de la création du commentaire :", err);
        res.status(500).json({ error: "Erreur lors de la création du commentaire." });
    }
};

const getCommentsByArticle = async (req, res) => {
    try {
        const { articleId } = req.params;
        const comments = await CommentDb.findByArticleId(articleId);
        res.status(200).json(comments);
    } catch (err) {
        console.error("Erreur lors de la récupération des commentaires :", err);
        res.status(500).json({ error: "Erreur lors de la récupération des commentaires." });
    }
};

// Fonctionnalités réservées aux administrateurs
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await CommentDb.delete(commentId);
        res.status(200).json({ message: "Commentaire supprimé avec succès." });
    } catch (err) {
        console.error("Erreur lors de la suppression du commentaire :", err);
        res.status(500).json({ error: "Erreur lors de la suppression du commentaire." });
    }
};

export const CommentController = { createComment, getCommentsByArticle, deleteComment };
