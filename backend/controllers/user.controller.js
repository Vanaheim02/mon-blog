import { hash } from 'bcrypt';
import UserDb from '../databases/user.db.js';
import tools from '../functions.js';

const UserController = {
    createUser: async (req, res) => {
        try {
            const { pseudo, name, firstname, mail, password, passwordConfirm, avatar, user_state } = req.body;

            // Vérification de la validité des champs
            if (!pseudo || pseudo.trim().length < 2 || pseudo.trim().length > 24) {
                return res.status(400).json({ message: "Le pseudo doit comprendre entre 2 et 24 caractères" });
            }

            // TODO: Vérifier que le pseudo n'existe pas déjà (getUserByPseudo)

            const getUserByPseudo = await UserDb.getUserByPseudo(pseudo);
            if (getUserByPseudo && getUserByPseudo.length > 0) {
                return res.status(400).json({ message: "Ce pseudo existe déjà" });
            }

            // Vérification du nom et prénom
            if (!name || name.trim().length < 2) {
                return res.status(400).json({ message: "Le nom doit être valide et avoir au moins 2 caractères." });
            }

            if (!firstname || firstname.trim().length < 2) {
                return res.status(400).json({ message: "Le prénom doit être valide et avoir au moins 2 caractères." });
            }

            // Vérification de l'email
            if (!tools.validateEmail(mail)) {
                return res.status(400).json({ message: "L'email est invalide." });
            }

            // TODO: Vérifier que l'adresse mail n'existe pas déjà (getUserByMail)

            const getUserByEmail = await UserDb.getUserByEmail(mail);
            if (getUserByEmail && getUserByEmail.length > 0) {
                return res.status(400).json({ message: "Cet adresse mail est déjà associé à un autre compte" });
            }

            // Vérification du mot de passe
            if (password.length < 8 || password.length > 32) {
                return res.status(400).json({ message: "Le mot de passe doit contenir entre 8 et 32 caractères." });
            }

            if (!tools.validatePassword(password)) {
                return res.status(400).json({ message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial." });
            }

            if (password !== passwordConfirm) {
                return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
            }

            // Validation de l'état de l'utilisateur
            const DEFAULT_USER_STATE = 'active';
            const validStates = ['active', 'archived', 'deleted'];

            if (user_state && !validStates.includes(user_state)) {
                return res.status(400).json({ message: "L'état de l'utilisateur est invalide. Les états valides sont : 'active', 'archived', 'deleted'." });
            }

            const UserState = user_state || DEFAULT_USER_STATE;

            // Hashage du mot de passe
            const hashedPassword = await tools.hashPassword(password);

            // Création de l'utilisateur dans la base de données
            const dbResponse = await UserDb.createUser(pseudo, name, firstname, mail, hashedPassword, avatar, UserState);
            if (typeof dbResponse.error !== 'undefined') {
                return res.status(400).json({ error: dbResponse.error });
            }

            return res.status(201).json({ message: "Utilisateur créé avec succès !" });

        } catch (error) {
            console.error("Erreur inattendue lors de la création de l'utilisateur", error);
            return res.status(500).json({ message: "Une erreur inattendue s'est produite." });
        }
    }
};




    // // Fonction pour que l'utilisateur puisse changer de mot de passe
    // updatePassword: async (req, res) => {
    //     try {
    //         const { id_user, currentPassword, newPassword, newPasswordConfirm } = req.body;

    //         const user = await UserDb.getUserById(id_user);
    //         if (!user)
    //             return res.status(404).json({ error: 'Utilisateur introuvable' });

    //         if (!await compareHash(currentPassword, user.user_password))
    //             return res.status(401).json({ error: 'L\'ancien mot de passe est erroné.' });

    //         // Vérifier la longueur du mot de passe
    //         if (newPassword.length <= 8)
    //             return res.status(401).json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' });

    //         if (newPassword !== newPasswordConfirm)
    //             return res.status(401).json({ error: 'Les mots de passe doivent être identiques.' });

    //         const hashResult = await hashPass(newPasswordConfirm);
    //         if (hashResult.error)
    //             return res.status(500).json({ error: hashResult.error });

    //         await UserDb.updatePassword(id_user, hashResult.hashed);
    //         res.status(200).json({ message: 'Mot de passe changé avec succès' });
    //     } catch (err) {
    //         console.error('Erreur lors de la modification du mot de passe');
    //         res.status(500).json({ error: 'Erreur lors de la modification du mot de passe.' });
    //     }
    // },
    // // Fonction de suppression d'un utilisateur
    // deleteUser: async (req, res) => {
    //     const id_user = req.body.id_user;

    //     try {
    //         const userExist = await UserDb.getUserById(id_user);
    //         if (!userExist)
    //             return res.status(404).json({ error: 'Utilisateur non trouvé' });

    //         const result = await UserDb.deleteUser(id_user);
    //         if (result.affectedRows != 1)
    //             return res.status(409).json({ error: 'Utilisateur non supprimé' });

    //         res.status(200).json({ message: "Utilisateur supprimé" });
    //     } catch (error) {
    //         console.error("Erreur lors de la suppression de l'utilisateur");
    //         res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
    //     }
    // }

export default UserController;
