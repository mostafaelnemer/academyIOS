categories ={
    getAll:function(func){
        ajaxRequest(makeURL('categories'),function (msg) {
            func(msg);
        });
    },
    getSingle:function(categoryID,func){
        ajaxRequest(makeURL('singleCategories',{categoryID:categoryID}),function (msg) {
            func(msg);
        });
    },

    getSingleCourse:function(courseID,func){
        ajaxRequest(makeURL('singleCourse',{courseID:courseID}),function (msg) {
            func(msg);
        });
    },

    getMore:function(type,categoryID,func){
        ajaxRequest(makeURL('singleCategoriesType',{type:type,categoryID:categoryID}),function (msg) {
            func(msg);
        });
    },

    categorySingleDiv:function(singleCategory){

        html='<div class="col s6 single-category"><div class="entry"><a data-id="'+singleCategory.id+'" href="#"><img src="'+APIURL+singleCategory.image+'" alt=""></a><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
       /* for(x=1;x<=singleCategory.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }*/
       // html+='</div><div class="price"><h5>'+singleCategory.course_section.ksa_price+'$</h5></div></div></div>';
	     html+='</div></div></div>';

        return html;
    },
    categoriesPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.categorySingleDiv(item);
                });
                $("#allcategoryData").html(html);
           }
        });

    },
	 innercategoryPage:function(){
        el=this;
         categoryID=window.sessionStorage.getItem("categoryID")
        el.getSingle(categoryID,function(msg){
           if(msg.success){
               html_course='';
               html_course+='<div style="padding: 12px"> <h5> كورسات</h5></div>';
               html_webinars='';
               html_webinars+='<div style="padding: 12px"> <h5> ندوات</h5></div>';
               html_successtories='';
               html_successtories+='<div style="padding: 12px"> <h5> قصص النجاح</h5></div>';
               html_workShops='';
               html_workShops+='<div style="padding: 12px"> <h5> ورش عمل </h5></div>';
               html_books='';
               html_books+='<div style="padding: 12px"> <h5> كتب </h5></div>';
               $("#category-name").html(msg.result.name);
               window.sessionStorage.setItem("categoryID", msg.result.id);
               msg.result.courses.forEach(function(item){
                    html_course+=el.singleCategoryCourse(item);
               });
               html_course+="<div class='clearfix'></div><div class='text-center col s12'><a href='' class='button btn-block clearfix button-more' id='more_courses'>المزيد</a></div>";
               msg.result.webinars.forEach(function(item){
                   html_webinars+=el.singleCategoryWebinars(item,msg.isExpired);
               });
               html_webinars+="<div class='clearfix'></div><div class='text-center col s12'><a href='' class='button btn-block clearfix button-more' id='more_webinars'>المزيد</a></div>";
               msg.result.successtories.forEach(function(item){
                   html_successtories+=el.singleCategorySuccesstories(item,msg.isExpired);
               });
               html_successtories+="<div class='clearfix'></div><div class='text-center col s12'><a href='' class='button btn-block clearfix button-more' id='more_successtories'>المزيد</a></div>";
               msg.result.books.forEach(function(item){
                   html_books+=el.singleCategoryBooks(item);
               });
               html_books+="<div class='clearfix'></div><div class='text-center col s12'><a href='' class='button btn-block clearfix button-more' id='more_books'>المزيد</a></div>";
               msg.result.workShops.forEach(function(item){
                   html_workShops+=el.singleCategoryWorkShops(item,msg.isExpired);
               });
               html_workShops+="<div class='clearfix'></div><div class='text-center col s12'><a href='' class='button btn-block clearfix button-more' id='more_workShops'>المزيد</a></div>";

               if(msg.result.courses.length==0){
                   html_course='';
               }
               if(msg.result.webinars.length==0){
                   html_webinars='';
               }
               if(msg.result.successtories.length==0){
                   html_successtories='';
               }
               if(msg.result.books.length==0){
                   html_books='';
               }
               if(msg.result.workShops.length==0){
                   html_workShops='';
               }
               $("#allinnercategoryPageData").html(html_course);
               $("#allwebinarsData").html(html_webinars);
               $("#allsuccessStoryData").html(html_successtories);
               $("#allbooksData").html(html_books);
               $("#allworkShopData").html(html_workShops);

           }
        });

         //links





         // end links
         /*$(document).on('click','.single-webinar a[href!=\'subscriptions.html\']',function(e){
             e.preventDefault();
             webinarID=$(this).data('id');
             console.log(webinarID);
             window.sessionStorage.setItem("webinarID", webinarID);
            // el.redirectToSingleCourse();
             window.location.href="webinar-single.html";
         });
         $(document).on('click','.single-successtories a[href!=\'subscriptions.html\']',function(e){
             e.preventDefault();
             successtoriesID=$(this).data('id');
             console.log(successtoriesID);
             window.sessionStorage.setItem("successtoriesrID", successtoriesID);
            // el.redirectToSingleCourse();
             window.location.href="sucessStory-single.html";
         });
         $(document).on('click','.single-books a[href!=\'subscriptions.html\']',function(e){
             e.preventDefault();
             booksID=$(this).data('id');
             console.log(bookssID);
             window.sessionStorage.setItem("booksID", booksID);
            // el.redirectToSingleCourse();
             window.location.href="book-single.html";
         });
         $(document).on('click','.single-workShops a[href!=\'subscriptions.html\']',function(e){
             e.preventDefault();
             workShopsID=$(this).data('id');
             console.log(workShopsID);
             window.sessionStorage.setItem("workShopsID", workShopsID);
             //el.redirectToSingleCourse();
             window.location.href="workshop-single.html";
         });*/
    },
    redirectToSingleCourse:function(){
        window.location.href="category-single.html";
    },
    redirectToCourse: function(){
        window.location.href="categories.html";
    },
    singleCategoryCourse:function(singleCourse){
        html='';
        html+='<div class="col s6 single-course"><div class="entry"><a data-id="'+singleCourse.id+'" href="#"><img src="'+APIURL+singleCourse.image+'" alt=""></a><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCourse.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        //html+='</div>'+((!singleCourse.hasCourse)?'<a href="subscriptions.html" class="button pull-left">اشترك الان</a>':'')+'<div class="price"><h5>'+singleCourse.ksa_price+'$</h5></div></div></div>';
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleCourse.view+'</div>'+((!singleCourse.hasCourse)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        return html;
    },
    singleCategoryWebinars:function(singleWebinar,isExpired){
        //  APIURL=APIURL+'assets/images/';
        // html='<div> <h6> كورسات</h6></div>';
        html='';
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html+='<div class="col s6 single-webinar"><div class="entry"><a data-id="'+singleWebinar.id+'" href="#"><img src="'+APIURL+singleWebinar.image+'" alt=""></a><h6><a data-id="'+singleWebinar.id+'" href="#">'+singleWebinar.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleWebinar.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleWebinar.view+'</div>'+((isExpired)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        return html;
    },
    singleCategorySuccesstories:function(singleStory,isExpired){
        //  APIURL=APIURL+'assets/images/';
        // html='<div> <h6> كورسات</h6></div>';
        html='';
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html+='<div class="col s6 single-story"><div class="entry"><a data-id="'+singleStory.id+'" href="#"><img src="'+APIURL+singleStory.image+'" alt=""></a><h6><a data-id="'+singleStory.id+'" href="#">'+singleStory.name+'</a></h6><div class="rating">';
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
    singleCategoryBooks:function(singleBook){
        html='';
        html+='<div class="col s6 single-book"><div class="entry" ><a data-id="'+singleBook.id+'" href="#"><img src="'+APIURL+singleBook.image+'" alt=""></a><h6><a data-id="'+singleBook.id+'" href="#">'+singleBook.title+'</a></h6><div class="rating">';
        for(x=1;x<=singleBook.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleBook.view+'</div><div class="price"><h5></h5></div></div></div>';
        return html;
    },
    singleCategoryWorkShops:function(singleWorkShop,isExpired){
        html='';
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html+='<div class="col s6 single-work-shop"><div class="entry"><a data-id="'+singleWorkShop.id+'" href="#"><img src="'+APIURL+singleWorkShop.image+'" alt=""></a><h6><a data-id="'+singleWorkShop.id+'" href="#">'+singleWorkShop.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleWorkShop.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleWorkShop.view+'</div>'+((isExpired)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        return html;
    },
    coursesByCat:function(singleCategory,isExpired){
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html='';
        html='<div class="col s6 single-category"><div class="entry"><a data-id="'+singleCategory.id+'" href="#"><img src="'+APIURL+singleCategory.image+'" alt=""></a><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
        if(singleCategory.rating){
            for(x=1;x<=singleCategory.rating;x++){
                html+='<span class="active"><i class="fa fa-star"></i></span>';
            }
            for(y=x;y<=5;y++){
                html+='<span class=""><i class="fa fa-star"></i></span>';
            }
        }

        // html+='</div><div class="price"><h5>'+singleCategory.course_section.ksa_price+'$</h5></div></div></div>';
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleCategory.view+'</div>'+((isExpired)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';

        return html;
    },
    singleCoursePage:function(){
        el=this;
       var  type=window.sessionStorage.getItem("type");
       var  categoryID=window.sessionStorage.getItem("categoryID");

        if(categoryID && type){
            el.getMore(type,categoryID,function(msg){
                course=msg.result;
                if(msg.success){
                    html='';
                    msg.result[type].forEach(function(item){
                        html+=el.coursesByCat(item,msg.isExpired);
                    });
                    switch (type){
                        case 'courses':
                            title="كورسات"
                            break;
                        case 'webinar':
                            title="ندوات"
                            break;
                        case 'successtories':
                            title="قصص نجاح"
                            break;
                        case 'books':
                            title="كتب"
                            break;
                        case 'workShop':
                            title="ورش عمل"
                            break;
                    }
                    $("#category-title").html(title);
                    $("#allCoursesCategoryData").html(html);
                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    }

};
