import { TagDb } from "../Databases/tag.db";

const getAllTags = async (req, res) => {
    try {
        const tags = await TagDb.getAllTags();
        res.status(200).json(tags);
    } catch (err) {
        console.error("Erreur dans le contrôleur getAllTags :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
};

const addTag = async (req, res) => {
    const { tag_name } = req.body;

    if (!tag_name) {
        return res.status(400).json({ message: 'Le nom du tag est requis.' });
    }

    try {
        const existingTag = await TagDb.findTagByName(tag_name);

        if (existingTag) {
            return res.status(400).json({ message: `Le tag '${tag_name}' existe déjà.` });
        }

        const newTag = await TagDb.create(tag_name);
        res.status(201).json({ message: 'Tag ajouté avec succès.', tag: newTag });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de tags : ', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de tags.' });
    }
};

export const TagController = { getAllTags, addTag };
