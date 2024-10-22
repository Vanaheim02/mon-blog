// import initArticleRoutes from './article.routes.js';
import initCategoryRoutes from './category.routes.js';
// import commentRouter from './comment.routes.js';
// import userRouter from './user.routes.js';

const initRoutes = (app) => {
    // initArticleRoutes(app);
    initCategoryRoutes(app);
    // app.use('/comment', commentRouter);
    // app.use('/user', userRouter);
};

export default initRoutes;