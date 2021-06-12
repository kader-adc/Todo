var express = require ('express');
var todocontroller = require('./controllers/todoController');

var app = express();

//set up template engine  

app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

// fire controllers 
todocontroller(app);

//listen to a port
app.listen(3000);
console.log('run is running on port 3000');
