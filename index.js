const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 7777;
app.listen(port, () => {
    console.log(`API server is running`);
});

