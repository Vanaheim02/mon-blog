import Database from "./init.db.js";

const CommentDb = {
    // Ajouter un commentaire
    addComment: async (commentToAdd) => {
        try {
            if (!commentToAdd || !commentToAdd.comment_content || !commentToAdd.fk_id_profiles || !commentToAdd.fk_id_article) {
                throw new Error('Données de commentaire incomplètes');
            }

            const { comment_content, fk_id_profiles, fk_id_article } = commentToAdd;

            // Créer un nouveau commentaire
            const newComment = await Database.query(
                "INSERT INTO comments (comment_content, comment_created_at, fk_id_profiles, fk_id_article) VALUES (?, NOW(), ?, ?)",
                [comment_content, fk_id_profiles, fk_id_article]
            );

            return newComment;
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un commentaire :', error);
            throw new Error('Erreur lors de l\'ajout d\'un commentaire');
        }
    },

    // Récupérer tous les commentaires
    getAllComments: async () => {
        try {
            const comments = await Database.query("SELECT * FROM comments");
            return comments;
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires :', error);
            throw new Error('Erreur lors de la récupération des commentaires');
        }
    },

    // Récupérer un commentaire par ID
    getCommentById: async (id_comment) => {
        try {
            const [comment] = await Database.query("SELECT * FROM comments WHERE id_comment = ?", [id_comment]);
            return comment;
        } catch (error) {
            console.error('Erreur lors de la récupération du commentaire :', error);
            throw new Error('Erreur lors de la récupération du commentaire');
        }
    },

    // Mettre à jour un commentaire
    updateComment: async (id_comment, updatedComment) => {
        try {
            if (!updatedComment || !updatedComment.comment_content) {
                throw new Error('Contenu du commentaire manquant');
            }

            const { comment_content } = updatedComment;

            // Mettre à jour le commentaire
            await Database.query(
                "UPDATE comments SET comment_content = ?, comment_updated_at = NOW() WHERE id_comment = ?",
                [comment_content, id_comment]
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour du commentaire :', error);
            throw new Error('Erreur lors de la mise à jour du commentaire');
        }
    },

    // Supprimer un commentaire
    deleteComment: async (id_comment) => {
        try {
            // Supprimer le commentaire
            await Database.query("DELETE FROM comments WHERE id_comment = ?", [id_comment]);
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire :', error);
            throw new Error('Erreur lors de la suppression du commentaire');
        }
    }
};

export default CommentDb;
