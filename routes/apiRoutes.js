var express 					= require('express');
var router 						= express.Router();
var users					= require('../controllers/api/users');
var tasks					= require('../controllers/api/taskDefinition');


router.get('/api/users', users.getAll);
router.get('/api/tasks', tasks.getAll);

module.exports = router;