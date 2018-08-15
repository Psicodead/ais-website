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
	menuControl();
	selectWork();
})

function menuControl(){
	$('.openMenuBtn').click(()=>{
		$('.menu').addClass('transition');
		setTimeout(()=>{
			$('.menu').removeClass('hidden');
			$('.menu').addClass('show');
			$('.openMenuBtn').addClass('hidden');
			$('.closeMenuBtn').removeClass('hidden');
		},10)
	})
	$('.closeMenuBtn').click(()=>{
		$('.menu').removeClass('show');
		$('.menu').addClass('hidden');
		$('.openMenuBtn').removeClass('hidden');
		$('.closeMenuBtn').addClass('hidden');
		setTimeout(()=>{
			$('.menu').removeClass('transition');
		},300)
	})
}

function selectWork(){
	$('.project').hover(()=>{
		$('.project').removeClass('selected');
		$('.work-bg-container img').removeClass('selected');
	})

	$('.project.one').hover(()=>{
		$('.one').addClass('selected');
	})
	$('.project.two').hover(()=>{
		$('.two').addClass('selected');
	})
	$('.project.three').hover(()=>{
		$('.three').addClass('selected');
	})
}