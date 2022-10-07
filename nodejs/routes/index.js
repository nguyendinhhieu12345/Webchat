const loginRouter = require('./login')


function route(app) {
    app.use('/', loginRouter);
}

module.exports = route;
