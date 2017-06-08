var app = angular.module('ServiceApp',['ngResource']);

app.factory('Tasks',function($resource){
	return $resource('http://localhost:3001/api/tasks/:category');
});

app.factory('Types',function($resource){
	return $resource('http://localhost:3001/api/types');
});

app.factory('updateTasks',function($resource){
	return $resource('http://localhost:3001/api/tasks/:_id',{},{
		update: {
			method: 'PUT'
		}
	});
});

app.factory('deleteTasks',function($resource){
	return $resource('http://localhost:3001/api/tasks/:_id');
});

app.factory('updateType', function($resource){
	return $resource('http://localhost:3001/api/types/:_id',{},{
		update: {
			method: 'PUT'
		}
	});
});

app.factory('deleteType', function($resource){
	return $resource('http://localhost:3001/api/types/:_id')
});