const connect = require('./connect');
const express = require("express");
const cors = require("cors");
const posts = require('./postRoutes.js');
const users = require('./userRoutes.js');
const awsRoutes = require('./awsRoutes');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(posts);
app.use(users);
app.use(awsRoutes);

app.use(upload.any());

app.listen(PORT, () => {
    connect.connectToServer();
    console.log(`Server is running on Port ${PORT}`);
});
