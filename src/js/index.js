var lodash = require('lodash');
var $ = require('jquery');
var json = require('./data/project.json'); //with path
import { TweenMax, TimelineLite, Power4, Power3, Linear, Elastic, CSSPlugin, ScrollToPlugin} from 'gsap';
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
	nav();
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
	setTimeout(()=>{
		UIAnimations();
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

	$('.project').click(function(){
		hideSection($('.section').not('.hidden'));
		setTimeout(()=>{
			showSection($($(this)[0].getAttribute("data-link")));
		},300)
	})


	$('.work-type .opt').click(function(){
		$('.work-type .opt').removeClass('selected');
		$(this).addClass('selected');
		if($(this).hasClass("work-opt")){
			showCategoryWork();
		}else{
			showCategoryLab();
		}
	})
}
function showCategoryWork(){
	$('.project').removeClass('selected');
	$('.bg-container img').removeClass('selected');
	$('.two').addClass('selected'); //focus second project
	$('#work-section .work-projects').removeClass('hidden');
	$('#work-section .lab-projects').addClass('hidden');
	$('#work-section .workOpts').removeClass('hidden');
	$('#work-section .labOpts').addClass('hidden');
}
function showCategoryLab(){
	$('.project').removeClass('selected');
	$('.bg-container img').removeClass('selected');
	$('.one').addClass('selected'); //focus first project
	$('#work-section .lab-projects').removeClass('hidden');
	$('#work-section .work-projects').addClass('hidden');
	$('#work-section .labOpts').removeClass('hidden');
	$('#work-section .workOpts').addClass('hidden');
}
function hideSection(tSection){
	tSection.removeClass('show');
	tSection.addClass('transitionOut');
	setTimeout(()=>{
		tSection.addClass('hidden');
		tSection.removeClass('transitionOut');
	},600);
}
function showSection(tSection){
	//TODO Fix this method!!!
	//console.log(tSection);
	tSection.addClass('transitionOut');
	//tSection.removeClass('hidden');
	setTimeout(()=>{
		tSection.removeClass('hidden');	
	},10);
	tSection.removeClass('transitionOut');
	tSection.addClass('show');
}
function nav(){
	$('.menu .opt').click(()=>{
		setTimeout(()=>{
			closeMenu();
		},150)
	})
	$('.menu-work').click(()=>{
		hideSection($('.section').not('#work-section').not('.hidden'));
		setTimeout(()=>{
			showSection($('#work-section'));
		},300)
		//$('.section').addClass('hidden')
		//$('#work-section').removeClass('hidden');
		
		showCategoryWork();
	})
	$('.menu-lab').click(()=>{
		hideSection($('.section').not('#work-section').not('.hidden'));
		setTimeout(()=>{
			showSection($('#work-section'));
		},300)
		showCategoryLab();
	})
	$('.menu-about').click(()=>{
		hideSection($('.section').not('#about-section').not('.hidden'));
		setTimeout(()=>{
			showSection($('#about-section'));
			$('#about-section .content').scrollTop(0);
		},300)
	})
	$('.menu-contact').click(()=>{
		
	})
	$('.goBack .container').click(()=>{
		hideSection($('.section').not('#work-section').not('.hidden'));
		setTimeout(()=>{
			showSection($('#work-section'));
		},300)
		showCategoryWork();
	})
}

function UIAnimations(){
	var menu = $('.menu');
	var options = menu.find('.opt');
	$.each(options, function(i,val){
		TweenLite.from(options[i],0.6,{left:"-40rem", opacity: 0, delay:0.2+(i*0.2)})
	})
}