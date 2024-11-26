import bcrypt from 'bcrypt'

const tools = {
    validateEmail: (mail) => {
        const emailRegex = /^(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:".+"))@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

        if(typeof mail === 'undefined' || !mail || mail.trim().length === 0)
            return false;

        return emailRegex.test(mail);
    },

    validatePassword: (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if(typeof password === 'undefined' || !password || password.trim().length === 0)
            return false;

        return passwordRegex.test(password)
    },

    hashPassword: async (password) => {
        try {
            const passwordHash = await bcrypt.hash(password);
            return { passwordHash };
        } catch (error) {
            return { error: 'Erreur lors du hachage du mot de passe.' };
        }
    }
};

export default tools;
