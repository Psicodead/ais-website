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
	menuNav();
})

function menuControl(){
	$('.openMenuBtn').click(()=>{
		openMenu();
	})
	$('.closeMenuBtn').click(()=>{
		closeMenu();
	})
}
function closeMenu(){
	$('.menu').removeClass('show');
	$('.menu').addClass('hidden');
	$('.openMenuBtn').removeClass('hidden');
	$('.closeMenuBtn').addClass('hidden');
	$('.isotipo').removeClass('show');
	setTimeout(()=>{
		$('.menu').removeClass('transition');
	},300)
}

function openMenu(){
	$('.menu').addClass('transition');
	$('.isotipo').addClass('show');
	setTimeout(()=>{
		$('.menu').removeClass('hidden');
		$('.menu').addClass('show');
		$('.openMenuBtn').addClass('hidden');
		$('.closeMenuBtn').removeClass('hidden');
	},10)
}
function selectWork(){
	$('.project').hover(()=>{
		$('.project').removeClass('selected');
		$('.bg-container img').removeClass('selected');
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

	$('.work-type .opt').click(function(){
		$('.work-type .opt').removeClass('selected');
		$(this).addClass('selected');
		if($(this).hasClass("work-opt")){
			$('.project').removeClass('selected');
			$('.bg-container img').removeClass('selected');
			$('.two').addClass('selected'); //focus second project
			$('#work-section .work-projects').removeClass('hidden');
			$('#work-section .lab-projects').addClass('hidden');
			$('#work-section .workOpts').removeClass('hidden');
			$('#work-section .labOpts').addClass('hidden');
		}else{
			$('.project').removeClass('selected');
			$('.bg-container img').removeClass('selected');
			$('.one').addClass('selected'); //focus first project
			$('#work-section .lab-projects').removeClass('hidden');
			$('#work-section .work-projects').addClass('hidden');
			$('#work-section .labOpts').removeClass('hidden');
			$('#work-section .workOpts').addClass('hidden');
		}
	})
}

function menuNav(){
	$('.menu .opt').click(()=>{
		closeMenu();
	})
	$('.menu-work').click(()=>{
		$('.section').addClass('hidden')
		$('#work-section').removeClass('hidden');
	})
}