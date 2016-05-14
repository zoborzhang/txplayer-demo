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
	
		module.exports = __webpack_require__(55);
	
	
	/***/ },
	
	/***/ 55:
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
	
	/***/ 56:
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=next%>\" class=\"txp_btn txp_btn_next <%=hideClass%>\" data-report=\"play-next\">\n  <svg class=\"txp_icon txp_icon_next\" version=\"1.1\" viewBox=\"0 0 36 36\">\n    <path d=\"M26,27.999v-20h2v20H26z M9,8.006l14.993,9.993L9,27.992V8.006z M11,24 l9.654-6.034L11,12V24z\"></path>\n  </svg>\n  <txpdiv class=\"txp_tooltip\">下一集</txpdiv>\n</button>";
	
	/***/ }
	
	/******/ });
