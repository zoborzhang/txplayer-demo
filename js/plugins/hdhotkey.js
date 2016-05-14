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
	/******/ ({
	
	/***/ 0:
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(22);
	
	
	/***/ },
	
	/***/ 22:
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
	
	
	/***/ }
	
	/******/ });
