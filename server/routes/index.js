import UserRouter from './user.route.js'
import ArtworkRouter from './artwork.route.js'
import CategoryRouter from './category.route.js'
import CollectionRouter from './collection.route.js'
import OrderRouter from './order.route.js'


export default function route(app) {
    app.use('/users', UserRouter);
    app.use('/artworks', ArtworkRouter);
    app.use('/categories', CategoryRouter);
    app.use('/collections', CollectionRouter);
    app.use('/orders', OrderRouter);
    // app.use('/events', EventRouter);
    // app.use('/reports', ReportRouter);
    // app.use('/', siteRouter);
}