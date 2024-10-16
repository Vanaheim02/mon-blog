import initArticleRoutes from './article.routes.js';
// import categoryRouter from './category.routes.js';
// import commentRouter from './comment.routes.js';
// import userRouter from './user.routes.js';

const initRoutes = (app) => {
    initArticleRoutes(app);
    // app.use('/category', categoryRouter);
    // app.use('/comment', commentRouter);
    // app.use('/user', userRouter);
};

export default initRoutes;
