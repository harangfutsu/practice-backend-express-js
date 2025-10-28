const router = require('express').Router();

const routes = [
    require('./courses.route'),
    require('./users.route'),
];

routes.forEach((route) => router.use(route));

module.exports = router;