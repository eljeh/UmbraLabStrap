// Functions

function pushPanels() {
    // Push down nav panels/items
    $('.m-nav-investors a').on("click touch", function(){
        $('#m-nav-panel-find, #m-nav-panel-search').removeClass('panel-open');
        $('#m-nav-panel-investors').toggleClass('panel-open');
    });

    $('.m-nav-find a').on("click touch", function(){
        $('#m-nav-panel-investors, #m-nav-panel-search').removeClass('panel-open');
        $('#m-nav-panel-find').toggleClass('panel-open');
        $('#m-nav-panel-find input[type=search]').focus();
    });

    $('.u-nav-search a').on("click touch", function(){
        $('#m-nav-panel-investors, #m-nav-panel-find').removeClass('panel-open');
        $('#m-nav-panel-search').toggleClass('panel-open');
        $('#m-nav-panel-search input[type=search]').focus();
    });

    $('#m-nav-panel-find .close, #m-nav-panel-investors .close, #m-nav-panel-search .close').on("click touch", function(){
        $('#m-nav-panel-find, #m-nav-panel-investors, #m-nav-panel-search').removeClass('panel-open');
        $('ul#main-navigation li a').removeClass("active");
    });
}

// Apply active to main navigation item onclick
function mainnavInit() {
    $('ul#main-navigation li a').on("click touch", function(e){
        e.preventDefault();
        $('ul#main-navigation li a').removeClass("active");
        $(this).addClass("active");
    });

    pushPanels();
}

function videoModals() {
    $('.video-modal').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
}

function mobileCarousel(slideOption) {
    if(slideOption == 'create') {
        $('.mobile-carousel').slick({
            speed: 500,
            cssEase: 'linear',
            prevArrow: '<button type="button" class="slick-prev"><span class="visuallyhidden">Previous</span><span class="icon-ctrl"></span></button>',
            nextArrow: '<button type="button" class="slick-next"><span class="visuallyhidden">Next</span><span class="icon-ctrl"></span></button>'
        });
    }
}

function imageCarousel() {
    var imgCarousels = $('.image-carousel');
    $(imgCarousels).each(function(){
      // make sure not to turn these into carousels with only 1 image
      if($(this).children().length > 1) {
        $(this).slick({
          cssEase: 'linear',
          infinite: false,
          prevArrow: '<button type="button" class="slick-prev"><span class="visuallyhidden">Previous</span><span class="icon-cta"></span></button>',
          nextArrow: '<button type="button" class="slick-next"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>',
          fade: true
        });
      }
    });
}

function mobileNavToggle() {
    $(".mobile-nav-toggle a, #mobile-nav-container .close").on("click touch", function(e){
        $("#mobile-nav-container").toggleClass("open");
    });
}

// close property listing availability details accordion if the screen is small enough
function openPropertyDetailAccordions(){
    var accordions = $('.property-offerings');
    if($(accordions).length && window.innerWidth < 768) {
        $(accordions).addClass('collapse');
    }
}

// Phone Number formatting
function telephoneFormatting(){
    $("input[type=tel]").on('change', function() {
        var number = $(this).val()
        number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
        $(this).val(number)
    });
}

function fileUploadInit() {
    if($('input[type="file"]').length) {
        $('input[type="file"]').change(function() {
            if ($(this).val()) {
                var filename = $(this).val();
                $(this).closest('.input-file').find('.input-file__name').html(filename);
            }
        });
    }
}

function initDatePicker() {
  $(".datepicker").datepicker();
}

/*
  Deal with the open and close states of the advanced filters component
 */
function smallScreenAccordion() {
  if(window.innerWidth < 768) {
    // always start collapsed on small screens
    jQuery('#advancedFilterCollapse').collapse();

    // toggle the active class for the fixed position filters
    jQuery('.advanced-filters-toggle-small').on('click', function(){
        jQuery('#filterAccordion').addClass('active');
    });

    // remove the active class once the transition is complete
    $('#advancedFilterCollapse').on('hidden.bs.collapse', function () {
      jQuery('#filterAccordion').removeClass('active');
    });
  }
}

/*
    Add click listeners for the content toggle on the investors page
 */
function investorBlockToggle() {
    if(window.innerWidth > 991) {
      $('.market-summary-arrow-show').on('click', function(){
        $('.market-summary-expanded').removeClass('hidden');
        $('.investor-downloads').addClass('hidden');
        $(this).addClass('hidden');
      });
      $('.market-summary-arrow-hide').on('click', function(){
        $('.market-summary-expanded').addClass('hidden');
        $('.investor-downloads').removeClass('hidden');
        $('.market-summary-arrow-show').removeClass('hidden');
      });
    }
    else {
      $('.market-summary-expanded').removeClass('hidden');
      $('.market-summary-arrow-show').addClass('hidden');
      $('.market-summary-arrow-hide').addClass('hidden');
    }
}

/*
  Set up feature carousel tile carousels if they exist
 */

function initFeatureCarouselTile() {
  var featureCarousels = $('.feature-carousel-tile-carousel');
  var slickOptions = {
    cssEase: 'linear',
    infinite: true,
    prevArrow: '<button type="button" class="slick-prev"><span class="visuallyhidden">Previous</span><span class="icon-cta"></span></button>',
    nextArrow: '<button type="button" class="slick-next"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>',
    fade: true
  };

  if(featureCarousels.length){
    var idArr = [];
    // use the element ID's to keep the carousel controls working properly
    $(featureCarousels).each(function(){
      idArr.push($(this).attr('id'));
    });
    if(idArr.length) {
      idArr.forEach(function(id){
        // only initiate a slider if there's more than one image
        if($('#' + id + ' img').length > 1) {
          $('#' + id).slick(slickOptions);
        }
      });
    }
  }
}

//  ** Note **
//  The following functions are test of combo video/image jumbotron carousel.
//  It has examples of images, youtube, vimeo and html5 video.
//
//  If we do not use, delete these and the main init function: jumbotronCarouselVideo()
//  - postMessageToPlayer()
//  - playPauseVideo()
//  - resizePlayer()
//  - jumbotronCarouselVideo()
//

var slideWrapper = $(".jumbotron-carousel"),
    iframes = slideWrapper.find('.embed-player'),
    lazyImages = slideWrapper.find('.slide-image'),
    lazyCounter = 0;

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command){
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control){
    var currentSlide, slideType, startTime, player, video;
    currentSlide = slick.find(".slick-current");
    slideType = currentSlide.attr("class").split(" ")[1];
    player = currentSlide.find("iframe").get(0);
    startTime = currentSlide.data("video-start");

    if (slideType === "vimeo") {
        switch (control) {
            case "play":
            if ((startTime != null && startTime > 0 ) && !currentSlide.hasClass('started')) {
                currentSlide.addClass('started');
                postMessageToPlayer(player, {
                    "method": "setCurrentTime",
                    "value" : startTime
                });
            }
            postMessageToPlayer(player, {
                "method": "play",
                "value" : 1
            });
            break;
            case "pause":
            postMessageToPlayer(player, {
                "method": "pause",
                "value": 1
            });
            break;
        }
    } else if (slideType === "youtube") {
        switch (control) {
            case "play":
            postMessageToPlayer(player, {
                "event": "command",
                "func": "mute"
            });
            postMessageToPlayer(player, {
                "event": "command",
                "func": "playVideo"
            });
            break;
            case "pause":
            postMessageToPlayer(player, {
                "event": "command",
                "func": "pauseVideo"
            });
            break;
        }
    } else if (slideType === "video") {
        video = currentSlide.children("video").get(0);
        if (video != null) {
            if (control === "play"){
                video.play();
            } else {
                video.pause();
            }
        }
    }
}

// Resize player
function resizePlayer(iframes, ratio) {
    if (!iframes[0]) return;
    var win = $(".jumbotron-carousel"),
        width = win.width(),
        playerWidth,
        height = win.height(),
        playerHeight,
        ratio = ratio || 16/9;

    iframes.each(function(){
        var current = $(this);
        if (width / ratio < height) {
            playerWidth = Math.ceil(height * ratio);
            current.width(playerWidth).height(height).css({
                left: (width - playerWidth) / 2,
                top: 0
            });
        } else {
            playerHeight = Math.ceil(width / ratio);
            current.width(width).height(playerHeight).css({
                left: 0,
                top: (height - playerHeight) / 2
            });
        }
    });
}

function jumbotronCarouselVideo() {

    // Initialize
    slideWrapper.on("init", function(slick){
        slick = $(slick.currentTarget);
        setTimeout(function(){
            playPauseVideo(slick,"play");
        }, 1000);
        resizePlayer(iframes, 16/9);
    });

    slideWrapper.on("beforeChange", function(event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick,"pause");
    });

    slideWrapper.on("afterChange", function(event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick,"play");
    });

    slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
        lazyCounter++;
        if (lazyCounter === lazyImages.length){
            lazyImages.addClass('show');
            // slideWrapper.slick("slickPlay");
        }
    });

    // Start the slider
    slideWrapper.slick({
        // fade:true,
        autoplaySpeed:4000,
        lazyLoad:"progressive",
        speed:600,
        arrows:false,
        dots:true,
        cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)"
    });

    // Resize event
    $(window).on("resize.slickVideoPlayer", function(){
        resizePlayer(iframes, 16/9);
    });
}

function jumbotronCarousel() {
    $('.jumbotron-carousel').slick({
        //fade: true,
        dots: true,
        speed: 1000,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" class="slick-prev"><span class="visuallyhidden">Previous</span><span class="icon-cta"></span></button>',
        nextArrow: '<button type="button" class="slick-next"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>'
    });
}


// dom ready
$(function() {
    // Adding functions here for now, clean up later

    mobileNavToggle()
    // Init Main navigation + push panel navigation
    mainnavInit();

    // video popup modals
    videoModals();

    // carousels that init only on mobile sizes
    if (window.matchMedia("(min-width: 992px)").matches) {
        mobileCarousel('kill');
    } else {
        mobileCarousel('create');
    }

    imageCarousel();

    openPropertyDetailAccordions();

    // Applies mask to tel numbers
    telephoneFormatting();

    // Test for file upload element, and apply some wizardry
    fileUploadInit();
    initDatePicker();
    smallScreenAccordion();
    investorBlockToggle();
    initFeatureCarouselTile();

    //jumbotronCarouselVideo();
    jumbotronCarousel();
});
