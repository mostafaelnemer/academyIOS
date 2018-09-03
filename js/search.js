search ={

    searchPage:function(){

            q=getParameterByName('q');

        ajaxRequest(makeURL('search',{q:q}),function (msg) {
            if(msg.success){
                el=categories;
                html_response='';
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
                if(msg.result.courses || msg.result.webinar || msg.result.successtories) {

                    $("#category-name").html(msg.result.name);
                    window.sessionStorage.setItem("q", msg.result.id);
                    if(msg.result.courses ) {
                        msg.result.courses.forEach(function (item) {
                            html_course += el.singleCategoryCourse(item);
                        });
                        if (msg.result.courses.length == 0) {
                            html_course = '';
                        }
                    }

                    if( msg.result.webinar ) {
                        msg.result.webinar.forEach(function (item) {
                            html_webinars += el.singleCategoryWebinars(item, msg.isExpired);
                        });
                        if (msg.result.webinar.length == 0) {
                            html_webinars = '';
                        }
                    }
                    if( msg.result.successtories) {
                        msg.result.successtories.forEach(function (item) {
                            html_successtories += el.singleCategorySuccesstories(item, msg.isExpired);
                        });
                        if (msg.result.successtories.length == 0) {
                            html_successtories = '';
                        }
                    }



                    $("#allinnercategoryPageData").html(html_course);
                    $("#allwebinarsData").html(html_webinars);
                    $("#allsuccessStoryData").html(html_successtories);
                }
                else{
                    html_response+='<div style="padding: 12px; text-align: center;" > <h5> لا توجد نتائج</h5></div>';
                    $("#allinnercategoryPageData").html(html_response);
                }

            }

        });


    },


};
