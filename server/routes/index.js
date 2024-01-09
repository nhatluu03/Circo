import UserRouter from './user.route.js'
import ArtworkRouter from './artwork.route.js'
import FieldRouter from './field.route.js'
import CollectionRouter from './collection.route.js'
import OrderRouter from './order.route.js'
import CommissionRouter from './commission.route.js'
import CouponRouter from './coupon.route.js'
import ConversationRouter from './conversation.route.js'
// import MessageRouter from './message.route.js'

export default function route(app) { 
    app.use('/users', UserRouter);
    app.use('/artworks', ArtworkRouter);
    app.use('/fields', FieldRouter);
    app.use('/collections', CollectionRouter);
    app.use('/orders', OrderRouter);
    app.use('/commissions', CommissionRouter);
    app.use('/coupons', CouponRouter);
    app.use('/conversations', ConversationRouter);
    // app.use('/messages', MessageRouter);
    // app.use('/events', EventRouter);
    // app.use('/reports', ReportRouter);
    // app.use('/', siteRouter);
}