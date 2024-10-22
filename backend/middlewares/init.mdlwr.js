import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';

const initMiddlewares = (app) => {
    // app.use(cors({ origin: 'http://localhost:5173' }));
    app.use(cors());
    app.use(helmet());
    app.use(session({
        secret: process.env.APP_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false
        }
    }));
};

export default initMiddlewares;

