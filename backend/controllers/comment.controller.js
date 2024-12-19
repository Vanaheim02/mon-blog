import CommentDb from '../databases/comment.db.js';

const CommentController = {
    addComment: async (req, res) => {

        const { fk_user_id, fk_article_id, comment_content } = req.body;

        if (!comment_content || comment_content.trim().length < 2 || comment_content.trim().length > 250) {

            return res.status(400).json({ message: "Le commentaire doit contenir entre 2 et 250 caractères." });
        }

        try {

            const dbResponse = await CommentDb.addComment(fk_user_id, fk_article_id, comment_content.trim());

            if (dbResponse.error) {
                return res.status(500).json({ error: "Erreur lors de l'ajout du commentaire." });
            }
            return res.status(201).json({ message: "Commentaire ajouté avec succès"});
        } catch (err) {
            console.error("Erreur lors de la création du commentaire");
            return res.status(500).json({ error: "Erreur lors de la création du commentaire." });
        }
    },

    // Méthode pour récupérer les commentaires d'un article
   // getCommentsByArticle: async (req, res) => {
      //  try {
       //     const { id_article } = req.params;
        //    const comments = await CommentDb.findByArticleId(id_article);

         //   if (!comments || comments.length === 0) {
         //       return res.status(404).json({ message: "Aucun commentaire trouvé pour cet article." });
        //    }
       //     res.status(200).json(comments);
      //  } catch (err) {
       //     console.error("Erreur lors de la récupération des commentaires");
       //     return res.status(500).json({ error: "Erreur lors de la récupération des commentaires." });
//}
   // }
};

export default CommentController;

