import initArticleRoutes from './article.routes.js'
import initCategoryRoutes from './category.routes.js'
import initCommentRoutes from './comment.routes.js'
import initUserRoutes from './user.routes.js'

const initRoutes = (app) => {
    initArticleRoutes(app);
    initCategoryRoutes(app);
    initCommentRoutes(app);
    initUserRoutes(app);
};

export default initRoutes;