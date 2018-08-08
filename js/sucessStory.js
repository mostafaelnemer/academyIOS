successtories ={
    getAll:function(func){
        ajaxRequest(makeURL('successtories'),function (msg) {
            func(msg);
        });
    },
    getSingle:function(storyID,func){
        ajaxRequest(makeURL('singleSuccesstories',{successtoriesID:storyID}),function (msg) {
            func(msg);
        });
    },

    storiesSingleDiv:function(singleStory,isExpired){
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html='<div class="col s6 single-story"><div class="entry"><a data-id="'+singleStory.id+'" href="#"><img src="'+APIURL+singleStory.image+'" alt=""></a><h6><a data-id="'+singleStory.id+'" href="#">'+singleStory.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleStory.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
       // html+='</div><div class="price"><h5>'+singleStory.course_section.ksa_price+'$</h5></div></div></div>';
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleStory.view+'</div>'+((isExpired)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';

        return html;
    },
    successtoriesPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.storiesSingleDiv(item,msg.isExpired);
                });
                $("#allsucessStorysData").html(html);
           }
        });

    },
    redirectToSingleCourse:function(){
        window.location.href="sucessStory-single.html";
    },
    redirectToCourse: function(){
        window.location.href="sucessStory.html";
    },
    singleStoryPage:function(){
        el=this;
        storyID=window.sessionStorage.getItem("storyID")
        if(storyID){
            el.getSingle(storyID,function(msg){
                story=msg.result;
                if(msg.success){
                    if(story.link){
                        $("#storyIframe").attr('src','https:'+story.link).removeClass('hidden');
                    }else{
                        $("#storyImageIframe").attr('src',APIURL+story.image).removeClass('hidden');
                    }
                   $("#storyTitle").html(story.name);
                   $("#instructorImage").attr('src',APIURL+story.instractor_pic);
                    $("#instructorNname").html(story.instractor_name);
                    $("#storyDate").html(story.createdtime);
                    $("#storyViews").html(story.view);
                    $("#storyDescription").html(story.description);
                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    }
};
