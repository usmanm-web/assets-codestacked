/* global $$ */

window.addEventListener("load",function(){
    sh_highlightDocument();
    load_delayed_css();

    setTimeout(() => {
        load_no_script_delayed_js();
    }, 500);

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

    if(!delayed_css){
        return;
    }

    delayed_placeholder.innerHTML = delayed_css.innerHTML;

    document.head.insertBefore(delayed_placeholder, delayed_css);

    delayed_css.parentElement.removeChild(delayed_css);
}

function load_no_script_delayed_js(node){
    let delayed_js = document.querySelector("#delayed-js");

    if(!delayed_js){
        return;
    }

    let parser = new DOMParser();
    let delayed_js_parsed = parser.parseFromString(delayed_js.innerHTML, 'text/html');

    for(let delayed_script of delayed_js_parsed.querySelectorAll('script')){
        let script = document.createElement("script");

        Array.from(delayed_script.attributes).forEach(attribute => {
            script.setAttribute(attribute.name, attribute.value);
        });

        script.textContent = delayed_script.textContent;

        delayed_js.parentElement.insertBefore(script.cloneNode(true), delayed_js);
    }

    delayed_js.remove();
}

function load_scripts_delayed_js(node){
    let delayed_scripts = document.querySelectorAll("script[type^='delayed-']");

    for(let delayed_script of delayed_scripts){
        delayed_script.type = delayed_script.type.replace("delayed-", "");

        /*let script = document.createElement("script");

        Array.from(delayed_script.attributes).forEach(attribute => {
            script.setAttribute(attribute.name, attribute.value);
        });*/

        delayed_script.parentElement.insertBefore(delayed_script.cloneNode(true), delayed_script);
        delayed_script.parentElement.removeChild(delayed_script);
    }
}
