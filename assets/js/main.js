(function ($) {
  ("use strict");
  // Users can skip the loading process if they want.

  // Will wait for everything on the page to load.
  $(window).bind("load", function () {
    $(".preloder-overlay, body").addClass("loaded");
    setTimeout(function () {
      $(".preloder-overlay").css({
        display: "none",
      });
    }, 3000);
  });

  // scroll up start here
  $(function () {
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $(".scrollToTop").css({
          bottom: "5%",
          opacity: "1",
          transition: "all 0.5s ease",
        });
      } else {
        $(".scrollToTop").css({
          bottom: "-30%",
          opacity: "0",
          transition: "all .5s ease",
        });
      }
    });

    //Click event to scroll to top
    $(".scrollToTop").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500
      );
      return false;
    });
  });

  // lightcase
  $("a[data-rel^=lightcase]").lightcase({
    showTitle: true,
    showCaption: false,
    showSequenceInfo: true,
    autoPlay: false,
    slideshow: false,
  });

  // hamburger__menu
  $(".hamburger__icon,.hamburger__menu-nav li").click(function () {
    $(".hamburger__menu-nav,.hamburger__icon,.main-content").toggleClass(
      "active"
    );
  });

  // services slider
  $(window).bind("load", function () {
    const swiper = new Swiper(".services-slider", {
      slidesPerView: 1,
      spaceBetween: 24,

      navigation: {
        nextEl: ".services__right-arrow",
        prevEl: ".services__left-arrow",
      },
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 4,
        },
      },
    });
  });

  // testimonial slider
  $(window).bind("load", function () {
    const swiper = new Swiper(".testimonial-slider", {
      slidesPerView: 1,
      spaceBetween: 24,

      navigation: {
        nextEl: ".testimonial__right-arrow",
        prevEl: ".testimonial__left-arrow",
      },

      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        1200: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
      },
    });
  });

  // progress bar
  var lang = {
    // design skill
    photoshop: "90%",
    // language skill
    english: "90%",
    // ----------------------
    // design skill
    illustarator: "80%",
    // language skill
    french: "80%",
    // ----------------------
    // design skill
    xd: "70%",
    // language skill
    spanish: "70%",
    // ----------------------
    // design skill
    figma: "60%",
    // language skill
    german: "60%",
    // ----------------------
    // design skill
    after_effect: "80%",
    // language skill
    british: "80%",

    // language skill
  };
  var multiply = 4;
  $.each(lang, function (language, pourcent) {
    var delay = 300;

    setTimeout(function () {
      $("#" + language + "-pourcent").html(pourcent);
    }, delay * multiply);

    multiply++;
  });

  // portfolio filter
  $(".portfolio__navigation").on("click", "li", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });

  // mesonary
  var $grid = $(".portfolio__gallery-filter").isotope({
    itemSelector: ".grid-item",
    percentPosition: true,
    masonry: {
      columnWidth: 1,
    },
  });

  // portfolio__navigation activation
  $(".portfolio__navigation").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "li", function () {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });

  // project Count Up Js
  $(window).on("scroll", function () {
    $(".counter").each(function () {
      var count = $(this);
      var countTo = count.attr("data-count");
      // console.log(countTo);
      $({ countNum: count.text() }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 3500,
          easing: "linear",
          step: function () {
            count.text(Math.floor(this.countNum));
          },
          complete: function () {
            count.text(this.countNum);
          },
        }
      );
    });
  });

  //section tabs
  function resetTabs() {
    $(".main-content > section").hide();
    $(".hamburger__menu-nav a").attr("class", "");
  }
  var myUrl = window.location.href;
  var myUrlTab = myUrl.substring(myUrl.indexOf("."));
  var myUrlTabName = myUrlTab.substring(0, 4);
  (function () {
    $(".main-content > section").hide();
    $(".hamburger__menu-nav li:first a").attr("class", "active");
    $(".main-content > section:first").fadeIn();

    $(".hamburger__menu-nav a").on("click", function (e) {
      e.preventDefault();
      if ($(this).attr("class") == "active") {
        return;
      } else {
        resetTabs();
        $(this).attr("class", "active");
        $($(this).attr("href")).fadeIn();
      }
    });

    for (i = 1; i <= $(".hamburger__menu-nav li").length; i++) {
      if (myUrlTab == myUrlTabName + i) {
        resetTabs();
        $("a[href='" + myUrlTab + "']").attr("id", "active");
        $(myUrlTab).fadeIn();
      }
    }
  })();

  // typing js
  window.ityped.init(document.querySelector(".typewriter"), {
    strings: ["UI/UX Designer", "Photographer", "Fashion Designer"],
    loop: true,
  });

  // ajax contact form
  $(document).ready(function () {
    $(function () {
      var form = $("#contact-form");
      var formMessages = $(".form-message");
      $(form).submit(function (e) {
        e.preventDefault();
        var formData = $(form).serialize();
        $.ajax({
          type: "POST",
          url: $(form).attr("action"),
          data: formData,
        })
          .done(function (response) {
            $(formMessages).removeClass("error");
            $(formMessages).addClass("success");
            $(formMessages).text(response);
            $("#contact-form input, #contact-form textarea").val("");
          })
          .fail(function (data) {
            $(formMessages).removeClass("success");
            $(formMessages).addClass("error");
            if (data.responseText !== "") {
              $(formMessages).text(data.responseText);
            } else {
              $(formMessages).text(
                "Oops! An error occured and your message could not be sent."
              );
            }
          });
      });
    });
  });
})(jQuery);
