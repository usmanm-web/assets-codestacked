/* global _$$ */

window.addEventListener("load",function(){
    sh_highlightDocument();
    load_delayed_css();

    _$$(".main-navbar .navbar-toggler").on("click", function(){
        _$$(".main-navbar .navbar-collapse").addClass("show");
    });

    _$$(".main-navbar .close, .main-navbar .overlay").on("click",function(){
        _$$(".main-navbar .navbar-collapse").removeClass("show");
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

function load_delayed_css(){
    let delayed_css = document.querySelector("#delayed-css");
    let delayed_placeholder = document.createElement("div");
    delayed_placeholder.innerHTML = delayed_css.textContent;
    document.head.insertBefore(delayed_placeholder, delayed_css)
    delayed_css.parentElement.removeChild(delayed_css);
}
