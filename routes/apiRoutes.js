var express 					= require('express');
var router 						= express.Router();
var users					= require('../controllers/api/users');
var tasks					= require('../controllers/api/taskDefinition');

var fs=require('fs');
var path=require('path');
// function requireRole (role) {
//     return function (req, res, next) {
//         if (req.session.user && req.session.user.role === role) {
//             next();
//         } else {
//             res.send(403);
//         }
//     }
// }
//
// // All bars are protected
// app.all("/api/bar", requireRole("admin"));
//
// // All paths starting with "/foo/bar/" are protected
// app.all("/foo/bar/*", requireRole("user"));

router.get('/api/users', users.getAll);
router.get('/api/tasks', tasks.getAll);

router.get('/api/static/:obj/:key', getFile);

// app.route('/tasks')
//   .get(todoList.list_all_tasks)
//   .post(todoList.create_a_task);
//
//
// app.route('/tasks/:taskId')
//   .get(todoList.read_a_task)
//   .put(todoList.update_a_task)
//   .delete(todoList.delete_a_task);

module.exports = router;

function getFile(req,res){

  fs.readFile(path.resolve(__dirname, req.params.obj + '.json'), "utf8", function read(err, content) {
    if (err) {
        console.log(err);
    }

    if(req.params.key !== undefined){
      var val = content.search(req.params.key);
      console.log('filtered content ', val);
    }
    // var content = [
    //   {"name": "Afghanistan", "code": "AF"},
    //   {"name": "Åland Islands", "code": "AX"}
    // ];

    res.send(content);
  });
}
