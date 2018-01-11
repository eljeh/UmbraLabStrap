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
    $('.image-carousel').slick({
        cssEase: 'linear',
        infinite: false,
        prevArrow: '<button type="button" class="slick-prev"><span class="visuallyhidden">Previous</span><span class="icon-cta"></span></button>',
        nextArrow: '<button type="button" class="slick-next"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>',
        fade: true
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
  $("#datepicker").datepicker();
}

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
});

