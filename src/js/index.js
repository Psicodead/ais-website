var lodash = require('lodash');
var $ = require('jquery');
var json = require('./data/project.json'); //with path
var tempUri = window.location.hash;
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
	tempUri = window.location.hash;
	console.log('code ready');
	//createProjects();
	menuControl();
	selectWork();
	nav();
	checkURL();
	renderContent(tempUri);
	
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
		TweenLite.killTweensOf('.menu .opt');
		TweenLite.set('.menu .opt', {clearProps:"all"});
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
		
		setTimeout(()=>{
			//console.log('datalink',$(this)[0].getAttribute("data-link"))
			if(!$(this)[0].getAttribute("data-link"))
				return
			hideSection($('.section').not('.hidden'));
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
	console.log("hidding",tSection[0])
	tSection.addClass('transitionOut');
	tSection.removeClass('show');
	setTimeout(()=>{
		tSection.addClass('hidden');
		tSection.removeClass('transitionOut');
	},600);
}
function showSection(tSection){
	tSection.addClass('transitionOut');
	
	var transOut = new Promise(function(resolve, reject) {
		tSection.removeClass('hidden');
		setTimeout(()=>{
			resolve();
		},10);
	});
	
	var removeHidden = new Promise(function(resolve, reject) {
		// tSection.removeClass('hidden');
		setTimeout(()=>{
			tSection.addClass('show');
			resolve();
		},200);
	});
	
	Promise.all([transOut,removeHidden]).then(()=>{
		tSection.addClass('show');
		tSection.removeClass('transitionOut');
	})
}
function nav(){
	$('.menu .opt').click(()=>{
		setTimeout(()=>{
			closeMenu();
		},250)
	})
	// $('.menu-work').click(()=>{
	// 	hideSection($('.section').not('#work-section').not('.hidden'));
	// 	setTimeout(()=>{
	// 		showSection($('#work-section'));
	// 	},300)
	// 	//$('.section').addClass('hidden')
	// 	//$('#work-section').removeClass('hidden');
		
	// 	showCategoryWork();
	// })
	// $('.menu-lab').click(()=>{
	// 	hideSection($('.section').not('#work-section').not('.hidden'));
	// 	setTimeout(()=>{
	// 		showSection($('#work-section'));
	// 	},300)
	// 	showCategoryLab();
	// })
	// $('.menu-about').click(()=>{
	// 	hideSection($('.section').not('#about-section').not('.hidden'));
	// 	setTimeout(()=>{
	// 		showSection($('#about-section'));
	// 		$('#about-section .content').scrollTop(0);
	// 	},300)
	// })
	// $('.menu-contact').click(()=>{
		
	// })
	$('.goBack .container').click(()=>{
		hideSection($('.section').not('#work-section').not('.hidden'));
		setTimeout(()=>{
			showSection($('#work-section'));
		},300)
		showCategoryWork();
	})
}

function checkURL(){
	window.onpopstate = function(event) {
		tempUri = window.location.hash;
		console.log('url', tempUri);
		renderContent(tempUri);
		//console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
	};
	// var tempUri = window.location.pathname;
	// Console.log('url', tempUri);
	
}

function renderContent(uri){
	console.log('rendering url', uri);
	switch(uri){
		case '#aboutus':
			hideSection($('.section').not('#about-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#about-section'));
			},300)
		break;
		case '#work':
			hideSection($('.section').not('#work-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#work-section'));
			},300)
		break;
		case '#comefindme':
			hideSection($('.section').not('#come-find-me').not('.hidden'));
			setTimeout(()=>{
				showSection($('#come-find-me'));
			},300)
		break;
		case '#carhartt':
			hideSection($('.section').not('#carhartt').not('.hidden'));
			setTimeout(()=>{
				showSection($('#carhartt'));
			},300)
		break;
		case '#monarch':
		hideSection($('.section').not('#monarch').not('.hidden'));
		setTimeout(()=>{
			showSection($('#monarch'));
		},300)
		break;
		case '#contact':
			hideSection($('.section').not('#work-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#work-section'));
			},300)
		break;
		case '#':
			hideSection($('.section').not('#landing-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#landing-section'));
			},300)
		break;
		case '#landing':
			hideSection($('.section').not('#landing-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#landing-section'));
			},300)
		break;
		default:
			hideSection($('.section').not('#landing-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#landing-section'));
			},300)
		break;
	}
}
function UIAnimations(){
	var menu = $('.menu');
	var options = menu.find('.opt');
	$.each(options, function(i,val){
		TweenLite.from(options[i],0.6,{left:"-40rem", opacity: 0, delay:0.2+(i*0.2)})
	})
}