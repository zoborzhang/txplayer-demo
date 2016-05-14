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
	
		module.exports = __webpack_require__(51);
	
	
	/***/ },
	
	/***/ 51:
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
	
	/***/ 52:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=playLayer%>\" class=\"txp_overlay_play <%=hideClass%>\">\n  <button data-role=\"<%=btn%>\" class=\"txp_btn txp_btn_play_lg\">\n    <svg class=\"txp_icon txp_icon_play\" version=\"1.1\" viewBox=\"0 0 36 36\">\n      <use class=\"txp_svg_play\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_play\"></use>\n    </svg>\n  </button>\n</txpdiv>";
	
	/***/ }
	
	/******/ });
