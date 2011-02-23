/**
 * @name jConfigurator Plugin
 * @author Hasin Hayder
 * @date Feb 23, 2011
 * @license New BSD
 * @demo http://scripts.ofhas.in/jconf/
 *
 * check the demo.html file for detailed example :)
 */
(function($){
    var opts;
    var evts=[];
    var jcObj;
    var jid="";
    $.fn.jConfigurator = function(options){
        var defaults = {
            width:"100",
            height:"20",
            zIndex:"10000",
            backgroundColor:"#fff",
            color:"#000",
            border:"1px solid #ccc",
            separator:"&nbsp;|&nbsp;",
            labels:[]
        }
        opts = $.extend(defaults, options);
        jid = "jcconf"+Math.floor(Math.random()*110011)

        $("<div/>").attr({"id":jid})
                   .css({"width":opts.width+"px",
                         "height":opts.height+"px",
                         "padding":"10px",
                         "border":opts.border,
                         "position":"absolute",
                         "backgroundColor":opts.backgroundColor,
                         "zIndex":1000,
                         "display":"none"
                     })
                   .bind("mouseover",function(e){$(this).show()})
                   .appendTo("body");

        for(i=0;i<opts.labels.length;i++){
            var lname = opts.labels[i].name;
            //alert(lname);
            var evt = opts.labels[i].callback;
            evts[lname]=evt;
            $("<span/>").html(lname)
                        .css({"cursor":"pointer","color":opts.color})
                        .bind("click",{"caller":lname},$.fn.jCl)
                        .appendTo("#"+jid);
            
            if(i<(opts.labels.length-1)) $("<span/>").html(opts.separator)
                                                     .css({"color":opts.color})
                                                     .appendTo("#"+jid);
        }
        $(this).each(function(){
            $(this).data("jid",jid);
            $(this).bind("mousemove",$.fn.jCmi);
            $(this).bind("mouseout",$.fn.jCmo);
        });


    }

    $.fn.jCmi = function(e){
        jcObj = $(this).attr("id");
        jid = $(this).data("jid");
        var left = $(this).offset().left;
        var top = $(this).offset().top-4;
        var width = $(this).width();
        var cleft = left + width-(($("#"+jid).width()*1+21));
        //console.log(cleft);
        var ctop = top+5;
        $("#"+jid).css({
            "left":cleft,
            "top":ctop
        }).show();
    }
    $.fn.jCmo = function(e){
        jid = $(this).data("jid");
        $("#"+jid).hide();
    }

    $.fn.jCl = function(e){
        var activeObj = $("#"+jcObj);
        jid = $(activeObj).data("jid");
        e.stopPropagation();
        $("#"+jid).hide();
        
        evt = evts[e.data.caller];
        if(typeof evt == "function"){
            evt(activeObj);
            
        }
    }



})(jQuery);