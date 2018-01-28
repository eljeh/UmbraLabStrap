// Functions

// Push down nav panels/items
$('.m-nav-investors a').on("click touch", function(){
    $('#m-nav-panel-find, #m-nav-panel-search').removeClass('panel-open');
    $('#m-nav-panel-investors').toggleClass('panel-open');
    $('#m-nav-panel-investors a').first().focus();
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

$("ul#main-navigation li a, .u-nav-search a").on("click touch", function(
  e
) {
  e.preventDefault();

  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
  } else {
    $("ul#main-navigation li a, .u-nav-search a").removeClass("active");
    $(this).addClass("active");
  }
});

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
            nextArrow: '<button type="button" class="slick-next"><span class="visuallyhidden">Next</span><span class="icon-ctrl"></span></button>',
            dots: true
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

function galleryCarousel() {
    var galleryCarousels = $('.gallery-carousel');
    $(galleryCarousels).each(function(){
      // make sure not to turn these into carousels with only 1 image
      if($(this).children().length > 1) {
        $(this).slick({
          //cssEase: 'linear',
          prevArrow: '<button type="button" class="slick-prev"><span class="visuallyhidden">Previous</span><span class="icon-cta"></span></button>',
          nextArrow: '<button type="button" class="slick-next"><span class="visuallyhidden">Next</span><span class="icon-cta"></span></button>',
          dots: true,
          speed: 1000,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 3000
        });
      }
    });
}

function mobileNavToggle() {
    $(".mobile-nav-toggle a, #mobile-nav-container .close").on("click touch", function(e){
        $("#mobile-nav-container").toggleClass("open");
        $('div.wrapper').toggle();
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

function autoComplete() {
  $(function() {
    $.widget("custom.catcomplete", $.ui.autocomplete, { _create: function() {
        this._super();
        this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
      }, _renderMenu: function(ul, items) {
        var that = this,
          currentCategory = "";
        $.each(items, function(index, item) {
          var li;
          if (item.category != currentCategory) {
            ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
            currentCategory = item.category;
          }
          li = that._renderItemData(ul, item);
          if (item.category) {
            li.attr("aria-label", item.category + " : " + item.label);
          }
        });
      } });
    $(".autocomplete").catcomplete({ delay: 0, source: searchData });
  });
}

function initMap() {
  var startingLocation = { lat: -25.363, lng: 131.044 };
  var map = new google.maps.Map(document.getElementById("map-frame"), {
    zoom: 4,
    center: startingLocation
  });
  var marker = new google.maps.Marker({
    position: startingLocation,
    map: map
  });
}

function initUserAgent() {
    var doc = document.documentElement;
    doc.setAttribute("data-useragent", navigator.userAgent), doc.setAttribute("data-platform", navigator.platform)
}

// dom ready
$(function() {

    // ie10 use only - add attribute to html tag for browser not supported functionality
    initUserAgent();

    mobileNavToggle()
    // // Init Main navigation + push panel navigation
    // mainnavInit();

    // video popup modals
    videoModals();

    // carousels that init only on mobile sizes
    if (window.matchMedia("(min-width: 992px)").matches) {
        mobileCarousel('kill');
    } else {
        mobileCarousel('create');
    }

    imageCarousel();

    galleryCarousel();

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

    // Auto Complete
    autoComplete();
});
