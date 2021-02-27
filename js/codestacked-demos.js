_$$(document).ready(function(){
    var web_branding = _$$("body > div:last-child");
    if(web_branding != null){
        web_branding.remove();
    }

    run_fixed_elements();

    _$$(window).on("scroll",function(){
        run_fixed_elements();
    },false);

    _$$(".menu-bars").on("click",function(){
        _$$(".main-nav > .inner-menu").addClass("in");
        _$$(".main-nav > .overlay, .main-nav > .inner-menu > .close").removeClass("hide");
    });

    _$$(".inner-menu > .close, .main-nav > .overlay").on("click",function(){
        _$$(".main-nav > .inner-menu").removeClass("in");
        _$$(".main-nav > .overlay,.inner-menu > .close").addClass("hide");
    });

    _$$(".add-demo").on("click",function(){
        _$$(".modal-content").load(_$$(this).attr("href"));
    });

    _$$(".edit-demo").on("click",function(){
        //_$$(".modal-box").block();
        _$$(".modal-content").load(_$$(this).attr("href"),function(){
           // _$$(".modal-box").unblock();
        });
    });

    _$$(".delete-demo").on("click",function(){
        var demo_id = _$$(this).data("demo_id");
        var row = _$$(this).closest("tr");
        _$$.ajax({
            url:BASE_URL + "/ajax-functions.php",
            type: "POST",
            data:{
                demo_id:demo_id,
                action:"delete-demo"
            },
            success:function(res,xhr,status){
                var data = JSON.parse(res);
                if(data.status == 'success'){
                    row.fadeOut();
                }
            }
        })
    });
});

var adsense_elem = _$$(".right-column .sidebar-widget");
var adsense_pos = adsense_elem[0] !== undefined ? adsense_elem[0].offsetTop: 0;

function run_fixed_elements() {
    sHeight = window.pageYOffset;
    headerHeight = _$$("header")[0].clientHeight;
    var nav_menu = _$$(".tabs-outer");
    var main_section = _$$(".main-wrapper");
    var nav_height = nav_menu[0].clientHeight;

    if (sHeight > headerHeight) {
        nav_menu.addClass("fixed");
        main_section.css({"margin-top":"35px"});
    } else {
        nav_menu.removeClass("fixed");
        main_section.css({"margin-top":"0px"});
    }

    if ((window.innerWidth > 768) && (adsense_pos > 0)) {
        if ((sHeight + nav_height + 20) > adsense_pos) {
            adsense_elem.addClass("fixed");
        } else {
            adsense_elem.removeClass("fixed");
        }
    }
}