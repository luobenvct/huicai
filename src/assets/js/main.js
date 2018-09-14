(function(W) {
	/**
	 * Sting.contains(s|char)
	 */
	if(!String.prototype.contains) {
		String.prototype.contains = function() {
			return String.prototype.indexOf.apply(this, arguments) !== -1;
		};
	}

	/***************************************************************************
	 * replaceAll： 替换字符串中的字符。
	 * 用法： yourstring.replaceAll("要替换的字符", "替换成什么");
	 * 例子:
	 * "cssrain".replaceAll("s", "a"); " cs sr ai n".replaceAll(" ", "");
	 **************************************************************************/
	if(!String.prototype.replaceAll) {
		String.prototype.replaceAll = function(AFindText, ARepText) {
			var raRegExp = new RegExp(AFindText, "g");
			//console.log(this);
			return this.replace(raRegExp, ARepText);
		}
	}

	/**
	 * Sting.leftPad(s|char, len)
	 */
	if(!String.prototype.leftPad) {
		String.prototype.leftPad = function(padChar, len) {
			var str = this;
			var strLen = str.toString().length;
			while (strLen < len) {
				str = padChar + str;
				strLen++;
			}
			return str.toString();
		};
	}
	/**
	 * Sting.filling(s|char, len)
	 */
	if(!String.prototype.filling) {
		String.prototype.filling = function(padChar, len) {
			var str = this;
			var strLen = str.toString().length;
			while (strLen < len) {
				str = str+padChar;
				strLen++;
			}
			return str.toString();
		};
	}

	//Date 对象扩展
	/**
	 * 返回当前日期在一周中的第一天(1 - 7)
	 */
	if(!Date.prototype.dayOfWeek) {
		Date.prototype.dayOfWeek = function() {
			var n = this.getDay();
			return n === 0 ? 7 : n;
		};
	}

	/**
	 * 返回指定年月的最大天数
	 *
	 * @comment:month+1?为什么获取的都是指定月的下一个月的天数
	 */
	if(!Date.maxDayOfDate) {
		Date.maxDayOfDate = function(year, month) {
			return new Date(year, month, 0).getDate();
		};
	}

	/**
	 * 返回当前日期所在月的最大天数
	 */
	if(!Date.prototype.maxDayOfDate) {
		Date.prototype.maxDayOfDate = function(d) {
			d = d || this;
			return Date.maxDayOfDate(d.getFullYear(), d.getMonth() + 1);
		};
	}

	/**
	 * 截掉日期的天之后的部分
	 */
	if(!Date.truncateToDay) {
		Date.truncateToDay = function(d) {
			d = d || new Date();
			return new Date(d.getFullYear(), d.getMonth(), d.getDate());
		};
	}

	/**
	 * 截掉日期的天之后的部分
	 */
	if(!Date.prototype.truncateToDay) {
		Date.prototype.truncateToDay = function() {
			return Date.truncateToDay(this);
		};
	}

	/**
	 * 是否是闰年
	 */
	if(!Date.isLeapYear) {
		Date.isLeapYear = function(iYear) {
			return iYear % 4 == 0 && iYear % 100 != 0 || iYear % 400 == 0;
		};
	}

	/**
	 * 是否是闰年
	 */
	if(!Date.prototype.isLeapYear) {
		Date.prototype.isLeapYear = function() {
			return Date.isLeapYear(this.getFullYear());
		};
	}

	/**
	 * 返回两个日期相差的天数
	 */
	if(!Date.daysBetween) {
		Date.daysBetween = function(d1, d2) {
			var dd1 =  new Date(Date.parse(d1));
			var dd2 =  new Date(Date.parse(d2));
			var ddd1 = new Date(dd1.getFullYear(), dd1.getMonth(), dd1.getDate());
			var ddd2 = new Date(dd2.getFullYear(), dd2.getMonth(), dd2.getDate());
			return parseInt((ddd2 - ddd1) / 1000 / 60 / 60 / 24);
		};
	}

	/**
	 *offset为毫秒数 添加毫秒数更改时间
	 */
	Date.prototype.addMillisecond = function(offset) {
		return new Date(this.getTime() + offset);
	};
	/**
	 *offset为秒数 添加秒数更改时间
	 */
	Date.prototype.addSecond = function(offset) {
		return this.addMillisecond(offset * 1000);
	};
	/**
	 *offset为分 添加分数更改时间
	 */
	Date.prototype.addMinute = function(offset) {
		return this.addSecond(offset * 60);
	};
	/**
	 *offset为小时 添加小时更改时间
	 */
	Date.prototype.addHour = function(offset) {
		return this.addMinute(60 * offset);
	};
	/**
	 *offset为天数 添加天数更改时间
	 */
	Date.prototype.addDay = function(offset) {
		return this.addHour(offset * 24);
	};
	/**
	 *offset为月份 添加月份数更改时间
	 */
	Date.prototype.addMonth = function(offset) {
		return new Date(this.getFullYear(), this.getMonth() + offset, this.getDate(),
				this.getHours(), this.getMinutes(), this.getSeconds());
	};
	/**
	 *offset为年 添加年数更改时间
	 */
	Date.prototype.addYear = function(offset) {
		return new Date(this.getFullYear() + offset, this.getMonth(), this.getDate(),
				this.getHours(), this.getMinutes(), this.getSeconds());
	};
	/* 定义时间格式 */
	if(!Date.format) {
		Date.format = function(d, format) {
			format = format || 'yyyy-MM-dd';
			var o = {
				"M+" : d.getMonth() + 1, // month
				"d+" : d.getDate(), // day
				"h+" : d.getHours(), // hour
				"m+" : d.getMinutes(), // minute
				"s+" : d.getSeconds(), // second
				"q+" : Math.floor((d.getMonth() + 3) / 3), // quarter
				"S" : d.getMilliseconds() // millisecond
			}
			if(/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for(var k in o) {
				if(new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return format;
		};
	}

	/**
	 * Date.format(formatString)
	 * 当前时间对象格式
	 */
	if(!Date.prototype.format) {
		Date.prototype.format = function(format) {
			return Date.format(this, format);
		};
	}

	if(!Date.formatDate) {
		Date.formatDate = function(obj, pattern) {
			var d = obj;
			if(!Date.isDate(d)) {
				d = new Date(d);
			}
			return d.format(pattern);
		}
	}

	/**
	 * 返回目标元素的下标
	 */
	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj) {
			for (var i = 0; i < this.length; i++) {
				if(this[i] === obj) {
					return i;
				}
			}
			return -1;
		}
	}

	if(!Array.prototype.contains) {
		Array.prototype.contains = function(obj) {
			return this.indexOf(obj) !== -1;
		}
	}

	

	/**/

	//当前页面加载了vee-validate表单校验框架
	var VeeValidate = VeeValidate || false;
	if(VeeValidate) {
		var messages = {
		  alpha_dash: function (field) { return ("The " + field + " field may contain alpha-numeric characters as well as dashes and underscores."); },
		  alpha_num: function (field) { return ("The " + field + " field may only contain alpha-numeric characters."); },
		  alpha_spaces: function (field) { return ("The " + field + " field may only contain alphabetic characters as well as spaces."); },
		  alpha: function (field) { return ("The " + field + " field may only contain alphabetic characters."); },
		  between: function (field, ref) {
			var min = ref[0];
			var max = ref[1];

			return ("The " + field + " field must be between " + min + " and " + max + ".");
		},
		  confirmed: function (field) { return ("The " + field + " confirmation does not match."); },
		  credit_card: function (field) { return ("The " + field + " field is invalid."); },
		  decimal: function (field, ref) {
			if ( ref === void 0 ) ref = ['*'];
			var decimals = ref[0];

			return ("The " + field + " field must be numeric and may contain " + (decimals === '*' ? '' : decimals) + " decimal points.");
		},
		  digits: function (field, ref) {
			var length = ref[0];

			return ("The " + field + " field must be numeric and exactly contain " + length + " digits.");
		},
		  dimensions: function (field, ref) {
			var width = ref[0];
			var height = ref[1];

			return ("The " + field + " field must be " + width + " pixels by " + height + " pixels.");
		},
		  email: function (field) { return (field + " 必须是合法的Email格式."); },
		  ext: function (field) { return ("The " + field + " field must be a valid file."); },
		  image: function (field) { return ("The " + field + " field must be an image."); },
		  in: function (field) { return ("The " + field + " field must be a valid value."); },
		  ip: function (field) { return ("The " + field + " field must be a valid ip address."); },
		  max: function (field, ref) {
			var length = ref[0];

			return ("The " + field + " field may not be greater than " + length + " characters.");
		},
		  max_value: function (field, ref) {
			var max = ref[0];

			return ("The " + field + " field must be " + max + " or less.");
		},
		  mimes: function (field) { return ("The " + field + " field must have a valid file type."); },
		  min: function (field, ref) {
			var length = ref[0];

			return ("The " + field + " field must be at least " + length + " characters.");
		},
		  min_value: function (field, ref) {
			var min = ref[0];

			return ("The " + field + " field must be " + min + " or more.");
		},
		  not_in: function (field) { return ("The " + field + " field must be a valid value."); },
		  numeric: function (field) { return (field + " 必须是整数."); },
		  regex: function (field) { return ("The " + field + " field format is invalid."); },
		  required: function (field) {
			  return (field + ' 是必须的.');
			 },
		  size: function (field, ref) {
			var size = ref[0];

			return ("The " + field + " field must be less than " + size + " KB.");
		},
		  url: function (field) { return ("The " + field + " field is not a valid URL."); }
		};

		VeeValidate.Validator.updateDictionary({
			zh_CN: {
				messages: messages
			}
		});

		Vue.use(VeeValidate, {
			delay: 100,
			locale: 'zh_CN',
			enableAutoClasses: true,
			classNames: {
				touched: 'touched', // the control has been blurred
				untouched: 'untouched', // the control hasn't been blurred
				valid: 'valid', // model is valid
				invalid: 'invalid', // model is invalid
				pristine: 'pristine', // control has not been interacted with
				dirty: 'dirty' // control has been interacted with
			}
		});
	}

	var HC = {
		isString : function(obj) {
			return Object.prototype.toString.call(obj) === "[object String]";
		},
		isDate : function(obj) {
			return Object.prototype.toString.call(obj) === "[object Date]";
		},
		isNumber : function(obj) {
			return Object.prototype.toString.call(obj) === "[object Number]";
		},
		isArray : function(obj) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		},
		isFunction : function(obj) {
			return Object.prototype.toString.call(obj) === "[object Function]";
		},
		isEmpty : function(obj) {
			var b = obj || true;
			return b && (
					(this.isString(obj) && (obj == null || obj.trim() == ''))
						|| (this.isDate(obj) && obj == null)
						|| (this.isNumber(obj) && obj == null)
						|| (this.isArray(obj) && (obj == null || obj.length == 0))
						|| (this.isFunction(obj) && obj == null)
				);
		},
		/**
		 * 截取数字后两位
		 */
		decimalFun : function(obj,num){
			var money = obj.toString().split(".");
			num = num || 2;
			money[1] = money[1] || '';
			var moneynum = num - money[1].length;
			var moneyto = '';
			if(moneynum>0){
				moneyto = money[1].filling("0",num)
			}else{
				moneyto = money[1].substring(0,num)
			}
			return money[0]+"."+ moneyto;
		},
		/**
		 * 截取数字后一位
		 */
		decimalFun01 : function(obj){
			var money = obj.toString().split(".");
			var moneyto = "0"
			if(money[1]==''||money[1]==null){
				moneyto = "0"
			}else{
				moneyto = money[1].substring(0,1)
			}
			return money[0]+"."+ moneyto;
		},
		/**
		 * 银行卡图片
		 */
		imgFun : function(name){
			var bankname = ["工商银行","农业银行","中国银行","建设银行","邮政储蓄银行","中信银行","光大银行","平安银行","交通银行","兴业银行","民生银行","浦发银行","广发银行","华夏银行","招商银行"];
			var banksrc = ["icbc.png","abc.png","boc.png","ccb.png","psbc.png","cncb.png","ceb.png","pab.png","bcm.png","cib.png","cmbc.png","spdb.png","cgb.png","hb.png","cmb.png"];
			var num = bankname.indexOf(name);
			return banksrc[num];
		},
		/**
		 * 格式化缩进json对象
		 *
		 * @param Obj
		 * @param formatChar
		 * @returns {String}
		 */
		formatJson : function(Obj, formatChar) {
			var jsonObj = this.isString(Obj) ? JSON.parse(Obj) : Obj;
			return JSON.stringify(jsonObj, null, formatChar)
		},

		/**
		 * 将多层的json对象展开为单层json对象，主要用于post参数传输(因为jquery不支持多层对象的展开)，name用'.'分隔的方式。例：{x:1,
		 * y:{y1:2, y2:{z:3}}} 将 展开为{"x":1, "y.y1":2, "y.y2.z":3}
		 *
		 * @param data
		 * @returns {}
		 */
		unpackData : function(data) {
			var buf = {};
			var buftwo = this._unpackData(null, data, buf);
			return buftwo;
		},
		_unpackData : function(name, data, buf) {
			if(!V.util.isPlainObject(data)) {
				return data;
			}
			var buf1 = {};
			for(var name1 in data) {
				var value1 = data[name1];
				if(V.util.isPlainObject(value1)) {
					var buf2 = {};
					var unpackPart = this._unpackData(name1, value1, buf2);
//					console.debug(name1 + ':' + this.parseJson(unpackPart));
					for(var name2 in unpackPart) {
						buf[name1 + '.' + name2] = unpackPart[name2];
						buf1[name1 + '.' + name2] = unpackPart[name2];
					}
				} else if(HC.isArray(value1)) {
					for(var i = 0; i < value1.length; i++) {
						var buf2 = {};
						var unpackPart = this._unpackData(name1, value1[i], buf2);
//						console.debug(name1 + ':' + this.parseJson(unpackPart));
						for(var name2 in unpackPart) {
							buf[name1 + '[' + i + '].' + name2] = unpackPart[name2];//buf[name1 + '.' + name2 + '[' + i + ']'] = unpackPart[name2];
							buf1[name1 + '[' + i + '].' + name2] = unpackPart[name2];// buf1[name1 + '.' + name2 + '[' + i + ']'] = unpackPart[name2];
						}
					}
				} else {
					if(this.isEmpty(name)) {
						buf[name1] = value1;
					}
					buf1[name1] = value1;
				}
			}
			return buf1;
		},
		
		setCookie : function(sName, sValue, expireHours, path) {
			var path = path || '/';
			var cookieString = sName + '=' + escape(sValue); 
			if (expireHours>0) {  
				var date = new Date();  
				date.setTime(date.getTime + expireHours * 1000);
				cookieString = cookieString + '; path=' + path + '; expire=' + date.toGMTString();
			}  
			document.cookie = cookieString;  
		},
		
		
		delCookie : function(name) {  
			var exp = new Date();  
			exp.setTime(exp.getTime() - 1);  
			var cval=getCookie(name);  
			if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
		},
		
		getCookie : function(sName) {
			var aCookie = document.cookie.split("; ");
			// alert("aCookie.length***"+aCookie.length);
			for (var j=0; j < aCookie.length; j++){
				var aCrumb = aCookie[j].split("=");
				if (sName == aCrumb[0])
					return aCrumb[1];
			}
			return null;  
		},
		/* 添加sessionstorage*/
		setStorage : function(name,obj){
			var str = JSON.stringify(obj);
			sessionStorage.setItem(name, str)
		},
		/* 获取sessionstorage*/
		getStorage : function(name,obj){
			if(obj==''||obj==null){
				return eval(sessionStorage.getItem(name)) || '';
			}else{
				var cont = JSON.parse(sessionStorage.getItem(name))|| '';
				if (cont !=''){
					return cont[obj]
				}else{
					return;
				}

			}

		},
		 /*删除sessionstorage*/
		delStorage : function(name){
			sessionStorage.removeItem(name)
		},
		/*token失效*/
		failureFun : function(){
			HC.delStorage('sessionToken');
			this.$router.go({path:'/login'})
		},
		/*模块化开发url后参数获取*/
		vueurlFun : function(name){
			var url = document.location.toString();
			var arr = url.split("?") ||'';
			if(arr.length>1){
				var arrUrl = arr[1].split("&");
				var listnum = [];
				arrUrl.forEach(function(item){
					listnum.push(item.split("="))
				})
				var text ='';
				for (var i = 0; i < listnum.length; i++) {
					if(listnum[i][0]==name){
						text = listnum[i][1]				
					}

				}
				return text;　
			}
		},
		getUrlParam : function(key) {
			return this.getUrlParams()[key];
		},


		/*MD5*/  
		MD5 : function(string){
			function RotateLeft(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}

		function AddUnsigned(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}

		function F(x, y, z) {
			return (x & y) | ((~x) & z);
		}
		function G(x, y, z) {
			return (x & z) | (y & (~z));
		}
		function H(x, y, z) {
			return (x ^ y ^ z);
		}
		function I(x, y, z) {
			return (y ^ (x | (~z)));
		}

		function FF(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}
		;

		function GG(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}
		;

		function HH(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}
		;

		function II(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}
		;

		function ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1 = lMessageLength + 8;
			var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
			var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		}
		;

		function WordToHex(lValue) {
			var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
			}
			return WordToHexValue;
		}
		;

		function Utf8Encode(string) {
					string = string.replace(/\r\n/g, "\n");
					var utftext = "";

					for (var n = 0; n < string.length; n++) {

						var c = string.charCodeAt(n);

						if (c < 128) {
							utftext += String.fromCharCode(c);
						} else if ((c > 127) && (c < 2048)) {
							utftext += String.fromCharCode((c >> 6) | 192);
							utftext += String.fromCharCode((c & 63) | 128);
						} else {
							utftext += String.fromCharCode((c >> 12) | 224);
							utftext += String.fromCharCode(((c >> 6) & 63) | 128);
							utftext += String.fromCharCode((c & 63) | 128);
						}

					}

					return utftext;
				}
				;

				var x = Array();
				var k, AA, BB, CC, DD, a, b, c, d;
				var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
				var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
				var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
				var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

				string = Utf8Encode(string);

				x = ConvertToWordArray(string);

				a = 0x67452301;
				b = 0xEFCDAB89;
				c = 0x98BADCFE;
				d = 0x10325476;

				for (k = 0; k < x.length; k += 16) {
					AA = a;
					BB = b;
					CC = c;
					DD = d;
					a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
					d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
					c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
					b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
					a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
					d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
					c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
					b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
					a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
					d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
					c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
					b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
					a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
					d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
					c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
					b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
					a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
					d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
					c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
					b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
					a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
					d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
					c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
					b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
					a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
					d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
					c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
					b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
					a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
					d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
					c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
					b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
					a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
					d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
					c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
					b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
					a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
					d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
					c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
					b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
					a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
					d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
					c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
					b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
					a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
					d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
					c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
					b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
					a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
					d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
					c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
					b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
					a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
					d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
					c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
					b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
					a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
					d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
					c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
					b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
					a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
					d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
					c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
					b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
					a = AddUnsigned(a, AA);
					b = AddUnsigned(b, BB);
					c = AddUnsigned(c, CC);
					d = AddUnsigned(d, DD);
				}
				var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
				return temp.toLowerCase();
			}
		};

	HC.param = {
		encodeUrl : function(s) {
			return encodeURIComponent(s).replace(/'/g,"%27").replace(/"/g,"%22");
		},

		/**
		 * _unparam(str[ ,sep=’&’,eq=’=’ ]) 将参数字符串 str 还原为对象.
		 * Parameters: o (object) – 参数字符串 seq (string) – 参数间分隔符, 默认 & eq
		 * (string) – 参数与参数值间的分割符, 默认 =
		 * Returns:参数的对象表示 Return type:Object
		 */
		_unparam : function(str, sep) {
			if (typeof str !== 'string' || (str.trim().length === 0))
				return {};
			var ret = {}, pairs = str.split(sep || '&'), pair, key, val, m, i = 0, len = pairs.length;
			for (; i < len; i++) {
				pair = pairs[i].split('=');
				key = decodeURIComponent(pair[0]);
				// pair[1] 可能包含gbk编码中文, 而decodeURIComponent 仅能处理utf-8 编码中文
				try {
					val = decode(pair[1]);
				} catch (e) {
					val = pair[1] || '';
				}
				if ((m = key.match(/^(\w+)\[\]$/)) && m[1]) {
					ret[m[1]] = ret[m[1]] || [];
					ret[m[1]].push(val);
				} else {
					ret[key] = val;
				}
			}
			return ret;
		},

		/**
		 * 获取url参数返回JSON对象
		 *
		 * @returns
		 */
		getUrlParams : function() {
			var queryStr = decodeURI(decodeURI(location.search.substring(1)));
			return this._unparam(queryStr);
		},

		/**
		 * 根据KEY获取对应的参数
		 *
		 * @param key
		 * @returns
		 */
		getUrlParam : function(key) {
			return this.getUrlParams()[key];
		},

		/**
		 * 获取urlPath
		 *
		 * @param idx
		 * @returns
		 */
		getUrlPath : function(idx) {
			var path = location.pathname.split("/");
			return path[idx];
		},

		/**
		 * 封装简单对象（没有关联、没有数组）为URL参数
		 * @author Lwp
		 * @date 2015年6月26日
		 * @time 下午3:06:10
		 * @version 1.0
		 * @since 1.0
		 * @return
		 */
		paramSimple : function(data) {
			var params = "";
			for(var property in data) {
				params = params+"&"+property+"="+data[property].toString().replace(/(^\s*)|(\s*$)/g, "");
			}
			return params.substring(1);
		}
	};
	/* UI组件 */
	HC.ui = {
		notify : function(config) {
			config.type = config.type || 'info';
			if(config.type === 'error') {
				config.code = config.code || 'UNKNOWN';
				config.msg = config.msg + '， 错误码:' + config.code;
			}
			Vue.$toast({
				message: config.msg,
				position: config.position || 'bottom',
				duration: config.duration || 1500
			})
		}
	},
	
	HC.ajax = {
		/**
		 * AJAX请求通用方法
		 * @author yangylsky
		 * @param config {Object} ajax配置，格式：
			<code>
				{
					type : "post",
					async : false,
					url : url,
					dataType : "json",
					data : data,
					cache : false,
					success : function() {},
					error : function() {},
					pre : function() {}, //预置函数，ajax之前执行
					before : function() {}, //前置函数，success执行之前执行
					after : function() {}, //后置函数，success执行完以后执行
				}
			</code>
		 */
		ajax : function(config) {
			if(HC.isFunction(config.pre)) {//执行预置函数
				try {
					config.pre.call(this);
				} catch(e) {
					console.error(e);
				}
			}
			/*$.ajax({
				type : config.type || "post",//post方式优先
				async : config.async === false ? false : true, //异步优先
				cache : config.cache === false ? false : true, //缓存优先
				dataType : config.dataType || "json", //json格式优先
				url : config.url,
				data : config.data,
				success : function(data) {
					var _self = this;
					data.code = data.code || 'UNKNOWN';
					var success = data.code === 'SUCCESS';
					var showNotify = !success || (config.showNotify || false);
					if(showNotify) {
						if(success) {
							HC.ui.notify({msg: data.msg});
						} else {
							HC.ui.notify({msg: data.msg, code: data.code, type: 'error'});
						}
					}
					if(HC.isFunction(config.before)) {
						try {
							config.before.call(_self, data);
						} catch(e) {
							console.error(e);
						}
					}
					if(HC.isFunction(config.success)) {
						try {
							config.success.call(_self, data);
						} catch(e) {
							console.error(e);
						}
					}
					if(HC.isFunction(config.after)) {
						try {
							config.after.call(_self, data);
						} catch(e) {
							console.error(e);
						}
					}
				},
				error : function(request, code, thrown) {
					var _self = this;
					if(HC.isFunction(config.error)) {
						try {
							config.error.call(_self, request, code, thrown);
						} catch(e) {
							console.error(e);
						}
					} else {
						//ajax._ajaxError(request, code, thrown);
					}
				}
			});*/


			axios({
				method : config.method || "post",//post方式优先
				async : config.async === false ? false : true, //异步优先
				cache : config.cache === false ? false : true, //缓存优先
				dataType : config.dataType || "json", //json格式优先
				url : config.url,
				data : config.data,
				
				transformRequest: [function (data) {
					var datat = HC.unpackData(data)
					var ret = ''
					for (var it in datat) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(datat[it]) + '&'
					}
					return ret
				  }]
				}).then(function(res){
					var _self = this;
					res.data.code = res.data.code || 'UNKNOWN';
					//console.log(res.data.code);
					var success = res.data.code === 'SUCCESS';
					var showNotify = !success || (config.showNotify || false);
					if(showNotify) {
						if(success) {
							HC.ui.notify({msg: res.msg});
						} else {
							//HC.ui.notify({msg: res.msg, code: res.data.code, type: 'error'});
						}
					}
					if(HC.isFunction(config.before)) {
						try {
							config.before.call(_self, res.data);
						} catch(e) {
							console.error(e);
						}
					}
					if(HC.isFunction(config.success)) {
						try {
							config.success.call(_self, res.data);
						} catch(e) {
							console.error(e);
						}
					}
					if(HC.isFunction(config.after)) {
						try {
							config.after.call(_self, res.data);
						} catch(e) {
							console.error(e);
						}
					}
				}).catch(function(request, code, thrown){
					var _self = this;
					if(HC.isFunction(config.error)) {
						try {
							config.error.call(_self, request, code, thrown);
						} catch(e) {
							console.error(e);
						}
					} else {
						HC.ajax._ajaxError(request, code, thrown);
					}
				});

		},

		/**
		 * AJAX请求出错处理（404、500、504）
		 * @author yangylsky
		 * @param request 请求信息
		 * @param status 状态码
		 * @param thrown 错误提示
		 */
		_ajaxError : function(request, code, thrown) {
			HC.ui.notify({msg: '执行操作错误!', code: code});
		},

		/**
		 * AJAX查询 - 返回单个对象JSON
		 * @author yangylsky
		 * @param config {Object} ajax配置，格式：
			<code>
				{
					url {String} URL地址
			 		success {Function} 成功后处理函数，参数为对象JSON
			 	}
			</code>
		 */
		ajaxOne : function(config) {
			var _self = this;
			// config.data优先，config.id次之
			if(config.data == null) {
				config.data = {id : config.id};
			}
			var beforeFun = config.before;
			config.before = function(data) {
				if(HC.isFunction(beforeFun)) {
					beforeFun.call(_self, data.result || data);
				}
			};
			var successFun = config.success;
			config.success = function(data) {
				if(HC.isFunction(successFun)) {
					successFun.call(_self, data.result || data);
				}
			};
			var afterFun = config.after;
			config.after = function(data) {
				if(HC.isFunction(afterFun)) {
					afterFun.call(_self, data.result || data);
				}
			};
			this.ajax(config);
		},


		/**
		 * AJAX查询 - 返回对象JSON数组
		 * @author yangylsky
		 * @param config {Object} ajax配置，格式：
			<code>
				{
					url {String} URL地址
			 		success {Function} 成功后处理函数，参数为对象JSON数组
			 	}
			</code>
		 */
		ajaxList : function(config) {
			var _self = this;
			config.cache = config.async === true ? true : false;//不缓存优先
			var beforeFun = config.before;
			config.before = function(data) {
				if(HC.isFunction(beforeFun)) {
					beforeFun.call(_self, data.result || data);
				}
			};
			var successFun = config.success;
			config.success = function(data) {
				if(HC.isFunction(successFun)) {
					successFun.call(_self, data.result || data);
				}
			};
			var afterFun = config.after;
			config.after = function(data) {
				if(HC.isFunction(afterFun)) {
					afterFun.call(_self, data.result || data);
				}
			};
			this.ajax(config);
		},

		/**
		 * AJAX查询 - 返回分页JSON数组
		 * @author yangylsky
		 * @param config {Object} ajax配置，格式：
			<code>
				{
					url {String} URL地址
			 		success {Function} 成功后处理函数，参数为分页JSON数组
			 	}
			</code>
		 */
		ajaxPage : function(config) {
			var _self = this;
			config.cache = config.async === true ? true : false;//不缓存优先
			var beforeFun = config.before;
			config.before = function(data) {
				if(HC.isFunction(beforeFun)) {
					beforeFun.call(_self, _self._convertToPage(data));
				}
			};
			var successFun = config.success;
			config.success = function(data) {
				if(HC.isFunction(successFun)) {
					successFun.call(_self, _self._convertToPage(data));
				}
			};
			var afterFun = config.after;
			config.after = function(data) {
				if(HC.isFunction(afterFun)) {
					afterFun.call(_self, _self._convertToPage(data));
				}
			};
			this.ajax(config);
		},

		_convertToPage : function(data) {
			return {
				code: data.code,
				count: data.count,
				offset: data.offset,
				limit: data.limit,
				pageNo : data.pageNo,
				result : data.result
			};
		}
	};

	/**
	 * 当前用户上下文
	 */
	HC.userContext = {
		isLogin : false,
		app_token : '',
		
		checkLoginStatus : function() {
			this.app_token = HC.param.getUrlParam('app_token') || HC.param.getUrlParam('token') || '';
			this.isLogin = !HC.isEmpty(this.app_token);
		},

		checkUrlNeedLogin : function(url) {
			return this.isLogin ? url : '/h5/login.jsp';
		}
	};

	HC.API_CONFIG = {
		mock : true,
		domain : function(isMock) {
			var isMock = isMock || false;
			var domainUrl = '/api';
//			if(sessionStorage.getItem('api_mode_debug') === 'true') {
//				domainUrl = 'http://localapi.88huicai.com/api';
//			} else if (sessionStorage.getItem('api_mode_test') === 'true') {
//				domainUrl = 'https://testapi.88huicai.com/api';
//			}
			if(isMock) {
				domainUrl += '/api_mock_json';
			}
			return domainUrl;
		}
	};
		
	
	W.HC = HC;
})(window);