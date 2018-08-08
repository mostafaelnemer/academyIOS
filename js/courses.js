courses ={
    getAll:function(func){
        ajaxRequest(makeURL('courses'),function (msg) {
            func(msg);
        });
    },
    getSingle:function(courseID,func){
        ajaxRequest(makeURL('singleCourse',{courseID:courseID}),function (msg) {
            func(msg);
        });
    },
    getSingleCurriculum:function(courseID,curriculumID,func){
        ajaxRequest(makeURL('singleCurriculum',{courseID:courseID,curriculumID:curriculumID}),function (msg) {
            func(msg);
        });
    },
    coursesSingleDiv:function(singleCourse){
        html='<div class="col s6 single-course"><div class="entry"><a data-id="'+singleCourse.id+'" href="#"><img src="'+APIURL+singleCourse.image+'" alt=""></a><h6><a data-id="'+singleCourse.id+'" href="#">'+singleCourse.name+'</a></h6><div class="rating">';
        for(x=1;x<=singleCourse.rating;x++){
            html+='<span class="active"><i class="fa fa-star"></i></span>';
        }
        for(y=x;y<=5;y++){
            html+='<span class=""><i class="fa fa-star"></i></span>';
        }
        html+='</div><div class="views-count"><i class="fa fa-eye"></i>'+singleCourse.view+'</div>'+((!singleCourse.hasCourse)?'<a href="subscriptions.html" class="button btn-block text-center subscriptions-button">اشترك الان</a>':'')+'</div></div>';
        return html;
    },
    coursesPage:function(){
        el=this;
        el.getAll(function(msg){
           if(msg.success){
               html='';
                msg.result.forEach(function(item){
                    html+=el.coursesSingleDiv(item);
                });
                $("#allCoursesData").html(html);
           }
        });
    },
    redirectToSingleCourse:function(){
        window.location.href="courses-single.html";
    },
    redirectToCourse: function(){
        window.location.href="courses.html";
    },
    singleCoursePage:function(){
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
                    $("#storyViews").html(course.view);
                    $("#courseDate").html(course.createdtime);
                    $("#courseDescription").html(course.description);
                    html='';
                    x=0;
                    options='';
                    course.sections.forEach(function(section){
                        if(section.curriculum[0].type!='exam'){
                            html+='<div class="panel panel-default"><div class="panel-heading" role="tab" id="section-'+section.id+'"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-'+section.id+'" aria-expanded="true" aria-controls="collapse-'+section.id+'"><i class="fa fa-plus"></i> '+section.name+'</a></h4></div><div id="collapse-'+section.id+'" class="panel-collapse collapse '+((x==0)?'in':'')+'" role="tabpanel" aria-labelledby="section-'+section.id+'"><div class="panel-body">';
                        }
                        options+='<option data-id="'+section.id+'" value="'+section.id+'">'+section.name+'</option>'
                        section.curriculum.forEach(function(item){
                            switch (item.type){
                                case 'default':
                                    html+='<div class="container"><div class="row"><div class="col s10">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s2">'+((item.duration)?item.duration:'')+'</div><div class="col s3"><a '+((msg.userSuccess||item.isfree=='yes')?'data-id="'+item.id+'" href="#"':'href="login.html"')+'  class="'+((msg.userSuccess||item.isfree=='yes')?'':'loginRedirect')+' link-watch">مشاهدة</a></div><div class="col s3"><a '+((msg.userSuccess||item.isfree=='yes')?'data-id="'+item.id+'" href="#"':'href="login.html"')+' href="#" class="'+((msg.userSuccess||item.isfree=='yes')?'':'loginRedirect')+' link-listen">أستماع</a></div></div></div>';
                                    break;
                               /* case'training':
                                    html+='<div class="container"><div class="row"><div class="col s8">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s4 text-center"><a class="button">بدء التدريب</a></div></div></div>';
                                    break;
                                case'exam':
                                    html+='<div class="container"><div class="row"><div class="col s8">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s4 text-center"><a class="button">بدء الأختبار</a></div></div></div>';
                                    break;*/
                            }

                        });
                        html+='</div></div></div>';
                        x++;
                    });
                    $("#accordion").html(html);
                    html='';
                    html+='<div class="row" id="ask-question"> <div class="status-question"> '+((!msg.userSuccess)?'<p>من فضلك <a href="login.html">سجل دخولك</a> اولا ثم اضف سؤالك </p>':'')+' <div id="questionMessage"></div> <div class="form-group"><select '+((!msg.userSuccess)?'disabled="disabled"':'')+' name="section_id" class="form-control" id="section_id"> <option value="0">اختر المحاضرة ... </option>';
                    html+=options;
                    html+=' </select></div> <textarea '+((!msg.userSuccess)?'disabled="disabled"':'')+' id="questionText" placeholder="اضف سؤالك هنا ..."></textarea> <div class="text-center"> <button type="button" id="addNewQuetion" '+((!msg.userSuccess)?'disabled="disabled"':'')+' class="btn btn-success green"><i class="fa fa-share"></i> أضافة سؤالك </button> </div> '+((!msg.userSuccess)?'<p>من فضلك <a href="login.html">سجل دخولك</a> اولا ثم اضف سؤالك </p>':'')+' </div> <!-- Status Upload --> <div class="clearfix"></div> <div class="clearfix" style="height: 20px;"></div> <div id="questions-answers">';
                    course.coursesQuestions.forEach(function(question){
                        html+='<div class="col s10"><div class="panel panel-default"><div class="panel-body">'+question.question+'<div class="clearfix" style="height: 20px"></div><span class="date">'+formatDate(new Date(question.createdtime))+'<i class="fa fa-calendar"></i></span> <span class="section">'+question.section_name+'</span></div><!-- /panel-body --></div><!-- /panel panel-default --></div>';
                        html+='<div class="col s2"><div class="thumbnail"><img class="img-responsive user-photo" src="'+APIURL+question.image+'" alt="'+question.section_name+'" title="'+question.section_name+'"></div><!-- /thumbnail --></div>';
                        if(question.answer){
                            html+='<div class="clearfix"></div>';
                            html+='<div class="col s10"><div class="panel panel-default answer"><div class="panel-body">'+question.answer+'<span class="date">'+question.answertime+'<i class="fa fa-calendar"></i></span><div class="clearfix"></div></div><!-- /panel-body --></div><!-- /panel panel-default --></div>';
                            html+='<div class="col-sm-2"><div class="thumbnail"><img class="img-responsive user-photo" src="'+APIURL+'assets/images/logo.png" alt="شعار إعمل بيزنس" title="شعار إعمل بيزنس"></div></div>';
                            html+='<div class="clearfix"></div>';
                        }


                    });
                    html+=' </div> </div>';
                    $("#addQuestion").html(html);
                    if(msg.userSuccess){
                        var userData = window.sessionStorage.getItem("userData")
                        if(userData){
                            userDataJson=JSON.parse(userData);
                            $(document).on('click', '#addNewQuetion', function () {
                                question = $("#questionText").val();
                                sectionName = $("#section_id option:selected").text();
                                console.log(sectionName)
                                section_id = $("#section_id option:selected").val();
                                $.ajax({
                                    type: 'post',
                                    url: /****/APIURL+'?page=courses&course_id='+course.id+'&action=addNewQuestion&email='+userDataJson.email,
                                    data: { section_id: section_id,question: question},
                                    success: function (data) {
                                        var d = new Date();
                                        $("#questionMessage").html(data);
                                        if (data.indexOf('تم اضافة سؤالك') != -1) {
                                            imageSRC = $("#userDataImage").attr('src');
                                            $("#questions-answers").append('<div class="col s10"><div class="panel panel-default"><div class="panel-body">' + question + '<div class="clearfix" style="height: 20px"></div><span class="date">Jun 11,2017 <i class="fa fa-calendar"></i></span><span class="section">' + sectionName + '</span></div></div></div><div class="col s2"><div class="thumbnail"><img class="img-responsive user-photo" src="' + imageSRC + '"></div></div>');
                                            $("#questionText").val('');
                                        }
                                    }
                                });
                            });
                        }

                    }

                }else{
                    //el.redirectToCourse();
                }
            });
        }else{
            //el.redirectToCourse();
        }


    },
    watchVideoMenu:function(msg,dataClass){
        course=msg.result;
        currentVideo=course.currentVideo;
        html='';
        course.sections.forEach(function(section){
            if(section.curriculum[0].type!='exam'){
                html+=' <li> <div class="collapsible-header '+((section.id==currentVideo.section_id)?'active':'')+'"><i class="fa fa-arrow-left"></i>'+section.name+' <span><i class="fa '+((section.id==currentVideo.section_id)?'fa-chevron-right fa-chevron-up':'fa-chevron-right')+'"></i></span></div> <div class="collapsible-body" '+((section.id==currentVideo.section_id)?'style="display: block;"':'')+'> <ul class="side-nav-panel"> ';
                section.curriculum.forEach(function(video){
                    if(video.type!='training'){
                        html+='<li '+((video.id==currentVideo.id)?'class="active"':'')+'><a '+((msg.userSuccess||video.isfree=='yes')?'data-id="'+video.id+'" href="#"':'href="login.html"')+' class="'+dataClass+'">'+((video.name)?video.name:'')+((video.description)?video.description:'')+'</a></li>';
                    }

                });
                html+=' </ul> </div> </li>';
            }

        });
        return html;
    },
    watchVideoPage:function(){
        el=this;
        courseID=window.sessionStorage.getItem("courseID")
        curriculumID=window.sessionStorage.getItem("watchVideoID");
        if(courseID&&curriculumID){
            el.getSingleCurriculum(courseID,curriculumID,function(msg){
                course=msg.result;
                currentVideo=course.currentVideo;
                if((currentVideo&&currentVideo.isfree=='yes')||msg.userSuccess){
                    $("#courseIframe").attr('src','https:'+currentVideo.link)
                    el.trackUser(course,msg,'link-watch');
                }else{
                    window.location.href="login.html";
                }


            })
        }
    },
    trackUser:function(course,msg,dataClass){
        currentVideo=course.currentVideo;
        if((currentVideo&&currentVideo.isfree=='yes')||msg.userSuccess){

            //html=el.watchVideoMenu(msg,dataClass);
            //$("#slide-out-left.curriculum-menu").html(html);
            html='';
            x=0;
            course.sections.forEach(function(section){
                if(section.curriculum[0].type!='exam'){
                    html+='<div class="panel panel-default"><div class="panel-heading" role="tab" id="section-'+section.id+'"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-'+section.id+'" aria-expanded="true" aria-controls="collapse-'+section.id+'"><i class="fa fa-plus"></i> '+section.name+'</a></h4></div><div id="collapse-'+section.id+'" class="panel-collapse collapse '+((section.id==currentVideo.section_id)?'in':'')+'" role="tabpanel" aria-labelledby="section-'+section.id+'"><div class="panel-body">';
                }
                section.curriculum.forEach(function(item){
                    switch (item.type){
                        case 'default':
                            html+='<div class="container '+((item.id==currentVideo.id)?'selected-video':'')+'" data-id="'+item.id+'"><div class="row "><div class="col s7">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div>';
                            if(dataClass=='link-watch'){
                                html+='<div class="col s3"><a '+((msg.userSuccess||item.isfree=='yes')?'data-id="'+item.id+'" href="#"':'href="login.html"')+'  class="'+((msg.userSuccess||item.isfree=='yes')?'':'loginRedirect')+' link-watch">مشاهدة</a></div>';
                            }else{
                                html+='<div class="col s3"><a '+((msg.userSuccess||item.isfree=='yes')?'data-id="'+item.id+'" href="#"':'href="login.html"')+' href="#" class="'+((msg.userSuccess||item.isfree=='yes')?'':'loginRedirect')+' link-listen">أستماع</a></div>';
                            }
                            html+='<div class="col s2">'+((item.duration)?item.duration:'')+'</div>';

                            html+='</div></div>';
                            break;
                        /* case'training':
                             html+='<div class="container"><div class="row"><div class="col s8">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s4 text-center"><a class="button">بدء التدريب</a></div></div></div>';
                             break;
                         case'exam':
                             html+='<div class="container"><div class="row"><div class="col s8">'+((item.name)?item.name:'')+' '+((item.description)?item.description:'')+' '+ ((item.isfree=='yes')?'(شاهد مجانا)':'')+'</div><div class="col s4 text-center"><a class="button">بدء الأختبار</a></div></div></div>';
                             break;*/
                    }

                });
                html+='</div></div></div>';
                x++;
            });
            $(".courses-menu").html(html);

           /* $('#draggable-point').draggable({
                axis: 'x',
                containment: "#audio-progress"
            });
            $('#draggable-point').draggable({
                drag: function() {
                    var offset = $(this).offset();
                    var xPos = (100 * parseFloat($(this).css("left"))) / (parseFloat($(this).parent().css("width"))) + "%";

                    $('#audio-progress-bar').css({
                        'width': xPos
                    });
                }
            });*/
            var mousedown=false,
                currenttime= 0,
                $progress = $('.vjs-progress-holder.vjs-slider.vjs-slider-horizontal');
            /*$progress.on('click', function(e){
             var percent = ((e.pageX-$progress.offset().left)/$progress.width());
             var seek = percent*player.getDuration();
             //$('.vjs-progress-holder.vjs-slider').css('width', percent*100 + '%');
             $('.vjs-play-progress.vjs-slider-bar').css('width', percent*100 + '%');
             player.seek(seek)
             });*/

            $progress.mousedown(function(e) {
                mousedown=true;
            });

            $progress.mouseup(function(e) {

                if  (mousedown===true)
                    player.seek(currenttime);
                mousedownn=false;
            });

            $progress.mouseleave(function(e) {
                if  (window.mousedown===true)
                    player.seek(currenttime);
                mousedown=false;
            });

            $progress.mousemove(function(e) {
                console.log(player.getDuration());
                if (mousedown===true){
                    /*var progresswidth=$('.vjs-progress-control.vjs-control').width();
                     var parentOffset = $(this).parent().offset();
                     var relX = e.pageX - parentOffset.left;
                     var seekingpostion=((relX*100)/progresswidth);
                     $('.vjs-play-progress.vjs-slider-bar').css('width', seekingpostion +'%');
                     currenttime=(seekingpostion*player.getDuration())/100;*/
                    var percent = ((e.pageX-$progress.offset().left)/$progress.width());
                    var seek = percent*player.getDuration();
                    currenttime=seek;
                    $('.vjs-play-progress.vjs-slider-bar').css('width', percent*100 + '%');



                }
            });



            $(".sproutvideo-player").attr('height',$(window).height()-10);
            $("#left-information").css({'max-height':$(window).height()-10});
            $(document).on('click','#hidden-left-info',function(e){
                e.preventDefault();
                $("#left-information").hide('slide', {direction: 'left'}, 1000,function(){$('#open-left-info').css({'display':''});});

            });

            $(document).on('click','#open-left-info a',function(e){
                e.preventDefault();
                $('#open-left-info').hide();
                $("#left-information").show('slide', {direction: 'left'}, 1000,function(){});
            });
            $(document).on('click','#saveData',function () {
                saveData();
            })
            currentVideolink='https:'+currentVideo.audio_link;
            splitLinks=currentVideolink.split('/');
            videoID=splitLinks[splitLinks.length-2];
            var userData=window.sessionStorage.getItem('userData');
            email="";
            if(userData){
                userData=JSON.parse(userData)
                email=userData.email
            }
            var videoID=splitLinks[splitLinks.length-2];
            var video_time=currentVideo.video_time;
            var current_time=currentVideo.current_time;
            var player = new SV.Player({videoId:videoID });
            var curriculum_id=currentVideo.id;
            Cookies.remove('curriculum-'+curriculum_id);
            var course_id=courseID;
            window.onbeforeunload = closingCode;
            dataCookies=Cookies.getJSON();
            console.log(dataCookies);
            var saveData=function (){
                dataCookies=Cookies.getJSON();
                console.log(dataCookies);
                $.ajax({
                    type: 'GET',
                    url: APIURL+'?page=courses&action=saveCoursesData&email='+email ,
                    //data:{'curriculum-1998':{'completed':0,'course_id':78,'current_time':null,'id':1998,'max_time':0,'type':'curriculum','video_time':null}},
                    data:{"dataCookies":dataCookies},
                    success: function (response) {
                        //console.log('saveDataDone')
                        Cookies.remove('curriculum-'+curriculum_id);
                    }
                });
            };
            function closingCode(){
                // do something...
                saveData();
                return null;
            }
            if(typeof Cookies.get(course_id)=='undefined'){
                Cookies.set('curriculum-'+curriculum_id,{type:'curriculum',course_id:course_id,id:curriculum_id,video_time:parseFloat(video_time),current_time:parseFloat(current_time),max_time:0,completed:0});
                //console.log(Cookies.getJSON('curriculum-'+curriculum_id));
            }
            player.bind('ready',function(){

                console.log('ready');
                var CurrentTime=player.getDuration();
               // console.log(CurrentTime);
                //player.seek(parseInt(current_time));
                //player.setVolume(1);
                //player.play();


            });



            $('#play').bind('click', function(e){

                $('.player-play-pause.player-button').click();
                //window.location.protocol="https:";
                if ( !$(this).hasClass('playing')){

                    $(this).addClass('playing');
                    player.play();
                    console.log('play','playing');
                }else
                {
                    $(this).removeClass('playing');
                    player.pause();
                    console.log('pause','pause');
                }
            });

            player.bind('play',function(){
                console.log('play');
                //player.seek(parseInt(current_time));
                //player.setVolume(1);
                /* if ( !$(this).hasClass('playing')){
                 $(this).addClass('playing');

                 }*/
                if ( !$('#play').hasClass('playing')){

                    $('#play').addClass('playing');

                    console.log('play','playing');
                }
                var CurrentTime=player.getDuration();
                console.log(player.getDuration());
                var minutes=Math.floor(CurrentTime/60);
                var seconds=Math.floor(CurrentTime-(minutes*60));
                $('.duration').html(minutes+ ":" +seconds );


            });
            player.bind('pause',function(){

                if ( $('#play').hasClass('playing')){

                    $('#play').removeClass('playing');

                }

            });

            //player.play();
            hasRequest=false;
            player.bind('progress',function(){

                dataCookies=Cookies.getJSON('curriculum-'+curriculum_id);
                //console.log(dataCookies);
                //console.log(player.getPercentLoaded());
                console.log(player.getDuration());
                durationTime=player.getDuration();
                durationTime=(durationTime>0)?durationTime:video_time;
                var CurrentTime=player.getCurrentTime();
                var minutes=Math.floor(CurrentTime/60);
                var seconds=Math.floor(CurrentTime-(minutes*60));
                $('.currenttime').html(minutes+ ":" +seconds );
                percentageTime=(CurrentTime/durationTime)*100
                dataCookies=Cookies.getJSON('curriculum-'+curriculum_id);
                //console.log(dataCookies);
                dataCookies.video_time=player.getDuration();
                dataCookies.current_time=player.getCurrentTime();
                dataCookies.max_time=(dataCookies.max_time>dataCookies.current_time)?dataCookies.max_time:player.getCurrentTime();
                if(percentageTime>=70&&!hasRequest){dataCookies.completed=1;}
                Cookies.set('curriculum_id-'+curriculum_id,dataCookies);
                if(percentageTime>=70&&!hasRequest){
                    hasRequest=true;
                    console.log(percentageTime);
                    saveData();
                }

                if (mousedown===false){
                    // $('.vjs-play-progress.vjs-slider-bar').css('width', player.getPercentLoaded()*100 +'%');
                    $('.vjs-play-progress.vjs-slider-bar').css('width',(CurrentTime*100)/player.getDuration() +'%');
                }
            });
            player.bind('completed',function(){
                dataCookies=Cookies.getJSON('curriculum-'+curriculum_id);
                dataCookies.completed+=1
                Cookies.set('curriculum-'+curriculum_id,dataCookies);
                saveData();
                next_id=$(".playing-data").attr('next-id');
                if(next_id>0){
                    window.location='courses/showCurriculumaudio/'+next_id + '/'+ course_id;
                }
            });
            $(document).on('click',"#player-next",function(){
                //console.log('asd');
                /*next_id=$(".playing-data").attr('next-id');
                if(next_id>0){
                    window.location='courses/showCurriculumaudio/'+next_id + '/'+ course_id;

                }*/
                console.log($("div.container.selected-video").next().data('id'));
                listenVideoID=$("div.container.selected-video").next().data('id');
                if(listenVideoID){
                    window.sessionStorage.setItem('listenVideoID',listenVideoID);
                    window.location.href="listen-video.html";
                }


            });

            $(document).on('click',"#player-prev",function(){
                ////console.log('asd');
               /* prev_id=$(".playing-data").attr('prev-id');
                if(prev_id>0){
                    window.location='courses/showCurriculumaudio/'+prev_id + '/'+ course_id;

                }*/
                console.log($("div.container.selected-video").prev().data('id'));
                listenVideoID=$("div.container.selected-video").prev().data('id');
                if(listenVideoID){
                    window.sessionStorage.setItem('listenVideoID',listenVideoID);
                    window.location.href="listen-video.html";
                }
            });


            $(document).on('mousemove mouseover','#videoIframe,#videoIframe iframe.sproutvideo-player html',function(){
                //console.log('sad');
                $("#backToCourse,#continue").css({'opacity':'1'});
            });



        }else{
            window.location.href="login.html";
        }

        },
    listenVideoPage:function(){
        el=this;
        courseID=window.sessionStorage.getItem("courseID")
        curriculumID=window.sessionStorage.getItem("listenVideoID");
        if(courseID&&curriculumID){
            el.getSingleCurriculum(courseID,curriculumID,function(msg){
                course=msg.result;
                currentVideo=course.currentVideo;
                console.log(currentVideo);
                if((currentVideo&&currentVideo.isfree=='yes')||msg.userSuccess){
                    $("#courseIframe").attr('src','https:'+currentVideo.audio_link+'?showControls=false')
                    el.trackUser(course,msg,'link-listen');
                }else{
                    window.location.href="login.html";
                }
            })
        }
    }
};
