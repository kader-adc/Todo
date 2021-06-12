var express = require('express');

var mongoose = require('mongoose');

// connect db and check if connection is built successfully 
mongoose.connect('mongodb://localhost/todos',{
            useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log('DB Connected Successfully'))
    .catch((err) => {
        console.error("db Not connected: ", err);
    });

//data schema 
var todoSchema = new mongoose.Schema({
    item: String
})
// creat a todo model
var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'Study coding'}, {item:'do homeworks'}, {item:'go shopping'}]

var urlencodedParser = express.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
    //get data from db and render the view
    Todo.find({},function(err, data){
        if (err) throw err;
        res.render('todo', {todos: data});
    })


});

app.post('/todo',urlencodedParser, function(req, res){
    // save data from the view to db
    var newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        res.json(data);
    })  
  });

app.delete('/todo/:item', function(req, res){
    // delete item from db
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
        if (err) throw err;
        res.json(data);
    });
    });
};