import db from './init.db.js';

const UserDb = {
    // Fonction pour créer un utilisateur
    createUser: async (user_pseudo, user_firstname, user_name, user_mail, user_password) => {
        const query = `
            INSERT INTO user (user_pseudo, user_name, user_firstname, user_mail, user_password, user_state, user_date_in)
            VALUES (?, ?, ?, ?, ?, ?, NOW());
        `;

        try {
            const [result] = await db.poolQuery(query, [user_pseudo, user_firstname, user_name, user_mail, user_password, db.ACTIVE]);
            return result;
        } catch (error) {
            if (process.env.APP_ENV === 'dev') {
                console.error(error.stack);
            }
            return { error: error.message };
        }
    },

    getUserByPseudo: async (pseudo) => {
        const query = `SELECT user_id FROM user WHERE user_pseudo = ?`;

        try {
          const [result] = await db.poolQuery(query, [pseudo]);
          return result;
        } catch (error) {
          if (process.env.APP_ENV === 'dev') {
            console.error(error.stack);
          }
          return { error: error.message };
        }
      },



    getUserByEmail: async (email) => {
        const query = "SELECT user_id FROM user WHERE user_mail = ?";

        try {
            const [result] = await db.poolQuery(query, [email]);
            return result;
        } catch (error) {
            if (process.env.APP_ENV === 'dev') {
                console.error(error.stack);
            }
            return {error: error.message}
        }
    }


}


    // // Mise à jour de l'état de l'utilisateur
    // updateUserState: async (user_id, user_state, user_date_in, user_date_out) => {
    //     const query = `
    //         UPDATE user
    //         SET user_state = ?, user_date_in = ?, user_date_out = ?
    //         WHERE user_id = ?;
    //     `;
    //     const result= await db.poolQuery(query, [user_state, user_date_in, user_date_out, user_id]);
    //     return result;
    // },

    // // Ajouter des permissions à un utilisateur
    // createPermission: async (permission_label, permission_slug) => {
    //     if (!permission_label || !permission_slug) {
    //         throw new Error("Les champs description et identifiant sont requis");
    //     }

    // const query = `
    //    INSERT INTO permission (permission_label, permission_slug)
    //    VALUES (?, ?)
    // `;

    // try {
    //    const [result] = await db.poolQuery(query, [permission_label, permission_slug]);
    //    return result;
    // } catch (error) {
    //    console.error("Erreur lors de l'insertion des permissions");
    //    throw new Error("Erreur lors de l'insertion des permissions");
    // }

    // // Liée les permissions aux profils

    // permissionProfil: async (fk_permission_id, fk_profil_id) => {
    //     if (!fk_permission_id || !fk_profil_id) {
    //         throw new Error("Les identifiants de permission et de profil sont requis");
    //     }

    //     const query = `
    //         INSERT INTO profiles_permission (fk_permission_id, fk_profil_id)
    //         VALUES (?, ?)
    //     `;

    //     try {
    //         const [result] = await db.poolQuery(query, [fk_permission_id, fk_profil_id]);
    //         return result;
    //     } catch (error) {
    //         console.error("Erreur lors de la liaison du profil et de la permission");
    //         throw new Error("Erreur lors de la liaison du profil et de la permission");
    //     }
    // },





    /*
    // Connexion de l'utilisateur
    signIn: async (user_mail) => {
        const query = `
            SELECT *
            FROM user
            WHERE user_mail = ?;
        `;
        const result = await db(query, [user_mail]);
        return result;
    },
    */

    /*
    // Suppression d'un utilisateur
    deleteUser: async (id_user) => {
        const query = `
            DELETE FROM user
            WHERE user_id = ?;
        `;
        const result = await db(query, [id_user]);
        return result;
    },
    */

    /*
    // Mise à jour du mot de passe de l'utilisateur
    updatePassword: async (id_user, hashedPassword) => {
        const query = `
            UPDATE user
            SET user_password = ?
            WHERE user_id = ?;
        `;
        const result = await db(query, [hashedPassword, id_user]);
        return result;
    },
    */

    // getProfileByUserId: async (fk_user_id) => {
    //     const query = `
    //         SELECT * FROM profiles WHERE fk_user_id = ?;
    //     `;
    //     const result = await db(query, [fk_user_id]);
    //     return result;
    // },

    //updateProfile: async (profile_id, profile_pseudo, profile_state, profile_rank) => {
    //    const query = `
     //       UPDATE profiles
     //       SET profile_pseudo = ?, profile_state = ?, profile_rank = ?
     //       WHERE profile_id = ?;
     //   `;
     //   const result = await db(query, [profile_pseudo, profile_state, profile_rank, profile_id]);
     //   return result;
   // },

   // deleteProfile: async (profile_id) => {
      //  const query = `
       //     DELETE FROM profiles
       //     WHERE profile_id = ?;
       // `;
      //  const result = await db(query, [profile_id]);
      //  return result;
   // },

//};

    /*
    // Vérifie si l'email est disponible (pas déjà enregistré)
    checkEmailAvailable: async (user_mail) => {
        const query = `
            SELECT user_mail
            FROM users
            WHERE user_mail = ?;
        `;
        const result = await db(query, [user_mail]);
        return result.length === 0;
    },


    // Marque un utilisateur comme ayant vérifié son email
    markEmailAsVerified: async (id_user) => {
        const query = `
            UPDATE users
            SET is_email_verified = TRUE
            WHERE user_id = ?;
        `;
        const result = await db(query, [id_user]);
        return result;
    },
    */


export default UserDb;
