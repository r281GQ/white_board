const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.get(express.static(path.join(__dirname, '/../../build')));

app.listen(PORT, () => console.log());
