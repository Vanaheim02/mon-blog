import Database from "./init.db.js";

const TagDb = {
    // Ajouter un tag
    addTag: async (tagToAdd) => {
        try {
            if (!tagToAdd || !tagToAdd.tag_name) {
                throw new Error('Données de tag incomplètes');
            }

            const { tag_name } = tagToAdd;

            // Créer un nouveau tag
            const newTag = await Database.query(
                "INSERT INTO tags (tag_name) VALUES (?)",
                [tag_name]
            );

            return newTag;
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un tag :', error);
            throw new Error('Erreur lors de l\'ajout d\'un tag');
        }
    },

    // Récupérer tous les tags
    getAllTags: async () => {
        try {
            const tags = await Database.query("SELECT * FROM tags");
            return tags;
        } catch (error) {
            console.error('Erreur lors de la récupération des tags :', error);
            throw new Error('Erreur lors de la récupération des tags');
        }
    },

    // Récupérer un tag par ID
    getTagById: async (id_tag) => {
        try {
            const [tag] = await Database.query("SELECT * FROM tags WHERE id_tag = ?", [id_tag]);
            return tag;
        } catch (error) {
            console.error('Erreur lors de la récupération du tag :', error);
            throw new Error('Erreur lors de la récupération du tag');
        }
    },

    // Mettre à jour un tag
    updateTag: async (id_tag, updatedTag) => {
        try {
            if (!updatedTag || !updatedTag.tag_name) {
                throw new Error('Nom du tag manquant');
            }

            const { tag_name } = updatedTag;

            // Mettre à jour le tag
            await Database.query(
                "UPDATE tags SET tag_name = ? WHERE id_tag = ?",
                [tag_name, id_tag]
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour du tag :', error);
            throw new Error('Erreur lors de la mise à jour du tag');
        }
    },

    // Supprimer un tag
    deleteTag: async (id_tag) => {
        try {
            // Supprimer le tag
            await Database.query("DELETE FROM tags WHERE id_tag = ?", [id_tag]);
        } catch (error) {
            console.error('Erreur lors de la suppression du tag :', error);
            throw new Error('Erreur lors de la suppression du tag');
        }
    }
};

export default TagDb;
