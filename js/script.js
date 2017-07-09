$(document).ready(function(ev) {
  $('#custom_carousel').on('slide.bs.carousel', function(evt) {
    $('#custom_carousel .controls li.active').removeClass('active');
    $('#custom_carousel .controls li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active');
    $('#custom_carousel .controls img').addClass('grayscale-filter');
    $('#custom_carousel .controls img:eq(' + $(evt.relatedTarget).index() + ')').removeClass('grayscale-filter');
  })
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$('#third').click(async function() {
  $('#avatar').addClass('hide');
  $('#about').addClass('hide');
  $('#custom_carousel').addClass('hide');
  $('#first').addClass('animated slideOutUp');
  $('#bio-text').addClass('animated fadeOut');
  $('.fa-angle-down').removeClass('infinite fadeInDown');
  $('.fa-angle-down').addClass('fadeOutDown');
  await sleep(1000);
  $('html,body').animate({
      scrollTop: $('#custom_navbar').offset().top
    },
    1000);
  await sleep(1000);
  $('#first').removeClass('animated slideOutUp');
  $('#bio-text').removeClass('animated fadeOut');
  $('.fa-angle-down').removeClass('fadeOutDown');
  $('.fa-angle-down').addClass('infinite fadeInDown');
  $('#avatar').removeClass('hide');
  $('#about').removeClass('hide');
  $('#custom_carousel').removeClass('hide');
  $('#about-col').addClass('animated fadeIn');
  $('#avatar-col').addClass('animated flipInY');
  $('#custom_carousel').addClass('animated fadeIn');
  await sleep(1000);
  $('#avatar-col').removeClass('animated flipInY');
  $('#about-col').removeClass('animated fadeIn');
});

$('#about').click(async function() {
  $('#custom_carousel').addClass('animated fadeOut');
  $('#avatar-col').addClass('animated flipOutY');
  $('#about-col').addClass('animated fadeOut');
  await sleep(1000);
  $('#custom_carousel').removeClass('animated fadeOut');
  $('#avatar-col').removeClass('animated flipOutY');
  $('#about-col').removeClass('animated fadeOut');
  $('#avatar').addClass('hide');
  $('#about').addClass('hide');
  $('#custom_carousel').addClass('hide');
  $('html,body').animate({
      scrollTop: $('#first').offset().top
    },
    1000);
});

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$('.ball').click(function() {
  $('#' + this.id).animateCss('bounce');
});
