/*
 *****************************************************
 *	CUSTOM JS DOCUMENT                              *
 *	Single window load event                        *
 *   "use strict" mode on                            *
 *****************************************************
 */

var myVideo;
var isMobi;
$(document).ready(function() {

    "use strict";

    var $figure = $("#videofigure");    
    var mp4Supported = (!!document.createElement('video').canPlayType('video/mp4; codecs=avc1.42E01E,mp4a.40.2'));
    isMobi = /Mobi/.test(navigator.userAgent);

    window.scrollTo(0, 0);
    
    var htmlBody = $('html, body');
    var preLoader = $('.preloader');
    var countNumber = $(".count-number");
    var MixItUp1 = $('#MixItUp1');
    var fancybox = $('.fancybox');
    var faqsAccordion = $('#faqs-accordion');
    var waTabBtn = $('.wa-tabs .tab-btn');
    var waTabContainer = $('.wa-tabs .tab');
    var linksListsItem = $('.links-lists li');
    var scrollToTop = $('.scrollToTop');

    if(mp4Supported && !isMobi){
        $('#showgif').hide();
        myVideo = document.getElementById("video1");
        $figure.addClass("figurevid");
        var intheight = $( window ).height() - 135;
        $figure.height(intheight);
        myVideo.height = intheight;
        checkLoad();
    }else{
        $('#showvideo').hide();
        $figure.addClass("figurenovid");
        preLoader.addClass('loaderout');
    }


    function checkLoad() {
        if (myVideo.readyState === 4) {
            preLoader.addClass('loaderout');
            window.setTimeout(function() {
                window.scrollTo(0, 0);
                myVideo.play();

            }, 800);
        } else {
            setTimeout(checkLoad, 100);
        }
    }

    // ============================================
    // PreLoader On window Load
    // =============================================

    


    



    // ============================================
    // Fun Factor / Counter
    // =============================================	

    countNumber.appear(function() {
        $(this).each(function() {
            var datacount = $(this).attr('data-count');
            $(this).find('.counter').delay(6000).countTo({
                from: 10,
                to: datacount,
                speed: 3000,
                refreshInterval: 50,
            });
        });
    });

    //============================================
    // MixItUp settings
    //============================================

    if (MixItUp1.length) {
        MixItUp1.mixItUp({
            selectors: {
                filter: '.filter-1'
            }
        });
    }



    //=========================================
    // Tabs
    //=========================================			

    if (waTabBtn.length) {
        waTabBtn.on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('href'));
            waTabBtn.removeClass('active-btn');
            $(this).addClass('active-btn');
            waTabContainer.fadeOut(0);
            waTabContainer.removeClass('active-tab');
            $(target).fadeIn(500);
            $(target).addClass('active-tab');
        });

    }

    //========================================
    // Accordions 
    //======================================== 	

    if (faqsAccordion.length) {
        faqsAccordion.accordion();
    }

    //========================================
    // List Toggle 
    //======================================== 	

    linksListsItem.on('click', function(e) {

        if ($(this).find('>ul').hasClass('active')) {

            $(this).children('ul').removeClass('active').children('li').slideUp();

            linksListsItem.parent('ul').children('li').removeClass('active');

            $(this).addClass('active');
            if ($(this).hasClass('collapse-link')) {
                $(this).children('a').children('i').removeClass('fa-minus-circle');
                $(this).children('a').children('i').addClass('fa-plus-circle');
                e.preventDefault();
            }

            e.stopPropagation();
        } else {
            $(this).children('ul').addClass('active').children('li').slideDown();

            linksListsItem.parent('ul').children('li').removeClass('active');
            $(this).addClass('active');
            if ($(this).hasClass('collapse-link')) {
                $(this).children('a').children('i').removeClass('fa-plus-circle');
                $(this).children('a').children('i').addClass('fa-minus-circle');
            }
            e.stopPropagation();
        }
    });

    //========================================
    // Scroll To Top
    //======================================== 		

    scrollToTop.on('click', function() {
        htmlBody.animate({
            scrollTop: 0
        }, 1000);
        return false;
    });

    //========================================
    // LightBox / Fancybox
    //======================================== 	

    if (fancybox.length) {
        fancybox.fancybox();
    }

    //***************************************
    // Map initialization function Calling
    //****************************************

    initMap();

    //***************************************
    // All Owl Carousel function Calling
    //****************************************

    owlCarouselInit();




}); // End of the window load event


//***************************************
// Contact Page Map
//****************************************  

function initMap() {
    "use strict";

    var mapDiv = $('#gmap_canvas');

    if (mapDiv.length) {
        var myOptions = {
            zoom: 10,
            center: new google.maps.LatLng(-37.81614570000001, 144.95570680000003),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(-37.81614570000001, 144.95570680000003)
        });
        var infowindow = new google.maps.InfoWindow({
            content: '<strong>Envato</strong><br>Envato, King Street, Melbourne, Victoria<br>'
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

        infowindow.open(map, marker);
    }


}


/* ---------------------	
	All owl Carousels 
/* --------------------- */
function owlCarouselInit() {

    "use strict";

    //==========================================
    // owl carousels settings
    //===========================================

    var home1MainSlider = $('#home1-main-slider');
    var singleImage = $('#single-image');
    var testimonialSingle = $('#testimonial-section-single');
    var shopCarousel = $("#shop-carousel");
    var waPartnerCarousel = $('.wa-partner-carousel');


    if (home1MainSlider.length) {
        home1MainSlider.owlCarousel({
            autoPlay: true,
            items: 1,
            singleItem: true,
            navigation: true,
            pagination: false,

        });
    }

    if (singleImage.length) {
        singleImage.owlCarousel({
            autoPlay: false,
            items: 1,
            singleItem: true,
            navigation: true,
            pagination: false,

        });
    }

    if (testimonialSingle.length) {
        testimonialSingle.owlCarousel({
            autoPlay: true,
            items: 1,
            singleItem: true,
            navigation: true,
            pagination: false,

        });
    }

    if (shopCarousel.length) {
        shopCarousel.owlCarousel({
            autoPlay: false,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3],
            navigation: true,
            pagination: false

        });
    }

    if (waPartnerCarousel.length) {
        waPartnerCarousel.owlCarousel({
            autoPlay: false,
            items: 6,
            itemsDesktop: [1199, 6],
            itemsDesktopSmall: [979, 4],
            margin: 5,
            navigation: true,
            pagination: false

        });
    }

}