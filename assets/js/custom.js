/* ----------------------------------------------------------------
	Custom JS

	Site-specific scripts. Loaded after the Canvas theme JS
	(assets/vendor/canvas/js/), so jQuery is available as $.
-----------------------------------------------------------------*/
$(function() {

  /** Sroll anchor links **/
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  /** Highlight sticky sidebar links (blog and projects pages) as they scroll **/
  if ($('.sticky-sidebar').length) {
    var aChildren = $(".sticky-sidebar li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {
      var aChild = aChildren[i];
      var ahref = $(aChild).attr('href');
      aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).on('scroll', function(){
      var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
      var windowHeight = $(window).height(); // get the height of the window
      var docHeight = $(document).height();

      for (var i=0; i < aArray.length; i++) {
        var theID = aArray[i];
        var divPos = $(theID).offset().top; // get the offset of the div from the top of page
        var nextDivPos = (i == aArray.length-1 ? docHeight : $(aArray[i+1]).offset().top);
        if (windowPos >= divPos && windowPos < (nextDivPos )) {
          $("a[href='" + theID + "']").parent().addClass("current");
        } else {
          $("a[href='" + theID + "']").parent().removeClass("current");
        }
      }

      if(windowPos + windowHeight == docHeight) {
        if (!$(".sticky-sidebar li:last-child a").hasClass("current")) {
          var navActiveCurrent = $(".current").attr("href");
          $("a[href='" + navActiveCurrent + "']").removeClass("current");
          $(".sticky-sidebar li:last-child a").addClass("current");
        }
      }
    });
  }
});
