const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const auth = require('./routes/auth');

const router = express.Router();

app.use(cors());
router.use('/auth', auth);

app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = process.env.PORT || 1111;
app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});

