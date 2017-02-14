const express = require('express');
const jsonParser = require('body-parser').json;
const routes = require('./routes');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(jsonParser());

app.use('/questions', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        }
    });
})

app.listen(port, () => {
    console.log(`Express server is listening at port: ${port}`);
})