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
	
	/***/ }
	/******/ ]);
