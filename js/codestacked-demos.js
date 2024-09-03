/* global $$ */
window.addEventListener("load", function(){
    load_delayed_css();
    load_delayed_js();

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

function load_delayed_js(){
    let delayed_js = document.querySelector("#delayed-js");
    let delayed_placeholder = document.createElement("div");

    if(!delayed_js){
        return;
    }

    delayed_placeholder.innerHTML = delayed_js.textContent;

    document.head.insertBefore(delayed_placeholder, delayed_js);

    delayed_js.parentElement.removeChild(delayed_js);
}