function showVoiceSetting(){

    $("#bgCover").show();
    $(".voice-setting-content").fadeIn("fast");

    $("#voice-setting .voice-setting-close").off("click").on("click", function () {
        $("#bgCover").hide();
        $(".voice-setting-content").hide();
    });
    settingBgMusic();
    settingHammerMusic();
    setVibrateOnOff();
}
var bgMusOnOff="on";
function settingBgMusic(){
    dragPanelMove("#bg-music-setting-btn","#bg-music-bar","#bg-music-setting-rate",function(rate){
        if(bgMusOnOff=="on"){
            var bgMus=document.getElementById("startmusic");
            bgMus.volume=rate.toFixed(1);
        }
        
    });
}

function settingHammerMusic(){
    dragPanelMove("#hammer-music-setting-btn","#hammer-music-bar","#hammer-music-setting-rate",function(rate){
        var hammerMus=document.getElementById("sound1");
            hammerMus.volume=rate.toFixed(1);
        var mouseMus=document.getElementById("sound2");
            mouseMus.volume=rate.toFixed(1);
    });
}

function setVibrateOnOff(){
    var bgMus=document.getElementById("startmusic");
    $("#vibrate-on-off-btn").on("click",function(){
        if($(this).hasClass("vibrate-off")){
            $(this).removeClass("vibrate-off");
            $(this).addClass("vibrate-on");
            $("#vibrateOnOff").val("ON");
            $("#vibrate-on-off-btn img").attr("src","images/on.png");
            bgMus.pause();
            bgMusOnOff="off";
        }else{
            $(this).removeClass("vibrate-on");
            $(this).addClass("vibrate-off");
            $("#vibrateOnOff").val("OFF");
            $("#vibrate-on-off-btn img").attr("src","images/off.png");
            bgMus.play();
            bgMusOnOff="on";
        }
    });
}

var dragJob=false;
function dragPanelMove(moveDiv,parentDiv,rateDiv,callback){
    var c=$(parentDiv).offset().left;
    var barWith=$(parentDiv).width();
    $(parentDiv).on("mouseup",function (e) {
        var tag= e.pageX - c;
        $(moveDiv).css({"left":tag+"px"});
        $(rateDiv).css({"width":tag-5+"px"});
        callback && callback(tag/barWith);
    });
    $(document).on("touchstart", moveDiv, function (e) {
      dragJob = true;
    });
     $(document).on("touchend",parentDiv, function (e) {
      dragJob = false;
    });
    $(document).on("touchmove",parentDiv,function (e) {
         var moveEndX = e.originalEvent.changedTouches[0].pageX;
        if(dragJob){
            if(moveEndX - c>0 && moveEndX- c<$(parentDiv).width()-10){
                 $(moveDiv).css({"left":moveEndX - c+"px"});
                 $(rateDiv).css({"width":moveEndX - c-5+"px"});
                 callback && callback((moveEndX - c)/barWith);
            }
           
        }
    })
}


   function vibration(){
       navigator.vibrate = navigator.vibrate
               || navigator.webkitVibrate
               || navigator.mozVibrate
               || navigator.msVibrate;

       if (navigator.vibrate) {
           // 支持
           //console.log("支持设备震动！");
           navigator.vibrate(200);
       }
         
   }

