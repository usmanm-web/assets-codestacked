/* global $$ */

window.addEventListener("load",function(){
    sh_highlightDocument();
    load_delayed_css();
    load_delayed_js();

    $$(".main-navbar .navbar-toggler").on("click", function(){
        $$(".main-navbar .navbar-collapse").addClass("show");
    });

    $$(".main-navbar .close, .main-navbar .overlay").on("click",function(){
        $$(".main-navbar .navbar-collapse").removeClass("show");
    });

    let url = window.location.href;
    let active_nav;

    if (url.indexOf("label") !== -1) {
        active_nav = url.split("/");
        active_nav = active_nav[active_nav.length - 1];
        let active_elem = document.querySelector("." + active_nav);

        if (active_elem) {
            active_elem.className += " active";
        }
    }

    $$(".popup-image").on("click",function(){
        let image = this;
        $$(".popup-image-container > .popup-inner-wrapper").append(image.outerHTML);
        $$(".popup-image-container").show();
    });
    $$(".popup-image-container > .close").on("click", function(){
        $$(".popup-image-container").hide();
        $$(".popup-image-container img").remove();
    });
}, false);

function load_delayed_css(){
    let delayed_css = document.querySelector("#delayed-css");
    let delayed_placeholder = document.createElement("div");

    delayed_placeholder.innerHTML = delayed_css.textContent;

    document.head.insertBefore(delayed_placeholder, delayed_css)
    delayed_css.parentElement.removeChild(delayed_css);
}
function load_delayed_js(){
    let delayed_js = document.querySelector("#delayed-js");
    let delayed_placeholder = document.createElement("div");

    delayed_placeholder.innerHTML = delayed_js.textContent;

    document.head.insertBefore(delayed_placeholder, delayed_js)
    delayed_js.parentElement.removeChild(delayed_js);
}
