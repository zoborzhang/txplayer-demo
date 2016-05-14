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
	
		module.exports = __webpack_require__(38);
	
	
	/***/ },
	
	/***/ 38:
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
	
	/***/ 39:
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=playBtn%>\" class=\"txp_btn txp_btn_play\" data-status=\"play\">\n  <svg class=\"txp_icon txp_icon_play\" version=\"1.1\" viewBox=\"0 0 36 36\">\n    <use class=\"txp_svg_symbol txp_svg_play\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_play\"></use>\n    <use class=\"txp_svg_symbol txp_svg_pause\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_pause\"></use>\n    <use class=\"txp_svg_symbol txp_svg_stop\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_stop\"></use>\n  </svg>\n  <txpdiv data-role=\"<%=tips%>\" class=\"txp_tooltip\">播放</txpdiv>\n</button>";
	
	/***/ }
	
	/******/ });
