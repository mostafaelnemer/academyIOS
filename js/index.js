/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};
app.initialize();*/
var userData = window.sessionStorage.getItem("userData")
var APIURL="https://www.e3melbusiness.com/";
var tokenNumber="ay5t9Xh4hmAXSUEBby9j9dSAxjNCtnrFKp6x9YqG43JaXbpHESvHsP9G4vCg";
url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var errorMessages={
    "email_exist":"The Email Is Already Exist",
    "phone_exist":"The Phone Is Already Exist",
    "success":"Your Operation is success",
    "Error_Password":"Wrong Password",
    "wrong_phone_or_password":"Wrong Phone Or Password",
    "user_not_active":"This User Not Active ",
    "user_id_required.":"User ID is required",
    "place_of_delivery_address_required.":"Place Of Delivery Address is required",
    "place_of_delivery_latitude_required.":"Place Of Delivery latitude is required",
    "place_of_delivery_longitude_required.":"Place Of Delivery longitude is required",
    "delivery_place_address_required.":"Delivery Place Address is required",
    "delivery_place_latitude_required.":"Delivery Place latitude is required",
    "delivery_place_longitude_required.":"Delivery Place longitude is required",
    "details_required.":"Details is required",
    "distance_required.":"Distance is required",
    "duration_required.":"Duration is required",
    "cost_required.":"Cost is required",
};

var db = window.openDatabase("academy_app.db", "1.0", "academy App", 200000);
console.log(db);

db.transaction(function(tx){
    query='CREATE TABLE IF NOT EXISTS academy_app_user (id unique, email,password)';
    tx.executeSql(query);
    query='SELECT * FROM academy_app_user WHERE id=?';
    tx.executeSql(query,[1],function(tx, res){
        console.log(res.rows.length);

        if(res.rows.length){
            userDataDB=res.rows[0]
            console.log(userDataDB);
            console.log(userData);
            if(!userData){
                $.ajax({
                    type: "POST",
                    url: makeURL('login'),
                    data: {"email":userDataDB.email,"password":userDataDB.password},
                    success: function (msg) {
                        $(".loader").hide();
                        if(msg.success){
                            window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                            // window.location.href="index.html";
                        }
                    }

                });
            }


        }

    });
    //console.log(query);
},errorDB,successDB);
function errorDB(tx, err) {
    console.log("Error processing SQL: "+err);
}

// Transaction success callback
//
function successDB() {
    console.log("success!");
}

function formatDate(date) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return monthNames[monthIndex] + ' ' + day + ',' + year;
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function strip_tags (html)
{
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText;
}
function limit(str,limit){
    limit=(typeof limit=='undefined')?10:limit;
    return (str.length > limit)?str.substring(0,limit)+'...':str.substring(0,limit);
}
function makeURL(action,parameters){
    parametersText='';
    if(typeof parameters==='object'){
        for (var k in parameters){
           parametersText+='&'+k+'='+parameters[k];
        }
    }
    if(userData){
        userDataJson=JSON.parse(userData);
        parametersText+='&email='+userDataJson.email;
        parametersText+='&password='+userDataJson.password;
        parametersText+='&sessionUser='+userDataJson.session_user;
    }
    console.log(parametersText);
    return APIURL+'?page=academyAPI&action='+action+parametersText+'&tokenNumber='+tokenNumber;
}
function ajaxRequest(url,method,data,func){
    ajaxData={};
    ajaxData.url=url;
    if(typeof method==='function'){
        ajaxData.method='GET';
        func=method;
    }else if(typeof method==='string'&&(method.toUpperCase()=='GET'||method.toUpperCase()=='POST')){
        ajaxData.method=method.toUpperCase();
    }else{
        ajaxData.method='GET';
    }
    if(typeof data==='function'){
        ajaxData.data={};
        func=data;
    }else if(typeof data==='object'){
        ajaxData.data=data;
    }else if(typeof data==='string'){
        ajaxData.data=data;
    }else{
        ajaxData.data={};
    }
    ajaxData.success=function (msg) {
        if(typeof msg.userSuccess!='undefined'&&!msg.userSuccess){
            window.sessionStorage.removeItem("userData");
        }
        func(msg);
    };
    $.ajax(ajaxData);
}
function getMessages(response,element){
    html='<div class="alert '+((response.success)?'alert-success':'alert-danger')+'">';
    message=response.message;
    console.log(message)
    /*if(message.length==1){
        html+=((typeof errorMessages[message[0]]=='undefined')?message[0]:errorMessages[message[0]])+'</div>';
        $(element).html(html);
        return'';
    }
    html+='<ul>';
    if(Array.isArray(message)){
        message.forEach(function(item){
            html+='<li>'+((typeof errorMessages[item]=='undefined')?item:errorMessages[item])+'</li>'
        })
    }*/
    html+='<ul>';
    html+='<li>'+errorMessages[message]+'</li>';
    html+='</ul></div>';
    $(element).html(html);
}
$(document).ready(function(){

    document.addEventListener("deviceready",onDeviceReady,false);
    $(".select2").select2()
});
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 0) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
includeHTML();
$(document).on('click',"#logout-menu a,a.logoutLink",function(e){
    e.preventDefault();
    db.transaction(function(tx){
        query='DELETE FROM academy_app_user WHERE id=?';
        tx.executeSql(query,[1]);
        window.sessionStorage.removeItem("userData");
        // window.location.href="index.html";
        window.location.reload();

    });

});
$(document).on('click','.goHome',function(e){
    e.preventDefault();
    window.location.href="index.html";
});
$(document).on('click','.goProfile',function(e){
    e.preventDefault();
    window.location.href="profile.html";
});
function onDeviceReady() {
    if(userData){
        $("#login-menu,#register-menu,.loginLink").addClass('hidden');
        $("#logout-menu,.logoutLink").removeClass('hidden');
        userDataJson=JSON.parse(userData);
        if(userDataJson.image){
            $("#userDataImage").attr('src',APIURL+'assets/images/'+userDataJson.image).removeClass('goHome').addClass('goProfile')
        }else{
            $("#userDataImage").attr('src',APIURL+'assets/images/user/75x75/anonymous.png').removeClass('goHome').addClass('goProfile')
        }
        $("#userDataFullName").html(userDataJson.fullName).removeClass('goHome').addClass('goProfile');
        if(filename=='profile.html'){
            console.log(userDataJson);
            $("#editProfileForm #email").val(userDataJson.email);
            $("#editProfileForm #name").val(userDataJson.fullName);
            $("#editProfileForm #google").val(userDataJson.google);
            $("#editProfileForm #twitter").val(userDataJson.twitter);
            $("#editProfileForm #facebook").val(userDataJson.facebook);
            $("#editProfileForm #linkedin").val(userDataJson.linkedin);
            $("#editProfileForm").submit(function(){
                el=$(this);
                $.ajax({
                    type: 'post',
                    url: APIURL+'?page=_usersaction&action=editProfile',
                    data:el.serialize(),
                    success: function (data) {
                        $("#"+el.data('message')).html(data);
                    }
                });
            })
        }
    }
    if(filename=='contact.html'){
        var validator = $("#contactus-form").validate({
            /*errorPlacement: function(error, element) {
                // Append error within linked label
                $( element )
                    .closest( "form" )
                    .find( "label[for='" + element.attr( "id" ) + "']" )
                    .append( error );
            },*/
            highlight: function(element) {
                console.log(element);
                if($(element).hasClass('select2')){
                    console.log("#select2-"+$(element).attr('id')+"-container")
                    $("#select2-"+$(element).attr('id')+"-container").parent().addClass('invalid');
                }else{
                    $(element).addClass('invalid')
                }
                //$(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function(element) {
                if($(element).hasClass('select2')){
                    console.log("#select2-"+$(element).attr('id')+"-container")
                    $("#select2-"+$(element).attr('id')+"-container").parent().removeClass('invalid');
                }else {
                    $(element).removeClass('invalid')
                }
                //$(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: "span",
            rules : {
                name : {
                    required:true,
                    minlength : 5,
                },
                email : {
                    required:true,
                },
                phone : {
                    required:true,
                },
                message : {
                    required:true,
                    minlength : 5,
                    maxlength : 255,
                },
                type : {
                    required:true,
                },
            },
            messages: {
                name : {
                    required:"من فضلك ادخل الاسم",
                    minlength : "على الاقل 5 حروف",
                },
                email : {
                    required:"من فضلك ادخل البريد الإلكترونى",
                    minlength : "على الاقل 5 حروف",
                },
                phone : {
                    required:"من فضلك ادخل رقم الهاتف",
                },
                message : {
                    required:"من فضلك ادخل الإستفسار",
                    minlength : "على الاقل 5 حروف",
                    maxlength : "على الأكثر 255 حروف",
                },
            },
            submitHandler: function() {
                // $('#SearchSpinner').addClass('spinner');
                $.ajax({
                    type: 'post',
                    url: /****/APIURL+'?page=contactus&action=contactus',
                    data: $('#contactus-form').serialize(),
                    success: function (data) {
                        $('#contactus-response').html(data);
                        $("input[type='text']").val('');
                        $("input[type='email']").val('');
                        $("input[type='phone']").val('');
                        $('textarea').val('');
                        $('select').val('');
                    }
                });
            }
        });
        $(".cancel").click(function() {
            validator.resetForm();
        });
    }
    if(filename=='register.html'){
        ajaxRequest(makeURL('countries'),function (msg) {
            if(msg.success){
                html='<option value="">اختر  الدولة</option>';
                msg.result.forEach(function(item){
                    html+='<option value="'+item.id+'" data-code="'+item.code+'"> '+item.name+'    +'+item.code+' </option>'
                });
                $("#country").html(html).trigger('change');
            }
        });
        if(filename=='register.html'){
            var validator = $("#signup-form").validate({
                errorPlacement: function(error, element) {
                    // Append error within linked label
                    /*$( element )
                        .closest( "form" )
                        .find( "label[for='" + element.attr( "id" ) + "']" )
                        .append( error );*/
                },
                highlight: function(element) {
                    console.log(element);
                    if($(element).hasClass('select2')){
                        console.log("#select2-"+$(element).attr('id')+"-container")
                        $("#select2-"+$(element).attr('id')+"-container").parent().addClass('invalid');
                    }else{
                        $(element).addClass('invalid')
                    }
                    //$(element).closest('.form-group').addClass('has-error');
                },
                unhighlight: function(element) {
                    if($(element).hasClass('select2')){
                        console.log("#select2-"+$(element).attr('id')+"-container")
                        $("#select2-"+$(element).attr('id')+"-container").parent().removeClass('invalid');
                    }else {
                        $(element).removeClass('invalid')
                    }
                    //$(element).closest('.form-group').removeClass('has-error');
                },
                errorElement: "span",
                rules : {
                    fullname : {
                        required:true,
                        minlength : 5
                    },
                    email : {
                        required:true,
                        minlength : 5
                    },
                    mobile : {
                        required:true,
                        minlength : 6
                    },
                    country: {
                        required : true
                    },
                    password : {
                        required:true,
                        minlength : 5
                    },
                    confirmpassword : {
                        required:true,
                        minlength : 5,
                        equalTo : "#password"
                    },
                },
                messages: {
                },
                submitHandler: function() {
                    var countrycode=$('#country').find(':selected').data('code') ;
                    var Mobile1=$('#Mobile').val() ;
                    if( Mobile1.charAt( 0 ) === '0' )
                        Mobile1 = Mobile1.slice( 1 );
                    var Mobile=countrycode +  Mobile1;
                    $.ajax({
                        type: 'post',
                        url: /****/APIURL+'?page=_usersaction&action=signup',
                        data: $('#signup-form').serialize()+ "&Mobile="+Mobile,
                        success: function (data) {
                            $('#signup-response').html(data);
                            // alert(data);
                            if (IsJsonString(data))
                            {
                                var httpref = JSON.parse(data);
                                window.location.assign(httpref.httpref);
                            } else {
                                if (data.indexOf('شكر')!=-1){
                                    $('input').val('')
                                    $('select option[value=""]').attr('selected','selected');
                                    window.location.assign('?page=thanks');
                                    // window.location.assign("?page=profile")
                                }else{
                                    // $('.registerresult').html(data);
                                }
                            }
                        }
                    });
                }
            });
            $(".cancel").click(function() {
                validator.resetForm();
            });
        }
    }
    // sidenav control left
    $(".sidenav-control").sideNav({
        edge: 'right',//change rtl[left,right]
        closeOnClick: false
    });
    // panel collapse icon
    $(document).on("click",".collapsible-header",function(e){
        $(this).parent().siblings().find('span i').removeClass('fa-chevron-up')//change rtl[down,up]
        $(this).find('span i').toggleClass('fa-chevron-up')//change rtl[down,up]
        el=$(this).parent().find('.collapsible-body');
        if(el.is(':visible')){
            console.log('is :visible')
            el.css({"display":"block"});
        }else{
            console.log('else is :visible')
            el.css({"display":"none"});
        }
        $(".collapsible-body").not(el).not('.faq').css({"display":"none"});
    });
    // slick slider
    $('.slider-slick').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: true
    });
    // faq collapse icon
    $(document).on("click",".faq-collapsible",function(e){
        $(this).parent().siblings().find('i').removeClass('fa-minus')
        $(this).find('i').toggleClass('fa-minus')
    });
    // testimonial
   /*var testimonialOWL=$("#testimonial").owlCarousel({
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem: true
    });*/
    // tabs
    $('ul.tabs').tabs();
    function objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            console.log(formArray)
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
    if(filename=='login.html'){

        var loginValidator = $("#login-form").validate({
            errorPlacement: function(error, element) {
                // Append error within linked label
                /*$( element )
                    .closest( "form" )
                    .find( "label[for='" + element.attr( "id" ) + "']" )
                    .append( error );*/
                //$(element).parent().parent().addClass('has-error');
            },
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: "span",
            rules : {
                email : {
                    required:true,
                    minlength : 5
                },
                password : {
                    required:true,
                    minlength : 5
                }
            },
            messages: {
            },
            submitHandler: function() {
                //alert('start');
                //$("#charge-btn").attr("disabled", true);
                ajaxRequest(makeURL('login'),'POST',$("#login-form").serialize(),function (msg) {
                    password=$("#login-form #password").val();
                    email=$("#login-form #email").val();

                    getMessages(msg,"#response")
                    $(".loader").hide();
                    if(msg.success){
                        msg.result.password=$("#login-form #password").val();

                        db.transaction(function(tx){
                            console.log('msg.success');
                            console.log(msg);
                            tx.executeSql('INSERT INTO academy_app_user (id, email,password) VALUES (1, ?,?)',[email,password]);
                            window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                            window.location.href="index.html";
                        }, errorDB, successDB);
                        // console.log(msg);
                        // window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                        // window.location.href="index.html";
                    }
                });
                /*$.ajax({
                    type: "POST",
                    url: makeURL('login'),
                    data: $("#login-form").serialize(),
                    success: function (msg) {
                        getMessages(msg,"#response")
                        $(".loader").hide();
                        if(msg.success){
                            console.log(msg);
                            msg.result.password=$("#login-form #password").val();
                            window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                            window.location.href="index.html";
                        }
                    }
                });*/
            }
        });
        $(".cancel").click(function() {
            loginValidator.resetForm();
        });
    }
    $(document).on('click','.link-watch',function(e){
        e.preventDefault();
        window.sessionStorage.setItem('watchVideoID',$(this).data('id'));
        window.location.href="watch-video.html";
    });
    $(document).on('click','.link-listen',function(e){
        e.preventDefault();
        window.sessionStorage.setItem('listenVideoID',$(this).data('id'));
        window.location.href="listen-video.html";
    });
    /*click on category*/
    $(document).on('click','.single-category a',function(e){
        e.preventDefault();
        categoryID=$(this).data('id');
        console.log(categoryID);
        window.sessionStorage.setItem("categoryID", categoryID);
        window.location.href="category-single.html";
    });
    /*click on diploma*/
    $(document).on('click','.single-diploma a',function(e){
        e.preventDefault();
        diplomaID=$(this).data('id');
        console.log(diplomaID);
        window.sessionStorage.setItem("diplomaID", diplomaID);
        window.location.href="diploma-single.html";
    });
    /*click on course*/
    $(document).on('click','.single-course a[href!=\'https://www.e3melbusiness.com/subscriptions\']',function(e){
        e.preventDefault();
        courseID=$(this).data('id');
        console.log(courseID);
        window.sessionStorage.setItem("courseID", courseID);
        window.location.href="courses-single.html";
    });
    /*click on book*/
    $(document).on('click','.single-book a[href!=\'https://www.e3melbusiness.com/subscriptions\']',function(e){
        e.preventDefault();
        bookID=$(this).data('id');
        console.log(bookID);
        window.sessionStorage.setItem("bookID", bookID);
        window.location.href="book-single.html";
    });
    /*click on webinar*/
    $(document).on('click','.single-webinar a[href!=\'https://www.e3melbusiness.com/subscriptions\']',function(e){
        e.preventDefault();
        webinarID=$(this).data('id');
        console.log(webinarID);
        window.sessionStorage.setItem("webinarID", webinarID);
        window.location.href="webinar-single.html";
    });
    /*click on work shop*/
    $(document).on('click','.single-work-shop a[href!=\'https://www.e3melbusiness.com/subscriptions\']',function(e){
        e.preventDefault();
        workShopID=$(this).data('id');
        console.log(workShopID);
        window.sessionStorage.setItem("workShopID", workShopID);
        window.location.href="workshop-single.html";
    });
    /*click on story*/
    $(document).on('click','.single-story a[href!=\'https://www.e3melbusiness.com/subscriptions\']',function(e){
        e.preventDefault();
        storyID=$(this).data('id');
        console.log(storyID);
        window.sessionStorage.setItem("storyID", storyID);
        window.location.href="sucessStory-single.html";
    });

    $(document).on('click','#more_courses',function(e){
        e.preventDefault();
        var type="courses";
        //console.log("courseID",courseID);
        // window.sessionStorage.setItem("courseID", courseID);
        window.sessionStorage.setItem("type", type);
        //  el.redirectToSingleCourse();
        window.location.href="coursesByCategory.html";
    });


    $(document).on('click','#more_webinars',function(e){
        e.preventDefault();
        var  type="webinar";
        window.sessionStorage.setItem("type", type);
        //  el.redirectToSingleCourse();
        window.location.href="coursesByCategory.html";
    });

    $(document).on('click','#more_successtories',function(e){
        e.preventDefault();
        var  type="successtories";
        window.sessionStorage.setItem("type", type);
        window.location.href="coursesByCategory.html";
    });

    $(document).on('click','#more_books',function(e){
        e.preventDefault();
        var  type="books";
        window.sessionStorage.setItem("type", type);
        window.location.href="coursesByCategory.html";
    });


    $(document).on('click','#more_workShops',function(e){
        e.preventDefault();
        var type="workShop";
        window.sessionStorage.setItem("type", type);
        window.location.href="coursesByCategory.html";
    });
    $(document).on('click','.fake-youtube,.loginRedirect',function(e){
        e.preventDefault();
        window.location.href="login.html";
    })


    $(document).on('click','#goBack',function(){
        window.history.back();
    });
}