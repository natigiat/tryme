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
		
		function isUrlValid(url) {
		    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
		}

		var mainInfo = $('.infoMain').val();
        
        // *************crud website*******************
        
        function getWbsite(data){
        	$.each(data, function(index) { 
	            // get date of site added
	            var date = new Date(data[index].time); 
                var d = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());      
	            $('#items').append("<tr><td>"+d+"</td><td class='siteName'>" + data[index].name + "</td> <td class='siteUrl'>" + data[index].url + "</td><td><a href='/account/progect/site/"+data[index].name+"' class='label label-info'>Edit</a></td><td><img class='fileImage' src='../images/files.png'></td><td class='delWeb'>X</span></td></tr>"); 
	        });
        }


        //get 
        $.get("/account/progect/all", function(data, status){
	        getWbsite(data);
		});


        //add 
		$('.addSite').on('click',  function(event) {
			event.preventDefault();

		    var Valid = true;
			
		    var sitename = $('#sitename').val();
		    var siteurl = $('#siteurl').val();


            $("#sitename , #siteurl").each(function () {
                if ($.trim($(this).val()) == '') {
                    Valid = false;
                    $(this).css("background" ,"#FFCECE");
                }else {
                    $(this).css("background", "");
                }
            });
            

            if(!(isUrlValid(siteurl))){
            	console.log("in");
            	Valid = false;
                $('#siteurl').css("background", "#FFCECE");

            }else 
            {
	            $('#siteurl').css("background", "");
            }

		    if(Valid){

		    	var data = {};
				 data.sitename = sitename;
				 data.siteurl = siteurl;
	             $.ajax({
		          type: 'POST',
				  data: JSON.stringify(data),
				  contentType: 'application/json',
		          url: "/account/progect",
		          }).done(function(data)  {

		          	
		            if (data == "good"){
		            	$.get("/account/progect/all", function(data, status){
				        $('#items').html("");
					       getWbsite(data);
			        	});

						$('#myModal').modal('hide');
					    swal("Nice!",  sitename + "added successfuly"); 
		            }else{
		            	sweetAlert("Oops...", data, "error");
		            }
		            
				    
			
		          }).fail(function()  {
				       sweetAlert("Oops...", "Please connect us...", "error");
		          });

			}else{
				console.log("invalid");
			}
              
             

        });

        //del website
        $('#items').on('click','.delWeb',  function(event) {
        	event.preventDefault();

        	
        	var siteName = $(this).parent().find('.siteName').text();
             var data = {};
             data.siteName = siteName;

             $.ajax({
	          type: 'POST',
			  data: JSON.stringify(data),
			  contentType: 'application/json',
	          url: "/account/progect/delete",
	          }).done(function(returns)  {
	            
	            console.log(returns);
	            $.get("/account/progect/all", function(data, status){
			        $('#items').html("");
				       getWbsite(data);
	        	});

				$('#myModal').modal('hide');
			    swal("Nice!",  returns); 

	          }).fail(function()  {
			       sweetAlert("Oops...", "Please connect us...", "error");
	          });
        });

        $('body').on('click','.progect',  function(event) {
	        // *************activity*******************
	        var sitesNumbers = $('#items').find("tr").length;
	        $('.sitesNumber').text(sitesNumbers);
        });


	}

	if($('.support').get(0)){
       $('.suppurtForm').on('submit', function(event) {
	       	event.preventDefault();
	       	var name     = $('.supportName').val();
	       	var email    = $('.supportEmai').val();
	       	var messages  = $('.supportMessage').val();

	       	var data = {};
				 data.name = name;
				 data.email = email;
				 data.messages = messages;

             $.ajax({
	          type: 'POST',
			  data: JSON.stringify(data),
			  contentType: 'application/json',
	          url: "/support",
	          }).done(function(data)  {

	            if (data == "good"){
				    swal("Nice!",  "Thank you, we will contact you soon"); 
	            }else{
	            	sweetAlert("Oops...", data, "error");
	            }

	          }).fail(function()  {
			       sweetAlert("Oops...", "Please connect us...", "error");
	          });
       	
       });
	}
	
});
jQuery(document).ready(function($) {



	
});