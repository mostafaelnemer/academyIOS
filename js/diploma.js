diplomas ={
    getAll:function(func){
        ajaxRequest(makeURL('diplomas'),function (msg) {
            func(msg);
        });
    },
    getSingle:function(diplomaID,func){
        console.log(makeURL('singleDiplomas',{diplomaID:diplomaID}));
        ajaxRequest(makeURL('singleDiplomas',{diplomaID:diplomaID}),function (msg) {
            func(msg);
        });
    },
    coursesSingleDiv:function(singleCourse){
        html='<div class="col s6 single-diploma"><div class="entry"><a data-id="'+singleCourse.id+'" href="#"><img src="'+APIURL+singleCourse.image+'" alt=""></a><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCourse.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleCourse.view+'</div>'+((!singleCourse.hasDiploma)?'<a href="https://www.e3melbusiness.com/subscriptions" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        return html;
    },
    diplomasPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item);
                });
                $("#alldiplomaData").html(html);
           }
        });
    },
    redirectToSingleCourse:function(){
        window.location.href="diploma-single.html";
    },
    redirectToCourse: function(){
        window.location.href="diploma.html";
    },
	
	
	    singleCategoryPage:function(singleCategory,hasDiploma){
            hasDiploma=(typeof hasDiploma=='undefined')?false:hasDiploma;
		console.log(singleCategory);
		 htmly='<div class="col s6 '+((singleCategory.hasCourse&&hasDiploma)?'single-course':'')+'"><div class="entry"><a data-id="'+singleCategory.id+'" href="#"><img src="'+APIURL+singleCategory.image+'" alt=""></a><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCategory.rating;x++){
            htmly+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            htmly+='<span class=""><i class="fa fa-star"></i></span>';
        }
        htmly+='</div></div></div>';
        return htmly;
    },
	
	
	
    singlediplomasPage:function(){
        el=this;
        diplomaID=window.sessionStorage.getItem("diplomaID")
        if(diplomaID){
		         el.getSingle(diplomaID,function(msg){
                course=msg.result;
                if(msg.success){
					htmly='';
                   $("#courseIframe").attr('src',APIURL+course.image);
                   $("#courseTitle").html(course.name);
                   $("#instructorImage").attr('src',APIURL+course.instractor_pic);
                    $("#instructorNname").html(course.instractor_name);
                    $("#courseDate").html(course.createdtime);
                    $("#courseViews").html(course.view);
					
                    $("#courseDescription").html(course.description);
                    msg.result.courses.forEach(function(item){
                        htmly+=el.singleCategoryPage(item,course.hasDiploma);
                    });
					
					$("#allinnercategoryPageData").html(htmly);
                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }
    }
};
