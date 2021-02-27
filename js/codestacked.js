/* global _$$ */

window.addEventListener("load",function(){
    run_fixed_elements();
    sh_highlightDocument();
    load_delayed_css();

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

    var url = window.location.href;
    if (url.indexOf("label") != -1) {
        active_nav = url.split("/");
        active_nav = active_nav[active_nav.length - 1];
        var active_elem = document.querySelector("." + active_nav);
        if (active_elem) {
            active_elem.className += " active";
        }
    }
    _$$(".popup-image").on("click",function(){
        var image = this;
        _$$(".popup-image-container > .popup-inner-wrapper").append(image.outerHTML);
        _$$(".popup-image-container").show();
    });
    _$$(".popup-image-container > .close").on("click", function(){
        _$$(".popup-image-container").hide();
        _$$(".popup-image-container img").remove();
    });
},false);

var adsense_elem = _$$(".right-column #AdSense2");
var adsense_pos = adsense_elem[0] !== undefined ? adsense_elem[0].offsetTop: 0;

function run_fixed_elements() {
    scroll_height = window.pageYOffset;
    header_height = _$$("header")[0].clientHeight;
    var nav_menu = _$$(".tabs-outer");
    var main_section = _$$(".content-inner");
    var nav_height = nav_menu[0].clientHeight;

    if (scroll_height > header_height) {
        nav_menu.addClass("fixed");
        main_section.css({"margin-top":"55px"});
    } else {
        nav_menu.removeClass("fixed");
        main_section.css({"margin-top":"0px"});
    }

    if ((window.innerWidth > 768) && (adsense_pos > 0)) {
        if ((scroll_height + nav_height + 20) > adsense_pos) {
            adsense_elem.addClass("fixed");
        } else {
            adsense_elem.removeClass("fixed");
        }
    }
}
function load_delayed_css(){
    let delayed_css = document.querySelector("#delayed-css");
    let delayed_placeholder = document.createElement("div");
    delayed_placeholder.innerHTML = delayed_css.textContent;
    document.head.insertBefore(delayed_placeholder, delayed_css)
    delayed_css.parentElement.removeChild(delayed_css);
}