// src/app.ts

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
