/* Smooth scrolling
   Changes links that link to other parts of this page to scroll
   smoothly to those links rather than jump to them directly, which
   can be a little disorienting.
   
   sil, http://www.kryogenix.org/
   
   v1.0 2003-11-11
   v1.1 2005-06-16 wrap it up in an object
*/

var flag = "self";
var click = false;

var ss = {
  fixAllLinks: function() {
    // Get a list of all links in the page
    var allLinks = document.getElementsByTagName('a');
    // Walk through the list
    for (var i=0;i<allLinks.length;i++) {
      var lnk = allLinks[i];
      if ((lnk.href && lnk.href.indexOf("#") != -1) && 
          ( (lnk.pathname == location.pathname) ||
	    ('/'+lnk.pathname == location.pathname) ) && 
          (lnk.search == location.search)) {
        // If the link is internal to the page (begins in #)
        // then attach the smoothScroll function as an onclick
        // event handler
        ss.addEvent(lnk,'click',ss.smoothScroll);
      }
    }
  },

  smoothScroll: function(e) {
    // This is an event handler; get the clicked on element,
    // in a cross-browser fashion
    if (window.event) {
      target = window.event.srcElement;
    } else if (e) {
      target = e.target;
    } else return;

    // Make sure that the target is an element, not a text node
    // within an element
    if (target.nodeName.toLowerCase() != 'a') {
      target = target.parentNode;
    }
  
    // Paranoia; check this is an A tag
    if (target.nodeName.toLowerCase() != 'a') return;
  
    // Find the <a name> tag corresponding to this href
    // First strip off the hash (first character)
    anchor = target.hash.substr(1);
    // Now loop all A tags until we find one with that name
    var allLinks = document.getElementsByTagName('a');
    var destinationLink = null;
    for (var i=0;i<allLinks.length;i++) {
      var lnk = allLinks[i];
      if (lnk.name && (lnk.name == anchor)) {
        destinationLink = lnk;
        break;
      }
    }
    if (!destinationLink) destinationLink = document.getElementById(anchor);

    // If we didn't find a destination, give up and let the browser do
    // its thing
    if (!destinationLink) return true;
  
    // Find the destination's position
    var destx = destinationLink.offsetLeft; 
    var desty = destinationLink.offsetTop;
    var thisNode = destinationLink;
    while (thisNode.offsetParent && 
          (thisNode.offsetParent != document.body)) {
      thisNode = thisNode.offsetParent;
      destx += thisNode.offsetLeft;
      desty += thisNode.offsetTop;
    }

    // console.log(desty);
    click = true;
    if (desty < $("#project-1").offset().top-200) {
      flag = "self";
    }
    if (desty > $("#project-1").offset().top-200) {
      flag = "p1";
    }
    if (desty > $("#project-2").offset().top-200) {
      flag = "p2";
    }
    if (desty > $("#project-3").offset().top-200) {
      flag = "p3";
    }
    if (desty > $("#project-4").offset().top-200) {
      flag = "p4";
    }
    if (desty > $("#project-5").offset().top-200) {
      flag = "p5";
    }
    if (desty > $("#project-6").offset().top-200) {
      flag = "p6";
    }
    if (desty > $("#project-6").offset().top+200) {
      flag = "work";
    }
    $(".nav-icon:not(#nav-icon-"+flag+")").css("left","-60px");
    $("#nav-icon-"+flag).css("left", "0px");

    // Stop any current scrolling
    clearInterval(ss.INTERVAL);
  
    cypos = ss.getCurrentYPos();
  
    ss_stepsize = parseInt((desty-cypos)/ss.STEPS);
    ss.INTERVAL =
setInterval('ss.scrollWindow('+ss_stepsize+','+desty+',"'+anchor+'")',10);
  
    // And stop the actual click happening
    if (window.event) {
      window.event.cancelBubble = true;
      window.event.returnValue = false;
    }
    if (e && e.preventDefault && e.stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  scrollWindow: function(scramount,dest,anchor) {
    wascypos = ss.getCurrentYPos();
    isAbove = (wascypos < dest);
    // window.scrollTo(0,wascypos + scramount);
    $('html,body').animate({scrollTop:dest}, 500,'swing');
    iscypos = ss.getCurrentYPos();
    isAboveNow = (iscypos < dest);
    if ((isAbove != isAboveNow) || (wascypos == iscypos)) {
      // if we've just scrolled past the destination, or
      // we haven't moved from the last scroll (i.e., we're at the
      // bottom of the page) then scroll exactly to the link
      dest -= 20;

      // window.scrollTo(0,dest);
      $('html,body').animate({scrollTop:dest}, 500,'swing');
      // cancel the repeating timer

      clearInterval(ss.INTERVAL);
      // and jump to the link directly so the URL's right
      // location.hash = anchor;
      setTimeout( function() { click = false; }, 500 );
      // click = false;
    }
  },

  getCurrentYPos: function() {
    if (document.body && document.body.scrollTop)
      return document.body.scrollTop;
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    if (window.pageYOffset)
      return window.pageYOffset;
    return 0;
  },

  addEvent: function(elm, evType, fn, useCapture) {
    // addEvent and removeEvent
    // cross-browser event handling for IE5+,  NS6 and Mozilla
    // By Scott Andrew
    if (elm.addEventListener){
      elm.addEventListener(evType, fn, useCapture);
      return true;
    } else if (elm.attachEvent){
      var r = elm.attachEvent("on"+evType, fn);
      return r;
    } else {
      alert("Handler could not be removed");
    }
  } 
}

ss.STEPS = 25;

ss.addEvent(window,"load",ss.fixAllLinks);


$(window).on("scroll", function() {
  if (!click) {
    var curPos = $(window).scrollTop();

    if ($(window).scrollTop() < $("#project-1").offset().top-200) {
      flag = "self";
    }
    if ($(window).scrollTop() > $("#project-1").offset().top-200) {
      flag = "p1";
    }
    if ($(window).scrollTop() > $("#project-2").offset().top-200) {
      flag = "p2";
    }
    if ($(window).scrollTop() > $("#project-3").offset().top-200) {
      flag = "p3";
    }
    if ($(window).scrollTop() > $("#project-4").offset().top-200) {
      flag = "p4";
    }
    if ($(window).scrollTop() > $("#project-5").offset().top-200) {
      flag = "p5";
    }
    if ($(window).scrollTop() > $("#project-6").offset().top-200) {
      flag = "p6";
    }
    if ($(window).scrollTop() > $("#project-6").offset().top+200) {
      flag = "work";
    }
    $(".nav-icon:not(#nav-icon-"+flag+")").css("left","-60px");
    $("#nav-icon-"+flag).css("left", "0px");
  }
  // $(".nav-icon").css("left","0px");

});