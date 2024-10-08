import Database from "./init.db.js";

const UserDb = {
    // Méthode pour créer un nouvel utilisateur
    createUser: async (user_mail, user_password) => {
        const query = `
      INSERT INTO user (user_mail, user_password)
      VALUES (?, ?);
    `;

        const result = await Database(query, [user_mail, user_password]);
        return result;
    },

    checkEmailAvailable: async (user_mail) => {
        const query = `
			SELECT
				user_mail
			FROM
				user
			WHERE
				user_mail = ?
		;`;

        const result = await Database(query, [user_mail]);
        if (typeof result[0] !== 'undefined')
            return false;

        return true;
    },

    signIn: async (user_mail) => {
        const query = `
			SELECT *
			FROM id_user
			WHERE user_mail = ?
		;`;

        const result = await Database(query, [user_mail]);

        if (typeof result[0] !== 'undefined')
            return result[0];

        return false;
    },

    updatePassword: async (id_user, hashedPassword) => {
        const query = `UPDATE user
			SET user_password = ?
			WHERE id_user = ?
		;`;

        const result = await Database(query, [hashedPassword, id_user]);
        return result;
    },

    /**
     * Méthode pour supprimer un utilisateur
     * @author Manon Rouquette
     *
     * @param {int} userId		ID de l'utilisateur
     * @returns OkPacket|boolean
     */
    deleteUser: async (id_user) => {
        const query = `
			DELETE FROM user
			WHERE id_user = ?;
		`;

        const result = await Database(query, [id_user]);
        return result;
    },

    /**
     * Méthode pour récupérer les détails d'un utilisateur par son identifiant
     * @author Manon Rouquette
     *
     * @param {int} userId 		ID de l'utilisateur
     * @returns RowDatePacket|boolean
     */
    getUserById: async (id_user) => {
        const query = `
			SELECT *
			FROM user
			WHERE id_user = ?;
		`;

        const result = await Database(query, [id_user]);

        // Retourne le premier utilisateur trouvé, ou false
        if (typeof result[0] !== 'undefined')
            return result[0];

        return false;
    },

    // Méthode pour mettre à jour le token de réinitialisation de mot de passe
    updateResetToken: async (id_user, resetToken) => {
        const query = `
      UPDATE user
      SET reset_token = ?
      WHERE id_user = ?;
    `;

        const result = await query(query, [resetToken, id_user]);
        return result;
    },

    // Méthode pour marquer l'adresse e-mail comme vérifiée
    markEmailAsVerified: async (id_user) => {
        const query = `
      UPDATE user
      SET is_email_verified = TRUE
      WHERE id_user = ?;
    `;

        const result = await query(query, [id_user]);
        return result;
    },

    // Méthode pour ajouter un jeu à la liste personnelle d'un utilisateur
    addGameToUserList: async (id_user, id_game) => {
        const query = `
      INSERT INTO user_lists (id_user, id_game)
      VALUES (?, ?);
    `;

        const result = await query(query, [id_user, id_game]);
        return result;
    },

    // Méthode pour récupérer tous les jeux dans la liste personnelle d'un utilisateur
    getUserList: async (id_user) => {
        const query = `
      SELECT games.*
      FROM games
      JOIN user_lists ON id.games = user_lists.id_game
      WHERE user_lists.id_user = ?;
    `;

        const result = await query(query, [id_user]);
        return result;
    },

    // Méthode pour supprimer un jeu de la liste personnelle d'un utilisateur
    removeGameFromUserList: async (id_user, id_game) => {
        const query = `
      DELETE FROM user_lists
      WHERE id_user = ? AND id_game = ?;
    `;

        const result = await query(query, [id_user, id_game]);
        return result;
    }
};

export { UserDb };