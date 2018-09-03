indexPage={
    getAll:function(func){
        ajaxRequest(makeURL('index'),function (msg) {
            func(msg);
        });
    },
    makeCategoriesSection:function(categories){
        html='<div class="app-title"><h4>تخصصات</h4><div class="line"></div></div><div class="row">';
        categories.forEach(function(singleCategory){
            html+='<div class="col s6 single-category"><div class="entry"><a data-id="'+singleCategory.id+'" href="#"><img src="'+APIURL+singleCategory.image+'" alt=""></a><h6><a data-id="'+singleCategory.id+'" href="#">'+singleCategory.name+'</a></h6><div class="rating">';
            html+='</div></div></div>';
        });
        html+='<div class="text-center col s12"><a href="categories.html" class="button btn-block clearfix button-more">المزيد</a></div>';
        html+='</div>'
        return html;
    },
    makeDiplomasSection:function(diplomas){
        html='<div class="app-title"><h4>دبلومة احتراف</h4><div class="line"></div></div><div class="row">';
        diplomas.forEach(function(singleDiploma){
            html+='<div class="col s6 single-diploma"><div class="entry"><a data-id="'+singleDiploma.id+'" href="#"><img src="'+APIURL+singleDiploma.image+'" alt=""></a><h6><a data-id="'+singleDiploma.id+'" href="#">'+singleDiploma.name+'</a></h6><div class="rating">';
            for(x=1;x<=singleDiploma.rating;x++){
                html+='<span class="active"><i class="fa fa-star"></i></span>';
            }
            for(y=x;y<=5;y++){
                html+='<span class=""><i class="fa fa-star"></i></span>';
            }
            html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleDiploma.view+'</div>'+((!singleDiploma.hasDiploma)?'<a href="subscriptions.html" class="button  btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        });
        html+='<div class="text-center col s12"><a href="diploma.html" class="button btn-block clearfix button-more">المزيد</a></div>';
        html+='</div>'
        return html;
    },
    makeCoursesSection:function(courses){
        html='<div class="app-title"><h4>كورسات</h4><div class="line"></div></div><div class="row">';
        courses.forEach(function(singleCourse){
            html+='<div class="col s6 single-course"><div class="entry"><a data-id="'+singleCourse.id+'" href="#"><img src="'+APIURL+singleCourse.image+'" alt=""></a><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div class="rating">';
            for(x=1;x<=singleCourse.rating;x++){
                html+='<span class="active"><i class="fa fa-star"></i></span>';
            }
            for(y=x;y<=5;y++){
                html+='<span class=""><i class="fa fa-star"></i></span>';
            }
            //html+='</div>'+((!singleCourse.hasCourse)?'<a href="subscriptions.html" class="button pull-left">اشترك الان</a>':'')+'<div class="price"><h5>'+singleCourse.ksa_price+'$</h5></div></div></div>';
            html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleCourse.view+'</div>'+((!singleCourse.hasCourse)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        });
        html+='<div class="text-center col s12"><a href="courses.html" class="button btn-block clearfix button-more">المزيد</a></div>';
        html+='</div>'
        return html;
    },
    makeBooksSection:function(books){
        html='<div class="app-title"><h4>كتب</h4><div class="line"></div></div><div class="row">';
        books.forEach(function(singleBook){
            html+='<div class="col s6 single-book"><div class="entry" ><a data-id="'+singleBook.id+'" href="#"><img src="'+APIURL+singleBook.image+'" alt=""></a><h6><a data-id="'+singleBook.id+'" href="#">'+singleBook.title+'</a></h6><div class="rating">';
            for(x=1;x<=singleBook.rating;x++){
                html+='<span class="active"><i class="fa fa-star"></i></span>';
            }
            for(y=x;y<=5;y++){
                html+='<span class=""><i class="fa fa-star"></i></span>';
            }
            html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleBook.view+'</div><div class="price"><h5></h5></div></div></div>';
        });
        html+='<div class="text-center col s12"><a href="book.html" class="button btn-block clearfix button-more">المزيد</a></div>';
        html+='</div>'
        return html;
    },
    makeWebinarsSection:function(webinars,isExpired){
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html='<div class="app-title"><h4>ندوات</h4><div class="line"></div></div><div class="row">';
        webinars.forEach(function(singleWebinar){
            html+='<div class="col s6 single-webinar"><div class="entry"><a data-id="'+singleWebinar.id+'" href="#"><img src="'+APIURL+singleWebinar.image+'" alt=""></a><h6><a data-id="'+singleWebinar.id+'" href="#">'+singleWebinar.name+'</a></h6><div class="rating">';
            for(x=1;x<=singleWebinar.rating;x++){
                html+='<span class="active"><i class="fa fa-star"></i></span>';
            }
            for(y=x;y<=5;y++){
                html+='<span class=""><i class="fa fa-star"></i></span>';
            }
            html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleWebinar.view+'</div>'+((isExpired)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        });
        html+='<div class="text-center col s12"><a href="webinar.html" class="button btn-block clearfix button-more">المزيد</a></div>';
        html+='</div>'
        return html;
    },
    makeWorkShopsSection:function(workShops,isExpired){
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html='<div class="app-title"><h4>ورش عمل</h4><div class="line"></div></div><div class="row">';
        workShops.forEach(function(singleWorkShop){
            html+='<div class="col s6 single-work-shop"><div class="entry"><a data-id="'+singleWorkShop.id+'" href="#"><img src="'+APIURL+singleWorkShop.image+'" alt=""></a><h6><a data-id="'+singleWorkShop.id+'" href="#">'+singleWorkShop.name+'</a></h6><div class="rating">';
            for(x=1;x<=singleWorkShop.rating;x++){
                html+='<span class="active"><i class="fa fa-star"></i></span>';
            }
            for(y=x;y<=5;y++){
                html+='<span class=""><i class="fa fa-star"></i></span>';
            }
            html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleWorkShop.view+'</div>'+((isExpired)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        });
        html+='<div class="text-center col s12"><a href="workshop.html" class="button btn-block clearfix button-more">المزيد</a></div>';
        html+='</div>'
        return html;
    },
    makeSuccesStoriesSection:function(successtories,isExpired){
        isExpired=(typeof isExpired=='undefined')?false:isExpired;
        html='<div class="app-title"><h4>قصص نجاح</h4><div class="line"></div></div><div class="row">';
        successtories.forEach(function(singleStory){
            html+='<div class="col s6 single-story"><div class="entry"><a data-id="'+singleStory.id+'" href="#"><img src="'+APIURL+singleStory.image+'" alt=""></a><h6><a data-id="'+singleStory.id+'" href="#">'+singleStory.name+'</a></h6><div class="rating">';
            for(x=1;x<=singleStory.rating;x++){
                html+='<span class="active"><i class="fa fa-star"></i></span>';
            }
            for(y=x;y<=5;y++){
                html+='<span class=""><i class="fa fa-star"></i></span>';
            }
            // html+='</div><div class="price"><h5>'+singleStory.course_section.ksa_price+'$</h5></div></div></div>';
            html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleStory.view+'</div>'+((isExpired)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        });
        html+='<div class="text-center col s12"><a href="sucessStory.html" class="button btn-block clearfix button-more">المزيد</a></div>';
        html+='</div>'
        return html;
    },
    makeTestimonialsSection:function(testimonials){
        html='';
        testimonials.forEach(function(item){
            html+='<div class="item"><i class="fa fa-quote-left"></i><p>'+item.description+'</p><img src="'+APIURL+item.image+'" alt=""><h6>'+item.name+'</h6><strong></strong></div>'
        });
        return html;
    },
    homePage:function(){
        el=this;
        el.getAll(function(msg){
            if(msg.result.categories){
                html=el.makeCategoriesSection(msg.result.categories);
                $("#categoriesSection").html(html);
            }
            if(msg.result.diplomas){
                html=el.makeDiplomasSection(msg.result.diplomas);
                $("#diplomasSection").html(html);
            }
            if(msg.result.courses){
                html=el.makeCoursesSection(msg.result.courses);
                $("#coursesSection").html(html);
            }
            if(msg.result.books){
                html=el.makeBooksSection(msg.result.books);
                $("#booksSection").html(html);
            }
            if(msg.result.webinars){
                html=el.makeWebinarsSection(msg.result.webinars,msg.isExpired);
                $("#webinarsSection").html(html);
            }
            if(msg.result.workShops){
                html=el.makeWorkShopsSection(msg.result.workShops,msg.isExpired);
                $("#workShopsSection").html(html);
            }
            if(msg.result.successtories){
                html=el.makeSuccesStoriesSection(msg.result.successtories,msg.isExpired);
                $("#successStoriesSection").html(html);
            }
            if(msg.result.testimonials){
                html=el.makeTestimonialsSection(msg.result.testimonials);
                $("#testimonial").html(html);
                $("#testimonial").owlCarousel({
                    slideSpeed : 300,
                    paginationSpeed : 400,
                    singleItem: true
                });

            }

        });
    }
}