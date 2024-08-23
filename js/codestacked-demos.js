/* global $$ */
window.addEventListener("load", function(){
    $$(".main-navbar .navbar-toggler").on("click", function(){
        $$(".main-navbar .navbar-collapse").addClass("show");
    });

    $$(".main-navbar .close, .main-navbar .overlay").on("click",function(){
        $$(".main-navbar .navbar-collapse").removeClass("show");
    });

    $$(".add-demo").on("click",function(){
        $$(".modal-content").load($$(this).attr("href"));
    });

    $$(".edit-demo").on("click",function(){
        //$$(".modal-box").block();
        $$(".modal-content").load($$(this).attr("href"),function(){
           // $$(".modal-box").unblock();
        });
    });

    $$(".delete-demo").on("click",function(){
        var demo_id = $$(this).data("demo_id");
        var row = $$(this).closest("tr");
        $$.ajax({
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

var adsense_elem = $$(".right-column .sidebar-widget");
var adsense_pos = adsense_elem[0] !== undefined ? adsense_elem[0].offsetTop: 0;

function run_fixed_elements() {
    sHeight = window.pageYOffset;
    headerHeight = $$("header")[0].clientHeight;
    var nav_menu = $$(".tabs-outer");
    var main_section = $$(".main-wrapper");
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