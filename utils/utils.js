var Utils = Utils || {};

Utils.init = function(obj) {
    this.routes = obj;
    $(window).bind("hashchange", this.onHashChange);
}

Utils.render = function(obj) {
    var o = obj.data,
        el = obj.el,
        t = obj.tpl,
        html = '';

    if (!o) {
        html = t;
    } else {
        if (this._isArray(o)) {
            for (var i = 0; i < o.length; i++) {
                html += this._replace(t, o[i]);
            }
        } else {
            html = this._replace(t, o);
        }
    }
    el.html(html);
}

Utils.routeTo = function(key, defaultkey) {
    var routes = this.routes[key];
    var route = '';
    var self = this;
    if (this._isArray(routes)) {
        for (var i = 0; i < routes.length; i++) {
            route = self.routes[routes[i]];
            self.load(route.el, route.url);
        }
    }
}

Utils.load = function(el, url, callback, cache) {
    if (cache) {
        el.load(url + '?v=' + new Date().getTime(), callback);
    } else {
        el.load(url, callback);
    }

}

Utils._replace = function(str, o) {
    var patten = "";
    for (var name in o) {
        patten = new RegExp("\\$" + name + "(?!\\w+)", "g");
        if (o[name] != null) {
            str = str.replace(patten, o[name]);
        }
    }
    return str;
}

Utils._isArray = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
}

Utils.getPage = function() {
    var hash = window.location.hash;
    return hash.replace('#', '')
        .replace('page=', '')
        .split('?')[0];
}

Utils.onHashChange = function(e) {
    var key = Utils.getPage();
    Utils.routeTo(key);
}

Utils.getQueryParameter = function(a) {
    var c = window.location.search,
        b = "";
    c = c.replace("?", "?&").split("&");
    for (var i = 1; i < c.length; i++) {
        if (c[i].indexOf(a + "=") == 0) {
            b = c[i].replace(a + "=", "")
        }
    }
    return b
}
