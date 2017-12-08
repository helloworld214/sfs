/**
 * Created by Tesla on 2017/8/11/0011.
 */

;(function(win, doc, undefined){

    var NUM = 'number',
        STR = 'string',
        ARR = 'array',
        BOO = 'boolean',
        FNC = 'function',
        OBJ = 'object',
        REG = 'regexp',
        NULL = 'null',
        UNDF = 'undefined',
        EL = 'element',
        TEXT = 'text';

    var slice = [].slice;
    var tesla = {
        is: _is,
        extend: _extend,
        solve: _solve,
        dashToCamel: _dashToCamel,
        camelToDash: _camelToDash,
        createElement: _createElement,
        imgReady: _imgReady,
        getNextElement: _getNextElement,
        setStyle: _setStyle,
        parseUrl: _parseUrl,
        toJson: _toJson
    };

    // 检测是否为Number、String、Array、Boolean、Function、Object、Regexp、Null、Undefined对象和Node节点对象、Text文本节点对象
    function _is(obj, type){
        var t = Object.prototype.toString.call(obj).replace(/\[object\s|]/g, ''),
            s = typeof type === STR ? type.toLowerCase() : type;
        return typeof type === 'undefined' ? t : s === EL ? obj instanceof HTMLElement : s === t.toLowerCase();
    };

    // 对象拓展
    function _extend(){
        var a = slice.call(arguments), k, r = {};
        a.forEach(function(it){
            for(k in it){
                if(it.hasOwnProperty(k)){
                    r[k] = it[k];
                }
            }
        });
        return r;
    };

    // 模板解析
    function _solve(tpl, obj, mark){
        var s = _is(tpl, STR) ? tpl : _is(tpl, EL) ? tpl.innerHTML : '',
            o = _is(obj, OBJ) ? obj : {},
            m = _is(mark, STR) ? mark.split('') : '{}'.split(''),
            k, r;
        for(k in o){
            if(o.hasOwnProperty(k)){
                r = new RegExp(m[0] + k + m[1], 'g');
                s = s.replace(r, o[k]);
            }
        }
        return s;
    };

    // 中划线转驼峰
    function _dashToCamel(str){
        if(_is(str, STR)){
            return str.replace(/-(\w)/g, function(all, letter){
                return letter.toUpperCase();
            });
        }
    }

    // 驼峰转中划线
    function _camelToDash(str){
        if(_is(str, STR)){
            return str.replace(/([A-Z])/g, '-$1').toLowerCase()
        }
    }

    // 创建元素
    function _createElement(tag, obj, html){
        var s = tag && _is(tag, STR) ? tag : 'div',
            o = _is(tag, OBJ) ? tag : _is(obj, OBJ) ? obj : {},
            el = doc.createElement(s);
        for(var k in o){
            if(o.hasOwnProperty(k)){
                el.setAttribute(_camelToDash(k), o[k]);
            }
        }
        return html ? el.outerHTML : el;
    }

    // 判断图片下载完成
    function _imgReady(path, key, callback, rootPath){
        if(_is(path, FNC)){
            return;
        }
        if(_is(key, FNC)){
            callback = key;
            key = undefined;
        }
        var that = this, src, img, imgs = [], c = 0, rt = rootPath || '';
        if(_is(path, STR)){
            _do(rt + path, 0);
        }else if(_is(path, ARR)){
            path.forEach(function(it){
                src = _is(it, STR) ? rt + it : _is(it, OBJ) && it[key] ? rt + it[key] : '';
                src && _do(src, 1);
            });
        }
        function _do(src, a){
            img = _createElement('img');
            img.addEventListener('load', function(){
                ++c === imgs.length && callback.call(that, a ? imgs : img);
            }, false);
            img.addEventListener('error', function(){
                ++c === imgs.length && callback.call(that, a ? imgs : img);
            }, false);
            imgs.push(img);
            img.src = src;
        }
    }

    function _getNextElement(selector){
        var type = _is(selector).toLowerCase();
        if(!type === STR && !type === EL && !type === TEXT){
            return;
        }
        var target = type === STR ? document.querySelector(selector).nextSibling : selector.nextSibling;
        return !target ? null : target.nodeType === 1 ? target : _getNextElement(target);
    }

    // 获取窗口宽度
    function getWindowWidth(scrollbar){
        return scrollbar ? win.innerWidth : doc.documentElement.clientWidth;
    }

    // 设置样式
    function _setStyle(selector, style){
        var el = _is(selector, EL) ? selector : _is(selector, STR) ? slice.call(doc.querySelectorAll(selector)) : null,
            s = _is(style, OBJ) ? style : {};
        for(var k in s){
            if(s.hasOwnProperty(k)){
                el.style[_camelToDash(k)] = s[k];
            }
        }
    }

    // 路径解析
    function _parseUrl(url){
        var a = document.createElement('a'),
            decode = function(str){
                return str ? decodeURIComponent(str) : null;
            };
        a.href = url || window.location.href;
        var pn = a.pathname.replace(/^\//, '');
        return {
            url: decodeURI(a.href),
            protocol: a.protocol.replace(':', ''),
            hostname: a.hostname,
            port: a.port || 80,
            pathname: decode(a.pathname),
            filename: decode((a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1]),
            search: decode(a.search),
            hash: decode(a.hash.slice(1)),
            segments: pn ? decode(pn).split('/') : [],
            params: (function(){
                var r = {}, s = a.search.slice(1).trim();
                if(!s){
                    return r;
                }
                var q = decode(s).split('&'), o, v;
                q.forEach(function(it){
                   if(it){
                       o = it.split('=');
                       v = +o[1];
                       r[o[0]] = v || v === 0 ? v : o[1];
                   }
                });
                return r;
            })()
        }
    }

    // 字符串转化为json
    function _toJson(str){
        return (new Function("return " + str))();
    }



	win.tesla = tesla;

})(window, document);