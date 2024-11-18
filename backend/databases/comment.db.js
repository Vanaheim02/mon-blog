import db from './init.db.js';

const CommentDb = {
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
            console.error('Erreur lors de l\'ajout d\'un commentaire :', error);
            throw new Error('Erreur lors de l\'ajout d\'un commentaire');
        }
    },

    getAllComments: async () => {
        try {
            const comments = await db.query("SELECT * FROM comments");
            return comments;
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires :', error);
            throw new Error('Erreur lors de la récupération des commentaires');
        }
    },

    getCommentById: async (id_comment) => {
        try {
            const [comment] = await db.query("SELECT * FROM comments WHERE id_comment = ?", [id_comment]);
            return comment;
        } catch (error) {
            console.error('Erreur lors de la récupération du commentaire :', error);
            throw new Error('Erreur lors de la récupération du commentaire');
        }
    },

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

    deleteComment: async (id_comment) => {
        try {
            await db.query("DELETE FROM comments WHERE id_comment = ?", [id_comment]);
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire :', error);
            throw new Error('Erreur lors de la suppression du commentaire');
        }
    }
};

export default CommentDb;



