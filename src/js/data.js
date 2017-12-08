/**
 * Created by Tesla on 2017/12/8/0008.
 */
;(function () {

	var RESPONSE = {
		"status": "1",
		"msg": "成功！",
		"data": []
	}

	var DATA_DEFAULT = {
		"id": "100",
		"title": "",
		"title_en": "",
		"sub_title": "",
		"link_url": "",
		"img_url": "",
		"big_img": "",
		"video_src": "",
		"addtime": "",
		"content": "",
		"preid": "",
		"prtitle": "",
		"nextid": "",
		"sell_price": "",
		"market_price": "",
		"stock_quantity": "",
		"goods_no": "",
		"puramt": "",
		"tel_phone": "",
		"nexttitle": "",
		"seo_title": "",
		"seo_keywords": "",
		"seo_description": ""
	};

	// var DIY_DATA = {
	// 	// index banner文字
	// 	"1": getRecord({
	// 		"id": "100",
	// 		"title": "Fall/Winter 2017 Collection",
	// 		"sub_title": "2017秋冬系列",
	// 	}),
	//
	// 	// index banner相册
	// 	"2": {
	//
	// 	}
	//
	// }
	// console.log("RESPONSE: %o", RESPONSE);
	// console.log("DIY_DATA: %o", DIY_DATA);
	// console.log("RESPONSE: %o", RESPONSE);

	//
	// function getRecord(obj){
	// 	var res = extend({}, RESPONSE),
	// 		data = extend({}, DATA_DEFAULT, obj);
	// 	res.data.push(data);
	// 	return res;
	// }
	//
	// function getRecords(array){
	// 	var res = extend({}, RESPONSE);
	// 	array.forEach(function(obj){
	// 	    var data = extend({}, DATA_DEFAULT, obj);
	// 		res.data.push(data);
	// 	});
	// 	return res;
	// }

	function _extend() {
		var src, copyIsArray, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		if (typeof target === "boolean") {
			deep = target;
			target = arguments[i] || {};
			i++;
		}

		if (typeof target !== "object" && !isFunction(target)) {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy && (isObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isObject(src) ? src : {};
						}
						target[name] = _extend(deep, clone, copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}

				}
			}
		}

		return target;
	}

	function type(obj) {
		return {}.toString.call(obj).replace(/\[object\s(\w+?)\]/, '$1');
	}

	function isNumber(obj) {
		return 'Number' === type(obj);
	}

	function isString(obj) {
		return 'String' === type(obj);
	}

	function isArray(obj) {
		return 'Array' === type(obj);
	}

	function isObject(obj) {
		return 'Object' === type(obj);
	}

	function isRegExp(obj) {
		return 'RegExp' === type(obj);
	}

	function isFunction(obj) {
		return 'Function' === type(obj);
	}

	function isDate(obj) {
		return 'Date' === type(obj);
	}

	function isNull(obj) {
		return 'Null' === type(obj);
	}

	function isUndefined(obj) {
		return 'Undefined' === type(obj);
	}

	console.log(type(1));
	console.log(type('s'));
	console.log(type([]));
	console.log(type({}));
	console.log(type(/\s/));
	console.log(type(_extend));
	console.log(type(new Date()));
	console.log(type(null));
	console.log(type(void 0));

	function ex() {
		var length = arguments.length;
		if (length === 0) {
			return {};
		}
		if (length === 1) {
			return arguments[0];
		}
		var args = [].slice.call(arguments),
			res = {}, key;
		args.forEach(function (arg) {
			if (!isObject(arg)) {
				return;
			}
			for (key in arg) {
				if (arg.hasOwnProperty(key)) {
					res[key] = arg[key];
				}
			}
		});
		return res;
	}

	var a = {
		"test": "tesla",
		"array": []
	};

	var b = ex({}, a,{"name": "Nikola"});
	// b.array.push({
	// 	"name": "en"
	// });
	console.log('a:', a);
	console.log('b:', b);
	console.log('c:', a);

})();




