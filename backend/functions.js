import { hash, compare } from "bcrypt";


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
            let saltRounds = 11;
            let hashedPassword;

            await hash(password, saltRounds).then((hash) => {
                hashedPassword = hash;
            });

            return hashedPassword;
        } catch(error) {
            if (process.env.APP_ENV == 'dev')
                console.error(error.stack);

            return { error: error.message };
        }
    }
};

export default tools;
