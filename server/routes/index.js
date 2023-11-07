import userRouter from './userRouter.js'

export default function route(app) {
    app.use('/users', userRouter);
    // app.use('/', siteRouter);
}