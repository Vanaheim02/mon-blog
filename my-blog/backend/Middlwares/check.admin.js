import query from "../Databases/init.db";

// Fonction middleware pour vérifier si l'utilisateur est un administrateur
const checkAdmin = async (req, res, next) => {
    // Récupération de l'ID de l'utilisateur depuis la requête
    const user_Id = req.body.user_Id;

    // Requête SQL pour récupérer le rôle de l'utilisateur dans la base de données
    const userSql = `
    SELECT id_user, role
    FROM users
    WHERE is_user = ?
  `;

    // Exécution de la requête SQL pour obtenir les informations sur l'utilisateur
    const userRes = await query(userSql, [user_Id]);

    // Extraction du premier utilisateur trouvé dans le résultat
    const user = userRes[0];

    // Récupération du rôle de l'utilisateur
    const role = user.role;

    // Vérification si l'utilisateur a le rôle d'administrateur
    if (role !== "admin") {
        // Si l'utilisateur n'est pas un administrateur, renvoie une erreur 401
        return res
            .status(401)
            .json({ message: `You don't have the right` });
    }

    // Si l'utilisateur est un administrateur
    next();
};
const promoteToAdmin = async (req, res) => {
    const { user_Id } = req.params;

    try {
        // Vérifier si l'utilisateur existe
        const user = await UsersDB.getUserById(user_Id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Vérifier si l'utilisateur est déjà administrateur
        if (user.role === "admin") {
            return res.status(400).json({ message: "User is already an admin" });
        }

        // Mettre à jour le rôle de l'utilisateur en administrateur dans la base de données
        await UsersDB.promotToAdmin(user_Id);

        console.log('User promoted to admin successfully.');
        return res.status(200).json({ message: `User with ID ${user_Id} promoted to admin` });
    }
    catch (error) {
        console.error('Error promoting user to admin: ', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
// Export de la fonction checkAdmin pour qu'elle soit accessible depuis d'autres modules
export default checkAdmin;