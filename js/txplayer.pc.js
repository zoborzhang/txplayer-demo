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
	
		__webpack_require__(81);
		__webpack_require__(31);
		__webpack_require__(23);
		__webpack_require__(25);
		__webpack_require__(53);
		__webpack_require__(26);
		__webpack_require__(27);
		__webpack_require__(30);
		__webpack_require__(29);
		__webpack_require__(22);
		__webpack_require__(65);
		__webpack_require__(73);
		__webpack_require__(51);
		__webpack_require__(45);
		__webpack_require__(36);
		__webpack_require__(61);
		__webpack_require__(38);
		__webpack_require__(55);
		__webpack_require__(69);
		__webpack_require__(67);
		__webpack_require__(77);
		__webpack_require__(40);
		__webpack_require__(63);
		__webpack_require__(75);
		__webpack_require__(34);
		__webpack_require__(79);
		__webpack_require__(59);
		__webpack_require__(47);
		__webpack_require__(71);
		__webpack_require__(57);
		__webpack_require__(43);
		__webpack_require__(49);
		module.exports = __webpack_require__(8);
	
	
	/***/ },
	/* 1 */,
	/* 2 */,
	/* 3 */,
	/* 4 */,
	/* 5 */,
	/* 6 */,
	/* 7 */,
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		(function(){
		var $ = Txplayer.$;
		var htmlstr;
		var api = Txplayer.apiList;
		var util = Txplayer.util;
	
		if (Txplayer.util.browser.ie) {
		  htmlstr = __webpack_require__(9);
		}else{
		  htmlstr = __webpack_require__(10)
		}
		var cssstr = __webpack_require__(11);
	
		function FlashPlayer(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		FlashPlayer.prototype = {
		  init: function(){
		    this.dataset.vid = this.context.config.vid;
		    this.dataset.cid = this.context.config.cid;
		    this.dataset.tpid = this.context.config.tpid;
		    this.dataset.autoplay = this.context.config.autoplay;
		    this.dataset.poster = this.context.config.poster;
		    this.dataset.volume = this.context.config.volume;
		    this.dataset.isNeedPay = this.context.config.isNeedPay;
		    this.dataset.playerId = this.context.config.playerId;
		    this.dataset.nextVid = this.context.config.nextVid;
		    this.dataset.getNextVid = $.type(this.context.config.getNextVid)==='function' ? this.context.config.getNextVid : $.noop;
		    this.dataset.loadingswf = this.context.config.loadingswf;
		    this.dataset.skin = this.context.config.flashSkin;
		    this.dataset.title = this.context.config.title;
		    this.dataset.showSettings = this.context.config.showSettings;
		    this.dataset.showShare = this.context.config.showShare;
		    this.dataset.showCloseLight = this.context.config.showCloseLight;
		    this.dataset.showSmallWindowButton = this.context.config.showSmallWindowButton;
		    this.dataset.showBullet = this.context.config.showBullet;
		    this.dataset.showImageBullet = this.context.config.showImageBullet;
		    this.dataset.playStartTime = this.context.config.playStartTime;
		    this.dataset.playEndTime = this.context.config.playEndTime;
		    this.dataset.showBrowserFullScreen = this.context.config.showBrowserFullScreen;
		    this.dataset.connectionPlayTime = this.context.config.connectionPlayTime;
		    this.dataset.showBulletInput = this.context.config.showBulletInput;
		    this.dataset.showFlashBulletInput = this.context.config.showFlashBulletInput;
		    this.dataset.openBulletDefault = this.context.config.openBulletDefault;
		    this.flashEventListener();
		    this.write();
		    this.addEventListener();
		    this.exportsModuleApis();
		    this.setPlayerState(-1);
		  },
		  insertStyle: function(){
		    var $style = $('#txp-flash-style');
		    if ($style && $style.length) return;
		    $(document.head).append(cssstr);
		  },
		  write: function(){
		    try{
		      var flashhtml = this.buildHTML();
		      this.context.dataset.$playermod.append(flashhtml);
		      this.context.userMsg.broadcast(api.eventApi.onWrite);
		      this.dataset.$flash = $('#' + this.dataset.renderData.data.id);
		      this.dataset.flashplayer = this.dataset.$flash.get(0);
		      this.insertStyle();
		    }catch(e){
		      util.showError('htmlframe创建失败', e);
		      this.context.msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		        msg: e.message,
		        code: '3000',
		        stack: e.stack
		      });
		    }
		  },
		  remove: function(){
		    this.dataset.$flash.remove();
		    this.dataset.flashplayer = null;
		  },
		  flashEventListener: function(){
		    // 开始播放正片
		    this.thisplay();
		    // 暂停、恢复播放、音量变化
		    this.__tenplay_onMessage();
		    // 播放器初始化
		    this.playerInit();
		    // 播放器出现异常
		    this._flash_play_error();
		    // 点击播放下一个
		    this.nextplay();
		    // 广告开始
		    this.__adldstart();
		    // 广告结束
		    this.__adldstop();
		    // 使用html5播放器
		    this.__tenplay_switch2html5();
		    // 加入看单
		    this._qqplayer_follow();
		    // 关灯
		    this._qqplayer_lightup();
		    // 伪全屏
		    this.toggleFakeFullScreen();
		    // 播放时隐藏控制栏
		    this.__tenplay_hideseekbar();
		    // timeupdate
		    this._flash_view_history();
		    // 折叠侧边栏
		    this.__tenplay_theaterMode();
		    // 判断弹幕是否开启
		    this.js_bulletRegisted();
		    // 弹幕点赞数据更新
		    this.js_bulletSetFireNum();
		    // flash获取v+数据
		    this.__tenplay_getVPlusInfo();
		    // flash调用该方法执行订阅操作
		    this.__tenplay_setVPlusSub();
		    // flash唤起登录
		    this.__flashplayer_openLogin();
		    // flash弹幕开关状态变化
		    this.js_bulletSwitchState();
		  },
		  getFlashVar: function(){
		    var params = {
		      vid: this.dataset.vid,
		      autoplay: this.dataset.autoplay?1:0,
		      volume: this.dataset.volume,
		      searchbar: 0,
		      // 是否显示设置
		      showcfg: 1,
		      // 显示结束推荐
		      showend: 0,
		      openbc: 0,
		      // 这个必须传，不然不会调用window.thisplay
		      list: 2,
		      pay: this.dataset.isNeedPay ? 1 : 0,
		      // 显示下一集按钮
		      shownext: this.dataset.nextVid ? 1 : 0,
		      share: 1,
		      bullet: 0,
		      theater: this.context.config.showToggleSideBar===true?1:0,
		      skin: 'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerSkinV5.swf',
		      switch2h5: 0,
		      bulletinput:0,
		      attstart: 30
		    };
		    if (util.os.mac){
		      params.switch2h5 = 1;
		    }
		    // for debug
		    if (util.os.windows && !util.browser.ie && Txplayer.dataset.debug){
		      params.switch2h5 = 1;
		    }
		    if (location.protocol==='https:'){
		      params.skin = 'https://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerSkinV5.swf';
		    }
		    if (this.context.config.useFlashMiniSkin) {
		      params.skin = 'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkinV5.swf';
		      if (location.protocol==='https:'){
		        params.skin = 'https://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkinV5.swf';
		      }
		    }else if (location.hostname!=='v.qq.com') {
		      params.skin = 'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerOutSkinV5.swf';
		      if (location.protocol==='https:'){
		        params.skin = 'https://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerOutSkinV5.swf';
		      }
		    }
		    if (this.dataset.poster) params.pic = this.dataset.poster;
		    if (this.dataset.cid) params.cid = this.dataset.cid;
		    if (this.dataset.tpid) params.cid = this.dataset.tpid;
		    if (!!this.dataset.showBrowserFullScreen) params.fakefull = 1;
		    if (!!this.dataset.showRecommendOnEnd) params.showend = 1;
		    if (this.dataset.loadingswf) params.loadingswf = this.dataset.loadingswf;
		    if (this.dataset.skin) params.skin = this.dataset.skin;
		    if (this.dataset.title) params.title = this.dataset.title;
		    if (!!this.dataset.showSettings) params.showcfg = 1;
		    if (!!this.dataset.showShare) params.share = 1;
		    if (!!this.dataset.showCloseLight) params.light = 1;
		    if (!!this.dataset.showSmallWindowButton) params.popup = 1;
		    if (!!this.dataset.showBullet) params.bullet = 1;
		    if (!!this.dataset.showImageBullet) params.advbullet = 1;
		    if (this.dataset.playStartTime) params.vstart = this.dataset.playStartTime;
		    if (this.dataset.playEndTime) params.vend = this.dataset.playEndTime;
		    // if (this.dataset.connectionPlayTime) params.history = this.dataset.connectionPlayTime;
		    if (this.dataset.showFlashBulletInput) params.bulletinput = 1;
		    if (this.dataset.openBulletDefault) params.openbc = 1;
		    return params;
		  },
		  buildHTML: function(){
		    var that = this,
		      swf;
		    if (this.context.config.videoType==='vod') {
		      swf = Txplayer.dataset.flashVodSwf;
		    }else if (this.context.config.videoType==='live') {
		      swf = Txplayer.dataset.flashLiveSwf;
		    }
		    var version = Txplayer.util.browser.ie && Txplayer.util.browser.ie.version;
		    var renderData = {
		      data:{
		        browserVersion: version || 0,
		        // browserVersion: 9,
		        width: '100%',
		        height: '100%',
		        swfurl: swf,
		        flashvar: Txplayer.util.object2string(that.getFlashVar()),
		        id: that.context.config.playerId,
		        flashWmode: that.context.config.flashWmode
		      }
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.dataset.renderData = renderData;
		    return htmldata;
		  },
		  getPlayerState: function(){
		    return this.dataset.playState;
		  },
		  // 设置视频播放状态
		  setPlayerState: function(state){
		    // 0: 已结束
		    // 1: 正在播放
		    // 2: 暂停
		    // 3: 缓冲中
		    if ($.type(state)!=='number') return;
		    if (state===this.dataset.playState) return;
		    this.dataset.playState = state;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    this.context.userMsg.broadcast(api.eventApi.onPlayStateChange, {
		      state: state,
		      vid: vid
		    });
		    this.context.msg.broadcast(api.eventApi.onPlayStateChange, {
		      state: state,
		      vid: vid
		    });
		  },
		  isShowBulletInput: function(){
		    return this.dataset.showBulletInput;
		  },
		  // flash api start
		  nextplay: function(){
		    if (window.nextplay) return;
		    /**
		     * 当前视频播放结束后flash播放器触发的回调
		     * @param {String} 当前播放的视频id
		     * @param {Object} 额外参数对象，包含播放器id
		     */
		    window.attrationstop = window.nextplay = function(vid, obj) {
		      if ( !(obj && obj.id && Txplayer.dataset._instance && Txplayer.dataset._instance[obj.id]) ) return;
		      var player = Txplayer.dataset._instance[obj.id];
		      player.userMsg.broadcast(api.eventApi.onEnded, vid);
		      player._FlashPlayer.setPlayerState(0);
		      player.playNext();
		    }
		  },
		  _flash_play_error: function(){
		    if (window._flash_play_error) return;
		    window._flash_play_error = function(playerId, err){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      player.userMsg.broadcast(api.eventApi.onError, err);
		    };
		  },
		  thisplay: function(){
		    if (window.thisplay) return;
		    /**
		     * 视频开始播放时flash会调用这个回调
		     * @param {String} 当前播放的视频id
		     * @param {Object} 额外参数对象，包含播放器id和pid(上报用的)
		     */
		    window.thisplay = function(vid, obj){
		      if ( !(obj && obj.id && Txplayer.dataset._instance && Txplayer.dataset._instance[obj.id]) ) return;
		      var player = Txplayer.dataset._instance[obj.id];
		      player.userMsg.broadcast(api.eventApi.onPlaying);
		      if (player._FlashPlayer && player._FlashPlayer.dataset){
		        player._FlashPlayer.dataset.hasPlayed = true;
		      }
		      player._FlashPlayer.setPlayerState(1);
		    }
		  },
		  __tenplay_onMessage: function(){
		    if (window.__tenplay_onMessage) return;
		    /**
		     * @public
		     * 与flash播放器的通信方法，目前有注册播放和暂停消息
		     * @param {String} playerId 当前播放器id
		     * @param {Number} act 消息代码
		     */
		    window.__tenplay_onMessage = function(playerId, act){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      var eventName = '';
		      var data;
		      switch (parseInt(act, 10)) {
		        case 1:
		          { // 暂停
		            player._FlashPlayer.setPlayerState(2);
		            break;
		          }
		        case 3:
		          { // 恢复播放
		            player._FlashPlayer.setPlayerState(1);
		            break;
		          }
		        case 4:
		          { // 音量变化
		            eventName = api.eventApi.onVolumeChange;
		            data = player.getVolume();
		            break;
		          }
		      }
		      if (!eventName) return;
		      player.userMsg.broadcast(eventName, data);
		    };
		  },
		  __adldstart: function(){
		    if (window.__adldstart) return;
		    window.__adldstart = function(playerId){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      player.userMsg.broadcast(api.eventApi.onAdStart);
		    }
		  },
		  __adldstop: function(){
		    if (window.__adldstop) return;
		    window.__adldstop = function(data, playerId){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      player.userMsg.broadcast(api.eventApi.onAdEnd);
		    }
		  },
		  __tenplay_switch2html5: function(){
		    if (window.__tenplay_switch2html5) return;
		    var that = this;
		    window.__tenplay_switch2html5 = function(playerId){
		      that.useHTML5Player();
		      location.reload();
		    }
		  },
		  _qqplayer_lightup: function(){
		    if (window._qqplayer_lightup) return;
		    window._qqplayer_lightup = function(close, playerId){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      player.userMsg.broadcast(api.eventApi.onClickCloseLight,!close);
		    };
		  },
		  _qqplayer_follow: function(){
		    if (window._qqplayer_follow) return;
		    window._qqplayer_follow = function(data, playerId){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      if (player._FlashPlayer &&
		        player._FlashPlayer.context.config &&
		        $.type(player._FlashPlayer.context.config.followHandler)==='function'){
		        player._FlashPlayer.context.config.followHandler({
		          vid: player.getVid()
		        });
		      }
		    };
		  },
		  toggleFakeFullScreen: function(){
		    if(window.toggleFakeFullScreen) return;
		    window.toggleFakeFullScreen = function(data){
		      if (!data || !data.id) return;
		      var playerId =  data.id;
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      player.userMsg.broadcast(api.eventApi.onBrowserFullscreenChange, data.enter);
		      if (data.enter){
		        player.resize({
		          width:'100%',
		          'height':'100%',
		          'position':'fixed',
		          'z-index': 10000,
		          'top':0,
		          'left': 0
		        });
		        $("html").addClass('txp_html_fullscreen');
		      } else{
		        player.resize({
		          'position': 'inherit',
		          'z-index': ''
		        });
		        $("html").removeClass('txp_html_fullscreen');
		      }
		    };
		  },
		  __tenplay_hideseekbar: function(){
		    if (window.__tenplay_hideseekbar) return;
		    window.__tenplay_hideseekbar = function(data, isSelected){
		      // debugger
		    };
		  },
		  _flash_view_history: function(){
		    if (window._flash_view_history) return;
		    // flag:0，看点开始。-1，开始播放。-2，播放结束。-3，正在播放
		    window._flash_view_history = function(flag,currentTime, duration, playerId){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      player.userMsg.broadcast(api.eventApi.onTimeUpdate);
		      if (player._FlashPlayer && player._FlashPlayer.context && player._FlashPlayer.context.msg) {
		        player._FlashPlayer.context.msg.broadcast(api.eventApi.onTimeUpdate, {
		          currentTime: currentTime
		        });
		      }
		    };
		  },
		  __tenplay_theaterMode: function(){
		    if (window.__tenplay_theaterMode) return;
		    window.__tenplay_theaterMode = function(playerId, isShow){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      var action = isShow ? 'hide':'show';
		      player.userMsg.broadcast(api.eventApi.onToggleSideBar,action);
		    };
		  },
		  __tenplay_getVPlusInfo: function(){
		    if (window.__tenplay_getVPlusInfo) return;
		    window.__tenplay_getVPlusInfo = function(playerId, vid){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      if ($.type(player._FlashPlayer.context.config.getBrandData)!=='function') return;
		      return player._FlashPlayer.context.config.getBrandData(vid);
		    };
		  },
		  __tenplay_setVPlusSub: function(){
		    if (window.__tenplay_setVPlusSub) return;
		    window.__tenplay_setVPlusSub= function(playerId, isFollow){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      if ($.type(player._FlashPlayer.context.config.brandSubscribeHandler)!=='function') return;
		      var vid = player.getVid();
		      player._FlashPlayer.context.config.brandSubscribeHandler(vid, isFollow);
		    };
		  },
		  __flashplayer_openLogin: function(){
		    if (window.__flashplayer_openLogin) return;
		    window.__flashplayer_openLogin = function(a,playerId){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      player.userMsg.broadcast(api.eventApi.onShowLogin);
		    };
		  },
		  js_bulletRegisted: function(){
		    if(window.js_bulletRegisted) return;
		    window.js_bulletRegisted = function(data, playerId){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      if (player._FlashPlayer && player._FlashPlayer.dataset){
		        player._FlashPlayer.dataset.serverShowBullet = data;
		      }
		      player.userMsg.broadcast(api.eventApi.onBulletReady,data);
		      if ( player._FlashPlayer && player._FlashPlayer.context && player._FlashPlayer.context.msg) {
		        player._FlashPlayer.context.msg.broadcast(api.eventApi.onBulletReady,data);
		      }
		    };
		  },
		  js_bulletSetFireNum: function(){
		    if(window.js_bulletSetFireNum) return;
		    window.js_bulletSetFireNum = function(data, playerId){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      if ( !(player._FlashPlayer && player._FlashPlayer.context && player._FlashPlayer.context.msg) ) return;
		      player._FlashPlayer.context.msg.broadcast(api.eventApi.onBulletLikeNumberUpdate,{
		        num: data
		      });
		      player._FlashPlayer.dataset.bulletLikeNumber = data;
		    };
		  },
		  js_bulletSwitchState: function(){
		    if (window.js_bulletSwitchState) return;
		    window.js_bulletSwitchState = function(data, playerId){
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      player._FlashPlayer.dataset.flashBulletSwitchStatus = data;
		      player._FlashPlayer.context.msg.broadcast(api.eventApi.onFlashBulletSwitchStatusChange, data);
		    };
		  },
		  // flash api end
		  getData: function(){
		    var settingData = util.getData(Txplayer.dataset.localStorageKey.userSetting);
		    try{
		      settingData = JSON.parse(settingData);
		    }catch(e){
		      settingData = {};
		    }
		    return settingData;
		  },
		  setData: function(key, val){
		    key = key || 'isUseFlash';
		    var settingData = this.getData(Txplayer.dataset.localStorageKey.userSetting);
		    settingData[key] = val;
		    util.setData(Txplayer.dataset.localStorageKey.userSetting,JSON.stringify(settingData));
		  },
		  useHTML5Player: function(){
		    this.setData(null, 0);
		  },
		  playerInit: function(){
		    if (window.playerInit) return;
		    /**
		     * flash播放器完成初始化工作后触发的回调
		     * @param {String} 当前播放器id
		     */
		    window.playerInit = function(playerId) {
		      if ( !(playerId && Txplayer.dataset._instance && Txplayer.dataset._instance[playerId]) ) return;
		      var player = Txplayer.dataset._instance[playerId];
		      player.setNextEnable();
		      player.userMsg.broadcast(api.eventApi.onReady);
		    };
		  },
		  getVolume: function(){
		    return this.jsCallFlashMethod('getVolume');
		  },
		  setVolume: function(volume){
		    return this.jsCallFlashMethod('setVolume', volume);
		  },
		  setVid: function(vid){
		    if (!vid) return;
		    if (vid===this.dataset.vid) return;
		    this.dataset.vid = vid;
		    this.context.msg.broadcast(api.eventApi.onVidChange, vid);
		    this.context.userMsg.broadcast(api.eventApi.onVidChange, vid);
		  },
		  getVid: function(){
		    return this.dataset.vid;
		  },
		  play: function(options){
		    if ($.type(options)==='undefined'){
		      options = {};
		      if (this.dataset.hasPlayed) {
		        this.jsCallFlashMethod('setPlaytime', -1);
		        return;
		        // 键盘模拟接口调用
		        // this.dataset.flashplayer.outKeyboardHandler(32)
		      }else{
		        options.vid = this.dataset.vid;
		      }
		    }else if($.type(options)==='string'){
		      this.dataset.vid = options;
		      options = {
		        vid: this.dataset.vid
		      };
		    }
		    if (this.dataset.connectionPlayTime){
		      options.history = this.dataset.connectionPlayTime;
		    }
		    // 播放下一个视频前，触发beforeVideoPlay
		    if (options && options.vid && options.vid !== this.dataset.vid) {
		      // beforeVideoPlay触发前更新vid的值
		      if (options.hasOwnProperty('vid')) this.setVid(options.vid);
		      this.context.msg.broadcast(api.eventApi.beforeVideoPlay)
		    }
		    // if (options.vid) this.dataset.vid = options.vid;
		    if (options.nextVid) {
		      this.dataset.nextVid = options.nextVid;
		      options.shownext = 1;
		    }else{
		      options.shownext = 0;
		      this.dataset.nextVid = false;
		    }
		    if (options.hasOwnProperty('openBulletDefault')){
		      this.dataset.openBulletDefault = options.openBulletDefault;
		    }
		    this.jsCallFlashMethod('loadAndPlayVideoV2', options);
		    this.dataset.hasPlayed = true;
		    this.isNextEnable();
		  },
		  isNextEnable: function(){
		    var that = this;
		    var setNextEnable = function(isEnable){
		      that.jsCallFlashMethod('setNextEnable', isEnable)
		    };
		    if (this.dataset.nextVid){
		      setNextEnable(true);
		    }else{
		      setNextEnable(false);
		    }
		  },
		  pause: function(){
		    this.jsCallFlashMethod('pauseVideo');
		  },
		  stop: function(){
		    this.jsCallFlashMethod('stopVideo');
		  },
		  mute: function(){
		    this.jsCallFlashMethod('mute');
		  },
		  unMute: function(){
		    this.jsCallFlashMethod('unmute');
		  },
		  isMuted: function(){
		    return 0 === this.getVolume();
		  },
		  seekTo: function(options){
		    var time;
		    if ( $.type(options)==='number' ){
		      time = options;
		      options = {};
		    }else if( $.type(options)==='object' ){
		      time = options.time;
		    }
		    if (options.showTips){
		      this.jsCallFlashMethod('setPlaytime', time,{
		        tm: time
		      });
		    }else if(options.bulletid){
		      this.jsCallFlashMethod('setPlaytime', time,{
		        bulletid: options.bulletid,
		        seektype: 1
		      });
		    }else{
		      this.jsCallFlashMethod('setPlaytime', time);
		    }
		  },
		  getDuration: function(){
		    var duration = this.jsCallFlashMethod('getDuration');
		    duration = parseInt(duration*100)/100;
		    return duration;
		  },
		  getCurrentTime: function(){
		    var currentTime = this.jsCallFlashMethod('getPlaytime')
		    currentTime = parseInt(currentTime*100)/100;
		    return currentTime;
		  },
		  getVideoSize: function(){
		    var data = this.jsCallFlashMethod('getVideoSize')
		    return {
		      width: parseInt(data.vw),
		      height: parseInt(data.vh)
		    };
		  },
		  // js调用flash播放器接口
		  jsCallFlashMethod: function(fn, data){
		    if (!this.dataset.flashplayer) {
		      util.showError('jsCallFlashMethod ERROR', '找不到flashplayer对象');
		      return false;
		    }
		    if ( $.type(this.dataset.flashplayer[fn])!=='function' ){
		      util.showError('jsCallFlashMethod ERROR', '找不到flash API' + fn);
		      return false;
		    }
		    var result;
		    var stackMsg;
		    // 第一个参数是函数名，剔除
		    var args = [];
		    if (arguments && arguments.length){
		      for(var i=0,len=arguments.length;i<len;i++){
		        if (i===0) continue;
		        args.push(arguments[i]);
		      }
		    }
		    try{
		      if (!util.browser.firefox){
		        result = this.dataset.flashplayer[fn].apply(null, args);
		      }else{
		        // firfox bug
		        // Firefox “Bad NPObject” error with swf only when using Function.apply()
		        // http://stackoverflow.com/questions/28695572/firefox-bad-npobject-error-with-swf-only-when-using-function-apply
		        switch(args.length){
		          case 0:
		            result = this.dataset.flashplayer[fn]();
		            break;
		          case 1:
		            result = this.dataset.flashplayer[fn](args[0]);
		            break;
		          case 2:
		            result = this.dataset.flashplayer[fn](args[0],args[1]);
		            break;
		          case 3:
		            result = this.dataset.flashplayer[fn](args[0],args[1],args[2]);
		            break;
		          case 4:
		            result = this.dataset.flashplayer[fn](args[0],args[1],args[2],args[3]);
		            break;
		          case 5:
		            result = this.dataset.flashplayer[fn](args[0],args[1],args[2],args[3],args[4]);
		            break;
		          default:
		            util.showError('jsCallFlashMethod error','最多支持5个参数');
		            break;
		        }
		      }
		    }catch(e){
		      util.showError('jsCallFlashMethod', fn);
		      stackMsg = e.stack;
		      if (window.JSON && $.type(window.JSON.stringify)==='function'){
		        stackMsg = JSON.stringify(args) + '\n' + stackMsg;
		      }
		      this.context.msg.broadcast(api.privateApi.reportError, {
		        msg: '['+fn+'] '+e.message,
		        code: '3000',
		        stack: stackMsg
		      });
		    }
		    return result;
		  },
		  bulletSwitch: function(isOpen){
		    this.jsCallFlashMethod('flash_bulletSwitchClick', isOpen);
		  },
		  isUserOpenBullet: function(){
		    return this.dataset.showBullet;
		  },
		  isServerOpenBullet: function(){
		    return this.dataset.serverShowBullet;
		  },
		  setSmallWindowMode: function(open){
		    this.jsCallFlashMethod('setFlowPlayerMode', open);
		  },
		  playNext: function(){
		    if (!this.dataset.nextVid) return;
		    if ( $.type(this.context.config.getNextVid)!=='function' ) {
		      util.showError('getNextVid not found');
		      return;
		    }
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    var nextVidData = this.context.config.getNextVid(vid);
		    if ( !(nextVidData && nextVidData.vid) ){
		      util.showError('getNextVid need return vid info');
		      return;
		    }
		    try{
		      this.context.userMsg.broadcast(api.eventApi.onBeforePlayNext,{
		        vid: nextVidData.vid
		      });
		    }catch(e){
		      util.showError('onBeforePlayNext', e);
		    }
		    this.play(nextVidData);
		  },
		  transferMyBullet: function(data){
		    this.jsCallFlashMethod('addBulletCommentByType', data)
		  },
		  postBulletData: function(data){
		    this.jsCallFlashMethod('flash_bulletSend', data);
		  },
		  getStartPlayTime: function(){
		    var time;
		    if (this.dataset.connectionPlayTime){
		      time = this.dataset.connectionPlayTime;
		    }
		    else if (this.dataset.startPlayTime){
		      time = this.dataset.startPlayTime;
		    }
		    return time;
		  },
		  addEventListener: function(){
		    var that = this;
		    this.context.userMsg.on('followStateChange', function(data){
		      that.jsCallFlashMethod('setFavoriteStatus', !!data.state)
		    });
		    this.context.userMsg.on('playStateChange', function(data){
		      if (data.state===1){
		        var startTime = that.getStartPlayTime();
		        if (startTime){
		          that.jsCallFlashMethod('setPlaytime', startTime,{
		            tm: startTime
		          });
		        }
		      }
		    });
		    this.context.userMsg.on('brandStatusUpdate', function(data){
		      that.jsCallFlashMethod('setVPlusSubStatus', data);
		    });
	
		    this.context.msg.on(api.eventApi.beforeVideoPlay, function(data, options){
		      that.setPlayerState(-1);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.moduleApis = {};
		    this.dataset.privateApis = {};
	
		    this.dataset.moduleApis[api.publicApi.getVid] = function(data, options){
		      options.data = that.getVid();
		    };
		    this.dataset.moduleApis[api.publicApi.play] = function(data){
		      that.play(data);
		    };
		    this.dataset.moduleApis[api.publicApi.pause] = function(){
		      that.pause();
		    };
		    this.dataset.moduleApis[api.publicApi.seekTo] = function(data){
		      that.seekTo(data);
		    };
		    this.dataset.moduleApis[api.publicApi.getDuration] = function(data, options){
		      options.data = that.getDuration();
		    };
		    this.dataset.moduleApis[api.publicApi.getCurrentTime] = function(data, options){
		      options.data = that.getCurrentTime();
		    };
		    this.dataset.moduleApis[api.publicApi.getCurrentTime] = function(data, options){
		      options.data = that.getCurrentTime();
		    };
		    this.dataset.moduleApis[api.publicApi.getVolume] = function(data, options){
		      options.data = that.getVolume();
		    };
		    this.dataset.moduleApis[api.publicApi.setVolume] = function(data, options){
		      that.setVolume(data);
		    };
		    this.dataset.moduleApis[api.publicApi.mute] = function(data, options){
		      that.mute();
		    };
		    this.dataset.moduleApis[api.publicApi.unMute] = function(data, options){
		      that.unMute();
		    };
		    this.dataset.moduleApis[api.publicApi.getVideoSize] = function(data, options){
		      options.data = that.getVideoSize();
		    };
		    this.dataset.moduleApis[api.publicApi.stop] = function(data, options){
		      that.stop();
		    };
		    this.dataset.moduleApis[api.publicApi.isMuted] = function(data, options){
		      options.data = that.isMuted();
		    };
		    this.dataset.moduleApis[api.publicApi.getPlayerId] = function(data, options){
		      options.data = that.dataset.playerId;
		    };
		    this.dataset.moduleApis[api.publicApi.closeBullet] = function(data, options){
		      that.closeBullet();
		    };
		    this.dataset.moduleApis[api.publicApi.openBullet] = function(data, options){
		      that.openBullet();
		    };
		    this.dataset.moduleApis[api.publicApi.setNextEnable] = function(data, options){
		      if ($.type(data)==='undefined'){
		        data = that.dataset.nextVid ? 1 : 0;
		      }
		      that.jsCallFlashMethod('setNextEnable', data);
		    };
		    this.dataset.moduleApis[api.publicApi.getNextVid] = function(data, options){
		      var vid = that.context.msg.run(api.publicApi.getVid);
		      options.data = that.dataset.getNextVid.call(null, vid);
		    };
		    this.dataset.moduleApis[api.publicApi.transferMyBullet] = function(data, options){
		      that.transferMyBullet(data);
		    };
		    this.dataset.moduleApis[api.publicApi.playNext] = function(data, options){
		      that.playNext();
		    };
		    this.dataset.moduleApis[api.publicApi.postBullet] = function(data, options){
		      that.postBulletData(data);
		    };
		    this.dataset.moduleApis[api.privateApi.isUserOpenBullet] = function(data, options){
		      options.data = that.isUserOpenBullet();
		    };
		    this.dataset.moduleApis[api.privateApi.isServerOpenBullet] = function(data, options){
		      options.data = that.isServerOpenBullet();
		    };
		    this.dataset.moduleApis[api.privateApi.isShowBulletInput] = function(data, options){
		      options.data = that.isShowBulletInput();
		    };
		    this.dataset.moduleApis[api.privateApi.getBulletLikeNumber] = function(data, options){
		      options.data = that.dataset.bulletLikeNumber;
		    };
		    this.dataset.moduleApis[api.privateApi.isBulletOpenDefault] = function(data, options){
		      options.data = that.dataset.openBulletDefault;
		    };
		    this.dataset.moduleApis[api.privateApi.getFlashBulletSwitchStatus] = function(data, options){
		      options.data = that.dataset.flashBulletSwitchStatus;
		    };
	
		    this.dataset.moduleApis[api.publicApi.setSmallWindowMode] = function(data, options){
		      that.setSmallWindowMode(data);
		    };
		    this.dataset.moduleApis[api.publicApi.bulletSwitch] = function(data, options){
		      that.bulletSwitch(data);
		    };
		    this.dataset.moduleApis[api.publicApi.getPlayerState] = function(data, options){
		      options.data = that.getPlayerState();
		    };
		    this.dataset.moduleApis[api.publicApi.callPlayerExtendMethod] = function(fnName, options){
		      var args = [fnName];
		      $.each(arguments, function(idx, item){
		        if (idx<2) return;
		        args.push(item);
		      });
		      options.data = that.jsCallFlashMethod.apply(that, args);
		    };
	
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('FlashPlayer', FlashPlayer);
	
		})();
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
		module.exports = "<% if(data.browserVersion===11){ %>\n<object data=\"<%=data.swfurl%>\" type=\"application/x-shockwave-flash\" width=\"<%=data.width%>\" height=\"<%=data.height%>\" id=\"<%=data.id%>\" codebase=\"http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=10,2,0,0\">\n<% } else { %>\n<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" width=\"<%=data.width%>\" height=\"<%=data.height%>\" id=\"<%=data.id%>\" codebase=\"http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=10,2,0,0\">\n<% } %>\n\n<param name=\"allowScriptAccess\" value=\"always\" />\n<param name=\"movie\" value=\"<%=data.swfurl%>\" />\n<param name=\"quality\" value=\"high\" />\n<param name=\"allowFullScreen\" value=\"true\"/>\n<param name=\"play\" value=\"true\" />\n<param name=\"wmode\" value=\"<%=data.flashWmode%>\" />\n<param name=\"flashvars\" value=\"<%=data.flashvar%>\"/>\n<param name=\"type\" value=\"application/x-shockwave-flash\" />\n<param name=\"pluginspage\" value=\"http://get.adobe.com/cn/flashplayer/\" />\n\n</object>";
	
	/***/ },
	/* 10 */
	/***/ function(module, exports) {
	
		module.exports = "<embed\n  wmode=\"<%=data.flashWmode%>\"\n  flashvars=\"<%=data.flashvar%>\"\n  src=\"<%=data.swfurl%>\"\n  quality=\"high\"\n  name=\"<%=data.id%>\"\n  id=\"<%=data.id%>\"\n  bgcolor=\"#000000\"\n  width=\"<%=data.width%>\"\n  height=\"<%=data.height%>\"\n  align=\"middle\"\n  allowScriptAccess=\"always\"\n  allowFullScreen=\"true\"\n  type=\"application/x-shockwave-flash\"\n  pluginspage=\"http://get.adobe.com/cn/flashplayer/\">\n</embed>";
	
	/***/ },
	/* 11 */
	/***/ function(module, exports) {
	
		module.exports = "<style type=\"text/css\" id=\"txp-flash-style\">\n.txp_html_fullscreen *{visibility: hidden; }\n.txp_html_fullscreen .txp_player, .txp_html_fullscreen .txp_player *{visibility: visible; }\n.txp_player{position: relative;display: block;}\n.txp_player embed,.txp_player object {position: absolute;top: 0;left: 0;}\n</style>";
	
	/***/ },
	/* 12 */,
	/* 13 */,
	/* 14 */,
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		var qvsec = __webpack_require__(16);
		var $ = Txplayer.$;
		var TizenAuth = __webpack_require__(17);
		var playerdefine = __webpack_require__(19);
		var definitionMap = playerdefine.definitionMap;
		var util = Txplayer.util;
		function GetVideoInfo(context){
		  this.context = context;
		  this.dataset = {};
		}
		GetVideoInfo.prototype = {
		  // for tizen
		  // 通过vid和鉴权的ckey获取视频的hls播放地址
		  getVideoHlsByVid: function(options){
		    if (!this._tizenauth) {
		      this._tizenauth = new TizenAuth(options);
		    }
		    var defer = $.Deferred();
		    var that = this;
		    var getKeyConfig = {
		      vid: options.vids
		    };
		    if (options.svrtime) getKeyConfig.svrtime = options.svrtime;
		    if (!options.retryTimes) options.retryTimes = 0;
		    this._tizenauth.getVkey(getKeyConfig)
		    .done(function(data){
		      if ( !(data && data.originalEvent && data.originalEvent.data) ){
		        defer.reject();
		        return ;
		      }
		      var config = $.extend({}, options);
		      config.cKey = data.originalEvent.data;
		      that.requestVideoHlsByVid(config)
		      .done(function(hlsUrls, definitionList,logoData, jsonData){
		        if (hlsUrls && hlsUrls.length) {
		          defer.resolve(hlsUrls, definitionList,logoData, jsonData);
		        }else{
		          defer.reject();
		        }
		      })
		      .fail(function(opt){
		        if ($.type(opt)==='object' && opt.code===-1 && opt.svrtime) {
		          if (options.retryTimes!==0) {
		            defer.reject({
		              code: '10002',
		              msg: '获取播放地址失败'
		            });
		            return;
		          }
		          options.retryTimes ++;
		          options.svrtime = opt.svrtime;
		          that.getVideoHlsByVid(options);
		        }
		      });
		    })
		    .fail(function(){
	
		    });
		    return defer;
		  },
		  // for tizen
		  // do cgi request
		  requestVideoHlsByVid: function(options){
		    var cfg = {
		      charge: 0,
		      vids: "",
		      fmt: "auto",
		      otype: "json",
		      dtype: 3, //返回hls播放地址
		      platform: '10601',
		      sphls: 1,
		      host: window != top ? document.referrer : document.location.host
		    };
		    var conf = {
		      cKey: options.cKey,
		      encryptVer: '4.1',
		      vids: options.vids,
		      defn: options.fmt
		    };
		    var params = $.extend(cfg, conf);
		    var cgi = 'http://h5vv.video.qq.com/getvinfo?callback=?';
		    if (location.protocol==='https:'){
		      cgi = 'https://sec.video.qq.com/p/h5vv.video/getvinfo?callback=?';
		    }
		    var that = this;
		    var defer = $.Deferred();
		    this.dataset.videoFormat = params.fmt;
		    this.dataset.vid = params.vids;
		    this.dataset.platform = params.platform;
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: "jsonp",
		      jsonpCallback: Txplayer.util.getJsonpCallbackName('getvinfo')
		    }).done(function(data){
		      if (!data) {
		        defer.reject();
		        return;
		      }
		      if (data && (data.em+'')==='85' && data.type===-3 && data.curTime) {
		        defer.reject({
		          code: -1,
		          svrtime: data.curTime
		        });
		        return;
		      }
		      var hlsUrls = that.getHlsFromData(data);
		      var hlsDefinitionList = that.getDefinitionListFromData(data);
		      var logoData = that.getLogoPositionFromData(data);
		      if (!(hlsUrls && hlsUrls.length)) {
		        defer.reject({
		          code: '10003',
		          msg: 'getvinfo 数据异常'
		        });
		        return;
		      }
		      defer.resolve(hlsUrls,hlsDefinitionList,logoData, data);
		    });
		    return defer;
		  },
		  // for tizen
		  // 从cgi data里获logo坐标数据
		  getLogoPositionFromData: function(data){
		    if ( data.s ==='o' &&
		      data.vl &&
		      data.vl.vi &&
		      $.type(data.vl.vi) === 'array' &&
		      data.vl.vi[0] &&
		      data.vl.vi[0].ll &&
		      data.vl.vi[0].ll.li &&
		      $.type(data.vl.vi[0].ll.li)==='array' &&
		      data.vl.vi[0].ll.li[0]
		    ) {
		      return data.vl.vi[0].ll.li[0];
		    }
		    return {};
		  },
		  // for tizen
		  // 从cgi data里获取清晰度列表
		  getDefinitionListFromData: function(data){
		    var list=[];
		    if ( data.s ==='o' &&
		      data.fl &&
		      data.fl.fi &&
		      $.type(data.fl.fi) === 'array' &&
		      data.fl.fi.length &&
		      data.fl.fi[0] ) {
		      for(var i=0, len = data.fl.fi.length; i<len; i++){
		        if (data.fl.fi[i].name in definitionMap) {
		          list.push({
		            name: data.fl.fi[i].name,
		            cname: data.fl.fi[i].cname,
		            sl: data.fl.fi[i].sl,
		            format: data.fl.fi[i].id,
		            lmt: data.fl.fi[i].lmt
		          });
		        }
		      }
		    }
		    return list;
		  },
	
	
		  // 从cgi数据里拼接hls地址
		  getHlsFromData: function(data){
		    var hls = [];
		    if (data.dltype===3 &&
		      data.s ==='o' &&
		      data.vl &&
		      data.vl.vi &&
		      data.vl.vi.length &&
		      data.vl.vi[0] &&
		      data.vl.vi[0].ul &&
		      data.vl.vi[0].ul.ui &&
		      data.vl.vi[0].ul.ui.length) {
		      $.each(data.vl.vi[0].ul.ui, function(idx, item){
		        if (item.url && item.hls && item.hls.pt) {
		          hls.push(item.url + item.hls.pt);
		        }
		      });
		    }
		    return hls;
		  },
		  // 检查getinfo的数据是否合法
		  /**
		   * 检查getinfo的数据是否合法
		   * @param  {Object} data getinfo返回的数据
		   * @return {Number}
		   *  1: ok
		   * -1: 鉴权重试
		   * -2: 不鉴权重试
		   */
		  checkGetInfoData: function(data){
		    if (!data) {
		      return false;
		    }
		    // 返回不正常
		    if (data && data.em !==0 && data.s !== 'o') {
		      // em=85,qq浏览器鉴权失败
		      if (data.em === 85 && data.type === -3) {
		        // auth retry
		        return -1;
		      }
		      // no auth retry
		      return -2;
		    }
		    return 1;
		  },
		  // 返回码错误整理
		  checkGetinfoRetCode: function(data){
		    // 返回码
		    // getinfo返回的结果详细说明见
		    // http://tapd.oa.com/v3/shiping_dev/wikis/view/getinfo
		    // 如果返回结果不是预期的合法数据
		    var vi, exVal, iRetCode=0;
		    if (!data || !data.s) {
		      iRetCode = 50;
		    } else if (data.s !== "o") {
		      iRetCode = data.em || 50;
		      exVal = data.exem;
		    } else if (!data.vl || !data.vl.vi || !$.isArray(data.vl.vi) || data.vl.cnt === 0) {
		      iRetCode = 68;
		    } else {
		      // TODO:多个视频vids需要循环做判断，现在这里只判断了一个视频
		      vi = data.vl.vi[0];
		    }
		    // 视频文件不可以播放，或者视频文件不允许访问，或者根本就没有播放地址，就告知62错误，表示视频状态不合法
		    // TODO:区分视频付费状态码
		    if (iRetCode === 0 && (vi.fst !== 5 || !$.isPlainObject(vi.ul) || !$.isArray(vi.ul.ui) || vi.ul.ui.length === 0)) {
		      iRetCode = 62; // 视频状态不合法
		    }
	
		    // 视频状态不对
		    else if (iRetCode === 0 && vi.st !== 2) {
		      if (vi.st != 8) {
		        iRetCode = 62; // 视频状态不合法
		      }
		      else {
		        iRetCode = 83;
		        exVal = vi.ch;
		      }
		    }
		    // iRetCode = 83
		    // QQ音乐活动
		    if (this.dataset.isQQMusicAuth && iRetCode === 83) {
		      exVal = -3;
		    }
		    // qq部落
		    if (Txplayer.util.isQQBuLuoHost()) {
		      exVal = 0;
		    }
		    return {
		      exVal: exVal,
		      iRetCode: iRetCode,
		      vi: vi
		    };
		  },
		  // 请求cgi获取手机端视频地址
		  getMobileVideoUrlByVid: function(options){
		    if (options.yyactid) this.dataset.isQQMusicAuth = true;
		    else  this.dataset.isQQMusicAuth = false;
		    var cfg = {
		      charge: 0,
		      vid: "",
		      defaultfmt: this.context.defn || "auto",
		      otype: "json",
		      platform: '11001',
		      sdtfrom: this.context.sdtfrom || '',
		      guid: this.context.guid,
		      host: window != top ? document.referrer : document.location.host
		    };
		    var params = $.extend(cfg, options);
		    var cgi = 'http://h5vv.video.qq.com/getinfo?callback=?';
		    if (location.protocol==='https:'){
		      cgi = 'https://sec.video.qq.com/p/h5vv.video/getinfo?callback=?';
		    }
		    if (params.cgi){
		      cgi = params.cgi;
		      delete params.cgi;
		    }
		    var qvData = qvsec.$xx(params.platform, params.vid, this.context.sdtfrom, 1);
		    if (qvData && qvData.u1 && qvData.u2 && qvData.c){
		      params['_qv_rmt'] = qvData.u1;
		      params['_qv_rmt2'] = qvData.u2;
		      util.cookie.set('qv_als', qvData.c)
		    }
		    var that = this;
		    var defer = $.Deferred();
		    this.dataset.videoFormat = params.fmt;
		    this.dataset.vid = params.vid;
		    this.dataset.platform = params.platform;
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: "jsonp",
		      jsonpCallback: Txplayer.util.getJsonpCallbackName('getinfo')
		    }).done(function(data){
		      var checkData = that.checkGetInfoData(data), checkCode, mp4Url;
		      if (checkData===1) {
		        checkCode = that.checkGetinfoRetCode(data);
		        if (checkCode.iRetCode===83) {
		          util.showInfo('付费信息', '当前视频需要付费观看,vid=' + params.vid);
		        }
		        else if ( checkCode.iRetCode!==0 ) {
		          Txplayer.util.error( checkCode.iRetCode );
		          defer.reject();
		          return;
		        }
		        mp4Url = that.getMobileVideoMp4Url({
		          path     : checkCode.vi.ul.ui[0].url,
		          fn       : checkCode.vi.fn,
		          vkey     : checkCode.vi.fvkey,
		          alias    : checkCode.vi.alias,
		          br       : checkCode.vi.br,
		          level    : checkCode.vi.level,
		          sha      : checkCode.vi.fsha,
		          platform : 2,
		          fmt      : that.dataset.videoFormat,
		          sdtfrom  : Txplayer.util.getStdfrom(),
		          vid      : that.dataset.vid
		        });
		        that.context.superMsg.broadcast(Txplayer.apiList.privateApi.reportGetinfo,{
		          filename: checkCode.vi.fn,
		          cdnIp: Txplayer.util.getHostNameByUrl(checkCode.vi.ul.ui[0].url),
		          cdnId: checkCode.vi.ul.ui[0].vt,
		          vkey: checkCode.vi.fvkey
		        });
		        defer.resolve(mp4Url, data);
		      }
		    });
		    return defer;
		  },
		  // 从cgi数据拼接手机端视频播放地址
		  getMobileVideoMp4Url: function(json){
		    json = json || {};
		    var videourl,
		      hasAlias = false;
		    if (json.alias && typeof json.fn == "string" && json.vid) {
		      json.fn = json.fn.replace(json.vid, json.alias);
		      hasAlias = true;
		    }
		    // if (typeof json.path == "string") {
		    //   json.path = json.path.replace(/\/\/(.+?)(\/|#|$|\?)/,function() {
		    //     if (arguments.length > 1) {
		    //       return arguments[0].replace(arguments[1], '');
		    //     }
		    //     return arguments[0];
		    //   });
		    // }
		    if (json["path"].indexOf('?') > -1) {
		      videourl = json["path"] + '&' + json["fn"] + '&' + [
		        "vkey=" + json.vkey,
		        "br=" + json["br"],
		        'platform=' + this.dataset.platform,
		        'fmt=' + json.fmt,
		        "&level=" + json.level,
		        "&sdtfrom=" + Txplayer.util.getStdfrom()
		      ].join('&');
		    } else {
		      videourl = json["path"] + json["fn"] + '?' + [
		        "vkey=" + json.vkey,
		        "br=" + json["br"],
		        'platform=' + this.dataset.platform,
		        'fmt=' + json.fmt,
		        "&level=" + json.level,
		        "&sdtfrom=" + Txplayer.util.getStdfrom()
		      ].join('&');
		    }
	
		    if (typeof json.sha==='string' && json.sha.length > 0) {
		      videourl += "&sha=" + json.sha;
		    }
		    if (hasAlias) {
		      videourl += "&vidalias=1";
		    }
		    return videourl;
		  },
		  // 从cgi数据拼接手机端视频播放地址
		  requestMobileVideoHlsUrl: function(options){
		    var cgi = 'http://info.zb.video.qq.com';
		    var defer = $.Deferred();
		    if (location.protocal==='https:') cgi = 'https://sec.video.qq.com/p/info.zb/video/';
		    var params = {
		      cnlid: options.vid,
		      host: util.getMainHostName(),
		      cmd: 2,
		      qq: util.getQQFromCookie(),
		      guid: encodeURIComponent(util.createGUID()),
		      txvjsv: '2.0',
		      stream: 2
		    };
		    var extData = {
		      debug: "",
		      ip: ""
		    };
		    $.each(extData, function(el) {
		      extData[el] = util.getUrlParam(el);
		    });
		    $.extend(params, extData);
		    if (util.os.windows) {
		      params.system = 0;
		    }
		    if (util.os.iphone || util.os.ipod) {
		      params.system = 1;
		      params.sdtfrom = 113;
		    }
		    if (util.os.ipad) {
		      params.sdtfrom = 213;
		    }
		    if (util.os.android) {
		      params.system = 2;
		      params.sdtfrom = 313;
		    }
		    if (util.os.mac) {
		      params.system = 3;
		    }
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: 'jsonp'
		    }).done(function(rs) {
		      if ( !(rs && rs.playurl) ) {
		        defer.reject(rs);
		        return;
		      }
		      defer.resolve(rs.playurl);
		    });
		    return defer;
		  },
	
	
		  // 从cgi数据拼接PC端视频播放地址
		  getPcVideoMp4Url: function(json){
		    var that = this;
		    var vl = json.vl,
		        vi = vl.vi,
		        vitem = vi[0],
		        videoMode,
		        list = [],
		        len = vitem.cl.fc,
		        filename = vitem.fn,
		        newFileName,
		        splitInfo;
		    // 没有分片信息
		    if (!vitem.cl.ci &&
		      vitem.fvkey &&
		      vitem.fn &&
		      vitem.ul &&
		      vitem.ul.ui &&
		      vitem.ul.ui.length
		    ) {
		      videoMode = {};
		      videoMode.vid = vitem.lnk;
		      videoMode.width = parseInt(vitem.vw);
		      videoMode.height = parseInt(vitem.vh);
		      videoMode.bytesTotal = parseInt(vitem.fs);
		      videoMode.byteRate = vitem.br;
		      videoMode.filename = vitem.fn;
		      newFileName = vitem.fn;
		      videoMode.newFileName = newFileName;
		      videoMode.fileNameSuffix = getSplitFileSuffixName(newFileName);
		      videoMode.urlArray = getInfoPath(vitem.ul, vitem.lnk, newFileName, videoMode.fileNameSuffix);
		      videoMode.vt = vitem.ul.ui[0].vt;
		      videoMode.duration = parseInt(vitem.td, 10);
		      list.push(videoMode);
		      return list;
		    }
		    if (!vitem.cl.ci || len !== vitem.cl.ci.length) {
		      return ;
		    }
	
		    for (var i = 0; i < len; i++) {
		      splitInfo = vitem.cl.ci[i];
		      videoMode = {};
		      videoMode.vid = vitem.lnk;
		      videoMode.width = parseInt(vitem.vw);
		      videoMode.height = parseInt(vitem.vh);
		      videoMode.bytesTotal = parseInt(splitInfo.cs);
		      videoMode.duration = parseInt(splitInfo.cd);
		      videoMode.byteRate = vitem.br;
		      videoMode.filename = vitem.fn;
		      newFileName = getSplitFileName(filename, i+1);
		      videoMode.newFileName = newFileName;
		      videoMode.fileNameSuffix = getSplitFileSuffixName(newFileName);
		      videoMode.urlArray = getInfoPath(vitem.ul, vitem.lnk, newFileName, videoMode.fileNameSuffix);
		      videoMode.vt = vitem.ul.ui[0].vt;
		      list.push(videoMode);
		    }
	
		    function getSplitFileName(filename, index){
		      if (index===0) return filename;
		      var idx = filename.lastIndexOf('.'),
		        str = filename.substr(0, idx) + '.' + index + filename.substring(idx);
		      return str;
		    }
	
		    function getSplitFileSuffixName(filename){
		      var idx = filename.indexOf('.'),
		        str = filename.substr(idx);
		      return str;
		    }
	
		    function getInfoPath(ul, vid, filename, fileSuffix){
		      var urlArray = [],
		        ui = {},
		        modeUrl = {},
		        len = ul.ui.length;
		      for(var i=0; i<len; i++){
		        ui = ul.ui[i];
		        modeUrl = {};
		        if (!ui.url) continue;
		        if ( ui.url && ui.url.indexOf(vid + '.flv')===-1 && ui.url.indexOf(vid+'.mp4')===-1 ){
		          modeUrl.url = ui.url + filename;
		        }else{
		          modeUrl.url = ui.url;
		        }
		        if (ui.vt) {
		          modeUrl.vt = parseInt(ui.vt);
		        }
		        // 计算sdtfrom
		        if ( modeUrl.url.indexOf('sdtfrom')===-1 ) {
		          if (modeUrl.url.indexOf('?')>-1) {
		            modeUrl.url += '&sdtfrom=' + Txplayer.util.getStdfrom();
		          }else{
		            modeUrl.url += '?sdtfrom=' + Txplayer.util.getStdfrom();
		          }
		          modeUrl.url += '&guid=' + that.context.guid;
		        }
		        urlArray.push(modeUrl);
		      }
		      return urlArray;
		    }
		    return list;
		  },
		  // 请求cgi获取视频的高清播放地址的播放列表
		  getHDVideoUrlByVid: function(options){
		    var cfg = {
		      isHLS: false,
		      charge: false,
		      vid: "",
		      defn: "auto",
		      defnpayver: 1,
		      otype: "json",
		      guid: this.context.guid,
		      platform: '10901',
		      sdtfrom: this.context.sdtfrom || '',
		      host: window != top ? document.referrer : document.location.host
		    };
		    var params = $.extend(cfg, options);
		    var cgi = 'http://h5vv.video.qq.com/getinfo?callback=?';
		    if (location.protocol==='https:'){
		      cgi = 'https://sec.video.qq.com/p/h5vv.video/getinfo?callback=?';
		    }
		    var qvData = qvsec.$xx(params.platform, params.vid, this.context.sdtfrom, 1);
		    if (qvData && qvData.u1 && qvData.u2 && qvData.c){
		      params['_qv_rmt'] = qvData.u1;
		      params['_qv_rmt2'] = qvData.u2;
		      util.cookie.set('qv_als', qvData.c)
		    }
		    var that = this;
		    var defer = $.Deferred();
		    this.dataset.videoFormat = params.defn;
		    this.dataset.vid = params.vid;
		    this.dataset.platform = params.platform;
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: "jsonp",
		      jsonpCallback: Txplayer.util.getJsonpCallbackName('getinfo')
		    }).done(function(data){
		      var checkData = that.checkGetInfoData(data), checkCode, sectionsData, firstSectionUrl;
		      if (checkData===1) {
		        checkCode = that.checkGetinfoRetCode(data);
		        if (checkCode.iRetCode===83) {
		          util.showInfo('付费信息', '当前视频需要付费观看,vid=' + params.vid);
		        }
		        else if ( checkCode.iRetCode!==0 ) {
		          Txplayer.util.error( checkCode.iRetCode );
		          defer.reject();
		          return;
		        }
		        sectionsData = that.getPcVideoMp4Url(data);
		        if ($.type(sectionsData)==='array' && sectionsData.length) firstSectionUrl = sectionsData[0].urlArray[0].url + '&vkey=' +checkCode.vi.fvkey + '&guid='+that.context.guid;
		        that.dataset.sectionsData = sectionsData;
		        that.dataset.firstSectionUrl = firstSectionUrl;
		        that.dataset.getinfoData = data;
		        that.dataset.definitionList = that.getDefinitionListFromData(data);
		        defer.resolve( firstSectionUrl, sectionsData, that.dataset.definitionList,data );
		        that.context.superMsg.broadcast(Txplayer.apiList.privateApi.reportGetinfo,{
		          filename: checkCode.vi.fn,
		          cdnIp: Txplayer.util.getHostNameByUrl(checkCode.vi.ul.ui[0].url),
		          cdnId: checkCode.vi.ul.ui[0].vt,
		          vkey: checkCode.vi.fvkey
		        });
		      }else{
		        defer.reject({
		          code: data.em
		        });
		      }
		    });
		    return defer;
		  },
		  // 请求cgi获取鉴权ckey
		  getHDVideoVkey: function(videoData){
		    var defer = $.Deferred(),
		      cgi = 'http://h5vv.video.qq.com/getkey?callback=?&';
		    if (location.protocol==='https:'){
		      cgi = 'https://sec.video.qq.com/p/h5vv.video/getkey?callback=?';
		    }
		    var params = {
		      "otype": "json",
		      "vid": videoData.vid,
		      "format": getSelectedFormat(this.dataset.getinfoData.fl.fi),
		      "filename": videoData.newFileName,
		      "platform": '10901',
		      "vt": videoData.vt,
		      "charge":videoData.isNeedPay ? 1 : 0,
		      "_rnd": (+new Date())
		    };
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: "jsonp",
		      jsonpCallback: Txplayer.util.getJsonpCallbackName('getkey')
		    }).done(function(data){
		      if (data && data.key) {
		        defer.resolve(data.key);
		      }else{
		        defer.reject(data);
		      }
		    }).fail(function(){
		      defer.reject({});
		    });
		    function getSelectedFormat(fi) {
		      for (var i = 0, len = fi.length; i < len; i++) {
		        if (fi[i].sl == 1) {
		          return fi[i].id;
		        }
		      }
		      return -1;
		    }
		    return defer;
		  },
		};
		module.exports = GetVideoInfo;
	
	/***/ },
	/* 16 */
	/***/ function(module, exports) {
	
		var Qvsec = {};
		Qvsec.ha = function(clss) {
		  var k = [],
		    i = 0;
		  for (; i < 64;) {
		    k[i] = 0 | (Math.abs(Math.sin(++i)) * 4294967296)
		  };
	
		  function add(x, y) {
		    return (((x >> 1) + (y >> 1)) << 1) + (x & 1) + (y & 1)
		  };
		  var calcSHA = function(str) {
		    var b, c, d, j, x = [],
		      str2 = window.unescape(encodeURI(str)),
		      a = str2.length,
		      h = [b = 1732584193, c = -271733879, ~b, ~c],
		      i = 0;
		    for (; i <= a;) x[i >> 2] |= (str2.charCodeAt(i) || 128) << 8 * (i++ % 4);
		    x[str = (a + 8 >> 6) * clss + 14] = a * 8;
		    i = 0;
		    for (; i < str; i += clss) {
		      a = h,
		        j = 0;
		      for (; j < 64;) {
		        a = [d = a[3], add(b = a[1], (d = add(add(a[0], [b & (c = a[2]) | ~b & d, d & b | ~d & c, b ^ c ^ d, c ^ (b | ~d)][a = j >> 4]), add(k[j], x[[j, 5 * j + 1, 3 * j + 5, 7 * j][a] % clss + i]))) << (a = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, clss, 23, 6, 10, 15, 21][4 * a + j++ % 4]) | d >>> 32 - a), b, c]
		      };
		      for (j = 4; j;) h[--j] = add(h[j], a[j])
		    };
		    str = '';
		    for (; j < 32;) str += ((h[j >> 3] >> ((1 ^ j++ & 7) * 4)) & 15).toString(clss);
		    return str;
		  };
		  return calcSHA
		}(16);
	
	
		Qvsec.stringToHex = function(s) {
		  var r = "";
		  var hexes = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
		  for (var i = 0; i < s.length; i++) {
		    r += hexes[s.charCodeAt(i) >> 4] + hexes[s.charCodeAt(i) & 0xf];
		  }
		  return r;
		}
	
		Qvsec.hexToString = function(h) {
		  var r = "";
		  for (var i = (h.substr(0, 2) == "0x") ? 2 : 0; i < h.length; i += 2) {
		    r += String.fromCharCode(parseInt(h.substr(i, 2), 16));
		  }
		  return r;
		}
	
		Qvsec._Seed = "#$#@#*ad";
	
		Qvsec.tempcalc = function(a, b) {
		  var r = "";
		  for (var i = 0; i < a.length; i++)
		    r += String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i % 4));
		  return r;
		}
	
		Qvsec.u1 = function(a, b) {
		  var r = "";
		  for (var i = b; i < a.length; i += 2)
		    r += a.charAt(i);
		  return r;
		}
	
		Qvsec._urlStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	
		Qvsec.urlenc = function(input, sts, ts) {
		  var output = "";
		  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		  var i = 0;
		  while (i < input.length) {
		    chr1 = input.charCodeAt(i++);
		    chr2 = input.charCodeAt(i++);
		    chr3 = input.charCodeAt(i++);
		    if (i == 15) {
		      output = output + 'A';
		      output = output + sts;
		      output = output + ts;
		    }
		    enc1 = chr1 >> 2;
		    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		    enc4 = chr3 & 63;
		    if (isNaN(chr2)) {
		      enc3 = enc4 = 64;
		    } else if (isNaN(chr3)) {
		      enc4 = 64;
		    }
		    output = output +
		      Qvsec._urlStr.charAt(enc1) + Qvsec._urlStr.charAt(enc2) +
		      Qvsec._urlStr.charAt(enc3) + Qvsec._urlStr.charAt(enc4);
		  }
		  return output;
		}
	
		Qvsec.$xx = function(plt, vid, std, sts) {
		  var ts = '' + Math.floor(new Date().valueOf() / 1000);
		  sts = ('' + sts).charAt(0);
		  var rf = '';
		  var ua = '';
		  var p = {
		    plt: plt || '',
		    vid: vid || '',
		    std: std || '',
		    sts: sts || '',
		    ts: ts,
		    rf: rf,
		    ua: ua
		  };
		  if (window.JSON)
		    p = JSON.stringify(p)
		  else
		    p = (function() {
		      var arr = []
		      for (var prop in p) {
		        arr.push('"' + prop + '":' + '"' + p[prop] + '"');
		      }
		      return '{' + arr.join(',') + '}'
		    })(p);
	
		  var result = Qvsec.hexToString(Qvsec.ha(plt + vid + ts + Qvsec._Seed + rf + ua + sts.charAt(0) + std));
		  var u = Qvsec.urlenc(Qvsec.tempcalc(result, Qvsec._Seed), sts.charAt(0), ts);
		  var c = Qvsec.urlenc(Qvsec.tempcalc(result, '86FG@hdf'), sts.charAt(0), ts);
		  var u1 = Qvsec.u1(u, 0);
		  var u2 = Qvsec.u1(u, 1);
		  return {
		    p: p,
		    u: u,
		    c: c,
		    u1: u1,
		    u2: u2,
		    t: ts
		  };
		};
		module.exports = Qvsec;
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var htmlstr = __webpack_require__(18);
		function TizenAuth(context){
		  this.context = context;
		  this.dataset = {};
		  this.msg = new Txplayer.Events();
		};
		TizenAuth.prototype = {
		  getVkey: function(options){
		    var that = this, defer = $.Deferred();
		    this.insertHTML();
		    this.dataset.vid = options.vid;
		    this.dataset.$getKeyDom.off('message').on('message', function(data){
		      defer.resolve(data);
		    });
		    if (this.dataset.isTizenKeyDomReady) {
		      this.getKeyByPostMsg(options.svrtime);
		    }else{
		      this.msg
		      // .off('getTizenKeyDomReady', this.getKeyByPostMsg)
		      .on('getTizenKeyDomReady', function(){
		        that.getKeyByPostMsg(options.svrtime);
		      });
		    }
		    return defer;
		  },
		  getKeyByPostMsg: function(svrTime){
		    var that = this;
		    var time = svrTime ? svrTime : parseInt((+new Date())/1000);
		    var code = [
		      that.dataset.vid, time, 'mac'
		    ].join(':');
		    this.dataset.getKeyDom.postMessage(code);
		  },
		  insertHTML: function(){
		    if (this.dataset.isInsertedHtml) return;
		    var that = this;
		    this.dataset.id = that.context.playerid+'_tizen_nacl';
		    var htmldata = $.tmpl(htmlstr, {
		      data: {
		        id: that.dataset.id,
		        path: 'newlib/Release/hello_tutorial_nexe.nmf'
		      }
		    });
		    $(document.body).append(htmldata);
		    this.dataset.isInsertedHtml = true;
		    this.dataset.$getKeyDom = $('#' + this.dataset.id);
		    this.dataset.getKeyDom = this.dataset.$getKeyDom.get(0);
		    this.addEventListener();
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.$getKeyDom.on('load', function(){
		      that.msg.emit('getTizenKeyDomReady');
		      that.dataset.isTizenKeyDomReady = true;
		    });
		  },
		}
	
	
		module.exports = TizenAuth;
	
	/***/ },
	/* 18 */
	/***/ function(module, exports) {
	
		module.exports = "<embed id=\"<%=data.id%>\" width=0 height=0 src=\"<%=data.path%>\" type=\"application/x-nacl\" />";
	
	/***/ },
	/* 19 */
	/***/ function(module, exports) {
	
		var playerstate = {
		  "unstarted" : -1,
		  "ended"     : 0,
		  "playing"   : 1,
		  "paused"    : 2,
		  "buffering" : 3,
		  "cued"      : 4,
		  "stop"      : 5
		};
	
		var definitionMap = {
		  'msd' : '流畅180P',
		  'sd'  : '标清270P',
		  'hd'  : '高清480P',
		  'shd' : '超清720P',
		  'fhd' : '蓝光1080P'
		};
	
		module.exports = {
		  playerstate   : playerstate,
		  definitionMap : definitionMap
		};
	
	/***/ },
	/* 20 */,
	/* 21 */,
	/* 22 */
	/***/ function(module, exports) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
	
		function HdHotKey(context) {
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		HdHotKey.prototype = {
		  init: function() {
		    this.dataset.$playermod = this.context.dataset.$playermod;
		    this.addEventListener();
		  },
		  remove: function(){
		    this.dataset.$playermod.off('keydown').off('keyup');
		  },
		  reportUsrAction: function(usr_action_detail){
		    this.context.msg.broadcast(api.privateApi.reportUsrAction, {
		      usr_action: 'press-key',
		      usr_action_detail: usr_action_detail
		    });
		  },
		  addEventListener: function() {
		    var that = this;
		    this.dataset.$playermod
		    .on('keydown',function(e) {
		      var volume, speed, speedInterval;
		      var isPlayingAd = that.context.msg.run(api.privateApi.isPlayingAd);
		      var isInDefineKey = false;
		      // 方向键上: 音量+
		      if(!e.shiftKey && e.keyCode === 38){
		        if (isPlayingAd) return;
		        e.preventDefault();
		        volume = that.context.msg.run(api.publicApi.getVolume) + 5;
		        if (volume>=100) volume=100;
		        that.context.msg.broadcast(api.publicApi.setVolume, volume);
		        that.reportUsrAction('38');
		        isInDefineKey = true;
		      }
		      // 方向键下: 音量-
		      else if(!e.shiftKey && e.keyCode === 40){
		        if (isPlayingAd) return;
		        e.preventDefault();
		        volume = that.context.msg.run(api.publicApi.getVolume) - 5;
		        if (volume<=0) volume=0;
		        that.context.msg.broadcast(api.publicApi.setVolume, volume);
		        that.reportUsrAction(e.keyCode);
		        isInDefineKey = true;
		      }
		      // (shift + ↑)方向键上: 播放速度+0.4
		      else if(e.shiftKey && e.keyCode === 38){
		        if (isPlayingAd) return;
		        speedInterval = 0.4;
		        speed = that.context.msg.run(api.publicApi.getPlaybackRate);
		        if (speed<=1) speedInterval = 0.1;
		        speed += speedInterval;
		        that.context.msg.run(api.publicApi.setPlaybackRate, speed);
		        that.reportUsrAction('shift+'+e.keyCode);
		        isInDefineKey = true;
		      }
		      // (shift + ↓)方向键下: 播放速度-0.1
		      else if(e.shiftKey && e.keyCode === 40){
		        if (isPlayingAd) return;
		        speedInterval = 0.4;
		        speed = that.context.msg.run(api.publicApi.getPlaybackRate);
		        if (speed<=1) speedInterval = 0.1;
		        speed -= speedInterval;
		        that.context.msg.run(api.publicApi.setPlaybackRate, speed);
		        that.reportUsrAction('shift+' + e.keyCode);
		        isInDefineKey = true;
		      }
		      // (shift + 0) 播放速度恢复正常
		      else if(e.shiftKey && e.keyCode === 48){
		        if (isPlayingAd) return;
		        that.context.msg.run(api.publicApi.setPlaybackRate, 1);
		        that.reportUsrAction('shift+' + e.keyCode);
		        isInDefineKey = true;
		      }
		      if (isInDefineKey){
		        return false;
		      }
		    })
		    .on('keyup', function(e){
		      var numKey = $.inArray(e.keyCode, [48,49,50,51,52,53,54,55,56,57,58]);
		      var currenttime;
		      var isInDefineKey = false;
		      // (K/Space) 播放 or 暂停
		      if ((!e.shiftKey && e.keyCode === 32) || (!e.shiftKey && e.keyCode === 75)) {
		        if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		        if (that.context.msg.run(api.publicApi.isPlaying)) {
		          that.context.msg.broadcast(api.publicApi.pause);
		          that.context.msg.broadcast(api.eventApi.onUserPausePlayer);
		        } else {
		          that.context.msg.broadcast(api.publicApi.play);
		        }
		        that.reportUsrAction(e.keyCode);
		        isInDefineKey = true;
		      }
		      // (→)方向右键: 前进5s
		      else if(!e.shiftKey && e.keyCode === 39){
		        currenttime = that.context.msg.run(api.publicApi.getCurrentTime);
		        that.context.msg.run(api.publicApi.seekTo, currenttime+5);
		        that.reportUsrAction(e.keyCode);
		        isInDefineKey = true;
		      }
		      // (←)方向左键: 后退5s
		      else if(!e.shiftKey && e.keyCode === 37){
		        currenttime = that.context.msg.run(api.publicApi.getCurrentTime);
		        that.context.msg.run(api.publicApi.seekTo, currenttime-5);
		        that.reportUsrAction(e.keyCode);
		        isInDefineKey = true;
		      }
		      // (J)
		      else if(!e.shiftKey && e.keyCode === 76){
		        currenttime = that.context.msg.run(api.publicApi.getCurrentTime);
		        that.context.msg.run(api.publicApi.seekTo, currenttime+10);
		        that.reportUsrAction(e.keyCode);
		        isInDefineKey = true;
		      }
		      // (L)
		      else if(!e.shiftKey && e.keyCode === 74){
		        currenttime = that.context.msg.run(api.publicApi.getCurrentTime);
		        that.context.msg.run(api.publicApi.seekTo, currenttime-10);
		        that.reportUsrAction(e.keyCode);
		        isInDefineKey = true;
		      }
		      // (M) 静音/取消静音
		      else if(!e.shiftKey && e.keyCode === 77){
		        if (that.context.msg.run(api.publicApi.isMuted)){
		          that.context.msg.run(api.publicApi.unMute);
		        }else{
		          that.context.msg.run(api.publicApi.mute);
		        }
		        that.reportUsrAction(e.keyCode);
		        isInDefineKey = true;
		      }
		      // (F)退出/进入全屏
		      else if (e.keyCode === 70 && !e.shiftKey){
		        that.context.msg.broadcast(api.publicApi.toggleWindowFullScreen);
		        that.reportUsrAction(e.keyCode);
		        isInDefineKey = true;
		      }
		      // (shift + F) : 进入浏览器全屏/退出浏览器全屏
		      else if (e.keyCode === 70 && e.shiftKey){
		        that.context.msg.broadcast(api.publicApi.toggleBrowserFullScreen);
		        that.reportUsrAction('shift+' + e.keyCode);
		        isInDefineKey = true;
		      }
		      // 0-9: player.seekTo('duration * n*10%')
		      else if(!e.shiftKey && numKey>-1){
		        if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		        var duration = that.context.msg.run(api.publicApi.getDuration);
		        var seekTime = (numKey*10/100) * duration;
		        if (duration){
		          that.context.msg.broadcast(api.publicApi.seekTo, parseInt(seekTime));
		        }
		        that.reportUsrAction(e.keyCode);
		        isInDefineKey = true;
		      }
		      // esc
		      else if(e.keyCode===27){
		        that.dataset.$playermod.trigger('blur');
		        if (that.context.msg.run(api.publicApi.isBrowserFullscreen)){
		          that.context.msg.broadcast(api.publicApi.exitBrowserFullscreen);
		        }
		        that.reportUsrAction(e.keyCode);
		      }
		      // V: open with v.qq.com
		      else if(!e.shiftKey && e.keyCode===86){
		        if (window.location.hostname!=='v.qq.com'){
		          that.context.msg.broadcast(api.privateApi.openAtTencentVideo);
		          that.reportUsrAction(e.keyCode);
		        }
		        isInDefineKey = true;
		      }
		      if (isInDefineKey){
		        return false;
		      }
		    })
		    .on('keypress',function(e) {
		      if (e.keyCode == 32) {
		        return false;
		      }
		    });
		  }
		};
	
		Txplayer.register('HdHotKey', HdHotKey);
	
	
	/***/ },
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * 高清视频+3Video
		 */
		var htmlstr         = __webpack_require__(24);
		var $               = Txplayer.$;
		var util            = Txplayer.util;
		var api             = Txplayer.apiList;
		var videoStatusMaps = {
		  IDLE: 1,
		  PLAY: 2,
		  PLAYING: 2.1,
		  PAUSE: 2.2,
		  LOCK: 2.2,
		  PRELOAD: 3,
		  PRELOADING: 3.1
		};
	
		function HdPlayer(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		HdPlayer.prototype = {
		  init: function(){
		    this.dataset.index =0;
		    this.dataset.playbackRate = 1;
		    if ( $.type(this.context.config.volume)==='string' && /^\d+$/.test(this.context.config.volume) ){
		      this.context.config.volume = parseInt(this.context.config.volume);
		    }
		    if ($.type(this.context.config.volume)!=='number' ||
		      this.context.config.volume > 100 || this.context.config.volume < 0) {
		      util.showError('播放器默认参数错误','volume必须为0-100的整数');
		      return;
		    }
		    this.playStateInit();
		    this.write();
		    this.loadSubPlugins();
		    this.resetVideoStatus();
		    this.setVolume(this.context.config.volume);
		  },
		  playStateInit: function(){
		    // -1（未开始）
		    // 0（已结束）
		    // 1（正在播放）
		    // 2（已暂停）
		    // 3（正在缓冲）
		    // this.dataset.playState = -1;
		    this.setPlayState(-1);
		  },
		  loadSubPlugins: function(){
		    var plugins = [];
		    var that = this;
		    if (this.context.pluginConfig &&
		      $.type(this.context.pluginConfig.subPlugins)==='array') {
		      plugins = this.context.pluginConfig.subPlugins.slice(0);
		    }
		    var context = {
		      'superMsg': this.context.msg,
		      'userMsg': this.context.userMsg,
		      'msg': this.msg,
		      '$mod': {
		        '$videomod': this.dataset.$videomod
		      }
		    };
		    util.loadPlugins(plugins, context);
		  },
		  write: function(){
		    this.dataset.hasVideoHtmlWrited = true;
		    this.context.dataset.$playermod.append(this.buildHTML());
		    this.dataset.$videomod = this.context.dataset.$playermod.find('[data-role="'+this.dataset.renderData.videomod+'"]');
		    this.dataset.$video = this.dataset.$videomod.find('video');
		    this.addEventListener();
		    this.exportsModuleApis();
		    this.context.userMsg.emit(api.eventApi.onWrite);
		  },
		  remove: function(){
		    this.dataset.$videomod.remove();
		  },
		  buildHTML: function(){
		    var that = this;
		    var renderData = {
		      videomod: 'txp-video-wrapper',
		      data:{
		        attrs: that.getAttrs().join(' '),
		        videoStyle: that.getVideoStyles()
		      }
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    return htmldata;
		  },
		  // 获取用户参数的video相关属性
		  getAttrs: function(){
		    var videoAttrMap = {
		      'isUseWebkitPlayinline'  : 'webkit-playsinline',
		      'isUseWebkitAirplay'     : 'x-webkit-airplay',
		      'isUseWebkitControl'     : 'controls="controls"',
		      'isUseWebkitPreload'     : ['preload="auto"', 'preload="none"'],
		      'muted'                  : 'muted',
		      // 'loop'                   : 'loop', // 兼容性不好
		      'isUseWebkitCrossOrigin' : 'crossOrigin="anonymous"'
		    };
		    var attrs = [];
		    for (var key in videoAttrMap) {
		      if (Txplayer.$.isArray(videoAttrMap[key])) {
		        if (this.context.config[key] === true) {
		          attrs.push(videoAttrMap[key][0]);
		        } else {
		          attrs.push(videoAttrMap[key][1]);
		        }
		      } else {
		        if (this.context.config[key] === true) {
		          attrs.push(videoAttrMap[key]);
		        }
		      }
		    }
		    return attrs;
		  },
		  getVideoStyles: function(){
		    var arr = [], that = this;
		    arr.push('background-color:#000');
		    arr.push('width:100%');
		    arr.push('height:100%');
		    return arr.join(';');
		  },
	
		  /*** 当前播放部分 ***/
		  // 获取当前显示的那个视频对象
		  getFocusVideoTag: function(){
		    var video;
		    this.dataset.$video.each(function(idx, videoTag){
		      if (videoTag.isFocus) {
		        video = videoTag;
		        return false;
		      }
		    });
		    return video;
		  },
		  // 获取当前显示的视频的缓冲进度
		  getFocusVideoBuffer: function(vd){
		    var video = vd || this.getFocusVideoTag();
		    if (!video || !video.buffered || !video.buffered.length) {
		      return 0;
		    }
		    return video.buffered.end(video.buffered.length-1);
		  },
		  // 设置当前显示的视频的url
		  setFocusVideoUrl: function(options){
		    if ($.type(options)==='string') {
		      options = {
		        url: options
		      };
		    }
		    options.preload = options.preload || true;
		    options.autoplay = options.autoplay || false;
		    var video = this.getFocusVideoTag();
		    var that = this;
		    var setUrlAndPlay = function(src){
		      if ($.type(options.updateIndex)==='number') that.dataset.index = options.updateIndex;
		      $(video).attr('src', src);
		      if(options.preload) {
		        video.pause();
		        // video.load();
		        try{
		          video.load();
		        }catch(e){
		          // 待上报
		          util.showInfo(e, e.stack);
		        }
		      }
		      // 设置播放时间点，使用setVideoPlayTime
		      if(options.currentTime) {
		        that.setVideoPlayTime(video, options.currentTime, options.autoplay);
		      }
		      // 直接开始播放
		      else if (options.autoplay) {
		        video.play();
		      }
		    };
		    if ($.type(options.url)==='string') {
		      setUrlAndPlay(options.url);
		    }
		    else if($.type(options.getUrlSync)==='function'){
		      options.getUrlSync()
		      .done(function(data){
		        that.dataset.requestPreloadUrlFail = false;
		        setUrlAndPlay(data);
		      })
		      .fail(function(err){
		        that.dataset.requestPreloadUrlFail = true;
		        that.context.msg.broadcast(api.eventApi.onVideoInterruptByError)
		      });
		    }
		    else{
		      util.error('setFocusVideoUrl参数错误, 找不到getUrlSync');
		    }
		  },
		  playTheNext: function(){
		    if (this.isTheLastOfPlayList()) return;
		    this.dataset.index++;
		    var data = this.dataset.playList[this.dataset.index];
		    data.autoplay = true;
		    this.setFocusVideoUrl(data);
		  },
		  clearFocusVideoUrl: function(){
		    var video = this.getFocusVideoTag();
		    video.pause();
		    video.src = '';
		    $(video).removeAttr('src');
		  },
		  // 判断当前显示的视频是否可以播放/是否有url
		  isFocusVideoReady: function(){
		    var video = this.getFocusVideoTag();
		    return !!(video && video.src);
		  },
		  // 执行当前显示的视频播放操作
		  setFocusVideoPlay: function(){
		    var video = this.getFocusVideoTag();
		    if (video.src) {
		      video.play();
		      video.status = videoStatusMaps.PLAYING;
		    }else{
		      util.error('play fail, video.src is null!');
		    }
		  },
		  // 执行当前显示的视频暂停操作
		  setFocusVideoPause: function(){
		    var video = this.getFocusVideoTag();
		    if (video.src) {
		      video.pause();
		      video.status = videoStatusMaps.PAUSE;
		    }else{
		      util.error('play fail, video.src is null!');
		    }
		  },
		  // 判断当前显示的视频是否缓冲完成
		  isFocusVideoBufferComplete: function(vd){
		    var video = vd || this.getFocusVideoTag();
		    var buffered = this.getFocusVideoBuffer(vd);
		    return video.duration === buffered;
		  },
		  // 兼容各个浏览器设置播放时间点
		  // firefox下，canplay没有触发，设置video.currentTime=xx会报如下错误：
		  // An attempt was made to use an object that is not, or is no longer, usable
		  setVideoPlayTime: function(video, time, autoplay){
		    autoplay = $.type(autoplay)==='undefined'?true:autoplay;
		    var isChrome = util.browser.chrome;
		    if (util.browser.chrome){
		      video.currentTime = time;
		      if (autoplay) video.play();
		      // video.currentTime = time;
		      $(video).one('canplay.setFocusVideoCurrentTime', function(){
		        video.currentTime = time;
		        video.play();
		      });
		    }else if (util.browser.firefox) {
		      try{
		        video.currentTime = time;
		        if (autoplay) video.play();
		      }catch(e){
		        $(video).one('canplay.setFocusVideoCurrentTime', function(){
		          video.currentTime = time;
		          video.play();
		        });
		      }
		    }
		    else {
		      $(video).one('canplay.setFocusVideoCurrentTime', function(){
		        video.currentTime = time;
		        video.play();
		      });
		    }
		  },
		  // 设置当前显示的视频的播放时间
		  setFocusVideoCurrentTime: function(time, autoplay){
		    var video = this.getFocusVideoTag();
		    var that = this;
		    if (time > video.duration) {
		      util.showError('setFocusVideoCurrentTime Error', 'time=' + time + ',duration=' + video.duration);
		      return;
		    }
		    this.setVideoPlayTime(video, time);
		  },
		  // 获取当前显示的视频的播放时间
		  getFocusVideoCurrentTime: function(){
		    var video = this.getFocusVideoTag();
		    return video.currentTime;
		  },
		  // 获取当前显示的视频的时长
		  getFocusVideoDuration: function(){
		    var video = this.getFocusVideoTag();
		    return video.duration;
		  },
		  getFocusVideoBufferedTime: function(){
		    var buffer = 0;
		    var video = this.getFocusVideoTag();
		    if ( !(video && video.buffered && video.buffered.length) ) return 0;
		    return video.buffered.end(video.buffered.length-1);
		  },
	
		  /*** 预加载部分 ***/
		  // 获取预加载的视频对象
		  getPreloadVideoTag: function(){
		    var focusVideo = this.getFocusVideoTag();
		    var videosCount = this.dataset.$video.length;
		    var idx = focusVideo.index;
		    var preloadVideo;
		    var that = this;
		    var findNext = function(){
		      idx ++;
		      if (idx > videosCount) idx=1;
		      return that.dataset.$video[idx-1];
		    };
		    preloadVideo = findNext();
		    if (!preloadVideo.isFocus && preloadVideo.status !== videoStatusMaps.LOCK) {
		      return preloadVideo;
		    }
		    preloadVideo = findNext();
		    if (!preloadVideo.isFocus && preloadVideo.status !== videoStatusMaps.LOCK) {
		      return preloadVideo;
		    }
		    preloadVideo = findNext();
		    if (!preloadVideo.isFocus && preloadVideo.status !== videoStatusMaps.LOCK) {
		      return preloadVideo;
		    }
		  },
		  // 判断预加载视频的视频状态
		  checkPreloadVideoStatus: function(){
		    var video = this.getPreloadVideoTag();
		    if (!video){
		      util.error('checkPreloadVideoStatus error: can not find preload video!');
		      return ;
		    }
		    return parseInt( video.status );
		  },
		  // 设置预加载视频的url并自动预加载
		  setPreloadVideoUrl: function(options){
		    var url, that = this;
		    var isArgumentsHasUrl = function(){
		      if ($.type(options)==='string') return true;
		      if ($.type(options)==='object' && options.url) return true;
		      return false;
		    };
		    if (this.isTheLastOfPlayList() && !isArgumentsHasUrl()) return;
		    options = options || {};
		    var video = this.getPreloadVideoTag();
		    var index = this.dataset.index + 1;
		    var setUrlAndPlay = function(src){
		      video.status = videoStatusMaps.PRELOAD;
		      $(video).attr('src', src);
		      video.pause();
		      // video.load();
		      try{
		        video.load();
		      }catch(e){
		        // 待上报
		        util.showInfo(e, e.stack);
		      }
		      if (options.autoplay) that.setPreloadVideoPlay();
		    };
		    url = options.url || this.dataset.playList[index];
		    if ($.type(url)==='string') {
		      setUrlAndPlay(url);
		    }
		    else if(url && url.url){
		      setUrlAndPlay(url.url);
		    }
		    else if($.type(url.getUrlSync)==='function'){
		      video.status = videoStatusMaps.PRELOADING;
		      url.getUrlSync()
		      .done(function(data){
		        that.dataset.requestPreloadUrlFail = false;
		        url.url = data;
		        setUrlAndPlay(data);
		      })
		      .fail(function(err){
		        that.dataset.requestPreloadUrlFail = true;
		      });
		    }
		  },
		  // 执行预加载视频的播放操作
		  setPreloadVideoPlay: function(options){
		    options = options || {};
		    var preloadVideo = this.getPreloadVideoTag();
		    var currentVideo = this.getFocusVideoTag();
		    var preloadCurrentTime = preloadVideo.currentTime;
		    if (!preloadVideo || !currentVideo) return;
		    if (!preloadVideo.src) {
		      util.error('播放失败：预加载的视频没找到播放地址');
		      return;
		    }
		    if (!preloadCurrentTime && options.currentTime){
		      preloadCurrentTime = options.currentTime;
		    }
	
		    preloadVideo.isFocus = true;
		    preloadVideo.status = videoStatusMaps.PLAYING;
		    if (options.reload) {
		      preloadVideo.pause();
		      // preloadVideo.load();
		      try{
		        preloadVideo.load();
		      }catch(e){
		        // 待上报
		        util.showInfo(e, e.stack);
		      }
		    }
		    if (preloadCurrentTime){
		      this.setVideoPlayTime(preloadVideo, preloadCurrentTime, true);
		    }
	
		    currentVideo.isFocus = false;
		    currentVideo.status = videoStatusMaps.IDLE;
		    currentVideo.pause();
		    // currentVideo.src = null;
		    // $(currentVideo).removeAttr('src');
		    try{
		      $(currentVideo).removeAttr('src');
		    }catch(e){
		      // 待上报
		      util.showInfo(e, e.stack);
		    }
		    if (!options.notNeedUpdateIndex) this.dataset.index ++;
		    this.updateVideoDisplay();
		  },
		  // 设置预加载视频和正在播放的视频保持currentTime同步
		  setPreloadVideoKeepSpaceToFocusVideo: function( cb ){
		    cb = cb || function(){};
		    var preloadVideo = this.getPreloadVideoTag(),
		      focusVideo = this.getFocusVideoTag(),
		      that = this;
		    var stopTimer = function(){
		      if (that.dataset.keepSpace_TIMER) {
		        clearInterval(that.dataset.keepSpace_TIMER);
		        that.dataset.keepSpace_TIMER = null;
		      }
		    };
		    var playPreloadVideo = function(){
		      that.setVideoPlayTime(preloadVideo, focusVideo.currentTime);
		      // 预加载的视频直接播放
		      that.setPreloadVideoPlay({
		        notNeedUpdateIndex: true,
		        reload: false
		      });
		      var hasSwitchDefinition = false;
		      var eventName = '.switch_definition_cb';
		      eventName = api.eventApi.onSectionPlaying + eventName;
		      that.context.msg.once(eventName, function(){
		        hasSwitchDefinition = true;
		        cb(true);
		      });
		      setTimeout(function(){
		        stopTimer();
		        if (hasSwitchDefinition) return;
		        that.context.msg.off(eventName);
		        cb(false);
		      },30000);
		    };
		    if (!focusVideo || !focusVideo.src) return;
		    stopTimer();
		    // 切换清晰度已经超时次数超过3次，暂停保证切换速度
		    if (Txplayer.dataset.switchDefinitionTimeout>=1){
		      playPreloadVideo();
		      return;
		    }
		    // 启动定时器，保持两个video播放时间同步
		    that.dataset.keepSpace_TIMER = setInterval(function(){
		      if (!preloadVideo || !preloadVideo.src) return;
		      if ( (focusVideo.duration - focusVideo.currentTime) < 5 && !focusVideo.paused ) {
		        focusVideo.pause();
		      }
		      that.setVideoPlayTime(preloadVideo, focusVideo.currentTime);
		      var bf = preloadVideo.buffered, len = preloadVideo.buffered.length;
		      // 足够播放4秒，开始切换清晰度分片
		      if (preloadVideo.buffered &&
		          preloadVideo.buffered.length &&
		          ( bf.end(len-1) - focusVideo.currentTime > 4)
		      ) {
		        that.setPreloadVideoPlay({notNeedUpdateIndex: true});
		        stopTimer();
		        cb(true);
		        // 切换清晰度超时标记-1
		        Txplayer.dataset.switchDefinitionTimeout -= 1;
		      }
		    }, 50);
		    //
		    // 尝试切换失败
		    var whenSwitchFail = function(errorMsg){
		      Txplayer.dataset.switchDefinitionTimeout ++;
		      util.showError('切换清晰度超时', errorMsg);
		      // 显示失败提示给用户
		      that.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: errorMsg,
		        time: 30
		      });
		      playPreloadVideo();
		    };
		    // 切换超时，失败处理
		    that.dataset.keepSpaceTimeout_TIMER = setTimeout(function(){
		      if (!that.dataset.keepSpace_TIMER) return;
		      // 切换清晰度超时标记+1
		      Txplayer.dataset.switchDefinitionTimeout += 1;
		      stopTimer();
		      var errorMsg;
		      if (!preloadVideo || !preloadVideo.src) {
		        errorMsg = '预加载的视频没有找到播放地址';
		        cb(errorMsg);
		      }else{
		        errorMsg = '切换清晰度失败，正在为您重试';
		        whenSwitchFail(errorMsg);
		      }
		    },30*1000);
		  },
	
		  /*** LOCK部分 ***/
		  getLockVideoTag: function(){
		    var video;
		    this.dataset.$video.each(function(idx, videoTag){
		      if (videoTag.status === videoStatusMaps.LOCK) {
		        video = videoTag;
		        return false;
		      }
		    });
		    return video;
		  },
		  lockAndPreloadNext: function(options){
		    options = options || {};
		    var focusVideo = this.getFocusVideoTag();
		    var preloadVideo = this.getPreloadVideoTag();
		    var that = this;
		    var index = this.dataset.index;
		    var msgKeyError = api.eventApi.onError + '.lockAndPreloadNext';
		    this.setPreloadVideoUrl();
		    this.dataset.index ++;
		    var switchLock = function(){
		      focusVideo.isFocus = false;
		      focusVideo.status = videoStatusMaps.LOCK;
		      focusVideo.pause();
		      preloadVideo.play();
		      preloadVideo.isFocus = true;
		      preloadVideo.status = videoStatusMaps.PLAYING;
		      that.updateVideoDisplay();
		      var msgKeyEnded = api.eventApi.onSectionEnded + '.lockAndPreloadNext';
		      var msgKeyPlaying = api.eventApi.onSectionPlaying + '.lockAndPreloadNext';
		      that.context.msg.on(msgKeyEnded, function(data){
		        if (data.playListTypeEnd && data.playListType) {
		          var lastPlayVideo = that.getFocusVideoTag();
		          that.context.msg.off(msgKeyEnded);
		          // 预加载的视频设置空闲状态
		          preloadVideo.isFocus = false;
		          preloadVideo.src = null;
		          $(preloadVideo).removeAttr('src');
		          preloadVideo.status = videoStatusMaps.IDLE;
	
		          // 最后播放的视频设置空闲状态
		          lastPlayVideo.isFocus = false;
		          lastPlayVideo.src = null;
		          $(lastPlayVideo).removeAttr('src');
		          lastPlayVideo.status = videoStatusMaps.IDLE;
	
		          // lock住的视频设置继续聚焦并继续播放
		          focusVideo.isFocus = true;
		          focusVideo.status = videoStatusMaps.PLAYING;
		          that.updateVideoDisplay();
		          var msgKeyUnlock = api.eventApi.onSectionPlaying + '.lockAndPreloadNext_unlock';
		          that.context.msg.once(msgKeyUnlock, function(){
		            that.dataset.disablePreload = false;
		          });
		          focusVideo.play();
		          that.dataset.index = index;
		        }
		      });
		      that.context.msg.on(msgKeyPlaying, function(){
		        var isLast = that.isTheLastOfPlayList(that.getCurrentType())
		        if (isLast) {
		          that.dataset.disablePreload = true;
		          that.context.msg.off(msgKeyPlaying);
		        }
		      });
		    };
		    // 广告播放失败
		    that.context.msg.once(msgKeyError, function(){
		      that.dataset.index = index;
		    });
		    this.dataset.lockPreload_TIMER = setInterval(function(){
		      if ( !(preloadVideo.buffered && preloadVideo.buffered.length) ) return;
		      var len = preloadVideo.buffered.length;
		      if (preloadVideo.buffered.end(len-1) > 1) {
		        switchLock();
		        clearInterval(that.dataset.lockPreload_TIMER);
		      }
		    },200);
		  },
	
		  /*** 视频时序控制部分 ***/
		  isTheLastOfPlayList: function(type){
		    if (!this.dataset.playList || this.dataset.playList.length===0) {
		      return true;
		    }
		    var maxLength = this.dataset.playList.length;
		    var index = this.dataset.index;
		    if (type) {
		      var currentMaxLength = this.calcTotalPlaylist(type);
		      var currentIndex = this.getPlayListIndex(type);
		      return (currentIndex+1) >= currentMaxLength;
		    }
		    return (index+1) >= maxLength;
		  },
		  // 计算（某类）播放列表总数
		  calcTotalPlaylist: function(type){
		    if (!type) return this.dataset.playList.length;
		    var count = 0;
		    $(this.dataset.playList).each(function(idx, item){
		      if (item.type===type) count++;
		    });
		    return count;
		  },
		  // 清空（某类）播放列表
		  clearPlaylist: function(type){
		    if (!type) this.dataset.playList = [];
		    var tmp = [];
		    var currentList = this.dataset.playList[ this.dataset.index ];
		    var newIndex = this.dataset.index;
		    $(this.dataset.playList).each(function(idx, item){
		      if (item.type===type) return;
		      tmp.push(item);
		      if (item===currentList) newIndex = tmp.length-1;
		    });
		    this.dataset.playList = tmp;
		    if (!type) {
		      this.dataset.index = 0;
		    }else{
		      this.dataset.index = newIndex;
		    }
		  },
		  // 获取（某类）播放列表当前索引
		  getPlayListIndex: function(type){
		    var count = 0, that = this;
		    if (type) {
		      $(that.dataset.playList).each(function(idx, item){
		        if (that.dataset.index===idx) return false;
		        if (item.type===type) return;
		        count ++;
		      });
		    }
		    return that.dataset.index - count;
		  },
		  // 获取当前播放的类型
		  getCurrentType: function(){
		    if (!this.dataset.playList) return;
		    var data = this.dataset.playList[this.dataset.index];
		    return data && data.type;
		  },
		  // 重置视频的默认初始状态
		  resetVideoStatus: function(){
		    this.dataset.$video.each(function(idx, videoTag){
		      videoTag.index = idx;
		      if (idx===2) {
		        videoTag.isFocus = true;
		      }else{
		        videoTag.isFocus = false;
		      }
		      videoTag.status = videoStatusMaps.IDLE;
		    });
		    this.updateVideoDisplay();
		  },
		  // 更新多个视频的交替显示和隐藏
		  updateVideoDisplay: function(){
		    this.dataset.$video.each(function(idx, videoTag){
		      if (videoTag.isFocus) videoTag.style.display = 'block';
		      else videoTag.style.display = 'none';
		    });
		  },
		  // 是否正在播放
		  isPlaying: function(){
		    var video = this.getFocusVideoTag();
		    return !video.paused;
		  },
	
		  /*** 视频操作相关 ***/
	
		  // 播放
		  play: function(options){
		    if (!this.dataset.playList || !this.dataset.playList.length) {
		      util.error('can not find urls data, please addURLSData first!');
		      return;
		    }
		    if (options && $.type(options.updateIndex)==='number') this.dataset.index = options.updateIndex;
		    if ($.type(options)!=='undefined') {
		      if ($.type(options)==='string') {
		        options = {
		          url: options,
		          autoplay: true
		        };
		      }
		      this.setFocusVideoUrl(options);
		    }else if (!this.isFocusVideoReady()) {
		      var data = this.dataset.playList[ this.dataset.index ];
		      data.autoplay = true;
		      this.setFocusVideoUrl(data);
		    }
		  },
		  // 设置音量
		  setVolume: function(volume){
		    if (isNaN(volume) || $.type(volume)!=='number' || (volume > 100 && volume < 0) ) {
		      util.showError('getVolume失败','player.setVolume(volume),volume必须为0-100的整数');
		      return;
		    }
		    if (volume===this.dataset.volume) return;
		    this.unMute();
		    this.dataset.$video.each(function(idx, vd){
		      vd.volume = volume/100;
		    });
		    this.dataset.volume = volume;
		    // 初始化不触发音量变化事件
		    if ($.type(this.dataset.volume)!=='undefined') {
		      this.context.msg.broadcast(api.eventApi.onVolumeChange, volume);
		      this.context.userMsg.broadcast(api.eventApi.onVolumeChange, volume);
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '当前音量: <a>' + this.dataset.volume + '</a>',
		        time: 3,
		        hideClose: true
		      });
		    }
		  },
		  // 获取音量
		  getVolume: function(){
		    return this.dataset.volume;
		  },
		  // 静音
		  mute: function(options){
		    options = options || {};
		    if (!options.hasOwnProperty('showTips')) options.showTips = true;
		    this.dataset.$video.each(function(idx, vd){
		      vd.muted = true;
		    });
		    this.dataset.muted = true;
		    this.context.userMsg.broadcast(api.eventApi.onVolumeChange, 0);
		    this.context.msg.broadcast(api.eventApi.onVolumeChange, 0);
		    if (options.showTips){
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '视频静音',
		        time: 2,
		        hideClose: true
		      });
		    }
		  },
		  // 取消静音
		  unMute: function(options){
		    options = options || {};
		    if (!options.hasOwnProperty('showTips')) options.showTips = true;
		    this.dataset.$video.each(function(idx, vd){
		      vd.muted = false;
		    });
		    this.dataset.muted = false;
		    this.context.userMsg.broadcast(api.eventApi.onVolumeChange, this.dataset.volume);
		    this.context.msg.broadcast(api.eventApi.onVolumeChange, this.dataset.volume);
		    if (options.showTips){
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '取消视频静音',
		        time: 2,
		        hideClose: true
		      });
		    }
		  },
		  // 获取视频的封面图
		  getVideoPoster: function(){
		    return this.dataset.poster;
		  },
		  // 设置视频播放状态
		  setPlayState: function(state){
		    // 0: 已结束
		    // 1: 正在播放
		    // 2: 暂停
		    // 3: 缓冲中
		    if ($.type(state)!=='number') return;
		    if (state===this.dataset.playState) return;
		    this.dataset.playState = state;
		    this.context.userMsg.broadcast(api.eventApi.onPlayStateChange, {
		      state: state,
		      vid: this.context.msg.run(api.publicApi.getVid)
		    });
		  },
		  // 获取视频播放状态
		  getPlayState: function(){
		    return this.dataset.playState;
		  },
		  // 设置播放速度
		  setPlaybackRate: function(speed){
		    if (speed>=4) {
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '播放速度已经达到最高值',
		        time: 3,
		        hideClose: true
		      });
		      return;
		    }
		    if (speed <=0.4) {
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '播放速度已经达到最低值',
		        time: 3,
		        hideClose: true
		      });
		      return;
		    }
		    if (this.dataset.playbackRate!==speed){
		      speed = Math.round(speed*10)/10;
		      this.setVideoPlaybackRate(speed);
		      this.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '当前播放速度:<a>' + speed + '</a>',
		        time: 3,
		        hideClose: true
		      });
		      this.dataset.playbackRate = speed;
		      this.context.userMsg.broadcast(api.eventApi.onPlaybackRateChange, 0);
		      this.context.msg.broadcast(api.eventApi.onPlaybackRateChange, 0);
		    }
		  },
		  setVideoPlaybackRate: function(speed){
		    this.dataset.$video.each(function(idx, vd){
		      vd.playbackRate = speed;
		    });
		  },
		  getPlaybackRate: function(){
		    return this.dataset.playbackRate;
		  },
		  resetPlaybackRate: function(){
		    this.setPlaybackRate(1);
		  },
		  getFileInfoBySrc: function(src){
		    if (!this.dataset.fileSizeMap) this.dataset.fileSizeMap = {};
		    if (this.dataset.fileSizeMap[src]) return this.dataset.fileSizeMap[src];
		    var that = this;
		    $(this.dataset.playList).each(function(idx, item){
		      if (item.url === src){
		        if (item && item.data && item.data.bytesTotal){
		          that.dataset.fileSizeMap[src] = {
		            type: item.type,
		            index: idx,
		            filesize: parseInt(item.data.bytesTotal/1024)
		          };
		        }
		        return false;
		      }
		    });
		    return this.dataset.fileSizeMap[src];
		  },
	
		  calcDownloadSpeed: function(){
		    var that = this;
		    var bufferData = {};
		    var speedData = {};
		    var speedResult = {};
		    var calcSpeed = function(list, src){
		      if (list.length<2) return;
		      var start = list[list.length-2],
		        end = list[list.length-1];
		      if (!end.filesize) return;
		      if (start.filesize!==end.filesize || start.duration !== end.duration) return;
		      if (end.time === start.time) return;
		      var timeLoaded = end.buffered - start.buffered;
		      var timeInterval = (end.time - start.time)/1000;
		      var per = timeLoaded / end.duration;
		      var fileSizeLoaded = per * end.filesize;
		      var speed = fileSizeLoaded / timeInterval;
		      speed = parseInt(speed*10)/10;
		      if ($.type(speed)==='number' && !isNaN(speed)){
		        pushSpeed({
		          src: src,
		          speed: speed
		        });
		      }
		    };
		    var pushData = function(data){
		      if ( !data || !data.src) return;
		      if (!bufferData[data.src]) bufferData[data.src] = [];
		      bufferData[data.src].push(data);
		    };
		    var pushSpeed = function(data){
		      if ( !data || !data.src) return;
		      if (!speedData[data.src]) speedData[data.src]=[];
		      speedData[data.src].push(data.speed);
		    };
		    var calcAverageSpeed = function(src){
		      if (!src || $.type(speedData[src])!=='array' || !speedData[src].length) return;
		      if (speedResult[src]) return;
		      var list = speedData[src];
		      var sum = 0;
		      var maxSpeed = -1;
		      var minSpeed = -1;
		      var averageSpeed;
		      var info = that.getFileInfoBySrc(src);
		      var index = 0;
		      $(that.dataset.playList).each(function(idx, item){
		        if (item.type!==info.type) return;
		        if (item.url === src) return false;
		        index ++;
		      });
		      $(speedData[src]).each(function(idx, val){
		        sum += val;
		        if (minSpeed===-1) minSpeed = val;
		        if (maxSpeed===-1) maxSpeed = val;
		        if (val < minSpeed) minSpeed = val;
		        if (val > maxSpeed) maxSpeed = val;
		      });
		      averageSpeed = parseInt(sum*10 / speedData[src].length)/10;
		      speedResult[src] = {
		        name: info.type+'_'+index,
		        maxSpeed: maxSpeed,
		        minSpeed: minSpeed,
		        averageSpeed: averageSpeed,
		        playListType: info.type,
		        index: that.getPlayListIndex(that.getCurrentType())
		      };
		      util.showInfo('加载完成，速度统计', JSON.stringify(speedResult[src]));
		      speedData[src] = null;
		      bufferData[src] = null;
		      delete speedData[src];
		      delete bufferData[src];
		      that.context.msg.broadcast(api.eventApi.onSectionBufferEnd,speedResult[src]);
		    };
		    this.dataset.$video.on('progress', function(){
		      var buffered = this.buffered;
		      if (!buffered.length) return;
		      var info = that.getFileInfoBySrc(this.src);
		      if (!info) {
		        return;
		      }
		      pushData({
		        time: (+ new Date()),
		        filesize: info.filesize,
		        type: info.type,
		        src: this.src,
		        buffered: this.buffered.end(this.buffered.length-1),
		        duration: this.duration
		      });
		      calcSpeed( bufferData[this.src], this.src );
		    });
		    this.dataset.$video.on('timeupdate', function(){
		      if (!this.isFocus) return;
		      var buffered = this.buffered;
		      if (!buffered.length) return;
		      // 缓冲完成 计算平均速度
		      if (buffered.end( buffered.length -1) === this.duration){
		        calcAverageSpeed(this.src);
		      }
		    });
		  },
		  startWaitingFinder: function(video){
		    if (this.dataset.waitingFinder_TIMER) return;
		    if (!video || video.paused) return;
		    var prevTime;
		    var that = this;
		    this.dataset.waitingFinder_TIMER = setInterval(function(){
		      // 暂停不计
		      if (video.paused) return;
		      // 播放结束不计
		      if (video.ended) return;
		      if (prevTime===video.currentTime) {
		        if (that.dataset.isBadNetWork) return;
		        util.showInfo('onNetworkBadStart','');
		        that.context.msg.broadcast(api.eventApi.onNetworkBadStart,{
		          videoTag: video,
		          playListType: that.getCurrentType(),
		          isOnWaiting: that.getPlayState()===3,
		          index: that.getPlayListIndex(that.getCurrentType())
		        });
		        that.dataset.isBadNetWork = true;
		      }else{
		        if (that.dataset.isBadNetWork){
		          util.showInfo('onNetworkBadEnd','');
		          that.context.msg.broadcast(api.eventApi.onNetworkBadEnd,{
		            videoTag: video,
		            playListType: that.getCurrentType(),
		            index: that.getPlayListIndex(that.getCurrentType())
		          });
		          // that.stopWaitingFinder();
		        }
		        that.dataset.isBadNetWork = false;
		      }
		      prevTime = video.currentTime;
		    },1500);
		  },
		  stopWaitingFinder: function(){
		    if (!this.dataset.waitingFinder_TIMER) return;
		    clearInterval(this.dataset.waitingFinder_TIMER);
		    this.dataset.waitingFinder_TIMER = null;
		  },
	
	
		  // 添加事件监听
		  addEventListener: function(){
		    this.calcDownloadSpeed();
		    var that = this, prevCurrentTime=-1, prevBuffered = 0;
		    this.dataset.$video
		    .on('canplay', function(){
		      that.context.msg.broadcast(api.eventApi.onSectionCanplay, this);
		    })
		    .on('play', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionPlay, {
		        videoTag: this,
		        playListType: that.getCurrentType(),
		        index: that.getPlayListIndex(that.getCurrentType())
		      });
		      var info = that.getFileInfoBySrc(this.src);
		    })
		    .on('playing', function(){
		      if (!this.isFocus) return;
		      that.startWaitingFinder(this);
		      if (that.getCurrentType()==='film') that.setPlayState(1);
		      var type = that.getCurrentType();
		      that.context.msg.broadcast(api.eventApi.onSectionPlaying, {
		        videoTag: this,
		        playListType: type,
		        index: that.getPlayListIndex(that.getCurrentType())
		      });
		      if (type==='film'){
		        that.setVideoPlaybackRate(that.dataset.playbackRate);
		      }
		    })
		    .on('progress', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionProgress, {
		        videoTag: this
		      });
		      if (this.buffered && this.buffered.length) {
		        if (this.buffered.end(this.buffered.length-1) === this.duration &&
		          // 缓冲完成了还在触发，这里做下去重
		          prevBuffered !==this.buffered.end(this.buffered.length-1)
		        ){
		          prevBuffered =this.buffered.end(this.buffered.length-1);
		          var info = that.getFileInfoBySrc(this.src);
		          info && util.showInfo('缓冲完成', info.type+'_'+info.index+' '+util.dateFormat());
		        }
		      }
		    })
		    .on('pause', function(){
		      if (!this.isFocus) return;
		      // that.stopWaitingFinder();
		      that.context.msg.broadcast(api.eventApi.onSectionPause, {
		        videoTag: this,
		        playListType: that.getCurrentType()
		      });
		      if (that.getCurrentType()==='film' && !this.ended) {
		        that.setPlayState(2);
		      }
		    })
		    .on('timeupdate', function(){
		      if (!this.isFocus) return;
		      that.startWaitingFinder(this);
		      var currentTime = parseInt(this.currentTime);
		      var type = that.getCurrentType();
		      // 1s内只触发一次，节约性能好
		      if (currentTime!==prevCurrentTime) {
		        that.context.msg.broadcast(api.eventApi.onSectionTimeupdate, {
		          videoTag: this,
		          playListType: type
		        });
		        if ( type==='film' ){
		          that.context.userMsg.broadcast(api.eventApi.onTimeUpdate, {
		            videoTag: this
		          });
		        }
		        prevCurrentTime = currentTime;
		      }
		      // 禁用预加载
		      if (that.dataset.disablePreload) return;
		      // 最后15秒开始预加载
		      if ((this.duration - this.currentTime) > 15) return;
		      if (that.isTheLastOfPlayList()) return;
		      if ( that.isFocusVideoBufferComplete() ) {
		        if (parseInt(that.checkPreloadVideoStatus()) === videoStatusMaps.PRELOAD) {
		          return;
		        }else{
		          that.setPreloadVideoUrl();
		        }
		      }
		    })
		    .on('ended', function(){
		      if (!this.isFocus) return;
		      that.stopWaitingFinder();
		      var type = that.getCurrentType();
		      // 首先触发statechange
		      if (type==='film'){
		        that.setPlayState(0);
		      }
		      // 再广播视频播放结束
		      that.context.msg.broadcast(api.eventApi.onSectionEnded, {
		        videoTag: this,
		        index: that.getPlayListIndex(type),
		        playListType: type,
		        isAllEnd: that.isTheLastOfPlayList(),
		        playListTypeEnd: that.isTheLastOfPlayList( type )
		      });
		      if (that.dataset.disablePreload) return;
	
		      // 播放结束，执行播放或者预加载
		      if (that.isTheLastOfPlayList()) return;
		      if (that.checkPreloadVideoStatus() === videoStatusMaps.PRELOAD) {
		        if (that.dataset.requestPreloadUrlFail){
		          that.context.msg.broadcast(api.eventApi.onVideoInterruptByError);
		        }else{
		          that.setPreloadVideoPlay();
		        }
		        return;
		      }else{
		        that.setPreloadVideoUrl({autoplay: true});
		      }
		    })
		    .on('error', function(e){
		      if (!this.isFocus) return;
		      var hasRetry = false;
		      var currentTime = this.currentTime;
		      if (!that.dataset.errorRetryTimes) that.dataset.errorRetryTimes = 0;
		      that.dataset.errorRetryTimes ++;
		      if (that.dataset.errorRetryTimes>5){
		        hasRetry = true;
		        delete that.dataset.errorRetryTimes;
		      }else{
		        this.pause();
		        try{
		          this.load();
		        }catch(e){
		          // 待上报
		          util.showInfo(e, e.stack);
		        }
		        that.setVideoPlayTime(this, currentTime, true);
		        // this.play();
		      }
		      if (!hasRetry) return;
		      var err = {};
		      var errMaps = {
		        1: 'MEDIA_ERR_ABORTED[取回过程被用户中止]',
		        2: 'MEDIA_ERR_NETWORK[当下载时发生错误]',
		        3: 'MEDIA_ERR_DECODE[当解码时发生错误]',
		        4: 'MEDIA_ERR_SRC_NOT_SUPPORTED[不支持音频/视频]'
		      };
		      if (this && this.error) {
		        err.code = this.error.code;
		        err.msg = errMaps[err.code];
		      }
		      err.type = that.getCurrentType();
		      err.videoTag = this;
		      that.context.msg.broadcast(api.eventApi.onError,err);
		      that.context.userMsg.broadcast(api.eventApi.onError, err);
	
		      var errCode = 3000 + err.code, stack = [];
		      stack = [
		        'videoType:' + err.type,
		        'videoSrc:' + this.src
		      ];
		      that.context.msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		        msg: err.msg,
		        code: errCode,
		        stack: stack.join('\n')
		      });
		    })
		    .on('waiting', function(){
		      if (!this.isFocus) return;
		      util.showInfo('$video wating', {
		        time: +new Date(),
		        isPlaying: !this.paused,
		        seeking: this.seeking
		      });
		      that.context.msg.broadcast(api.eventApi.onSectionWaiting,{
		        videoTag: this,
		        index: that.getPlayListIndex(that.getCurrentType()),
		        playListType: that.getCurrentType(),
		        seeking: this.seeking
		      });
		      if (that.getCurrentType()==='film') that.setPlayState(3);
		    })
		    .on('loadstart', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionLoadstart);
		    })
		    .on('seeking', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionSeeking);
		    })
		    .on('seeked', function(){
		      if (!this.isFocus) return;
		      that.context.msg.broadcast(api.eventApi.onSectionSeeked);
		    })
	
		    // add Data
		    this.context.msg.on(api.privateApi.addUrls2Player, function(param, options){
		      var data = {};
		      if ($.type(param)==='array') data.data = param;
		      if ($.type(param)==='object' && $.type(param.data)==='array') data = param;
		      if ($.type(data.data)!=='array') {
		        util.error('addUrls2Player 参数错误');
		        return;
		      }
		      if (!that.dataset.playList || data.clear) {
		        that.dataset.playList = [];
		        that.dataset.index = 0;
		      }
		      if (data.data && data.type && data.repalcePlayList===true) {
		        if (data.data.length === that.calcTotalPlaylist(data.type)) {
		          var realIndex = 0;
		          $(that.dataset.playList).each(function(idx, item){
		            if (item.type!==data.type) return;
		            that.dataset.playList[idx] = data.data[realIndex];
		            realIndex ++;
		          });
		        }
		      }else if(data.data && data.type && data.hasOwnProperty('startIndex')){
		        that.dataset.playList = util.insert2Array(data.data, data.startIndex, that.dataset.playList);
		      }else{
		        that.dataset.playList = that.dataset.playList.concat(data.data);
		      }
		    });
		    this.context.msg.on(api.eventApi.onSectionEnded, function(data){
		      // 全部播放完成，重置index
		      if (data.isAllEnd){
		        that.dataset.index = 0;
		      }
		    });
		    this.context.msg.on(api.privateApi.clearPlaylist, function(data, options){
		      that.clearPlaylist(data);
		    });
		    this.context.msg.on(api.privateApi.lockAndPreloadNext, function(data){
		      that.lockAndPreloadNext(data);
		    });
		    this.context.msg.on(api.privateApi.getCurrentPlayListType, function(data, options){
		      options.data = that.getCurrentType();
		    });
		    this.context.msg.on(api.privateApi.isTheLastOfPlayList, function(data, options){
		      options.data = that.isTheLastOfPlayList(data);
		    });
		    this.context.msg.on(api.privateApi.clearFocusVideoUrl, function(data, options){
		      that.clearFocusVideoUrl();
		    });
		    this.context.msg.on(api.eventApi.beforeVideoPlay, function(data, options){
		      that.setPlayState(-1);
		    });
		  },
		  // 对外提供的接口
		  exportsModuleApis: function(){
		    var that = this;
		    // 用户API
		    this.dataset.moduleApis = {};
		    this.dataset.moduleApis[api.publicApi.mute] = function(data, options){
		      that.mute(data);
		    };
		    this.dataset.moduleApis[api.publicApi.unMute] = function(data, options){
		      that.unMute(data);
		    };
		    this.dataset.moduleApis[api.publicApi.isMuted] = function(data, options){
		      options.data = !!that.dataset.muted;
		    };
		    this.dataset.moduleApis[api.publicApi.getPlayerState] = function(data, options){
		      options.data = that.getPlayState();
		    };
		    this.dataset.moduleApis[api.publicApi.isPlaying] = function(data, options){
		      options.data = that.isPlaying();
		    };
		    this.dataset.moduleApis[api.publicApi.getPoster] = function(data, options){
		      options.data = that.getVideoPoster();
		    };
		    this.dataset.moduleApis[api.publicApi.setVolume] = function(data, options){
		      that.setVolume(data);
		    };
		    this.dataset.moduleApis[api.publicApi.getVolume] = function(data, options){
		      options.data = that.getVolume(data);
		    };
		    this.dataset.moduleApis[api.publicApi.setPlaybackRate] = function(data, options){
		      that.setPlaybackRate(data);
		    };
		    this.dataset.moduleApis[api.publicApi.getPlaybackRate] = function(data, options){
		      options.data = that.getPlaybackRate();
		    };
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
	
		    // 私有API
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.play] = function(data, options){
		      that.play(data);
		    };
		    this.dataset.privateApis[api.privateApi.getPlayListIndex] = function(data, options){
		      options.data = that.getPlayListIndex(data);
		    };
		    this.dataset.privateApis[api.privateApi.setPreloadVideoUrl] = function(data, options){
		      if (!data) return;
		      that.setPreloadVideoUrl({
		        url: data
		      });
		    };
		    this.dataset.privateApis[api.privateApi.setPreloadVideoKeepSpaceToFocusVideo] = function(data, options){
		      options.async = $.Deferred();
		      that.setPreloadVideoKeepSpaceToFocusVideo(function(isSuccess){
		        if (isSuccess===true) {
		          options.async.resolve();
		        } else {
		          options.async.reject(isSuccess);
		        }
		      });
		    };
		    this.dataset.privateApis[api.privateApi.getFocusVideoCurrentTime] = function(data, options){
		      options.data = that.getFocusVideoCurrentTime();
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoCurrentTime] = function(data, options){
		      that.setFocusVideoCurrentTime(data.time, data.autoplay);
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoUrl] = function(data, options){
		      that.setFocusVideoUrl(data);
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoPlay] = function(){
		      that.setFocusVideoPlay();
		    };
		    this.dataset.privateApis[api.privateApi.setFocusVideoPause] = function(){
		      that.setFocusVideoPause();
		    };
		    this.dataset.privateApis[api.privateApi.calcTotalPlaylist] = function(data, options){
		      options.data = that.calcTotalPlaylist(data);
		    };
		    this.dataset.privateApis[api.privateApi.getFocusVideoBufferedTime] = function(data, options){
		      options.data = that.getFocusVideoBufferedTime();
		    };
		    this.dataset.privateApis[api.privateApi.getFocusVideoWidthHeight] = function(data, options){
		      var video = that.getFocusVideoTag();
		      options.data = {
		        width: video.videoWidth,
		        height: video.videoHeight
		      }
		    };
		    this.dataset.privateApis[api.privateApi.getFocusVideoDuration] = function(data, options){
		      options.data = that.getFocusVideoDuration();
		    };
		    this.dataset.privateApis[api.privateApi.playTheNext] = function(data, options){
		      that.playTheNext();
		    };
		    this.dataset.privateApis[api.privateApi.isFocusVideoSeeking] = function(data, options){
		      var video = that.getFocusVideoTag();
		      options.data = video.seeking;
		    };
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('HdPlayer', HdPlayer);
	
	/***/ },
	/* 24 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=videomod%>\" class=\"txp_video_container\">\n  <video style=\"<%=data.videoStyle%>\" <%=data.attrs%> data-role=\"txp_video_tag\" />\n  <video style=\"<%=data.videoStyle%>\" <%=data.attrs%> data-role=\"txp_video_tag\" />\n  <video style=\"<%=data.videoStyle%>\" <%=data.attrs%> data-role=\"txp_video_tag\" />\n</txpdiv>";
	
	/***/ },
	/* 25 */
	/***/ function(module, exports) {
	
		/**
		 * mobile 前贴广告
		 */
		var $ = Txplayer.$;
		var api = Txplayer.apiList;
		var util = Txplayer.util;
	
		var insertAdStatusMap = {
		  'not-start': 0,
		  'request-cgi': 1,
		  'request-cgi-done': 1.1,
		  'playing': 2,
		  'play-end': 3
		};
		var adtypeMap = {
		  '前贴': 'WL',
		  '中插': 'WC',
		  '后贴': 'WH',
		  '暂停': 'WZ'
		};
		function HdPlayerAd(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		HdPlayerAd.prototype = {
		  init: function(){
		    this.dataset.dataKey = Txplayer.dataset.localStorageKey.adRfid;
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  getExtentionPlatform: function(){
		    if (util.os.iphone){
		      return 'iphone';
		    }else if (util.os.ipad){
		      return 'ipad';
		    }else if(util.os.android){
		      return 'android';
		    }else if (util.os.mac) {
		      return 'mac';
		    }
		  },
		  noAd4Advertisers: function(){
		    return Txplayer.util.getUrlParam('oid')==='700700700';
		  },
		  requestCgi: function(options){
		    options = options || {};
		    var cgi = 'http://livew.l.qq.com/livemsg?',
		      defer = $.Deferred(),
		      that = this,
		      rfid = util.getData(this.dataset.dataKey);
	
		    if (!options.adType) {
		      util.showError('请求广告cgi参数错误, adType必须传');
		      return;
		    }
		    if (location.protocol==='https:') cgi = 'https://livew.l.qq.com/livemsg?';
		    var notifyEmptyAd = function(){
		      if (options.adType===adtypeMap['前贴']) {
		        that.context.msg.broadcast(api.eventApi.onLoadingadIsEmpty);
		      }
		    };
		    if (this.noAd4Advertisers() &&
		      options.adType===adtypeMap['前贴']){
		      notifyEmptyAd();
		      return;
		    }
		    // 中插、暂停、后贴就不请求数据了
		    if (this.noAd4Advertisers()){
		      return;
		    }
		    if (that.context.config && $.type(that.context.config.getUserType)==='function') {
		      that.dataset.pu = that.context.config.getUserType();
		    }
		    var cgi_params = {
		      pf: 'H5',
		      ad_type: options.adType,
		      pf_ex: this.getExtentionPlatform(),
		      url: location.href,
		      ty: "web",
		      plugin: "1.0.0",
		      v: Txplayer.dataset.ver,
		      coverid: '',
		      vid: this.context.config.vid,
		      vptag: "",
		      pu: that.dataset.pu || '-1',
		      // 接口合并
		      adaptor: 1,
		      dtype: 1,
		      // 是否是直播，0/1
		      live:0,
		      // 随机数，防止缓存
		      _time_random: (+new Date())
		    };
		    if (options.hasOwnProperty('zcindex')) cgi_params.zcindex = options.zcindex;
		    if (options.adType===adtypeMap['前贴'] && rfid) cgi_params.rfid = rfid;
		    var adChid = util.getAdChannelId();
		    if (adChid) cgi_params.chid = adChid;
		    // 微信登录跳过广告
		    if (util.cookie.get('main_login')==='wx') {
		      cgi_params.uid = util.cookie.get('vuserid');
		      cgi_params.tkn = util.cookie.get('vusession');
		      cgi_params.lt = 'wx';
		    }
		    cgi += $.param(cgi_params);
		    $.ajax({
		      url: cgi,
		      dataType: 'xml',
		      type: 'GET',
		      cache: false,
		      timeout: 8000,
		      xhrFields: {
		        withCredentials: true
		      }
		    })
		    .done(function(data){
		      var json;
		      try{
		        json = util.xml2json(data);
		        json = json['#document'].root;
		      }catch(e){
		        // 待上报
		        util.showError('解析广告数据异常',e);
		        that.context.msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		          msg: e.message,
		          code: '3000',
		          stack: e.stack
		        });
		      }
		      if (!json) {
		        notifyEmptyAd();
		        return;
		      }
		      that.dataset.adJson = json;
		      // 禁止跳过广告
		      if (json.adLoc && (json.adLoc.adFlag+'')==='1') that.dataset.forbiddenSkip = true;
		      if (!(json && json.adList && json.adList.item)) {
		        notifyEmptyAd();
		        return;
		      }
		      that.dataset.adList = [];
		      if ($.isArray(json.adList.item)) {
		        that.dataset.adList = json.adList.item;
		      } else if (json.adList.item.image) {
		        that.dataset.adList.push(json.adList.item);
		      }
		      if (options.adType===adtypeMap['暂停']) {
		        that.dataset.adList = that.filterPauseAd(that.dataset.adList);
		      }else{
		        that.dataset.adList = that.filter(that.dataset.adList);
		      }
		      // 无广告的请求
		      if (that.dataset.adList.length === 0) {
		        notifyEmptyAd();
		        return;
		      }
		      // 记录中插广告 开始时间数据
		      if (options.adType===adtypeMap['前贴']) {
		        that.recordInsertAdStartTime(json.adLoc.breakTime);
		        that.context.msg.broadcast(api.eventApi.onLoadingAdDataReady, that.dataset.adList);
		      }
		      if (options.adType===adtypeMap['后贴']) {
		        that.context.msg.broadcast(api.eventApi.onEndingAdDataReady, that.dataset.adList);
		      }
		      if (options.adType===adtypeMap['中插']) {
		        that.updateInsertAdListStatus(that.dataset.currentInsertAdPoint, insertAdStatusMap['request-cgi-done']);
		        that.context.msg.broadcast(api.eventApi.onInsertAdDataReady, {
		          data: that.dataset.adList,
		          insertTime: that.dataset.currentInsertAdPoint
		        });
		      }
		      if (options.adType===adtypeMap['暂停']) {
		        that.context.msg.broadcast(api.eventApi.onPauseAdDataReady, that.dataset.adList);
		      }
		      defer.resolve();
		    })
		    .fail(function(xhr, err){
		      var msg;
		      if (xhr.status===404){
		        msg = '检测广告被屏蔽';
		      }else{
		        msg = xhr.status;
		      }
		      util.showError('广告请求失败', msg+'-'+err);
		      if (options.adType===adtypeMap['前贴']) {
		        that.context.msg.broadcast(api.eventApi.onLoadingAdRequestError, {
		          code: xhr.status,
		          msg: msg
		        });
		      }
		      defer.reject();
		    });
		    return defer;
		  },
		  filter: function(list){
		    var retArr = [],
		      idx, len, item;
		    list = $.isArray(list) ? list : [];
		    for (idx = 0, len = list.length; idx < len; idx++) {
		      item = list[idx] || {};
		      item.oIdx = idx + 1;
		      if (item && item.image && item.duration > 0) {
		        item.image = ($.isArray(item.image) ? item.image[0] : item.image) || {};
		        if (item.image && (item.image.url || item.image.vid)) {
		          // 如果是非空订单则加入到待播放队列
		          // no_click值为Y时表示当前广告不可点击，将其链接置为空
		          item.link = (item.no_click === "Y") ? "" : item.link;
		          retArr.push(item);
		          continue;
		        }
		      }
		    }
		    return retArr;
		  },
		  filterPauseAd: function(list){
		    var ret = [];
		    $(list).each(function(idx, item){
		      if (item && item.image){
		        if ($.type(item.image)==='array') item.image = item.image[0];
		        if (item.image && item.image.width && item.image.height && item.image.url){
		          ret.push(item);
		        }
		      }
		    });
		    return ret;
		  },
		  recordInsertAdStartTime: function(data){
		    if (!data || !data.hasOwnProperty('t')) return;
		    var that = this, times = [];
		    if ($.type(data.t)==='string') times = [data.t];
		    else times = data.t;
		    this.dataset.insertAdList = [];
		    $(times).each(function(idx, item){
		      that.dataset.insertAdList.push({
		        startTime: parseInt(item),
		        status: insertAdStatusMap['not-start']
		      });
		    });
		  },
		  startInsertAd: function(currentTime){
		    if (!currentTime) return;
		    currentTime = parseInt(currentTime);
		    var inTimeArea = false, that = this;
		    var checkInTimeArea = function(adTime){
		      return currentTime <= (adTime+15) && currentTime>=(adTime-15);
		    };
		    $(this.dataset.insertAdList).each(function(idx, item){
		      if (checkInTimeArea(item.startTime) &&
		        parseInt(item.status)===insertAdStatusMap['not-start']) {
		        that.dataset.currentInsertAdPoint = item.startTime;
		        inTimeArea = true;
		        return false;
		      }
		    });
		    if (!inTimeArea) return;
		    this.requestCgi({
		      adType: adtypeMap['中插'],
		      zcindex: 0
		    });
		    this.updateInsertAdListStatus(that.dataset.currentInsertAdPoint, insertAdStatusMap['request-cgi']);
		  },
		  updateInsertAdListStatus: function(time, status){
		    if (!time || !status) return;
		    $(this.dataset.insertAdList).each(function(idx, item){
		      if (item.startTime===time) {
		        item.status = status;
		        return false;
		      }
		    });
		  },
		  getAdCurrentTime: function(){
		    if ( !this.context.msg.run(api.privateApi.isPlayingAd) ) return 0;
		    var type = this.context.msg.run(api.privateApi.getCurrentPlayListType);
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, type);
		    var currentTime = this.context.msg.run('getFocusVideoCurrentTime');
		    var timeCount = 0;
		    var totleTime = 0;
		    $(this.dataset.adList).each(function(idx, item){
		      if (idx===index) return false;
		      if (!item.duration) return;
		      timeCount += parseInt(item.duration,10)/1000;
		    });
		    totleTime = currentTime + timeCount;
		    return parseInt(totleTime);
		  },
		  getAdDuration: function(){
		    if ( !this.context.msg.run(api.privateApi.isPlayingAd) ) return 0;
		    var timeCount = 0;
		    $(this.dataset.adList).each(function(idx, item){
		      if (!item.duration) return;
		      timeCount += parseInt(item.duration,10)/1000;
		    });
		    return timeCount;
		  },
		  getCurrentAdInfo: function(){
		    if ( !this.context.msg.run(api.privateApi.isPlayingAd) ) return {};
		    var type = this.context.msg.run(api.privateApi.getCurrentPlayListType);
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, type);
		    var data;
		    if (this.dataset.adList && this.dataset.adList[index]) {
		      data = this.dataset.adList[index];
		    }
		    if (!data) return {};
		    return data;
		  },
		  isAdCanNotSkip: function(){
		    if ( this.dataset.adJson && this.dataset.adJson.adLoc && this.dataset.adJson.adLoc.adFlag==='1' ) return true;
		    return false;
		  },
		  pauseAd: function(){
		    this.context.msg.broadcast(api.privateApi.setFocusVideoPause);
		  },
		  playAd: function(){
		    this.context.msg.broadcast(api.privateApi.setFocusVideoPlay);
		  },
		  skipAd: function(){
		    // var adCount = this.context.msg.run(api.privateApi.calcTotalPlaylist, 'loadingad');
		    // if (adCount!==1) return false;
		    var duration = this.context.msg.run(api.publicApi.getDuration);
		    if (duration>180) return false;
		    this.context.msg.broadcast(api.privateApi.clearPlaylist,'loadingad');
		    this.context.msg.broadcast(api.privateApi.clearFocusVideoUrl);
		    this.context.msg.broadcast(api.privateApi.play);
		  },
		  getPlayAdJsonData: function(){
		    return this.dataset.adJson;
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.startInsertAd( that.context.msg.run(api.publicApi.getCurrentTime) );
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data){
		      if (data.playListTypeEnd && data.playListType==='loadingad') {
		        that.dataset.isPlayingAd = false;
		        that.context.msg.broadcast(api.eventApi.onLoadingAdEnded);
		        // 保存rfid
		        if (that.dataset.adJson && that.dataset.adJson.adLoc && that.dataset.adJson.adLoc.rfid) {
		          util.setData(that.dataset.dataKey, that.dataset.adJson.adLoc.rfid);
		        }
		      }else if (data.playListTypeEnd && data.playListType==='insertad') {
		        that.dataset.isPlayingAd = false;
		        that.updateInsertAdListStatus(that.dataset.currentInsertAdPoint, insertAdStatusMap['play-end']);
		        that.context.msg.broadcast(api.eventApi.onInsertAdEnded);
		      }
		      // 广告播放完
		      if (data.playListTypeEnd && data.playListType!=='film'){
		        that.context.msg.broadcast(api.privateApi.showUiControl,{isMoveBelow:false});
		        that.context.userMsg.broadcast(api.eventApi.onAdEnd, {
		          type: data.playListType
		        });
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data){
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      if (type==='loadingad' && !that.dataset.loadingAdHasPlayed) {
		        that.context.msg.broadcast(api.eventApi.onLoadingAdStart);
		        that.context.userMsg.broadcast(api.eventApi.onAdStart, {
		          type: type
		        });
		        that.dataset.loadingAdHasPlayed = true;
		      }else if(type === 'insertad' && !that.dataset.insertAdHasPlayed){
		        that.context.msg.broadcast(api.eventApi.onInsertAdStart);
		        that.context.userMsg.broadcast(api.eventApi.onAdStart, {
		          type: type
		        });
		        that.dataset.insertAdHasPlayed = true;
		      }else if(type === 'endingad' && !that.dataset.endingAdHasPlayed){
		        that.context.msg.broadcast(api.eventApi.onEndingAdStart);
		        that.context.userMsg.broadcast(api.eventApi.onAdStart, {
		          type: type
		        });
		        that.dataset.endingAdHasPlayed = true;
		      }
		      if (type!=='film'){
		        that.context.msg.broadcast(api.privateApi.hideUiControl, {isMoveBelow:false});
		        that.context.msg.broadcast(api.privateApi.hidePlayerUiTools);
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data){
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      if (type!=='film') return;
		      if ( that.context.msg.run(api.privateApi.isTheLastOfPlayList, type) && !that.dataset.hasRequestEndingAdData) {
		        that.dataset.hasRequestEndingAdData = true;
		        that.requestCgi({adType: adtypeMap['后贴']});
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(data){
		      // 判断是否是广告
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      that.dataset.isPlayingAd = (type !== 'film');
	
		      // 播放广告，隐藏控制栏
		      if (type!=='film'){
		        that.context.msg.broadcast(api.privateApi.hideUiControl, {isMoveBelow:false});
		        that.context.msg.broadcast(api.privateApi.hidePlayerUiTools);
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data){
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      that.dataset.isPlayingAd = (type !== 'film');
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onUserPausePlayer)] = function(){
		      if (that.dataset.isPlayingAd) return;
		      that.context.msg.broadcast(api.privateApi.requestPauseAd);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data){
		      if (data.playListTypeEnd && data.isAllEnd){
		        that.dataset.isPlayingAd = false;
		        that.dataset.hasRequestGetinfo = false;
		        that.dataset.hasRequestEndingAdData = false;
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onGetVideoUrlSuccess)] = function(){
		      var isPlayingAd = that.dataset.isPlayingAd;
		      if (that.dataset.hasRequestGetinfo) {
		        that.dataset = {};
		        if (isPlayingAd) that.dataset.isPlayingAd = true;
		      }
		      that.dataset.hasRequestGetinfo = true;
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onError)] = function(data){
		      if (data && data.type==='film') return;
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      var isLast = that.context.msg.run(api.privateApi.isTheLastOfPlayList, type);
		      var isEnd = that.context.msg.run(api.privateApi.isTheLastOfPlayList);
		      if (isLast){
		        that.dataset.isPlayingAd = false;
		        that.context.msg.broadcast(api.privateApi.clearPlaylist, type);
		        that.context.msg.broadcast(api.privateApi.hidePlayAdUI);
		      }
		      that.context.msg.broadcast(api.eventApi.onLoadingAdPlayError, {
		        isLastAd: isLast
		      });
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.pauseAd] = function(data, options){
		      that.pauseAd();
		    }
		    this.dataset.privateApis[api.privateApi.playAd] = function(data, options){
		      that.playAd();
		    }
		    this.dataset.privateApis[api.privateApi.isAdCanNotSkip] = function(data, options){
		      options.data = that.isAdCanNotSkip();
		    }
		    this.dataset.privateApis[api.privateApi.getCurrentAdInfo] = function(data, options){
		      options.data = that.getCurrentAdInfo();
		    }
		    this.dataset.privateApis[api.privateApi.getAdDuration] = function(data, options){
		      options.data = that.getAdDuration();
		    }
		    this.dataset.privateApis[api.privateApi.getAdCurrentTime] = function(data, options){
		      options.data = that.getAdCurrentTime();
		    }
		    this.dataset.privateApis[api.privateApi.isPlayingAd] = function(data, options){
		      options.data = !!that.dataset.isPlayingAd;
		    }
		    this.dataset.privateApis[api.privateApi.getPlayAdJsonData] = function(data, options){
		      options.data = that.getPlayAdJsonData();
		    }
		    this.dataset.privateApis[api.privateApi.requestLoadingAd] = function(){
		      that.requestCgi({adType: adtypeMap['前贴']});
		    }
		    this.dataset.privateApis[api.privateApi.requestPauseAd] = function(){
		      that.requestCgi({adType: adtypeMap['暂停']});
		    }
		    this.dataset.privateApis[api.privateApi.skipAd] = function(){
		      that.skipAd();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('HdPlayerAd', HdPlayerAd);
	
	/***/ },
	/* 26 */
	/***/ function(module, exports) {
	
		var $             = Txplayer.$;
		var api           = Txplayer.apiList;
		var util          = Txplayer.util;
	
		function HdPlayerAdReport(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		HdPlayerAdReport.prototype = {
		  init: function(){
		    this.addEventListener();
		    this.dp3Report(1);
		  },
		  setReportTimeData: function(){
		    if (!this.dataset.adData && $.type(this.dataset.adData)!=='object') return;
		    var list = [], that = this;
		    this.dataset.reportData = {};
		    if (this.dataset.adData.hasOwnProperty('ReportTime') && this.dataset.adData.reportUrl){
		      this.dataset.reportData[ this.dataset.adData.ReportTime ] = [this.dataset.adData.reportUrl];
		    }
		    if (this.dataset.adData.reportUrlOther &&
		      this.dataset.adData.reportUrlOther.reportitem){
		      if ( $.type(this.dataset.adData.reportUrlOther.reportitem)==='object'){
		        list = [this.dataset.adData.reportUrlOther.reportitem];
		      }else{
		        list = this.dataset.adData.reportUrlOther.reportitem;
		      }
		    }
		    if ( !list.length ) return;
		    $(list).each(function(idx, item){
		      if ( !(item.hasOwnProperty('reporttime') && item.url) ) return;
		      if (!that.dataset.reportData[item.reporttime]) that.dataset.reportData[item.reporttime] = [];
		      that.dataset.reportData[item.reporttime].push(item.url);
		    });
		  },
		  dp3Report: function(step, params){
		    if(!step) return;
		    var that = this;
		    var qq = util.cookie.get('luin') || util.cookie.get('uin') || '';
		    var report_params = {};
		    var base_param = {
		      'requestid': this.context.msg.run(api.publicApi.getUserId),
		      'pf': 'H5',
		      'chid': util.getAdChannelId(),
		      'adtype': this.dataset.adType,
		      'timestamp': (+new Date()),
		      'mvid': this.context.msg.run(api.publicApi.getVid),
		      "videoDuration" : this.context.msg.run(api.publicApi.getDuration) || 0,
		      'coverid': '',
		      'qq': qq
		    };
		    var step_param;
		    var report_url = '//dp3.qq.com/qqvideo/?';
		    var reportData = {};
	
		    if(step===2 ||step===5){
		      // 统计oid，vid，videopt
		      var oids = [], vids = [], videopts = [];
		      if(that.dataset.adJson &&
		          that.dataset.adJson.adList &&
		          that.dataset.adJson.adList.item){
		        var _item = $.type(that.dataset.adJson.adList.item)==='object'?[that.dataset.adJson.adList.item]: that.dataset.adJson.adList.item;
		        $(_item).each(function(idx, item){
		          if(!item.order_id || !item.duration) return;
		          if(item.duration) videopts.push(item.duration);
		          if(item.image && item.image.vid){
		            vids.push(item.image.vid);
		          }else if($.type(item.image)==='array' && item.image.length){
		            item.image[0].vid && vids.push(item.image[0].vid);
		          }
		          oids.push(item.order_id);
		        });
		      }
		      reportData.oid = oids.join(',');
		      reportData.vid = vids.join(',');
		      reportData.videopt = videopts.join(',');
		    }
	
		    if (step===1){
		      step_param = {};
		    }else if (step===2) {
		      step_param = {
		        'vid2aid': that.dataset.adJson.adLoc.vid2aid || 0,
		        // livew 接口耗时
		        // 'aid2oid': that.dataset.dp3ReportData.aid2oid,
		        'oid2url': that.dataset.adJson.adGetv&&that.dataset.adJson.adGetv.oid2url || 0,
		        'merged': 1,
		        'adaptor': 1,
		        'errorcode': '',
		        'adid': that.dataset.adJson.adLoc.aid || '',
		        // 订单号列表, 逗号分隔
		        'oid': reportData.oid,
		        // 素材vid, 逗号分隔
		        'vid': reportData.vid
		      };
		    }else if(step===3){
		      step_param = {
		        // 首次缓冲时间
		        'videofbt': params.videofbt,
		        'errorcode': ''
		      };
		    }else if(step===4){
		      step_param = {
		        'isskip': '',
		        'errorcode': '',
		        'adDidShowTime': this.context.msg.run(api.privateApi.getFocusVideoCurrentTime)
		      };
		    }else if(step===5){
		      step_param = {
		        'errorcode': '',
		        // 广告总时长
		        'adtt': this.context.msg.run(api.privateApi.getAdDuration),
		        // 每个广告时长
		        'videopt': reportData.videopt,
		        // 每个广告实际播放时长
		        'videott': params.adRealPlayedTime
		      };
		    }
		    if (!step_param) return;
		    report_params = $.extend(base_param, step_param);
		    report_params.step = step;
		    report_url += $.param(report_params);
		    util.report(report_url);
		  },
		  resetDataset: function(){
		    delete this.dataset.adFirstPlayTime;
		    delete this.dataset.adFirstPlayingTime;
		    delete this.dataset.adRealPlayedTime;
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(data){
		      if (!data) return;
		      if (data.playListType!=='loadingad') return;
		      if (!data.videoTag) return;
		      // 统计广告的实际播放时长
		      if ($.type(that.dataset.adRealPlayedTime)==='array'){
		        that.dataset.adRealPlayedTime[that.dataset.adRealPlayedTime.length-1] = that.dataset.adRealPlayedTime[that.dataset.adRealPlayedTime.length-1] + 1;
		      }
		      var currentTime = parseInt(data.videoTag.currentTime);
		      if (that.dataset.reportData && that.dataset.reportData[currentTime]){
		        $(that.dataset.reportData[currentTime]).each(function(idx, item){
		          util.report(item);
		        });
		      }
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(data){
		      if (!data) return;
		      if ( data.playListType!=='loadingad' &&
		        data.playListType!=='insertad' &&
		        data.playListType!=='endingad' ) return;
	
		      if (!that.dataset.adRealPlayedTime) that.dataset.adRealPlayedTime=[];
		      // 统计广告的实际播放时长
		      if (!that.dataset.adRealPlayedTime.hasOwnProperty(data.videoTag.src)) {
		        that.dataset.adRealPlayedTime[data.videoTag.src] = null;
		        that.dataset.adRealPlayedTime.push(-1);
		      }
		      // 统计首次缓冲时间
		      that.dataset.adFirstPlayTime = +new Date();
		      that.dataset.adData = that.context.msg.run(api.privateApi.getCurrentAdInfo);
		      that.setReportTimeData();
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data){
		      if (!data) return;
		      if ( data.playListType!=='loadingad' &&
		        data.playListType!=='insertad' &&
		        data.playListType!=='endingad' ) return;
		      // 统计首次缓冲时间
		      that.dataset.adFirstPlayingTime = +new Date();
		      that.dp3Report(3, {
		        videofbt: (that.dataset.adFirstPlayingTime - that.dataset.adFirstPlayTime)
		      });
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onOpenAdLink)] = function(data){
		      if ( data && data.clickReportUrlOther && data.clickReportUrlOther.reportitem ){
		        util.report(data.clickReportUrlOther.reportitem.url);
		        return;
		      }
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onPuaseAdShow)] = function(data){
		      var othersReport = [];
		      if (data && data.reportUrl){
		        util.report(data.reportUrl);
		      }
		      if (data && data.reportUrlOther && data.reportUrlOther.reportitem) {
		        if ($.type(data.reportUrlOther.reportitem)==='object'){
		          othersReport.push(data.reportUrlOther.reportitem);
		        }else{
		          othersReport = data.reportUrlOther.reportitem;
		        }
		      }
		      $(othersReport).each(function(idx, item){
		        if (item && item.url) {
		          util.report(item.url);
		        }
		      });
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data){
		      if (data.playListTypeEnd && (
		        data.playListType==='loadingad' ||
		        data.playListType==='insertad' ||
		        data.playListType==='endingad'
		      )){
		        that.dp3Report(5, {
		          adRealPlayedTime: $.type(that.dataset.adRealPlayedTime)==='array'?that.dataset.adRealPlayedTime.join(',') : ''
		        });
		      }
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onLoadingAdDataReady)] = function(){
		      that.resetDataset();
		      that.dataset.adType = 'WL';
		      that.dataset.adJson = that.context.msg.run(api.privateApi.getPlayAdJsonData);
		      that.dp3Report(2);
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onEndingAdDataReady)] = function(){
		      that.resetDataset();
		      that.dataset.adType = 'WC';
		      that.dataset.adJson = that.context.msg.run(api.privateApi.getPlayAdJsonData);
		      that.dp3Report(2);
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onInsertAdDataReady)] = function(){
		      that.resetDataset();
		      that.dataset.adType = 'WH';
		      that.dataset.adJson = that.context.msg.run(api.privateApi.getPlayAdJsonData);
		      that.dp3Report(2);
		    };
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
	
		Txplayer.register('HdPlayerAdReport', HdPlayerAdReport);
	
	/***/ },
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * html5 高清播放器控制器
		 */
		var GetVideoInfo  = __webpack_require__(15);
		var $             = Txplayer.$;
		var api           = Txplayer.apiList;
		var util          = Txplayer.util;
		var definitionMap = __webpack_require__(19).definitionMap;
		var errcode = __webpack_require__(28);
	
		function HdPlayerControl(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		HdPlayerControl.prototype = {
		  // 初始化入口
		  init: function(){
		    this.dataset.hasVideoPlayed = false;
		    this.dataset.playerId = this.context.config.playerId;
		    this.dataset.vid = this.context.config.vid;
		    this.dataset.nextVid = this.context.config.nextVid;
		    var config = {
		      vid: this.context.config.vid,
		      defn: this.dataset.defaultDefinition,
		      charge: this.context.config.isNeedPay ? 1: 0
		    };
		    var context = {
		      msg: this.msg,
		      superMsg: this.context.msg,
		      config: config,
		      dataset: this.dataset,
		      sdtfrom: util.getStdfrom(),
		      guid: this.context.msg.run(api.publicApi.getUserId)
		    };
		    this.dataset.vid = this.context.config.vid;
		    this.dataset.isNeedPay = this.context.config.isNeedPay;
		    this.dataset.autoplay = this.context.config.autoplay;
		    this.dataset.hdloadingadAutoplay = this.context.config.hdloadingadAutoplay;
		    this.dataset.playStartTime = this.context.config.playStartTime;
		    this.dataset.skipPrelude = this.context.config.skipPrelude;
		    this.dataset.defaultDefinition = this.context.config.defaultDefinition;
		    this.dataset.connectionPlayTime = this.context.config.connectionPlayTime;
		    if (!this.dataset.defaultDefinition){
		      var historyDefinition = this.context.msg.run(api.privateApi.getHistoryDefinition);
		      if (historyDefinition) this.dataset.defaultDefinition = historyDefinition;
		    }
		    this.getinfo = new GetVideoInfo(context);
		    this.addEventListener();
		    this.exportsModuleApis();
		    this.showDebugLogs();
		    if (this.dataset.autoplay) this.play({
		      nextVid: this.dataset.nextVid,
		      vid: this.dataset.vid,
		      connectionPlayTime: this.context.config.connectionPlayTime
		    });
		  },
		  // 通过vid获取视频播放地址列表
		  requestVideoUrlsByVid: function(options){
		    options = options || {};
		    var config = {
		      vid: this.dataset.vid,
		      defn: this.dataset.defaultDefinition,
		      charge: this.dataset.isNeedPay ? 1: 0,
		      fhdswitch: options.fhdswitch ? 1: 0
		    };
		    var that = this;
		    $.extend(config, options);
		    this.context.msg.broadcast(api.eventApi.onGetinfoStart);
		    this.getinfo.getHDVideoUrlByVid(config).done(function(videoFirstPartUrl, videosData, DefinitionList, getinfoJSON){
		      that.context.msg.broadcast(api.eventApi.onGetinfoEnded);
		      if (videosData) {
		        that.dataset.videosData = videosData;
		        that.dataset.DefinitionList = DefinitionList;
		      }
		      that.dataset.getinfoJSON = getinfoJSON;
		      // that.dataset.isDefinitionSwitching = false;
		      that.dataset.getVideoInfoErrorData = null;
		      that.context.msg.broadcast(api.eventApi.onGetVideoUrlSuccess, videoFirstPartUrl);
		    }).fail(function(data){
		      that.dataset.isDefinitionSwitching = false;
		      if (data && data.code===91) {
		        that.context.msg.broadcast(api.publicApi.pause);
		        that.context.msg.broadcast(api.privateApi.hideUiTips);
		        that.dataset.getVideoInfoErrorData = data;
		        that.context.msg.broadcast(api.eventApi.onVideoInterruptByError);
		      }else{
		        that.context.msg.broadcast(api.eventApi.onError, {
		          code: data.code,
		          msg: errcode[data.code],
		          type: 'cgi'
		        });
		        that.context.msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		          msg: errcode[data.code],
		          code: data.code,
		          stack: ''
		        });
		      }
		      that.context.msg.broadcast(api.eventApi.onGetinfoEnded);
		    });
		  },
		  // 获取下一个分片的vkey
		  requestVideoNextPartKey: function(item, selectIndex){
		    selectIndex = selectIndex || 0;
		    if (!this.dataset.videosData) return false;
		    var that = this,
		      defer = $.Deferred();
		    this.dataset.preloadStatus = 'pending';
		    item.isNeedPay = this.context.config.isNeedPay;
		    this.context.msg.broadcast(api.eventApi.onGetvkeyStart);
		    this.getinfo.getHDVideoVkey(item).done(function(vkey){
		      that.dataset.getVkeyErrorData = null;
		      that.context.msg.broadcast(api.eventApi.onGetvkeyEnded);
		      if (!vkey) {
		        that.dataset.preloadStatus = 'fail';
		        defer.reject();
		        return;
		      }
		      defer.resolve(item.urlArray[selectIndex].url + '&vkey=' + vkey);
		    }).fail(function(data){
		      that.dataset.getVkeyErrorData = data;
		      util.showError('getvkey失败',data);
		      that.context.msg.broadcast(api.eventApi.onGetvkeyEnded);
		      defer.reject(data);
		    });
		    return defer;
		  },
		  // 获取视频的播放地址
		  loadVideoUrls: function(options){
		    options = options || {};
		    this.dataset.hasLoadVideoUrl = true;
		    var that = this;
		    var msgName = api.eventApi.onGetVideoUrlSuccess + '.loadVideoUrls';
		    this.context.msg.once(msgName, function(videoFirstPartUrl){
		      if (!that.dataset.videosData) {
		        util.showError('onGetVideoUrlSuccess失败', '找不到播放url列表');
		        return;
		      }
		      var urls = [];
		      $(that.dataset.videosData).each(function(idx, item){
		        if (idx ===0 && videoFirstPartUrl) {
		          urls.push({
		            url: videoFirstPartUrl,
		            type: 'film',
		            data: item
		          });
		          return;
		        }
		        urls.push({
		          _url: item.urlArray,
		          data: item,
		          type: 'film',
		          getUrlSync: function(){
		            var defer = $.Deferred();
		            that.requestVideoNextPartKey(this.data)
		            .done(function(url){
		              defer.resolve(url);
		            })
		            .fail(function(err){
		              defer.reject(err);
		            });
		            return defer;
		          }
		        });
		      });
		      var config = {
		        data: urls,
		        type: 'film'
		      };
		      that.dataset.videoPreloadList = urls;
		      that.context.msg.broadcast(api.eventApi.onPreloadListChange, videoFirstPartUrl);
		      if (options.repalcePlayList) config.repalcePlayList = true;
		      if (options.clear) config.clear = true;
		      that.context.msg.broadcast(api.privateApi.addUrls2Player, config);
		      that.setVid(options.vid);
		      if (options.autoplay) {
		        that.dataset.autoplay = true;
		        that.context.msg.emit(api.privateApi.play, videoFirstPartUrl);
		      }
		      if (options.playStartTime) {
		        that.seekTo(options.playStartTime);
		        var textTime = '<a>' + util.formatPlayTime(options.playStartTime) + '</a>';
		        that.context.msg.broadcast(api.privateApi.showUiTips, {
		          text: '您上次观看至 '+textTime+' 处，正在为您续播',
		          time: 3
		        });
		      }
		    });
		    this.requestVideoUrlsByVid({
		      vid: options.vid,
		      charge: options.charge,
		      defn: options.defn,
		      fhdswitch: options.fhdswitch
		    });
		  },
	
		  // 获取视频时长信息
		  getDuration: function(){
		    if (!this.dataset.videosData || $.type(this.dataset.videosData)!=='array') return 0;
		    var duration = 0;
		    $(this.dataset.videosData).each(function(idx, item){
		      duration += parseInt(item.duration);
		    });
		    return duration;
		  },
		  // 获取视频文件大小，单位K
		  getFileSize: function(){
		    if (!this.dataset.videosData || $.type(this.dataset.videosData)!=='array') return 0;
		    var filesize = 0;
		    $(this.dataset.videosData).each(function(idx, item){
		      filesize += parseInt(item.bytesTotal);
		    });
		    return parseInt(filesize/1024);
		  },
		  // 获取视频宽高尺寸
		  getVideoSize: function(){
		    if (!this.dataset.videosData || $.type(this.dataset.videosData)!=='array') return 0;
		    var filesize = 0, item = this.dataset.videosData[0];
		    return {
		      width: item.width,
		      height: item.height
		    };
		  },
		  // 设置清晰度
		  setDefinition: function(defn){
		    if (!defn) return;
		    if (this.dataset.isDefinitionSwitching) return;
		    var list = this.getDefinitionList();
		    var isInList, that = this;
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, 'film');
		    $(list).each(function(idx, item){
		      if (item.name===defn) {
		        isInList = true;
		        return true;
		      }
		    });
		    if (!isInList) {
		      util.error('未知清晰度格式，或者视频没有指定的清晰度');
		      return;
		    }
		    this.dataset.isDefinitionSwitching = true;
		    this.dataset.requestId = util.createGUID();
		    this.context.msg.broadcast(api.eventApi.onSetDefinitionStart, defn);
		    util.showInfo('开始切换清晰度', defn);
		    this.context.msg.once(api.eventApi.onPreloadListChange+'.switch_definition', function(url){
		      util.showInfo('开始切换清晰度', url);
		      var urlData;
		      if (index===0)  urlData = url;
		      else urlData = that.dataset.videoPreloadList[index];
		      that.context.msg.broadcast(api.privateApi.setPreloadVideoUrl, urlData);
		      that.context.msg.run(api.privateApi.setPreloadVideoKeepSpaceToFocusVideo).done(function(){
		        util.showInfo('切换清晰度成功','');
		        that.dataset.isDefinitionSwitching = false;
		        that.context.msg.broadcast(api.eventApi.onDefinitionChange, defn);
		        that.context.msg.broadcast(api.eventApi.onSetDefinitionDone);
		      }).fail(function(errorMsg){
		        util.showInfo('切换清晰度失败','');
		        that.dataset.isDefinitionSwitching = false;
		        that.context.msg.broadcast(api.eventApi.onSetDefinitionFail, errorMsg);
		      });
		    });
		    this.loadVideoUrls({
		      defn: defn,
		      vid: this.dataset.vid,
		      repalcePlayList: true,
		      // 强制切换清晰度
		      fhdswitch: 1
		    });
		    if (this.dataset.setDefinitionTimeout_TIMER){
		      clearTimeout(this.dataset.setDefinitionTimeout_TIMER);
		      this.dataset.setDefinitionTimeout_TIMER = null;
		    }
		    // 切换失败超时，切换出错处理
		    this.dataset.setDefinitionTimeout_TIMER = setTimeout(function(){
		      that.dataset.isDefinitionSwitching = false;
		    },30*1000);
		  },
		  // 获取清晰度列表
		  getDefinitionList: function(){
		    var list = this.dataset.DefinitionList;
		    if (!list) return [];
		    $(list).each(function(idx, item){
		      if (!definitionMap.hasOwnProperty(item.name)) return;
		      if (item.name==='mp4'){
		        item.cname = definitionMap[item.name] + item.cname.replace(/\D+/g,'') + 'P';
		      }else{
		        item.cname = definitionMap[item.name];
		      }
		    });
		    list.sort(function(a, b){
		      return parseInt(a.cname.replace(/\D+/g,'')) - parseInt(b.cname.replace(/\D+/g,''));
		    });
		    this.dataset.DefinitionList = list;
		    return list;
		  },
		  // 获取当前清晰度
		  getDefinition: function(){
		    var list = this.getDefinitionList();
		    var defn;
		    if ($.type(list)!=='array') return '';
		    $(list).each(function(idx, item){
		      if (item.sl===1) {
		        defn = item.name;
		        return true;
		      }
		    });
		    return defn;
		  },
		  // 获取当前清晰度格式
		  getDefinitionFormat: function(){
		    var list = this.getDefinitionList();
		    var format;
		    if ($.type(list)!=='array') return '';
		    $(list).each(function(idx, item){
		      if (item.sl===1) {
		        format = item.format;
		        return true;
		      }
		    });
		    return format;
		  },
		  // 获取当前播放的时间
		  getCurrentTime: function(){
		    if (this.context.msg.run('isPlayingAd')) {
		      return 0;
		    }
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, 'film');
		    var duration = 0;
		    $(this.dataset.videosData).each(function(idx, item){
		      if (idx === index) return false;
		      duration += item.duration;
		    });
		    duration += this.context.msg.run(api.privateApi.getFocusVideoCurrentTime);
		    return parseInt(duration);
		  },
		  getBufferedTime: function(){
		    if (this.context.msg.run('isPlayingAd')) {
		      return 0;
		    }
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, 'film');
		    var duration = 0;
		    $(this.dataset.videosData).each(function(idx, item){
		      if (idx === index) return false;
		      duration += item.duration;
		    });
		    duration += this.context.msg.run(api.privateApi.getFocusVideoBufferedTime);
		    return duration;
		  },
		  // 跳转到时间点
		  seekTo: function(options){
		    var seekTime;
		    if ( $.type(options)==='object' ){
		      seekTime = options.time;
		    }else if ( $.type(options)==='number' ){
		      seekTime = options;
		      options = {};
		    }
		    util.showInfo('seekTo', seekTime);
		    if (this.context.msg.run('isPlayingAd')) return;
		    if (typeof seekTime==='undefined') {
		      util.error('seekTo参数错: 参数不能为空');
		      return;
		    }
		    var duration = this.getDuration();
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, 'film');
		    if (seekTime > duration) {
		      util.error('seekTo参数错误: seekTime['+seekTime+']不能超过视频的时长['+duration+']');
		      return;
		    }
		    var seekInfo = this.getVideoSeekToInfo(seekTime);
		    var that = this;
		    this.context.msg.broadcast(api.eventApi.onSeekStart);
		    this.context.msg.once(api.eventApi.onSectionPlaying + '.seekStartLog', function(){
		      that.context.msg.broadcast(api.eventApi.onSeekEnded);
		    });
		    if (index === seekInfo.index) {
		      this.context.msg.broadcast(api.privateApi.setFocusVideoCurrentTime, {
		        time: seekTime-seekInfo.prevDurtion,
		        autoplay: true
		      });
		    }else{
		      if (this.dataset.videoPreloadList[seekInfo.index]) {
		        var config = this.dataset.videoPreloadList[seekInfo.index];
		        config.autoplay = true;
		        config.currentTime = seekTime - seekInfo.prevDurtion;
		        config.updateIndex = seekInfo.index;
		        this.context.msg.broadcast(api.privateApi.setFocusVideoUrl, config);
		      }
		    }
		    if (options && options.showTips) {
		      var textTime = '<a>' + util.formatPlayTime(seekTime) + '</a>';
		      that.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '您上次观看至 '+textTime+' 处，正在为您续播',
		        time: 3
		      });
		    }
		  },
		  play: function(options){
		    if (this.context.msg.run(api.privateApi.isPlayingAd)){
		      this.context.msg.broadcast(api.privateApi.setFocusVideoPlay);
		      return;
		    }
	
		    if ($.type(options)==='undefined' || (
		      $.type(options)==='object' && !options.vid
		    )) {
		      // 已经播放过，继续播放
		      if (this.dataset.hasVideoPlayed) {
		        this.context.msg.broadcast(api.privateApi.setFocusVideoPlay);
		        return;
		      }
		      // 没有播放过，先请求是否有广告
		      if (!this.context.msg.listenerCount(api.privateApi.requestLoadingAd)){
		        this.loadVideoUrls({autoplay: this.dataset.autoplay});
		        this.context.msg.broadcast(api.eventApi.onPlayStart);
		        return;
		      }
		    }
		    if ($.type(options)==='string'){
		      options = {
		        vid: options,
		        autoplay: true
		      }
		    }else if($.type(options)==='object' && !options.vid){
		      if (!options.nextVid) options = {};
		    }
		    // 播放下一个视频前，触发beforeVideoPlay
		    if (options && options.vid && options.vid !== this.dataset.vid) {
		      // beforeVideoPlay触发前更新vid的值
		      if (options.hasOwnProperty('vid')) this.setVid(options.vid);
		      this.context.msg.broadcast(api.eventApi.beforeVideoPlay)
		    }
		    if (options.hasOwnProperty('vid'))
		      this.setVid(options.vid);
		    if (options.hasOwnProperty('autoplay'))
		      this.dataset.autoplay = options.autoplay;
		    if (options.hasOwnProperty('isNeedPay'))
		      this.dataset.isNeedPay = options.isNeedPay;
		    if (options.hasOwnProperty('nextVid'))
		      this.dataset.nextVid = options.nextVid;
		    if (options.hasOwnProperty('bullet'))
		      this.dataset.bullet = options.bullet;
		    if (options.hasOwnProperty('bulletId'))
		      this.dataset.bulletId = options.bulletId;
		    if (options.hasOwnProperty('playStartTime'))
		      this.dataset.playStartTime = options.playStartTime;
		    if (options.hasOwnProperty('playEndTime'))
		      this.dataset.playEndTime = options.playEndTime;
		    if (options.hasOwnProperty('defaultDefinition'))
		      this.dataset.defaultDefinition = options.defaultDefinition;
		    if (options.connectionPlayTime)
		      this.dataset.connectionPlayTime = options.connectionPlayTime;
		    else
		      this.dataset.connectionPlayTime = 0;
		    this.dataset.hasVideoPlayed = false;
		    this.dataset.hasLoadVideoUrl = false;
		    this.dataset.isLoadingAdEmpty = null;
		    // if (this.dataset.hasVideoPlayed){
		    //   this.dataset.playerId = util.createGUID();
		    // }
		    this.context.msg.broadcast(api.privateApi.clearPlaylist);
		    this.context.msg.broadcast(api.privateApi.clearFocusVideoUrl);
		    this.context.msg.broadcast(api.eventApi.onPlayStart);
		    this.context.msg.broadcast(api.privateApi.requestLoadingAd);
		    this.context.msg.broadcast(api.publicApi.setNextVid, options.nextVid);
		  },
		  pause: function(){
		    this.context.msg.broadcast(api.privateApi.setFocusVideoPause);
		  },
		  setVid: function(vid){
		    if (!vid) return;
		    if (vid===this.dataset.vid) return;
		    this.dataset.vid = vid;
		    this.context.msg.broadcast(api.eventApi.onVidChange, vid);
		  },
		  getVid: function(){
		    return this.dataset.vid;
		  },
		  getSkipPreludeTime: function(){
		    var playStartTime;
		    if (this.context.msg.listenerCount(api.privateApi.isSkipPrelude) && !this.context.msg.run(api.privateApi.isSkipPrelude) ){
		      playStartTime = 0;
		    }else if(!this.dataset.skipPrelude){
		      playStartTime = 0;
		    }else{
		      playStartTime = this.dataset.playStartTime
		    }
		    if (this.dataset.connectionPlayTime) {
		      playStartTime = this.dataset.connectionPlayTime;
		    }
		    return playStartTime;
		  },
		  getConnectionPlayTime: function(){
		    return this.dataset.connectionPlayTime;
		  },
	
		  showDebugLogs: function(){
		    if (!Txplayer.dataset.debug) return;
		    var logData = {};
		    this.context.msg.on(api.eventApi.onSetDefinitionStart, function(){
		      logData.setDefinitionStart = +new Date();
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionDone, function(){
		      logData.setDefinitionEnd = +new Date();
		      util.showInfo('切换清晰度耗时', (logData.setDefinitionEnd-logData.setDefinitionStart)+'毫秒');
		    });
		  },
	
		  // 计算跳转时间信息
		  getVideoSeekToInfo: function(time){
		    var count = 0, index;
		    $(this.dataset.videosData).each(function(idx, item){
		      index = idx;
		      count += item.duration;
		      if (count>time) {
		        count -= item.duration;
		        return false;
		      }
		    });
		    return {
		      index: index,
		      prevDurtion: count
		    };
		  },
		  // 事件处理
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.isLoadingAdEmpty = true;
	
		    this.context.msg.on(api.eventApi.onLoadingadIsEmpty, function(){
		      that.dataset.isLoadingAdEmpty = true;
		      var config = {autoplay: true};
		      config.playStartTime = that.getSkipPreludeTime();
		      that.loadVideoUrls(config);
		    });
		    this.context.msg.on(api.eventApi.onLoadingAdRequestError, function(){
		      that.dataset.isLoadingAdEmpty = true;
		      var config = {autoplay: true};
		      config.playStartTime = that.getSkipPreludeTime();
		      that.loadVideoUrls(config);
		    });
		    // 广告播放异常处理
		    this.context.msg.on(api.eventApi.onLoadingAdPlayError, function(data){
		      if (that.dataset.hasLoadVideoUrl || !data.isLastAd){
		        that.context.msg.broadcast(api.privateApi.playTheNext);
		      }else{
		        var config = {autoplay: true};
		        config.playStartTime = that.getSkipPreludeTime();
		        that.loadVideoUrls(config);
		      }
		    });
		    this.context.msg.on(api.eventApi.onSectionPlaying, function(data){
		      if (that.context.msg.run(api.privateApi.getCurrentPlayListType)==='film') {
		        that.dataset.hasVideoPlayed = true;
		      }else{
		        if (that.dataset.isLoadingAdEmpty) return;
		        if (that.dataset.hasLoadVideoUrl) return;
		        that.loadVideoUrls();
		      }
		    });
		    this.context.msg.on(api.eventApi.onSectionPlay, function(data){
		      if (that.dataset.hasVideoPlayed) return;
		      if ( that.context.msg.run(api.privateApi.getCurrentPlayListType)!=='film' ) return;
		    });
		    this.context.msg.on(api.eventApi.onSectionEnded, function(data){
		      // 广告播放完，清空广告播放列表
		      if (data.playListTypeEnd && data.playListType!=='film') {
		        var key = api.eventApi.onSectionPlay + '.clearPlaylist';
		        that.context.msg.once(key, function(){
		          that.context.msg.broadcast(api.privateApi.clearPlaylist, data.playListType);
		        });
		      }
		      // 正片播放完成，重置播放状态为没有播放过
		      if (data.playListTypeEnd && data.playListType==='film'){
		        that.dataset.hasVideoPlayed = false;
		      }
		      // 全部播放完成，重置index
		      if (data.isAllEnd){
		        that.dataset.hasLoadVideoUrl = false;
		        that.context.msg.broadcast(api.privateApi.clearPlaylist);
		      }
		    });
		    this.context.msg.on(api.eventApi.onLoadingAdDataReady, function(data){
		      if (!data || $.type(data)!=='array' || !data.length) {
		        return;
		      }
		      var adUrls = [];
		      $(data).each(function(idx, item){
		        var filesize = $.type(item.image)==='array' ? item.image[0].cs : item.image.cs;
		        if (item.image.url) adUrls.push({
		          url: item.image.url,
		          type:'loadingad',
		          data: {
		            bytesTotal: filesize
		          }
		        });
		      });
		      if (adUrls.length===0) {
		        return;
		      }
		      that.dataset.isLoadingAdEmpty = false;
		      that.context.msg.broadcast(api.privateApi.addUrls2Player, adUrls);
		      that.context.msg.broadcast(api.privateApi.play);
		    });
		    this.context.msg.on(api.eventApi.onEndingAdDataReady, function(data){
		      if (!data || $.type(data)!=='array' || !data.length) {
		        return;
		      }
		      var adUrls = [];
		      $(data).each(function(idx, item){
		        if (item.image.url) adUrls.push({
		          url: item.image.url,
		          type:'endingad'
		        });
		      });
		      if (adUrls.length===0) {
		        return;
		      }
		      that.context.msg.broadcast(api.privateApi.addUrls2Player, adUrls);
		      that.context.msg.broadcast(api.privateApi.play);
		    });
		    this.context.msg.on(api.eventApi.onInsertAdDataReady, function(data){
		      if (!data.data || !data.insertTime) return;
		      var insertInfo = that.getVideoSeekToInfo(data.insertTime);
		      if ( !(insertInfo && insertInfo.hasOwnProperty('index')) ) return;
		      var list = [];
		      $(data.data).each(function(idx, item){
		        list.push({
		          url: item.image.url,
		          type: 'insertad'
		        });
		      });
		      var config = {
		        data: list,
		        type: 'insertad',
		        startIndex: insertInfo.index + 1
		      };
		      that.context.msg.broadcast(api.privateApi.addUrls2Player, config);
		      that.context.msg.broadcast(api.privateApi.lockAndPreloadNext);
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionStart, function(data){
		      var definitionName = definitionMap[data];
		      if (!definitionName) return;
		      definitionName = '<a>[' + definitionName + ']</a>';
		      that.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '正在为您切换清晰度' + definitionName,
		        time: 40
		      });
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionDone, function(data){
		      that.context.msg.broadcast(api.privateApi.hideUiTips);
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionFail, function(data){
		      that.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: 'sorry, 切换清晰度失败, 请稍后重试',
		        time: 5
		      });
		    });
		    this.context.msg.on(api.eventApi.onVideoInterruptByError, function(){
		      if(that.dataset.getVkeyErrorData && that.dataset.getVkeyErrorData.em===83){
		        that.context.userMsg.broadcast(api.eventApi.showUIVipGuide,{
		          trialFinish: true
		        });
		      }
		      else if (that.dataset.getVideoInfoErrorData && that.dataset.getVideoInfoErrorData.code===91) {
		        that.context.userMsg.broadcast(api.eventApi.showUIVipGuide,{
		          switchDefinitionFail: true
		        });
		      }
		    });
		    this.context.msg.on(api.eventApi.onSeekStart, function(){
		      that.dataset.isVideoSeeking = true;
		      util.showInfo('seek-start', +new Date());
		    });
		    this.context.msg.on(api.eventApi.onSeekEnded, function(){
		      that.dataset.isVideoSeeking = false;
		      util.showInfo('seek-end', +new Date());
		    });
		    this.context.msg.on(api.privateApi.isVideoSeeking, function(data, options){
		      var isSeeking = that.dataset.isVideoSeeking;
		      if (!isSeeking){
		        isSeeking = that.context.msg.run(api.privateApi.isFocusVideoSeeking);
		      }
		      options.data = isSeeking;
		    });
		  },
		  // 对外提供的接口
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.moduleApis = {};
	
		    this.dataset.moduleApis[api.publicApi.getDuration] = function(data, options){
		      options.data = that.getDuration();
		    }
		    this.dataset.moduleApis[api.publicApi.getFileSize] = function(data, options){
		      options.data = that.getFileSize();
		    }
		    this.dataset.moduleApis[api.publicApi.getVideoSize] = function(data, options){
		      options.data = that.getVideoSize();
		    }
		    this.dataset.moduleApis[api.publicApi.getDefinition] = function(data, options){
		      options.data = that.getDefinition();
		    }
		    this.dataset.moduleApis[api.publicApi.getDefinitionList] = function(data, options){
		      options.data = that.getDefinitionList();
		    }
		    this.dataset.moduleApis[api.publicApi.setDefinition] = function(data, options){
		      options.data = that.setDefinition(data);
		    }
		    this.dataset.moduleApis[api.publicApi.getCurrentTime] = function(data, options){
		      options.data = that.getCurrentTime();
		    }
		    this.dataset.moduleApis[api.publicApi.seekTo] = function(data, options){
		      that.seekTo(data);
		    }
		    this.dataset.moduleApis[api.publicApi.play] = function(data){
		      if (!data) data = {};
		      if ($.type(data)==='object' && $.type(data.nextVid)==='undefined') data.nextVid = that.dataset.nextVid;
		      that.play(data);
		    }
		    this.dataset.moduleApis[api.publicApi.pause] = function(data){
		      that.pause();
		    }
		    this.dataset.moduleApis[api.publicApi.getVid] = function(data, options){
		      options.data = that.getVid();
		    }
		    this.dataset.moduleApis[api.publicApi.getPlayerId] = function(data, options){
		      options.data = that.dataset.playerId;
		    }
		    this.dataset.moduleApis[api.publicApi.setSmallWindowMode] = function(data, options){
		      if (data){
		        that.context.msg.broadcast(api.privateApi.hideUiControl, {isMoveBelow: false});
		      }else{
		        that.context.msg.broadcast(api.privateApi.showUiControl, {isMoveBelow: false});
		      }
		    };
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
	
	
		    this.dataset.privateApis[api.privateApi.getDefinitionFormat] = function(data, options){
		      options.data = that.getDefinitionFormat();
		    }
		    this.dataset.privateApis[api.privateApi.getVideoInfoData] = function(data, options){
		      options.data = that.dataset.getinfoJSON;
		    }
		    this.dataset.privateApis[api.privateApi.getVideosOriginData] = function(data, options){
		      options.data = that.dataset.videosData;
		    }
		    this.dataset.privateApis[api.privateApi.getRequestId] = function(data, options){
		      options.data = that.dataset.requestId || '';
		    }
		    this.dataset.privateApis[api.privateApi.hasLoadingAd] = function(data, options){
		      options.data = !that.dataset.isLoadingAdEmpty;
		    }
		    this.dataset.privateApis[api.privateApi.getBufferedTime] = function(data, options){
		      options.data = that.getBufferedTime();
		    }
		    this.dataset.privateApis[api.privateApi.getConnectionPlayTime] = function(data, options){
		      options.data = that.getConnectionPlayTime();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('HdPlayerControl', HdPlayerControl);
	
	/***/ },
	/* 28 */
	/***/ function(module, exports) {
	
		var errorCode = {
		  10001: '初始化错误',
		  50: 'CGI系统错误,请刷新页面重试',
		  51: 'vid个数超出范围',
		  52: '访问视频付费信息失败，请刷新页面重试',
		  64: '校验视频付费信息失败，请刷新页面重试',
		  61: '您请求的视频已下架',
		  62: '视频状态不合法',
		  63: '清晰度格式不合法',
		  65: '速度格式不合法',
		  66: '视频格式不存在',
		  68: 'CGI系统错误,请刷新页面重试',
		  69: 'format列表为空',
		  71: '未找到HLS CDN',
		  73: '生成文件名失败',
		  74: '分片号不合法',
		  76: '获取m3u8文件名失败',
		  77: '生成HLS key失败',
		  81: 'referer限制',
		  82: 'qzone权限限制',
		  84: '访问IP是黑名单',
		  86: 'CGI访问频率限制'
		};
	
		module.exports = errorCode;
	
	/***/ },
	/* 29 */
	/***/ function(module, exports) {
	
		/**
		 * html5 高清播放器上报
		 */
		var $             = Txplayer.$;
		var api           = Txplayer.apiList;
		var util          = Txplayer.util;
	
		function HdPlayerHistory(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		HdPlayerHistory.prototype = {
		  init: function(){
		    this.dataset.dataKey_historyPlayTime = Txplayer.dataset.localStorageKey.historyPlayTime;
		    this.dataset.dataKey_historyDefinition = Txplayer.dataset.localStorageKey.historyDefinition;
		    this.dataset.maxHistoryPlayTimeList = 50;
		    this.dataset.useConnectionPlay = this.context.config.useConnectionPlay;
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  savePlaytimeData: function(time){
		    var jsonstr = util.getData(this.dataset.dataKey_historyPlayTime);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    var count = 0;
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('savePlaytimeData Error', '找不到vid');
		      return;
		    }
		    for(var i in data){
		      count++;
		    }
		    if (count>=this.dataset.maxHistoryPlayTimeList) data = {};
		    data[vid] = time;
		    util.setData(this.dataset.dataKey_historyPlayTime, JSON.stringify(data));
		  },
		  getPlaytimeData: function(){
		    var jsonstr = util.getData(this.dataset.dataKey_historyPlayTime);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('savePlaytimeData Error', '找不到vid');
		      return;
		    }
		    return data[vid];
		  },
		  clearPlaytimeData: function(){
		    var jsonstr = util.getData(this.dataset.dataKey_historyPlayTime);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('savePlaytimeData Error', '找不到vid');
		      return;
		    }
		    delete data[vid];
		    util.setData(this.dataset.dataKey_historyPlayTime, JSON.stringify(data));
		  },
		  saveDefinitionData: function(definition){
		    if (!definition) return;
		    util.setData(this.dataset.dataKey_historyDefinition, definition);
		  },
		  getDefinitionData: function(){
		    return util.getData(this.dataset.dataKey_historyDefinition);
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(data, options){
		      if (!that.dataset.useConnectionPlay) return;
		      if (data.playListType!=='film') return;
		      if (that.dataset.hasPlayed) return;
		      var historyTime = that.getPlaytimeData();
		      var connectionPlayTime = that.context.msg.run(api.privateApi.getConnectionPlayTime);
		      if (connectionPlayTime) historyTime = connectionPlayTime;
		      var textTime = '<a>' + util.formatPlayTime(historyTime) + '</a>';
		      if (historyTime){
		        that.context.msg.run(api.publicApi.seekTo, historyTime);
		        util.showInfo('1','您上次观看至 '+textTime+' 处，正在为您续播')
		        that.context.msg.broadcast(api.privateApi.showUiTips, {
		          text: '您上次观看至 '+textTime+' 处，正在为您续播',
		          time: 5
		        });
		        that.dataset.hasPlayed = true;
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data, options){
		      if (data.playListType!=='film') return;
		      if (!that.dataset.hasPlayed){
		        var definition = that.context.msg.run(api.publicApi.getDefinition);
		        that.saveDefinitionData(definition);
		      }
		      that.dataset.hasPlayed = true;
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(data, options){
		      if (data.playListType!=='film') return;
		      if (data && data.videoTag && data.videoTag.currentTime && parseInt(data.videoTag.currentTime)%3===0) {
		        var currentTime = that.context.msg.run(api.publicApi.getCurrentTime);
		        that.savePlaytimeData(parseInt(currentTime));
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data, options){
		      if (data.playListType!=='film') return;
		      if (!data.isAllEnd) return;
		      that.clearPlaytimeData();
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onDefinitionChange)] = function(data){
		      that.saveDefinitionData(data);
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.getHistoryDefinition] = function(data, options){
		      options.data = that.getDefinitionData();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
		};
	
	
		Txplayer.register('HdPlayerHistory', HdPlayerHistory);
	
	/***/ },
	/* 30 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * html5 高清播放器上报
		 */
		var $             = Txplayer.$;
		var api           = Txplayer.apiList;
		var util          = Txplayer.util;
		var definitionMap = __webpack_require__(19).definitionMap;
	
		function HdPlayerReport(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		HdPlayerReport.prototype = {
		  init: function(){
		    this.dataset.dataKey = Txplayer.dataset.localStorageKey.playTime;
		    this.resetDataset();
		    this.addEventListener();
		  },
		  resetDataset: function(){
		    if (!this.dataset.isGetinfoDone) return;
		    var protectList = ['isGetinfoDone', 'dataKey' ,'prevDefinition', 'setDefinitionStartTime', 'hasReportLoadingadLoadTime', 'filmFirstPlayingTime'];
		    for(var i in this.dataset){
		      if ($.inArray(i, protectList)>-1) continue;
		      delete this.dataset[i];
		    }
		  },
		  resetDatasetOnVidChange: function(){
		    var list = ['isGetinfoDone', 'setDefinitionStartTime', 'hasReportLoadingadLoadTime','filmFirstPlayingTime'];
		    var that = this;
		    $.each(list, function(idx, item){
		      delete that.dataset[item];
		    });
		  },
		  getDefaultReportData: function(){
		    var config = {
		      uin: Txplayer.util.getQQFromCookie(),
		      vid: this.context.msg.run(api.publicApi.getVid),
		      pid: this.context.msg.run(api.publicApi.getPlayerId),
		      guid: this.context.msg.run(api.publicApi.getUserId),
		      vt: this.getCDNChannelId(),
		      type: this.getBusinessType(),
		      url: document.URL,
		      bi: this.getCurrentVideoDuration(),
		      bt: this.context.msg.run(api.publicApi.getDuration),
		      version: Txplayer.dataset.ver,
		      platform: util.getPlatform(),
		      format: this.context.msg.run(api.privateApi.getDefinitionFormat),
		      defn: this.context.msg.run(api.publicApi.getDefinition),
		      ctime: util.dateFormat(),
		      ptag: util.cookie.get('ptag')
		    };
		    return config;
		  },
		  // 开始播放/调用广告前
		  reportStep3: function(isNewPlay){
		    var config = {
		      step: 3,
		      val: isNewPlay ? 1 : 2
		    };
		    this.doBossReport(config);
		  },
		  // 请求getinfo后
		  reportStep4: function(){
		    var config = {
		      step: 4,
		      val: this.context.msg.run(api.privateApi.calcTotalPlaylist,'film'),
		      val1: 1,
		      bi: 2
		    };
		    this.doBossReport(config);
		  },
		  // 统计播放时长
		  reportStep5: function(options){
		    options = options || {};
		    var config;
		    if (!options.isEnd){
		      config = options;
		      config.val1 = options.isEnd ? 1 : 2;
		      config.val = options.realtime;
		      config.bi = options.totaltime;
		      config.step = 5;
		      delete config.isEnd;
		      delete config.realtime;
		      delete config.totaltime;
		    }else{
		      config = {
		        step: 5,
		        val: options.realtime,
		        val1: options.isEnd ? 1 : 2,
		        bi: options.totaltime
		      };
		    }
		    this.doBossReport(config);
		  },
		  // 前贴广告首次缓冲时间
		  reportStep6: function(options){
		    var config = {
		      step: 6,
		      val: options.firstLoadTime,
		      val1: options.loadingAdStatus
		    };
		    this.doBossReport(config);
		  },
		  // 第一个loading广告开始播放时间
		  reportStep7: function(options){
		    var config = {
		      step: 7,
		      val: 0,
		      val1: 0
		    };
		    this.doBossReport(config);
		  },
		  // 第一个前贴广告缓冲完成上报下载平均速度
		  reportStep70: function(speed){
		    var config = {
		      step: 70,
		      val: speed
		    };
		    this.doBossReport(config);
		  },
		  // 第一个分片缓冲完成是上报下载速度
		  reportStep32_52: function(options){
		    var config = {
		      step: options.step,
		      val: options.waitingTimes,
		      val1: options.speed,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 统计首段请求首次缓冲耗时
		  reportStep30: function(options){
		    var config = {
		      step: 30,
		      val: options.loadTime,
		      val1: 0,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 统计非首段请求首次缓冲耗时
		  reportStep50: function(options){
		    var config = {
		      step: 50,
		      val: options.loadTime,
		      val1: 0,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 拖拽文件缓冲完成
		  reportStep60: function(options){
		    var config = {
		      step: 60,
		      val: options.seekCostTime,
		      val1: 0,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 首段/非首段 首次缓冲耗时
		  reportStep31_51: function(options){
		    if (!options.hasOwnProperty('waitingTime')) return;
		    var isOverMax = options.waitingTime > 10*1000;
		    options.waitingTime = isOverMax ? 10000 : options.waitingTime;
		    var config = {
		      step: options.step,
		      val: options.waitingTime,
		      val1: isOverMax,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // loading广告切正片耗时
		  reportStep35: function(options){
		    var config = {
		      step: 35,
		      val: options.swtichTime,
		      val1: '',
		      val2: this.context.msg.run(api.privateApi.getAdDuration),
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 正片切片切换耗时
		  reportStep55: function(options){
		    var config = {
		      step: 55,
		      val: options.swtichTime,
		      val1: '',
		      val2: options.prevFilmDuration,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  //切换清晰度
		  reportStep100: function(options){
		    var config = {
		      step: 100,
		      val: options.costTime,
		      val1: options.val1,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration),
		      predefn: options.predefn
		    };
		    this.doBossReport(config);
		  },
		  getCDNChannelId: function(){
		    var data = this.context.msg.run(api.privateApi.getVideosOriginData);
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex,'film');
		    if ( !(data && data[index]) ) return '';
		    return data[index].vt;
		  },
		  getCurrentVideoDuration: function(){
		    var data = this.context.msg.run(api.privateApi.getVideosOriginData);
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex,'film');
		    if ( !(data && data[index]) ) return '';
		    return data[index].duration;
		  },
		  getBusinessType: function(){
		    var data = this.context.msg.run(api.privateApi.getVideoInfoData);
		    if (data &&
		      data.vl &&
		      data.vl.vi &&
		      data.vl.vi[0] &&
		      $.type(data.vl.vi[0])==='object' &&
		      data.vl.vi[0].hasOwnProperty('type')
		    ) {
		      return data.vl.vi[0].type;
		    }
		    return '';
		  },
		  doBossReport: function(options){
		    var data = {};
		    data = $.extend(this.getDefaultReportData(), options);
		    if (data && data.bi){
		      data.bi = parseInt(data.bi);
		    }
		    if (data && data.bt){
		      data.bt = parseInt(data.bt);
		    }
		    var url = 'http://btrace.video.qq.com/kvcollect?BossId=2865&Pwd=1698957057';
		    url += '&' + $.param(data);
		    util.report(url);
		    if (Txplayer.dataset.debug){
		      if ($.type(Txplayer.showReportLog)==='function'){
		        Txplayer.showReportLog(data);
		      }
		    }
		  },
		  playTimeHeartBeatStart: function(){
		    var that = this;
		    if(!this.dataset.realPlayTime_TIMER){
		      this.dataset.realPlayTime_TIMER = setInterval(function(){
		        if (!that.dataset.realPlayTime) that.dataset.realPlayTime = 0;
		        that.dataset.realPlayTime += 5;
		      },5000);
		    }
		    if (!this.dataset.totalPlayTime_TIMER) {
		      this.dataset.totalPlayTime_TIMER = setInterval(function(){
		        if (!that.dataset.totalPlayTime) that.dataset.totalPlayTime = 0;
		        that.dataset.totalPlayTime += 5;
		        that.saveData();
		      },5000);
		    }
		  },
		  playTimeHeartBeatStop: function(isEnd){
		    if (isEnd){
		      clearInterval(this.dataset.totalPlayTime_TIMER);
		      delete this.dataset.totalPlayTime_TIMER;
		    }
		    clearInterval(this.dataset.realPlayTime_TIMER);
		  },
		  saveData: function(){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('saveData Error', '找不到vid');
		      return;
		    }
		    data[vid] = {
		      lastupdate: +new Date(),
		      realtime: this.dataset.realPlayTime,
		      totaltime: this.dataset.totalPlayTime
		    };
		    data[vid] = $.extend(this.getDefaultReportData(), data[vid]);
		    util.setData(this.dataset.dataKey, JSON.stringify(data));
		  },
		  getData: function(){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('getData Error', '找不到vid');
		      return;
		    }
		    return data[vid];
		  },
		  clearData: function(vid){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data;
		    vid = vid || this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('clearData Error', '找不到vid');
		      return;
		    }
		    if (data[vid]) delete data[vid];
		    util.setData(this.dataset.dataKey, JSON.stringify(data));
		  },
		  reportPlayTimeWhenPageInit: function(){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data, that = this;
		    var checkAndReport = function(data, vid){
		      if (!data) return;
		      var now = parseInt(+new Date()/1000);
		      var lastupdate = parseInt(parseInt(data.lastupdate)/1000);
		      if ( (now-lastupdate)<=180) return;
		      data.isEnd = false;
		      that.reportStep5(data);
		      that.clearData(vid);
		    };
		    try{
		      data = JSON.parse(jsonstr);
		    }catch(e){
		      data = {};
		    }
		    for(var i in data){
		      checkAndReport(data[i], i);
		    }
		  },
		  reportPlayTimeOnEnded: function(){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data, that = this;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    var checkAndReport = function(data, vid){
		      if (!data) return;
		      data.isEnd = true;
		      that.reportStep5(data);
		      that.clearData(vid);
		    };
		    try{
		      data = JSON.parse(jsonstr);
		    }catch(e){
		      data = {};
		    }
		    checkAndReport(data, vid);
		  },
		  addEventListener: function(){
		    var that = this;
		    // 开始播放，上报
		    this.context.msg.on(api.eventApi.onPlayStart, function(data, options){
		      data = data || {};
		      that.reportStep3(data.isNewPlay);
		    });
		    // 换了下一个视频，dataset重置，保证数据正常
		    this.context.msg.on(api.eventApi.onGetVideoUrlSuccess, function(data, options){
		      that.resetDataset();
		      that.reportStep4();
		      that.dataset.isGetinfoDone = true;
		    });
		    this.context.msg.on(api.eventApi.onVidChange, function(){
		      that.resetDatasetOnVidChange();
		    });
		    // 统计播放量，播放时长
		    this.context.msg.on(api.eventApi.onSectionPause, function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.playTimeHeartBeatStop();
		    });
		    // 广告上报开始时间统计
		    this.context.msg.on(api.eventApi.onSectionPlay, function(data){
		      // 广告加载统计
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) {
		        if (!that.dataset.loadingadFirstPlayTime) {
		          that.dataset.loadingadFirstPlayTime = +new Date();
		        }
		      }
		      // 正片首段文件
		      if (data.playListType==='film' && data.index===0 && !that.dataset.filmFirstPlayTime){
		        that.dataset.filmFirstPlayTime = +new Date();
		      }
		      // 正片非首段文件
		      if (data.playListType==='film' && data.index>0){
		        if (!that.dataset.filmPlayTime) that.dataset.filmPlayTime = {};
		        if (!that.dataset.filmPlayTime[data.index]){
		          that.dataset.filmPlayTime[data.index] = +new Date();
		        }
		      }
		    });
		    // 前贴广告上报处理
		    this.context.msg.on(api.eventApi.onSectionPlaying, function(data){
		      // 广告加载统计
		      var adFirstLoadTime='';
		      if (!that.context.msg.run(api.privateApi.isPlayingAd)){
		        that.playTimeHeartBeatStart();
		        if (!that.dataset.hasReportLoadingadLoadTime){
		          that.dataset.hasReportLoadingadLoadTime = true;
		          if (that.dataset.loadingadFirstPlayTime){
		            adFirstLoadTime = that.dataset.loadingadFirstPlayingTime - that.dataset.loadingadFirstPlayTime;
		          }else{
		            adFirstLoadTime = '';
		          }
		          that.reportStep6({
		            firstLoadTime: adFirstLoadTime,
		            loadingAdStatus: adFirstLoadTime===''?1:4
		          });
		        }
		      }else if (that.context.msg.run(api.privateApi.getCurrentPlayListType)==='loadingad'){
		        if (!that.dataset.loadingadFirstPlayingTime){
		          that.dataset.loadingadFirstPlayingTime = +new Date();
		          that.reportStep7();
		        }
		      }
	
		      // 正片首段文件
		      if (data.playListType==='film' &&
		          data.index===0 &&
		          !that.dataset.filmFirstPlayingTime &&
		          that.dataset.filmFirstPlayTime){
		        that.dataset.filmFirstPlayingTime = +new Date();
		        that.reportStep30({
		          loadTime: that.dataset.filmFirstPlayingTime - that.dataset.filmFirstPlayTime
		        });
		      }
		      // 正片非首段文件
		      if (data.playListType==='film' && data.index>0 && that.dataset.filmPlayTime){
		        if (!that.dataset.filmPlayingTime) that.dataset.filmPlayingTime = {};
		        if (!that.dataset.filmPlayingTime[data.index]){
		          that.dataset.filmPlayingTime[data.index] = +new Date();
		          that.reportStep50({
		            loadTime: that.dataset.filmPlayingTime[data.index] - that.dataset.filmPlayTime[data.index]
		          });
		        }
		      }
		    });
		    // 统计缓冲耗时
		    this.context.msg.on(api.eventApi.onSectionWaiting, function(data){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      if (data.playListType!=='film') return;
		      var isVideoSeeking = that.context.msg.run(api.privateApi.isVideoSeeking);
		      if (isVideoSeeking) return;
		      if (data.seeking) return;
		      if (!that.dataset.waitingTimes) that.dataset.waitingTimes = 1;
		      if (that.dataset.waitingTimes===1) return;
		      that.dataset.waitingTimes ++;
		      var key = api.eventApi.onSectionPlaying + '.waiting_report';
		      var watingStartTime = +new Date();
		      var waitingEndTime;
		      that.context.msg.once(key, function(){
		        var step;
		        waitingEndTime = +new Date();
		        if (data.index===0){
		          step = 31;
		        }else{
		          step = 51;
		        }
		        that.reportStep31_51({
		          step: step,
		          waitingTime: waitingEndTime - watingStartTime
		        });
		      });
		    });
		    // 统计缓冲耗时
		    this.context.msg.on(api.eventApi.onNetworkBadStart, function(data){
		      if (data.playListType!=='film') return;
		      if (data.isOnWaiting) return;
		      var isVideoSeeking = that.context.msg.run(api.privateApi.isVideoSeeking);
		      if ( isVideoSeeking ) return;
		      if (!that.dataset.waitingTimes) that.dataset.waitingTimes = 1;
		      else that.dataset.waitingTimes ++;
		      var key = api.eventApi.onNetworkBadEnd + '.waiting_report';
		      var watingStartTime = +new Date();
		      var waitingEndTime;
		      that.context.msg.once(key, function(){
		        var step;
		        waitingEndTime = +new Date();
		        if (data.index===0) step = 31;
		        else step = 51;
		        that.reportStep31_51({
		          step: step,
		          waitingTime: waitingEndTime - watingStartTime
		        });
		      });
		    });
		    // 统计封片切换
		    this.context.msg.on(api.eventApi.onSectionEnded, function(data){
		      var key;
		      if (data.playListTypeEnd && data.playListType==='loadingad'){
		        that.dataset.loadingadEndTime = +new Date();
		      }
		      // 正片播放完成，清理统计缓冲次数数据
		      if ( data.playListType==='film' ) {
		        that.dataset.waitingTimes = 0;
		      }
		      // 统计前贴广告播完切正片的耗时
		      if (data.playListTypeEnd && data.playListType==='loadingad'){
		        var loadingadEndTime = +new Date();
		        var filmStartTime;
		        key = api.eventApi.onSectionPlaying + '.switch_section_report';
		        that.context.msg.once(key, function(){
		          filmStartTime = +new Date();
		          that.reportStep35({
		            swtichTime: filmStartTime - loadingadEndTime
		          });
		        });
		      }
		      // 统计正片切换分片耗时
		      if (data.playListType==='film' && !data.playListTypeEnd){
		        var prevFilmEndTime = +new Date();
		        var nextFilmStartTime;
		        key = api.eventApi.onSectionPlaying + '.switch_film_section_report';
		        var duration = data.videoTag.duration;
		        that.context.msg.once(key, function(){
		          nextFilmStartTime = +new Date();
		          that.reportStep55({
		            swtichTime: nextFilmStartTime - prevFilmEndTime,
		            prevFilmDuration: duration
		          });
		        });
		      }
		      // 统计播放时长
		      if (data.playListType==='film' && data.playListTypeEnd){
		        that.playTimeHeartBeatStop(true);
		        that.reportPlayTimeOnEnded();
		      }
		    });
		    // 统计播放量
		    this.context.msg.on(api.eventApi.onReady, function(){
		      that.reportPlayTimeWhenPageInit();
		    });
		    // 统计下载速度
		    this.context.msg.on(api.eventApi.onSectionBufferEnd, function(data){
		      if (data && data.playListType==='loadingad' && data.hasOwnProperty('averageSpeed')){
		        if (!that.dataset.hasReportStep70){
		          that.reportStep70(data.averageSpeed);
		          that.dataset.hasReportStep70 = true;
		        }
		      }else if (data && data.playListType==='film' && data.hasOwnProperty('averageSpeed')){
		        var step;
		        if (data.index===0) step = 32;
		        else step = 52;
		        that.reportStep32_52({
		          waitingTimes: that.dataset.waitingTimes,
		          speed: data.averageSpeed,
		          step: step
		        });
		      }
		    });
		    // 统计seek耗时
		    this.context.msg.on(api.eventApi.onSeekStart, function(){
		      that.dataset.filmSeekStartTime = +new Date();
		    });
		    // 统计seek耗时
		    this.context.msg.on(api.eventApi.onSeekEnded, function(){
		      that.dataset.filmSeekEndTime = +new Date();
		      that.reportStep60({
		        seekCostTime: that.dataset.filmSeekEndTime - that.dataset.filmSeekStartTime
		      });
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionStart, function(){
		      that.dataset.setDefinitionStartTime = +new Date();
		      that.dataset.prevDefinition = that.context.msg.run(api.publicApi.getDefinition);
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionDone, function(){
		      that.dataset.setDefinitionDoneTime = +new Date();
		      that.reportStep100({
		        costTime: that.dataset.setDefinitionDoneTime - that.dataset.setDefinitionStartTime,
		        val1: 2,
		        predefn: that.dataset.prevDefinition
		      });
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionFail, function(errMsg){
		      that.dataset.setDefinitionFailTime = +new Date();
		      that.reportStep100({
		        costTime: that.dataset.setDefinitionFailTime - that.dataset.setDefinitionStartTime,
		        val1: 1,
		        predefn: that.dataset.prevDefinition
		      });
		    });
		  }
		};
	
	
		Txplayer.register('HdPlayerReport', HdPlayerReport);
	
	/***/ },
	/* 31 */
	/***/ function(module, exports, __webpack_require__) {
	
		var htmlstr = __webpack_require__(32);
		// htmlstr = htmlstr.replace(/txpdiv/g, 'div');
		var svgstr = __webpack_require__(33);
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
	
		var defaultConfig = {
		  hideInterval: 4000
		};
		function HtmlFrame(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  return this.init();
		}
		HtmlFrame.prototype = {
		  init: function(){
		    this.dataset.defer = $.Deferred();
		    if (!this.context.config.containerId) {
		      util.showError('HtmlFrame初始化错误', 'containerId没找到');
		      return;
		    }
		    this.dataset.$container = $('#' + this.context.config.containerId);
		    this.dataset.disableHideControl = false;
		    this.dataset.focusClass = 'txp_keyboard_focus';
		    this.dataset.ipadClass = 'txp_player_pad';
		    if (!this.dataset.$container || !this.dataset.$container.length) {
		      util.showError('HtmlFrame初始化错误', '没找到id=' + this.context.config.containerId + '的dom节点');
		      return;
		    }
		    this.loadHTML5PlayerSkin();
		    this.write();
		    this.exportsModuleApis();
		    this.addEventListener();
		    return this.dataset.defer;
		  },
		  getModStyle: function(){
		    var styles = [];
		    styles.push('width:' + getSize(this.context.config.width));
		    styles.push('height:' + getSize(this.context.config.height));
		    function getSize(obj){
		      obj = obj || '100%';
		      if (typeof obj === 'number') return parseInt(obj)+'px';
		      if (typeof obj==='string'){
		        if (obj.indexOf('%')>-1) return obj;
		        else return parseInt(obj)+'px';
		      }
		      return obj;
		    }
		    return styles.join(';');
		  },
		  loadHTML5PlayerSkin: function(){
		    if (this.context.config.playerType==='flash'){
		      this.dataset.defer.resolve();
		      return;
		    }
		    var that = this, cssUrl;
		    cssUrl = Txplayer.dataset.H5PlayerStyleUrl[this.context.config.playerType];
		    if (!cssUrl){
		      that.dataset.defer.resolve();
		      return;
		    }
		    util.loadCss(cssUrl).done(function(){
		      that.dataset.defer.resolve();
		    }).fail(function(){
		      util.showError('找不到播放器的皮肤样式文件', Txplayer.dataset.HdPlayerStyleUrl);
		    });
		  },
		  write: function(){
		    var useSVG = this.context.config.useSVG ? 1 : ( $.inArray(this.context.config.playerType, ['html5hd','ipadh5'])>-1 ? 1 : 0);
		    if (Txplayer.dataset.maxId>1) useSVG = false;
		    var tabindex = this.context.config.playerType==='html5hd' ? 'tabindex="-1"' : '';
		    var renderData = {
		      useSVG: useSVG,
		      ie: util.browser.ie,
		      playerid: 'txplayer_' + this.context.config.playerId,
		      mod_stype: this.getModStyle(),
		      svgstr: svgstr,
		      tabindex: tabindex
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.dataset.$container.html(htmldata);
		    this.dataset.$playermod = this.dataset.$container.find('#' + renderData.playerid);
		    this.context.msg.broadcast('setPlayerModel', this.dataset.$playermod);
		    if (location.hostname!=='v.qq.com' || this.context.config.showLogo===true){
		      this.dataset.$playermod.addClass('txp_player_external');
		    }
		    Txplayer.dataset.maxId++;
		    if (!util.mobile){
		      this.dataset.$playermod.addClass(this.dataset.focusClass);
		    }
		    if (this.context.config.playerType==='ipadh5'){
		      this.dataset.$playermod.addClass(this.dataset.ipadClass);
		    }
		  },
		  // 设置视频的尺寸大小
		  resize: function(options){
		    if (!options || (!options.width && !options.height)){
		      options = options || {};
		      options.width = this.context.config.width;
		      options.height = this.context.config.height;
		    }
		    this.dataset.$playermod.css(options);
		  },
		  // 视频尺寸自适应
		  autoResize: function(reference){
		    reference = reference || 'width';
		    var videoSize = this.context.msg.run(api.publicApi.getVideoSize);
		    if ( !(videoSize && videoSize.width && videoSize.height) ) return false;
		    if (reference==='width') {
		      var width = this.dataset.$playermod.width();
		      this.resize({
		        height: parseInt(width*(videoSize.height/videoSize.width))
		      });
		    }else{
		      var height = this.dataset.$playermod.height();
		      this.resize({
		        width: parseInt(height*(videoSize.width/videoSize.height))
		      });
		    }
		  },
		  mouseHoverHandler: function(){
		    var that = this;
		    this.dataset.$playermod.on('mouseenter', function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.showPlayerTools();
		    }).on('mouseleave', function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.hidePlayerTools();
		    }).on('mousemove', function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.showPlayerTools();
		      that.hidePlayerTools(defaultConfig.hideInterval);
		    });
		  },
		  showPlayerTools: function(){
		    if (this.dataset.disableShowControl) return;
		    var that = this;
		    that.context.msg.run(api.privateApi.showUiControl);
		    that.context.msg.run(api.privateApi.showUiTitle);
		    that.context.msg.run(api.privateApi.showUiFavorite);
		    that.dataset.isUiToolsShow = true;
		  },
		  hidePlayerTools: function(time){
		    if (this.dataset.disableHideControl) return;
		    time = time || 0;
		    var that = this;
		    var doHide = function(){
		      if (that.dataset.disableHideControl) return;
		      that.context.msg.broadcast(api.privateApi.hideUiControl);
		      that.context.msg.broadcast(api.privateApi.hideUiTitle);
		      that.context.msg.broadcast(api.privateApi.hideUiFavorite);
		      that.context.msg.broadcast(api.privateApi.hideUiSettingLayerOnMobile);
		      that.dataset.isUiToolsShow = false;
		    };
		    if (time) {
		      if (this.dataset.hide_TIMER) clearTimeout(this.dataset.hide_TIMER);
		      this.dataset.hide_TIMER = setTimeout(function(){
		        doHide();
		      }, time);
		    }else{
		      doHide();
		    }
		  },
		  togglePlayerUiTools: function(data){
		    data = $.type(data)!=='undefined' ? data : 3000;
		    if (this.dataset.isUiToolsShow){
		      this.hidePlayerTools();
		    }else{
		      this.showPlayerTools();
		      this.hidePlayerTools(data);
		    }
		  },
		  initHDPlayerEvent: function(){
		    var that = this;
		    this.dataset.$playermod.on('click mouseenter', function(e){
		      that.dataset.$playermod.removeClass(that.dataset.focusClass);
		    });
		    this.dataset.$playermod.on('mouseleave', function(e){
		      setTimeout(function(){
		        that.dataset.$playermod.addClass(that.dataset.focusClass);
		      }, 300);
		      that.hidePlayerTools();
		    });
		  },
		  addEventListener: function(){
		    var that = this;
		    if (!util.mobile){
		      this.mouseHoverHandler();
		      this.initHDPlayerEvent();
		    }
		    this.dataset.$playermod.on('click', function(e){
		      var elem = e.target, $elem = $(elem),
		        reportType = $elem.attr('data-report');
		      if (!reportType) {
		        reportType = $elem.parent().attr('data-report');
		      }
		      if (!reportType) {
		        reportType = $elem.parent().parent().attr('data-report');
		      }
		      if (!reportType) return;
		      that.context.msg.broadcast(Txplayer.apiList.privateApi.reportUsrAction,{
		        usr_action: reportType
		      });
		    });
		  },
		  destroy: function(data){
		    var that = this;
		    if (data==='all'){
		      for(var i in Txplayer.dataset._instance){
		        if (Txplayer.dataset._instance[i] &&
		          $.type(Txplayer.dataset._instance[i].destroy)==='function'){
		          Txplayer.dataset._instance[i].destroy();
		        }
		      }
		    }else if(data==='HtmlFrame'){
		      $.each(this.dataset.moduleApis,function(key, fn){
		        that.context.msg.off(key, fn);
		      });
		      $.each(this, function(key, val){
		        val = null;
		      });
		    }else if($.type(data)==='string'){
		      that.context.msg.broadcast(api.privateApi.destroyPlugin, data);
		    }else{
		      if (that.dataset.$container&&$.type(that.dataset.$container.animate)==='function'){
		        that.dataset.$container.animate({
		          height: 0
		        },300,function(){
		          that.dataset.$container.html('');
		        });
		      }else{
		        that.dataset.$container.html('');
		      }
		      var playerId = that.context.msg.run(api.publicApi.getPlayerId);
		      that.context.msg.broadcast(api.privateApi.destroyPlugin);
		      if (Txplayer.dataset._instance[playerId]) {
		        Txplayer.dataset._instance[playerId] = null;
		        delete Txplayer.dataset._instance[playerId];
		      }
		    }
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.moduleApis = {};
		    this.dataset.moduleApis[api.publicApi.resize] = function(data, options){
		      that.resize(data);
		    };
		    this.dataset.moduleApis[api.publicApi.autoResize] = function(data, options){
		      that.autoResize(data);
		    };
		    this.dataset.moduleApis[api.privateApi.disableHideControl] = function(data, options){
		      that.dataset.disableHideControl = !!data;
		    };
		    this.dataset.moduleApis[api.privateApi.disableShowControl] = function(data, options){
		      that.dataset.disableShowControl = !!data;
		    };
		    this.dataset.moduleApis[api.privateApi.showPlayerUiTools] = function(data, options){
		      that.showPlayerTools();
		    };
		    this.dataset.moduleApis[api.privateApi.hidePlayerUiTools] = function(data, options){
		      that.hidePlayerTools(data);
		    };
		    this.dataset.moduleApis[api.privateApi.togglePlayerUiTools] = function(data, options){
		      that.togglePlayerUiTools();
		    };
		    this.dataset.moduleApis[api.publicApi.destroy] = function(data, options){
		      that.destroy(data);
		    };
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('HtmlFrame', HtmlFrame);
	
	/***/ },
	/* 32 */
	/***/ function(module, exports) {
	
		module.exports = "<% if(ie){ %>\n  <div class=\"txp_player\" id=\"<%=playerid%>\" style=\"<%=mod_stype%>\">\n  </div>\n<% }else{%>\n  <txpdiv class=\"txp_player txp_player_desktop txp_autohide_progress\" id=\"<%=playerid%>\" style=\"<%=mod_stype%>\" <%=tabindex%>>\n  <% if(useSVG) {%>\n    <%=svgstr%>\n  <% } %>\n  <txpdiv class=\"txp_gradient_top\"></txpdiv>\n  <txpdiv class=\"txp_gradient_bottom\"></txpdiv>\n  </txpdiv>\n<% } %>";
	
	/***/ },
	/* 33 */
	/***/ function(module, exports) {
	
		module.exports = "<svg class=\"txp_svg_sprite\" display=\"none\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n\t<symbol id=\"txp_svg_collect\" viewBox=\"0 0 42 42\">\n\t\t<path d=\"M35.832 21.654a8.782 8.782 0 0 0-1.65-1.188 6.27 6.27 0 0 0-1.168-7.617 6.728 6.728 0 0 0-4.683-1.866 6.732 6.732 0 0 0-4.682 1.864l-2.654 2.542-2.653-2.542a6.736 6.736 0 0 0-4.683-1.864 6.727 6.727 0 0 0-4.68 1.864c-2.64 2.525-2.64 6.635 0 9.16l12.018 9.98.868-.72c.292.72.68 1.392 1.146 2l-2.012 1.723-13.44-11.5c-3.39-3.337-3.39-8.69-.05-11.98a8.694 8.694 0 0 1 6.148-2.507c2.328 0 4.513.89 6.152 2.506l1.188 1.173 1.19-1.174a8.697 8.697 0 0 1 6.15-2.507c2.33 0 4.513.89 6.152 2.507 2.786 2.746 3.212 6.92 1.344 10.144zM25 27h4v-4a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4h-4a1 1 0 0 1 0-2z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_collected\" viewBox=\"0 0 42 42\">\n\t\t<path d=\"M30.92 16.105c-5.567 0-10.08 4.453-10.08 9.947 0 2.49.934 4.762 2.467 6.507l-2.382 2.012L7.53 23.256c-3.378-3.283-3.378-8.55-.05-11.787 1.63-1.59 3.808-2.467 6.128-2.467 2.32 0 4.498.875 6.132 2.466l1.185 1.153 1.185-1.154c1.633-1.592 3.81-2.467 6.13-2.467s4.5.875 6.132 2.467c1.832 1.783 2.617 4.18 2.43 6.517a10.108 10.108 0 0 0-5.882-1.882zm-.008 1.416c4.768 0 8.632 3.82 8.632 8.53s-3.865 8.53-8.632 8.53-8.632-3.82-8.632-8.53 3.865-8.53 8.632-8.53zm-.685 13.206l.187-.183.222.217 6.25-6.105-1.604-1.567-4.853 4.74-2.58-2.518-1.583 1.547 3.96 3.87z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_share\" viewBox=\"0 0 42 42\">\n\t\t<path d=\"M35.364 15.706l-5.657 5.657a1 1 0 1 1-1.414-1.414l3.95-3.95H30c-7.92 0-14.637 5.117-17.045 12.223A.985.985 0 0 1 12 29a1 1 0 0 1-1-1 .98.98 0 0 1 .062-.307l-.04-.02C13.667 19.727 21.164 13.998 30 13.998h2.243l-3.95-3.95a1 1 0 1 1 1.414-1.415l5.657 5.657a1 1 0 0 1 0 1.414zM33 14.756v.486l.243-.243-.243-.244zM19 13H8v19h24v-8a1 1 0 0 1 2 0v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V12a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_play\" viewBox=\"0 0 36 36\">\n\t\t<path d=\"M11 27.992V8.006L26.993 18 11 27.99zm2-3.492L23.547 18 13 11.53V24.5z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_pause\" viewBox=\"0 0 36 36\">\n\t\t<path d=\"M23 28V8h2v20h-2zM11 8h2v20h-2V8z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_next\" viewBox=\"0 0 36 36\">\n\t\t<path d=\"M26 28V8h2v20h-2zM9 8.005L23.993 18 9 27.99V8.006zM11 24l9.654-6.034L11 12v12z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_stop\" viewBox=\"0 0 36 36\">\n\t\t<path d=\"M9 9h18v18H9V9z\" />\n\t</symbol>\n\t<symbol id=\"txp_svg_shop\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M18 13.836V14H8.793l-.552 2H18a2 2 0 1 1-2 2c0-.368.106-.707.278-1H8.722c.172.294.278.633.278 1a2 2 0 1 1-2-2h.206l.552-2H7v-.223L5.34 5H3V4h3v.01L6.147 4l.377 2H20v1h-.206L18 13.835zM18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM7 17a1 1 0 1 0 0 1.998 1 1 0 0 0 0-2zM6.714 7l1.134 6h9.357l1.575-6H6.714z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_eye\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M12 18c-5.468 0-9-6-9-6s3.533-6 9-6c5.467 0 9 6 9 6s-3.533 6-9 6zm0-11c-5.033 0-8 5-8 5s2.967 5 8 5c5.033 0 8-5 8-5s-2.967-5-8-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-5a2 2 0 1 0 0 3.998 2 2 0 0 0 0-4z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_volume\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M16.784 20.156l-.732-.68a10.952 10.952 0 0 0 0-14.953l.732-.68a11.948 11.948 0 0 1 0 16.313zm-3.13-3.72A7.952 7.952 0 0 0 15 12a7.955 7.955 0 0 0-1.345-4.437l.832-.555A8.958 8.958 0 0 1 16 12a8.954 8.954 0 0 1-1.512 4.99l-.833-.554zM11 20l-5-3H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2l5-3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm0-15L6 8H4v8h2l5 2.928V4.998z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_volume_damping\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M16.784 20.156 zm-3.13-3.72A7.952 7.952 0 0 0 15 12a7.955 7.955 0 0 0-1.345-4.437l.832-.555A8.958 8.958 0 0 1 16 12a8.954 8.954 0 0 1-1.512 4.99l-.833-.554zM11 20l-5-3H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2l5-3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm0-15L6 8H4v8h2l5 2.928V4.998z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_volume_mute\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M20.886 9.79l-2.697 2.696 2.694 2.695a.477.477 0 0 1-.674.675l-2.695-2.695-2.695 2.695a.477.477 0 0 1-.674-.674l2.695-2.694-2.696-2.697a.477.477 0 1 1 .674-.675l2.697 2.697 2.697-2.697a.477.477 0 1 1 .674.674zM11 20l-5-3H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2l5-3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm0-15L6 8H4v8h2l5 2.928V4.998z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_setting\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M19.835 13.62a7.913 7.913 0 0 1-1.18 2.78l.434 1.3-1.415 1.414-1.313-.438a8.103 8.103 0 0 1-2.74 1.13L13 21.05h-2l-.606-1.213A7.93 7.93 0 0 1 7.63 18.68l-1.304.434L4.91 17.7l.437-1.306a8.078 8.078 0 0 1-1.15-2.758l-1.222-.61v-2l1.192-.596a7.953 7.953 0 0 1 1.17-2.804L4.91 6.35l1.416-1.414 1.26.42c.847-.568 1.8-.992 2.836-1.2L11 3h2l.58 1.156a7.922 7.922 0 0 1 2.836 1.2l1.26-.42 1.413 1.414-.424 1.27c.552.84.94 1.787 1.152 2.8l1.208.605v2l-1.19.595zm-2.156 4.09v-1.416l-1.416 1.415h1.415zM12 20.06l1-1h-2l1 1zM6.32 17.71h1.415L6.32 16.293v1.415zM4.97 11.03l-1 1 1 1v-2zM6.32 6.352v1.414l1.415-1.414H6.32zm11.36 0h-1.416l1.415 1.414V6.352zM12.007 5H13l-1-1-1 1h.99a7 7 0 1 0 .018 0zm7.023 6.03v2l1-1-1-1zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z\"/> \n\t</symbol>\n\t<symbol id=\"txp_svg_bulb\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M15 16.317V17c0 .186-.065.35-.153.5.088.15.153.313.153.5v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2c0-.186.064-.35.153-.5A.97.97 0 0 1 9 17v-.683A6.994 6.994 0 0 1 5 10a7 7 0 0 1 14 0 6.994 6.994 0 0 1-4 6.317zM10 20h4v-2h-4v2zm2-16a6 6 0 0 0-6 6c0 2.215 1.214 4.128 3 5.167V15c.452.36 1 .593 1 .593V17h4v-1.5s.462-.096 1-.5v.167c1.786-1.04 3-2.953 3-5.167a6 6 0 0 0-6-6z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_window\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M19 16H9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zm0-11H9v10h10V5zM5 19h10v-2h1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2v1H5v10z\"/> \n\t</symbol>\n\t<symbol id=\"txp_svg_size\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M3 18V6h18v12H3zM4 7v10h13V7H4zm16 0h-2v10h2V7z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_size_true\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M3 18V6h18v12H3zM20 7H4v10h16V7z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_fake\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M4 20V4h16v16H4zM19 5H5v14h14V5zM9 7H7v2l-1 1V6h4L9 7zM7 17v-1h1v1h1l1 1H6v-4l1 1v2zm2-2v1H8v-1h1zm1-1v1H9v-1h1zm8-4.002l-1-1V8h-1V7h1-2l-1-1h4v3.998zM15 9V8h1v1h-1zm-1 1V9h1v1h-1zm2 7v-1h1v-1l1-1v4h-4l1-1h1zm-1-2h1v1h-1v-1zm-1-1h1v1h-1v-1zM9 9h1v1H9V9zM8 8h1v1H8V8zM7 7h1v1H7V7z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_fake_true\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M4 20V4h16v16H4zM19 5H5v14h14V5zM8 9V8h1V7l1-1v4H6l1-1h1zM7 7h1v1H7V7zM6 6h1v1H6V6zm1 9l-1-1h4v4l-1-1v-1H8v-1h1-2zm0 2v-1h1v1H7zm-1 1v-1h1v1H6zm9-9V8h1v1h1l1 1h-4V6l1 1v2zm2-2v1h-1V7h1zm1-1v1h-1V6h1zm-1 9h-2v2l-1 1v-4h4l-1 1zm-1 1h-1v-1h1v1zm1 1h-1v-1h1v1zm1 1h-1v-1h1v1z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_fullscreen\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M20 9h-1V5.714l-4.29 4.29-.717-.716L18.283 5H15V4h4.284l.006-.007.006.006H20v.703l.006.006-.006.005V9zM9 19v1H4.716l-.007.006L4.7 20H4v-.703l-.006-.007.006-.007v-4.285h1v3.284l4.29-4.29.716.715L5.716 19H9zm.29-8.995L5 5.715V9H4V4.714l-.006-.006L4 4.702V4h.704l.006-.007.006.006H9v1H5.715l4.29 4.29-.715.715zm5.42 3.988l4.29 4.29V15h1v4.284l.006.006-.006.006V20h-.703l-.007.005-.007-.006H15v-1h3.284l-4.29-4.292.715-.715z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_fullscreen_true\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M20 9v1h-5.283l-.007.005-.006-.006H14v-.705l-.006-.006.006-.007V4h1V8.28l4.29-4.29.716.716-4.29 4.29H20zM10 20H9v-4.285l-4.29 4.29-.716-.715L8.284 15H4v-1h5.284l.006-.007.006.006H10v.703l.006.006-.006.005V20zm0-10h-.704l-.006.005L9.283 10H4V9h4.284l-4.29-4.29.716-.717L9 8.283V4h1v5.284l.006.006-.006.005V10zm4 4.703V14h.704l.006-.007.006.006H20v1h-4.284l4.29 4.29-.716.716-4.29-4.29v4.283h-1v-5.284l-.006-.006.006-.007z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_select\" viewBox=\"0 0 12 12\">\n\t\t<path d=\"M11 12H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zm0-11H1v10h10V1z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_select_true\" viewBox=\"0 0 12 12\">\n\t\t<path d=\"M11.5 2a.5.5 0 0 1-.5-.5V1H1v2.5a.5.5 0 0 1-1 0V1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5a.5.5 0 0 1-.5.5zM.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 0 1 0 1H1a1 1 0 0 1-1-1V9.5A.5.5 0 0 1 .5 9zM.285 6.643a.96.96 0 0 1 1.358-1.358L4.517 8.16l5.492-4.613a1 1 0 0 1 1.414 1.415L5.18 10.204a1 1 0 0 1-1.415 0c-.016-.017-.022-.04-.037-.056-.014-.012-.026-.008-.04-.022L.284 6.643zM6.5 11H11V7.5a.5.5 0 0 1 1 0V11a1 1 0 0 1-1 1H6.5a.5.5 0 0 1 0-1z\"/>\n\t</symbol>\n</svg>";
	
	/***/ },
	/* 34 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(35);
	
		function UiBrowserFullScreen(context) {
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiBrowserFullScreen.prototype = {
		  init: function() {
		    this.dataset.browserFullscreenClass = 'txp_mode_fullscreen';
		    this.dataset.isBrowserFullscreen = false;
		    this.dataset.isWindowFullscreen = false;
		    this.dataset.playerConfig = this.context.msg.run(api.privateApi.getPlayerConfig);
		    this.write();
		    this.addEventListerner();
		    this.exportsModuleApis();
		  },
		  write: function() {
		    var renderData = {
		      fakeBtn: 'txp-ui-control-fakebtn',
		      toolTip: 'browser-fullscreen',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$fakebtn = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.fakeBtn + '"]');
		    this.dataset.$txp_tooltip = this.dataset.$fakebtn.find('[data-role="' + renderData.toolTip + '"]');
		    this.dataset.$playermod = this.context.$mod.$playermod;
		    this.initDisplay();
		  },
		  remove: function(){
		    this.dataset.$fakebtn.remove();
		  },
		  initDisplay: function(){
		    if (this.dataset.playerConfig.showBrowserFullScreen){
		      this.dataset.$fakebtn.removeClass(Txplayer.dataset.hideClass);
		    }else{
		      this.dataset.$fakebtn.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  toggleBrowserFullScreen: function(){
		    if (this.dataset.isBrowserFullscreen) {
		      this.context.superMsg.broadcast(api.publicApi.exitBrowserFullscreen);
		    } else {
		      this.context.superMsg.broadcast(api.publicApi.enterBrowserFullscreen);
		    }
		  },
		  addEventListerner: function() {
		    var that = this;
		    this.dataset.$fakebtn.on(Txplayer.dataset.clickEventName, function() {
		      that.toggleBrowserFullScreen();
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.moduleApis = {};
		    this.dataset.moduleApis[api.publicApi.toggleBrowserFullScreen] = function(){
		      that.toggleBrowserFullScreen();
		    }
		    this.dataset.moduleApis[api.publicApi.enterBrowserFullscreen] = function() {
		      var enterFullscreen = function(){
		        that.context.$mod.$playermod.addClass(that.dataset.browserFullscreenClass);
		        that.dataset.$fakebtn.attr('data-status', 'true');
		        that.dataset.isBrowserFullscreen = true;
		        that.dataset.$txp_tooltip.html('退出网页全屏');
		        $("html").addClass('txp_html_fullscreen');
		        that.context.userMsg.broadcast(api.eventApi.onBrowserFullscreenChange,that.dataset.isBrowserFullscreen);
		      };
		      if(that.context.superMsg.run(api.publicApi.isWindowFullscreen)){
		        that.context.msg.once(api.eventApi.onWindowFullscreenChange, function(isFullScreen){
		            setTimeout(function(){
		              enterFullscreen();
		            },10);
		        });
		      }else{
		        enterFullscreen();
		      }
		      that.context.superMsg.broadcast(api.publicApi.exitWindowFullscreen);
		    }
		    this.dataset.moduleApis[api.publicApi.exitBrowserFullscreen] = function(data, options) {
		      data = data || {};
		      //退出浏览器全屏
		      if (!data.noUpdateClass){
		        that.context.$mod.$playermod.removeClass(that.dataset.browserFullscreenClass);
		        that.context.superMsg.broadcast(api.publicApi.exitWindowFullscreen);
		      }
		      that.dataset.$fakebtn.attr('data-status', false);
		      that.dataset.isBrowserFullscreen = false;
		      that.dataset.$txp_tooltip.html('网页全屏');
		      $("html").removeClass('txp_html_fullscreen');
		      that.context.userMsg.broadcast(api.eventApi.onBrowserFullscreenChange, that.dataset.isBrowserFullscreen);
		      that.dataset.$playermod.focus();
		    }
		    this.dataset.moduleApis[api.publicApi.isBrowserFullscreen] = function(data, options) {
		      options.data = that.dataset.isBrowserFullscreen;
		    }
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('UiBrowserFullScreen', UiBrowserFullScreen);
	
	
	/***/ },
	/* 35 */
	/***/ function(module, exports) {
	
		module.exports = "<button class=\"txp_btn txp_btn_fake txp_none\" data-role=\"<%=fakeBtn%>\" data-status=\"false\" data-report=\"browser-fullscreen\">\n  <svg class=\"txp_icon txp_icon_fake\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_symbol txp_svg_fake\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_fake\"></use>\n    <use class=\"txp_svg_symbol txp_svg_fake_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_fake_true\"></use>\n  </svg>\n  <txpdiv class=\"txp_tooltip\" data-role=\"<%=toolTip%>\">网页全屏</txpdiv>\n</button>\n";
	
	/***/ },
	/* 36 */
	/***/ function(module, exports, __webpack_require__) {
	
		var htmlstr = __webpack_require__(37);
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api             = Txplayer.apiList;
		function UiControl(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		UiControl.prototype = {
		  init: function(){
		    this.dataset.controlHideClass = 'txp_autohide';
		    this.write();
		    this.addEventListener();
		    this.exportsModuleApis();
		    this.loadSubPlugins();
		  },
		  write: function(){
		    var renderData = {
		      controlWrap: 'txp-control-wrap',
		      progressRole: 'txp-control-progress',
		      buttonsLeftRole: 'txp-control-left',
		      buttonsRightRole: 'txp-control-right',
		      hide: Txplayer.dataset.hideClass,
		      autoHide: this.dataset.controlHideClass
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$playermod = this.context.dataset.$playermod;
		    this.dataset.$controlWrap = this.context.dataset.$playermod.find('[data-role="'+renderData.controlWrap+'"]')
		    this.dataset.$progressmod = this.context.dataset.$playermod.find('[data-role="'+renderData.progressRole+'"]');
		    this.dataset.$buttonsleftmod = this.context.dataset.$playermod.find('[data-role="'+renderData.buttonsLeftRole+'"]');
		    this.dataset.$buttonsrightmod = this.context.dataset.$playermod.find('[data-role="'+renderData.buttonsRightRole+'"]');
		    this.context.dataset.$playermod.addClass(this.dataset.controlHideClass);
		  },
		  remove: function(){
		    this.dataset.$controlWrap.remove();
		  },
		  loadSubPlugins: function(){
		    var plugins = [];
		    var that = this;
		    if (this.context.pluginConfig &&
		      $.type(this.context.pluginConfig.subPlugins)==='array') {
		      plugins = this.context.pluginConfig.subPlugins.slice(0);
		    }
		    var context = {
		      'superMsg': this.context.msg,
		      'userMsg': this.context.userMsg,
		      'msg': this.msg,
		      '$mod': {
		        '$playermod': this.dataset.$playermod,
		        '$progressmod': this.dataset.$progressmod,
		        '$buttonsleftmod': this.dataset.$buttonsleftmod,
		        '$buttonsrightmod': this.dataset.$buttonsrightmod
		      }
		    };
		    util.loadPlugins.call(this, plugins, context, this.context.config.settings);
		  },
		  getPlayerConfig: function(){
		    return this.context.config;
		  },
		  handlerMouse: function(){
		    var that = this;
		    this.dataset.$controlWrap.on('mouseenter touchstart', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, true);
		    }).on('mouseleave touchend', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, false);
		    });
		  },
		  handlerControlShowOnMobile: function(){
		    var that = this;
		    this.dataset.$controlWrap.on('touchend', function(e){
		      // 点击控制栏，延时3秒隐藏
		      that.context.msg.broadcast(api.privateApi.showPlayerUiTools);
		      that.context.msg.broadcast(api.privateApi.hidePlayerUiTools, 3000);
		      that.context.msg.broadcast(api.privateApi.hideUiSettingLayerOnMobile,{
		        targetElem: e.target
		      });
		    });
		  },
		  isControlShow: function(){
		    if (this.dataset.$controlWrap.hasClass(Txplayer.dataset.hideClass)) return false;
		    if (this.context.dataset.$playermod.hasClass(this.dataset.controlHideClass)) {
		      if (this.context.dataset.$playermod.hasClass('txp_autohide_progress')) {
		        return false;
		      }
		      return true;
		    }
		    return true;
		  },
		  addEventListener: function(){
		    if (!util.mobile) this.handlerMouse();
		    if (util.mobile) this.handlerControlShowOnMobile();
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.hideUiControl] = function(data,options){
		      data = data || {isMoveBelow: true};
		      if (data.isMoveBelow) {
		        that.context.dataset.$playermod.addClass(that.dataset.controlHideClass);
		      }else {
		        that.dataset.$controlWrap.addClass(Txplayer.dataset.hideClass);
		      }
		    }
		    this.dataset.privateApis[api.privateApi.showUiControl] = function(data, options){
		      data = data || {isMoveBelow: true};
		      if (data.isMoveBelow) {
		        that.context.dataset.$playermod.removeClass(that.dataset.controlHideClass);
		      }else {
		        that.dataset.$controlWrap.removeClass(Txplayer.dataset.hideClass);
		      }
		    }
		    this.dataset.privateApis[api.privateApi.isControlShow] = function(data, options){
		      options.data = that.isControlShow();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
	
		    this.dataset.selfApis = {};
		    this.dataset.selfApis[api.privateApi.getPlayerConfig] = function(data, options){
		      options.data = that.getPlayerConfig();
		    }
		    $.each(this.dataset.selfApis,function(key, fn){
		      that.msg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('UiControl', UiControl);
	
	/***/ },
	/* 37 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=controlWrap%>\" class=\"txp_bottom\">\n  <txpdiv class=\"txp_progress_bar_container\" data-role=\"<%=progressRole%>\"></txpdiv>\n  <txpdiv class=\"txp_controls\">\n    <txpdiv class=\"txp_left_controls\" data-role=\"<%=buttonsLeftRole%>\"></txpdiv>\n    <txpdiv class=\"txp_right_controls\" data-role=\"<%=buttonsRightRole%>\"></txpdiv>\n  </txpdiv>\n</txpdiv>";
	
	/***/ },
	/* 38 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(39);
	
		function UiControlPlay(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiControlPlay.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListener();
		  },
		  write: function(){
		    var renderData = {
		      playBtn: 'txp-ui-control-playbtn',
		      tips: 'txp-ui-control-playbtn-tips',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsleftmod.append(htmldata);
		    this.dataset.$playbtn = this.context.$mod.$buttonsleftmod.find('[data-role="'+renderData.playBtn+'"]');
		    this.dataset.$tips = this.context.$mod.$buttonsleftmod.find('[data-role="'+renderData.tips+'"]');
		  },
		  remove: function(){
		    this.dataset.$playbtn.remove();
		  },
		  initPlayState: function(){
		    var state = this.context.superMsg.run(api.publicApi.getPlayerState);
		    if (state===1 || state===3){
		      this.dataset.$playbtn.attr('data-status', 'pause');
		      this.dataset.$tips.html('暂停');
		    }else{
		      this.dataset.$playbtn.attr('data-status', 'play');
		      this.dataset.$tips.html('播放');
		    }
		  },
		  addEventListener: function(){
		    var that = this;
		    this.initPlayState();
		    this.dataset.$playbtn.on(Txplayer.dataset.clickEventName, function(){
		      var $this = $(this);
		      var isPlayingAd = that.context.superMsg.run(api.privateApi.isPlayingAd);
		      if (isPlayingAd) return;
		      if ($this.attr('data-status')==='pause') {
		        that.context.superMsg.broadcast(api.publicApi.pause);
		        that.context.superMsg.broadcast(api.eventApi.onUserPausePlayer);
		      }else{
		        that.context.superMsg.broadcast(api.publicApi.play);
		      }
		    });
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(){
		      that.dataset.$playbtn.attr('data-status', 'pause');
		      that.dataset.$tips.html('暂停');
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPause)] = function(){
		      that.dataset.$playbtn.attr('data-status', 'play');
		      that.dataset.$tips.html('播放');
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('UiControlPlay', UiControlPlay);
	
	/***/ },
	/* 39 */
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=playBtn%>\" class=\"txp_btn txp_btn_play\" data-status=\"play\">\n  <svg class=\"txp_icon txp_icon_play\" version=\"1.1\" viewBox=\"0 0 36 36\">\n    <use class=\"txp_svg_symbol txp_svg_play\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_play\"></use>\n    <use class=\"txp_svg_symbol txp_svg_pause\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_pause\"></use>\n    <use class=\"txp_svg_symbol txp_svg_stop\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_stop\"></use>\n  </svg>\n  <txpdiv data-role=\"<%=tips%>\" class=\"txp_tooltip\">播放</txpdiv>\n</button>";
	
	/***/ },
	/* 40 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(41);
		var definitionListStr = __webpack_require__(42);
	
		function UiDefinition(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiDefinition.prototype = {
		  init: function(){
		    this.dataset.currentClass = 'txp_current';
		    this.write();
		    this.addEventListener();
		  },
		  write: function(){
		    var renderData = {
		      definition: 'txp-ui-control-definition',
		      hoverBtn: 'txp-ui-control-definition-hover',
		      list: 'txp-ui-control-definition-list',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$definition = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.definition+'"]');
		    this.dataset.$hover = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.hoverBtn+'"]');
		    this.dataset.$list = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.list+'"]');
		  },
		  remove: function(){
		    this.dataset.$definition.remove();
		    this.dataset.$list.remove()
		  },
		  getCurrentDefinitionName: function(){
		    var list = this.context.superMsg.run(api.publicApi.getDefinitionList);
		    var currentDefinition = this.context.superMsg.run(api.publicApi.getDefinition);
		    if ( $.type(list)!=='array' ) return '';
		    if (!currentDefinition) return '';
		    var cname= '';
		    $(list).each(function(idx, item){
		      if (item.name===currentDefinition) {
		        cname = item.cname;
		        return false;
		      }
		    });
		    cname = cname.replace(/\d+P?/g,'');
		    return cname;
		  },
		  updateDefinitionList: function(isGetinfoCallback){
		    var that = this;
		    var list = that.context.superMsg.run(api.publicApi.getDefinitionList);
		    var currentDefinition = that.context.superMsg.run(api.publicApi.getDefinition);
		    // var hasFHDDefinition = false;;
		    if ( isGetinfoCallback && $.type(list)!=='array' || ($.type(list)==='array' && !list.length)) {
		      that.dataset.$definition.addClass(Txplayer.dataset.hideClass);
		      return;
		    }
		    if (!isGetinfoCallback && !list && ($.type(list)==='array') && !list.length){
		      return;
		    }
		    $(list).each(function(idx, item){
		      if (item.name==='fhd'){
		        if (item.lmt===1 || item.lmt===3) item.viplogo = 1;
		        return;
		      }
		    });
		    if (!currentDefinition && (!list || list.length<=1)) {
		      that.dataset.$definition.addClass(Txplayer.dataset.hideClass);
		      return ''
		    }
		    var renderData = {
		      list: list,
		      currentDefinition: currentDefinition,
		      currentClass: that.dataset.currentClass
		    };
		    var currentDefName = that.getCurrentDefinitionName();
		    var htmldata = $.tmpl(definitionListStr,renderData);
		    that.dataset.$list.html(htmldata);
		    if (currentDefName) that.dataset.$hover.html( currentDefName );
		    that.dataset.$definition.removeClass(Txplayer.dataset.hideClass);
		  },
		  addEventListener: function(){
		    var that = this;
		    that.updateDefinitionList(false);
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onGetVideoUrlSuccess)] = function(){
		      that.updateDefinitionList(true);
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		    this.dataset.$list.on('click', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      var $this = $(e.target);
		      var defn = $this.data('definition');
		      if (!defn) return;
		      if ($this.hasClass(that.dataset.currentClass)) return;
		      that.context.superMsg.run(api.publicApi.setDefinition, defn);
		    });
		    // for firefox BUG:
		    // Children of button does not respond to :hover
		    // https://bugzilla.mozilla.org/show_bug.cgi?id=843003
		    this.dataset.$definition.on('mouseenter', function(){
		      if (that.dataset.hasHandlerFirfox) return;
		      if (!util.browser.firefox) return;
		      var $layer = that.dataset.$list;
		      var $parent = $layer.parent();
		      $layer.css({
		        'left': $parent.position().left - $layer.width()/2 + $parent.width()/2
		      });
		      $parent.after($layer);
		      that.dataset.hasHandlerFirfox = true;
		    });
		  }
		};
	
		Txplayer.register('UiDefinition', UiDefinition);
	
	/***/ },
	/* 41 */
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=definition%>\" class=\"txp_btn txp_btn_definition\">\n  <txpdiv class=\"txp_label\" data-role=\"<%=hoverBtn%>\">自适应</txpdiv>\n  <txpdiv class=\"txp_popup txp_popup_definition\" data-role=\"<%=list%>\"></txpdiv>\n</button>";
	
	/***/ },
	/* 42 */
	/***/ function(module, exports) {
	
		module.exports = "<% for(var len = list.length,i=len-1; i>=0; i--){%>\n  <txpdiv class=\"txp_menuitem <% if(list[i].name===currentDefinition) {%><%=currentClass%><% } %>\" data-definition=\"<%=list[i].name%>\" data-report=\"switch-definition\">\n    <%=list[i].cname%>\n    <% if(list[i].viplogo){ %>\n      <txpdiv class=\"txp_icon_vip\">会员</txpdiv>\n    <% } %>\n  </txpdiv>\n<% } %>";
	
	/***/ },
	/* 43 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(44);
	
		function UiDialog(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiDialog.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListerner();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      dialog: 'txp-ui-dialog',
		      dialogText: 'txp-ui-dialog-text',
		      dialogErrCode: 'txp-ui-dialog-errcode',
		      dialogBtn: 'txp-ui-dialog-button',
		      hide: Txplayer.dataset.hideClass
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$dialog = this.context.dataset.$playermod.find('[data-role="'+renderData.dialog+'"]');
		    this.dataset.$dialogText = this.context.dataset.$playermod.find('[data-role="'+renderData.dialogText+'"]');
		    this.dataset.$dialogErrCode = this.context.dataset.$playermod.find('[data-role="'+renderData.dialogErrCode+'"]');
		    this.dataset.$dialogBtn = this.context.dataset.$playermod.find('[data-role="'+renderData.dialogBtn+'"]');
		  },
		  remove: function(){
		    this.dataset.$dialog.remove();
		  },
		  addEventListerner: function(){
		    var that = this;
		    this.dataset.$dialogBtn.on('click', function(){
		      if (that.dataset.$dialogBtn.data('type')==='link'){
		        var url = that.context.config.otherVideoLink;
		        if (url) window.open(url);
		      }
		    });
		    this.context.msg.on(api.eventApi.onError, function(data){
		      if (data && (data.type!=='film' && data.type!=='cgi')) return;
		      that.context.msg.broadcast(api.privateApi.showErrorUiTips, data);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.showErrorUiTips] = function(data){
		      that.dataset.$dialog.removeClass(Txplayer.dataset.hideClass);
		      that.dataset.$dialogText.html(data.msg);
		      that.dataset.$dialogErrCode.html('[错误码:' + data.code+ ' ]');
		      // 禁止显示控制栏
		      that.context.msg.broadcast(api.privateApi.disableShowControl, true);
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('UiDialog', UiDialog);
	
	/***/ },
	/* 44 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=dialog%>\" class=\"txp_overlay_dialog <%=hide%>\">\n  <txpdiv class=\"txp_dialog\">\n    <txpdiv class=\"txp_dialog_body\">\n      <txpdiv data-role=\"<%=dialogText%>\" class=\"txp_text\">呃~Sorry，您要观看的节目不存在！</txpdiv>\n      <txpdiv data-role=\"<%=dialogErrCode%>\" class=\"txp_error_code\">[错误码：001]</txpdiv>\n    </txpdiv>\n    <txpdiv class=\"txp_dialog_footer\">\n      <button data-type=\"link\" data-role=\"<%=dialogBtn%>\" class=\"txp_btn txp_btn_primary\">点击观看其他精彩节目</button>\n    </txpdiv>\n  </txpdiv>\n</txpdiv>";
	
	/***/ },
	/* 45 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(46);
	
		function UiFavorite(context) {
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiFavorite.prototype = {
		  init: function() {
		    this.dataset.isFollow = 0; //预先获取是否已经关注该id
		    this.write();
		    this.addEventListerner();
		    this.exportsModuleApis();
		  },
		  write: function() {
		    var renderData = {
		      hide: Txplayer.dataset.hideClass,
		      favorite: 'txp-ui-favorite',
		      favoriteBtn: 'txp-ui-favorite-btn'
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$favorite = this.context.dataset.$playermod.find('[data-role=' + renderData.favorite + ']');
		    this.dataset.$favoriteBtn = this.context.dataset.$playermod.find('[data-role=' + renderData.favoriteBtn + ']');
		  },
		  remove: function(){
		    this.dataset.$favorite.remove();
		  },
		  hasSupportFollowApi: function(){
		    if ($.type(this.context.config.followHandler)==='function') return true;
		    return false;
		  },
		  getFollowStatus: function(){
		    if (!this.hasSupportFollowApi()) return;
		    var that = this;
		    this.context.userMsg.on('followStateChange', function(data){
		      if (data.state){
		        that.dataset.$favoriteBtn.attr('data-status', true);
		      }else{
		        that.dataset.$favoriteBtn.attr('data-status', false);
		      }
		    });
		  },
		  addEventListerner: function() {
		    var that = this;
		    this.dataset.$favorite.on('click', function() {
		      if (!that.hasSupportFollowApi()) {
		          var vid = that.context.msg.run(api.publicApi.getVid);
		          var url = 'http://v.qq.com/mytv/addfollow.html?vid=' + vid + '&host=' + encodeURIComponent(document.URL);
		          window.open(url);
		      } else {
		        that.context.config.followHandler({
		          vid: that.context.msg.run(api.publicApi.getVid)
		        });
		      }
		    });
		    this.dataset.$favorite.on('mouseenter', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, true);
		    }).on('mouseleave', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, false);
		    });
	
		    this.context.msg.on(api.eventApi.onReady, function(){
		      that.getFollowStatus();
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.moduleApis = {};
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.hideUiFavorite] = function() {
		      that.dataset.$favorite.addClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.privateApis[api.privateApi.showUiFavorite] = function() {
		      that.dataset.$favorite.removeClass(Txplayer.dataset.hideClass);
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
	
		};
	
		Txplayer.register('UiFavorite', UiFavorite);
	
	
	/***/ },
	/* 46 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=favorite%>\" class=\"txp_top_btns <%=hide%>\">\n  <button data-role=\"<%=favoriteBtn%>\" class=\"txp_btn txp_btn_collect\" data-status=\"false\" data-report=\"follow\">\n    <svg class=\"txp_icon txp_icon_collect\" version=\"1.1\" viewBox=\"0 0 42 42\">\n      <use class=\"txp_svg_symbol txp_svg_collect\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_collect\"></use>\n      <use class=\"txp_svg_symbol txp_svg_collected\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_collected\"></use>\n    </svg>\n  </button>\n</txpdiv>";
	
	/***/ },
	/* 47 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(48);
	
		function UiLoading(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiLoading.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListerner();
		  },
		  write: function(){
		    var renderData = {
		      loading: 'txp-ui-loading',
		      hide: Txplayer.dataset.hideClass
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$loading = this.context.dataset.$playermod.find('[data-role="'+renderData.loading+'"]');
		  },
		  remove: function(){
		    this.dataset.$loading.remove();
		  },
		  addEventListerner: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(){
		      that.dataset.$loading.addClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionSeeked)] = function(){
		      that.dataset.$loading.addClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onNetworkBadEnd)] = function(){
		      that.dataset.$loading.addClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionLoadstart)] = function(){
		      that.dataset.$loading.removeClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionSeeking)] = function(){
		      that.dataset.$loading.removeClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionWaiting)] = function(){
		      that.dataset.$loading.removeClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onNetworkBadStart)] = function(){
		      that.dataset.$loading.removeClass(Txplayer.dataset.hideClass);
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiLoading', UiLoading);
	
	/***/ },
	/* 48 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=loading%>\" class=\"txp_overlay_loading <%=hide%>\">\n  <txpdiv class=\"txp_icon_loading\"></txpdiv>\n</txpdiv>";
	
	/***/ },
	/* 49 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(50);
	
		function UiLogo(context) {
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiLogo.prototype = {
		  init: function(){
		    this.dataset.playerConfig = this.context.msg.run(api.privateApi.getPlayerConfig);
		    this.dataset.vidsList = this.dataset.playerConfig.vidsList;
		    this.dataset.homepage = 'http://v.qq.com/'
		    this.write();
		    this.initDisplay();
		    this.addEventListerner();
		    this.exportsModuleApis();
		  },
		  initDisplay: function(){
		    if (this.dataset.playerConfig.showLogo) {
		      this.dataset.$logo.removeClass(Txplayer.dataset.hideClass);
		    }else{
		      this.dataset.$logo.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  write: function(){
		    var renderData = {
		      logo: 'txp-ui-control-logo',
		      hideClass: Txplayer.dataset.hideClass,
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$logo = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.logo+'"]');
		  },
		  remove: function(){
		    this.dataset.$logo.remove();
		  },
		  getPlayUrlFromVid: function(vid, exstr, start){
		    if(exstr!="0") exstr = "_" + exstr;
		    else exstr = '';
		    if (!vid) return '';
		    var url = this.dataset.homepage + "page/"+vid.substr(0,1)+"/"+vid.substr(vid.length-2,1)+"/"+vid.substr(vid.length-1,1)+"/"+vid+exstr+".html";
		    if(start){
		      url += '?start=' + parseInt(start);
		    }
		    return url;
		  },
		  openAtTencentVideo: function(){
		    var vid = this.context.superMsg.run(api.publicApi.getVid);
		    var start = this.context.superMsg.run(api.publicApi.getCurrentTime);
		    if (!vid) return;
		    var url = this.getPlayUrlFromVid(vid, 0, start);
		    if (url){
		      util.showInfo('到 腾讯视频 播放', url);
		      window.open(url);
		      // 点击logo上报
		    }
		  },
		  addEventListerner: function() {
		    var that = this;
		    this.dataset.$logo.on('click', function(){
		      that.openAtTencentVideo();
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.openAtTencentVideo] = function(){
		      that.openAtTencentVideo();
		    }
		    $.each(this.dataset.privateApis, function(key, fn){
		      that.context.superMsg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('UiLogo', UiLogo);
	
	
	/***/ },
	/* 50 */
	/***/ function(module, exports) {
	
		module.exports = "<a data-role=\"<%=logo%>\" class=\"txp_btn txp_btn_logo <%=hideClass%>\" data-report=\"click-logo\">\n  <span class=\"txp_logo\"></span>\n  <txpdiv class=\"txp_tooltip\">到腾讯视频观看此视频</txpdiv>\n</a>";
	
	/***/ },
	/* 51 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(52);
	
		function UiPlay(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiPlay.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListener();
		  },
		  write: function(){
		    this.dataset.pauseClass = '';
		    var renderData = {
		      hideClass: Txplayer.dataset.hideClass,
		      playLayer: 'txp-ui-play-layer',
		      btn: 'txp-ui-play-btn'
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$playLayer = this.context.dataset.$playermod.find('[data-role="'+renderData.playLayer+'"]');
		    this.dataset.$btn = this.context.dataset.$playermod.find('[data-role="'+renderData.btn+'"]');
	
		    this.initDisPlay();
		  },
		  initDisPlay: function(){
		    var state = this.context.msg.run(api.publicApi.getPlayerState);
		    if (state===-1 || state===false || state===null){
		      this.dataset.$playLayer.removeClass(Txplayer.dataset.hideClass);
		    }
		  },
		  remove: function(){
		    this.dataset.$playLayer.remove();
		    this.dataset.$btn.remove();
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.$btn.on('click', function(){
		      var $this = $(this);
		      if ($this.hasClass(that.dataset.pauseClass)) {
		        that.context.msg.broadcast(api.publicApi.pause);
		        that.context.msg.broadcast(api.eventApi.onUserPausePlayer);
		      }else{
		        that.context.msg.broadcast(api.publicApi.play);
		      }
		    });
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(){
		      that.dataset.$btn.addClass(that.dataset.pauseClass);
		      that.dataset.$playLayer.addClass(Txplayer.dataset.hideClass);
		    }
		    // this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPause)] = function(){
		    //   that.dataset.$btn.removeClass(that.dataset.pauseClass);
		    //   that.dataset.$playLayer.removeClass(Txplayer.dataset.hideClass);
		    // }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiPlay', UiPlay);
	
	/***/ },
	/* 52 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=playLayer%>\" class=\"txp_overlay_play <%=hideClass%>\">\n  <button data-role=\"<%=btn%>\" class=\"txp_btn txp_btn_play_lg\">\n    <svg class=\"txp_icon txp_icon_play\" version=\"1.1\" viewBox=\"0 0 36 36\">\n      <use class=\"txp_svg_play\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_play\"></use>\n    </svg>\n  </button>\n</txpdiv>";
	
	/***/ },
	/* 53 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(54);
	
		function UiPlayerAd(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiPlayerAd.prototype = {
		  init: function(){
		    this.dataset.volume = this.context.config.volume;
		    this.dataset.muteClass = 'txp_btn_ad_mute';
		    this.write();
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      hideClass: Txplayer.dataset.hideClass,
		      noSkipTipsText: '为了给腾讯视频用户提供更多优质美剧，应版权方（华纳）要求，好莱坞会员在观看华纳美剧时无法跳过广告（《吸血鬼日记》《破产姐妹》《无耻之徒》等）。我们会为会员用户继续争取免广告权益，请您继续支持，谢谢！',
		      canSkip: 'txp-ui-loadingad-canskip',
		      noSkip: 'txp-ui-loadingad-noskip',
		      linkArea: 'txp-ui-loadingad-linkarea',
		      detail: 'txp-ui-loadingad-detail',
		      adMod: 'txp-ui-loadingad-mod',
		      volume: 'txp-ui-loadingad-volume',
		      time: 'txp-ui-loadingad-time',
		      close: 'txp-ui-loadingad-close',
		      closeText: 'txp-ui-loadingad-closetext',
		      why: 'txp-ui-loadingad-why',
		      pauseAd: 'txp-ui-loadingad-pasuead',
		      pauseAdImg: 'txp-ui-loadingad-pasuead-img',
		      pauseAdClose: 'txp-ui-loadingad-pausead-close',
		      noSkipTips: 'txp-ui-loadingad-no-skip-tips',
		      noSkipTipsClose: 'txp-ui-loadingad-no-skip-tips-close',
		      isSkipAdButtonShow: this.isSkipAdButtonShow()
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$ad =this.context.dataset.$playermod.find('[data-role='+renderData.adMod+']');
		    this.dataset.$canSkip =this.context.dataset.$playermod.find('[data-role='+renderData.canSkip+']');
		    this.dataset.$noSkip =this.context.dataset.$playermod.find('[data-role='+renderData.noSkip+']');
		    this.dataset.$linkArea =this.context.dataset.$playermod.find('[data-role='+renderData.linkArea+']');
		    this.dataset.$detail =this.context.dataset.$playermod.find('[data-role='+renderData.detail+']');
		    this.dataset.$volume =this.context.dataset.$playermod.find('[data-role='+renderData.volume+']');
		    this.dataset.$time =this.context.dataset.$playermod.find('[data-role='+renderData.time+']');
		    this.dataset.$close =this.context.dataset.$playermod.find('[data-role='+renderData.close+']');
		    this.dataset.$closeText =this.context.dataset.$playermod.find('[data-role='+renderData.closeText+']');
		    this.dataset.$why =this.context.dataset.$playermod.find('[data-role='+renderData.why+']');
		    this.dataset.$pauseAd =this.context.dataset.$playermod.find('[data-role='+renderData.pauseAd+']');
		    this.dataset.$pauseAdImg =this.context.dataset.$playermod.find('[data-role='+renderData.pauseAdImg+']');
		    this.dataset.$noSkipTips =this.context.dataset.$playermod.find('[data-role='+renderData.noSkipTips+']');
		    this.dataset.$noSkipTipsClose =this.context.dataset.$playermod.find('[data-role='+renderData.noSkipTipsClose+']');
		    this.dataset.$pauseAdClose =this.context.dataset.$playermod.find('[data-role='+renderData.pauseAdClose+']');
		    if (this.dataset.volume===0) this.mute();
		    this.initDisplay();
		  },
		  remove: function(){
		    this.dataset.$ad.remove();
		  },
		  initDisplay: function(){
		    if (!util.isSupportMute()){
		      this.dataset.$volume.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  hide: function(){
		    this.dataset.$ad.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$canSkip.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$noSkip.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$linkArea.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$detail.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$volume.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$close.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$closeText.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass);
		  },
		  mute: function(){
		    this.dataset.$volume.addClass(this.dataset.muteClass);
		    this.context.msg.run(api.publicApi.mute, {showTips: false});
		  },
		  unMute: function(){
		    this.dataset.$volume.removeClass(this.dataset.muteClass);
		    this.context.msg.run(api.publicApi.unMute, {showTips: false});
		  },
		  openAdLink: function(txpType){
		    if ( !(this.dataset.adinfo && this.dataset.adinfo.link) ) return;
		    window.open(this.dataset.adinfo.link);
		    var config = $.extend({}, this.dataset.adinfo);
		    if (txpType) config.txpType = txpType;
		    this.context.msg.broadcast(api.eventApi.onOpenAdLink, config);
		  },
		  skipAd: function(){
		    this.context.msg.broadcast(api.privateApi.skipAd);
		    this.context.msg.broadcast(api.privateApi.showUiControl,{isMoveBelow:false});
		  },
		  showPauseAd: function(data){
		    if ( !(data && data.length) ) {
		      this.dataset.$ad.addClass(Txplayer.dataset.hideClass);
		      this.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass);
		      return;
		    }
		    data = data[0];
		    this.dataset.adinfo = data;
		    this.dataset.$ad.removeClass(Txplayer.dataset.hideClass);
		    this.dataset.$pauseAd.removeClass(Txplayer.dataset.hideClass);
		    var img, width, height, linkUrl;
		    var that = this;
		    if ($.type(data.image)==='array') data.image = data.image[0];
		    img = data.image.url;
		    width = parseInt(data.image.width);
		    height = parseInt(data.image.height);
		    if ( !(img && img.indexOf('http')===0) )return;
		    this.dataset.$pauseAdImg.attr('src', img).css({
		      width: width,
		      height: height
		    });
		    this.dataset.$pauseAdImg.off('click').on('click', function(){
		      if (data.no_click !=='N') return;
		      if (!data.link) return;
		      that.openAdLink('pauseAd');
		    });
		    this.context.msg.broadcast(api.eventApi.onPuaseAdShow, this.dataset.adinfo);
		  },
		  isSkipAdButtonShow: function(){
		    if (this.context.config && $.type(this.context.config.showOpenVIPGuide)==='function') return true;
		    return false;
		  },
		  showAdUIOnPlaying: function(){
		    var that = this;
		    var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		    if ( !(type==='loadingad' || type==='insertad' || type==='endingad') ) return;
		    that.dataset.isAdCanNotSkip = that.context.msg.run(api.privateApi.isAdCanNotSkip);
		    that.dataset.$ad.removeClass(Txplayer.dataset.hideClass);
		    that.dataset.$detail.removeClass(Txplayer.dataset.hideClass);
		    if (util.isSupportMute()) {
		      that.dataset.$volume.removeClass(Txplayer.dataset.hideClass);
		    }
		    that.dataset.$linkArea.removeClass(Txplayer.dataset.hideClass);
		    if (!that.dataset.isAdCanNotSkip){
		      that.dataset.$canSkip.removeClass(Txplayer.dataset.hideClass);
		      if (that.isSkipAdButtonShow()){
		        that.dataset.$close.removeClass(Txplayer.dataset.hideClass);
		        that.dataset.$closeText.removeClass(Txplayer.dataset.hideClass);
		      }
		    }else{
		      that.dataset.$noSkip.removeClass(Txplayer.dataset.hideClass);
		    }
		    // 第一次播放
		    if (!that.dataset.duration) {
		      that.dataset.duration = that.context.msg.run(api.privateApi.getAdDuration);
		      that.dataset.$time.html(that.dataset.duration);
		    }
		    that.dataset.adinfo = that.context.msg.run(api.privateApi.getCurrentAdInfo);
		    that.dataset.$noSkipTips.addClass(Txplayer.dataset.hideClass);
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.hide();
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.hide();
		    }
		    var isPlayingAd = this.context.msg.run(api.privateApi.isPlayingAd);
		    if (isPlayingAd){
		      that.showAdUIOnPlaying();
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(){
		      var isPlayingAd = that.context.msg.run(api.privateApi.isPlayingAd);
		      if(isPlayingAd) that.showAdUIOnPlaying();
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data){
		      if (data.playListTypeEnd &&
		        (data.playListType==='loadingad' || data.playListType==='insertad')) {
		        that.hide();
		        that.dataset.duration = null;
		        if (that.dataset.volume!==0) that.unMute({showTips: false});
		      }
		      if (data.playListTypeEnd && data.isAllEnd){
		        that.hide();
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(){
		      if (!that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      var currenttime = that.context.msg.run(api.privateApi.getAdCurrentTime);
		      if (!that.dataset.duration) return;
		      that.dataset.$time.html(that.dataset.duration - currenttime);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onPauseAdDataReady)] = function(data){
		      if (data && $.type(data)==='array' && data.length){
		        that.showPauseAd(data);
		      }
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
	
	
		    this.dataset.$close.on('click', function(){
		      var filmDuration = that.context.msg.run(api.publicApi.getDuration);
		      if (filmDuration && filmDuration>0 && filmDuration<180){
		        that.skipAd();
		      }else{
		        if(that.isSkipAdButtonShow()){
		          that.context.config.showOpenVIPGuide();
		        }
		      }
		    });
		    this.dataset.$volume.on('click', function(){
		      if (that.dataset.$volume.hasClass(that.dataset.muteClass)){
		        that.unMute({showTips:false});
		      }else{
		        that.mute({showTips: false});
		      }
		    });
		    this.dataset.$detail.on('click', function(){
		      that.openAdLink();
		    });
		    this.dataset.$linkArea.on('click', function(){
		      that.openAdLink();
		    });
		    this.dataset.$why.on('click', function(){
		      that.context.msg.run(api.privateApi.pauseAd);
		      that.dataset.$noSkipTips.removeClass(Txplayer.dataset.hideClass);
		    });
		    this.dataset.$noSkipTipsClose.on('click', function(){
		      that.context.msg.run(api.privateApi.playAd);
		      that.dataset.$noSkipTips.addClass(Txplayer.dataset.hideClass);
		    });
		    this.dataset.$pauseAdClose.on('click', function(){
		      // that.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass);
		      that.hide();
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.hidePlayAdUI] = function(){
		      that.hide();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiPlayerAd', UiPlayerAd);
	
	/***/ },
	/* 54 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=adMod%>\" class=\"txp_ad <%=hideClass%>\">\n  <txpdiv class=\"txp_ad_inner\">\n    <a data-role=\"<%=linkArea%>\" href=\"javascript:;\" class=\"txp_ad_link <%=hideClass%>\"></a>\n    <a data-role=\"<%=detail%>\" href=\"javascript:;\" class=\"txp_ad_more <%=hideClass%>\">详情点击<txpdiv class=\"txp_icon_arrow\"></txpdiv></a>\n\n    <txpdiv class=\"txp_ad_control\">\n\n      <txpdiv data-role=\"<%=canSkip%>\" class=\"txp_ad_skip <%=hideClass%>\">\n        <% if(!isSkipAdButtonShow) {%>\n          广告剩余:\n          <txpdiv data-role=\"<%=time%>\" class=\"txp_ad_countdown\"></txpdiv>\n          秒\n        <% } else {%>\n          <txpdiv data-role=\"<%=time%>\" class=\"txp_ad_countdown\"></txpdiv>\n        <% } %>\n        <txpdiv data-role=\"<%=closeText%>\" class=\"txp_ad_skip_text <%=hideClass%>\">跳过广告</txpdiv>\n        <button data-role=\"<%=close%>\" class=\"txp_btn txp_btn_close <%=hideClass%>\" title=\"跳过广告\"></button>\n      </txpdiv>\n\n      <txpdiv data-role=\"<%=noSkip%>\" class=\"txp_ad_skip <%=hideClass%>\">\n        <txpdiv data-role=\"<%=time%>\" class=\"txp_ad_countdown\"></txpdiv>\n        <txpdiv class=\"txp_ad_skip_text\">应版权方的要求，好莱坞会员无法跳过该剧广告</txpdiv>\n        <button data-role=\"<%=why%>\" class=\"txp_btn txp_btn_hint\" title=\"无法跳过广告说明\"></button>\n      </txpdiv>\n\n      <button data-role=\"<%=volume%>\" class=\"txp_btn txp_btn_ad_volume <%=hideClass%>\">\n        <svg class=\"txp_icon txp_icon_volume\" version=\"1.1\" viewBox=\"0 0 24 24\">\n          <use class=\"txp_svg_volume\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume\"></use>\n          <use class=\"txp_svg_volume_mute\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume_mute\"></use>\n        </svg>\n      </button>\n    </txpdiv>\n\n    <txpdiv data-role=\"<%=noSkipTips%>\" class=\"txp_ad_dialog <%=hideClass%>\">\n      <txpdiv class=\"txp_dialog_bd\"><%=noSkipTipsText%></txpdiv>\n      <txpdiv data-role=\"<%=noSkipTipsClose%>\" class=\"txp_ad_btn\">我知道了!</txpdiv>\n      <a target=\"_blank;\" class=\"txp_ad_fb\" href=\"http://support.qq.com/write.shtml?fid=850\">意见反馈</a>\n      <button data-role=\"<%=noSkipTipsClose%>\" class=\"txp_btn txp_btn_close\"></button>\n    </txpdiv>\n  </txpdiv>\n\n  <!-- 左下广告位： 135*80 -->\n  <txpdiv class=\"txp_ad_corner <%=hideClass%>\">\n    <!-- 广告图片 -->\n    <img alt=\"\">\n  </txpdiv>\n\n  <!-- 中间广告位： 400*300 -->\n  <txpdiv data-role=\"<%=pauseAd%>\" class=\"txp_ad_center <%=hideClass%>\">\n    <button data-role=\"<%=pauseAdClose%>\" class=\"txp_btn txp_btn_close txp_btn_close_ad\" title=\"跳过广告\"></button>\n    <img data-role=\"<%=pauseAdImg%>\" alt=\"\">\n  </txpdiv>\n\n  <!-- 底部广告位： 480*70 -->\n  <txpdiv class=\"txp_ad_bottom <%=hideClass%>\">\n    <!-- 广告图片 -->\n    <img alt=\"\">\n  </txpdiv>\n\n  <!-- 底部广告位： 960*60 -->\n  <txpdiv class=\"txp_ad_bottom_lg <%=hideClass%>\">\n    <img alt=\"\">\n  </txpdiv>\n\n</txpdiv>";
	
	/***/ },
	/* 55 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var htmlstr = __webpack_require__(56);
		var api             = Txplayer.apiList;
	
		function UiPlayNext(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiPlayNext.prototype = {
		  init: function(){
		    this.dataset.playerConfig = this.context.msg.run(api.privateApi.getPlayerConfig);
		    this.dataset.nextVid = this.dataset.playerConfig.nextVid;
		    this.dataset.getNextVid = $.type(this.dataset.playerConfig.getNextVid)==='function' ? this.dataset.playerConfig.getNextVid : $.noop;
		    this.write();
		    this.initDisplay();
		    this.addEventListerner();
		  },
		  write: function(){
		    var renderData = {
		      next: 'txp-ui-control-play-next',
		      hideClass: Txplayer.dataset.hideClass,
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsleftmod.append(htmldata);
		    this.dataset.$next = this.context.$mod.$buttonsleftmod.find('[data-role="'+renderData.next+'"]');
		  },
		  remove: function(){
		    this.dataset.$next.remove();
		  },
		  initDisplay: function(){
		    if (this.dataset.nextVid){
		      this.dataset.$next.removeClass(Txplayer.dataset.hideClass);
		    }else{
		      this.dataset.$next.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  playTheNext: function(){
		    var that = this;
		    var vid = this.context.superMsg.run(api.publicApi.getVid);
		    var nextVideoInfo = that.dataset.getNextVid(vid);
		    if ( !(nextVideoInfo && nextVideoInfo.vid) ) {
		      util.showError('播放下个视频失败','找不到vid');
		      return;
		    }
		    that.context.userMsg.broadcast(api.eventApi.onBeforePlayNext,{
		      vid: nextVideoInfo.vid
		    });
		    that.context.superMsg.run(api.publicApi.play, {
		      vid: nextVideoInfo.vid,
		      nextVid: nextVideoInfo.nextVid,
		      bullet: nextVideoInfo.bullet,
		      bulletId: nextVideoInfo.bulletId,
		      playStartTime: nextVideoInfo.playStartTime,
		      playEndTime: nextVideoInfo.playEndTime,
		      isNeedPay: nextVideoInfo.isNeedPay,
		      autoplay: nextVideoInfo.autoplay,
		      defaultDefinition: nextVideoInfo.defaultDefinition
		    });
		  },
		  addEventListerner: function(){
		    var that = this;
		    this.dataset.$next.on(Txplayer.dataset.clickEventName, function(){
		      if (!that.dataset.nextVid) return;
		      that.playTheNext();
		    });
	
		    this.dataset.eventsList = {};
		    this.dataset.privateApis = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data){
		      if (data.isAllEnd && that.dataset.nextVid){
		        that.playTheNext();
		      }
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
	
		    this.dataset.privateApis[api.publicApi.setNextVid] = function(data, options){
		      that.dataset.nextVid = data;
		      that.initDisplay();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		  },
		};
	
		Txplayer.register('UiPlayNext', UiPlayNext);
	
	/***/ },
	/* 56 */
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=next%>\" class=\"txp_btn txp_btn_next <%=hideClass%>\" data-report=\"play-next\">\n  <svg class=\"txp_icon txp_icon_next\" version=\"1.1\" viewBox=\"0 0 36 36\">\n    <path d=\"M26,27.999v-20h2v20H26z M9,8.006l14.993,9.993L9,27.992V8.006z M11,24 l9.654-6.034L11,12V24z\"></path>\n  </svg>\n  <txpdiv class=\"txp_tooltip\">下一集</txpdiv>\n</button>";
	
	/***/ },
	/* 57 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var htmlstr = __webpack_require__(58);
		var api             = Txplayer.apiList;
	
		function UiPoster(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiPoster.prototype = {
		  init: function(){
		    this.dataset.showPoster = true;
		    if (this.context.config.poster===false){
		      this.dataset.showPoster = false;
		    }else if ($.type(this.context.config.poster)==='string') {
		      this.dataset.poster = this.context.config.poster;
		    }
		    this.write();
		    this.initDisplay();
		    this.addEventListerner();
		  },
		  initDisplay: function(){
		    if (!this.dataset.showPoster) return;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    var that = this;
		    if (!vid) {
		      this.context.msg.on(api.eventApi.onReady, function(){
		        vid = that.context.msg.run(api.publicApi.getVid);
		        showPoster();
		      });
		    }else{
		      showPoster();
		    }
		    function showPoster(){
		      if (!that.dataset.poster) {
		        if (util.mobile) {
		          that.dataset.poster = util.getMobileVideoPosterByVid(vid);
		        }else{
		          that.dataset.poster = util.getPcVideoPosterByVid(vid);
		        }
		      }
		      that.dataset.$poster.css({
		        'background-image': 'url(' + that.dataset.poster + ')'
		      });
		    }
		  },
		  write: function(){
		    var renderData = {
		      poster: 'txp-ui-poster'
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$poster = this.context.dataset.$playermod.find('[data-role="'+renderData.poster+'"]');
		  },
		  remove: function(){
		    this.dataset.$poster.remove();
		  },
		  addEventListerner: function(){
		    var that = this;
		    var playState = this.context.msg.run(api.publicApi.getPlayerState);
		    var isPlayingAd = this.context.msg.run(api.privateApi.isPlayingAd);
		    if ($.inArray(playState, [0,1,3])>-1 || isPlayingAd){
		      that.dataset.$poster.addClass(Txplayer.dataset.hideClass);
		    }
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(){
		      that.dataset.$poster.addClass(Txplayer.dataset.hideClass);
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  },
		};
	
		Txplayer.register('UiPoster', UiPoster);
	
	/***/ },
	/* 58 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=poster%>\" class=\"txp_poster\"></txpdiv>";
	
	/***/ },
	/* 59 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(60);
	
		function UiPreview(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiPreview.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      hideClass: Txplayer.dataset.hideClass,
		      previewMod: 'txp_preview_mod',
		      timeText: 'txp-preview-time-text',
		      previewImage: 'txp-preview-image'
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$previewMod = this.context.dataset.$playermod.find('[data-role="'+renderData.previewMod+'"]');
		    this.dataset.$timeText = this.context.dataset.$playermod.find('[data-role="'+renderData.timeText+'"]');
		    this.dataset.$previewImage = this.context.dataset.$playermod.find('[data-role="'+renderData.previewImage+'"]');
		  },
		  remove: function(){
		    this.dataset.$previewMod.remove();
		  },
		  getPreviewData: function(cTime) {
		    cTime = cTime+1;
		    if (!this.dataset.duration) {
		      this.dataset.duration = this.context.msg.run(api.publicApi.getDuration);
		      if (!this.dataset.duration) return '';
		    }
		    var that = this;
		    // 显示100px,图片实际尺寸
		    var zoomRate = 100/160;
		    var duration = this.dataset.duration,
		      sTime;
		    if (duration < 60) {
		      sTime = 1;
		    } else if (duration < 300) {
		      sTime = 2;
		    } else if (duration < 600) {
		      sTime = 5;
		    } else {
		      sTime = 10;
		    }
		    function findPosition(imageData, cTime, sTime){
		      var whichPic = Math.ceil(cTime/sTime),
		        picCount = imageData[0].picCount,
		        whichItem = Math.ceil(whichPic / picCount)-1,
		        item = imageData[whichItem];
		      if (!item) return;
		      var imgUrl,
		        wherePic = whichPic - (picCount * whichItem),
		        x = wherePic%item.columnCount;
		      x = x===0 ? item.columnCount: x;
		      var y = Math.ceil(wherePic/item.columnCount),
		        pixY = (y-1) * item.picHeight,
		        pixX = (x-1) * item.picWidth;
		      imgUrl = item.path;
		      // 支持https
		      // imgUrl = imgUrl.replace(/^https?:/,'');
		      return {
		        url: imgUrl,
		        x: pixX*(-1)*zoomRate+ 'px',
		        y: pixY*(-1)*zoomRate+'px'
		      }
		    }
	
		    function findPreviewData(){
		      if (!that.dataset.getinfoJson) {
		        that.dataset.getinfoJson = that.context.msg.run(api.privateApi.getVideoInfoData);
		      }
		      if ($.type(that.dataset.getinfoJson)!=='object') return ;
		      var json = that.dataset.getinfoJson;
		      var item;
		      var tmpMax = 0;
		      var arrayItem=[];
		      var itemCount;
		      var picCount;
		      var i, len;
		      if (json &&
		        json.vl &&
		        json.vl.vi &&
		        json.vl.vi[0] &&
		        json.vl.vi[0].pl &&
		        json.vl.vi[0].pl[0] &&
		        json.vl.vi[0].pl[0].pd &&
		        json.vl.vi[0].pl[0].pd.length
		      ) {
		        var pd = json.vl.vi[0].pl[0].pd;
		        var obj = json.vl.vi[0];
		        for (i=0, len = pd.length; i<len; i++) {
		          if (pd[i].w > tmpMax) {
		            item = pd[i];
		            tmpMax = pd[i].w
		          }
		        }
		      }
		      if (!item) return ;
		      picCount = Math.floor( duration / sTime );
		      itemCount= Math.ceil(picCount / (item.r * item.c));
		      for(i=0; i<itemCount;i++){
		        var cItem = {
		          index: i,
		          path: item.url + obj.lnk + '.' + item.fn + '.' + (i+1)+'.jpg/0',
		          picCount: item.r*item.c,
		          picWidth: item.w,
		          picHeight: item.h,
		          rowCount: item.r,
		          columnCount: item.c,
		          filename: item.fn,
		          format: item.fmt
		        };
		        arrayItem.push(cItem);
		        that.dataset.previewData = arrayItem;
		      }
		    }
		    if ($.type(that.dataset.previewData)==='array' && that.dataset.previewData.length) {
		      return findPosition(that.dataset.previewData, cTime, sTime);
		    }
		    findPreviewData();
		    if ($.type(that.dataset.previewData)==='array' && that.dataset.previewData.length) {
		      return findPosition(that.dataset.previewData, cTime, sTime);
		    }
		    return '';
		  },
		  updateImage: function(time){
		    var imgInfo = this.getPreviewData(time);
		    if ( !(imgInfo && imgInfo.url && imgInfo.hasOwnProperty('x') && imgInfo.hasOwnProperty('y')) ) {
		      this.dataset.$previewMod.addClass('txp_tooltip_preview_tiny');
		      return;
		    }else{
		      this.dataset.$previewMod.removeClass('txp_tooltip_preview_tiny');
		    }
		    var cssData = {};
		    if (this.dataset.imageUrl) return;
		    this.dataset.$previewImage.css({
		      'background-image': 'url(' + imgInfo.url + ')',
		      'background-position': imgInfo.x + ' ' + imgInfo.y
		    });
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[api.eventApi.onVidChange] = function(){
		      that.dataset.previewData = null;
		      that.dataset.duration = null;
		      that.dataset.getinfoJson = null;
		    };
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.showVideoPreview] = function(data){
		      if (!that.dataset.getinfoJson) return;
		      that.dataset.$previewMod.removeClass(Txplayer.dataset.hideClass);
		    };
		    this.dataset.privateApis[api.privateApi.hideVideoPreview] = function(data){
		      that.dataset.$previewMod.addClass(Txplayer.dataset.hideClass);
		    };
		    this.dataset.privateApis[api.privateApi.updateVideoPreview] = function(data){
		      if (!data) return;
		      if (data.hasOwnProperty('x')) {
		        var modWidth = that.dataset.$previewMod.width();
		        var halfModWidth = parseInt(modWidth/2);
		        var left = data.x - halfModWidth;
		        if (left <= 0)
		          left = 0;
		        else if ( data.progressWidth && (left>(data.progressWidth-modWidth)) )
		          left = data.progressWidth-modWidth;
		        that.dataset.$previewMod.css('left', left);
		      }
		      if (data.hasOwnProperty('x') && data.duration) {
		        var time = parseInt(data.duration * (data.x/data.progressWidth));
		        var showTime = util.formatPlayTime(time);
		        that.dataset.$timeText.html(showTime);
		        that.updateImage(time);
		      }
		    };
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiPreview', UiPreview);
	
	/***/ },
	/* 60 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=previewMod%>\" class=\"txp_tooltip_preview <%=hideClass%>\" style=\"left:0;\">\n  <txpdiv class=\"txp_tooltip_bg\" data-role=\"<%=previewImage%>\"></txpdiv>\n  <txpdiv class=\"txp_tooltip_text_wrapper\">\n    <txpdiv class=\"txp_tooltip_text\" data-role=\"<%=timeText%>\"></txpdiv>\n  </txpdiv>\n</txpdiv>";
	
	/***/ },
	/* 61 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(62);
	
		function UiProgress(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiProgress.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListerner();
		  },
		  write: function(){
		    var renderData = {
		      loadedProgress: 'txp-control-load-progress',
		      playedProgress: 'txp-control-play-progress',
		      playedPoint: 'txp-control-play-point',
		      progressList: 'txp-control-progress-list',
		      progressIndicator: 'txp-control-progress-indicator',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$progressmod.append(htmldata);
		    this.dataset.$loadedProgress = this.context.$mod.$progressmod.find('[data-role="'+renderData.loadedProgress+'"]');
		    this.dataset.$playprogress = this.context.$mod.$progressmod.find('[data-role="'+renderData.playedProgress+'"]');
		    this.dataset.$playpoint = this.context.$mod.$progressmod.find('[data-role="'+renderData.playedPoint+'"]');
		    this.dataset.$progressIndicator = this.context.$mod.$progressmod.find('[data-role="'+renderData.progressIndicator+'"]');
		    this.dataset.$progressList = this.context.$mod.$progressmod.find('[data-role="'+renderData.progressList+'"]');
		  },
		  remove: function(){
		    this.dataset.$loadedProgress.remove();
		    this.dataset.$playprogress.remove();
		    this.dataset.$playpoint.remove();
		    this.dataset.$progressIndicator.remove();
		    this.dataset.$progressList.remove();
		  },
		  progressOnMouseMove: function(){
		    var isMouseEnter = false;
		    var that = this;
		    var modWidth;
		    var pointWidth;
		    var per;
		    var x=-1;
		    var isMousePress = false;
		    var calcProgressByMousePosition = function(e){
		      if ( $(e.target).data('role')===that.dataset.renderData.progressList ||
		        $(e.target).data('role')==='txp-control-progress') {
		        x = e.offsetX;
		      }else if ($(e.target).data('role')===that.dataset.renderData.progressIndicator) {
		        x = e.target.offsetLeft + e.target.offsetParent.offsetLeft + e.offsetX;
		      }else if ($(e.target).data('role')===that.dataset.renderData.playedPoint ||
		        $(e.target).data('role')===that.dataset.renderData.playedProgress ||
		        $(e.target).data('role')===that.dataset.renderData.loadedProgress ||
		        $(e.target).hasClass('txp_interact_dot')) {
		        x = e.target.offsetLeft + e.offsetX;
		      }
		      if (x===-1) return;
		      per = parseInt((x/modWidth)*10000)/100;
		    };
		    var updateProgress = function(){
		      var progressPosition = parseInt((x/modWidth)*10000)/100;
		      var pointPosition = parseInt(((x - pointWidth/2)/modWidth)*10000)/100;
		      that.dataset.$playprogress.css('width', (progressPosition+'%'));
		      that.dataset.$playpoint.css('left', (pointPosition+'%'));
		    };
		    this.context.$mod.$progressmod
		    .on('mouseenter', function(){
		      // 播放广告不要显示了
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      isMouseEnter = true;
		      modWidth = that.dataset.$progressList.width();
		      pointWidth = that.dataset.$progressIndicator.width();
		      that.context.superMsg.broadcast(api.privateApi.showVideoPreview);
		    })
		    .on('mouseleave', function(){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      // 鼠标是按下后离开的，继续播放
		      if (isMousePress){
		        that.context.superMsg.broadcast(api.publicApi.play);
		        isMousePress = false;
		      }
		      that.context.superMsg.broadcast(api.privateApi.hideVideoPreview);
		      isMouseEnter = false;
		    })
		    .on('mousedown', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      isMousePress = true;
		      isMouseEnter = true;
		      that.context.superMsg.broadcast(api.publicApi.pause);
		      calcProgressByMousePosition(e);
		      updateProgress();
		    })
		    .on('mousemove', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      calcProgressByMousePosition(e);
		      if (isMousePress && isMouseEnter){
		        updateProgress();
		      }
		      that.context.superMsg.broadcast('updateVideoPreview', {
		        x: x,
		        per: per,
		        progressWidth: modWidth,
		        duration: that.dataset.duration
		      });
		    })
		    .on('mouseup touchend', function(e){
		      if (!that.dataset.duration) return;
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      // pc上，如果鼠标没有按下，不做操作了
		      if (!isMousePress) return;
		      calcProgressByMousePosition(e);
		      var seekTime = parseInt(that.dataset.duration * (x/modWidth));
		      that.context.superMsg.run(api.publicApi.seekTo, seekTime);
		      updateProgress();
		      isMouseEnter = false;
		      isMousePress = false;
		    });
		  },
		  progressOnTouch: function(){
		    var that = this, offsetLeft, x, modWidth, pointWidth
		    var updateProgress = function(){
		      var progressPosition = parseInt((x/modWidth)*10000)/100;
		      var pointPosition = parseInt(((x - pointWidth/2)/modWidth)*10000)/100;
		      that.dataset.$playprogress.css('width', (progressPosition+'%'));
		      that.dataset.$playpoint.css('left', (pointPosition+'%'));
		    };
		    this.context.$mod.$progressmod
		    .on('touchstart', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      e = !! e.originalEvent ? e.originalEvent : e;
		      if(!(e && e.touches && e.touches.length)){
		        return;
		      }
		      e = e.touches[0];
		      offsetLeft = that.dataset.$progressList.offset().left;
		      x = e.pageX - offsetLeft;
	
		      modWidth = that.dataset.$progressList.width();
		      pointWidth = that.dataset.$progressIndicator.width();
	
		      updateProgress();
		      that.context.superMsg.broadcast(api.publicApi.pause);
		    })
		    .on('touchmove', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      e = !! e.originalEvent ? e.originalEvent : e;
		      if(!(e && e.touches && e.touches.length)){
		        return;
		      }
		      e = e.touches[0];
		      x = e.pageX - offsetLeft;
		      updateProgress();
		    })
		    .on('touchend', function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      var seekTime = parseInt(that.dataset.duration * (x/modWidth));
		      that.context.superMsg.run(api.publicApi.seekTo, seekTime);
		      updateProgress();
		      that.context.msg.broadcast(api.privateApi.disableHideControl, false);
		      that.context.superMsg.broadcast(api.privateApi.hidePlayerUiTools, 2000);
		    });
		  },
		  updateBufferedBar: function(time){
		    if (!this.dataset.duration) return;
		    if (!time) return;
		    var per = parseInt(time*100 / this.dataset.duration);
		    this.dataset.$loadedProgress.css({width: per + '%'});
		  },
		  addEventListerner: function(){
		    var that = this;
		    var duration = that.context.superMsg.run(api.publicApi.getDuration);
		    if(duration) that.dataset.duration = duration;
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onGetVideoUrlSuccess)] = function(){
		      var duration = that.context.superMsg.run(api.publicApi.getDuration);
		      that.dataset.duration = duration;
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(){
		      // 控制栏不显示，不计算播放进度
		      if ( !that.context.superMsg.run(api.privateApi.isControlShow) ) return;
		      if (that.context.superMsg.run('isPlayingAd')) return;
		      if (!that.dataset.duration) {
		        util.showError('UiProgress Error', '找不到duration数据');
		        return;
		      }
		      var currenttime = that.context.superMsg.run(api.publicApi.getCurrentTime);
		      var per = currenttime/that.dataset.duration;
		      per = per * 100 + '%';
		      that.dataset.$playprogress.css('width', per);
		      that.dataset.$playpoint.css('left', per);
		      that.updateBufferedBar( that.context.superMsg.run(api.privateApi.getBufferedTime) );
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionProgress)] = function(){
		      // 控制栏不显示，不计算缓冲数据
		      if ( !that.context.superMsg.run(api.privateApi.isControlShow) ) return;
		      that.updateBufferedBar( that.context.superMsg.run(api.privateApi.getBufferedTime) );
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		    if (!util.mobile){
		      this.progressOnMouseMove();
		    }else{
		      this.progressOnTouch();
		    }
		  }
		};
	
		Txplayer.register('UiProgress', UiProgress);
	
	/***/ },
	/* 62 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv class=\"txp_progress_list\" data-role=\"<%=progressList%>\">\n  <txpdiv class=\"txp_progress_load\" style=\"width:0%\" data-role=\"<%=loadedProgress%>\"></txpdiv>\n  <txpdiv class=\"txp_progress_play\" style=\"width:0%\" data-role=\"<%=playedProgress%>\"></txpdiv>\n</txpdiv>\n\n<txpdiv class=\"txp_btn_scrubber\" style=\"left:0%\" data-role=\"<%=playedPoint%>\">\n  <txpdiv class=\"txp_scrubber_indicator\" data-role=\"<%=progressIndicator%>\"></txpdiv>\n</txpdiv>";
	
	/***/ },
	/* 63 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var htmlstr = __webpack_require__(64);
		var api = Txplayer.apiList;
	
		function UiSettings(context) {
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiSettings.prototype = {
		  init: function() {
		    this.dataset.layerShowClass = 'txp_show';
		    this.dataset.activeClass = 'txp_current';
		    this.dataset.hideControlClass = 'txp_autohide_progress';
		    this.dataset.playerConfig = this.context.msg.run(api.privateApi.getPlayerConfig);
		    this.dataset.skipPrelude = this.dataset.playerConfig.skipPrelude;
		    this.dataset.hideControlOnPlaying = this.dataset.playerConfig.hideControlOnPlaying;
		    this.dataset.userSettingKey = Txplayer.dataset.localStorageKey.userSetting;
		    this.write();
		    this.getHistorySettings();
		    this.loadSubPlugins();
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  loadSubPlugins: function(){
		    var plugins = [];
		    var that = this;
		    if (this.context.pluginConfig &&
		      $.type(this.context.pluginConfig.subPlugins)==='array') {
		      plugins = this.context.pluginConfig.subPlugins.slice(0);
		    }
		    var context = {
		      'superMsg': this.context.superMsg,
		      'userMsg': this.context.userMsg,
		      'msg': this.msg,
		      '$mod': {}
		    };
		    util.loadPlugins.call(this, plugins, context);
		  },
		  getData: function(){
		    var settingData = util.getData(this.dataset.userSettingKey);
		    try{
		      settingData = JSON.parse(settingData);
		    }catch(e){
		      settingData = {};
		    }
		    return settingData;
		  },
		  setData: function(key, val){
		    var settingData = this.getData(this.dataset.userSettingKey);
		    settingData[key] = val;
		    util.setData(this.dataset.userSettingKey,JSON.stringify(settingData));
		  },
		  getHistorySettings: function() {
		    var settingData = this.getData();
		    var that = this;
		    var caniSkipPrelude = function(){
		      if ($.type(settingData.isSkipPrelude)==='undefined'){
		        return !!that.dataset.skipPrelude;
		      }
		      return !!settingData.isSkipPrelude;
		    };
		    if ( caniSkipPrelude() ) {
		      this.dataset.skipPrelude = true;
		      this.dataset.$skipPrelude.addClass(this.dataset.activeClass);
		    } else if (!settingData.isSkipPrelude) {
		      this.dataset.skipPrelude = false;
		      this.dataset.$skipPrelude.removeClass(this.dataset.activeClass);
		    }
		    if (settingData.hideControl === 1 || $.type(settingData.hideControl)==='undefined' ) {
		      this.dataset.hideControlOnPlaying = true;
		      this.dataset.$hidePlayingControl.addClass(this.dataset.activeClass);
		      this.context.$mod.$playermod.addClass(this.dataset.hideControlClass);
		    } else if (settingData.hideControl===0) {
		      this.dataset.hideControlOnPlaying = false;
		      this.dataset.$hidePlayingControl.removeClass(this.dataset.activeClass);
		      this.context.$mod.$playermod.removeClass(this.dataset.hideControlClass);
		    }
		    if (settingData.isUseFlash === 1) {
		      this.dataset.isUseFlash = true;
		      this.dataset.$useFlash.addClass(this.dataset.activeClass);
		    } else if (!settingData.isUseFlash) {
		      this.dataset.isUseFlash = false;
		      this.dataset.$useFlash.removeClass(this.dataset.activeClass);
		    }
		  },
		  write: function() {
		    var renderData = {
		      settings: 'txp-ui-control-settings',
		      skipPrelude: 'txp-ui-control-setting-skipPrelude',
		      closeLight: 'txp-ui-control-setting-close-light',
		      hidePlayingControl: 'txp-ui-control-setting-hide-control',
		      useFlash: 'txp-ui-control-setting-use-flash',
		      layer: 'txp-ui-control-settings-layer',
		      isMobile: util.mobile,
		      settingsBtn: 'txp-ui-control-setting-btn'
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$settings = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.settings + '"]');
		    this.dataset.$closeLight = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.closeLight + '"]');
		    this.dataset.$skipPrelude = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.skipPrelude + '"]');
		    this.dataset.$hidePlayingControl = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.hidePlayingControl + '"]');
		    this.dataset.$useFlash = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.useFlash + '"]');
		    this.dataset.$layer = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.layer + '"]');
		    this.dataset.$settingsBtn = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.settingsBtn + '"]');
		  },
		  remove: function(){
		    this.dataset.$settings.remove();
		    this.dataset.$layer.remove();
		  },
		  layerShowHandler: function(){
		    if (!util.mobile) return;
		    var that = this;
		    this.dataset.$settingsBtn.on('click', function(){
		      that.dataset.$layer.toggleClass(that.dataset.layerShowClass);
		    });
		  },
		  addEventListener: function() {
		    var that = this;
		    this.dataset.$skipPrelude.on('click', function() {
		      if (that.dataset.skipPrelude){
		        that.setData('isSkipPrelude', 0);
		        that.dataset.$skipPrelude.removeClass(that.dataset.activeClass);
		        that.dataset.skipPrelude = false;
		      }else{
		        that.setData('isSkipPrelude', 1);
		        that.dataset.$skipPrelude.addClass(that.dataset.activeClass);
		        that.dataset.skipPrelude = true;
		      }
		    });
		    this.dataset.$hidePlayingControl.on('click', function() {
		      if (that.dataset.hideControlOnPlaying){
		        that.setData('hideControl', 0);
		        that.dataset.$hidePlayingControl.removeClass(that.dataset.activeClass);
		        that.dataset.hideControlOnPlaying = false;
		        that.context.$mod.$playermod.removeClass(that.dataset.hideControlClass);
		      }else{
		        that.setData('hideControl', 1);
		        that.dataset.$hidePlayingControl.addClass(that.dataset.activeClass);
		        that.dataset.hideControlOnPlaying = true;
		        that.context.$mod.$playermod.addClass(that.dataset.hideControlClass);
		      }
		    });
		    this.dataset.$closeLight.on('click', function() {
		      if (that.dataset.hasCloseLight){
		        that.dataset.$closeLight.removeClass(that.dataset.activeClass);
		        that.dataset.hasCloseLight = false;
		      }else{
		        that.dataset.$closeLight.addClass(that.dataset.activeClass);
		        that.dataset.hasCloseLight = true;
		      }
		      that.context.userMsg.broadcast(api.eventApi.onClickCloseLight,that.dataset.hasCloseLight);
		    });
		    this.dataset.$useFlash.on('click', function() {
		      if (that.dataset.isUseFlash){
		        that.setData('isUseFlash', 0);
		        that.dataset.$useFlash.removeClass(that.dataset.activeClass);
		        that.dataset.isUseFlash = false;
		      }else{
		        that.setData('isUseFlash', 1);
		        that.dataset.$useFlash.addClass(that.dataset.activeClass);
		        that.dataset.isUseFlash = true;
		        window.location.reload();
		      }
		    });
		    // for firefox BUG:
		    // Children of button does not respond to :hover
		    // https://bugzilla.mozilla.org/show_bug.cgi?id=843003
		    this.dataset.$settings.on('mouseenter', function(){
		      if (that.dataset.hasHandlerFirfox) return;
		      if (!util.browser.firefox) return;
		      var $layer = that.dataset.$layer;
		      var $parent = $layer.parent();
		      $layer.css({
		        'left': $parent.position().left - $layer.width()/2 + $parent.width()/2
		      });
		      $parent.after($layer);
		      that.dataset.hasHandlerFirfox = true;
		    });
		    this.layerShowHandler();
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.isSkipPrelude] = function(data, options) {
		      options.data = that.dataset.skipPrelude;
		    }
		    this.dataset.privateApis[api.privateApi.hideUiSettingLayerOnMobile] = function(data, options){
		      if (data && data.targetElem){
		        if ($(data.targetElem).attr('data-role')===that.dataset.renderData.settings) return;
		        if ($(data.targetElem).attr('data-role')===that.dataset.renderData.layer) return;
		        var parents = $(data.targetElem).parents('[data-role="' + that.dataset.renderData.settings+ '"]');
		        if ( parents && parents.length ) return;
		      }
		      that.dataset.$layer.removeClass(that.dataset.layerShowClass);
		    }
	
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiSettings', UiSettings);
	
	/***/ },
	/* 64 */
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=settings%>\" class=\"txp_btn txp_btn_setting\">\n  <svg data-role=\"<%=settingsBtn%>\" class=\"txp_icon txp_icon_setting\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_setting\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_setting\"></use>\n  </svg>\n  <txpdiv data-role=\"<%=layer%>\" class=\"txp_popup txp_popup_settings\">\n    <txpdiv class=\"txp_menugroup txp_menugroup_play\">\n      <txpdiv class=\"txp_menugroup_label\">播放设置</txpdiv>\n      <!-- <txpdiv data-role=\"<%=closeLight%>\" data-report=\"close-light\" class=\"txp_menuitem\">\n        <svg class=\"txp_icon txp_icon_select\" version=\"1.1\" viewBox=\"0 0 12 12\">\n          <use class=\"txp_svg_select\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select\"></use>\n          <use class=\"txp_svg_select_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select_true\"></use>\n        </svg>\n        <txpdiv class=\"txp_menuitem_label\">关灯</txpdiv>\n      </txpdiv> -->\n      <txpdiv data-role=\"<%=skipPrelude%>\" data-report=\"skip-prelude\" class=\"txp_menuitem\">\n        <svg class=\"txp_icon txp_icon_select\" version=\"1.1\" viewBox=\"0 0 12 12\">\n          <use class=\"txp_svg_select\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select\"></use>\n          <use class=\"txp_svg_select_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select_true\"></use>\n        </svg>\n        <txpdiv class=\"txp_menuitem_label\">自动跳过片头</txpdiv>\n      </txpdiv>\n      <txpdiv data-role=\"<%=hidePlayingControl%>\" data-report=\"hide-control-play\" class=\"txp_menuitem\">\n        <svg class=\"txp_icon txp_icon_select\" version=\"1.1\" viewBox=\"0 0 12 12\">\n          <use class=\"txp_svg_select\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select\"></use>\n          <use class=\"txp_svg_select_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select_true\"></use>\n        </svg>\n        <txpdiv class=\"txp_menuitem_label\">播放时隐藏进度条</txpdiv>\n      </txpdiv>\n      <% if (!isMobile) {%>\n      <txpdiv data-role=\"<%=useFlash%>\" data-report=\"use-flash\" class=\"txp_menuitem\">\n        <svg class=\"txp_icon txp_icon_select\" version=\"1.1\" viewBox=\"0 0 12 12\">\n          <use class=\"txp_svg_select\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select\"></use>\n          <use class=\"txp_svg_select_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select_true\"></use>\n        </svg>\n        <txpdiv class=\"txp_menuitem_label\">使用 Flash 播放器</txpdiv>\n      </txpdiv>\n      <%}%>\n    </txpdiv>\n  </txpdiv>\n</button>";
	
	/***/ },
	/* 65 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(66);
	
		function UiShadow(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiShadow.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListerner();
		  },
		  write: function(){
		    var renderData = {
		      shadow: 'txp-shadow-mod'
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$videomod.append(htmldata);
		    this.dataset.$shadow = this.context.$mod.$videomod.find('[data-role='+renderData.shadow+']');
		  },
		  remove: function(){
		    this.dataset.$shadow.remove();
		  },
		  initHDPlayerEvent: function(){
		    var clickTimeout, that = this;
		    this.dataset.$shadow.on('click', function(){
		      var togglePlay = function(){
		        if (that.context.superMsg.run(api.publicApi.isPlaying)) {
		          that.context.superMsg.broadcast(api.publicApi.pause);
		          that.context.superMsg.broadcast(api.eventApi.onUserPausePlayer);
		        }else{
		          that.context.superMsg.broadcast(api.publicApi.play);
		        }
		      };
		      if (clickTimeout) clearTimeout(clickTimeout);
		      clickTimeout = setTimeout(function(){
		        togglePlay();
		        clickTimeout = null;
		      },300);
		    });
		    this.dataset.$shadow.on('dblclick', function(){
		      if (clickTimeout) clearTimeout(clickTimeout);
		      that.context.superMsg.broadcast(api.publicApi.toggleWindowFullScreen);
		    });
		    // 屏蔽播放器区域鼠标右键
		    // this.dataset.$shadow
		    // .on('contextmenu', function(e){
		    //   return false;
		    // });
		  },
		  initH5PlayerEvent: function(){
		    var that = this;
		    // that.context.superMsg.broadcast(api.privateApi.showPlayerUiTools);
		    this.dataset.$shadow.on('click', function(){
		      // return;
		      that.context.superMsg.broadcast(api.privateApi.togglePlayerUiTools);
		    });
		  },
		  addEventListerner: function(){
		    var that = this;
		    if (util.mobile){
		      this.initH5PlayerEvent();
		    }else{
		      this.initHDPlayerEvent();
		    }
		  }
		};
	
		Txplayer.register('UiShadow', UiShadow);
	
	/***/ },
	/* 66 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=shadow%>\" class=\"txp_shadow\"></txpdiv>";
	
	/***/ },
	/* 67 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var htmlstr = __webpack_require__(68);
	
		function UiShop(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiShop.prototype = {
		  init: function(){
		    this.write();
		  },
		  write: function(){
		    var renderData = {};
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		  }
		};
	
		Txplayer.register('UiShop', UiShop);
	
	/***/ },
	/* 68 */
	/***/ function(module, exports) {
	
		module.exports = "<button class=\"txp_btn txp_btn_shop\" data-report=\"click-shop\">\n  <svg class=\"txp_icon txp_icon_shop\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_shop\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_shop\"></use>\n  </svg>\n</button>";
	
	/***/ },
	/* 69 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(70);
	
		function UiShowTime(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiShowTime.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListerner();
		  },
		  write: function(){
		    var renderData = {
		      time: 'txp-control-time-mod',
		      currentTimeRole: 'txp-control-currenttime',
		      durationRole: 'txp-control-duration'
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsleftmod.append(htmldata);
		    this.dataset.$time = this.context.$mod.$buttonsleftmod.find('[data-role="'+renderData.time+'"]');
		    this.dataset.$currenttime = this.context.$mod.$buttonsleftmod.find('[data-role="'+renderData.currentTimeRole+'"]');
		    this.dataset.$duration = this.context.$mod.$buttonsleftmod.find('[data-role="'+renderData.durationRole+'"]');
		  },
		  remove: function(){
		    this.dataset.$time.remove();
		  },
		  updateShowTime: function(){
		    var duration = this.context.superMsg.run(api.publicApi.getDuration);
		    if (duration) this.dataset.$duration.html( util.formatPlayTime(duration) );
		  },
		  addEventListerner: function(){
		    var that = this;
		    that.updateShowTime();
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onGetVideoUrlSuccess)] = function(){
		      that.updateShowTime();
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(){
		      // 控制栏不显示，不计算缓冲数据
		      if ( !that.context.superMsg.run(api.privateApi.isControlShow) ) return;
		      if (that.context.superMsg.run('isPlayingAd')) return;
		      var currenttime = that.context.superMsg.run(api.publicApi.getCurrentTime);
		      currenttime = util.formatPlayTime(currenttime);
		      that.dataset.$currenttime.html( currenttime );
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiShowTime', UiShowTime);
	
	/***/ },
	/* 70 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=time%>\" class=\"txp_time_display\">\n  <txpdiv class=\"txp_time_current\" data-role=\"<%=currentTimeRole%>\">00:00</txpdiv>\n  <txpdiv class=\"txp_time_separator\">/</txpdiv>\n  <txpdiv class=\"txp_time_duration\" data-role=\"<%=durationRole%>\">00:00</txpdiv>\n  <txpdiv class=\"txp_live_badge\">直播</txpdiv>\n</txpdiv>";
	
	/***/ },
	/* 71 */
	/***/ function(module, exports, __webpack_require__) {
	
		var htmlstr = __webpack_require__(72);
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api             = Txplayer.apiList;
		function UiTips(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		UiTips.prototype = {
		  init: function(){
		    this.write();
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      hide: Txplayer.dataset.hideClass,
		      tips: 'txp-ui-tips',
		      text: 'txp-ui-tips-text',
		      close: 'txp-ui-tips-close',
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$tips = this.context.dataset.$playermod.find('[data-role="'+renderData.tips+'"]');
		    this.dataset.$text = this.context.dataset.$playermod.find('[data-role="'+renderData.text+'"]');
		    this.dataset.$close = this.context.dataset.$playermod.find('[data-role="'+renderData.close+'"]');
		  },
		  remove: function(){
		    this.dataset.$tips.remove();
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.$close.on('click', function(){
		      that.context.msg.broadcast(api.privateApi.hideUiTips);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.showUiTips]  = function(data){
		      if ( !(data && data.text) ) return;
		      data.time = data.time || 4;
		      if($.type(data.hideClose)==='undefined') data.hideClose = false;
		      if (data.hideClose) that.dataset.$close.addClass(Txplayer.dataset.hideClass);
		      else that.dataset.$close.removeClass(Txplayer.dataset.hideClass);
		      that.dataset.$tips.removeClass(Txplayer.dataset.hideClass);
		      that.dataset.$text.html(data.text);
		      if (that.dataset.hide_TIMER) clearTimeout(that.dataset.hide_TIMER);
		      that.dataset.hide_TIMER = setTimeout(function(){
		        that.context.msg.broadcast(api.privateApi.hideUiTips);
		      },data.time * 1000);
		    }
		    this.dataset.privateApis[api.privateApi.hideUiTips]  = function(data){
		      that.dataset.$tips.addClass(Txplayer.dataset.hideClass);
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiTips', UiTips);
	
	/***/ },
	/* 72 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=tips%>\" class=\"txp_alert_info <%=hide%>\">\n  <txpdiv class=\"txp_alert_content\">\n    <txpdiv data-role=\"<%=text%>\" class=\"txp_alert_text\"></txpdiv>\n    <button data-role=\"<%=close%>\" class=\"txp_btn txp_btn_close\" title=\"关闭\"></button>\n  </txpdiv>\n</txpdiv>";
	
	/***/ },
	/* 73 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(74);
	
		function UiTitle(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiTitle.prototype = {
		  init: function(){
		    this.dataset.playerConfig = this.context.config;
		    this.write();
		    this.initDisplay();
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      hideClass: Txplayer.dataset.hideClass,
		      title: 'txp-ui-title-mod',
		      titleText: 'txp-ui-title-text'
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$title = this.context.dataset.$playermod.find('[data-role="'+renderData.title+'"]');
		    this.dataset.$titleText = this.context.dataset.$playermod.find('[data-role="'+renderData.titleText+'"]');
		  },
		  remove: function(){
		    this.dataset.$title.remove();
		  },
		  initDisplay: function(){
		    if (this.dataset.playerConfig.showTitle) {
		      this.dataset.$title.removeClass(Txplayer.dataset.hideClass);
		    }else{
		      this.dataset.$title.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  updateTile: function(){
		    var title = '';
		    var json = this.context.msg.run(api.privateApi.getVideoInfoData);
		    if (json && json.vl &&
		      json.vl.vi && json.vl.vi[0] &&
		      json.vl.vi[0].ti) {
		      title = json.vl.vi[0].ti;
		    }
		    if (!title) return;
		    this.dataset.$titleText.html(title);
		  },
		  addEventListener: function(){
		    var that = this;
		    that.updateTile();
	
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onGetVideoUrlSuccess)] = function(){
		      that.updateTile();
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
	
		    this.dataset.$title.on('mouseenter', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, true);
		    }).on('mouseleave', function(){
		      that.context.msg.broadcast(api.privateApi.disableHideControl, false);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.hideUiTitle] = function(){
		      that.dataset.$title.addClass(Txplayer.dataset.hideClass);
		    }
		    this.dataset.privateApis[api.privateApi.showUiTitle] = function(){
		      if (!that.dataset.playerConfig.showTitle) return;
		      that.dataset.$title.removeClass(Txplayer.dataset.hideClass);
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiTitle', UiTitle);
	
	/***/ },
	/* 74 */
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=title%>\" class=\"txp_video_title <%=hideClass%>\">\n  <a data-role=\"<%=titleText%>\" class=\"txp_title_link\"></a>\n</txpdiv>";
	
	/***/ },
	/* 75 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(76);
	
		function UiToggleSidebar(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiToggleSidebar.prototype = {
		  init: function(){
		    this.dataset.playerConfig = this.context.msg.run(api.privateApi.getPlayerConfig);
		    this.write();
		    this.initDisplay();
		    this.addEventListener();
		  },
		  initDisplay: function(){
		    if (this.dataset.playerConfig.showToggleSideBar) {
		      this.dataset.$btn.removeClass(Txplayer.dataset.hideClass);
		    }else{
		      this.dataset.$btn.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  write: function(){
		    var renderData = {
		      btn: 'txp-ui-control-sidebar',
		      tooltips: 'txp-ui-control-sidebar-tooltips',
		      tabindex: Txplayer.dataset.tabindex++,
		      hideClass: Txplayer.dataset.hideClass
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$btn = this.context.$mod.$buttonsrightmod.find('[data-role=' + renderData.btn +']');
		    this.dataset.$tooltips = this.context.$mod.$buttonsrightmod.find('[data-role=' + renderData.tooltips +']');
		  },
		  remove: function(){
		    this.dataset.$btn.remove();
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.$btn.on(Txplayer.dataset.clickEventName, function(){
		      var action = '';
		      if (that.dataset.$btn.attr('data-status')==='true') {
		        action = 'show';
		      }else{
		        action = 'hide';
		      }
		      that.context.userMsg.broadcast(api.eventApi.onToggleSideBar, action);
		    });
		    this.context.userMsg.on(api.eventApi.onToggleSideBar, function(data){
		      if(data==='show'){
		        that.dataset.$btn.attr('data-status', 'false');
		        that.dataset.$tooltips.html('收起侧栏');
		      }else{
		        that.dataset.$btn.attr('data-status', 'true');
		        that.dataset.$tooltips.html('展开侧栏');
		      }
		    });
		  }
		};
	
		Txplayer.register('UiToggleSidebar', UiToggleSidebar);
	
	/***/ },
	/* 76 */
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=btn%>\" class=\"txp_btn txp_btn_size <%=hideClass%>\" data-status=\"false\" data-report=\"sidebar-toggle\">\n  <svg class=\"txp_icon txp_icon_size\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_symbol txp_svg_size\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_size\"></use>\n    <use class=\"txp_svg_symbol txp_svg_size_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_size_true\"></use>\n  </svg>\n  <txpdiv data-role=\"<%=tooltips%>\" class=\"txp_tooltip\">收起侧栏</txpdiv>\n</button>";
	
	/***/ },
	/* 77 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(78);
	
		function UiVolume(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiVolume.prototype = {
		  init: function(){
		    this.write();
		    this.onVolumeUpdate();
		    this.addEventListener();
		  },
		  write: function(){
		    var renderData = {
		      volumeButton: 'txp-control-volume-button',
		      volumeValue: 'txp-control-volume-value',
		      volumeClickButton: 'txp-control-volume-click-button',
		      volumeDrag: 'txp-control-volume-drag',
		      volumeRange: 'txp-control-volume-range',
		      volumeHandler: 'txp-control-volume-handler',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$volumeButton = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.volumeButton+'"]');
		    this.dataset.$volumeClickButton = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.volumeClickButton+'"]');
		    this.dataset.$volumeValue = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.volumeValue+'"]');
		    this.dataset.$volumeDrag = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.volumeDrag+'"]');
		    this.dataset.$volumeRange = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.volumeRange+'"]');
		    this.dataset.$volumeHandler = this.context.$mod.$buttonsrightmod.find('[data-role="'+renderData.volumeHandler+'"]');
		  },
		  remove: function(){
		    this.dataset.$volumeDrag.remove();
		    this.dataset.$volumeButton.remove();
		  },
		  onVolumeUpdate: function(){
		    var isMute = this.context.superMsg.run(api.publicApi.isMuted);
		    var val;
		    if (isMute) {
		      val = 0;
		    }else{
		      val = this.context.superMsg.run(api.publicApi.getVolume);
		    }
		    if ($.type(val)!=='number') return;
		    this.updateVolumeUi(val);
		  },
		  updateVolumeUi: function(val){
		    this.dataset.$volumeValue.css('height', val + '%');
		    if (val===0) {
		      this.dataset.$volumeButton.attr('data-status', 'mute');
		    }else{
		      if (val>=50){
		        this.dataset.$volumeButton.attr('data-status', 'normal');
		      }else{
		        this.dataset.$volumeButton.attr('data-status', 'damping');
		      }
		    }
		  },
		  volumeDrag: function(){
		    var enableChangeVolume = false;
		    var that = this;
		    var rangeHeight;
		    var modeHeight;
		    var offsetTop;
		    var volume;
		    var calcVolumeByMousePosition = function(e){
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      var y;
		      if ($(e.target).data('role')===that.dataset.renderData.volumeHandler) {
		        y = e.offsetY + e.target.offsetParent.offsetTop - e.target.offsetTop;
		      }else if($(e.target).data('role')===that.dataset.renderData.volumeValue) {
		        y = e.offsetY + e.target.offsetParent.offsetTop + e.target.offsetTop;
		      }else{
		        y = e.offsetY;
		      }
		      if (y <= offsetTop) {
		        volume = 100;
		      }else if (y>= (rangeHeight + offsetTop)){
		        volume = 0;
		      }else{
		        volume = rangeHeight - (y - offsetTop);
		        volume = parseInt((volume / rangeHeight)*100);
		      }
		      that.updateVolumeUi(volume);
		      that.context.superMsg.broadcast(api.publicApi.setVolume, volume);
		    };
		    this.dataset.$volumeDrag.on('mousedown', function(e){
		      enableChangeVolume = true;
		      rangeHeight = that.dataset.$volumeRange.height();
		      modeHeight = that.dataset.$volumeDrag.height();
		      offsetTop = that.dataset.$volumeRange.get(0).offsetTop;
		      calcVolumeByMousePosition(e);
		    }).on('mousemove', function(e){
		      if (!enableChangeVolume) return;
		      calcVolumeByMousePosition(e);
		    }).on('mouseup', function(e){
		      enableChangeVolume = false;
		      calcVolumeByMousePosition(e);
		    }).on('mouseleave', function(){
		      enableChangeVolume = false;
		    });
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[api.eventApi.onVolumeChange] = function(){
		      that.onVolumeUpdate();
		    };
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		    this.dataset.$volumeButton.on('click', function(e){
		      // for not firefox
		      // 只有点击音量按钮，才静音
		      if ( !util.browser.firefox &&
		        $(e.target).attr('data-role')!==that.dataset.renderData.volumeClickButton &&
		        $(e.target).parent().attr('data-role')!==that.dataset.renderData.volumeClickButton
		      ){
		        return;
		      }
		      if (that.context.superMsg.run(api.privateApi.isPlayingAd)) return;
		      var isMute = that.context.superMsg.run(api.publicApi.isMuted);
		      var volume;
		      if (isMute) {
		        that.context.superMsg.run(api.publicApi.unMute);
		        volume = that.context.superMsg.run(api.publicApi.getVolume);
		        that.updateVolumeUi(volume);
		      }else{
		        that.context.superMsg.run(api.publicApi.mute);
		        that.dataset.$volumeButton.addClass(that.dataset.muteClass);
		        that.updateVolumeUi(0);
		      }
		    });
		    // for firefox BUG:
		    // Children of button does not respond to :hover
		    // https://bugzilla.mozilla.org/show_bug.cgi?id=843003
		    this.dataset.$volumeButton.on('mouseenter', function(){
		      if (that.dataset.hasHandlerFirfox) return;
		      if (!util.browser.firefox) return;
		      var $layer = that.dataset.$volumeDrag;
		      var $parent = $layer.parent();
		      $layer.css({
		        'left': $parent.position().left - $layer.width()/2 + $parent.width()/2
		      });
		      $parent.after($layer);
		      that.dataset.hasHandlerFirfox = true;
		    });
		    this.volumeDrag();
		  }
		};
	
		Txplayer.register('UiVolume', UiVolume);
	
	/***/ },
	/* 78 */
	/***/ function(module, exports) {
	
		module.exports = "<button class=\"txp_btn txp_btn_volume\" data-role=\"<%=volumeButton%>\" data-status=\"normal\">\n  <svg data-role=\"<%=volumeClickButton%>\" data-report=\"mute-toggle\" class=\"txp_icon txp_icon_volume\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_symbol txp_svg_volume\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume\"></use>\n    <use class=\"txp_svg_symbol txp_svg_volume_damping\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume_damping\"></use>\n    <use class=\"txp_svg_symbol txp_svg_volume_mute\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume_mute\"></use>\n  </svg>\n  <txpdiv data-role=\"<%=volumeDrag%>\" class=\"txp_popup txp_popup_volume\" data-report=\"change-volume\">\n    <txpdiv data-role=\"<%=volumeRange%>\" class=\"txp_volume_range\">\n      <txpdiv class=\"txp_volume_range_current\" style=\"height:100%\" data-role=\"<%=volumeValue%>\">\n        <txpdiv data-role=\"<%=volumeHandler%>\" class=\"txp_volume_handle\"></txpdiv>\n      </txpdiv>\n    </txpdiv>\n  </txpdiv>\n</button>";
	
	/***/ },
	/* 79 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(80);
	
		function UiWindowFullScreen(context) {
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiWindowFullScreen.prototype = {
		  init: function() {
		    this.dataset.browserFullscreenClass = 'txp_mode_fullscreen';
		    this.dataset.isBrowserFullscreen = false;
		    this.dataset.isWindowFullscreen = false;
		    this.write();
		    this.addEventListerner();
		    this.exportsModuleApis();
		  },
		  write: function() {
		    var renderData = {
		      fullscreenBtn: 'txp-ui-control-fullscreenbtn',
		      toolTip: 'window-fullscreen',
		      tabindex: Txplayer.dataset.tabindex++
		    };
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.$mod.$buttonsrightmod.append(htmldata);
		    this.dataset.$fullscreenBtn = this.context.$mod.$buttonsrightmod.find('[data-role="' + renderData.fullscreenBtn + '"]');
		    this.dataset.$txp_tooltip = this.dataset.$fullscreenBtn.find('[data-role="' + renderData.toolTip + '"]');
		    this.dataset.$playermod = this.context.$mod.$playermod;
		    this.dataset.$fullscreenContainer = this.context.$mod.$playermod[0];
		  },
		  remove: function(){
		    this.dataset.$fullscreenBtn.remove();
		  },
		  toggleWindowFullScreen: function(){
		    if (this.dataset.isWindowFullscreen) {
		      this.context.superMsg.broadcast(api.publicApi.exitWindowFullscreen);
		    } else {
		      this.context.superMsg.broadcast(api.publicApi.enterWindowFullscreen);
		    }
		  },
		  requestFullScreen: function(elem, mode, fn){
		    elem = elem || this.dataset.$fullscreenContainer;
		    mode = mode || 'enter';
		    if (mode==='enter'){
		      fn = elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen || elem.webkitRequestFullscreen;
		      if (!fn){
		        elem = document;
		        fn = elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen || elem.webkitRequestFullscreen;
		      }
		    }else{
		      fn = elem.cancelFullScreen || elem.mozCancelFullScreen || elem.webkitCancelFullScreen || elem.exitFullscreen || elem.webkitExitFullscreen;
		      if (!fn){
		        elem = document;
		        fn = elem.cancelFullScreen || elem.mozCancelFullScreen || elem.webkitCancelFullScreen || elem.exitFullscreen || elem.webkitExitFullscreen;
		      }
		    }
		    try{
		      if (fn) {
		        fn.call(elem);
		      }
		      // dom节点不能支持全屏模式，video进入全屏模式
		      else if(!fn && mode==='enter'){
		        this.context.superMsg.broadcast(api.privateApi.videoRequestFullScreen);
		      }
		    }catch(e){
		      util.showError('requestFullScreen error', e);
		      this.context.superMsg.broadcast(api.privateApi.reportError, {
		        msg: e.message,
		        code: '3000',
		        stack: e.stack
		      });
		    }
		  },
		  isFullScreen: function(){
		    if ($.type(document.webkitIsFullScreen)!=='undefined'){
		      return document.webkitIsFullScreen;
		    }
		  },
		  exitWindowFullscreen: function(){
		    var that = this;
		    that.dataset.$fullscreenBtn.attr('data-status', false);
		    that.dataset.isWindowFullscreen = false;
		    that.dataset.$txp_tooltip.html('全屏');
		    that.requestFullScreen(null, 'exit');
		  },
		  enterWindowFullscreen: function(){
		    var that = this;
		    that.context.superMsg.broadcast(api.publicApi.exitBrowserFullscreen, {noUpdateClass: true});
		    that.dataset.$fullscreenBtn.attr('data-status', true);
		    that.dataset.isWindowFullscreen = true;
		    that.dataset.$txp_tooltip.html('退出全屏');
		    that.requestFullScreen(null, 'enter');
		  },
		  addEventListerner: function() {
		    var that = this;
		    this.dataset.$fullscreenBtn.on(Txplayer.dataset.clickEventName, function() {
		      that.toggleWindowFullScreen();
		    });
	
		    //监听全屏变化事件
		    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function(e) {
		      that.context.userMsg.broadcast(api.eventApi.onWindowFullscreenChange,that.dataset.isWindowFullscreen);
		      that.context.msg.broadcast(api.eventApi.onWindowFullscreenChange,that.dataset.isWindowFullscreen);
		      if(that.isFullScreen()){
		        that.enterWindowFullscreen();
		        that.context.$mod.$playermod.addClass(that.dataset.browserFullscreenClass);
		      }else{
		        that.exitWindowFullscreen();
		        that.context.$mod.$playermod.removeClass(that.dataset.browserFullscreenClass);
		      }
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.moduleApis = {};
		    this.dataset.moduleApis[api.publicApi.toggleWindowFullScreen] = function(){
		      that.toggleWindowFullScreen();
		    }
		    this.dataset.moduleApis[api.publicApi.enterWindowFullscreen] = function() {
		      that.enterWindowFullscreen();
		    }
		    this.dataset.moduleApis[api.publicApi.exitWindowFullscreen] = function() {
		      that.exitWindowFullscreen();
		    }
		    this.dataset.moduleApis[api.publicApi.isWindowFullscreen] = function(data, options) {
		      options.data = that.dataset.isWindowFullscreen;
		    }
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.superMsg.on(key, fn);
		    });
		  }
	
		};
	
		Txplayer.register('UiWindowFullScreen', UiWindowFullScreen);
	
	
	/***/ },
	/* 80 */
	/***/ function(module, exports) {
	
		module.exports = "<button class=\"txp_btn txp_btn_fullscreen\" data-role=\"<%=fullscreenBtn%>\" data-status=\"false\" data-report=\"window-fullscreen\">\n  <svg class=\"txp_icon txp_icon_fullscreen\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_symbol txp_svg_fullscreen\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_fullscreen\"></use>\n    <use class=\"txp_svg_symbol txp_svg_fullscreen_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_fullscreen_true\"></use>\n  </svg>\n  <txpdiv class=\"txp_tooltip\" data-role=\"<%=toolTip%>\">全屏</txpdiv>\n</button>\n";
	
	/***/ },
	/* 81 */
	/***/ function(module, exports, __webpack_require__) {
	
		var uaMatch       = __webpack_require__(82);
		var report        = __webpack_require__(83);
		var api           = __webpack_require__(84);
		var util          = __webpack_require__(85);
		util.uaMatch      = uaMatch;
		uaMatch.call(util);
		util.report       = report;
	
	
		var defaultconfig = __webpack_require__(86);
		var dataset       = __webpack_require__(87);
		var Events        = __webpack_require__(88);
		var $             = __webpack_require__(90);
		var tmpl          = __webpack_require__(91);
		var xml2json   = __webpack_require__(92);
		var playerReport = __webpack_require__(93);
		$.tmpl            = tmpl;
		util.xml2json = xml2json;
	
		var defaultPluginsMap = {
		  vod: {
		    // 高清h5点播
		    html5hd: [
		      'HtmlFrame',
		      'HdPlayer',
		      'UiTips',
		      'HdPlayerAd',
		      'HdPlayerReport',
		      'HdPlayerHistory',
		      'UiControl',
		      'UiPreview',
		      'UiLoading',
		      'UiTitle',
		      // 'UiFavorite',
		      'UiPlayerAd',
		      'UiPoster',
		      'UiDialog',
		      'HdPlayerAdReport',
		      'HdHotKey',
		      'HdPlayerControl'
		    ],
		    // ipad
		    ipadh5: [
		      'HtmlFrame',
		      'UiTips',
		      'UiControl',
		      'UiLoading',
		      'UiTitle',
		      'UiPlay',
		      // 'UiFavorite',
		      'UiPlayerAd',
		      'HdPlayerReport',
		      'HdPlayerHistory',
		      'UiPoster',
		      'UiDialog',
		      'HdPlayerAd',
		      'HdPlayerAdReport',
		      'H5Player',
		      'H5PlayerControl'
		    ],
		    // flash播放器
		    'flash'      : ['HtmlFrame','FlashPlayer'],
		    // 三星合作商tizen
		    'tizen'      : ['TizenLoadingAd','TizenTV']
		  },
		  live: {
	
		  }
		};
	
		/**
		 * 核心框架
		 * @param {Object} config 配置参数
		 */
		function Txplayer(conf){
		  // 私有消息对象，供内部通信
		  var privateMsg = new Events();
		  // 用户消息对象，供用户事件监听回调
		  var userMsg   = new Events();
		  this.userMsg = userMsg;
		  if (conf.playType) conf.playerType = conf.playType;
		  // privite data
		  var config = $.extend({}, defaultconfig, conf);
		  var pluginsMaps = conf.pluginsMap || defaultPluginsMap;
		  var pluginsMap;
		  pluginsMap = pluginsMaps[config.videoType];
		  // 拓展settings
		  config.settings = $.extend({}, config.settings, config.extendSettings || {});
	
		  var context = {
		    config  : config,
		    msg     : privateMsg,
		    userMsg : userMsg,
		    dataset : {}
		  };
		  privateMsg.setMaxListeners(100);
		  userMsg.setMaxListeners(100);
		  var plugins                        = choosePlugins(config, pluginsMap);
		  // 拓展插件列表
		  if (conf.extendPluginsMap &&
		    conf.extendPluginsMap[config.videoType] &&
		    conf.extendPluginsMap[config.videoType][config.playerType]
		  ) {
		    plugins = plugins.concat(conf.extendPluginsMap[config.videoType][config.playerType]);
		  }
		  var that                           = this;
		  config.playerId                    = getPlayerId();
		  dataset._instance[config.playerId] = this;
		  if (config.playerType==='flash'){
		    dataset.flashVersion = util.getFlashVersion();
		  }
	
		  // 设置用户ID
		  getAndSetUserId();
		  userMsg.on(api.eventApi.onReady, function(){
		    playerReport.reportTxplayer(context, {
		      playType: config.playerType,
		      videoType: config.videoType
		    });
		  });
		  // 提供上报接口
		  playerReport.exportsReportApi(context);
	
		  // Txplayer给用户的API
		  for (var key in api.publicApi) {
		    (function(apiName, msgName){
		      that[apiName] = function(){
		        // 找不到指令则抛出错误
		        if (!privateMsg.listenerCount(msgName)) {
		          util.showError(msgName, 'API没有实现，请核对当前版本是否有提供这个API('+dataset.documentWebSite+')');
		          return 'error';
		        }
		        // 处理API参数, 第一个是消息名，之后是参数
		        var args = [msgName];
		        $.each(arguments, function(idx, item){
		          args.push(item);
		        });
		        return privateMsg.run.apply(privateMsg, args);
		      };
		    })(key, api.publicApi[key]);
		  }
	
		  // 判断API是否存在
		  this.isApiExist = function(apiName){
		    if (api.publicApi[apiName] && privateMsg.listenerCount(api.publicApi[apiName]) > 0){
		      return true;
		    }
		    return false;
		  };
	
		  // 存储播放容器DOM对象
		  privateMsg.on('setPlayerModel', function($dom){
		    if ($dom && $dom.length) {
		      context.dataset.$playermod = $dom;
		    }
		  });
	
		  // 拓展插件
		  function extend(objA, objB){
		    var obj = {};
		    for(var i in objA){
		      if (!objB.hasOwnProperty(i)){
		        obj[i] = objA[i];
		        continue;
		      }
		    }
		  }
	
		  // 设置和存储用户标识
		  function getAndSetUserId(){
		    var uid = util.getData(dataset.localStorageKey.userId);
		    if (!uid || uid.length !==32) {
		      uid = util.createGUID();
		      util.setData(dataset.localStorageKey.userId, uid);
		    }
		    context.msg.on(api.publicApi.getUserId, function(data, options){
		      options.data = uid;
		    });
		  }
	
		  // 获取播放ID
		  function getPlayerId(){
		    var pid = util.createGUID();
		    return pid;
		  }
	
		  // 插件过滤
		  function choosePlugins(config, pluginsMap){
		    function getPlayTypeFromData(){
		      var datastr = util.getData(dataset.localStorageKey.userSetting);
		      var data = {};
		      try{
		        if (window.JSON && $.type(JSON.parse)==='function'){
		          data = JSON.parse(datastr);
		        }else{
		          data = $.parseJSON(datastr);
		        }
		      }catch(e){
		        context.msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		          msg: e.message,
		          code: '3000',
		          stack: e.stack
		        });
		      }
		      if (data && data.isUseFlash+'' === '1') return 'flash';
		      else if(data && data.isUseFlash+'' === '0') return 'html5hd';
		      return '';
		    }
		    var type;
		    // pc播放器，首先从本地数据读取
		    if (!util.mobile) {
		      type = getPlayTypeFromData();
		    }
		    // windows debug=true，可以使用h5播放器
		    if ((config.playerType==='html5hd' || type==='html5hd') &&
		      util.os.windows && !dataset.debug
		    ){
		      type = 'flash';
		    }
		    // ie浏览器强制使用flash
		    if (util.browser.ie) {
		      type = 'flash';
		    }
		    config.playerType = type ? type : (
		      config.playerType ? config.playerType : getPlayTypeByUA());
		    var pluginList = pluginsMap[config.playerType];
		    if (!pluginList || pluginList.length===0) return [];
		    return pluginList;
		  }
	
		  // 加载插件
		  function installPlugins(){
		    util.loadPlugins.call(that, plugins, context, config.settings, function(){
		      context.dataset.isReady = true;
		      if (config.playerType==='flash') return;
		      userMsg.broadcast(api.eventApi.onReady);
		      privateMsg.broadcast(api.eventApi.onReady);
		    });
		  }
	
		  // 根据UA选择播放类型
		  function getPlayTypeByUA(){
		    function getVodPlayType(){
		      if (util.os.mac){
		        return 'html5hd';
		      }
		      else if(util.os.windows){
		        return 'flash';
		      }
		      else if(util.os.ios){
		        if (util.os.ipad) return 'ipadh5';
		        return 'h5';
		      }
		      else if(util.os.android){
		        if (util.isSupportMP4()) return 'h5';
		        else return 'mp4link';
		      }
		      return 'h5';
		    }
	
		    function getLivePlayType(){}
		    if (config.videoType==='vod') return getVodPlayType();
		    else return getLivePlayType();
		  }
	
		  // CDN合并服务
		  function comboService(){
		    var list = [];
		    var urls = [];
		    var comboUrls = [];
		    var checkSub = function(obj){
		      if ($.type(obj)==='string'){
		        if(!config.settings[obj]){
		          list.push(obj);
		        }else if (config.settings.hasOwnProperty(obj) && !config.settings[obj].url){
		          list.push(obj);
		        }
		        if (config.settings[obj] && $.type(config.settings[obj].subPlugins)==='array'){
		          $(config.settings[obj].subPlugins).each(function(idx, item){
		            checkSub(item);
		          });
		        }
		      }
		    };
		    $(plugins).each(function(idx, item){
		      checkSub(item);
		    });
		    $(list).each(function(idx, item){
		      // if ( $.inArray(item.toLowerCase(), ['hdplayerreport', 'hdplayerhistory']) >-1) return;
		      if (Txplayer.plugins[item]) return;
		      urls.push('/tencentvideo/txp/js/plugins/'+ item.toLowerCase()+'.js');
		    });
		    while(urls.length>=20){
		      comboUrls.push( dataset.comboServiceRule + urls.splice(0,20) );
		    }
		    if (urls.length>0){
		      comboUrls.push( dataset.comboServiceRule + urls.splice(0,20) );
		    }
		    var loadComboScript = function(){
		      if (comboUrls.length===0){
		        installPlugins();
		        return;
		      }
		      var url = comboUrls.shift();
		      util.loadScript(url).done(function(){
		        loadComboScript();
		      }).fail(function(){
		        loadComboScript();
		      });
		      // util.loadScript(url, function(){
		      //   loadComboScript();
		      // }, function(){
		      //   loadComboScript();
		      // });
		    };
		    loadComboScript();
		  }
	
		  if (config.useComboService){
		    comboService();
		  }else{
		    installPlugins();
		  }
	
		  userMsg.on(api.publicApi.isReady, function(data, options){
		    options.data = !!context.dataset.isReady;
		  });
		  privateMsg.on(api.publicApi.getPlayerType, function(data, options){
		    options.data = config.playerType;
		  });
		  privateMsg.on(api.publicApi.getVideoType, function(data, options){
		    options.data = config.videoType;
		  });
	
		  // 销毁机制
		  context.msg.on(Txplayer.apiList.privateApi.destroyPlugin, function(data, options){
		    if (data) {
		      var key = '_' + data;
		      if (that[key]){
		        that[key] = null;
		        delete that[key];
		      }
		      return;
		    }
		    for(var i in that){
		      that[i] = null;
		      delete that[i];
		    }
		    dataset.maxId--;
		  });
	
		  // 添加事件
		  this.on = function(evtName, fn){
		    if (typeof evtName!=='string') {
		      util.error('player.on(evtName, fn), evtName must be a String');
		      return this;
		    }
		    if (typeof fn!=='function') {
		      util.error('player.on(evtName, fn), fn must be a Function');
		      return this;
		    }
		    // set this point to Txplayer instance
		    var that = this;
		    userMsg.on(evtName, function(){
		      fn.apply(that, arguments);
		    });
		    return this;
		  };
		  // 触发事件
		  this.trigger = function(evtName, data){
		    if (typeof evtName!=='string') return false;
		    // 支持拓展多个参数
		    var args = [evtName, data];
		    $.each(arguments, function(idx, item){
		      if (idx<2) return;
		      args.push(item);
		    });
		    // return userMsg.broadcast(evtName, data);
		    return userMsg.broadcast.apply(userMsg, args);
		  };
		  // 移除事件
		  this.off = function(evtName){
		    if (typeof evtName!=='string') {
		      util.error('player.off("evtName"):evtName must be a string');
		      return false;
		    }
		    userMsg.off(evtName);
		    return this;
		  };
		}
	
		// global api
		Txplayer.register = function(pluginName, fn){
		  if (typeof pluginName!=='string') {
		    util.error('player.register(pluginName, fn), pluginName must be a String');
		    return this;
		  }
		  if (typeof fn!=='function') {
		    util.error('player.register(pluginName, fn), fn must be a Function');
		    return this;
		  }
		  Txplayer.plugins[pluginName] = fn;
		};
	
		$(document).trigger(dataset.jsApiReady);
		Txplayer.msg           = new Events();
		Txplayer.dataset       = dataset;
		Txplayer.defaultconfig = defaultconfig;
		Txplayer.util          = util;
		Txplayer.Events        = Events;
		Txplayer.plugins       = {};
		Txplayer.$             = $;
		Txplayer.apiList       = api;
		window.Txplayer        = Txplayer;
	
	/***/ },
	/* 82 */
	/***/ function(module, exports) {
	
		function uaMatch(ua){
		  ua = ua || navigator.userAgent;
		  ua = ua.toLowerCase();
		  if (!this.browser) this.browser = {};
		  if (!this.os) this.os = {};
		  if (!this.phone) this.phone = {};
		  if (!this.mobile) this.mobile = false;
	
		  // $.mobile
		  if (ua.indexOf('mobile')>-1) this.mobile = true;
	
	
		  // $.os
		  var osDetect = {
		    android_1: /android[\s\/]([\d\.]+)/i,
		    android_2: /android/i,
		    android_3: /MIDP-/i,
		    ipod_1: /iPod\stouch;\sCPU\siPhone\sos\s([\d_]+)/i,
		    ipod_100: /iPod.*os\s?([\d_\.]+)/i,
		    iphone: /iPhone;\sCPU\siPhone\sos\s([\d_]+)/i,
		    iphone_100: /iPhone.*os\s?([\d_\.]+)/i,
		    ipad_1: /ipad;\scpu\sos\s([\d_]+)/i,
		    ipad_2: /ipad([\d]+)?/i,
		    windows: /windows\snt\s([\d\.]+)/i,
		    mac: /Macintosh.*mac\sos\sx\s([\d_\.]+)/i
		  };
		  var osMatch;
		  for(var i in osDetect){
		    osMatch = osDetect[i].exec(ua);
		    if (!osMatch) continue;
		    this.os[ i.replace(/_\d+/,'') ] = true;
		    if (osMatch[1]) this.os.version = osMatch[1].replace(/_/g,'.');
		    break;
		  }
		  // $.os.ios
		  if (this.os.iphone || this.os.ipad || this.os.ipod) {
		    this.os.ios = true;
		  }
	
	
		  // $.browser
		  var browserDetect = {
		    wechat: /MicroMessenger\/([\d\.]+)/i,
		    ipadqq: /IPadQQ\/([\d\.]+)/i,
		    mqq: /qq\/([\d\.]+)/i,
		    chrome_1: /CriOS\/([\d\.]+)/i,
		    chrome_2: /Chrome\/([\d\.]+)/i,
		    qzone: /QZONEJSSDK\/([\d\.]+)/i,
		    mqqbrowser: /mqqbrowser\/([\d\.]+)/i,
		    qqbrowser: /[^m]QQBrowser\/([\d\.]+)/i,
		    x5: /tbs\/(\d+)/i,
		    uc: /UCBrowser\/([\d\.]+)/i,
		    safari: /Safari\/([\d\.]+)/i,
		    firefox: /Firefox\/([\d\.]+)/i,
		    ie: /MSIE\s([\d\.]+)/i,
		    weibo: /weibo__([\d\.]+)/i,
		    qqnews: /qqnews\/([\d\.]+)/i,
		    qqlive: /QQLiveBrowser\/([\d\.]+)/i,
		    kuaibao: /qnreading\/([\d\.]+)/i,
		    liebao: /LieBaoFast\/([\d\.]+)/i,
		    douban: /com\.douban\.frodo\/([\d\.]+)/i,
		    miuibrowser: /MiuiBrowser/i,
		    baidu: /baiduboxapp/i,
		    browser360: /360browser/i,
		    oppobrowser: /OppoBrowser/i
		  };
		  var browserMatch;
		  for(var j in browserDetect){
		    browserMatch = browserDetect[j].exec(ua);
		    if (!browserMatch) continue;
		    this.browser[ j.replace(/_\d+/,'') ] = {
		      version: browserMatch[1]
		    };
		  }
		  if (this.os.android && this.browser.safari) delete this.browser.safari;
		  if (this.browser.chrome && this.browser.safari) delete this.browser.safari;
	
	
		  // $.phone
		  var phoneDetect = {
		    ipod: /iPod/i,
		    ipad: /iPad/i,
		    iphone: /iPhone/i,
		    huawei_1: /HUAWEI([\w_-]+)/i,
		    huawei_2: /(CHM-\w+)/i,
		    huawei_3: /(HonorChe)/i,
		    huawei_4: /HONORPLK/i,
		    huawei_5: /(Che\d+-CL\d+)/i,
		    huawei_6: /(H\d+-L\d+)/i,
		    huawei_100: /HUAWEI/i,
		    xiaomi_1: /(HM\sNOTE)/i,
		    xiaomi_2: /(HM\s\w+)/i,
		    xiaomi_3: /(MI\s\w+)/i,
		    xiaomi_4: /(MI-ONE\sPlus)/i,
		    xiaomi_5: /(M1)\sBuild/i,
		    xiaomi_6: /(HM\d+)/i,
		    xiaomi_7: /Xiaomi[\s_]?([\w_]+)/i,
		    samsung_1: /(GT-\w+)/i,
		    samsung_2: /(SCH-\w+)/i,
		    samsung_3: /(SM-\w+)/i,
		    vivo: /vivo\s(\w+)/i,
		    oneplus: /ONEPLUS-([a-z0-9]+)/i,
		    lenovo_1: /Lenovo[\s-]?([\w-]+)/i,
		    lenovo_100: /Lenovo/i,
		    zte_1: /ZTE\s?(\w+)?/i,
		    zte_2: /ZTE/i,
		    coolpad_1: /Coolpad\s(\w+)/i,
		    coolpad_100: /Coolpad/i,
		    oppo_1: /OPPO\s?(\w+)/i,
		    oppo_2: /(R7Plus|R8007|R801|R831S|R8205)/i,
		    oppo_100: /OPPO/i,
		    meizu_1: /(MX\d+)/i,
		    meizu_2: /(m\d+\snote)\sBuild/i,
		    htc_1: /HTC\s?(\w+)/i,
		    htc_100: /HTC/i,
		    tcl: /TCL\s(\w+)/i,
		    lephone: /lephone\s(\w+)/i,
		    lg: /LG[\s-]?(\w+)/i,
		    galaxy: /(galaxy\d+)/,
		    hisense_1: /Hisense/i,
		    hisense_2: /HS-(\w+)/i,
		    philips: /Philips\s?(\w+)?/i,
		    '金立': /(GN\w+)\sBuild/i,
		    sonny: /sonny/i,
		    '天语': /K-Touch/i
		  };
		  var phoneMatch;
		  for(var k in phoneDetect){
		    phoneMatch = phoneDetect[k].exec(ua);
		    if (!phoneMatch) continue;
		    this.phone.name = k.replace(/_\d+/,'')
		    if (phoneMatch[1]) this.phone.version = phoneMatch[1].replace(/^[_-]/ig,'');
		    break;
		  }
		}
		module.exports = uaMatch;
	
	/***/ },
	/* 83 */
	/***/ function(module, exports) {
	
		var list = [];
		var timer;
		var imgObj;
		function report(url) {
		  if (timer) {
		    list.push(url);
		    return;
		  }
		  timer = setTimeout(function(){
		    timeoutHandler();
		  }, 1000);
		  imgObj = document.createElement("img");
		  imgObj.onerror = timeoutHandler;
		  imgObj.src = url;
		}
		function timeoutHandler(){
		  if (list.length===0){
		    imgObj = null;
		    timer = null;
		    return;
		  }
		  clearTimeout(timer);
		  timer = null;
		  report(list.shift());
		}
	
		module.exports = report;
	
	/***/ },
	/* 84 */
	/***/ function(module, exports) {
	
		var publicApi = {
		  'isReady'                 : 'isReady',
		  'play'                    : 'setVideoPlay',
		  'pause'                   : 'setVideoPause',
		  'playNext'                : 'playNext',
		  'stop'                    : 'setVideoStop',
		  'mute'                    : 'setVideoMute',
		  'unMute'                  : 'setVideoUnMute',
		  'volumeUp'                : 'setVideoVolumeUp',
		  'volumeDown'              : 'setVideoVolumeDown',
		  'getVolume'               : 'getVideoVolume',
		  'setVolume'               : 'setVideoVolume',
		  'isMuted'                 : 'isVideoMuted',
		  'setPoster'               : 'setVideoPoster',
		  'getPoster'               : 'getVideoPoster',
		  'getDuration'             : 'getVideoDuration',
		  'getFileSize'             : 'getVideoFileSize',
		  'getCurrentTime'          : 'getVideoCurrentTime',
		  'getDefinition'           : 'getCurrentVideoDefinition',
		  'getDefinitionList'       : 'getVideoDefinitionList',
		  'setDefinition'           : 'setVideoDefinition',
		  'getVideoSize'            : 'getVideoWidthHeight',
		  'seekTo'                  : 'setVideoSeekTo',
		  'resize'                  : 'resize',
		  'autoResize'              : 'autoResize',
		  'getUserId'               : 'getUserId',
		  'getPlayerId'             : 'getPlayerId',
		  'isPlaying'               : 'isVideoPlaying',
		  'getVid'                  : 'getVid',
		  'setNextVid'              : 'setNextVid',
		  'getPlayerState'          : 'getPlayerState',
		  'isBrowserFullscreen'     : 'isBrowserFullscreen',
		  'isWindowFullscreen'      : 'isWindowFullscreen',
		  'enterBrowserFullscreen'  : 'enterBrowserFullscreen',
		  'enterWindowFullscreen'   : 'enterWindowFullscreen',
		  'exitWindowFullscreen'    : 'exitWindowFullscreen',
		  'exitBrowserFullscreen'   : 'exitBrowserFullscreen',
		  'toggleWindowFullScreen'  : 'toggleWindowFullScreen',
		  'toggleBrowserFullScreen' : 'toggleBrowserFullScreen',
		  'smallWindow'             : 'smallWindow',
		  'follow'                  : 'follow',
		  'cancelFollow'            : 'cancelFollow',
		  'isFollow'                : 'isFollow',
		  'resizeFlashForChrome'    : 'resizeFlashForChrome',
		  'getPlaybackRate'         : 'getPlaybackRate',
		  'setPlaybackRate'         : 'setPlaybackRate',
		  'destroy'                 : 'destroy',
		  'getPlayerType'           : 'getPlayerType',
		  'getVideoType'            : 'getVideoType',
		  'setNextEnable'           : 'setNextEnable',
		  'bulletSwitch'            : 'bulletSwitch',
		  'transferMyBullet'        : 'transferMyBullet',
		  'postBullet'              : 'postBullet',
		  'setSmallWindowMode'      : 'setSmallWindowMode',
		  'callPlayerExtendMethod'  : 'callPlayerExtendMethod'
		};
	
		var privateApi = {
		  // core frame
		  'reportError'     : 'reportError',
		  'reportUsrAction' : 'reportUsrAction',
		  'reportGetinfo'   : 'reportGetinfo',
	
		  // HD Player
		  'play'                                 : 'setPlay',
		  'setFocusVideoPlay'                    : 'setFocusVideoPlay',
		  'setFocusVideoPause'                   : 'setFocusVideoPause',
		  'getNextVideoMp4Url'                   : 'getNextVideoMp4Url',
		  'getNextVideoUrlByVid'                 : 'getNextVideoUrlByVid',
		  'isFocusVideoBufferComplete'           : 'isFocusVideoBufferComplete',
		  'setFocusVideoUrl'                     : 'setFocusVideoUrl',
		  'clearFocusVideoUrl'                   : 'clearFocusVideoUrl',
		  'setPreloadVideoUrl'                   : 'setPreloadVideoUrl',
		  'setPreloadVideoPlay'                  : 'setPreloadVideoPlay',
		  'isPreloadVideoUrlInsert'              : 'isPreloadVideoUrlInsert',
		  'setVideoUrl'                          : 'setVideoUrl',
		  'getCurrentPlayListType'               : 'getCurrentPlayListType',
		  'getFocusVideoCurrentTime'             : 'getFocusVideoCurrentTime',
		  'getFocusVideoDuration'                : 'getFocusVideoDuration',
		  'setFocusVideoCurrentTime'             : 'setFocusVideoCurrentTime',
		  'getFocusVideoWidthHeight'             : 'getFocusVideoWidthHeight',
		  'getPlayerConfig'                      : 'getPlayerConfig',
		  'isSkipPrelude'                        : 'isSkipPrelude',
		  'addUrls2Player'                       : 'addUrls2Player',
		  'lockAndPreloadNext'                   : 'lockAndPreloadNext',
		  'getVideoInfoData'                     : 'getVideoInfoData',
		  'clearPlaylist'                        : 'clearPlaylist',
		  'getPlayListIndex'                     : 'getPlayListIndex',
		  'isTheLastOfPlayList'                  : 'isTheLastOfPlayList',
		  'getVideosOriginData'                  : 'getVideosOriginData',
		  'getDefinitionFormat'                  : 'getDefinitionFormat',
		  'getRequestId'                         : 'getRequestId',
		  'calcTotalPlaylist'                    : 'calcTotalPlaylist',
		  'getFocusVideoBufferedTime'            : 'getFocusVideoBufferedTime',
		  'getBufferedTime'                      : 'getBufferedTime',
		  'setPreloadVideoKeepSpaceToFocusVideo' : 'setPreloadVideoKeepSpaceToFocusVideo',
		  'playTheNext'                          : 'playTheNext',
		  'destroyPlugin'                        : 'destroyPlugin',
		  'getConnectionPlayTime'                : 'getConnectionPlayTime',
		  'isVideoSeeking'                       : 'isVideoSeeking',
		  'isFocusVideoSeeking'                  : 'isFocusVideoSeeking',
	
		  // H5 Player
		  'videoRequestFullScreen':'videoRequestFullScreen',
	
		  // 广告相关
		  'loadingAdEnd'      : 'loadingAdEnd',
		  'isPlayingAd'       : 'isPlayingAd',
		  'getAdCurrentTime'  : 'getAdCurrentTime',
		  'getAdDuration'     : 'getAdDuration',
		  'getCurrentAdInfo'  : 'getCurrentAdInfo',
		  'isAdCanNotSkip'    : 'isAdCanNotSkip',
		  'pauseAd'           : 'pauseAd',
		  'playAd'            : 'playAd',
		  'requestLoadingAd'  : 'requestLoadingAd',
		  'requestPauseAd'    : 'requestPauseAd',
		  'hasLoadingAd'      : 'hasLoadingAd',
		  'getPlayAdJsonData' : 'getPlayAdJsonData',
		  'skipAd'            : 'skipAd',
		  'hidePlayAdUI'      : 'hidePlayAdUI',
	
		  // UI-控制栏
		  'hideUiControl'              : 'hideUiControl',
		  'hideUiTitle'                : 'hideUiTitle',
		  'hideUiFavorite'             : 'hideUiFavorite',
		  'showUiControl'              : 'showUiControl',
		  'showUiFavorite'             : 'showUiFavorite',
		  'updateVideoPreview'         : 'updateVideoPreview',
		  'showVideoPreview'           : 'showVideoPreview',
		  'hideVideoPreview'           : 'hideVideoPreview',
		  'hideUiTitle'                : 'hideUiTitle',
		  'showUiTitle'                : 'showUiTitle',
		  'disableHideControl'         : 'disableHideControl',
		  'showPlayerUiTools'          : 'showPlayerUiTools',
		  'hidePlayerUiTools'          : 'hidePlayerUiTools',
		  'togglePlayerUiTools'        : 'togglePlayerUiTools',
		  'showUiTips'                 : 'showUiTips',
		  'hideUiTips'                 : 'hideUiTips',
		  'getHistoryDefinition'       : 'getHistoryDefinition',
		  'showErrorUiTips'            : 'showErrorUiTips',
		  'openAtTencentVideo'         : 'openAtTencentVideo',
		  'disableShowControl'         : 'disableShowControl',
		  'hideUiSettingLayerOnMobile' : 'hideUiSettingLayerOnMobile',
		  'isControlShow'              : 'isControlShow',
	
		  // flash
		  'isFlashNeedResize'          : 'isFlashNeedResize',
		  'isUserOpenBullet'           : 'isUserOpenBullet',
		  'isServerOpenBullet'         : 'isServerOpenBullet',
		  'isShowBulletInput'          : 'isShowBulletInput',
		  'getBulletLikeNumber'        : 'getBulletLikeNumber',
		  'isBulletOpenDefault'        : 'isBulletOpenDefault',
		  'getFlashBulletSwitchStatus' : 'getFlashBulletSwitchStatus',
	
		  // Tizen
		  'getTizenTVApi':'getTizenTVApi'
	
		};
	
		var eventApi = {
		  // 播放相关
		  'onWrite'                 : 'write',
		  'onReady'                 : 'ready',
		  'onEnded'                 : 'ended',
		  'onPlaying'               : 'playing',
		  'onPlay'                  : 'play',
		  'onPause'                 : 'pause',
		  'onResume'                : 'resume',
		  'onError'                 : 'error',
		  'onWaiting'               : 'waiting',
		  'onVolumeChange'          : 'volumeChange',
		  'onTimeUpdate'            : 'timeupdate',
		  'onSectionCanplay'        : 'sectionCanplay',
		  'onSectionLoadstart'      : 'sectionLoadstart',
		  'onSectionSeeking'        : 'sectionSeeking',
		  'onSectionSeeked'         : 'sectionSeeked',
		  'onSectionPlay'           : 'sectionPlay',
		  'onSectionPlaying'        : 'sectionPlaying',
		  'onSectionWaiting'        : 'sectionWaiting',
		  'onSectionPause'          : 'sectionPause',
		  'onSectionTimeupdate'     : 'sectionTimeupdate',
		  'onSectionProgress'       : 'sectionProgress',
		  'onSectionEnded'          : 'sectionEnded',
		  'onSectionBufferEnd'      : 'sectionBufferEnd',
		  'onGetVideoUrlSuccess'    : 'getVideoUrlSuccess',
		  'onGetVideoUrlFail'       : 'getVideoUrlFail',
		  'onPlayStateChange'       : 'playStateChange',
		  'onDefinitionChange'      : 'definitionChange',
		  'onVidChange'             : 'vidChange',
		  'onSetDefinitionStart'    : 'setDefinitionStart',
		  'onSetDefinitionDone'     : 'onSetDefinitionDone',
		  'onSetDefinitionFail'     : 'setDefinitionFail',
		  'onPreloadListChange'     : 'preloadListChange',
		  'onGetinfoStart'          : 'getinfoStart',
		  'onGetinfoEnded'          : 'getinfoEnded',
		  'onGetvkeyEnded'          : 'getvkeyEnded',
		  'onGetvkeyStart'          : 'getvkeyStart',
		  'onSeekStart'             : 'seekStart',
		  'onSeekEnded'             : 'seekEnded',
		  'onPlayStart'             : 'playStart',
		  'onUserPausePlayer'       : 'userPausePlayer',
		  'onNetworkBadStart'       : 'networkBadStart',
		  'onNetworkBadEnd'         : 'networkBadEnd',
		  'onPlaybackRateChange'    : 'playbackRateChange',
		  'onVideoInterruptByError' : 'videoInterruptByError',
		  'beforeVideoPlay'         : 'beforeVideoPlay',
	
		  // 广告相关
		  'onLoadingAdDataReady'    : 'loadingAdDataReady',
		  'onEndingAdDataReady'     : 'endingAdDataReady',
		  'onPauseAdDataReady'      : 'pauseAdDataReady',
		  'onLoadingadIsEmpty'      : 'loadingadIsEmpty',
		  'onInsertAdDataReady'     : 'insertAdDataReady',
		  'onInsertAdEnded'         : 'insertAdEnded',
		  'onInsertAdStart'         : 'insertAdStart',
		  'onLoadingAdEnded'        : 'loadingAdEnded',
		  'onLoadingAdStart'        : 'loadingAdStart',
		  'onLoadingAdRequestError' : 'onLoadingAdRequestError',
		  'onLoadingAdPlayError'    : 'onLoadingAdPlayError',
		  'onOpenAdLink'            : 'openAdLink',
		  'onPuaseAdShow'           : 'puaseAdShow',
		  'onAdStart'               : 'adStart',
		  'onAdEnd'                 : 'adEnd',
	
		  // UI相关
		  'onToggleSideBar'           : 'toggleSideBarBtnClick',
		  'onWindowFullscreenChange'  : 'windowFullscreenChange',
		  'onBrowserFullscreenChange' : 'browserFullscreenChange',
		  'onFollow'                  : 'userDoFollow',
		  'onCancelFollow'            : 'userCancelFollow',
		  'onClickCloseLight'         : 'clickCloseLight',
		  'onBeforePlayNext'          : 'beforePlayNext',
		  'showUIVipGuide'            : 'showUIVipGuide',
		  'onToggleHotBarrage'        : 'toggleHotBarrage',
		  'onShowLogin'               : 'showLogin',
		  'onAfterLogin'              : 'afterLogin',
		  'onAfterLogout'             : 'afterLogout',
	
		  // Tizen
		  'onTizenLoadingAdEnded' : 'tizenLoadingAdEnded',
		  'onTizenLoadingIsEmpty' : 'tizenLoadingIsEmpty',
		  'onTizenLoadingOnError' : 'tizenLoadingOnError',
	
		  // Flash
		  'onBulletReady'                 : 'bulletReady',
		  'onBulletLikeNumberUpdate'      : 'bulletLikeNumberUpdate',
		  'onFlashBulletSwitchStatusChange' : 'flashBulletSwitchStatusChange'
		};
	
		// 检查EventName是否重复
		var tmp = {},key, showError = function(msg){
		  if (window.Txplayer && Txplayer.util && Txplayer.util.error) Txplayer.error(msg);
		  else throw msg;
		}
		for (key in publicApi) {
		  if ( tmp.hasOwnProperty(publicApi[key]) ) showError('EventName is already exist:' + publicApi[key]);
		  tmp[publicApi[key]] = null;
		}
		for (key in privateApi) {
		  if ( tmp.hasOwnProperty(privateApi[key]) ) showError('EventName is already exist:' + privateApi[key]);
		  tmp[privateApi[key]] = null;
		}
		for (key in eventApi) {
		  if ( tmp.hasOwnProperty(eventApi[key]) ) showError('EventName is already exist:' + eventApi[key]);
		  tmp[eventApi[key]] = null;
		}
		tmp = showError = null;
	
		module.exports = {
		  publicApi: publicApi,
		  privateApi: privateApi,
		  eventApi: eventApi
		};
	
	/***/ },
	/* 85 */
	/***/ function(module, exports) {
	
		/**
		 * @fileOverview 统一播放器全局工具函数
		 * @author zoborzhang
		 */
	
		/**
		 * @constructor
		 * @type {Object}
		 */
		var dataset = {};
		var util = {
		  /**
		   * 抛出错误
		   * @param  {String} msg 消息内容
		   * @return {Object}     Error对象
		   */
		  error: function(msg) {
		    if (!window.console) return;
		    if (!window.console.error) return;
		    try{
		      throw msg;
		    }catch(e){
		      window.console.error(msg);
		    }
		  },
		  log: function(){
		    if (!window.console) return;
		    if (!window.console.log) return;
		    if (Txplayer && Txplayer.dataset && Txplayer.dataset.debug && window.console.log.apply){
		      window.console.log.apply(window.console, arguments);
		    }
		  },
		  showInfo: function(info, data){
		    if (!window.console) return;
		    if (!window.console.log) return;
		    if (typeof data ==='object') data = JSON.stringify(data);
		    util.log('%c'+info+': %c \t\t'+data,'background: gray;color:#fff;', 'color:green;');
		  },
		  showError: function(info, data){
		    if (!window.console) return;
		    if (!window.console.log) return;
		    util.log('%c'+info+': %c '+data,'background: red;color:#fff;', 'color: red;');
		  },
		  cookie: {
		    /**
		     * 设置一个cookie
		     * @param {String} name   cookie名称
		     * @param {String} value  cookie值
		     * @param {String} domain 所在域名 默认为window.location.host的值
		     * @param {String} path   所在路径 默认为是"\"
		     * @param {Number} hour   存活时间，单位:小时
		     * @return {Boolean} 是否成功
		     */
		    set: function(name, value, domain, path, hour) {
		      if (hour) {
		        var today = new Date();
		        var expire = new Date();
		        expire.setTime(today.getTime() + 3600000 * hour);
		      }
		      document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + window.location.host + ";"));
		      return true;
		    },
	
		    /**
		     * 获取指定名称的cookie值
		     * @param {String} name cookie名称
		     * @return {String} 获取到的cookie值
		     */
		    get: function(name) {
		      var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
		      var m = document.cookie.match(r);
		      return (!m ? "" : m[1]);
		    },
	
		    /**
		     * 删除指定cookie,复写为过期
		     *
		     * @param {String} name cookie名称
		     * @param {String} domain 所在域 默认为 window.location.host的值
		     * @param {String} path 所在路径 默认为是"\"
		     */
		    del: function(name, domain, path) {
		      var exp = new Date();
		      exp.setTime(exp.getTime() - 1);
		      document.cookie = name + "=; expires=" + exp.toGMTString() + ";" + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + window.location.host + ";"));
		    }
		  },
		  /**
		   * 对象数据转换成字符串
		   * @param  {Object} obj 数据对象
		   * @return {String}     转换的结果
		   */
		  object2string: function(obj, combine) {
		    combine = typeof combine !== 'undefined' ? combine : '&';
		    var data = [];
		    for (var i in obj) {
		      data.push(i + '=' + obj[i]);
		    }
		    return data.join(combine);
		  },
		  /**
		   * url后面追加参数
		   * @param  {String} url url
		   * @param  {Object} obj 参数对象
		   * @return {String}     拼接后的url
		   */
		  appendParamsToUrl: function(url, obj) {
		    if (url.indexOf('?') > -1) {
		      url += '&' + util.object2string(obj);
		    } else {
		      url += '?' + util.object2string(obj);
		    }
		    return url;
		  },
		  removeUrlParams: function(url){
		    if (typeof url!=='string') return;
		    var link = document.createElement('a');
		    link.href = url;
		    return link.protocol + '//' + link.host + link.pathname;
		  },
		  /**
		   * 通过url加载css
		   * @param  {String} url css地址
		   */
		  loadCss: function(url) {
		    var defer = Txplayer.$.Deferred();
		    var tryTimes = 1, hasLoadCss = false;
		    // 加载css，如果失败在重试2次
		    var requestCss = function(cssUrl){
		      var style = document.createElement('link');
		      style.rel = 'stylesheet';
		      style.type = 'text/css';
		      style.onload = function(){
		        defer.resolve();
		      };
		      style.onerror = function(){
		        if (tryTimes>=3){
		          defer.reject();
		          return;
		        }
		        tryTimes++;
		        style.parentNode.removeChild(style);
		        var config = {};
		        config['__t' + tryTimes] = +new Date();
		        requestCss( util.appendParamsToUrl(cssUrl, config) );
		      };
		      style.href = cssUrl;
		      document.head.appendChild(style);
		    };
		    var cssRealUrl = util.removeUrlParams(url);
		    Txplayer.$('link[rel="stylesheet"]').each(function(idx, item){
		      var href = item.href;
		      if (href && href.indexOf(cssRealUrl)>-1) {
		        hasLoadCss = true;
		        return false;
		      }
		    });
		    if (!hasLoadCss){
		      url = util.appendParamsToUrl(url, {
		        '_': (window.Txplayer&&Txplayer.dataset.ts) || (+new Date())
		      });
		      requestCss(url);
		    }else{
		      defer.resolve();
		    }
		    return defer;
		  },
		  /**
		   * 获取点播默认封面图
		   * @param {String} vid 点播视频vid
		   */
		  getDefaultPosterByVid: function(vid) {
		    var sizeArr = ['496_280'],
		      url = 'http://shp.qpic.cn/qqvideo_ori/0/{vid}_{index}/0';
		    return url.replace('{vid}', vid).replace('{index}', sizeArr[0]);
		  },
		  /**
		   * 获取直播默认封面图
		   */
		  loadScript: function(src) {
		    var script = document.createElement('script'),
		      head = document.getElementsByTagName("head")[0],
		      READY_STATE_RE = /^(?:loaded|complete|undefined)$/;
		    var defer;
	
		    if (!src) return;
		    if (Txplayer.dataset.loadScriptDefer[src]){
		      return Txplayer.dataset.loadScriptDefer[src];
		    }
		    defer = Txplayer.$.Deferred();
		    Txplayer.dataset.loadScriptDefer[src] = defer;
	
		    script.async = "async";
		    script.src = src;
		    script.charset = 'utf-8';
		    script.setAttribute('crossorigin','');
		    script.onload = script.onerror = script.onreadystatechange = function() {
		      if (READY_STATE_RE.test(script.readyState)) {
		        // Ensure only run once and handle memory leak in IE
		        script.onload = script.onerror = script.onreadystatechange = null;
		        // Dereference the script
		        script = null;
		        defer.resolve();
		      }
		    };
		    script.onerror = function() {
		      script.onload = script.onerror = script.onreadystatechange = null;
		      script = null;
		      defer.reject();
		    };
		    head.appendChild(script);
		    return defer;
		  },
		  getFlashVersion: function(){
		    var vflash = Txplayer.dataset.flashVersion;
		    if (vflash != "0.0.0") {
		      return vflash;
		    }
		    var swf = null,
		      ab = null,
		      ag = [],
		      S = "Shockwave Flash",
		      t = navigator,
		      q = "application/x-shockwave-flash";
		    if (!!Txplayer.util.browser.ie) {
		      try {
		        swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		        if (swf) {
		          ab = swf.GetVariable("$version");
		          if (ab) {
		            ab = ab.split(" ")[1].split(",");
		            ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)];
		          }
		        }
		      } catch (err) {}
		    } else if (typeof t.plugins!=='undefined' && typeof t.plugins[S] == "object") {
		      ab = t.plugins[S].description;
		      if (ab && !(typeof t.mimeTypes==='undefined' && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
		        ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
		        ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
		        ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
		        ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
		      }
		    }
		    vflash = ag.join(".");
		    return vflash;
		  },
		  /**
		   * 对比版本号
		   * @param  {String} n
		   * @param  {String} k
		   * @return {Number}   1:n>k, 0:n=k, -1:n<k
		   */
		  compareVersion: function(n, k) {
		    n = String(n).split(".");
		    k = String(k).split(".");
		    try {
		      for (var o = 0, j = Math.max(n.length, k.length); o < j; o++) {
		        var m = isFinite(n[o]) && Number(n[o]) || 0,
		          p = isFinite(k[o]) && Number(k[o]) || 0;
		        if (m < p) {
		          return -1;
		        } else {
		          if (m > p) {
		            return 1;
		          }
		        }
		      }
		    } catch (q) {
		      return -1;
		    }
		    return 0;
		  },
		  /**
		   * 判断Flash是否合适
		   * @return {Boolean}
		   */
		  isFlashFit: function(){
		    if (this.compareVersion(this.getFlashVersion(), '10.0')>-1) {
		      return true;
		    }
		    return false;
		  },
		  getJsonpCallbackName: function(cgiName){
		    return [
		      'txplayerJsonpCallBack',
		      cgiName,
		      parseInt(Math.random()*1000000)
		    ].join('_');
		  },
		  getStdfrom: function(){
		    var isInews = location.hostname === 'view.inews.qq.com';
		    var isCaixin = location.hostname.indexOf('caixin.com')>-1;
		    if ( isCaixin ) {
		      return 'v1093';
		    }
		    if (Txplayer.util.os.iphone || Txplayer.util.os.ipod) {
		      return isInews ? "v3110" : "v3010";
		    }
	
		    if (Txplayer.util.os.ipad) {
		      return isInews ? "v4110" : "v4010";
		    }
		    if (Txplayer.util.os.android) {
		      if (Txplayer.util.os.tablet) {
		        return "v6010";
		      }
		      return isInews ? "v5110" : "v5010";
		    }
		    if (Txplayer.util.browser.IEMobile) {
		      return "v7010";
		    }
		    return "v1010";
		  },
		  getDeviceId: function(){
		    var ua = navigator.userAgent;
		    if (util.os.ipad) return 1;
		    if (util.os.windows) {
		      //windows pad userAgent like this: Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; Touch)
		      if (/Touch/i.test(ua)) return 8;
		      //windows phone userAgent like this:
		      //Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)
		      if (/Phone/i.test(ua)) return 7;
		      return 2;
		    }
		    if (util.os.android) {
		      if (!util.mobile) return 5;
		      return 3;
		    }
		    if (util.os.iphone) return 4;
		    if (util.os.mac) return 9;
	
		    //未知设备
		    return 10;
		  },
		  getBusinessId: function(){
		    //任何页面只要是在微信里打开，都算到微信的头上
		    if ( !! util.browser.wechat) {
		      return 6;
		    }
	
		    if ( !! util.browser.mqq) {
		      return 17;
		    }
	
		    var host = "";
		    //如果是使用的统一播放器iframe版本，则需要获取顶部的url，由于可能跨域所以从referrer里取
		    //被iframe的页面的referrer是其父页面的url
		    if (document.location.href.indexOf("http://v.qq.com/iframe/") >= 0 && window != top) {
		      var l = document.referrer;
		      if (l !== "") {
		        var link = document.createElement("a");
		        link.href = l;
		        host = link.hostname;
		        link = null;
		      }
		    }
		    if (host === "") {
		      host = document.location.hostname || document.location.host;
		    }
		    var keys = [{
		        r: /(\w+\.)?weixin\.qq\.com$/i,
		        v: 6
		      },
		      //腾讯视频
		      {
		        r: /^(v|film)\.qq\.com$/i,
		        v: 1
		      },
		      //腾讯新闻
		      {
		        r: /^news\.qq\.com$/i,
		        v: 2
		      },
		      //Qzone
		      {
		        r: /(\w+\.)?qzone\.qq\.com$/i,
		        v: 3
		      },
		      //腾讯微博
		      {
		        r: /(\w+\.)?t\.qq\.com$/i,
		        v: 5
		      },
		      //3g.v.qq.com
		      {
		        r: /^3g\.v\.qq\.com$/i,
		        v: 8
		      },
		      //m.v.qq.com
		      {
		        r: /^m\.v\.qq\.com$/i,
		        v: 10
		      },
		      //*.3g.qq.com
		      {
		        r: /3g\.qq\.com$/i,
		        v: 12
		      }
		    ];
		    host = host.toLowerCase();
		    for (var i = 0, len = keys.length; i < len; i++) {
		      var key = keys[i];
		      if (key.r.test(host)) {
		        return key.v;
		      }
		    }
		    return 7; //7表示其他，固定值
		  },
		  getPlatform: function() {
		    //编号方式  业务编号×10000+设备编号×100+播放方式
		    var bussId = util.getBusinessId(),
		      deviceId = util.getDeviceId();
		    return bussId * 10000 + deviceId * 100 + 1; //播放方式 1表示HTML5，写死
		  },
		  isQQBuLuoHost: function(){
		    if( Txplayer.util.browser.MQQClient &&
		        ( window.location.hostname==='xiaoqu.qq.com' || window.location.hostname==='buluo.qq.com')
		    ){
		      return true;
		    }
		    return false;
		  },
		  /**
		   * 获取手机上视频的视频截图
		   * @param  {String} vid
		   * @param  {Number} index 0,1,2
		   * @return {String}       视频截图url
		   */
		  getMobileVideoPosterByVid: function(vid,index){
		    index = index || 2;
		    var sizeArr = ['496_280', '360_204', '228_128'],
		      url = '//shp.qpic.cn/qqvideo_ori/0/{vid}_{index}/0';
		    if (index >= sizeArr.length) index = sizeArr.length-1;
		    return url.replace('{vid}',vid).replace('{index}',sizeArr[index]);
		  },
		  /**
		   * 获取PC上视频的视频截图
		   * @param  {String} vid
		   * @param  {String} type .png|.jpg
		   * @return {String}      视频截图url
		   */
		  getPcVideoPosterByVid: function(vid, type){
		    type = type || '.png';
		    if(!vid) return "";
		    var url = "//vpic.video.qq.com/" + get_vpic_hash(vid) + "/" + vid + type;
		    function get_vpic_hash(vid){
		      var hash_bucket = 10000 * 10000;
		      var tot = 0;
		      for (var i = 0; i < vid.length; i++) tot = (tot << 5) + tot + vid.charCodeAt(i);
		      return tot % hash_bucket;
		    }
		    return url;
		  },
		  getHostNameByUrl: function(url){
		    url = url || location.href;
		    var a = document.createElement('a');
		    a.href = url;
		    return a.hostname;
		  },
		  getQQFromCookie: function(){
		    var uin = util.cookie.get('luin') || util.cookie.get('uin');
		    if (uin) uin = uin.replace(/\D/g, '');
		    return uin;
		  },
		  createGUID: function(len) {
		    len = len || 32;
		    var guid = "";
		    for (var i = 1; i <= len; i++) {
		      var n = Math.floor(Math.random() * 16.0).toString(16);
		      guid += n;
		    }
		    return guid;
		  },
		  filterXSS: function(str) {
		    if (typeof str !== 'string')
		      return str;
		    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;");
		  },
		  getData: function(name) {
		    if (window.localStorage) {
		      return window.localStorage[name];
		    }
		  },
		  setData: function(name, value) {
		    if (window.localStorage) {
		      window.localStorage[name] = value;
		      return true;
		    }
		  },
		  delData: function(name) {
		    if (window.localStorage) {
		      window.localStorage.removeItem(name);
		      return true;
		    }
		  },
		  isSupportM3u8: function(){
		    var video = document.createElement("video");
		    var list = [
		      'application/x-mpegURL',
		      'audio/mpegurl',
		      'vnd.apple.mpegURL',
		      'application/vnd.apple.mpegURL'
		    ];
		    var rs = false;
		    if (typeof video.canPlayType == "function") {
		      for(var i =0, len = list.length; i<len; i++){
		        if (video.canPlayType( list[i] )) {
		          rs = true;
		          break;
		        }
		      }
		    }
		    video = null;
		    return rs;
		  },
		  isSupportMP4: function() {
		    var video = document.createElement("video");
		    if (typeof video.canPlayType == "function") {
		      //MP4
		      if (video.canPlayType('video/mp4; codecs="mp4v.20.8"') == "probably") {
		        return true;
		      }
		      //H.264
		      if (video.canPlayType('video/mp4; codecs="avc1.42E01E"') == "probably" || video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') == "probably") {
		        return true;
		      }
		    }
		    return false;
		  },
		  isSupportSVG: function() {
		    if (!document.implementation || !Txplayer.$.isFunction(document.implementation.hasFeature)) {
		      return false;
		    }
		    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
		  },
		  isSupportMute: function(){
		    if (Txplayer.util.os) return false;
		    if (Txplayer.util.mobile) return false;
		    return true;
		  },
		  getDomNodeOffsetInPage: function(elm){
		    var x = elm.offsetLeft, y = elm.offsetTop, p = elm.offsetParent;
		    while (p !== null) {
		      x += p.offsetLeft;
		      y += p.offsetTop;
		      p = p.offsetParent;
		    }
		    return {x: x,y: y};
		  },
		  whenWechatIsReady: function(options){
		    var defer = Txplayer.$.Deferred(), timeout = options.timeout || 5000;
		    if (!Txplayer.ua.browser.wechat) {
		    }else if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.on) {
		      defer.resolve();
		    } else {
		      document.addEventListener('WeixinJSBridgeReady', function() {
		        defer.resolve();
		      });
		      setTimeout(function(){
		        defer.reject();
		      }, timeout);
		    }
		    return defer;
		  },
		  getMainHostName: function() {
		    var _host = window.location.hostname || window.location.host,
		      _sarray = location.host.split(".");
		    if (_sarray.length > 1) {
		      _host = _sarray.slice(_sarray.length - 2).join(".");
		    }
		    return _host;
		  },
		  getUrlParam: function(p, u) {
		    u = u || document.location.toString();
		    var reg = new RegExp("(^|&|\\\\?)" + p + "=([^&]*)(&|$|#)"),
		      r = null;
		    r = u.match(reg);
		    if (r) {
		      return r[2];
		    }
		    return "";
		  },
		  getAdChannelId: function(){
		    var chid = '';
		    if((/(.*\.)3g\.qq\.com$/i).test(document.location.hostname)) chid = 13;
		    else if(document.location.hostname==='v.qq.com' || util.browser.qqlive) chid=0;
		    else if(util.browser.wechat) chid=3;
		    else if(util.browser.mqq) chid=10;
		    else if(util.browser.qqnews) chid=2;
		    return chid;
		  },
		  insert2Array: function(list, index, arr){
		    if (index>=arr.length) return arr;
		    var m = arr.slice(0,index), n = arr.slice(index, arr.length);
		    var c = [];
		    c=c.concat(m,list,n);
		    return c;
		  },
		  formatPlayTime: function(time){
		    if (typeof time==='string') time = parseInt(time);
		    if (typeof time!=='number') return;
		    time = parseInt(time);
		    var h, m ,s;
		    var formatZero = function(num){
		      if (num<10) return '0' + num;
		      else return num;
		    };
		    h = parseInt(time/3600);
		    m = parseInt( (time - h*3600)/60 );
		    s = parseInt( time - h*3600 - m*60 );
		    if (h===0) {
		      return [formatZero(m),formatZero(s)].join(':');
		    }else{
		      return [h,formatZero(m),formatZero(s)].join(':');
		    }
		  },
		  dateFormat: function(fmt, time){
		    time = time || new Date();
		    fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
		    var o = {
		      "M+": time.getMonth() + 1, //月份
		      "d+": time.getDate(), //日
		      "h+": time.getHours(), //小时
		      "m+": time.getMinutes(), //分
		      "s+": time.getSeconds(), //秒
		      "q+": Math.floor((time.getMonth() + 3) / 3), //季度
		      "S": time.getMilliseconds() //毫秒
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		  },
		  isTencentDomain: function(domain){
		    domain = domain || document.domain;
		    if (domain==='qq.com') return true;
		    var arr = domain.split('.');
		    if ( !(arr && arr.length>2) ) return false;
		    if ( arr[arr.length-2] === 'qq' && arr[arr.length-1]==='com') return true;
		    else return false;
		  },
		  loadPlugins: function(plugins, context, settings, callback){
		    settings = settings || {};
		    callback = callback || function(){};
		    if (Txplayer.$.type(plugins)!=='array') {
		      util.showError('loadPlugins error', 'plugins的参数应该是数组');
		      return;
		    }
		    if (!context) {
		      util.showError('loadPlugins error', 'context是必要参数');
		      return;
		    }
		    var _plugins = plugins.slice(0);
		    var that = this;
		    var defer;
		    loadPluginsOneByOne();
		    // 按顺序加载插件
		    function loadPluginsOneByOne () {
		      if (_plugins.length===0) {
		        callback();
		        return;
		      }
		      var plugin = _plugins.shift(), url, pluginName, retryTimes = 0;
		      pluginName = plugin;
		      if (settings && settings.hasOwnProperty(pluginName) && settings[pluginName].url){
		        url = settings[pluginName].url;
		      }
		      if (!url) {
		        url = Txplayer.dataset.jsBasePath + 'plugins/' + pluginName.toLowerCase() + '.js';
		      }
		      // 如果插件已经加载，就可以直接初始化了
		      if (Txplayer.plugins.hasOwnProperty(pluginName)) {
		        execPluginSync(pluginName);
		      }else{
		        loadScriptAndExcute();
		      }
		      // 加载并初始化插件
		      function loadScriptAndExcute(){
		        var onSuccess = function(){
		          execPluginSync(pluginName);
		        };
		        var onFail = function(){
		          // 失败了就重试一次吧
		          if (retryTimes>=1) {
		            util.showError('plugin load failed', url);
		            loadPluginsOneByOne();
		            return;
		          }
		          retryTimes ++;
		          loadScriptAndExcute();
		        };
		        // 加载插件并初始化
		        if (url.indexOf('?')>-1){
		          url += '&_ts=' + Txplayer.dataset.ts;
		        }else{
		          url += '?_ts=' + Txplayer.dataset.ts;
		        }
		        // util.loadScript(url, onSuccess, onFail);
		        util.loadScript(url).done(onSuccess).fail(onFail);
		      }
		    }
	
		    // 等插件初始化完成，再去加载下一个
		    function execPluginSync(pluginName){
		      defer = pluginExcute(pluginName);
		      if (defer && defer.done && defer.fail){
		        defer.done(function(){
		          loadPluginsOneByOne();
		        });
		      }else{
		        loadPluginsOneByOne();
		      }
		    }
	
		    // 插件初始化
		    function pluginExcute(pluginName) {
		      var msg, errMsg;
		      if (!Txplayer.plugins.hasOwnProperty(pluginName)) return false;
		      if (settings[pluginName]) {
		        context.pluginConfig = settings[pluginName];
		      }else{
		        context.pluginConfig = {};
		      }
		      // util.showInfo('插件初始化', pluginName);
		      try{
		        that['_' + pluginName] = new Txplayer.plugins[pluginName](context);
		      }catch(e){
		        errMsg = e.message;
		        util.showError('JS有异常:' + pluginName , errMsg);
		        util.log(e.stack);
		        msg = context.superMsg || context.msg;
		        msg.broadcast &&
		        msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		          msg: errMsg,
		          code: '3000',
		          stack: e.stack
		        });
		      }
		      // 销毁机制
		      if ('HtmlFrame'!==pluginName){
		        (function(pluginInstance, pluginName, player){
		          if (!pluginInstance) return;
		          pluginInstance.addDestroyToPlugin = function(){
		            var eventMsg = this.context.superMsg || this.context.msg;
		            eventMsg.on(Txplayer.apiList.privateApi.destroyPlugin, function(data, options){
		              if (data && data!==pluginName) return;
		              // 清理html
		              if (Txplayer.$.type(pluginInstance.remove)==='function'){
		                pluginInstance.remove();
		              }
		              // 清理内部消息
		              if (pluginInstance &&
		                pluginInstance.dataset &&
		                (pluginInstance.dataset.mudoleApis ||
		                 pluginInstance.dataset.privateApis ||
		                 pluginInstance.dataset.eventsList)
		              ){
		                pluginInstance.dataset.mudoleApis && Txplayer.$.each(pluginInstance.dataset.mudoleApis, function(key, fn){
		                  eventMsg.off(key);
		                });
		                pluginInstance.dataset.privateApis && Txplayer.$.each(pluginInstance.dataset.privateApis, function(key, fn){
		                  eventMsg.off(key);
		                });
		                pluginInstance.dataset.eventsList && Txplayer.$.each(pluginInstance.dataset.eventsList, function(key, fn){
		                  eventMsg.off(key);
		                });
		              }
		              // 清理定时器
		              if (pluginInstance && pluginInstance.dataset){
		                Txplayer.$.each(pluginInstance.dataset, function(key, val){
		                  if ( !(/_TIMER/.test(key) && val) ) return;
		                  clearInterval(val);
		                  clearTimeout(val);
		                });
		              }
		              // 清理子对象
		              Txplayer.$.each(pluginInstance, function(idx, val){
		                val = null;
		              });
		              // 清理插件引用
		              player[pluginName] = null;
		              delete player[pluginName];
		            });
		          };
		          pluginInstance.addDestroyToPlugin();
		        })(that['_' + pluginName], pluginName, that);
		      }
		      return that['_' + pluginName];
		    }
		  },
		  getUniqueMsgKey: function(key){
		    return key + '.' + util.createGUID();
		  },
		  /**
		   * 根据skey计算出hashcode
		   *
		   * @param {string}
		   *          skey
		   * @return {string}
		   */
		  time33: function(skey) {
		    // 哈希time33算法
		    for (var i = 0, len = skey.length, hash = 5381; i < len; ++i) {
		      hash += (hash << 5) + skey.charAt(i).charCodeAt();
		    };
		    return hash & 0x7fffffff;
		  },
		  /**
		   * 获取CSRF 的 token
		   *
		   * @return {String}
		   */
		  getToken: function() {
		    var skey = Txplayer.$.trim(util.cookie.get("skey")) || Txplayer.$.trim(util.cookie.get("lskey")),
		      token = !!skey ? util.time33(skey) : "";
		    return token;
		  },
		  getWXToken: function() {
		    var vu = Txplayer.$.trim(util.cookie.get("vusession")),
		      token = !!vu ? util.time33(vu) : "";
		    return token;
		  }
		};
		module.exports = util;
	
	/***/ },
	/* 86 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * @fileOverview 统一播放器默认配置
		 * @author zoborzhang
		 */
		/**
		 * @constructor
		 * @type {Object}
		 */
		var util = __webpack_require__(85);
		var defaultConfig = {
		  /**
		   * 正片是否自动播放
		   * @type {Boolean}
		   */
		  autoplay: false,
		  /**
		   * 播放器类型
		   * @type {String}
		   */
		  playerType: '',
		  /**
		   * 视频类型
		   * @type {String} vod:点播，live:直播
		   */
		  videoType: 'vod',
		  /**
		   * 点播视频ID
		   * @type {String}
		   */
		  vid: '',
		  /**
		   * 点播视频专辑ID
		   * @type {String}
		   */
		  coverId: '',
		  /**
		   * 播放器DOM容器id
		   * @type {String}
		   */
		  containerId: '',
		  /**
		   * 播放器的宽度
		   * @type {String}
		   */
		  width: '0',
		  /**
		   * 播放器的高度
		   * @type {String}
		   */
		  height: '0',
		  /**
		   * 是否显示封面图
		   * @type {Boolean}
		   */
		  showPoster: true,
		  /**
		   * 默认清晰度
		   * @type {String}
		   */
		  defaultDefinition: '',
		  /**
		   * 是否用小窗口播放
		   * @type {Boolean}
		   */
		  isUseWebkitPlayinline: true,
		  /**
		   * 是否开启aireplay
		   * @type {Boolean}
		   */
		  isUseWebkitAirplay: true,
		  /**
		   * 是否可以跨域
		   * @type {Boolean}
		   */
		  isUseWebkitCrossOrigin: false,
		  /**
		   * 是否开启预加载
		   * @type {Boolean}
		   */
		  isUseWebkitPreload: false,
		  /**
		   * 是否使用webview video的原生控制栏
		   * @type {Boolean}
		   */
		  isUseWebkitControl: false,
		  /**
		   * 是否开启Html5皮肤
		   * @type {Boolean}
		   */
		  isUseHtml5UI: true,
		  /**
		   * 是否初始化时静音
		   * @type {Boolean}
		   */
		  muted: false,
		  volume: 100,
		  loop: false,
		  settings: {
		    UiControl: {
		      subPlugins: (function(){
		        var list = [];
		        if (util.mobile) {
		          list = ['UiProgress', 'UiControlPlay', 'UiPlayNext', 'UiShowTime', 'UiSettings', 'UiToggleSidebar', 'UiBrowserFullScreen', 'UiWindowFullScreen', 'UiLogo'];
		        }else{
		          list = ['UiProgress', 'UiControlPlay', 'UiPlayNext', 'UiShowTime', 'UiVolume', 'UiDefinition', 'UiSettings', 'UiToggleSidebar', 'UiBrowserFullScreen', 'UiWindowFullScreen', 'UiLogo'];
		        }
		        return list;
		      })()
		    },
		    UiSettings:{},
		    HdPlayer: {
		      'subPlugins': ['UiShadow']
		    },
		    H5Player: {
		      'subPlugins': ['UiShadow']
		    },
		    TizenLoadingAd: {
		      url: 'http://ra.gtimg.com/tv/samsung/tizenloadingad.js'
		    }
		  },
		  isNeedPay: false,
		  loadingadAutoplay: true,
		  hdloadingadAutoplay: true,
		  autoplayAfterHdLoadingad: true,
		  playStartTime: 0,
		  skipPrelude: true,
		  useConnectionPlay: false,
		  connectionPlayTime: 0,
		  // 播放中是否显示进度条
		  hideControlOnPlaying: true,
		  otherVideoLink: 'http://v.qq.com/',
		  useComboService: true,
		  showLogo: location.hostname!=='v.qq.com',
		  showTitle: location.hostname!=='v.qq.com',
		  showToggleSideBar: false,
		  // flash config
		  flashWmode: 'window',
		  showBrowserFullScreen: false,
		  showSettings: true,
		  showShare: true,
		  showCloseLight: false,
		  showSmallWindowButton: false,
		  showBullet: false,
		  bulletId: '',
		  showImageBullet: false,
		  // 是否显示弹幕输入
		  showBulletInput: true,
		  showFlashBulletInput: false,
		  openBulletDefault: true
		};
	
		module.exports = defaultConfig;
	
	/***/ },
	/* 87 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * @fileOverview 数据集,用于当前播放器内部的一些全局变量存储
		 */
		/**
		 * @constructor
		 * @type {Object}
		 */
	
		var util = __webpack_require__(85);
		var dataset = {
		  /**
		   * 全局播放器实例索引ID, 新建播放器就+1
		   * @type {Number}
		   */
		  maxId: 0,
		  /**
		   * 存储获取播放器在线配置请求的状态
		   * @type {Object}
		   */
		  deferGetPlayerScript: {},
		  /**
		   * 隐藏dom节点的css class
		   * @type {String}
		   */
		  hideClass: 'txp_none',
		  /**
		   * js api 根目录
		   * @type {String}
		   */
		  jsBasePath: '//vm.gtimg.cn/tencentvideo/txp/js/',
		  /**
		   * 浏览器的flash版本号
		   * @type {String}
		   */
		  flashVersion: '0.0.0',
		  /**
		   * flash直播swf地址
		   * @type {String}
		   */
		  flashLiveSwf: '//imgcache.qq.com/minivideo_v1/vd/res/TencentPlayerLive.swf?max_age=86400',
		  /**
		   * flash点播swf地址
		   * @type {String}
		   */
		  flashVodSwf: (function(){
		    if (location.hostname==='v.qq.com'){
		      return '//imgcache.qq.com/tencentvideo_v1/playerv3/TencentPlayer.swf?max_age=86400';
		    }
		    return '//imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400';
		  })(),
		  /**
		   * 播放器实例对象
		   * @type {Object}
		   */
		  _instance: {},
		  documentWebSite: 'http://tvp.oa.com/',
		  jsApiReady: 'TxPlayerJSBrageReady',
		  tabindex: 1,
		  // h5播放器css样式对应文件路径
		  H5PlayerStyleUrl: {
		    ipadh5: '//vm.gtimg.cn/tencentvideo/txp/style/txp_pad.css',
		    html5hd: '//vm.gtimg.cn/tencentvideo/txp/style/txp_desktop.css'
		  },
		  // 合并服务
		  comboServiceRule: '//vm.gtimg.cn/c/=',
		  // 点击事件名
		  clickEventName: (function(){
		    return 'click';
		    if (util.mobile) return 'touchend';
		  })(),
		  // 加载js回调对象哈希表
		  loadScriptDefer: {},
		  // 切换清晰度超时数据
		  switchDefinitionTimeout: 0
		};
		dataset.localStorageKey = {
		  userId: 'txp-userid',
		  userSetting: 'txp-user-setting',
		  playTime: 'txp-playtime',
		  adRfid: 'txp-ad-rfid',
		  historyPlayTime: 'txp-history-playtime',
		  historyDefinition: 'tvp-history-definition'
		};
		module.exports = dataset;
	
	/***/ },
	/* 88 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * 拓展Events
		 */
		var Events        = __webpack_require__(89);
		Events.prototype.on = function(evtName, listener){
		  if (!evtName) {
		    window.Txplayer && Txplayer.util.error('on error:evtName不能为空:' + evtName);
		    return;
		  }
		  this.addListener.call(this, evtName, listener);
		}
	
		// 运行消息指令获取返回数据
		Events.prototype.run = function(evtName, data){
		  if (typeof evtName!=='string') return false;
		  var config = {
		    data: null,
		    async: false
		  };
		  var args = [evtName, data, config];
		  for(var i=0, len=arguments.length;i<len;i++){
		    if (i<2) continue;
		    args.push(arguments[i]);
		  }
		  this.emit.apply(this, args);
		  // this.emit(evtName, data, config);
		  if (!!config.async) return config.async;
		  else return config.data;
		}
		// Events.off = Events.remveAllListeners
		Events.prototype.off = function(evtName){
		  if (!evtName) return this;
		  // this.removeAllListeners.apply(this, arguments);
	
		  // 子消息不用触发主消息
		  if (evtName.indexOf('.') > -1) {
		    this.removeAllListeners.call(this, evtName);
		    return this;
		  }
		  // 主消息得遍历所有的子消息并发送指令
		  for (name in this._events) {
		    if ( name===evtName ) {
		      this.removeAllListeners.call(this, evtName);
		      continue;
		    }
		    if (name && name.indexOf('.')===-1) continue;
		    if ( evtName!== name.split('.')[0] ) continue;
		    this.removeAllListeners.call(this, name);
		  }
		  return this;
		};
	
		// 消息广播
		Events.prototype.broadcast = function(evtName, data){
		  if (!evtName) {
		    window.Txplayer && Txplayer.util.error('broadcast error:evtName不能为空:' + evtName);
		    return;
		  }
		  if (typeof evtName !=='string') return this;
		  // 主消息参数
		  var args = [evtName];
		  for(var i=0, len=arguments.length;i<len;i++){
		    if (i===0) continue;
		    args.push(arguments[i]);
		  }
		  // 子消息专用参数
		  var subMsgArgs = args.slice(0);
		  // 子消息不用触发主消息
		  if (evtName.indexOf('.') > -1) {
		    // this.emit.call(this, evtName, data);
		    this.emit.apply(this, args);
		    return this;
		  }
		  // 主消息得遍历所有的子消息并发送指令
		  for (msgName in this._events) {
		    if ( msgName===evtName ) {
		      // this.emit.call(this, evtName, data);
		      this.emit.apply(this, args);
		      continue;
		    }
		    if (msgName && msgName.indexOf('.')===-1) continue;
		    if ( evtName!== msgName.split('.')[0] ) continue;
		    // this.emit.call(this, msgName, data);
		    subMsgArgs[0] = msgName;
		    this.emit.apply(this, subMsgArgs);
		  }
		  return this;
		}
	
		module.exports = Events;
	
	/***/ },
	/* 89 */
	/***/ function(module, exports) {
	
		// Copyright Joyent, Inc. and other Node contributors.
		//
		// Permission is hereby granted, free of charge, to any person obtaining a
		// copy of this software and associated documentation files (the
		// "Software"), to deal in the Software without restriction, including
		// without limitation the rights to use, copy, modify, merge, publish,
		// distribute, sublicense, and/or sell copies of the Software, and to permit
		// persons to whom the Software is furnished to do so, subject to the
		// following conditions:
		//
		// The above copyright notice and this permission notice shall be included
		// in all copies or substantial portions of the Software.
		//
		// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
		// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
		// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
		// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
		// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
		// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
		// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
		function EventEmitter() {
		  this._events = this._events || {};
		  this._maxListeners = this._maxListeners || undefined;
		}
		module.exports = EventEmitter;
	
		// Backwards-compat with node 0.10.x
		EventEmitter.EventEmitter = EventEmitter;
	
		EventEmitter.prototype._events = undefined;
		EventEmitter.prototype._maxListeners = undefined;
	
		// By default EventEmitters will print a warning if more than 10 listeners are
		// added to it. This is a useful default which helps finding memory leaks.
		EventEmitter.defaultMaxListeners = 10;
	
		// Obviously not all Emitters should be limited to 10. This function allows
		// that to be increased. Set to zero for unlimited.
		EventEmitter.prototype.setMaxListeners = function(n) {
		  if (!isNumber(n) || n < 0 || isNaN(n))
		    throw TypeError('n must be a positive number');
		  this._maxListeners = n;
		  return this;
		};
	
		EventEmitter.prototype.emit = function(type) {
		  var er, handler, len, args, i, listeners;
	
		  if (!this._events)
		    this._events = {};
	
		  // If there is no 'error' event listener then throw.
		  if (type === 'error') {
		    if (!this._events.error ||
		        (isObject(this._events.error) && !this._events.error.length)) {
		      er = arguments[1];
		      if (er instanceof Error) {
		        throw er; // Unhandled 'error' event
		      }
		      throw TypeError('Uncaught, unspecified "error" event.');
		    }
		  }
	
		  handler = this._events[type];
	
		  if (isUndefined(handler))
		    return false;
	
		  if (isFunction(handler)) {
		    switch (arguments.length) {
		      // fast cases
		      case 1:
		        handler.call(this);
		        break;
		      case 2:
		        handler.call(this, arguments[1]);
		        break;
		      case 3:
		        handler.call(this, arguments[1], arguments[2]);
		        break;
		      // slower
		      default:
		        args = Array.prototype.slice.call(arguments, 1);
		        handler.apply(this, args);
		    }
		  } else if (isObject(handler)) {
		    args = Array.prototype.slice.call(arguments, 1);
		    listeners = handler.slice();
		    len = listeners.length;
		    for (i = 0; i < len; i++)
		      listeners[i].apply(this, args);
		  }
	
		  return true;
		};
	
		EventEmitter.prototype.addListener = function(type, listener) {
		  var m;
	
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');
	
		  if (!this._events)
		    this._events = {};
	
		  // To avoid recursion in the case that type === "newListener"! Before
		  // adding it to the listeners, first emit "newListener".
		  if (this._events.newListener)
		    this.emit('newListener', type,
		              isFunction(listener.listener) ?
		              listener.listener : listener);
	
		  if (!this._events[type])
		    // Optimize the case of one listener. Don't need the extra array object.
		    this._events[type] = listener;
		  else if (isObject(this._events[type]))
		    // If we've already got an array, just append.
		    this._events[type].push(listener);
		  else
		    // Adding the second element, need to change to array.
		    this._events[type] = [this._events[type], listener];
	
		  // Check for listener leak
		  if (isObject(this._events[type]) && !this._events[type].warned) {
		    if (!isUndefined(this._maxListeners)) {
		      m = this._maxListeners;
		    } else {
		      m = EventEmitter.defaultMaxListeners;
		    }
	
		    if (m && m > 0 && this._events[type].length > m) {
		      this._events[type].warned = true;
		      console.error('(node) warning: possible EventEmitter memory ' +
		                    'leak detected. %d listeners added. ' +
		                    'Use emitter.setMaxListeners() to increase limit.',
		                    this._events[type].length);
		      if (typeof console.trace === 'function') {
		        // not supported in IE 10
		        console.trace();
		      }
		    }
		  }
	
		  return this;
		};
	
		EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
		EventEmitter.prototype.once = function(type, listener) {
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');
	
		  var fired = false;
	
		  function g() {
		    this.removeListener(type, g);
	
		    if (!fired) {
		      fired = true;
		      listener.apply(this, arguments);
		    }
		  }
	
		  g.listener = listener;
		  this.on(type, g);
	
		  return this;
		};
	
		// emits a 'removeListener' event iff the listener was removed
		EventEmitter.prototype.removeListener = function(type, listener) {
		  var list, position, length, i;
	
		  if (!isFunction(listener))
		    throw TypeError('listener must be a function');
	
		  if (!this._events || !this._events[type])
		    return this;
	
		  list = this._events[type];
		  length = list.length;
		  position = -1;
	
		  if (list === listener ||
		      (isFunction(list.listener) && list.listener === listener)) {
		    delete this._events[type];
		    if (this._events.removeListener)
		      this.emit('removeListener', type, listener);
	
		  } else if (isObject(list)) {
		    for (i = length; i-- > 0;) {
		      if (list[i] === listener ||
		          (list[i].listener && list[i].listener === listener)) {
		        position = i;
		        break;
		      }
		    }
	
		    if (position < 0)
		      return this;
	
		    if (list.length === 1) {
		      list.length = 0;
		      delete this._events[type];
		    } else {
		      list.splice(position, 1);
		    }
	
		    if (this._events.removeListener)
		      this.emit('removeListener', type, listener);
		  }
	
		  return this;
		};
	
		EventEmitter.prototype.removeAllListeners = function(type) {
		  var key, listeners;
	
		  if (!this._events)
		    return this;
	
		  // not listening for removeListener, no need to emit
		  if (!this._events.removeListener) {
		    if (arguments.length === 0)
		      this._events = {};
		    else if (this._events[type])
		      delete this._events[type];
		    return this;
		  }
	
		  // emit removeListener for all listeners on all events
		  if (arguments.length === 0) {
		    for (key in this._events) {
		      if (key === 'removeListener') continue;
		      this.removeAllListeners(key);
		    }
		    this.removeAllListeners('removeListener');
		    this._events = {};
		    return this;
		  }
	
		  listeners = this._events[type];
	
		  if (isFunction(listeners)) {
		    this.removeListener(type, listeners);
		  } else if (listeners) {
		    // LIFO order
		    while (listeners.length)
		      this.removeListener(type, listeners[listeners.length - 1]);
		  }
		  delete this._events[type];
	
		  return this;
		};
	
		EventEmitter.prototype.listeners = function(type) {
		  var ret;
		  if (!this._events || !this._events[type])
		    ret = [];
		  else if (isFunction(this._events[type]))
		    ret = [this._events[type]];
		  else
		    ret = this._events[type].slice();
		  return ret;
		};
	
		EventEmitter.prototype.listenerCount = function(type) {
		  if (this._events) {
		    var evlistener = this._events[type];
	
		    if (isFunction(evlistener))
		      return 1;
		    else if (evlistener)
		      return evlistener.length;
		  }
		  return 0;
		};
	
		EventEmitter.listenerCount = function(emitter, type) {
		  return emitter.listenerCount(type);
		};
	
		function isFunction(arg) {
		  return typeof arg === 'function';
		}
	
		function isNumber(arg) {
		  return typeof arg === 'number';
		}
	
		function isObject(arg) {
		  return typeof arg === 'object' && arg !== null;
		}
	
		function isUndefined(arg) {
		  return arg === void 0;
		}
	
	
	/***/ },
	/* 90 */
	/***/ function(module, exports) {
	
		/**
		 * Txplayer.$ 模块，依赖第三方的zepto|jquery|jqmobile
		 * @author zoborzhang
		 */
		var $;
		if (typeof window.Zepto === 'function') {
		  $ = window.Zepto;
		} else if (typeof window.jQuery === 'function') {
		  $ = window.jQuery;
		} else if (typeof window.jq === 'function') {
		  $ = window.jq;
		}else{
		  throw ReferenceError('$ is not defined!');
		}
		module.exports = $;
	
	/***/ },
	/* 91 */
	/***/ function(module, exports) {
	
		/**
		 * JavaScript Micro-Templating
		 * http://ejohn.org/blog/javascript-micro-templating/
		 * @constructor
		 * @param  {String} str  模板
		 * @param  {Object} data 数据
		 * @return {String}      模板替换后的数据
		 */
		var tmpl = (function(cache, $) {
		  return function(str, data) {
		    var fn = !/\s/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : function(data) {
		      var i, variable = [$],
		        value = [
		          []
		        ];
		      for (i in data) {
		        variable.push(i);
		        value.push(data[i]);
		      };
		      return (new Function(variable, fn.$)).apply(data, value).join("");
		    };
		    fn.$ = fn.$ || $ + ".push('" + str.replace(/\\/g, "\\\\")
		      .replace(/[\r\t\n]/g, " ")
		      .split("<%")
		      .join("\t")
		      .replace(/((^|%>)[^\t]*)'/g, "$1\r")
		      .replace(/\t=(.*?)%>/g, "',$1,'")
		      .split("\t")
		      .join("');")
		      .split("%>")
		      .join($ + ".push('")
		      .split("\r")
		      .join("\\'") + "');return " + $;
	
		    return data ? fn(data) : fn;
		  };
		})({}, '$' + (+new Date()));
	
		module.exports = tmpl;
	
	/***/ },
	/* 92 */
	/***/ function(module, exports) {
	
		/**
		 * jQuery plugin to convert a given $.ajax response xml object to json.
		 *
		 * @example var json = $.xml2json(response);
		 */
		(function() {
	
		   // default options based on https://github.com/Leonidas-from-XIV/node-xml2js
		   var defaultOptions = {
		      attrkey: '$',
		      charkey: '_',
		      normalize: false,
		      explicitArray: false
		   };
	
		   // extracted from jquery
		   function parseXML(data) {
		      var xml, tmp;
		      if (!data || typeof data !== "string") {
		         return null;
		      }
		      try {
		         if (window.DOMParser) { // Standard
		            tmp = new DOMParser();
		            xml = tmp.parseFromString(data, "text/xml");
		         } else { // IE
		            xml = new ActiveXObject("Microsoft.XMLDOM");
		            xml.async = "false";
		            xml.loadXML(data);
		         }
		      } catch (e) {
		         xml = undefined;
		      }
		      if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
		         throw new Error("Invalid XML: " + data);
		      }
		      return xml;
		   }
	
		   function normalize(value, options){
		      if (!!options.normalize){
		         return (value || '').trim();
		      }
		      return value;
		   }
	
		   function xml2jsonImpl(xml, options) {
	
		      var i, result = {}, attrs = {}, node, child, name;
		      result[options.attrkey] = attrs;
	
		      if (xml.attributes && xml.attributes.length > 0) {
		         for (i = 0; i < xml.attributes.length; i++){
		            var item = xml.attributes.item(i);
		            attrs[item.nodeName] = item.value;
		         }
		      }
	
		      // element content
		      if (xml.childElementCount === 0) {
		         result[options.charkey] = normalize(xml.textContent, options);
		      }
	
		      for (i = 0; i < xml.childNodes.length; i++) {
		         node = xml.childNodes[i];
		         if (node.nodeType === 1) {
	
		            if (node.attributes.length === 0 && node.childElementCount === 0){
		               child = normalize(node.textContent, options);
		            } else {
		               child = xml2jsonImpl(node, options);
		            }
	
		            name = node.nodeName;
		            if (result.hasOwnProperty(name)) {
		               // For repeating elements, cast/promote the node to array
		               var val = result[name];
		               if (!Array.isArray(val)) {
		                  val = [val];
		                  result[name] = val;
		               }
		               val.push(child);
		            } else if(options.explicitArray === true) {
		               result[name] = [child];
		            } else {
		               result[name] = child;
		            }
		         }
		      }
	
		      return result;
		   }
	
		   /**w
		    * Converts an xml document or string to a JSON object.
		    *
		    * @param xml
		    */
		   function xml2json(xml, options) {
		      var n;
	
		      if (!xml) {
		         return xml;
		      }
	
		      options = options || {};
	
		      for(n in defaultOptions) {
		         if(defaultOptions.hasOwnProperty(n) && options[n] === undefined) {
		            options[n] = defaultOptions[n];
		         }
		      }
	
		      if (typeof xml === 'string') {
		         xml = parseXML(xml).documentElement;
		      }
	
		      var root = {};
		      if (typeof xml.attributes === 'undefined' || xml.attributes === null) {
		         root[xml.nodeName] = xml2jsonImpl(xml, options);
		      } else if (xml.attributes && xml.attributes.length === 0 && xml.childElementCount === 0){
		         root[xml.nodeName] = normalize(xml.textContent, options);
		      } else {
		         root[xml.nodeName] = xml2jsonImpl(xml, options);
		      }
	
		      return root;
		   }
	
		   // if (typeof jQuery !== 'undefined') {
		   //    jQuery.extend({xml2json: xml2json});
		   // } else if (typeof module !== 'undefined') {
		   //    module.exports = xml2json;
		   // } else if (typeof window !== 'undefined') {
		   //    window.xml2json = xml2json;
		   // }
		   module.exports = xml2json;
		})();
	
	/***/ },
	/* 93 */
	/***/ function(module, exports) {
	
		// 错误上报
		// bossid: 3720
		function reportError(params){
		  var playType = this.run(Txplayer.apiList.publicApi.getPlayerType);
		  var videoType = this.run(Txplayer.apiList.publicApi.getVideoType);
		  var data = {
		    version: Txplayer.dataset.ver,
		    uid: this.run(Txplayer.apiList.publicApi.getUserId),
		    pid: this.run(Txplayer.apiList.publicApi.getPlayerId),
		    vid: this.run(Txplayer.apiList.publicApi.getVid),
		    player_type: playType,
		    video_type: videoType==='vod'?1:2,
		    platform: Txplayer.util.getPlatform(),
		    url: document.URL,
		    filename: Txplayer.dataset.filename,
		    sub_version: Txplayer.dataset.flashVersion,
		    error_code: params.code,
		    error_msg: params.msg,
		    error_stack: params.stack,
		    file_lastupdate: Txplayer.dataset.lastModify,
		    qq_openid: getQQ_openid()
		  };
		  Txplayer.util.showInfo('错误上报', data);
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=3720&Pwd=1814753491&';
		  url += Txplayer.$.param(data);
		  Txplayer.util.report(url);
		}
	
		// 上报window.onerror错误
		function reportWindowOnError(e){
		  // 没有错误信息的就不要上报了，上报了也没用
		  if (!e || !e.filename || !e.message){
		    return ;
		  }
		  // 只上报播放器自身的错误
		  if (e.filename.indexOf('//vm.gtimg.cn/tencentvideo/txp/js/')===-1) {
		    return;
		  }
		  function getPlayer(){
		    var player;
		    if ( !(Txplayer && Txplayer.dataset && Txplayer.dataset._instance) ) return player;
		    for(var i in Txplayer.dataset._instance){
		      player = Txplayer.dataset._instance[i];
		      break;
		    }
		    return player;
		  }
		  var player = getPlayer();
		  var uid, pid, vid, playerType, videoType;
		  if (player && player.constructor === Txplayer){
		    uid = player.getUserId();
		    pid = player.getPlayerId();
		    vid = player.getVid();
		    playerType = player.getPlayerType();
		    videoType = player.getVideoType();
		  }
		  var stack = [
		    'line=' + e.lineno,
		    'column='+ e.colno
		  ].join(' ');
		  var data = {
		    version: Txplayer.dataset.ver,
		    uid: uid,
		    pid: pid,
		    vid: vid,
		    player_type: playerType,
		    video_type: videoType==='vod'?1:2,
		    platform: Txplayer.util.getPlatform(),
		    url: document.URL,
		    filename: e.filename,
		    sub_version: Txplayer.dataset.flashVersion,
		    error_code: '3000',
		    error_msg: e.message,
		    error_stack: stack,
		    file_lastupdate: Txplayer.dataset.lastModify,
		    qq_openid: getQQ_openid()
		  };
		  Txplayer.util.showInfo('错误上报', data);
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=3720&Pwd=1814753491&';
		  url += Txplayer.$.param(data);
		  Txplayer.util.report(url);
		}
	
		// 获取QQ号或者openid
		function getQQ_openid(){
		  var uin = Txplayer.util.cookie.get('openid') || Txplayer.util.getQQFromCookie();
		  return uin;
		}
	
		// 播放器调用次数上报
		// bossid: 3721
		function reportTxplayer(context, params){
		  var data = {
		    version: Txplayer.dataset.ver,
		    uid: context.msg.run(Txplayer.apiList.publicApi.getUserId),
		    pid: context.msg.run(Txplayer.apiList.publicApi.getPlayerId),
		    vid: context.msg.run(Txplayer.apiList.publicApi.getVid),
		    player_type: params.playType,
		    video_type: params.videoType==='vod'?1:2,
		    platform: Txplayer.util.getPlatform(),
		    url: document.URL,
		    filename: Txplayer.dataset.filename,
		    sub_version: Txplayer.dataset.flashVersion,
		    _dc:  Math.random()
		  };
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=3721&Pwd=1636975887&'
		  url += Txplayer.$.param(data);
		  Txplayer.util.showInfo('播放器调用', data);
		  Txplayer.util.report(url);
		}
	
		// 用户行为上报
		// bossid： 3717
		function reportUsrAction(params){
		  var playType = this.run(Txplayer.apiList.publicApi.getPlayerType);
		  var videoType = this.run(Txplayer.apiList.publicApi.getVideoType);
		  var data = {
		    version: Txplayer.dataset.ver,
		    uid: this.run(Txplayer.apiList.publicApi.getUserId),
		    pid: this.run(Txplayer.apiList.publicApi.getPlayerId),
		    vid: this.run(Txplayer.apiList.publicApi.getVid),
		    player_type: playType,
		    video_type: videoType==='vod'?1:2,
		    platform: Txplayer.util.getPlatform(),
		    url: document.URL,
		    usr_action: params.usr_action,
		    usr_action_detail: params.usr_action_detail
		  };
		  Txplayer.util.showInfo('用户行为上报', data);
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=3717&Pwd=1055758521&';
		  url += Txplayer.$.param(data);
		  Txplayer.util.report(url);
		}
	
		// getinfo上报
		// bossid: 2594
		function reportGetinfo(params){
		  var playType = this.run(Txplayer.apiList.publicApi.getPlayerType);
		  var videoType = this.run(Txplayer.apiList.publicApi.getVideoType);
		  var data = {
		    gid: this.run(Txplayer.apiList.publicApi.getUserId),
		    plt: Txplayer.util.getPlatform(),
		    uin: Txplayer.util.getQQFromCookie(),
		    vid: this.run(Txplayer.apiList.publicApi.getVid),
		    cts: Txplayer.$.now(),
		    sdt: Txplayer.util.getStdfrom(),
		    fne: params.filename,
		    dip: params.cdnIp,
		    cdn: params.cdnId,
		    vky: params.vkey
		  };
		  Txplayer.util.showInfo('getinfo上报', data);
		  var url = 'http://btrace.video.qq.com/kvcollect?BossId=2594&Pwd=0&';
		  url += Txplayer.$.param(data);
		  Txplayer.util.report(url);
		}
	
		// 提供上报api
		function exportsReportApi(context){
		  // 错误上报
		  context.msg.on(Txplayer.apiList.privateApi.reportError, reportError);
		  // 用户行为上报
		  context.msg.on(Txplayer.apiList.privateApi.reportUsrAction, reportUsrAction);
		  context.msg.on(Txplayer.apiList.privateApi.reportGetinfo, reportGetinfo);
		}
	
	
		if(window.addEventListener){
		  window.addEventListener('error', reportWindowOnError);
		}else if(window.attachEvent){
		  window.attachEvent('onerror',reportWindowOnError);
		}
	
		module.exports = {
		  reportTxplayer: reportTxplayer,
		  reportError: reportError,
		  exportsReportApi: exportsReportApi
		};
	
	/***/ }
	/******/ ]);
/**
 * @fileOverview 包裹播放器内核文件
 * @author zoborzhang
 */
(function() {

  if (!window.Txplayer || !Txplayer.dataset || !Txplayer.$) return;
  Txplayer.$.extend(Txplayer.dataset, {
    // 当前播放器内核的cdn文件名
    filename: "txplayer.pc.js",
    // 上次修改时间
    lastModify: "Sat May 14 2016 10:19:16 GMT+0800 (CST)",
    // 上次修改时间的时间戳，异步加载模块会带上?t=ts
    ts: "1463192356018",
    // 播放器的版本号
    ver: "3.0.0"
  });

})();