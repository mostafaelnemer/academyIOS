workShop ={
    getAll:function(func){
        ajaxRequest(makeURL('workShop'),function (msg) {
            func(msg);
        });
    },
    getSingle:function(workShopID,func){
        ajaxRequest(makeURL('singleWorkShop',{workShopID:workShopID}),function (msg) {
            func(msg);
        });
    },
    coursesSingleDiv:function(singleCourse,isExpired){
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html='<div class="col s6 single-work-shop"><div class="entry"><a data-id="'+singleCourse.id+'" href="#"><img src="'+APIURL+singleCourse.image+'" alt=""></a><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCourse.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleCourse.view+'</div>'+((isExpired)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        return html;
    },
    workShopPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item,msg.isExpired);
                });
                $("#allworkshopData").html(html);
           }
        });

    },
    redirectToSingleCourse:function(){
        window.location.href="workshop-single.html";
    },
    redirectToCourse: function(){
        window.location.href="workshop.html";
    },
    singleworkShopPage:function(){
        el=this;
        workShopID=window.sessionStorage.getItem("workShopID")
        if(workShopID){
		
			
            el.getSingle(workShopID,function(msg){
                course=msg.result;
                if(msg.success){
                    if(course.link){
                        $("#courseIframe").attr('src','https:'+course.link).removeClass('hidden');
                    }else{
                        $(".fake-youtube").removeClass('hidden');
                        $("#courseImageIframe").attr('src',APIURL+course.image).removeClass('hidden');
                    }
                   $("#courseTitle").html(course.name);
                   $("#instructorImage").attr('src',APIURL+course.instractor_pic);
                    $("#instructorNname").html(course.instractor_name);
                    $("#courseDate").html(course.createdtime);
                    $("#courseViews").html(course.view);
                    $("#courseDescription").html(course.description);
                    html='';
                    course.supWebinars.forEach(function(item){
                        html+='<div class="col s6" style="background: #ffffff;padding: 0px;border: 15px solid #f4f4f4;">'
                        if(msg.userSuccess){
                            if(item.link){
                                if(!msg.isExpired){
                                    html+=' <iframe class="sproutvideo-player" width="100%" height="150" src="https:'+item.link+'" frameborder="0" allowfullscreen></iframe>'
                                }else{
                                    html+=' <a href="sub"><img class="fake-youtube-sup" src="'+APIURL+'assets/images/youtube.png"  alt="يوتيوب إعمل بيزنس" title="يوتيوب إعمل بيزنس"  /><img width="100%" height="210" src="'+APIURL+item.image+'" alt="'+item.name+'" title="'+item.name+'" /></a>'
                                }
                            }else{
                                html+='<img width="100%" height="315" src="'+APIURL+item.image+'" alt="'+item.name+'" title="'+item.name+'" />';
                            }
                        }else{
                        html+='<a href="login.html"><img class="fake-youtube-sup" src="'+APIURL+'assets/images/youtube.png"  alt="يوتيوب إعمل بيزنس" title="يوتيوب إعمل بيزنس"  /><img width="100%" height="210" src="'+APIURL+item.image+'" alt="'+item.name+'" title="'+item.name+'" /></a>'
                        }
                        html+='<p class="text-center">'+item.name+'</p>'
                        html+='</div>';
                    });
                    $("#supWebinars").html(html)
                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    }
};

