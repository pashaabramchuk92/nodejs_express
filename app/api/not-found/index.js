const { Router } = require('express');
const { notFound } = require('./not-found.controller');

const router = Router();

router.get('/', notFound);

module.exports = router;