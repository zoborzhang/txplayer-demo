/*! TenVideoPlayer_V3 - v3.0.0 
* Update Sat May 14 2016 10:19:16 GMT+0800 (CST)
* Copyright (c) 2016
* Powered by Tencent-Video Web Front End Team
*/
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(1);
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var globalMsg = Txplayer.msg;
	
		var htmlstr = __webpack_require__(2);
		var Emoji = __webpack_require__(3);
		var barrageUtil = __webpack_require__(6);
		var barrageEmojiMap = __webpack_require__(7);
		var lsSwitchName = 'tvp-user-barrageswitch';
	
		function Barrage(context) {
			this.msg = new Txplayer.Events();
			this.dataset = {};
			this.context = context;
			this.init();
		}
	
		Barrage.prototype = {
			init: function() {
				var that = this;
	
				// h5播放器需要做一些处理
				// 记录当前播放器是否是flash播放器
				that.dataset._playerType = that.context.msg.run(api.publicApi.getPlayerType);
				that.dataset._isFlash = that.dataset._playerType == "flash";
				!that.dataset._isFlash && that.initH5Player();
	
				// 弹幕是否开启回调事件
				that.context.msg.on(api.eventApi.onBulletReady, function(data) {
					// 用户是否开启弹幕，服务端是否开启弹幕
					if (that.context.msg.run(api.privateApi.isUserOpenBullet) && data && data.returncode === 0 && data.registid) {
						that.showBarrage(data);
					} else {
						that.hideBarrage();
					}
				});
				// 用户是否开启弹幕
				if (that.context.msg.run(api.privateApi.isUserOpenBullet)) {
					// 服务端是否开启弹幕
					var isServerOpenBullet = that.context.msg.run(api.privateApi.isServerOpenBullet);
					isServerOpenBullet && that.showBarrage(isServerOpenBullet);
				}
			},
			showBarrage: function(data) {
				this.dataset.registid = data.registid;
				this.dataset.bulletkey = data.bulletkey;
				if (this.dataset.isRender) {
					this.dataset.$mod.show();
				} else {
					this.write();
					this.addEventListerner();
					this.dataset.isRender = true;
				}
				// 是否显示弹幕输入框
				this.isShowInput();
			},
			hideBarrage: function() {
				if (this.dataset.isRender) {
					this.dataset.$mod.hide();
				}
			},
			write: function() {
				var globalConfig = this.context.pluginConfig.globalConfig || {};
				globalConfig.useDefaultCss && this.loadBarrageCss();
				// 弹幕容器
				this.dataset.$mod = globalConfig.mod ?
					($.type(globalConfig.mod) == 'string' ? $('#' + globalConfig.mod) : $(globalConfig.mod)) : $('#mod_barrage_container');
				var htmldata = globalConfig.html ? ($.isFunction(globalConfig.html) ? globalConfig.html() : globalConfig.html) : $.tmpl(htmlstr);
	
				// 渲染
				this.dataset.$mod.html(htmldata);
	
				this.dataset.$input = this.dataset.$mod.find("[data-role='input']");
				this.dataset.$submit = this.dataset.$mod.find("[data-role='submit']");
	
				// 设置样式上切换的参数，可以由用户自定义
				this.dataset.openClass = globalConfig.openClass || 'txp_open';
				this.dataset.disableClass = globalConfig.disableClass || 'txp_disabled';
				this.dataset.focusClass = globalConfig.focusClass || 'txp_focus';
				this.dataset.hideHotBulletClass = globalConfig.hideHotBulletClass || 'txp_barrage_form_nohotbtn';
	
				// 字数限制
				this.dataset.strLength = +this.dataset.$input.attr('maxlength') || 25;
				// 创建高级表情实例
				this.dataset.emoji = new Emoji(this.context.msg.run(api.publicApi.getPlayerId),
					this.context.msg.run(api.publicApi.getVid), this.msg, this.dataset.$mod.find("[data-role='form']"));
	
				// 登录问题的处理
				this.toggleLoginStatus(this.getLoginStatus());
				// 弹幕数量
				this.updateBulletNumber();
				// 发表按钮状态
				this.updateSubmitStatus();
				// 弹幕开关状态
				this.updateSwitchStatus();
				// 根据配置判断是否隐藏热门弹幕
				globalConfig.hideHotBullet && this.hideHotBullet();
			},
			loadBarrageCss: function() {
				util.loadCss("http://vm.gtimg.cn/tencentvideo/vstyle/player/style/txp_barrage.css");
			},
			addEventListerner: function() {
				var that = this;
				that.dataset.$mod
					.on("click", "[data-role='toggle']", function() {
						var $this = $(this);
						that.context.msg.broadcast(api.publicApi.bulletSwitch, !$this.hasClass(that.dataset.openClass));
						// $this.toggleClass(that.dataset.openClass);
						// 上报
						that.report('barrage-toggle');
					})
					.on("click", "[data-role='face']", function() {
						that.dataset.isLogin && that.dataset.emoji.toggle();
						// 上报
						that.report('barrage-emoji');
					})
					.on("click", "[data-role='list']", function() {
						that.context.userMsg.broadcast(api.eventApi.onToggleHotBarrage, {
							targetid: that.dataset.registid
						});
						// 上报
						that.report('barrage-hotlist');
					})
					.on("click", "[data-role='login'] a", function() {
						that.context.userMsg.broadcast(api.eventApi.onShowLogin);
						// 上报
						that.report('barrage-login');
					});
	
				// 输入框的事件
				that.dataset.$input
					.on('focus', function() {
						that.dataset.$mod.find("[data-role='main']").addClass(that.dataset.focusClass);
					})
					.on('blur', function() {
						that.dataset.$mod.find("[data-role='main']").removeClass(that.dataset.focusClass);
					})
					.on('keypress', function(e) {
						if (e.which == 13) {
							that.submitBarrage();
						}
					});
	
				// 发表按钮事件
				that.dataset.$submit.on('click', function() {
					that.submitBarrage();
					// 上报
					that.report('barrage-submit');
				});
	
				// 高级表情的输入
				that.msg.on('txv_barrage_input', function(data) {
					that.insertText(data.content);
				});
	
				// 上报
				that.msg.on('txv_barrage_report', function(data) {
					that.report(data);
				});
	
				// 登录或者退出登录
				globalMsg.on(api.eventApi.onAfterLogin, function() {
					that.dataset.emoji.removeEmojiContent();
					that.toggleLoginStatus(true);
				});
				globalMsg.on(api.eventApi.onAfterLogout, function() {
					that.dataset.emoji.removeEmojiContent();
					that.toggleLoginStatus(false);
				});
	
				// 视频切换
				that.context.msg.on(api.eventApi.onVidChange, function() {
					that.dataset.emoji.removeEmojiContent();
				});
			},
			insertText: function(val) {
				var that = this;
				that.dataset.$input[0].focus();
	
				var originalVal = that.dataset.$input.val();
				var originalValLength = originalVal.length;
				var valLength = val.length;
				var len = that.dataset.strLength;
	
				originalValLength + valLength > len && (val = val.substring(0, len - originalValLength));
				barrageUtil.insertText(that.dataset.$input[0], val);
			},
			initToggleBtn: function(userswitch) { // 设置用户是否开启弹幕
				this.dataset.$mod.find("[data-role='toggle']")[userswitch ? 'addClass' : 'removeClass'](this.dataset.openClass);
			},
			toggleSubmitStatus: function(status) { // 切换发表按钮的可用状态
				this.dataset.$submit[status ? 'removeClass' : 'addClass'](this.dataset.disableClass);
			},
			submitBarrage: function() {
				if (this.dataset.$submit.hasClass(this.dataset.disableClass) || !this.dataset.isLogin) {
					return;
				}
				var content = this.dataset.$input.val();
				if (!content) { // 为空不能发表
					return;
				}
				var spids = [];
				content = content.replace(/\[.+?\]/g, function(string) {
					var source = barrageEmojiMap.fromTargetToSource(string.replace(/[\[\]]/g, ''));
					if (source) {
						spids.push(source.eid);
						return '[' + source.value + ']';
					} else {
						return string;
					}
				});
				// targetid	  评论ID
				// content	 评论内容
				// timepoint  发表时间点，点播使用
				// platform	  web侧填2即可
				// liveid	视频ID
				// keytype	 0直播，1vid，2cid，3lid，4频道id，5v+账号
				// video_tag	如果是直播，则填“zhibo”，否则空
				// areaid	春晚聊天室的地域ID
				// picture	 图片URL
				// picture_width	图片宽
				// picture_height	图片高
				// picture_id	春晚聊天室的图片ID
				// spid    使用表情包id串（即pid串），以"|"分隔
				// danmukey  弹幕注册时后台下发，发表时带上
				// g_tk	QQ登录时的CSRF校验token，计算时使用skey（也可能是lskey）
				// g_wxtk	微信登录时的CSRF校验token，计算时使用vusession
				var data = {
					targetid: this.dataset.registid,
					content: content,
					platform: 2,
					liveid: this.context.msg.run(api.publicApi.getVid),
					danmukey: this.dataset.bulletkey,
					spid: spids.join('|'),
					g_wxtk: util.getWXToken(),
					g_tk: util.getToken()
				};
				var videoType = this.context.msg.run(api.publicApi.getVideoType);
				if (videoType == 'vod') {
					data.timepoint = this.context.msg.run(api.publicApi.getCurrentTime);
					data.video_tag = "";
					data.keytype = 1;
				} else {
					data.video_tag = "zhibo";
					data.keytype = 0;
				}
	
				this.context.msg.broadcast(api.publicApi.postBullet, data);
				this.dataset.$input.val('');
				// 发表后倒计时
				this.countDown();
			},
			countDown: function() { // 发表后倒计时
				var that = this;
				var time = 5
				that.toggleSubmitStatus(false);
	
				var down = function() {
					if (time > 0) {
						that.dataset.$submit.text("发表(" + time + ")");
						time--;
						setTimeout(function() {
							down();
						}, 1000);
					} else {
						that.dataset.$submit.text("发表");
						that.toggleSubmitStatus(true);
					}
				};
				down();
			},
			formatCount: function(str) {
				var tail = [];
				while (str >= 100000000) {
					str = (str / 100000000).toFixed(1);
					tail.unshift('亿');
				}
				while (str >= 10000) {
					str = (str / 10000).toFixed(1);
					tail.unshift('万');
				}
	
				if (str >= 1000) {
					str = Math.round(str);
				}
				return ('' + str).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + tail.join('');
			},
			updateHotBarrage: function(count) { // 显示热门弹幕数量
				count = this.formatCount(count);
				this.dataset.$mod.find("[data-role='count']").text("(" + count + ")");
			},
			isShowInput: function() { // 是否显示弹幕输入框
				var isShow = this.context.msg.run(api.privateApi.isShowBulletInput);
				this.dataset.$mod.find("[data-role='form']")[isShow ? "show" : "hide"]();
			},
			toggleLoginStatus: function(isLogin) {
				this.dataset.isLogin = isLogin;
				this.dataset.$mod.find("[data-role='login']")[isLogin ? 'hide' : 'show']();
				this.toggleSubmitStatus(isLogin);
			},
			updateBulletNumber: function() {
				var that = this;
				// 弹幕点赞数更新事件
				that.context.msg.on(api.eventApi.onBulletLikeNumberUpdate, function(data) {
					data && that.updateHotBarrage(data.num || 0);
				});
				var bulletNumber = that.context.msg.run(api.privateApi.getBulletLikeNumber);
				bulletNumber && that.updateHotBarrage(bulletNumber || 0);
			},
			updateSubmitStatus: function() {
				var that = this;
				// 播放状态改变事件
				that.context.msg.on(api.eventApi.onPlayStateChange, function(data) {
					if (data) {
						var state = data.state;
						// 1 播放中 2 暂停 3 缓冲中
						// 发表按钮可用
						that.toggleSubmitStatus(state == 1 || state == 2 || state == 3);
					}
				});
				// 根据播放状态决定发表按钮能不能使用
				var playerState = that.context.msg.run(api.publicApi.getPlayerState);
				that.toggleSubmitStatus(playerState == 1 || playerState == 2 || playerState == 3);
			},
			updateSwitchStatus: function() {
				var that = this;
				// 弹幕开关切换事件
				that.context.msg.on(api.eventApi.onFlashBulletSwitchStatusChange, function(data) {
					that.initToggleBtn(data);
				});
				// 处理弹幕开关
				var switchStatus = that.context.msg.run(api.privateApi.getFlashBulletSwitchStatus);
				if (typeof switchStatus !== 'undefined') {
					that.initToggleBtn(switchStatus);
				}
			},
			hideHotBullet: function() {
				this.dataset.$mod.find("[data-role='list']").hide();
				this.dataset.$mod.find("[data-role='form']").addClass(this.dataset.hideHotBulletClass);
			},
			initH5Player: function() {
				var that = this;
				that.h5PlayerRegist();
				// 视频切换
				that.context.msg.on(api.eventApi.onVidChange, function() {
					that.h5PlayerRegist();
				});
				// 用户是否开启弹幕
				that.context.msg.on(api.privateApi.isUserOpenBullet, function(data, options) {
					options.data = that.context.config.showBullet;
				});
				// 服务端是否开启弹幕
				that.context.msg.on(api.privateApi.isServerOpenBullet, function(data, options) {
					options.data = that.dataset.serverShowBullet;
				});
				// 是否显示弹幕输入框
				that.context.msg.on(api.privateApi.isShowBulletInput, function(data, options) {
					options.data = that.context.config.showBulletInput;
				});
				// 弹幕开关
				that.context.msg.on(api.publicApi.bulletSwitch, function(data, options) {
					that.dataset.isLogin && barrageUtil.userswitch(data);
					that.context.msg.broadcast(api.eventApi.onFlashBulletSwitchStatusChange, data);
					// 记录用户的开关操作 1是开 2是关
					window.localStorage && (window.localStorage[lsSwitchName] = data ? '1' : '2');
				});
				// 弹幕发表
				that.context.msg.on(api.publicApi.postBullet, function(data, options) {
					barrageUtil.barragePost(data);
				});
				// 弹幕开关状态
				that.context.msg.on(api.privateApi.getFlashBulletSwitchStatus, function(data, options) {
					options.data = that.dataset.userswitchStatus;
				});
			},
			h5PlayerRegist: function() { // 注册弹幕
				var that = this;
				barrageUtil.barrageRegist(that.context.msg.run(api.publicApi.getVid)).then(function(result) {
					var userswitch;
					// 1. 后台是否返回用户开关切换状态，有则直接用后台返回的
					// 2. 如果后台没有返回，则判断用户是否主动关闭过弹幕，是则不开启弹幕
					// 3. 如果用户没有主动关闭过弹幕，则使用外部传进来的config“是否默认开启弹幕”
					if (typeof result.userstatus === 'undefined') {
						if (window.localStorage && window.localStorage[lsSwitchName] &&
							window.localStorage[lsSwitchName] == 2) {
							userswitch = false;
						} else {
							userswitch = !!that.context.msg.run(api.privateApi.isBulletOpenDefault);
						}
					} else {
						userswitch = !!result.userstatus;
					}
					var data = {
						returncode: 0,
						registid: result.targetid,
						bulletkey: result.danmukey
					};
					that.dataset.serverShowBullet = data;
					that.context.msg.broadcast(api.eventApi.onBulletReady, data);
					that.dataset.userswitchStatus = userswitch;
					that.context.msg.broadcast(api.eventApi.onFlashBulletSwitchStatusChange, userswitch);
				});
			},
			getLoginStatus: function() { // 是否登录
				var isLogin = false;
				if (this.context.config && this.context.config.loginHandler && $.type(this.context.config.loginHandler.isLogin) === 'function') {
					isLogin = this.context.config.loginHandler.isLogin();
				}
				return isLogin;
			},
			report: function(reportType) {
				this.context.msg.broadcast(api.privateApi.reportUsrAction, {
					usr_action: reportType
				});
			}
		};
	
		Txplayer.register('Barrage', Barrage);
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"txp_mod_barrage\" data-role=\"main\">\n\t<div class=\"txp_barrage_switch\">\n\t\t<div class=\"txp_btn_text\">弹幕</div>\n\t\t<div class=\"txp_btn_toggle\" data-role=\"toggle\"><i class=\"txp_btn_inner\"></i></div>\n\t</div>\n\t<div class=\"txp_barrage_form\" data-role=\"form\">\n\t\t<div class=\"txp_barrage_inp\">\n\t\t\t<input type=\"text\" class=\"txp_inp_text\" data-role=\"input\" maxlength=\"25\">\n\t\t\t<div class=\"txp_barrage_login\" data-role=\"login\">\n\t\t\t\t<a href=\"javascript:void(0);\">登录</a>后可以参与弹幕\n\t\t\t</div>\n\t\t</div>\n\t\t<a href=\"javascript:void(0);\" data-role=\"face\" class=\"txp_iconfont txp_icon_face\">&#xe61b;</a>\n\t\t<button type=\"submit\" class=\"txp_btn_submit\" data-role=\"submit\">发表</button>\n\t</div>\n\t<a href=\"javascript:void(0);\" class=\"txp_btn_barrage_list\" data-role=\"list\">\n\t\t<span class=\"txp_icon_text\">弹幕</span><span class=\"txp_hl\" data-role=\"count\"></span><i class=\"txp_iconfont txp_icon_right\">&#xe606;</i>\n\t</a>\n</div>";
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
	
		var tplEmojiComtainer = __webpack_require__(4);
		var tplEmojiDetail = __webpack_require__(5);
		var util = Txplayer.util;
		var barrageUtil = __webpack_require__(6);
		var barrageEmojiMap = __webpack_require__(7);
	
		// 分页的size
		var EMOJI_PAGE_SIZE = 7;
		// 每一行显示的表情数量
		var EMOJI_ROW_COUNT = 5;
	
		function Emoji(id, vid, msg, $container) {
	
			this.container = "x_mod_emoji_" + id;
			this.detailPre = "emoji_detail_" + id + "_";
			this.emojiBd = "x_emoji_bd_" + id;
	
			// 容器ID
			this.emojiContainerId = "#" + this.container;
			// detail的前缀
			this.EMOJI_DETAIL_PRE = "#" + this.detailPre;
			// bd
			this.EMOJI_BD = "#" + this.emojiBd;
			// 当前页码
			this.emojiCurrentPage = 0;
			// 存放表情相关的数据
			this.expressionData = null;
			// 表情面板是否正在显示
			this.isEmojiTableShow = false;
	
			this.currentVid = vid;
			this.message = msg;
			this.$container = $container;
		}
	
	
		/**
		 * 拉取视频下面的表情预览信息接口
		 * @author robbinlei
		 * @date   2015-10-09
		 * @param  {string}   videoId 点播时传vid，直播时传pid
		 */
		Emoji.prototype.getExpressionList = function(videoId, videoType) {
			var defer = $.Deferred();
			var data = {
				otype: "json"
			};
			if (videoType == 1) {
				data.pid = videoId;
			} else {
				data.vid = videoId;
			}
			data.g_tk = util.getToken();
			$.ajax({
				url: "http://bullet.video.qq.com/fcgi-bin/expression/get_expression_list",
				data: data,
				dataType: "jsonp"
			}).done(function(json) {
				if (json && json.code === 0 && json.expression && json.expression.length > 0) {
					defer.resolve(json);
				} else {
					defer.reject(json);
				}
			}).fail(function(json) {
				defer.reject(json);
			});
	
			return defer;
		};
	
		/**
		 * 拉取表情详情
		 * @author robbinlei
		 * @date   2015-10-09
		 * @param  {string}   expression_id 表情包id
		 */
		Emoji.prototype.getExpression = function(expression_id, videoId, videoType) {
			var defer = $.Deferred();
			var data = {
				expression_id: expression_id,
				video_id: videoId,
				video_id_type: videoType,
				platform: 2,
				otype: "json"
			};
			data.g_tk = util.getToken();
			$.ajax({
				url: "http://bullet.video.qq.com/fcgi-bin/expression/get_expression",
				data: data,
				dataType: "jsonp"
			}).done(function(json) {
				if (json && json.code === 0) {
					defer.resolve(json);
				} else {
					defer.reject(json);
				}
			}).fail(function(json) {
				defer.reject(json);
			});
	
			return defer;
		};
	
		// 模板辅助方法
		Emoji.prototype.helpers = {
			/**
			 * 高级表情 根据id拼图片url
			 * @param  {[type]}   id 表情id
			 * @return {[type]}      [description]
			 */
			emojiPic: function(id) {
				return "http://puui.qpic.cn/virtual_item_ns/0/" + id + ".png/0";
			},
			/**
			 * 高级表情 计算到期时间
			 * @param  {[type]}   et 到期时间
			 * @return {[type]}      [description]
			 */
			emojiExpDate: function(et) {
				// 这里给的et时间是秒
				var gap = new Date(et * 1000) - new Date();
				if (gap > 0) {
					var day = gap / 1000 / 60 / 60 / 24;
					if (day > 30) {
						return Math.floor(day / 30) + "个月";
					} else {
						return Math.ceil(day) + "天";
					}
				} else {
					return "已到期";
				}
			}
		};
	
		// 加载高级表情css
		Emoji.prototype.loadEmojiCss = function() {
			!this.expressionData && util.loadCss("http://vm.gtimg.cn/tencentvideo/vstyle/web/common/style/x_emoji.css");
		};
	
		Emoji.prototype.hideEmojiContainer = function() {
			$(this.emojiContainerId).hide();
			this.isEmojiTableShow = false;
		};
	
		Emoji.prototype.removeEmojiContent = function() {
			$(this.emojiContainerId).remove();
			this.emojiCurrentPage = 0;
			this.expressionData = null;
			this.isEmojiTableShow = false;
		};
	
		Emoji.prototype.showEmojiContainer = function() {
			var that = this;
			// 加载css
			that.loadEmojiCss();
			if (!that.expressionData) {
				that.getExpressionList(that.currentVid, 2).then(function(json) {
					// 避免多次请求重复添加
					if (!that.expressionData) {
						// 把拉取的数据缓存起来
						that.expressionData = {};
						$.each(json.expression, function(index, item) {
							that.expressionData[item.id] = item;
						});
						// 渲染模板
						var htmldata = $.tmpl(tplEmojiComtainer, {
							"expression": json.expression,
							"emojiPageSize": EMOJI_PAGE_SIZE,
							"container": that.container,
							"emojiBd": that.emojiBd
						});
						that.$container.append(htmldata);
						// 绑定按钮
						that.bindEmojiEvent(json.expression.length);
						// 处理鼠标滚动冒泡
						barrageUtil.stopScrollPropagation('.x_emoji_table');
						// 触发第一个tab
						$(that.emojiContainerId + " .x_tab:eq(0)").trigger("click");
						// 重置当前分页为1
						that.emojiCurrentPage = 0;
					} else {
						// 显示面板
						$(that.emojiContainerId).show();
					}
					that.isEmojiTableShow = true;
				});
			} else {
				// 显示面板
				$(that.emojiContainerId).show();
				that.isEmojiTableShow = true;
			}
		};
	
		Emoji.prototype.showEmojiDetail = function(emoji_id) {
			var that = this;
			if (!(that.expressionData && that.expressionData[emoji_id] && that.expressionData[emoji_id]['__detail'])) {
				that.getExpression(emoji_id, that.currentVid, 2).then(function(json) {
					// 避免多次请求重复添加
					if (!(that.expressionData && that.expressionData[emoji_id] && that.expressionData[emoji_id]['__detail'])) {
						var $emojibd = $(that.EMOJI_BD);
						$emojibd.children().addClass("x_none");
						// 处理下json.list的长度，保证是EMOJI_ROW_COUNT的倍数，模板展示的时候需要是EMOJI_ROW_COUNT的倍数
						var length = json.list.length;
						var targetLength = Math.ceil(length / EMOJI_ROW_COUNT) * EMOJI_ROW_COUNT;
						if (targetLength != length) {
							json.list[targetLength - 1] = {};
						}
						$.extend(json, {
							"emojiRowCount": EMOJI_ROW_COUNT
						});
						json.__tplType = (json.isvip != 1 && (json.payn === 0 || json.own == 1)) ? 1 : 2;
						that.expressionData[emoji_id]['__detail'] = json;
						// 优先判断isvip，如果isvip为1，那表情就是可用的，
						// 如果isvip不为1，先判断表情是否是会员表情（payn>0）
						// 是的话，判断这个非会员是否购买过这个表情（own==1），购买过的话，表情可用，显示到期时间（et）
						var htmldata = $.tmpl(tplEmojiDetail, $.extend({}, json, {
							_: that.helpers,
							detailPre: that.detailPre
						}));
						$emojibd.append(htmldata);
					} else {
						$(that.EMOJI_DETAIL_PRE + emoji_id).removeClass("x_none").siblings().addClass("x_none");
					}
				});
			} else {
				$(that.EMOJI_DETAIL_PRE + emoji_id).removeClass("x_none").siblings().addClass("x_none");
			}
		};
	
		// 绑定事件
		Emoji.prototype.bindEmojiEvent = function(length) {
			var that = this;
			// 防止多次绑定
			$(that.emojiContainerId)
				.off("click", ".x_tab")
				.off("click", "._x_emoji_pic")
				.off("click", "._x_emoji_purchase")
				.off("click", ".x_page_prev,.x_page_next")
				.off("click", "[data-hot]")
				.show()
				.on("click", ".x_tab", function() { // tab点击处理
					var $this = $(this);
					// 切换tab的激活状态
					$this.addClass("x_current").siblings().removeClass("x_current");
					// 加载表情包详情
					that.showEmojiDetail($this.attr("data-eid"));
				})
				.on("click", "._x_emoji_pic", function() { // 表情点击处理，未购买的拉起购买浮层
					var $this = $(this);
					var eid = $this.attr("data-eid");
					if (that.expressionData[eid]['__detail'].isvip == 1 || that.expressionData[eid]['__detail'].payn === 0 ||
						that.expressionData[eid]['__detail'].own == 1) {
						// 发送表情
						that.message.emit("txv_barrage_input", {
							content: "[" + barrageEmojiMap.fromSourceToTarget($this.attr("data-did")) + "]"
						});
						// 关闭浮层
						that.hideEmojiContainer();
					} else {
						that.openMiniPay();
					}
				})
				.on("click", "._x_emoji_purchase", function() { // 购买按钮点击处理
					that.openMiniPay();
				})
				.on("click", ".x_page_prev,.x_page_next", function() { // 翻页
					var $this = $(this);
					if ($this.hasClass("x_gery")) {
						return;
					}
					if ($this.hasClass("x_page_prev")) { // 上一页
						that.emojiCurrentPage = that.emojiCurrentPage - EMOJI_PAGE_SIZE;
						while (that.emojiCurrentPage < 0) {
							that.emojiCurrentPage++;
						}
					} else if ($this.hasClass("x_page_next")) { // 下一页
						that.emojiCurrentPage = that.emojiCurrentPage + EMOJI_PAGE_SIZE;
						while (that.emojiCurrentPage > length - EMOJI_PAGE_SIZE) {
							that.emojiCurrentPage--;
						}
					}
					// 处理按钮样式
					$(that.emojiContainerId + " .x_page_prev")[(that.emojiCurrentPage === 0) ? "addClass" : "removeClass"]("x_gery");
					$(that.emojiContainerId + " .x_page_next")[(that.emojiCurrentPage == length - EMOJI_PAGE_SIZE) ? "addClass" : "removeClass"]("x_gery");
					$(that.emojiContainerId + " .x_tab").hide().slice(that.emojiCurrentPage, that.emojiCurrentPage + EMOJI_PAGE_SIZE).show();
				})
				.on("click", "[data-hot]", function() {
					var $this = $(this);
					// 上报
					that.message.emit("txv_barrage_report", $this.attr("data-hot"));
				});
		};
	
		Emoji.prototype.openMiniPay = function() {
			barrageUtil.openMiniPay('V0$$4:82');
		};
	
		Emoji.prototype.toggle = function() {
			if (!this.isEmojiTableShow) {
				this.showEmojiContainer();
			} else {
				this.hideEmojiContainer();
			}
		};
	
		module.exports = Emoji;
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"x_mod_emoji\" id=\"<%=container%>\" style=\"right: 0;bottom: 40px;\">\n    <iframe class=\"x_iframe_mask\" src=\"about:blank\" frameborder=\"0\"></iframe>\n    <div class=\"x_box_triangle\"></div>\n    <div class=\"x_mod_inner\">\n        <div class=\"x_emoji_bd\" id=\"<%=emojiBd%>\">\n        </div>\n        <div class=\"x_mod_fd\">\n            <div class=\"x_emoji_tabs\">\n                <% for(var len = expression.length, i = 0; i < len; i++){ %>\n                <div class=\"x_tab\" data-eid=\"<%=expression[i].id%>\" data-hot=\"barrage-emoji-<%=expression[i].id%>\"<% if(i >= emojiPageSize){ %> style=\"display:none\"<% } %>><img src=\"<%=expression[i].pp%>\"><% if(expression[i]['new'] && expression[i]['new'] == 1){ %><i class=\"x_emoji_new\"></i><% } %></div>\n                <% } %>         \n            </div>\n            <div class=\"x_emoji_pages\">\n                <span class=\"x_page_prev x_gery\" data-hot=\"barrage-emoji-prev\"><span class=\"x_icon_prev\"></span></span>\n                <span class=\"x_page_next<% if(expression.length <= emojiPageSize){ %> x_gery<% } %>\" data-hot=\"barrage-emoji-next\"><span class=\"x_icon_next\"></span></span>\n            </div>\n        </div>\n    </div>\n</div>";
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		module.exports = "<div class=\"x_emoji_box<% if(__tplType == 2){ %> x_emoji_box_purchase<% } %>\" id=\"<%=detailPre%><%=id%>\">\n    <% if(__tplType == 2){ %>\n    <div class=\"x_emoji_head\">\n        <div class=\"x_emoji_pic\">\n            <img src=\"<%=pp%>\">\n        </div>\n        <div class=\"x_emoji_title\"><%=n%></div>\n        <div class=\"x_emoji_desc\" title=\"<%=pd%>\"><%=pd%></div>\n        <div class=\"x_emoji_purchase\">\n            <% if(isvip == 1){ %>\n            <a href=\"javascript:void(0);\" class=\"x_getit\"></a>\n            <span class=\"x_purchase_desc\">已是好莱坞会员，可免费使用</span>\n            <% } else {%>\n            <a href=\"javascript:void(0);\" class=\"x_btn _x_emoji_purchase\" data-hot=\"barrage-emoji-<%=id%>-purchase\">\n                <span class=\"x_text\">开通会员</span>\n            </a>\n            <span class=\"x_purchase_desc\">开通好莱坞会员立即拥有</span>\n            <% } %>\n        </div>\n    </div>\n    <% } else {%>\n    <div class=\"x_emoji_hd\">\n        <div class=\"x_title\"><%=n%></div>\n        <div class=\"x_meta\"><% if(isvip != 1 && payn > 0 && et > 0){ %>有效期：<%=_.emojiExpDate(et)%><% } %></div>\n    </div>\n    <% } %>\n    <div class=\"x_emoji_table<% if(count <= emojiRowCount * (__tplType == 2 ? 2 : 3)){ %> x_emoji_table_less<% } %>\">\n    \t<table>\n            <% for(var len = list.length, i = 0; i < len; i++){ %>\n            <% if(i % emojiRowCount == 0){ %><tr><% } %>\n            <% if(list[i] && list[i].id){ %>\n            <td class=\"_x_emoji_pic\" data-eid=\"<%=id%>\" data-did=\"<%=list[i].id%>\" data-hot=\"barrage-emoji-<%=id%>-click\"><img src=\"<%=_.emojiPic(list[i].id)%>\"></td>\n            <% } else {%>\n            <td class=\"empty\"></td>\n            <% } %>\n            <% if(i % emojiRowCount == emojiRowCount - 1 || i + 1 == list.length){ %></tr><% } %>\n            <% } %>\n\t\t</table>\n    </div>\n</div>";
	
	/***/ },
	/* 6 */
	/***/ function(module, exports) {
	
		
		var util = Txplayer.util;
		var $ = Txplayer.$;
		// var barrageEmojiMap = require('modules/barrage-emoji-map');
	
		module.exports = {
			openMiniPay: function(aid) {
				var open = function() {
					window.HLW_PAY.openPay({
						width: 670,
						codes: 'txsp',
						scene: 'minipay',
						type: 'service',
						amount: '12',
						amountType: 'month',
						channels: 'qdqb,kj,weixin',
						zIndex: 10001,
						// 统计用的aid
						aid: aid,
						// MA号 营销活动ID
						actid: '',
						// 可选。用户支付成功时的回调方法。
						// 如果用户支付成功，则立即回调onSuccess。
						// 参数opt为本次交易的信息。
						// 注意：银行卡渠道下，该回调不可信
						// 成功时的opt：{result_code:0, service_name:'xxx', amount:1, target_uin:123, uin:123, channel:'xxx', context:'xxx',type: 'xxx'}
						onSuccess: function(opt) {
							window.location.reload();
						}
					});
				};
	
				if (window.HLW_PAY && window.HLW_PAY.openPay) {
					open();
				} else {
					$.getScript("http://qzs.qq.com/tencentvideo_v1/script/film/open/pay.js", function() {
						if (window.HLW_PAY && window.HLW_PAY.openPay) {
							open();
						}
					});
				}
			},
			stopScrollPropagation: function(selector) {
				// 阻止鼠标滚动事件冒泡
				$(document)
					.off('DOMMouseScroll mousewheel', selector)
					.on('DOMMouseScroll mousewheel', selector, function(ev) {
						var $this = $(this),
							scrollTop = this.scrollTop,
							scrollHeight = this.scrollHeight,
							height = $this.height(),
							delta = (ev.type == 'DOMMouseScroll' ? ev.originalEvent.detail * -40 : ev.originalEvent.wheelDelta),
							up = delta > 0;
	
						var prevent = function() {
							ev.stopPropagation();
							ev.preventDefault();
							ev.returnValue = false;
							return false;
						};
	
						if (!up && -delta > scrollHeight - height - scrollTop) {
							// Scrolling down, but this will take us past the bottom.
							$this.scrollTop(scrollHeight);
							return prevent();
						} else if (up && delta > scrollTop) {
							// Scrolling up, but this will take us past the top.
							$this.scrollTop(0);
							return prevent();
						}
					});
			},
			// getInputSelection: function(el) {
			// 	var start = 0,
			// 		end = 0,
			// 		normalizedValue, range,
			// 		textInputRange, len, endRange;
	
			// 	if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
			// 		start = el.selectionStart;
			// 		end = el.selectionEnd;
			// 	} else {
			// 		range = document.selection.createRange();
	
			// 		if (range && range.parentElement() == el) {
			// 			len = el.value.length;
			// 			normalizedValue = el.value.replace(/\r\n/g, "\n");
	
			// 			// Create a working TextRange that lives only in the input
			// 			textInputRange = el.createTextRange();
			// 			textInputRange.moveToBookmark(range.getBookmark());
	
			// 			// Check if the start and end of the selection are at the very end
			// 			// of the input, since moveStart/moveEnd doesn't return what we want
			// 			// in those cases
			// 			endRange = el.createTextRange();
			// 			endRange.collapse(false);
	
			// 			if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
			// 				start = end = len;
			// 			} else {
			// 				start = -textInputRange.moveStart("character", -len);
			// 				start += normalizedValue.slice(0, start).split("\n").length - 1;
	
			// 				if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
			// 					end = len;
			// 				} else {
			// 					end = -textInputRange.moveEnd("character", -len);
			// 					end += normalizedValue.slice(0, end).split("\n").length - 1;
			// 				}
			// 			}
			// 		}
			// 	}
	
			// 	return {
			// 		start: start,
			// 		end: end
			// 	};
			// },
			// calcLength: function(val) {
			// 	// 表情算四个字符
			// 	val = val.replace(/\[.+?\]/g, function(string) {
			// 		return barrageEmojiMap.fromTargetToSource(string.replace(/[\[\]]/g, '')) ? 'mmmm' : string;
			// 	});
			// 	// 中文算两个字符
			// 	var r = /[^\x00-\xff]/g;
			// 	val = val.replace(r, "mm");
			// 	return val.length;
			// },
			insertText: function(e, t) {
				if (document.selection) {
					var a = document.selection.createRange();
					a.text = t
				} else if ("number" == typeof e.selectionStart && "number" == typeof e.selectionEnd) {
					var i = e.selectionStart,
						n = e.selectionEnd,
						o = i,
						r = e.value;
					e.value = r.substring(0, i) + t + r.substring(n, r.length),
						o += t.length,
						e.selectionStart = e.selectionEnd = o
				} else
					e.value += t
			},
			barrageRegist: function(vid) {
				var defer = $.Deferred();
				$.ajax({
					url: "http://bullet.video.qq.com/fcgi-bin/target/regist",
					data: {
						otype: "json",
						vid: vid,
						g_tk: util.getToken()
					},
					dataType: "jsonp"
				}).done(function(json) {
					if (json && json.returncode === 0) {
						defer.resolve(json);
					} else {
						defer.reject(json);
					}
				}).fail(function(json) {
					defer.reject(json);
				});
	
				return defer;
			},
			userswitch: function(status) {
				var defer = $.Deferred();
				$.ajax({
					url: "http://bullet.video.qq.com/fcgi-bin/userswitch",
					data: {
						otype: "json",
						cmd: "set",
						status: status ? "on" : "off",
						g_tk: util.getToken()
					},
					dataType: "jsonp"
				}).done(function(json) {
					if (json && json.returncode === 0) {
						defer.resolve(json);
					} else {
						defer.reject(json);
					}
				}).fail(function(json) {
					defer.reject(json);
				});
	
				return defer;
			},
			barragePost: function(postData) {
				$.ajax({
					url: 'http://bullet.video.qq.com/fcgi-bin/comment/post?otype=json&callback=postCommentCb',
					type: 'post',
					crossDomain: true,
					xhrFields: {
						withCredentials: true
					},
					data: postData,
					success: function(data) {
						try {
							data = data.replace('postCommentCb', '');
	
							data = data.replace(/[)\(]/gi, '');
	
							data = $.parseJSON(data);
	
						} catch (e) {}
					},
					error: function(e) {
	
					},
					timeout: function(e) {
	
					}
				});
			}
		};
	
	/***/ },
	/* 7 */
	/***/ function(module, exports) {
	
		var $ = Txplayer.$;
	
		var sourceArr = [
			"e7ybo", "g9cb0", "ejyvq", "fejnk", "cp34m",
			"5a8zt", "elfjz", "xl14z", "ov2hs", "2n51o",
			"p86eg", "dk4s3", "9sw9m", "21285", "5hflj",
			"u6rmb", "38ify", "rc4a6", "aakes", "b51dk",
			"4s6dc", "fy0ux", "p97hv", "38ewo",
	
			"a5pff", "jai5n", "7p28o", "v8ww6", "hj9no",
			"xgz6t", "dnxhe", "wr9u0", "gsj2f", "809lg",
			"sjhe5", "lovql", "q4u4b", "ymku0", "jw7ft",
			"2sa94", "cvrj4", "wkgjb", "4dmry", "b69il"
		];
	
		var targetArr = [
			"鄙视", "擦汗", "龇牙", "得意", "发呆",
			"发怒", "鼓掌", "害羞", "惊恐", "可怜",
			"抠鼻", "流汗", "流泪", "敲打", "亲亲",
			"色", "调皮", "偷笑", "微笑", "阴险",
			"吓", "疑问", '晕', "再见",
	
			"s鄙视", "s吃惊", "s大怒", "s色", "s恶心",
			"s尴尬", "s鼓掌", "s可怜", "s酷", "s狂笑",
			"s胜利", "s石化", "s抓狂", "s流泪", "s调皮",
			"s害羞", "s困", "s疑问", "s委屈", "s微笑"
		];
	
		module.exports = {
			fromSourceToTarget: function(source) {
				var index = $.inArray(source, sourceArr);
				return index >= 0 ? targetArr[index] : '';
			},
			fromTargetToSource: function(target) {
				var index = $.inArray(target, targetArr);
				if (index >= 0) {
					var eid = index <= 23 ? '10000058' : '10000059';
					return {
						eid: eid,
						value: sourceArr[index]
					}
				} else {
					return null;
				}
			}
		}
	
	/***/ }
	/******/ ]);
