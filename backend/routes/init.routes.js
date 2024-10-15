import categoryRouter from './category.routes.js';
import articleRouter from './article.routes.js';
import commentRouter from './comment.routes.js';
import userRouter from './user.routes.js';

const initRoutes = (app) => {
    app.use('/category', categoryRouter);
    app.use('/article', articleRouter);
    app.use('/comment', commentRouter);
    app.use('/user', userRouter);
};

export default initRoutes;
