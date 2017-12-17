var mongoose      = require('mongoose');

var databaseURI   = "mongodb://127.0.0.1:27017/esource_demo"

// load models
//
// var models_path = __dirname + '/app/models'
//fs.readdirSync(models_path).forEach(function (file) {
//  if (~file.indexOf('.js')) require(models_path + '/' + file)
//})

mongoose.connect(databaseURI, function(err) {
  if (err) {
    console.error("Error connecting to the database...");
    console.error("Please ensure DB server is available at " + databaseURI);
    console.error("   and that the security configuration is correct")
    console.error("Error message: ", err);
    console.error("Terminating application server");
    process.exit();
  } else {
    console.log(databaseURI + ' connected.');
  }
});

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + databaseURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
