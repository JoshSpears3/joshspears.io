'use strict';
$(function () {
    $('#navigation-arrow').on('click',function(){
        $('html, body').animate({
            scrollTop: $("#work").offset().top
        }, 1800, 'easeInOutExpo');
    });
});
