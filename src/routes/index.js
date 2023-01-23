const express = require('express');

const V1ROUTES = require('./v1/index')

const router = express();

router.use('/v1' , V1ROUTES);

module.exports = router


