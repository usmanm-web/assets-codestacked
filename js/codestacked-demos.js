/* global $$ */
window.addEventListener("load", function(){
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
        let demo_id = $$(this).data("demo_id");
        let row = $$(this).closest("tr");

        $$.ajax({
            url:BASE_URL + "/ajax-functions.php",
            type: "POST",
            data:{
                demo_id:demo_id,
                action:"delete-demo"
            },
            success:function(res,xhr,status){
                let data = JSON.parse(res);
                if(data.status === 'success'){
                    row.fadeOut();
                }
            }
        })
    });
});

function load_delayed_css(){
    let delayed_css = document.querySelector("#delayed-css");
    let delayed_placeholder = document.createElement("div");

    if(!delayed_css){
        return;
    }

    delayed_placeholder.innerHTML = delayed_css.textContent;

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