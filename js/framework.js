(function (win, doc) {
    var modalShowEvent = document.createEvent('HTMLEvents');
    var modalHideEvent = document.createEvent('HTMLEvents');

    modalShowEvent.initEvent("modal.show", false, true);
    modalHideEvent.initEvent("modal.hide", false, true);

    function _$$(selector) {

        if (!(this instanceof _$$)) {
            return new _$$(selector);
        }

        this.length = 0;
        var elements = [];

        if(selector instanceof HTMLElement || selector == window || selector == document){
            elements = [selector];
        }else if(typeof selector === "string"){
            elements = doc.querySelectorAll(selector);
        }

        if (elements.length) {
            this.length = elements.length;
            for (var i = 0; i < this.length; i++) {
                this[i] = elements[i];
            }
        }
        return this;
    }

    _$$.ajaxSettings = {
        url: window.location.href,
        type: 'GET',
        data:null,
        async:true,
        "Content-type": "application/x-www-form-urlencoded",
        headers:{
            "X-Requested-With":"XMLHttpRequest",
        }
    }

    _$$.fn = _$$.prototype = {
        each: function (callback) {
            for (var i = 0; i < this.length; i++) {
                callback.apply(this[i], [this, i]);
            }
            return this;
        },
        ready:function(callback){
            if(doc.readyState === 'complete'){
                return callback();
            }else{
                return win.addEventListener("DOMContentLoaded",callback,false);
            }
        },
        on: function (name, selector, callback) {
            return this.each(function(ob,i){
                if(typeof selector === "function"){
                    callback = selector;
                    return this.addEventListener(name, callback, false);
                }else{
                    return this.addEventListener(name,function(e){
                        if(e.target.matches(selector) || e.target.closest(selector)){
                            callback.call();
                        }
                    },true);
                }
            });
        },
        hide:function(speed,callback){
            return this.each(function(ob){
                return ob.css("display","none");
            });
        },
        show:function(speed,callback){
            return this.each(function(ob){
                return ob.css("display","block");
            });
        },
        toggle:function(speed,callback){
            return this.each(function(ob){
                if(!ob.is(":visible")){
                    return ob.css("display","block");
                }else{
                    return ob.css("display","none");
                }
            });
        },
        is:function(prop){
            switch(prop){
                case ":visible":
                    return this[0].clientHeight > 0 && this[0].clientWidth > 0 ? true : false;
                    break;
            }
        },
        css:function(param1,param2){
            this.each(function(){
                if(typeof param1 === "object"){
                    for(x in param1){
                       this.style[x] = param1[x];
                    }
                }
                else if(typeof param1 === "string" && typeof param2 === "string"){
                    this.style[param1] = param2;
                }
            });
            return win.getComputedStyle(this[0]).getPropertyValue(param1);
        },
        val:function(param){
            this.each(function(){
                if(param !== '' && param !== undefined){
                    this.value = param;
                }
            });
            return this[0].value;
        },
        html:function(html){
            return this.each(function(ob){
                if(html){
                    this.innerHTML = html;
                    var scripts = _$$(this).find("script");
                    _$$(this).find("script").each(function(ob,item){
                        if(this instanceof NodeList){
                           for(i=0 ; i < this.length; i++){
                               eval(this[i].text);
                           }
                        }else{
                            eval(this.text);
                        }
                    });
                }else{
                    return this.innerHTML;
                }
            });
        },
        data:function(name,value){
            this.each(function(){
                if(value){
                    return this.dataset[name] = value;
                }else{
                    return this.dataset[name];
                }
            });
            return this.length && this[0].dataset[name];
        },
        attr:function(name,value){
            if(value){
                return this[0].setAttribute(name,value);
            }else{
                return this[0].getAttribute(name);
            }
            return this;
        },
        closest:function(selector){
            var matches = [];
            this.each(function(){
                var elem = this;
                for ( ; elem && elem.nodeType === 1; elem = elem.parentNode ) {
                    if ( elem.matches( selector ) )
                        matches.push(elem);
                }
            });
            if (matches.length) {
                this.length = matches.length;
                for (var i = 0; i < matches.length; i++) {
                    this[i] = matches[i];
                }
            }
            return this;
        },
        find: function(selector){
            var matches = [];

            this.each(function(){
                var result = this.querySelectorAll(selector);
                matches.push(result);
            });

            if (matches.length) {
                this.length = matches.length;
                for (var i = 0; i < matches.length; i++) {
                    this[i] = matches[i];
                }
            }
            return this;
        },
        remove:function(){
            return this.each(function(){
                return this.parentNode.removeChild(this);
            });
        },
        addClass:function(className){
            return this.each(function(){
                return this.classList.add(className);
            });
        },
        removeClass:function(className){
            return this.each(function(){
                return this.classList.remove(className);
            });
        },
        toggleClass:function(className){
            return this.each(function(){
               if(this.classList.contains(className)){
                   return this.classList.remove(className);
               }else{
                   return this.classList.add(className);
               }
            });
        },
        fadeIn:function(speed){
            return this.each(function(ob,i){
                ob.css({"transition":"opacity 0.5s","display":"static"});
                setTimeout(function(){
                    ob[i].remove();
                },500);
            });
        },
        fadeOut:function(speed){
            return this.each(function(ob,i){
                ob.css({"transition":"opacity 0.5s","opacity":"0"});
                setTimeout(function(){
                    ob[i].remove();
                },500);
            });
        },
        prepend:function(elem){
            return this.each(function(){
                var el = document.createElement("div");
                el.innerHTML = elem;
                return this.insertBefore(el.firstChild,this.firstChild);
            });
        },
        append:function(elem){
            return this.each(function(){
                var el = document.createElement("div");
                el.innerHTML = elem;
                return this.appendChild(el.firstChild);
            });
        },
        before:function(elem){
            return this.each(function(){
                var el = document.createElement("div");
                el.innerHTML = elem;
                return this.parentElement.insertBefore(el.firstChild,this);
            });
        },
        after:function(elem){
            return this.each(function(){
                var el = document.createElement("div");
                el.innerHTML = elem;
                return this.parentElement.insertBefore(el.firstChild,this.nextSibling);
            });
        },
        modal:function(name,callback) {
            return this.each(function(ob){
                switch(name){
                    case "show":
                        ob.toggle();
                        this.dispatchEvent(modalShowEvent);
                        break;
                    case "hide":
                        ob.toggle();
                        this.dispatchEvent(modalHideEvent);
                        break;
                }
                if(callback)
                    callback();
            });
        },
        load:function(url,callback){
            var self = this;
            var xhr = openxhr(url);
            xhr.onreadystatechange = function(){

                if(xhr.status == 200 && xhr.readyState == 4){
                    self.html(xhr.response);
                    if(callback)
                        callback.call();
                }
            }
        },
        block: function(options){
            var settings = _$$.blockSettings;

            var block_element = '<div class="block-ui" style="position: absolute;top:0px;left:0px;height:100%;width:100%;background:rgba(0,0,0,0.5);cursor:wait;">'+
                                    '<div class="block-loader" style="position: absolute; top: 50%;left:0;right:0;margin:0px auto; width: 200px;background:#fff;text-align:center;padding: 15px;">Loading...</div>'+
                                '</div>';
            var el = document.createElement("div");
            el.innerHTML = block_element;
            el.firstChild.style.visibility = 'hidden';
            document.body.appendChild(el);
            return this.append(block_element).css("position","relative");
        },
        unblock: function(){
            return this.each(function(ob,i){
                return this.querySelector(".block-ui").remove();
            });
        }

    };
    _$$.blockSettings = {
        message: "Processing...",
        css:{

        }
    }
    _$$.ajax = function(obj){
        var xhr = openxhr(obj);
        if(typeof obj.success === "function"){
            xhr.onreadystatechange = function(){
                if(xhr.status == 200 && xhr.readyState == 4){
                    obj.success.call(null,xhr.responseText,xhr,xhr.status);
                }
            }
        }
    }

    function openxhr(url,obj){
        if(typeof url === 'object'){
            obj = url;
            url = null;
        }

        var settings = _$$.ajaxSettings;
        settings.url = url;
        if(typeof obj === 'object'){
            for(var x in obj){
                if(settings[x] !== undefined){
                    settings[x] = obj[x];
                }
            }
        }

        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else{
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.open(settings.type,settings.url,settings.async);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        if(typeof settings.data === 'object'){
            var data = [];
            for(var x in settings.data){
                data.push(x+"="+settings.data[x]);
            }
            data = data.join("&")
        }

        xhr.send(data);

        return xhr;
    }

    win._$$ = _$$;
})(window, document);

_$$(document).ready(function(){

    _$$("[data-toggle='modal']").on("click",function(e){
        e.preventDefault();
        var modal = _$$(this).data("target");
        _$$(modal).modal("show");
    });

    _$$(".modal span.close").on("click",function(){
        var target = _$$(this).data("close");
        _$$(target).modal("hide");
    });
    _$$(".modal").on("click",function(e){
        if(e.target === this){
            _$$(this).modal("hide");
        }
    });

    _$$(".alert span.close, .note span.close").on("click",function(){
        var target = _$$(this).data("close");
        _$$(target).fadeOut();
    });

    _$$(".file-input").each(function(ob){
        ob.css({"display":"none"});
        var elem = document.createElement("span");

        elem.setAttribute("class","file-input-wrapper");
        elem.appendChild(document.createTextNode("Browse..."));
        //elem.insertAdjacentHTML('afterbegin', '<span style="font-weight: bold;">&#128228; </span>');

        this.after(elem);
        _$$(".file-input-wrapper").on("click",function(){
            this.previousSibling.click();
        });
    });

    _$$(".file-input").on("change",function(){
        var fileName = this.files.length > 1 ? this.files.length + " Files..." : this.files[0].name;
        this.nextElementSibling.textContent = fileName;
        this.nextElementSibling.setAttribute("title",fileName);
    });
});
