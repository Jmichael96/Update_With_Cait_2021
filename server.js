require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const app = express();
const routes = require('./routes/index');
const connectDB = require('./services/db');

// connect to the database
connectDB();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(routes);

app.listen(PORT, () => {
    console.log(`Bears... Beets... Battlestar Galactica on Port ${PORT}`);
});