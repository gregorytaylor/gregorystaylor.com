// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// window.$ = window.jQuery = require('jquery');

// var bootstrap = require('bootstrap'); //optionally require all bootstrap js for testing

// require('bootstrap/js/src/collapse');
// require('bootstrap/js/src/scrollspy');

var scrollspy = require('scrollspy-js');





//
// navigation
//

// toggle mobile nav
$('.navbar-toggler').click(function() {
	if ($('.navbar-nav').css('display') === 'none') {
		$('.navbar-nav').css('display','flex');
		$('.page-nav').css('top','91px');
		console.log('add style')
	} else {
		$('.navbar-nav').css('display','none');
		$('.page-nav').css('top','55px');
	}
})


// add active class to current nav link
$('.top-nav .navbar-nav a').filter(function(){
	return this.href == location.href.replace(/#.*/, "");
}).addClass('active').removeAttr('href');




//
// form input label animation
//

// form label animation on input
$(function () {
	var showClass = 'show';

	$('#formContact .form-control').on('checkval', function () {
		var label = $(this).prev('label');
		
		if(this.value !== '') {
  			label.addClass(showClass);
		} else {
  			label.removeClass(showClass);
		}
	}).on('keyup', function () {
		$(this).trigger('checkval');
	}); 
});


// form input on :focus toggle .focused class on prev() <label> element
$('#formContact').delegate('*', 'focus blur', function() {
	var elem = $(this);

	setTimeout(function() {
		elem.prev().toggleClass('focused', elem.is(':focus'));
	}, 0);
});


// scrollspy-js
var spy = new ScrollSpy('.page-nav', {
	nav: '.page-nav > a',
	className: 'active',
	callback: function () {

	}
});