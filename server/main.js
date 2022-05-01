const express = require('express');
const cors = require('cors');

const usersRouter = require('./routers/usersRouter');
const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/membersRouter');
const subscriptionsRouter = require('./routers/subscriptionRouter');

const app = express();

require('./configs/dataBase');

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)
app.use('/members', membersRouter)
app.use('/subscriptions', subscriptionsRouter)

app.listen(8000);