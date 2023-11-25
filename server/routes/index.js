import UserRouter from './user.route.js'
import ArtworkRouter from './artwork.route.js'
import ArtworkCategoryRouter from './category.route.js'
import CollectionRouter from './collection.route.js'

export default function route(app) {
    app.use('/users', UserRouter);
    app.use('/artworks', ArtworkRouter);
    app.use('/categories', ArtworkCategoryRouter);
    app.use('/collections', CollectionRouter)
    // app.use('/events', EventRouter);
    // app.use('/reports', ReportRouter);
    // app.use('/', siteRouter);
}