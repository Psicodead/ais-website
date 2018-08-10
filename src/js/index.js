var lodash = require('lodash');
var $ = require('jquery');
var json = require('./data/project.json'); //with path

//var mJson = JSON.parse(json);
console.log("json",json.projects);
function createProjects(){
	for (var i = json.projects.work.length - 1; i >= 0; i--) {
		//json.projects.work[i]
		var obj = json.projects.work[i];
		var work= $('<div />',{"class":'work'})
		var wTitle = $('<h1 />',{"class":'title', text:obj.title})
		var wDes = $('<p />',{"class":'description', text:obj.description})
		var wClient = $('<p />',{"class":'client', text:obj.client})
		work.append(wTitle,wDes,wClient)
		$(".work-container").append(work);
	};	
}

$(document).ready(()=>{
	createProjects();
})