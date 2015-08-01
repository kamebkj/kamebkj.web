var flag = "self";

/* Mouseover left-side icons */

$(".nav").on("mouseover", function () {
	$(".nav-icon").css("left","0px");
});
$(".nav").on("mouseout", function () {
	$(".nav-icon:not(#nav-icon-"+flag+")").css("left","-60px");
	$("#nav-icon-"+flag).css("left", "0px");
});


/* If click on self icon */

$("#nav-self a").click(function () {
	if ( !$("img#self-picture").hasClass("activated") ) {
		setTimeout( function() { $("img#self-picture").removeClass("activated")}, 2000 );
	}
	$("img#self-picture").addClass("activated");

});
