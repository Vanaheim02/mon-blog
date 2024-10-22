import { UserDb } from '../databases/user.db.js';
import { isEmail, stringIsFilled, hashPass, compareHash, jwtSign } from '../utils';

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
            .json({ message: `Le mot de passe doit avoir au moins huit caractères` });
    }

    if (password !== passwordConfirm)
        return res.status(401).json({ error: 'Les mots de passe doivent être identiques.' });

    // Hasher le mot de passe
    const hashResult = await hashPass(password);
    if (hashResult.error) {
        return res.status(500).json({ message: hashResult.error });
    }

    // Insérer l'utilisateur dans la base de données
    const mailExist = await UserDb.checkEmailAvailable(mail);
    if (!mailExist)
        return res.status(409).json({ error: 'L\'adresse mail est déjà utilisée.' });

    const userResponse = await UserDb.createUser(mail, hashResult.hashed);
    if (userResponse.error) {
        return res.status(500).json({ message: userResponse.error });
    }

    // Récupérer l'ID de l'utilisateur créé
    const id_user = userResponse.insertId;

    // Créer un profil associé à l'utilisateur
    const profileResponse = await UserDb.createUserProfile(id_user);
    if (profileResponse.error) {
        return res.status(500).json({ message: profileResponse.error });
    }

    return res.status(200).json({ message: "Utilisateur créé avec succès", user: id_user });
};

// Connexion
const login = async (req, res) => {
    try {
        const { mail, password } = req.body;

        // Vérifier la validité de l'email
        if (!mail || !isEmail(mail)) {
            return res.status(403).json({ message: `Email invalide` });
        }

        // Vérifier si le mot de passe est renseigné
        if (!stringIsFilled(password)) {
            return res.status(403).json({ message: `Mot de passe invalide` });
        }

        const response = await UserDb.signIn(mail);
        if (!response)
            return res.status(401).json({ message: `Échec de l'authentification` });

        if (!await compareHash(password, response.user_password))
            return res.status(401).json({ error: "Email ou mot de passe incorrect." });

        let id_user = response.id_user;
        const token = jwtSign(id_user);

        // Stockage des données de session dans l'objet req.session
        req.session.isLoggedIn = true;
        req.session.mail = response.user_mail;
        req.session.isAdmin = response.rank === 'admin';

        return res
            .status(200)
            .json({ message: "Connexion réussie !", user: { id_user, mail: response.user_mail }, token });
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur." });
    }
};

// Fonction pour que l'utilisateur puisse changer de mot de passe
const updatePassword = async (req, res) => {
    try {
        const { id_user, currentPassword, newPassword, newPasswordConfirm } = req.body;

        const user = await UserDb.getUserById(id_user);
        if (!user)
            return res.status(404).json({ error: 'Utilisateur introuvable' });

        if (!await compareHash(currentPassword, user.user_password))
            return res.status(401).json({ error: 'L\'ancien mot de passe est erroné.' });

        // Vérifier la longueur du mot de passe
        if (newPassword.length <= 8)
            return res.status(401).json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' });

        if (newPassword !== newPasswordConfirm)
            return res.status(401).json({ error: 'Les mots de passe doivent être identiques.' });

        const hashResult = await hashPass(newPasswordConfirm);
        if (hashResult.error)
            return res.status(500).json({ error: hashResult.error });

        await UserDb.updatePassword(id_user, hashResult.hashed);
        res.status(200).json({ message: 'Mot de passe changé avec succès' });
    } catch (err) {
        console.error('Erreur lors de la modification du mot de passe : ', err);
        res.status(500).json({ error: 'Erreur lors de la modification du mot de passe.' });
    }
};

// Fonction de suppression d'un utilisateur
const deleteUser = async (req, res) => {
    const id_user = req.body.id_user;

    try {
        const userExist = await UserDb.getUserById(id_user);
        if (!userExist)
            return res.status(404).json({ error: 'Utilisateur non trouvé' });

        const result = await UserDb.deleteUser(id_user);
        if (result.affectedRows != 1)
            return res.status(409).json({ error: 'Utilisateur non supprimé' });

        res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
    }
};


export const UsersController = { createUser, login, deleteUser, updatePassword };

