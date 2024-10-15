import UserDB from "../databases/user.db.js";

// Vérifie si l'utilisateur est un administrateur
const checkAdmin = async (req, res, next) => {
    const id_user = req.body.id_user;

    try {
        // Récupère le nom de l'utilisateur dans la base de données
        const user = await UserDB.getUserById(id_user);

        if (!user || user.role !== 'admin') {
            // Si l'utilisateur n'est pas un administrateur
            return res.status(401).json({ message: "Vous n'etes pas administrateur" });
        }

        // Si l'utilisateur est un administrateur, passe à l'étape suivante du middleware
        next();
    } catch (error) {
        console.error("Erreur de vérification du status d'administrateur:", error);
        return res.status(500).json({ message: "Erreur de serveur interne" });
    }
};

const promoteToAdmin = async (req, res) => {
    const { id_user } = req.params;

    try {

        const user = await UserDB.getUserById(id_user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({ message: "User is already an admin" });
        }

        await UserDB.promoteUserToAdmin(id_user);

        console.log(`User with ID ${id_user} promoted to admin successfully.`);
        return res.status(200).json({ message: `User with ID ${id_user} promoted to admin` });
    } catch (error) {
        console.error("Error promoting user to admin:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export { checkAdmin, promoteToAdmin };