import initArticleRoutes from './article.routes.js';
import initCategoryRoutes from './category.routes.js';
import initUserRoutes from './user.routes.js';
import initCommentRoutes from './comment.routes.js';


const initRoutes = (app) => {

    initArticleRoutes(app);
    initCategoryRoutes(app);
    initUserRoutes(app);
    initCommentRoutes(app);

};

export default initRoutes;
