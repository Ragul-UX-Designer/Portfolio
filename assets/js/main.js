
// repeated variables
var $window = $(window);
var $root = $('html, body');

$(document).ready(function () {

    "use strict";
    
    themeOption();
    navbarToggler();
    smoothScroll();
    bgBackground();
    colorFull();
    borderColor();
    swiperSlider();
    typedJS();
    portfolioPopup();
    postSidebar();

});

$window.on("load", (function() {
    $("#overlayer").delay(500).fadeOut('slow');
    $(".loader").delay(1000).fadeOut('slow');
    portfolioIsotop();
    headerSticky();
    scrollToAnchor();
}));
$window.on('scroll', function () {
    returnToTop();
    headerSticky();
    skills();
});

/*-----------------------------------------------------------------------------
                                   FUNCTIONS
-----------------------------------------------------------------------------*/


/*-------------------------
        Theme Option
-------------------------*/
function themeOption(){

    "use strict";

    $('.theme-skin li .flat-skin').click(function() {
        $("body").addClass('flat-demo');
        $('.theme-skin li a').removeClass('active');
        $(this).addClass('active');
    });

    $('.theme-skin li .neo-skin').click(function() {
        $("body").removeClass('flat-demo');
        $('.theme-skin li a').removeClass('active');
        $(this).addClass('active');
    });
}

/*--------------------------
       RETURN TO TOP
--------------------------*/
function returnToTop() {

    "use strict";

    var $returnToTop = $('.return-to-top');
    if ($window.scrollTop() > 150) {
        $returnToTop.addClass('show');
    } else {
        $returnToTop.removeClass('show');
    }
    $returnToTop.click(function () {
        $root.stop().animate({
            scrollTop: 0
        }, 1500);
    });
}

/*--------------------------
       NAVBAR TOGGLER
--------------------------*/
function navbarToggler(){

    "use strict";

    $('.navbar-toggler').on('click', function(){
        $('header').toggleClass('z-index');
        $('.post-sidebar-toggle').toggleClass('d-none');
    })

}
/*-------------------------
        SMOOTH SCROLL
-------------------------*/
function smoothScroll(){

    "use strict";

    $('.header .navbar-nav a, .to-contact, .scroll-down a').on('click', function(event) {
        var $anchor = $(this);
        $root.stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 60
        }, 1500, 'easeInOutQuart');
        event.preventDefault();
        $(".navbar-collapse").collapse('hide');
    });

    
}

/*-------------------------
        SCROLL TO
-------------------------*/

function scrollToAnchor(){
    //getting the anchor link in the URL and deleting the `#`
    var value =  window.location.hash.replace('');
    var sectionAnchor = value;
    var section = $(document).find(sectionAnchor);

    if(section.length > 0){
        $root.stop().animate({
            scrollTop: $(section).offset().top - 60
        }, 1500, 'easeInOutQuart');
    }
}

/*-------------------------
        HEADER STICKY
-------------------------*/
function headerSticky(){

    "use strict";

    if ($window.scrollTop() > 10) {
        $('#header').addClass('header-sticky');
    } else {
        $('#header').removeClass('header-sticky');
    }
}

/*-------------------------
        ColorFull Demo
-------------------------*/

function bgBackground() {

    "use strict";

    var list = document.getElementsByClassName('data-background');

    for (var i = 0; i < list.length; i++) {
        var color = list[i].getAttribute('data-color');
        list[i].style.backgroundColor = "" + color + "";
    }
}


     
function colorFull() {
    var allDivs = document.getElementsByClassName('data-text-color');

    for( var i =0; i < allDivs.length; ++i )
    {
        var color = allDivs[i].getAttribute('data-color');
        allDivs[i].style.color = "" + color + "";
    }
}


function borderColor() {
    var allDivs = document.getElementsByClassName('timeline-border');

    for( var i =0; i < allDivs.length; ++i )
    {
        var color = allDivs[i].getAttribute('data-color');
        allDivs[i].style.borderLeftColor = "" + color + "";
    }
}
   
    
/*-----------------------------
     HERO SWIPER SLIDER
------------------------------*/
function swiperSlider(){

    "use strict";

    if($(".swiper-container").length){
        var swiper = new Swiper('.swiper-container', {
            effect: "slide",
            allowTouchMove: 'false',
            touchRatio: 0,
            threshold: 992,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        var textSwiper = new Swiper('.text-swiper', {
            effect: "fade",
            allowTouchMove: 'false',
            touchRatio: 0,
            threshold: 992,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        $(".hero-item-image").css('background', function () {
            var bg = ('url(' + $(this).data("image-src") + ') no-repeat center');
            return bg;
        });
        var $fullscreen = $(".hero-04, .hero-swiper, .hero-text, .hero-images");
        $fullscreen.css("height", $window.height());
    }
}

/*-------------------------
        TYPED JS
-------------------------*/
function typedJS() {

    "use strict";
    
    if ($('.element').length > 0) {
        var options = {
            strings: $(".element").attr('data-elements').split(','),
            typeSpeed: 100,
            backDelay: 3000,
            backSpeed: 50,
            loop: true
        };
        var typed = new Typed(".element", options);
    }
}
/*-------------------------
          Skills
-------------------------*/
function skills() {

    "use strict";

    var scroll = $window.scrollTop();
    var skillsDiv = $('#skills');
    if(skillsDiv.length > 0){
        var winH = $window.height(),
            skillsT = skillsDiv.offset().top;
        if (scroll + winH > skillsT) {
            $('.skillbar').each(function () {
                $(this).find('.skillbar-bar').animate({
                    width: $(this).attr('data-percent')
                }, 6000);
            });
        }
    }
}

/*-------------------------
        ISOTOPE JS
-------------------------*/
function portfolioIsotop() {

    "use strict";

    // init Isotope
    var initial_items = $('#showMore-initials').data("initial");
    var next_items = $('#showMore-initials').data("next");
    var $pfilter = $('#portfolio-filter');
    var $grid = $('.portfolio-items');
    var $showMore = $('#showMore');
    $grid.isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry',
    });
    $pfilter.find('a').on("click",function() {
        var filterValue = $(this).attr('data-filter');
        $pfilter.find('a').removeClass('active');
        $(this).addClass('active');
        $grid.isotope({
            filter: filterValue,
        });
        updateFilterCounts();
        return false;
    });
    function updateFilterCounts() {
        var itemElems = $grid.isotope('getFilteredItemElements');
        var count_items = $(itemElems).length;
        if (count_items > initial_items) {
            $showMore.show();
            $showMore.parent('.button-border').addClass('mr-2 mr-sm-4').removeClass('p-0');
            
        } else {
            $showMore.hide();
            $showMore.parent('.button-border').removeClass('mr-2 mr-sm-4').addClass('p-0');
        }
        if ($('.portfolio-item').hasClass('visible_item')) {
            $('.portfolio-item').removeClass('visible_item');
        }
        var index = 0;

        $(itemElems).each(function() {
            if (index >= initial_items) {
                $(this).addClass('visible_item');
            }
            index++;
        });
        $grid.isotope('layout');
    }
    function showNextItems(pagination) {
        var itemsMax = $('.visible_item').length;
        var itemsCount = 0;
        $('.visible_item').each(function() {
            if (itemsCount < pagination) {
                $(this).removeClass('visible_item');
                itemsCount++;
            }
        });
        if (itemsCount >= itemsMax) {
            $showMore.hide();
            $showMore.parent('.button-border').removeClass('mr-2 mr-sm-4').addClass('p-0');
        }
        $grid.isotope('layout');
    }
    // function that hides items when page is loaded
    function hideItems(pagination) {
        var itemsMax = $('.portfolio-item').length;
        var itemsCount = 0;
        $('.portfolio-item').each(function() {
            if (itemsCount >= pagination) {
                $(this).addClass('visible_item');
            }
            itemsCount++;
        });
        if (itemsCount < itemsMax || initial_items >= itemsMax) {
            $showMore.hide();
            $showMore.parent('.button-border').removeClass('mr-2 mr-sm-4').addClass('p-0');
        }
        $grid.isotope('layout');
    }
    $showMore.on('click', function(e) {
        e.preventDefault();
        showNextItems(next_items);
    });
hideItems(initial_items);
}

/*-------------------------
     MAGNIFIC POPUP JS
-------------------------*/
function portfolioPopup() {

    "use strict";

    if (('.portfolio-items').length > 0) {
        $('.portfolio-items').each(function() {
            $(this).magnificPopup({
                delegate: '.js-zoom-gallery',
                type: 'image',
                gallery: {
                    enabled:true
                }
            });
        });
    }
}


/*-------------------------
    POST SIDEBAR TOGGLER
-------------------------*/
function postSidebar(){
    $('.post-sidebar-toggle').on('click', function(){
        $(this).toggleClass('open');
        $('.post-sidebar').toggleClass('open');
    })
}

/*-------------------------
     AJAX CONTACT FORM
-------------------------*/
function validateEmail(email) {

    "use strict";

    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function sendEmail() {

    "use strict";

    var name     = $('#name').val();
    var email    = $('#email').val();
    var subject  = $('#subject').val();
    var comments = $('#comments').val();

    if(!name){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Name is required');
    } else if(!email){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Email is required');
    } else if(!validateEmail(email)){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Email is not valid');
    } else if(!subject){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Subject is required');
    } else if(!comments){
        $('#message').toast('show').addClass('bg-danger').removeClass('bg-success');
        $('.toast-body').html('Comments is required');
    } else {
        $.ajax({
            type: 'POST',
            data: $("#contactForm").serialize(),
            url:  "sendEmail.php",
            beforeSend: function() {
                $('#submit-btn').html('<span class="spinner-border spinner-border-sm"></span> Loading..');
            },
            success: function(data) {
                $('#submit-btn').html('Submit');
                var myObj = JSON.parse(data);
                if(myObj['status']=='Congratulation'){
                    $('#message').toast('show').addClass('bg-success').removeClass('bg-danger bg-warning');
                    $('.toast-body').html('<strong>'+ myObj['status'] +' : </strong> '+ myObj['message']);
                }else if(myObj['status']=='Error'){
                    $('#message').toast('show').addClass('bg-danger').removeClass('bg-success bg-warning');
                    $('.toast-body').html('<strong>'+ myObj['status'] +' : </strong> '+ myObj['message']);
                }else if(myObj['status']=='Warning'){
                    $('#message').toast('show').addClass('bg-warning').removeClass('bg-success bg-danger');
                    $('.toast-body').html('<strong>'+ myObj['status'] +' : </strong> '+ myObj['message']);
                }
            },
            error: function(xhr) {
                $('#submit-btn').html('Submit');
                $('#message').toast('show').addClass('bg-danger').removeClass('bg-success bg-warning');
                $('.toast-body').html('<strong> Error : </strong> Something went wrong, Please try again.');
            },
        });
    }
}









