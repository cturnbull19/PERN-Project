const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;

//middleware
app.use(cors());
app.use(express.json());

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// init cookie-parser
const { COOKIE_SECRET } = require('./secrets');
const cookieParser = require('cookie-parser');
app.use(cookieParser(COOKIE_SECRET));

// init db client
const client = require('./db/client');
client.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Router: /api
app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});