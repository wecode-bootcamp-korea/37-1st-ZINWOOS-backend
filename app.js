require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json);

app.listen(3000, () => {
  console.log('server listening on port 3000');
});