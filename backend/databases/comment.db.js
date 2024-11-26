import db from './init.db.js';

const CommentDb = {
    // Ajouter un commentaire
    addComment: async (commentToAdd) => {
        try {
            if (!commentToAdd || !commentToAdd.content || !commentToAdd.user_id || !commentToAdd.article_id) {
                throw new Error('Données de commentaire incomplètes');
            }

            const { content, user_id, article_id } = commentToAdd;
            const newComment = await db.query(
                "INSERT INTO comments (content, created_at, user_id, article_id) VALUES (?, NOW(), ?, ?)",
                [content, user_id, article_id]
            );
            return newComment;
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un commentaire");
            throw new Error("Erreur lors de l'ajout d'un commentaire");
        }
    },

    // Récupérer tous les commentaires
    getAllComments: async () => {
        try {
            const comments = await db.query("SELECT * FROM comments");
            return comments;
        } catch (error) {
            console.error("Erreur lors de la récupération des commentaires");
            throw new Error("Erreur lors de la récupération des commentaires");
        }
    },

    // Récupérer un commentaire par son ID
    getCommentById: async (id_comment) => {
        try {
            const [comment] = await db.query("SELECT * FROM comments WHERE id_comment = ?", [id_comment]);
            return comment;
        } catch (error) {
            console.error("Erreur lors de la récupération du commentaire");
            throw new Error("Erreur lors de la récupération du commentaire");
        }
    },

    // Mettre à jour un commentaire
    updateComment: async (id_comment, updatedComment) => {
        try {
            if (!updatedComment || !updatedComment.content) {
                throw new Error('Contenu du commentaire manquant');
            }

            const { content } = updatedComment;

            await db.query(
                "UPDATE comments SET content = ?, created_at = NOW() WHERE id_comment = ?",
                [content, id_comment]
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour du commentaire");
            throw new Error("Erreur lors de la mise à jour du commentaire");
        }
    },

    // Supprimer un commentaire
    deleteComment: async (id_comment) => {
        try {
            await db.query("DELETE FROM comments WHERE id_comment = ?", [id_comment]);
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire");
            throw new Error("Erreur lors de la suppression du commentaire");
        }
    },

    // Pagination des commentaires
    listPaginationComment: async (id_comment = 0, Page = 5) => {
        try {
            const query = 'SELECT * FROM comments WHERE id_comment > ? ORDER BY created_at LIMIT ?';
            const [results] = await db.promise().execute(query, [id_comment, Page]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la pagination des commentaires");
            return { error: error.message };
        }
    },

    // Ajouter un like à un commentaire
    likeComment: async (id_comment) => {
        try {
            const query = "UPDATE comments SET likes = likes + 1 WHERE id_comment = ?";
            await db.query(query, [id_comment]);
        } catch (error) {
            console.error("Erreur lors de l'ajout du like");
            throw new Error("Erreur lors de l'ajout du like");
        }
    },

    // Récupérer tous les commentaires d'un article
    async searchCommentByArticle(article_id) {
        try {
            const query = 'SELECT * FROM comments WHERE article_id = ?';
            const [results] = await db.promise().execute(query, [article_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération des commentaires par article");
            return { error: error.message };
        }
    },

    // Récupérer tous les commentaires d'un utilisateur
    async searchByComment(fk_profile_id) {
        try {
            const query = 'SELECT * FROM comments WHERE user_id = ?';
            const [results] = await db.promise().execute(query, [fk_profile_id]);
            return results;
        } catch (error) {
            console.error("Erreur lors de la récupération des commentaires d'un utilisateur");
            return { error: error.message };
        }
    }
};

export default CommentDb;




