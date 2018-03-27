$(document).ready(function () {


  //Only show fancy on front
  if(location.pathname == "/hjord.net/" && !location.hash){
    $('.panel-title.original').hide();
    $('.panel-cover__description.original').hide();
 
  
    var options = {
    strings: [">>./Hello_"],
    typeSpeed: 200,
    showCursor: false,
    onComplete: function() {
      var subsubTyped = new Typed(".panel-title.typed", {
         strings: [$('.panel-title.original').text()],
         typeSpeed: 50,
         showCursor: false,
         onComplete: function() {
           var sub = new Typed(".panel-cover__description.typed", {
                strings: [$('.panel-cover__description.original').text()],
                typeSpeed:100,
                showCursor: false
           });
         }
        });
      }
    
    }  
    var typed = new Typed(".hello", options);
  }
  else{
    

    ReplaceGlitch();
    $('.panel-title.typed').hide();
    $('.panel-cover__description.typed').hide();
    $('.hello').text(">>./Hello_");
  }
 

  $('a.blog-button').click(function (e) {

    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return
    currentWidth = $('.panel-cover').width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
      $('.content-wrapper').addClass('animated slideInRight')
    } else {
      $('.panel-cover').css('max-width', currentWidth)    
      $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {
        ReplaceGlitch();
      })
    }
  })



  if (window.location.hash && window.location.hash == '#projects') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  if (window.location.pathname !== '/hjord.net/' && window.location.pathname !== '/hjord.net/index.html') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  $('.navigation-wrapper .blog-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible')
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
  })

  function ReplaceGlitch() { //Replace glitchy image with normal. Distraction.
     $('#canvas').remove();
          var img = new Image();
          img.src = '/hjord.net//images/profile_bw.png';
          img.height = 300;
         $('.glitch a').append(img);
  }
  

})
