   function subscription() {
        var countrycode=$('#country').find(':selected').data('code') ;
        var Mobile1=$('#Mobile').val() ;

        if( Mobile1.charAt( 0 ) === '0' )
            Mobile1 = Mobile1.slice( 1 );


        var Mobile=countrycode +  Mobile1;
        subscription=$("input[name='subscription']:checked").val();
        action='subscription';
        if(subscription=='diploma'){
            action='subscriptionDiploma';
        }
        $.ajax({
            type: 'post',
            url: /****/'?page=_usersaction&action='+action,
            data: $('#subscription-form').serialize()+ "&Mobile="+Mobile,
            success: function (data) {
                //alert(data);

                if (IsJsonString(data))
                {
                    var json = JSON.parse(data);
                    if (json.success==1){
                        $('#subscription-response').html(json.message);
                    }
                    else if (json.success==0){
                        $('#subscription-response').html(json.message);
                    }

                    //  window.location.assign(httpref.httpref);
                }
                else {
                    $('#subscription-response').html('ÙŠÙˆØ¬Ø¯ Ø®Ø·Ø£ Ø¨Ø±Ø¬Ø§Ø¡ Ø§Ù„Ø£ØªØµØ§Ù„ Ø¨Ø§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†Ù‰');
                }
            }
        });
    }
	
	
	
	
	
		var validator = $("#subscription-form").validate({
		errorPlacement: function(error, element) {
			// Append error within linked label
			$( element )
					.closest( "form" )
					.find( "label[for='" + element.attr( "id" ) + "']" )
					.append( error );
		},
		errorElement: "span",
		rules : {
			subscribe_period : {
				required:true,
			},
			promotion_code : {
				//validateUserEmail:true,
				remote: {
					url: "?page=api&action=checkPromotionCode",
					type: "POST",
					cache: false,
					//dataType: "json",
					data: {
						code: function() { return $("#promotion_code").val(); },
						period: function() { return $("#subscribe_period").val(); }
					},
					dataFilter: function(data) {
						data=$.parseJSON(data);
						console.log(data.success);
						if(data.success==false){
							console.log(data.message);
							$.extend($.validator.messages,{remote:data.message});
							console.log($.validator.messages);
							setTimeout(function(){
								$("label[for='promotion_code']").html('<span id="promotion_code-error" class="error">'+ data.message +'</span>');
							},1000)

							return false;
						}else{
							$("label[for='promotion_code']").html('');
							return true;
						}
					}
				}
			},
			email : {
				required:true,


			},
			country: {
				required : true
			},
			phone : {
				minlength : 6
			},
			FullName: {
				required : true,
				minlength : 6
			},


		},
		messages: {
			remote:''

		},
		submitHandler: function() {

			//alert('doneeeeeeeeeeeeeeeee');
			subscription();
		}
	});

	$(".cancel").click(function() {
		validator.resetForm();
	});

	