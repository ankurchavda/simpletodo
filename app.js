var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var rp = require('request-promise');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Type = require('./models/type.js');
Task = require('./models/task.js');

var mongo = 'mongodb://localhost/todolist';
mongoose.connect(mongo);
var db = mongoose.connection;

db.on('error', console.error.bind(console, "error!"));

app.get('/', function(req, res){
	res.send('Hello World!');
});

//Type apis
app.get('/api/types', function(req, res){
	Type.getTypes(function(err, types){
		if(err){
			throw err;
		}
		res.json(types);

	});
});

app.post('/api/types', function(req, res){
	var type = req.body;
	Type.addType(type, function(err, type){
		if(err){
			throw err;
		}
		res.json(type);
	});
});

app.put('/api/types/:_id', function(req,res){
	var id = req.params._id;
	var type = req.body;
	Type.updateType(id, type, {}, function(err, type){
		if(err){
			throw err;
		}
		res.json(type);
	});
});

app.delete('/api/types/:_id', function(req, res){
	var id = req.params._id;
	Type.removeType(id, function(err, type){
		if(err){
			throw err;
		}
		res.json(type);
	});
});

//Task apis

app.get('/api/tasks', function(req, res){
	Task.getTasks(function(err, tasks){
		if(err){
			throw err;
		}
		res.json(tasks);
	});
});

app.get('/api/tasks/:category', function(req, res){
	var category = req.params.category;
	Task.getTasksForType(category, function(err, tasks){
		if(err){
			throw err;
		}
		res.json(tasks);
	});
});

app.post('/api/tasks', function(req, res){
	var task = req.body;
	Task.addTask(task, function(err, task){
		if(err){
			throw err;
		}
		res.json(task);
	});
});

app.put('/api/tasks/:_id', function(req,res){
	var id = req.params._id;
	var task = req.body;

	Task.updateTask(id, task, {}, function(err, task){
		if(err){
			throw err;
		}
		res.json(task);
	});
});

app.delete('/api/tasks/:_id', function(req, res){
	var id = req.params._id;
	Task.removeTask(id, function(err, task){
		if(err){
			throw err;
		}
		res.json(task);
	});
});

app.listen(3001);
console.log('Running on port 3001');