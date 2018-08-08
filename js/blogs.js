blogs ={
    getAll:function(func){
        ajaxRequest(makeURL('blogs'),function (msg) {
            func(msg);
        });
    },
    getSingle:function(blogID,func){
        ajaxRequest(makeURL('singleBlog',{blogID:blogID}),function (msg) {
            func(msg);
        });
    },
    coursesSingleDiv:function(singleCourse){
        html='<div class="col s12 single-course"><div class="entry"><a data-id="'+singleCourse.id+'" href="#"><img src="'+APIURL+singleCourse.image+'" alt=""></a><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCourse.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        //html+='</div><div class="price"><h5>'+singleCourse.course_section.ksa_price+'$</h5></div></div></div>';
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleCourse.view+'</div></div></div>';
        return html;
    },
    blogsPage:function(){
        el=this;
        el.getAll(function(msg){
            if(msg.success){
                html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item);
                });
                $("#allBlogsData").html(html);
            }
        });
        $(document).on('click','.single-course a',function(e){
            e.preventDefault();
            blogID=$(this).data('id');
            console.log(blogID);
            window.sessionStorage.setItem("blogID", blogID);
            el.redirectToSingleCourse();
        });
    },
    redirectToSingleCourse:function(){
        window.location.href="blog-single.html";
    },
    redirectToCourse: function(){
        window.location.href="blog.html";
    },
    singleBlogPage:function(){
        el=this;
        courseID=window.sessionStorage.getItem("courseID")
        if(courseID){
            el.getSingle(courseID,function(msg){
                course=msg.result;
                if(msg.success){
                    $("#courseIframe").attr('src','https:'+course.intro_vedio);
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
