import UserDb from '../databases/user.db.js';
import tools from '../functions.js';

const UserController = {
    createUser: async (req, res) => {
        try {
            const { name, firstname, mail, password, passwordConfirm } = req.body;

            // Vérification de la validité des champs
            if (!name || name.trim().length < 2) {
                return res.status(400).json({ message: "Le nom doit être valide et avoir au moins 2 caractères." });
            }

            if (!firstname || firstname.trim().length < 2) {
                return res.status(400).json({ message: "Le prénom doit être valide et avoir au moins 2 caractères." });
            }

            if (!tools.validateEmail(mail)) {
                return res.status(400).json({ message: "L'email est invalide." });
            }

            if (password.length < 8 || password.length > 32) {
                return res.status(400).json({ message: "Le mot de passe doit contenir entre 8 et 32 caractères." });
            }

            if (!tools.validatePassword(password)) {
                return res.status(400).json({ message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial." });
            }

            if (password !== passwordConfirm) {
                return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
            }

            // Hashage du mot de passe
            let hashedPassword;
            try {
                hashedPassword = await tools.hashPassword(password);
            } catch (error) {
                return res.status(500).json({ message: "Erreur lors du hashage du mot de passe." });
            }

            const result = await UserDb.createUser(mail, hashedPassword, name, firstname);
            if (!result || !result.affectedRows) {
                return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
            }

            return res.status(201).json({ message: "Utilisateur créé avec succès !" });
        } catch (error) {

            console.error("Erreur inattendue", error);
            return res.status(500).json({ message: "Une erreur inattendue s'est produite." });
        }
    },

    // Fonction pour mettre à jour l'état de l'utilisateur
    updateUserState: async (req, res) => {

        try {
            const { user_state, user_date_in, user_date_out} = req.body;
            const user_id = req.params.id;

            if (!user_id || !user_state || !user_date_in) {
                return res.status(400).json({ error: "Tous les champs sont obligatoires" });
            }

            const result = await UserDb.updateUserState(user_id, user_state, user_date_in, user_date_out);

            if (result && result.affectedRows > 0) {
                return res.status(200).json({ message: "État de l'utilisateur mis à jour avec succès" });
            } else {

                return res.status(404).json({ error: "Utilisateur non trouvé ou erreur lors de la mise à jour" });
            }
        } catch (error) {

            console.error("Erreur  lors de la mise à jour de l'état de l'utilisateur");
            return res.status(500).json({ error: "Erreur lors de la mise à jour" });
        }
    },


     // Ajouter des permissions à un utilisateur
    createPermission: async (req, res) => {
        try {
            const { permission_label, permission_slug } = req.body;

        if (!permission_label || !permission_slug) {
            return res.status(400).json({ error: "Le label et l'identifiant de la permission sont obligatoires" });
        }

        const result = await UserDb.createPermission(permission_label, permission_slug);

        if (result && result.affectedRows > 0) {
            return res.status(201).json({ message: "Permission créée avec succès" });
        } else {
            return res.status(500).json({ error: "Erreur lors de la création des permissions" });
        }

    } catch (error) {
        console.error("Erreur lors de la création des permissions");
        return res.status(500).json({ error: "Erreur lors de la création des permissions" });
    }
},

    // Liée les permissions au profils

    permissionProfil: async (req, res) => {
        try {
            const { fk_permission_id, fk_profil_id } = req.body;

            if (!fk_permission_id || !fk_profil_id) {
                return res.status(400).json({ error: "Les identifiants de permission et de profil sont requis" });
            }

            const result = await UserDb.permissionProfil(fk_permission_id, fk_profil_id);

            if (result && result.affectedRows > 0) {
                return res.status(201).json({ message: "Liaison du profil et de la permission réussie" });
            } else {
                return res.status(500).json({ error: "Erreur lors de la liaison du profil et de la permission" });
            }
        } catch (error) {
            console.error("Erreur lors de la liaison du profil et de la permission");
            return res.status(500).json({ error: "Une erreur interne est survenue" });
        }
    },



     // Profil utilisateur :

     getUserProfile: async (req, res) => {
        try {
            const user_id = req.params.id;

            if (!user_id) {
                console.log("Aucun ID utilisateur n'est indiqué")
                return res.status(400).json({ error: "L'ID utilisateur est requis" });
            }

            const profile = await UserDb.getProfileByUserId(user_id);

            if (profile.length > 0) {
                res.status(200).json({message: "Profil utilisateur récupéré avec succès"})
            } else {
                res.status(404).json({ error: "Profil non trouvé" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur lors de la récupération du profil utilisateur" });
        }
    }

    // updateUserProfile: async (req, res) => {
    //     try {
    //         const { profile_state, profile_rank, profile_image } = req.body;
    //         const user_id = req.params.id;

    //         if (!user_id || !profile_state) {
    //             return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    //         }

    //         const result = await UserDb.updateProfile(user_id, profile_state, profile_rank, profile_image);
    //         if (result) {
    //             res.status(200).json({ message: "Profil utilisateur mis à jour avec succès" });
    //         } else {
    //             res.status(404).json({ error: "Profil non trouvé ou erreur lors de la mise à jour" });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Erreur lors de la mise à jour du profil utilisateur" });
    //     }
    // },


    // deleteUserProfile: async (req, res) => {
    //     try {
    //         const user_id = req.params.id;

    //         const userExist = await UserDb.getUserById(user_id);
    //         if (!userExist) {
    //             return res.status(404).json({ error: 'Utilisateur introuvable' });
    //         }

    //         const profileDeleteResult = await UserDb.deleteProfile(user_id);
    //         if (profileDeleteResult.error) {
    //             return res.status(500).json({ error: 'Erreur lors de la suppression du profil utilisateur' });
    //         }

    //         res.status(200).json({ message: "Utilisateur et profil supprimés avec succès" });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    //     }
    // }



   // Insérer l'utilisateur dans la base de données
     //const mailExist = await UserDb.checkEmailAvailable(mail);
     //if (!mailExist)
    //return res.status(409).json({ error: 'L\'adresse mail est déjà utilisée.' });

    //const userResponse = await UserDb.createUser(mail, hashedPasswordResult.hashed);
    //if (userResponse.error) {
    //return res.status(500).json({ message: userResponse.error });
    //}
    // // Connexion
    // login: async (req, res) => {
    //     try {
    //         const { mail, password } = req.body;

    //         // Vérifier la validité de l'email
    //         if (!mail || !isEmail(mail)) {
    //             return res.status(403).json({ message: `Email invalide` });
    //         }

    //         // Vérifier si le mot de passe est renseigné
    //         if (!stringIsFilled(password)) {
    //             return res.status(403).json({ message: `Mot de passe invalide` });
    //         }

    //         const response = await UserDb.signIn(mail);
    //         if (!response)
    //             return res.status(401).json({ message: `Échec de l'authentification` });

    //         if (!await compareHash(password, response.user_password))
    //             return res.status(401).json({ error: "Email ou mot de passe incorrect." });

    //         let id_user = response.id_user;
    //         const token = jwtSign(id_user);

    //         // Stockage des données de session dans l'objet req.session
    //         req.session.isLoggedIn = true;
    //         req.session.mail = response.user_mail;
    //         req.session.isAdmin = response.rank === 'admin';

    //         return res
    //             .status(200)
    //             .json({ message: "Connexion réussie !", user: { id_user, mail: response.user_mail }, token });
    //     } catch (error) {
    //         console.error("Erreur lors de la connexion de l'utilisateur");
    //         res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur." });
    //     }
    // },
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
}

export default UserController;
