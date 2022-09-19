require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

const routes = require("./routes");

app.use(express.json());

app.use(cors());
app.use(morgan('dev'));

app.use(routes);