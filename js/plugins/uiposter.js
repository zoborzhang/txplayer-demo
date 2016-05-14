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
	
		module.exports = __webpack_require__(57);
	
	
	/***/ },
	
	/***/ 57:
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
	
	/***/ 58:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=poster%>\" class=\"txp_poster\"></txpdiv>";
	
	/***/ }
	
	/******/ });
