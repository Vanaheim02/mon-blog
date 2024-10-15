import CommentDb from '../databases/comment.db.js';

// Fonctionnalités pour tous les utilisateurs
const createComment = async (req, res) => {
    try {
        const { content, id_article } = req.body;
        // Ajout d'un nouveau commentaire
        const newComment = await CommentDb.create(content, req.user.id, id_article);
        res.status(201).json({ message: "Commentaire créé avec succès.", comment: newComment });
    } catch (err) {
        console.error("Erreur lors de la création du commentaire :", err);
        res.status(500).json({ error: "Erreur lors de la création du commentaire." });
    }
};

const getCommentsByArticle = async (req, res) => {
    try {
        const { id_article } = req.params;
        const comments = await CommentDb.findByArticleId(id_article);
        res.status(200).json(comments);
    } catch (err) {
        console.error("Erreur lors de la récupération des commentaires :", err);
        res.status(500).json({ error: "Erreur lors de la récupération des commentaires." });
    }
};

// Fonctionnalités réservées aux administrateurs
const deleteComment = async (req, res) => {
    try {
        const { id_comment } = req.params;
        await CommentDb.delete(id_comment);
        res.status(200).json({ message: "Commentaire supprimé avec succès." });
    } catch (err) {
        console.error("Erreur lors de la suppression du commentaire :", err);
        res.status(500).json({ error: "Erreur lors de la suppression du commentaire." });
    }
};

export const CommentController = { createComment, getCommentsByArticle, deleteComment };
