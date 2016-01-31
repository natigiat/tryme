jQuery(document).ready(function($) {

	
	if($('.index').get(0)){
	  
	  $('.slider').slick({
		  infinite: true,
		  autoplay: true,
  		  autoplaySpeed: 2000,
		  speed: 500,
		  fade: true,
		  cssEase: 'linear',
		  dots: true,
		  fade: true
	  });

	}

	if($('.progect').get(0)){
		
		
		var mainInfo = $('.infoMain').val();

        //add website to database ajax
		$('.addW').on('click',  function(event) {
			event.preventDefault();
			
		    
            var form = $(this).parents('form');
		    swal({
		        title: "Are you sure?",
		        text: "You will not be able to recover this imaginary file!",
		        type: "input",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: "Yes, delete it!",
		        closeOnConfirm: false
		    }, 
		
		    function(inputValue){
                console.log(inputValue);
	             $.ajax({
		          type: "POST",
		          url: "/account/progect",
		          data: { name: inputValue} ,
		          dataType: 'json',
		          }).done(function()  {
		           
		            $.get("/account/progect/all", function(data, status){
			          $.each(data, function(index) {   

			            $('#items').html("<tr><td>"+data.length+"</td><td>" + data[index].name + "</td> <td>http://www." + data[index].url + ".com</td><td>" +  + "</td><td></td></tr>");
			           });
				    });
				    swal("Nice!", "You wrote: " + inputValue, "success"); 
			
		          }).fail(function()  {
		            console.log("bad");
		          });
		    
		    });


        });



        $.get("/account/progect/all", function(data, status){
	        $.each(data, function(index) {       
	            $('#items').append("<tr><td>"+data.length+"</td><td>" + data[index].name + "</td> <td>http://www." + data[index].url + ".com</td><td>" + '<div class="checkbox"> <label> <input type="checkbox" data-toggle="toggle"> </label> </div>'+ "</td><td></td></tr>"); });
		});

        



	}
	
});