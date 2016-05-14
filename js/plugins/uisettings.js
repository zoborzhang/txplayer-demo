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
	
		module.exports = __webpack_require__(63);
	
	
	/***/ },
	
	/***/ 63:
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
	
	/***/ 64:
	/***/ function(module, exports) {
	
		module.exports = "<button data-role=\"<%=settings%>\" class=\"txp_btn txp_btn_setting\">\n  <svg data-role=\"<%=settingsBtn%>\" class=\"txp_icon txp_icon_setting\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_setting\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_setting\"></use>\n  </svg>\n  <txpdiv data-role=\"<%=layer%>\" class=\"txp_popup txp_popup_settings\">\n    <txpdiv class=\"txp_menugroup txp_menugroup_play\">\n      <txpdiv class=\"txp_menugroup_label\">播放设置</txpdiv>\n      <!-- <txpdiv data-role=\"<%=closeLight%>\" data-report=\"close-light\" class=\"txp_menuitem\">\n        <svg class=\"txp_icon txp_icon_select\" version=\"1.1\" viewBox=\"0 0 12 12\">\n          <use class=\"txp_svg_select\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select\"></use>\n          <use class=\"txp_svg_select_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select_true\"></use>\n        </svg>\n        <txpdiv class=\"txp_menuitem_label\">关灯</txpdiv>\n      </txpdiv> -->\n      <txpdiv data-role=\"<%=skipPrelude%>\" data-report=\"skip-prelude\" class=\"txp_menuitem\">\n        <svg class=\"txp_icon txp_icon_select\" version=\"1.1\" viewBox=\"0 0 12 12\">\n          <use class=\"txp_svg_select\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select\"></use>\n          <use class=\"txp_svg_select_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select_true\"></use>\n        </svg>\n        <txpdiv class=\"txp_menuitem_label\">自动跳过片头</txpdiv>\n      </txpdiv>\n      <txpdiv data-role=\"<%=hidePlayingControl%>\" data-report=\"hide-control-play\" class=\"txp_menuitem\">\n        <svg class=\"txp_icon txp_icon_select\" version=\"1.1\" viewBox=\"0 0 12 12\">\n          <use class=\"txp_svg_select\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select\"></use>\n          <use class=\"txp_svg_select_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select_true\"></use>\n        </svg>\n        <txpdiv class=\"txp_menuitem_label\">播放时隐藏进度条</txpdiv>\n      </txpdiv>\n      <% if (!isMobile) {%>\n      <txpdiv data-role=\"<%=useFlash%>\" data-report=\"use-flash\" class=\"txp_menuitem\">\n        <svg class=\"txp_icon txp_icon_select\" version=\"1.1\" viewBox=\"0 0 12 12\">\n          <use class=\"txp_svg_select\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select\"></use>\n          <use class=\"txp_svg_select_true\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_select_true\"></use>\n        </svg>\n        <txpdiv class=\"txp_menuitem_label\">使用 Flash 播放器</txpdiv>\n      </txpdiv>\n      <%}%>\n    </txpdiv>\n  </txpdiv>\n</button>";
	
	/***/ }
	
	/******/ });
