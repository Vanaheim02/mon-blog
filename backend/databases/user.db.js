import db from './init.db.js';

const UserDb = {
    // Méthode pour créer un nouvel utilisateur avec un profil simple
    createUser: async (user_mail, user_password, username = null, profile_image = null) => {
        const query = `
            INSERT INTO users (user_mail, user_password, username, profile_image)
            VALUES (?, ?, ?, ?);
        `;

        const result = await db(query, [user_mail, user_password, username, profile_image]);
        return result;
    },

    // Vérifier si l'e-mail est disponible
    checkEmailAvailable: async (user_mail) => {
        const query = `
            SELECT user_mail
            FROM users
            WHERE user_mail = ?;
        `;

        const result = await db(query, [user_mail]);
        return result.length === 0;
    },

    // Se connecter
    signIn: async (user_mail) => {
        const query = `
            SELECT *
            FROM users
            WHERE user_mail = ?;
        `;

        const result = await db(query, [user_mail]);
        return result[0] || false;
    },

    // Mettre à jour le mot de passe
    updatePassword: async (id_user, hashedPassword) => {
        const query = `
            UPDATE users
            SET user_password = ?
            WHERE id_user = ?;
        `;

        const result = await db(query, [hashedPassword, id_user]);
        return result;
    },

    // Supprimer un utilisateur
    deleteUser: async (id_user) => {
        const query = `
            DELETE FROM users
            WHERE id_user = ?;
        `;

        const result = await db(query, [id_user]);
        return result;
    },



    // Mettre à jour le token de réinitialisation de mot de passe
    updateResetToken: async (id_user, resetToken) => {
        const query = `
            UPDATE users
            SET reset_token = ?
            WHERE id_user = ?;
        `;

        const result = await db(query, [resetToken, id_user]);
        return result;
    },

    // Marquer l'adresse e-mail comme vérifiée
    markEmailAsVerified: async (id_user) => {
        const query = `
            UPDATE users
            SET is_email_verified = TRUE
            WHERE id_user = ?;
        `;

        const result = await db(query, [id_user]);
        return result;
    }
};

export { UserDb };
