const express = require('express');

const app = express();

app.use(express.json());

require('dotenv').config();

require('./controllers/hourController')(app);

require('./controllers/authController')(app);

app.listen(process.env.PORT || 3333);