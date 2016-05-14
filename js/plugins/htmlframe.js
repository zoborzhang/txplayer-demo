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
	
		module.exports = __webpack_require__(31);
	
	
	/***/ },
	
	/***/ 31:
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
	
	/***/ 32:
	/***/ function(module, exports) {
	
		module.exports = "<% if(ie){ %>\n  <div class=\"txp_player\" id=\"<%=playerid%>\" style=\"<%=mod_stype%>\">\n  </div>\n<% }else{%>\n  <txpdiv class=\"txp_player txp_player_desktop txp_autohide_progress\" id=\"<%=playerid%>\" style=\"<%=mod_stype%>\" <%=tabindex%>>\n  <% if(useSVG) {%>\n    <%=svgstr%>\n  <% } %>\n  <txpdiv class=\"txp_gradient_top\"></txpdiv>\n  <txpdiv class=\"txp_gradient_bottom\"></txpdiv>\n  </txpdiv>\n<% } %>";
	
	/***/ },
	
	/***/ 33:
	/***/ function(module, exports) {
	
		module.exports = "<svg class=\"txp_svg_sprite\" display=\"none\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n\t<symbol id=\"txp_svg_collect\" viewBox=\"0 0 42 42\">\n\t\t<path d=\"M35.832 21.654a8.782 8.782 0 0 0-1.65-1.188 6.27 6.27 0 0 0-1.168-7.617 6.728 6.728 0 0 0-4.683-1.866 6.732 6.732 0 0 0-4.682 1.864l-2.654 2.542-2.653-2.542a6.736 6.736 0 0 0-4.683-1.864 6.727 6.727 0 0 0-4.68 1.864c-2.64 2.525-2.64 6.635 0 9.16l12.018 9.98.868-.72c.292.72.68 1.392 1.146 2l-2.012 1.723-13.44-11.5c-3.39-3.337-3.39-8.69-.05-11.98a8.694 8.694 0 0 1 6.148-2.507c2.328 0 4.513.89 6.152 2.506l1.188 1.173 1.19-1.174a8.697 8.697 0 0 1 6.15-2.507c2.33 0 4.513.89 6.152 2.507 2.786 2.746 3.212 6.92 1.344 10.144zM25 27h4v-4a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4h-4a1 1 0 0 1 0-2z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_collected\" viewBox=\"0 0 42 42\">\n\t\t<path d=\"M30.92 16.105c-5.567 0-10.08 4.453-10.08 9.947 0 2.49.934 4.762 2.467 6.507l-2.382 2.012L7.53 23.256c-3.378-3.283-3.378-8.55-.05-11.787 1.63-1.59 3.808-2.467 6.128-2.467 2.32 0 4.498.875 6.132 2.466l1.185 1.153 1.185-1.154c1.633-1.592 3.81-2.467 6.13-2.467s4.5.875 6.132 2.467c1.832 1.783 2.617 4.18 2.43 6.517a10.108 10.108 0 0 0-5.882-1.882zm-.008 1.416c4.768 0 8.632 3.82 8.632 8.53s-3.865 8.53-8.632 8.53-8.632-3.82-8.632-8.53 3.865-8.53 8.632-8.53zm-.685 13.206l.187-.183.222.217 6.25-6.105-1.604-1.567-4.853 4.74-2.58-2.518-1.583 1.547 3.96 3.87z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_share\" viewBox=\"0 0 42 42\">\n\t\t<path d=\"M35.364 15.706l-5.657 5.657a1 1 0 1 1-1.414-1.414l3.95-3.95H30c-7.92 0-14.637 5.117-17.045 12.223A.985.985 0 0 1 12 29a1 1 0 0 1-1-1 .98.98 0 0 1 .062-.307l-.04-.02C13.667 19.727 21.164 13.998 30 13.998h2.243l-3.95-3.95a1 1 0 1 1 1.414-1.415l5.657 5.657a1 1 0 0 1 0 1.414zM33 14.756v.486l.243-.243-.243-.244zM19 13H8v19h24v-8a1 1 0 0 1 2 0v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V12a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_play\" viewBox=\"0 0 36 36\">\n\t\t<path d=\"M11 27.992V8.006L26.993 18 11 27.99zm2-3.492L23.547 18 13 11.53V24.5z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_pause\" viewBox=\"0 0 36 36\">\n\t\t<path d=\"M23 28V8h2v20h-2zM11 8h2v20h-2V8z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_next\" viewBox=\"0 0 36 36\">\n\t\t<path d=\"M26 28V8h2v20h-2zM9 8.005L23.993 18 9 27.99V8.006zM11 24l9.654-6.034L11 12v12z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_stop\" viewBox=\"0 0 36 36\">\n\t\t<path d=\"M9 9h18v18H9V9z\" />\n\t</symbol>\n\t<symbol id=\"txp_svg_shop\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M18 13.836V14H8.793l-.552 2H18a2 2 0 1 1-2 2c0-.368.106-.707.278-1H8.722c.172.294.278.633.278 1a2 2 0 1 1-2-2h.206l.552-2H7v-.223L5.34 5H3V4h3v.01L6.147 4l.377 2H20v1h-.206L18 13.835zM18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM7 17a1 1 0 1 0 0 1.998 1 1 0 0 0 0-2zM6.714 7l1.134 6h9.357l1.575-6H6.714z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_eye\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M12 18c-5.468 0-9-6-9-6s3.533-6 9-6c5.467 0 9 6 9 6s-3.533 6-9 6zm0-11c-5.033 0-8 5-8 5s2.967 5 8 5c5.033 0 8-5 8-5s-2.967-5-8-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-5a2 2 0 1 0 0 3.998 2 2 0 0 0 0-4z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_volume\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M16.784 20.156l-.732-.68a10.952 10.952 0 0 0 0-14.953l.732-.68a11.948 11.948 0 0 1 0 16.313zm-3.13-3.72A7.952 7.952 0 0 0 15 12a7.955 7.955 0 0 0-1.345-4.437l.832-.555A8.958 8.958 0 0 1 16 12a8.954 8.954 0 0 1-1.512 4.99l-.833-.554zM11 20l-5-3H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2l5-3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm0-15L6 8H4v8h2l5 2.928V4.998z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_volume_damping\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M16.784 20.156 zm-3.13-3.72A7.952 7.952 0 0 0 15 12a7.955 7.955 0 0 0-1.345-4.437l.832-.555A8.958 8.958 0 0 1 16 12a8.954 8.954 0 0 1-1.512 4.99l-.833-.554zM11 20l-5-3H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2l5-3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm0-15L6 8H4v8h2l5 2.928V4.998z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_volume_mute\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M20.886 9.79l-2.697 2.696 2.694 2.695a.477.477 0 0 1-.674.675l-2.695-2.695-2.695 2.695a.477.477 0 0 1-.674-.674l2.695-2.694-2.696-2.697a.477.477 0 1 1 .674-.675l2.697 2.697 2.697-2.697a.477.477 0 1 1 .674.674zM11 20l-5-3H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2l5-3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm0-15L6 8H4v8h2l5 2.928V4.998z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_setting\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M19.835 13.62a7.913 7.913 0 0 1-1.18 2.78l.434 1.3-1.415 1.414-1.313-.438a8.103 8.103 0 0 1-2.74 1.13L13 21.05h-2l-.606-1.213A7.93 7.93 0 0 1 7.63 18.68l-1.304.434L4.91 17.7l.437-1.306a8.078 8.078 0 0 1-1.15-2.758l-1.222-.61v-2l1.192-.596a7.953 7.953 0 0 1 1.17-2.804L4.91 6.35l1.416-1.414 1.26.42c.847-.568 1.8-.992 2.836-1.2L11 3h2l.58 1.156a7.922 7.922 0 0 1 2.836 1.2l1.26-.42 1.413 1.414-.424 1.27c.552.84.94 1.787 1.152 2.8l1.208.605v2l-1.19.595zm-2.156 4.09v-1.416l-1.416 1.415h1.415zM12 20.06l1-1h-2l1 1zM6.32 17.71h1.415L6.32 16.293v1.415zM4.97 11.03l-1 1 1 1v-2zM6.32 6.352v1.414l1.415-1.414H6.32zm11.36 0h-1.416l1.415 1.414V6.352zM12.007 5H13l-1-1-1 1h.99a7 7 0 1 0 .018 0zm7.023 6.03v2l1-1-1-1zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z\"/> \n\t</symbol>\n\t<symbol id=\"txp_svg_bulb\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M15 16.317V17c0 .186-.065.35-.153.5.088.15.153.313.153.5v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2c0-.186.064-.35.153-.5A.97.97 0 0 1 9 17v-.683A6.994 6.994 0 0 1 5 10a7 7 0 0 1 14 0 6.994 6.994 0 0 1-4 6.317zM10 20h4v-2h-4v2zm2-16a6 6 0 0 0-6 6c0 2.215 1.214 4.128 3 5.167V15c.452.36 1 .593 1 .593V17h4v-1.5s.462-.096 1-.5v.167c1.786-1.04 3-2.953 3-5.167a6 6 0 0 0-6-6z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_window\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M19 16H9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zm0-11H9v10h10V5zM5 19h10v-2h1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2v1H5v10z\"/> \n\t</symbol>\n\t<symbol id=\"txp_svg_size\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M3 18V6h18v12H3zM4 7v10h13V7H4zm16 0h-2v10h2V7z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_size_true\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M3 18V6h18v12H3zM20 7H4v10h16V7z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_fake\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M4 20V4h16v16H4zM19 5H5v14h14V5zM9 7H7v2l-1 1V6h4L9 7zM7 17v-1h1v1h1l1 1H6v-4l1 1v2zm2-2v1H8v-1h1zm1-1v1H9v-1h1zm8-4.002l-1-1V8h-1V7h1-2l-1-1h4v3.998zM15 9V8h1v1h-1zm-1 1V9h1v1h-1zm2 7v-1h1v-1l1-1v4h-4l1-1h1zm-1-2h1v1h-1v-1zm-1-1h1v1h-1v-1zM9 9h1v1H9V9zM8 8h1v1H8V8zM7 7h1v1H7V7z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_fake_true\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M4 20V4h16v16H4zM19 5H5v14h14V5zM8 9V8h1V7l1-1v4H6l1-1h1zM7 7h1v1H7V7zM6 6h1v1H6V6zm1 9l-1-1h4v4l-1-1v-1H8v-1h1-2zm0 2v-1h1v1H7zm-1 1v-1h1v1H6zm9-9V8h1v1h1l1 1h-4V6l1 1v2zm2-2v1h-1V7h1zm1-1v1h-1V6h1zm-1 9h-2v2l-1 1v-4h4l-1 1zm-1 1h-1v-1h1v1zm1 1h-1v-1h1v1zm1 1h-1v-1h1v1z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_fullscreen\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M20 9h-1V5.714l-4.29 4.29-.717-.716L18.283 5H15V4h4.284l.006-.007.006.006H20v.703l.006.006-.006.005V9zM9 19v1H4.716l-.007.006L4.7 20H4v-.703l-.006-.007.006-.007v-4.285h1v3.284l4.29-4.29.716.715L5.716 19H9zm.29-8.995L5 5.715V9H4V4.714l-.006-.006L4 4.702V4h.704l.006-.007.006.006H9v1H5.715l4.29 4.29-.715.715zm5.42 3.988l4.29 4.29V15h1v4.284l.006.006-.006.006V20h-.703l-.007.005-.007-.006H15v-1h3.284l-4.29-4.292.715-.715z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_fullscreen_true\" viewBox=\"0 0 24 24\">\n\t\t<path d=\"M20 9v1h-5.283l-.007.005-.006-.006H14v-.705l-.006-.006.006-.007V4h1V8.28l4.29-4.29.716.716-4.29 4.29H20zM10 20H9v-4.285l-4.29 4.29-.716-.715L8.284 15H4v-1h5.284l.006-.007.006.006H10v.703l.006.006-.006.005V20zm0-10h-.704l-.006.005L9.283 10H4V9h4.284l-4.29-4.29.716-.717L9 8.283V4h1v5.284l.006.006-.006.005V10zm4 4.703V14h.704l.006-.007.006.006H20v1h-4.284l4.29 4.29-.716.716-4.29-4.29v4.283h-1v-5.284l-.006-.006.006-.007z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_select\" viewBox=\"0 0 12 12\">\n\t\t<path d=\"M11 12H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zm0-11H1v10h10V1z\"/>\n\t</symbol>\n\t<symbol id=\"txp_svg_select_true\" viewBox=\"0 0 12 12\">\n\t\t<path d=\"M11.5 2a.5.5 0 0 1-.5-.5V1H1v2.5a.5.5 0 0 1-1 0V1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5a.5.5 0 0 1-.5.5zM.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 0 1 0 1H1a1 1 0 0 1-1-1V9.5A.5.5 0 0 1 .5 9zM.285 6.643a.96.96 0 0 1 1.358-1.358L4.517 8.16l5.492-4.613a1 1 0 0 1 1.414 1.415L5.18 10.204a1 1 0 0 1-1.415 0c-.016-.017-.022-.04-.037-.056-.014-.012-.026-.008-.04-.022L.284 6.643zM6.5 11H11V7.5a.5.5 0 0 1 1 0V11a1 1 0 0 1-1 1H6.5a.5.5 0 0 1 0-1z\"/>\n\t</symbol>\n</svg>";
	
	/***/ }
	
	/******/ });
