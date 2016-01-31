jQuery(document).ready(function($) {

    // var aboveHeight = $("#aboveFrame").outerHeight(true);
 //    $(window).resize(function() {
 //        $('#frame').height( $(window).height() - aboveHeight );
 //    }).resize();
 //    

    /**********************
    ****page /examples*****
    **********************/
    var $element = $('.panel-default');
    var endHight = $(document).height() - $element.offset().top - $element.height();
    $('iframe').attr('height', endHight);
   
    if($('.examplePage').get(0)){

      $('.go').on('click', function(event) {
        event.preventDefault();

        var framurl = $('.form-control').val();
        console.log(framurl);
        $('iframe').attr('src', framurl);
      });

      $('.footer').remove();
    }

	
});