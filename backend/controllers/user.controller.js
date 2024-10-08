import { UserDb } from '../databases/user.db.js';
import bcrypt from 'bcrypt';

// Création d'un utilisateur
const createUser = async (req, res) => {
    const { mail, password, passwordConfirm } = req.body;

    // Vérifie si l'adresse mail est valide

    if (!mail || !isEmail(mail)) {
        return res.status(400).json({ message: `Email invalide !` });
    }

    // Vérifier la longueur du mot de passe
    if (!password || password.length <= 8) {
        return res
            .status(400)
            .json({ message: `Le mot de passe doit avoir huit caractères` });
    }

    if (password !== passwordConfirm)
        return response.status(401).json({ error: 'Les mots de passes doivent être identiques.' });

    // Hasher le mot de passe
    const hashResult = await hashPass(password);
    const hashError = hashResult.error;
    if (hashError) {
        return res.status(500).json({ message: hashError });
    }

    // Insérer l'utilisateur dans la base de données
    const mailExist = await UserDb.checkEmailAvailable(mail);

    if (!mailExist)
        return res.status(409).json({ error: 'L\'adresse mail est déjà utilisée.' });

    const response = await UserDb.createUser(mail, hashResult.hashed);
    const responseError = response.error;

    if (responseError) {
        return res.status(500).json({ message: responseError });
    }

    // Récupérer l'ID de l'utilisateur créé
    const userId = response.insertId;

    return res.status(200).json({ message: "User created", user: userId });
};

// connect
const login = async (req, res) => {
    try {
        const { mail, password } = req.body;

        // Vérifier la validité de l'email
        if (!mail || !isEmail(mail)) {
            return res.status(403).json({ message: `Invalid email` });
        }
        // Vérifier si le mot de passe est renseigné
        if (!stringIsFilled(password)) {
            return res.status(403).json({ message: `Invalid password` });
        }


        const response = await UserDb.signIn(mail);

        if (!response)
            return res.status(401).json({ message: `Authentication failed` });

        if (!await compareHash(password, response.user_password))
            return res.status(401).json({ error: "Email ou mot de passe incorrect." });


        let id_user = response.id;
        const token = jwtSign(id_user);

        // Stockage des données de session dans l'objet req.session
        req.session.isLoggedIn = true;
        req.session.mail = response.mail;
        req.session.isAdmin = response.rank === 'admin';

        return res
            .status(200)
            .json({ message: "Connexion réussie !", user: { id_user, mail }, token });
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur." });
    }
};
// Fonction pour que l'utilisateur puisse changer de mot de passe


const updatePassword = async (request, response) => {

    try {
        const { userId, currentPassword, newPassword, newPasswordConfirm } = request.body;

        const user = await UserDb.getUserById(userId);

        if (!user)
            return response.status(404).json({ error: 'Utilisateur introuvable' });

        if (!await compareHash(currentPassword, user.password))
            return response.status(401).json({ error: 'L\'ancien mot de passe est erroné.' });

        // Vérifier la longueur du mot de passe
        verifyPasswordLength(newPassword, response);

        if (newPassword !== newPasswordConfirm)
            return response.status(401).json({ error: 'Les mots de passes doivent être identiques.' });

        let hashResult = await hashPass(newPasswordConfirm);

        if (hashResult.error)
            return res.status(500).json({ error: hashError });

        await UserDb.updatePassword(userId, hashResult.hashed);

        response.status(200).json({ message: 'Mot de passe changé avec succès' });
    }
    catch (err) {
        console.error('Erreur lors de la modification du mot de passe : ', err);
        response.status(500).json({ error: 'Erreur lors de la modification du mot de passe.' });
    }
}



// Fonction de suppression d'un utilisateur
const deleteUser = async (request, response) => {
    const userId = request.body.userId

    try {
        let userExist = await UserDb.getUserById(userId);

        if (!userExist)
            response.status(404).json({ error: 'Utilisateur non trouvé' });


        let result = await UserDb.deleteUser(userId);

        if (result.affectedRows != 1)
            response.status(409).json({ error: 'Utilisateur non supprimé' });

        response.status(200).json({ message: "Utilisateur supprimé" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        response.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
    }
};


const verifyPasswordLength = async (password, response) => {
    // Vérifier la longueur du mot de passe
    if (!password || password.length <= 8)
        return response.status(401).json({ error: 'Le mot de passe doit contenir au moins 9 caractères.' });
};

// Exportez l'objet du contrôleur
export const UsersController = { createUser, login, deleteUser, updatePassword };