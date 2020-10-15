const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('../middleware/logger');
const handleError = require('../middleware/handle-error-middleware');

const server = express();
server.use(cors()).use(helmet()).use(logger()).use(express.json());



server.use(handleError());
server.get('/', (req, res) => {
	res.status(200).json({ message: 'Server is Running.' });
});

module.exports = server;