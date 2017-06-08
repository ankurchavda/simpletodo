var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	category:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}		
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var Task = module.exports = mongoose.model('Task', taskSchema);

module.exports.getTasks = function(callback,limit){
	Task.find(callback).limit(limit);
}


module.exports.getTasksForType = function(name, callback){
	name = capitalizeFirstLetter(name);
	var query = {category: name};
	Task.find(query,callback);
}

module.exports.addTask = function(task, callback){
	Task.create(task, callback);
}

module.exports.updateTask = function(id, task, options, callback){
	query = {_id: id};

	var update = {
		name: task.name,
		description : task.description,
		category : task.category
	}

	Task.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeTask = function(id, callback){
	var query = {_id: id};
	Task.remove(query, callback);
}

// model.exports.updateTaskOnEdit = function(val, newval, callback){
// 	Task.where('category', val).update({$set: {category: newval}}, function (err, count) {});
// }