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
	
		module.exports = __webpack_require__(45);
	
	
	/***/ },
	
	/***/ 45:
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
	
	/***/ 46:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=favorite%>\" class=\"txp_top_btns <%=hide%>\">\n  <button data-role=\"<%=favoriteBtn%>\" class=\"txp_btn txp_btn_collect\" data-status=\"false\" data-report=\"follow\">\n    <svg class=\"txp_icon txp_icon_collect\" version=\"1.1\" viewBox=\"0 0 42 42\">\n      <use class=\"txp_svg_symbol txp_svg_collect\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_collect\"></use>\n      <use class=\"txp_svg_symbol txp_svg_collected\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_collected\"></use>\n    </svg>\n  </button>\n</txpdiv>";
	
	/***/ }
	
	/******/ });
