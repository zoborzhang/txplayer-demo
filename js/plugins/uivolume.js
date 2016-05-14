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
	
		module.exports = __webpack_require__(77);
	
	
	/***/ },
	
	/***/ 77:
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
	
	/***/ 78:
	/***/ function(module, exports) {
	
		module.exports = "<button class=\"txp_btn txp_btn_volume\" data-role=\"<%=volumeButton%>\" data-status=\"normal\">\n  <svg data-role=\"<%=volumeClickButton%>\" data-report=\"mute-toggle\" class=\"txp_icon txp_icon_volume\" version=\"1.1\" viewBox=\"0 0 24 24\">\n    <use class=\"txp_svg_symbol txp_svg_volume\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume\"></use>\n    <use class=\"txp_svg_symbol txp_svg_volume_damping\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume_damping\"></use>\n    <use class=\"txp_svg_symbol txp_svg_volume_mute\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume_mute\"></use>\n  </svg>\n  <txpdiv data-role=\"<%=volumeDrag%>\" class=\"txp_popup txp_popup_volume\" data-report=\"change-volume\">\n    <txpdiv data-role=\"<%=volumeRange%>\" class=\"txp_volume_range\">\n      <txpdiv class=\"txp_volume_range_current\" style=\"height:100%\" data-role=\"<%=volumeValue%>\">\n        <txpdiv data-role=\"<%=volumeHandler%>\" class=\"txp_volume_handle\"></txpdiv>\n      </txpdiv>\n    </txpdiv>\n  </txpdiv>\n</button>";
	
	/***/ }
	
	/******/ });
