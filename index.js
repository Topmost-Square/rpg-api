const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = process.env.PORT || 1111;
app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});

