import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const initMiddlewares = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: 'http://localhost:5173' }));
    app.use(helmet());
    app.use(session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
};

export default initMiddlewares;

