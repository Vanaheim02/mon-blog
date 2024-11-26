import db from './init.db.js';

const UserDb = {
    // Création d'un utilisateur
    createUser: async (user_mail, user_password, username = null, profile_image = null) => {
        const query = `
            INSERT INTO users (user_mail, user_password, username, profile_image)
            VALUES (?, ?, ?, ?);
        `;
        const result = await db(query, [user_mail, user_password, username, profile_image]);
        return result;
    },

    // Mise à jour de l'état de l'utilisateur
    updateUserState: async (user_id, user_state, user_date_in, user_date_out = null) => {
        const query = `
            UPDATE users
            SET user_state = ?, user_date_in = ?, user_date_out = ?
            WHERE user_id = ?;
        `;
        const result= await db.execute(query, [user_state, user_date_in, user_date_out, user_id]);
        return result;
    },

    // Connexion de l'utilisateur
    signIn: async (user_mail) => {
        const query = `
            SELECT *
            FROM users
            WHERE user_mail = ?;
        `;
        const result = await db(query, [user_mail]);
        return result;
    },

    // Suppression d'un utilisateur
    deleteUser: async (id_user) => {
        const query = `
            DELETE FROM users
            WHERE user_id = ?;
        `;
        const result = await db(query, [id_user]);
        return result;
    },
       // Mise à jour du mot de passe de l'utilisateur
       updatePassword: async (id_user, hashedPassword) => {
        const query = `
            UPDATE users
            SET user_password = ?
            WHERE user_id = ?;
        `;
        const result = await db(query, [hashedPassword, id_user]);
        return result;
    },

    // Partie profil utilisateur


     createProfile: async (profil_id, profile_pseudo, profile_state, profile_rank) => {
        const query = `
            INSERT INTO profiles (fk_user_id, profile_pseudo, profile_state, profile_rank)
            VALUES (?, ?, ?, ?);
        `;
        const result = await db(query, [profil_id, profile_pseudo, profile_state, profile_rank]);
        return result;
    },


    getProfileByUserId: async (profil_id) => {
        const query = `
            SELECT * FROM profiles WHERE fk_user_id = ?;
        `;
        const result = await db(query, [profil_id]);
        return result;
    },

    updateProfile: async (profile_id, profile_pseudo, profile_state, profile_rank) => {
        const query = `
            UPDATE profiles
            SET profile_pseudo = ?, profile_state = ?, profile_rank = ?
            WHERE profile_id = ?;
        `;
        const result = await db(query, [profile_pseudo, profile_state, profile_rank, profile_id]);
        return result;
    },

    deleteProfile: async (profile_id) => {
        const query = `
            DELETE FROM profiles
            WHERE profile_id = ?;
        `;
        const result = await db(query, [profile_id]);
        return result;
    },


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
};

export { UserDb };
