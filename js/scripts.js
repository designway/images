//Animation
window.addEventListener("load", showPage, false);
function showPage() {
  $(function () {
    AOS.init({
      // startEvent: 'windowFocused',
      once: true,
      disable: function () {
        var maxWidth = 768;
        return window.innerWidth < maxWidth;
      }
    });
  });
  $('.vc-loading').addClass('loaded');
}

//IE10 Viewport hack
(function () {
  'use strict'
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.head.appendChild(msViewportStyle)
  }
}());



// function loadbut() {
//    var element = document.getElementById("sub");
//    element.classList.toggle("loader-default");
// }

// (function () {
//     $(document).on("click", "#submit", function (event) {
//         var elem = $(event.currentTarget);
//         elem.addClass('loader-default');
//         var formdata = $("#modalform").serializeArray();
//         var url1 = "/sendCallBack";
//         // $.ajax({url:"/sendCallBack", data: {delay:100}}).always(function(){
//         //     elem.removeClass('loader-default');
//         // });
//         // setTimeout(function(){
//         //   elem.removeClass('loader-default');
//         // },5000);
//     });
// })();

// $(window).on('shown.bs.modal', function() {
//     $('#myModal').modal('show');
//     $('#header').removeClass('header-scrolled');
//     $('body').css('overflow', 'hidden');
//     $('.header-scrolled').css('overflow', 'hidden');
//
//     var button = e.relatedTarget;
//         if (button != null)
//         {
//             alert("Launch Button ID= 0");
//         }
//     // $('#submit').on('click', function () {
//     //     $('#header').removeClass('header-scrolled');
//     //     alert("hi");
//     // });
//
// });

// $('#submit').on('click', function () {
//     $('#header').removeClass('header-scrolled');
//     $('#header').removeClass('header');
//     $( ".header-scrolled" ).stop();
// });



var errorHtml = "<strong>An error has occurred. Please try again</strong>";
var successHtml = "<strong>Successfully submitted</strong>";
var $form = $("form"),
  $successMsg = $(".alert");
$.validate({
  errorMessageClass: "error",
  onSuccess: postCallBackForm()
});




function postCallBackForm() {
    $('#modalform').on('submit', function(e){
      var formData = $(this).serializeArray();
      var formURL = $(this).attr("action");
      console.log("formData: ", formData);
      $('#header').removeClass('header-scrolled');

      formData.forEach(function(formElement){
        formElement.value = formElement.value.trim();
      });
      if(formData[0].value != '' && $.isNumeric(formData[1].value)){
        $('.callsub').addClass('loader-default');
        $.ajax({
            url: '/sendCallBack', //this is the submit URL
            type: 'POST', //or POST
            data: formData,
            success: function (data, textStatus, jqXHR) {
          $("#callback").removeClass("hidden alert-danger alert-success");
              $("#callbackmsg strong").remove();
              $("#callback").css("none");
              if (data.status.error == 1) {
                console.log("ajax call error");
                $("#callback").addClass("alert-danger");
                $("#callbackmsg").prepend(errorHtml);
                $("#callback").show();
                $(".callsub").removeClass("loader-default");
                setTimeout(function(){
                  $("#callback").removeClass("alert-danger");
                  $("#callbackmsg strong").remove();
                  $("#callback").css("display","none");
                },5000);
              } else if (data.status.success == 1) {
                // alert("AJAX request successfully completed");
                $("#callback").addClass("alert-success");
                $("#callbackmsg").prepend(successHtml);
                $("#callback").show();
                $("#modalform")[0].reset();
$(".callsub").removeClass("loader-default");
                setTimeout(function(){
                  $("#callback").removeClass("alert-success");
                  $("#callbackmsg strong").remove();
                  $("#callback").css("display","none");
                },5000);
              }
            }
        });


        e.preventDefault(); //STOP default action
      }

    });
    }
//     });
// });




// Renewal scripts
var errorHtml = "<strong>An error has occurred. Please try again</strong>";
var successHtml = "<strong>Successfully submitted</strong>";
var $form = $("form"),
  $successMsg = $(".alert");
$.validate({
  errorMessageClass: "error",
  onSuccess: postRenewalForm()
});
function postRenewalForm(){
    $('#renewalform').on('submit', function(e){
      var formData = $(this).serializeArray();
      var formURL = $(this).attr("action");
      console.log("formData: ", formData);

      formData.forEach(function(formElement){
        formElement.value = formElement.value.trim();
      });
      if(formData[0].value != '' && formData[1].value != '' && formData[3].value != '' && ($.isNumeric(formData[4].value) || $.isNumeric(formData[5].value))){
        $('.loader-default-css').addClass('loader-default');

        $.ajax({
            url: '/renewal', //this is the submit URL
            type: 'POST', //or POST
            data: formData,
            success: function (data, textStatus, jqXHR) {
          $("#renew").removeClass("hidden");
              $("#renewmsg strong").remove();
              $("#renew").css("none");
              if (data.status.error == 1) {
                console.log("ajax call error");
                $("#renew").addClass("alert-danger");
                $("#renewmsg").prepend(errorHtml);
                $(".loader-default-css").removeClass("loader-default");
                $("#renew").show();
              } else if (data.status.success == 1) {
                // alert("AJAX request successfully completed");
                $("#renew").addClass("alert-success");
                $("#renewmsg").prepend(successHtml);
                $(".loader-default-css").removeClass("loader-default");
                $("#renew").show();
                $("#renewalform")[0].reset();

              }
            }
        });
        e.preventDefault(); //STOP default action
      }

    });
    }



    // Webflow.push(function() {
    //   $('.callsub').click(function(e) {
    //     e.preventDefault();
    // 	$('body').css('overflow', 'hidden');
    //   });
    //
    //   $('.callsub').click(function(e) {
    //     e.preventDefault();
    // 	$('body').css('overflow', 'auto');
    //   });
    // });

    // $("#submit").click(function(){
    //   $(".callsub").css({
    //     'overflow' : 'hidden',
    //      'height' : '100%'
    //  });
    // });




//Outdated Browsers
$(function () {
  outdatedBrowser({
    bgColor: '#f25648',
    color: '#ffffff',
    lowerThan: 'transform' //IE10
  });
});


//Nav Resize on scroll
$(function () {
  $(window).scroll(function () {
    var wScroll = $(this).scrollTop();
    if (wScroll >= 20) {
      $('#header').addClass('header-scrolled');
      $('.vancompare-van').addClass('hide');
      $('.businesscompare-logo-1').addClass('remove-margin');
      $('.compare-business').addClass('hide');
      $('.business-number').removeClass('hide');
    } else {
      $('#header').removeClass('header-scrolled');
      $('.vancompare-van').removeClass('hide');
      $('.businesscompare-logo-1').removeClass('remove-margin');
      $('.compare-business').removeClass('hide');
      $('.business-number').addClass('hide');
    }
  });
});

$("video").find("a").click(function (e) {
  e.preventDefault();
  var section = $(this).attr("href");
  $("html, body").animate({
    scrollTop: $(section).offset().top
  });
});



//Nav Toggle
$(function () {
  $("#nav-toggle").on("click", function () {
    $(this).toggleClass("active");
  });
});

//Preload Images
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};
$.preloadImages('img/icon-arrow-white.svg', 'img/icon-minus.svg', 'img/icon-pagination-arrow-white.svg');

//ObjectFit Images
objectFitImages();

//Tab
$(function () {
  $('.vc-tab .vc-tab-nav ul li a').on('click', function () {
    var $theTab = $(this).closest('.vc-tab');
    var $theLink = $(this);
    var $thePane = $(this).attr('href');
    $theLink.parent('li').siblings().removeClass('active');
    $theLink.parent('li').addClass('active');
    $theTab.find('.vc-tab-pane.active').fadeOut(200, ShowNewPanel);
    function ShowNewPanel() {
      $(this).removeClass('active');
      $($thePane).fadeIn(200, function () {
        $(this).addClass('active');
      });
    }
  });
});

// Products Tab
$(function () {

  $('.content-2').fadeOut();
  $('.content-3').fadeOut();

  $("#products-tab1").click(function () {
    $('.content-1').fadeIn(500);
    $('.content-2').fadeOut(500);
    $('.content-3').fadeOut(500);
  });

  $("#products-tab2").click(function () {
    $('.content-2').fadeIn(600);
    $('.content-1').fadeOut(500);
    $('.content-3').fadeOut(500);
  });

  $("#products-tab3").click(function () {
    $('.content-3').fadeIn(500);
    $('.content-2').fadeOut(500);
    $('.content-1').fadeOut(500);
  });
});


//Popular Van Slider
$('.popular-van-slider').slick({
  //centerMode: true,
  slidesToScroll: 1,
  infinite: true,
  slidesToShow: 5,
  adaptiveHeight: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        infinite: true,
        initialSlide: 0
      }
    },
    {
      breakpoint: 1200,
      settings: {
        centerMode: true,
        slidesToShow: 3,
        infinite: true,
        initialSlide: 1
      }
    },
    {
      breakpoint: 990,
      settings: {
        centerMode: true,
        slidesToShow: 2,
        infinite: true,
        initialSlide: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        infinite: true,
        initialSlide: 0
      }
    },
       {
      breakpoint: 600,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        infinite: true,
        initialSlide: 0
      }
    }
  ]
});
$('.popular-van-prev').click(function (e) {
  e.preventDefault()
  $('.popular-van-slider').slick('slickPrev');
});
$('.popular-van-next').click(function (e) {
  e.preventDefault()
  $('.popular-van-slider').slick('slickNext');
});

//Latest News Slider
$('.latest-news-slider').slick({
  slidesToScroll: 1,
  infinite: true,
  slidesToShow: 3,
  arrows: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: true,
        slidesToShow: 2,
        infinite: true
      }
    },
    {
      breakpoint: 550,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        infinite: true
      }
    },
  ]
});
$('.latest-news-prev').click(function (e) {
  e.preventDefault()
  $('.latest-news-slider').slick('slickPrev');
});
$('.latest-news-next').click(function (e) {
  e.preventDefault()
  $('.latest-news-slider').slick('slickNext');
});

//404 500 page
    $(document).ready(function() {
      var url = window.location.href;
      var page = url.substr(url.lastIndexOf('/')+1);

  if (page=="privacy-policy"){
   $(".navbar-nav").addClass("font-color-nav");
   $(".businesscompare-logo").addClass("privacy-stag");
   $(".btn-style").addClass("privacy-stag-border");
  }

  if (page=="terms-and-conditions"){
   $(".navbar-nav").addClass("font-color-nav");
   $(".businesscompare-logo").addClass("privacy-stag");
   $(".btn-style").addClass("privacy-stag-border");
  }

  if (page=="404"){
    $(".navbar-nav").addClass("font-color-nav");
    $(".businesscompare-logo").addClass("privacy-stag");
    $(".btn-style").addClass("privacy-stag-border");
  }

  if (page=="complaints"){
    $(".navbar-nav").addClass("font-color-nav");
    $(".businesscompare-logo").addClass("privacy-stag");
    $(".btn-style").addClass("privacy-stag-border");
  }

  if (page=="renewal"){
    $(".navbar-nav").addClass("font-color-nav");
    $(".businesscompare-logo").addClass("privacy-stag");
    $(".btn-style").addClass("privacy-stag-border");
  }

  if (page=="claim"){
    $(".navbar-nav").addClass("font-color-nav");
    $(".businesscompare-logo").addClass("privacy-stag");
    $(".btn-style").addClass("privacy-stag-border");
  }

  if (page=="tradesmen#public-liability-tradesmen"){
    $(".header").addClass("header-scrolled");
    }

  if (page=="motor#fleet-insurance"){
    $(".header").addClass("header-scrolled");
    }

    if (page=="page/{id}"){
      $(".navbar-nav").addClass("font-color-nav");
      $(".businesscompare-logo").addClass("privacy-stag");
      $(".btn-style").addClass("privacy-stag-border");
    }
});

//News Hero Slider
$('#news-hero').slick({
  slidesToScroll: 1,
  infinite: true,
  slidesToShow: 1,
  arrows: false,
  dots: true
});
$(function () {
  $('.vc-hero-news-bottom-links div').each(function (i) {
    $('.vc-hero-news-bottom-links .slide-' + i).click(function () {
      $('#news-hero').slick('slickGoTo', i);
    })
  });
  $('.vc-hero-news-bottom-links div').click(function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  });
});




$(function () {
  var $winWidth = $(window).width() + 5;
  var $pageWidth = 1200;
  var $pushValue = ($winWidth - $pageWidth) / 2;
  var $push = $('.popular-van-slider-wrap, .latest-news-wrap');
  if ($winWidth > 1200) {
    $push.css('left', $pushValue);
  } else {
    $push.css('left', 0);
  }
  $(window).resize(function () {
    var $winWidth = $(window).width() + 5;
    var $pageWidth = 1200;
    var $pushValue = ($winWidth - $pageWidth) / 2;
    var $push = $('.popular-van-slider-wrap, .latest-news-wrap');
    if ($winWidth > 1200) {
      $push.css('left', $pushValue);
    } else {
      $push.css('left', 0);
    }
  });
});


//Popular Van Animations
$(function () {
  $theItem = $('.popular-van-slider .slick-active')
  var $vanItem = $theItem;
  var $vanItemCount = $theItem.length;
  var i = 1;
  var until = $vanItemCount + 1;
  for (; i < until; i++) {
    currentVan = +[i];
    currentVal = 400 + (currentVan * 100);
    $vanItem.eq(currentVan - 1).removeClass('no-animation').attr({
      'data-aos-delay': currentVal
    });
  }
});

//Latest News Animations
$(function () {
  $theItem = $('.latest-news-slider .slick-active');
  var $vanItem = $theItem;
  var $vanItemCount = $theItem.length;
  var i = 1;
  var until = $vanItemCount + 1;
  for (; i < until; i++) {
    currentVan = +[i];
    currentVal = 400 + (currentVan * 100);
    $vanItem.eq(currentVan - 1).removeClass('no-animation').attr({
      'data-aos-delay': currentVal
    });
  }
});

//News Items Animations
$(function () {
  var $theItem = $('.vc-news-content-items .vc-news-content-item');
  var $vanItem = $theItem;
  var $vanItemCount = $theItem.length;
  var i = 1;
  var until = $vanItemCount + 1;
  for (; i < until; i++) {
    currentVan = +[i];
    currentVal = 600 + (currentVan * 100);
    $vanItem.eq(currentVan - 1).removeClass('no-animation').attr({
      'data-aos-delay': currentVal
    });
  }
});

//Terms Nav
$(function () {
  $("#vc-terms-nav").sticky({
    topSpacing: 100,
    bottomSpacing: 260
  });
  $('#vc-terms-nav a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 500, function () {
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              return false;
            } else {
              $target.attr('tabindex', '-1');
              $target.focus();
            };
          });
        }
      }
    });
});




//Responsive Tables
$(function () {
  $(".table-wrap").each(function () {
    var nmtTable = $(this);
    var nmtHeadRow = nmtTable.find("thead tr");
    nmtTable.find("tbody tr").each(function () {
      var curRow = $(this);
      for (var i = 0; i < curRow.find("td").length; i++) {
        var rowSelector = "td:eq(" + i + ")";
        var headSelector = "th:eq(" + i + ")";
        curRow.find(rowSelector).attr('data-title', nmtHeadRow.find(headSelector).text());
      }
    });
  });
});


//Popover
$(function () {
  $('[data-toggle="popover"]').popover({
    html: true,
    trigger: 'hover'
  });
});

//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


// Registration number
$(function () {
  $('#reg-no').click(function () {
    if ($(this).is(':checked')) {
      $('#registration-number, #edition').slideToggle('fast');
      $('#reg-make, #reg-model, #reg-year').slideToggle('fast');
    }
  });
  $('#reg-yes').click(function () {
    if ($(this).is(':checked')) {
      $('#registration-number, #edition').slideToggle('fast');
      $('#reg-make, #reg-model, #reg-year').slideToggle('fast');
    }
  });
});


//Disable Date
$(function () {
  $('#van-purchased-not').click(function () {
    if ($(this).is(':checked')) {
      $('#date-purchased').attr('disabled', 'disabled');
    } else {
      $('#date-purchased').removeAttr('disabled');
    }
  });
});


$(function () {
  $('.dropdown-item a').on('click', function (event) {
    event.preventDefault();
    $(this).siblings('.thedropdown').slideToggle('fast');
  });
});

//Contact us Form
$(document).ready(function () {
  $("#contactusresponse").css("display", "none");
  $("#complaintsresponse").css("display", "none");
  $("#modalform").on('submit', function(e){

     e.preventDefault();

  });
});


//contact
var errorHtml = "<strong>An error has occurred. Please try again</strong>";
var successHtml = "<strong>Successfully submitted</strong>";
var $form = $("form"),
  $successMsg = $(".alert");
$.validate({
  errorMessageClass: "error",
  onSuccess: postContactUsForm()
});

function postContactUsForm() {
  $("#contactusform").submit(function (e) {
    var formData = $(this).serializeArray();
    var formURL = $(this).attr("action");
    console.log("formData: ", formData);

    formData.forEach(function(formElement){
      formElement.value = formElement.value.trim();
    });
    if(formData[0].value != '' && $.isNumeric(formData[1].value) && formData[2].value != '' && formData[3].value != '' && formData[4].value != ''){
      $('.loader-default-css').addClass('loader-default');
      $.ajax(
        {
          url: formURL,
          type: "POST",
          data: formData,
          success: function (data, textStatus, jqXHR) {
            if (data.status.error == 1) {
              console.log("ajax call error");
              $("#contactusresponse").addClass("alert-danger");
              $("#contactusresponsemsg").prepend(errorHtml);
              $("#contactusresponse").show();
              $(".loader-default-css").removeClass("loader-default");
              setTimeout(function(){
                $("#contactusresponse").removeClass("alert-danger");
                $("#contactusresponsemsg strong").remove();
                $("#contactusresponse").css("display","none");
              },5000);
            } else if (data.status.success == 1) {
              // alert("AJAX request successfully completed");
              $("#contactusresponse").addClass("alert-success");
              $("#contactusresponsemsg").prepend(successHtml);
              $("#contactusresponse").show();
              $(".loader-default-css").removeClass("loader-default");
              $("#contactusform")[0].reset();
              setTimeout(function(){
                $("#contactusresponse").removeClass("alert-danger");
                $("#contactusresponsemsg strong").remove();
                $("#contactusresponse").css("display","none");
              },5000);
            }
            // if (data.status.error == 1) {
            //   console.log("ajax call error");
            //   $("#contactusresponse").addClass("alert-danger");
            //   $("#contactusresponsemsg").prepend(errorHtml);
            //   $("#contactusresponse").show();
            //   $('.loader-default-css').removeClass('loader-default');
            //   setTimeout(function(){
            //     $("#contactusresponse").removeClass("alert-danger");
            //     $("#contactusresponsemsg strong").remove();
            //     $("#contactusresponse").css("display","none");
            //   },5000);
            //
            // } else if (data.status.success == 1) {
            //   console.log("ajax call success");
            //   $("#contactusresponse").addClass("alert-success");
            //   $("#contactusresponsemsg").prepend(successHtml);
            //   $("#contactusresponse").show();
            //   $('.loader-default-css').removeClass('loader-default');
            //   $("#contactusform")[0].reset();
            //   setTimeout(function(){
            //     $("#contactusresponse").removeClass("alert-success");
            //     $("#contactusresponsemsg strong").remove();
            //     $("#contactusresponse").css("display","none");
            //   },5000);
            // }
            //data: return data from server dscjn
          },
          error: function (jqXHR, textStatus, errorThrown) {
            //if fails
            console.log("in error : ", jqXHR, textStatus, errorThrown);
          }
        });
      e.preventDefault(); //STOP default action
    }

  });
}


// $("select").change(function () {
//   $("select").css('color', '#000');
// });


//complaints
var errorHtml = "<strong>An error has occurred. Please try again</strong>";
var successHtml = "<strong>Successfully submitted</strong>";
var $form = $("form"),
  $successMsg = $(".alert");
$.validate({
  errorMessageClass: "error",
  onSuccess: postComplaintsForm()
});

function postComplaintsForm() {
  $("#complaintsform").submit(function (e) {
    var formData = $(this).serializeArray();
    var formURL = $(this).attr("action");
    console.log("formData: ", formData);

    formData.forEach(function(formElement){
      formElement.value = formElement.value.trim();
    });
    if(formData[0].value != '' && $.isNumeric(formData[1].value) && formData[2].value != '' && formData[3].value != '' && formData[4].value != ''){
      $('.loader-default-css').addClass('loader-default');
      $.ajax(
        {
          url: '/complaints',
          type: 'POST',
          data: formData,
          success: function (data, textStatus, jqXHR) {
            // if (data.status.error == 1) {
            //   console.log("ajax call error");
            //   $("#complaintsresponse").addClass("alert-danger");
            //   $("#complaintsmsg").prepend(errorHtml);
            //   $("#complaintsresponse").show();
            //   $(".loader-default-css").removeClass("loader-default");
            //   setTimeout(function(){
            //     $("#complaintsresponse").removeClass("alert-danger");
            //     $("#complaintsmsg strong").remove();
            //     $("#complaintsresponse").css("display","none");
            //   },5000);
            // } else if (data.status.success == 1) {
            //   // alert("AJAX request successfully completed");
            //   $("#complaintsresponse").addClass("alert-success");
            //   $("#complaintsmsg").prepend(successHtml);
            //   $("#complaintsresponse").show();
            //   $(".loader-default-css").removeClass("loader-default");
            //   $("#complaintsform")[0].reset();
            //   setTimeout(function(){
            //     $("#complaintsresponse").removeClass("alert-danger");
            //     $("#complaintsmsg strong").remove();
            //     $("#complaintsresponse").css("display","none");
            //   },5000);
            // }
            if (data.status.error == 1) {
              console.log("ajax call error");
              $("#complaintsresponse").addClass("alert-danger");
              $("#complaintsmsg").prepend(errorHtml);
              $("#complaintsresponse").show();
              $('.loader-default-css').removeClass('loader-default');
              setTimeout(function(){
                $("#complaintsresponse").removeClass("alert-danger");
                $("#complaintsmsg strong").remove();
                $("#complaintsresponse").css("display","none");
              },5000);

            } else if (data.status.success == 1) {
              console.log("ajax call success");
              $("#complaintsresponse").addClass("alert-success");
              $("#complaintsmsg").prepend(successHtml);
              $("#complaintsresponse").show();
              $('.loader-default-css').removeClass('loader-default');
              $("#complaintsform")[0].reset();
              setTimeout(function(){
                $("#complaintsresponse").removeClass("alert-success");
                $("#complaintsmsg strong").remove();
                $("#complaintsresponse").css("display","none");
              },5000);
            }
            //data: return data from server dscjn
          },
          error: function (jqXHR, textStatus, errorThrown) {
            //if fails
            console.log("in error : ", jqXHR, textStatus, errorThrown);
          }
        });
      e.preventDefault(); //STOP default action
    }

  });
}


//claims

var errorHtml = "<strong>An error has occurred. Please try again</strong>";
var successHtml = "<strong>Successfully submitted</strong>";
var errorclaim = "This is a required feild"
var $form = $("form"),
  $successMsg = $(".alert");
$.validate({
  errorMessageClass: "error",
  onSuccess: postClaimForm()
});

function postClaimForm() {
  $("#claimform").submit(function (e) {
    var formData = $(this).serializeArray();
    event.preventDefault();
    var formURL = $(this).attr("action");
    console.log("formData: ", formData);
    // $("#claimmsg").addClass("hidden");
    // $("#claimmsg").remove();
    // $("#claiming").removeClass("error");
    // $("#datereqmsg").addClass("hidden");
    // $("#datereqmsg").remove();
    // $("#happendate").removeClass("error");
    // console.log(req.body.claiming);

    formData.forEach(function(formElement){
      formElement.value = formElement.value.trim();
    });

    if(formData[0].value == ''){
      $("#claimmsg").removeClass("hidden");
      $("#claiming").addClass("claimserror");
    }
    if(formData[1].value == '' || formData[2].value == '' || formData[3].value == '' ){
      $("#datereqmsg").removeClass("hidden");
      $("#happendate").addClass("claimserror");
    }

    $('#claiming').on('focusout', function () {
  if(formData[0].value == ''){
    $("#claimmsg").addClass("hidden");
    $("#claiming").removeClass("claimserror");
  }
});

$('#happendate').on('focusout', function () {
if(formData[1].value == '' && formData[2].value == '' && formData[3].value == ''){
  $("#datereqmsg").addClass("hidden");
  $("#happendate").removeClass("claimserror");
}
});






    if(formData[0].value != '' && formData[1].value != '' && formData[2].value != '' && formData[3].value != '' && formData[4].value != '' && formData[5].value != '' && formData[6].value != '' && formData[7].value != '' && $.isNumeric(formData[8].value))
    {
      $('.loader-default-css').addClass('loader-default');
      $("#claimmsg").addClass("hidden");
      $("#claiming").removeClass("claimserror");
      $("#datereqmsg").addClass("hidden");
      $("#happendate").removeClass("claimserror");
      $.ajax(
        {
          url: "/claim",
          type: "POST",
          data: formData,
          success: function (data, textStatus, jqXHR) {
            if (data.status.error == 1) {
              console.log("ajax call error");
              $("#claimresponse").addClass("alert-danger");
              $("#claimresponsemsg").prepend(errorHtml);
              $("#claimresponse").show();
              $(".loader-default-css").removeClass("loader-default");
              setTimeout(function(){
                $("#claimresponse").removeClass("alert-danger");
                $("#claimresponsemsg strong").remove();
                $("#claimresponse").css("display","none");
              },5000);
            } else if (data.status.success == 1) {
              // alert("AJAX request successfully completed");
              $("#claimresponse").addClass("alert-success");
              $("#claimresponsemsg").prepend(successHtml);
              $("#complaintsresponse").show();
              $(".loader-default-css").removeClass("loader-default");
              $("#claimform")[0].reset();
              setTimeout(function(){
                $("#claimresponse").removeClass("alert-danger");
                $("#claimresponsemsg strong").remove();
                $("#claimresponse").css("display","none");
              },5000);
            }
            // if (data.status.error == 1) {
            //   console.log("ajax call error");
            //   $("#contactusresponse").addClass("alert-danger");
            //   $("#contactusresponsemsg").prepend(errorHtml);
            //   $("#contactusresponse").show();
            //   $('.loader-default-css').removeClass('loader-default');
            //   setTimeout(function(){
            //     $("#contactusresponse").removeClass("alert-danger");
            //     $("#contactusresponsemsg strong").remove();
            //     $("#contactusresponse").css("display","none");
            //   },5000);
            //
            // } else if (data.status.success == 1) {
            //   console.log("ajax call success");
            //   $("#contactusresponse").addClass("alert-success");
            //   $("#contactusresponsemsg").prepend(successHtml);
            //   $("#contactusresponse").show();
            //   $('.loader-default-css').removeClass('loader-default');
            //   $("#contactusform")[0].reset();
            //   setTimeout(function(){
            //     $("#contactusresponse").removeClass("alert-success");
            //     $("#contactusresponsemsg strong").remove();
            //     $("#contactusresponse").css("display","none");
            //   },5000);
            // }
            //data: return data from server dscjn
          },
          error: function (jqXHR, textStatus, errorThrown) {
            //if fails
            console.log("in error : ", jqXHR, textStatus, errorThrown);
          }
        });
      e.preventDefault(); //STOP default action
    }
  });
}
