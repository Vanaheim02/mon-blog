import UserDB from "../databases/user.database.js";

// Permet de vérifier si l'utilisateur est un administrateur
const checkAdmin = async (req, res, next) => {
    const userId = req.body.userId; // Récupération de l'ID de l'utilisateur depuis la requête

    try {
        // Requête pour récupérer le rôle de l'utilisateur dans la base de données
        const user = await UserDB.getUserById(userId);

        if (!user || user.role !== 'admin') {
            // Si l'utilisateur n'est pas un administrateur, renvoie une erreur 401
            return res.status(401).json({ message: "You don't have administrator rights" });
        }

        // Si l'utilisateur est un administrateur, passe à l'étape suivante du middleware
        next();
    } catch (error) {
        console.error("Error checking admin status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Middleware pour donner le role à un utilisateur pour devenir administrateur
const promoteToAdmin = async (req, res) => {
    const { userId } = req.params; // Récupération de l'ID de l'utilisateur à promouvoir

    try {
        // Vérifie si l'utilisateur existe
        const user = await UserDB.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Vérifie si l'utilisateur est déjà administrateur
        if (user.role === "admin") {
            return res.status(400).json({ message: "User is already an admin" });
        }

        // Met le rôle de l'utilisateur en administrateur dans la base de données
        await UserDB.promoteUserToAdmin(userId);

        console.log(`User with ID ${userId} promoted to admin successfully.`);
        return res.status(200).json({ message: `User with ID ${userId} promoted to admin` });
    } catch (error) {
        console.error("Error promoting user to admin:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export { checkAdmin, promoteToAdmin };