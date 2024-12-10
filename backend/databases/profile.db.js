import db from './init.db.js';

const profileDb = {
    //Partie profil utilisateur
    createProfile: async (fk_user_id, profile_pseudo, profile_state, profile_rank) => {
        if(!fk_user_id || !profile_pseudo)
            throw new Error ("L'id du user et le pseudo du profil sont requis");

        const query = `
            INSERT INTO profiles (fk_user_id, profile_pseudo, profile_state, profile_rank)
            VALUES (?, ?, ?, ?);
        `;

        try {
            const result = await db(query, [fk_user_id, profile_pseudo, profile_state, profile_rank]);
            return result;
        } catch (error) {
            console.error('Erreur lors de l\'insertion :', error);
            return { error: error.message };
        }
    }
}

export default profileDb;