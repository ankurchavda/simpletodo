var app = angular.module('myApp', ['ServiceApp']);

app.controller("IndexController", function(Types, Tasks, updateTasks, updateType, deleteTasks, deleteType, $scope){
	$scope.Types = Types.query();
	//$scope.Tasks = getTasks.query({category: "music"});
	$scope.loadTypes = function(){
		$scope.Types = Types.query();		
	}
	var x;
	$scope.fillCategory = function(type){
		 x = type.name;
	}
	$scope.changeHeader =function(category)
	{
		 document.getElementById("header").innerHTML = category;
		 x = category;
	}
 	$scope.populatetask = function(type)
	{
		$scope.Tasks = Tasks.query({category: type.name});
	}
	
	$scope.addType = function(type)
	{
		Types.save(type);
		$scope.loadTypes();
	}
	$scope.addTask = function(task)
	{
		task.category = x;
		Tasks.save(task);
		var form = document.getElementById("taskForm");
		form.reset();
		$scope.Tasks = Tasks.query({category: task.category});
	}

	$scope.populateModal = function(value)
	{
		$scope.modalValue = value;
	}
	$scope.populateTypeModal = function(value)
	{
		$scope.modalValue1 = value;
	} 

	$scope.editTask = function(task)
	{
		updateTasks.update({_id: task._id},task);
		$scope.Tasks = Tasks.query({category: task.category});		
	}

	$scope.deleteTask = function(task){
		deleteTasks.remove({_id : task._id});
		$scope.Tasks = Tasks.query({category: task.category});		
	}
	$scope.editType = function(type){
		updateType.update({_id: type._id},type);
		$scope.Types = Types.query();
	}
	$scope.deleteType = function(type){
		deleteType.remove({_id: type._id});
		$scope.Types = Types.query();
	}
	$scope.formValue= false;
	$scope.enableInput= function(){
		$scope.formValue =true;
	}
});