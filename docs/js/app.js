(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"scrollspy-js":3}],2:[function(require,module,exports){
function ScrollSpy (wrapper, opt) {

  this.doc = document;
  this.wrapper = (typeof wrapper === 'string') ? this.doc.querySelector(wrapper) : wrapper;
  this.nav = this.wrapper.querySelectorAll(opt.nav);

  this.contents = [];
  this.win = window;

  this.winH = this.win.innerHeight;

  this.className = opt.className;

  this.callback = opt.callback;

  this.init();
}

ScrollSpy.prototype.init = function () {
  this.contents = this.getContents();
  this.attachEvent();
};

ScrollSpy.prototype.getContents = function () {
  var targetList = [];

  for (var i = 0, max = this.nav.length; i < max; i++) {
    var href = this.nav[i].href;

    targetList.push(this.doc.getElementById(href.split('#')[1]));
  }

  return targetList;
};

ScrollSpy.prototype.attachEvent = function () {
  this.win.addEventListener('load', (function () {
    this.spy(this.callback);
  }).bind(this));


  var scrollingTimer;

  this.win.addEventListener('scroll', (function () {
    if (scrollingTimer) {
      clearTimeout(scrollingTimer);
    }

    var _this = this;

    scrollingTimer = setTimeout(function () {
      _this.spy(_this.callback);
    }, 10);
  }).bind(this));


  var resizingTimer;

  this.win.addEventListener('resize', (function () {
    if (resizingTimer) {
      clearTimeout(resizingTimer);
    }

    var _this = this;

    resizingTimer = setTimeout(function () {
      _this.spy(_this.callback);
    }, 10);
  }).bind(this));
};

ScrollSpy.prototype.spy = function (cb) {
  var elems = this.getElemsViewState();

  this.markNav(elems);

  if (typeof cb === 'function') {
    cb(elems);
  }
};

ScrollSpy.prototype.getElemsViewState = function () {
  var elemsInView = [],
    elemsOutView = [],
    viewStatusList = [];

  for (var i = 0, max = this.contents.length; i < max; i++) {
    var currentContent = this.contents[i],
      isInView = this.isInView(currentContent);

    if (isInView) {
      elemsInView.push(currentContent);
    } else {
      elemsOutView.push(currentContent);
    }
    viewStatusList.push(isInView);
  }

  return {
    inView: elemsInView,
    outView: elemsOutView,
    viewStatusList: viewStatusList
  };
};

ScrollSpy.prototype.isInView = function (el) {
  var winH = this.winH,
    scrollTop = this.doc.documentElement.scrollTop || this.doc.body.scrollTop,
    scrollBottom = scrollTop + winH,
    elTop = el.offsetTop,
    elBottom = elTop + el.offsetHeight;

  return (elTop < scrollBottom) && (elBottom > scrollTop);
};

ScrollSpy.prototype.markNav = function (elems) {
  var navItems = this.nav,
    isAlreadyMarked = false;

  for (var i = 0, max = navItems.length; i < max; i++) {
    if (elems.viewStatusList[i] && !isAlreadyMarked) {
      isAlreadyMarked = true;
      navItems[i].classList.add(this.className);
    } else {
      navItems[i].classList.remove(this.className);
    }
  }
};


module.exports = ScrollSpy;

},{}],3:[function(require,module,exports){
(function (global){
/**
 * ScrollSpy
 *
 */

var ScrollSpy = require('./modules/scrollspy');

global.ScrollSpy = module.exports = ScrollSpy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./modules/scrollspy":2}]},{},[1])


//# sourceMappingURL=../map/js/app.js.map
