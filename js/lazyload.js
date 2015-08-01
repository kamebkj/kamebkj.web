$(document).ready(function() {

    // $('img').load(function() {
    //     console.log(this);
    //     $(this).addClass('active');
    // });

    // $('img').one('load',function(){
    //     console.log('loaded');
    // }).each(function() {
    //   if(this.complete) $(this).load();
    // });

    /* Every time the window is scrolled ... */
    $(window).scroll( function(){

        /* Check the location of each desired element */
        $('.project img').each( function(i){

            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                $(this).animate({'opacity':'1'}, 500);
                // $(this).show();
            }
            
        });

        $('.project .videoWrapper').each( function(i){
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                $(this).animate({'opacity':'1'}, 500);
                // $(this).show();
            }
            
        }); 

    
    });
    
});