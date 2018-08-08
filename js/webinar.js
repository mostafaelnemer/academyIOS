webinar ={
    getAll:function(func){
        ajaxRequest(makeURL('webinar'),function (msg) {
            func(msg);
        });
    },
    getSingle:function(webinarID,func){
        ajaxRequest(makeURL('singleWebinar',{webinarID:webinarID}),function (msg) {
            func(msg);
        });
    },
    
    coursesSingleDiv:function(singleCourse,isExpired){
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html='<div class="col s6 single-webinar"><div class="entry"><a data-id="'+singleCourse.id+'" href="#"><img src="'+APIURL+singleCourse.image+'" alt=""></a><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCourse.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleCourse.view+'</div>'+((isExpired)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        return html;
    },
    webinarPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item,msg.isExpired);
                });
                $("#allwebinarData").html(html);
           }
        });

    },
    redirectToSingleCourse:function(){
        window.location.href="webinar-single.html";
    },
    redirectToCourse: function(){
        window.location.href="webinar.html";
    },
    singleWebinarPage:function(){
        el=this;
        webinarID=window.sessionStorage.getItem("webinarID")
        if(webinarID){
            el.getSingle(webinarID,function(msg){
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
                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    }
};
