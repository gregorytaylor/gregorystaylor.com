
// toggle mobile nav
$('.navbar-toggler').click(function() {
	if ($('.navbar-nav').css('display') === 'none') {
		$('.navbar-nav').css('display','flex');
	} else {
		$('.navbar-nav').css('display','none');
	}
})


// add active class to current nav link
$('.nav-link').filter(function(){
    return this.href == location.href.replace(/#.*/, "");
}).addClass('active').removeAttr('href');


// form label animation on input
$(function () {
  var showClass = 'show';
  
  $('#formContact input').on('checkval', function () {
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


$('#formContact').delegate('*', 'focus blur', function() {
  var elem = $(this);
  setTimeout(function() {
    elem.prev().toggleClass('focused', elem.is(':focus'));
  }, 0);
});