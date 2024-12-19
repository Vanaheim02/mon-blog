import db from './init.db.js';

const CommentDb = {
    addComment: async (fk_user_id, fk_article_id, comment_content) => {
        const query = `
            INSERT INTO comment ( fk_user_id, fk_article_id, comment_content)
            VALUES (?, ?, ?);
        `;

        try {
            const [result] = await db.poolQuery(query, [fk_user_id, fk_article_id, comment_content]);
            return result;
        } catch (error) {
            if (process.env.APP_ENV === 'dev') {
                console.error(error.stack);
            }
            return { error: error.message };
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
    getCommentById: async (comment_id) => {
        try {
            const [comment] = await db.query("SELECT * FROM comments WHERE id_comment = ?", [comment_id]);
            return comment;
        } catch (error) {
            console.error("Erreur lors de la récupération du commentaire");
            throw new Error("Erreur lors de la récupération du commentaire");
        }
    },

    // Mettre à jour un commentaire
   // updateComment: async (id_comment, updatedComment) => {
      //  try {
         //   if (!updatedComment || !updatedComment.content) {
          //      throw new Error('Contenu du commentaire manquant');
           // }

        //    const { content } = updatedComment;

        //    await db.query(
        //        "UPDATE comments SET content = ?, created_at = NOW() WHERE id_comment = ?",
       //         [content, id_comment]
      //      );
     //   } catch (error) {
     //       console.error("Erreur lors de la mise à jour du commentaire");
     //       throw new Error("Erreur lors de la mise à jour du commentaire");
    //    }
   // },

    // Supprimer un commentaire
   // deleteComment: async (id_comment) => {
     //   try {
       //     await db.query("DELETE FROM comments WHERE id_comment = ?", [id_comment]);
       // } catch (error) {
       //     console.error("Erreur lors de la suppression du commentaire");
      //      throw new Error("Erreur lors de la suppression du commentaire");
      //  }
  //  },
};

export default CommentDb;




