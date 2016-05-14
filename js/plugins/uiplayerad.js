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
	
		module.exports = __webpack_require__(53);
	
	
	/***/ },
	
	/***/ 53:
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var api = Txplayer.apiList;
		var htmlstr = __webpack_require__(54);
	
		function UiPlayerAd(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		UiPlayerAd.prototype = {
		  init: function(){
		    this.dataset.volume = this.context.config.volume;
		    this.dataset.muteClass = 'txp_btn_ad_mute';
		    this.write();
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  write: function(){
		    var renderData = {
		      hideClass: Txplayer.dataset.hideClass,
		      noSkipTipsText: '为了给腾讯视频用户提供更多优质美剧，应版权方（华纳）要求，好莱坞会员在观看华纳美剧时无法跳过广告（《吸血鬼日记》《破产姐妹》《无耻之徒》等）。我们会为会员用户继续争取免广告权益，请您继续支持，谢谢！',
		      canSkip: 'txp-ui-loadingad-canskip',
		      noSkip: 'txp-ui-loadingad-noskip',
		      linkArea: 'txp-ui-loadingad-linkarea',
		      detail: 'txp-ui-loadingad-detail',
		      adMod: 'txp-ui-loadingad-mod',
		      volume: 'txp-ui-loadingad-volume',
		      time: 'txp-ui-loadingad-time',
		      close: 'txp-ui-loadingad-close',
		      closeText: 'txp-ui-loadingad-closetext',
		      why: 'txp-ui-loadingad-why',
		      pauseAd: 'txp-ui-loadingad-pasuead',
		      pauseAdImg: 'txp-ui-loadingad-pasuead-img',
		      pauseAdClose: 'txp-ui-loadingad-pausead-close',
		      noSkipTips: 'txp-ui-loadingad-no-skip-tips',
		      noSkipTipsClose: 'txp-ui-loadingad-no-skip-tips-close',
		      isSkipAdButtonShow: this.isSkipAdButtonShow()
		    };
		    this.dataset.renderData = renderData;
		    var htmldata = $.tmpl(htmlstr, renderData);
		    this.context.dataset.$playermod.append(htmldata);
		    this.dataset.$ad =this.context.dataset.$playermod.find('[data-role='+renderData.adMod+']');
		    this.dataset.$canSkip =this.context.dataset.$playermod.find('[data-role='+renderData.canSkip+']');
		    this.dataset.$noSkip =this.context.dataset.$playermod.find('[data-role='+renderData.noSkip+']');
		    this.dataset.$linkArea =this.context.dataset.$playermod.find('[data-role='+renderData.linkArea+']');
		    this.dataset.$detail =this.context.dataset.$playermod.find('[data-role='+renderData.detail+']');
		    this.dataset.$volume =this.context.dataset.$playermod.find('[data-role='+renderData.volume+']');
		    this.dataset.$time =this.context.dataset.$playermod.find('[data-role='+renderData.time+']');
		    this.dataset.$close =this.context.dataset.$playermod.find('[data-role='+renderData.close+']');
		    this.dataset.$closeText =this.context.dataset.$playermod.find('[data-role='+renderData.closeText+']');
		    this.dataset.$why =this.context.dataset.$playermod.find('[data-role='+renderData.why+']');
		    this.dataset.$pauseAd =this.context.dataset.$playermod.find('[data-role='+renderData.pauseAd+']');
		    this.dataset.$pauseAdImg =this.context.dataset.$playermod.find('[data-role='+renderData.pauseAdImg+']');
		    this.dataset.$noSkipTips =this.context.dataset.$playermod.find('[data-role='+renderData.noSkipTips+']');
		    this.dataset.$noSkipTipsClose =this.context.dataset.$playermod.find('[data-role='+renderData.noSkipTipsClose+']');
		    this.dataset.$pauseAdClose =this.context.dataset.$playermod.find('[data-role='+renderData.pauseAdClose+']');
		    if (this.dataset.volume===0) this.mute();
		    this.initDisplay();
		  },
		  remove: function(){
		    this.dataset.$ad.remove();
		  },
		  initDisplay: function(){
		    if (!util.isSupportMute()){
		      this.dataset.$volume.addClass(Txplayer.dataset.hideClass);
		    }
		  },
		  hide: function(){
		    this.dataset.$ad.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$canSkip.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$noSkip.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$linkArea.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$detail.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$volume.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$close.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$closeText.addClass(Txplayer.dataset.hideClass);
		    this.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass);
		  },
		  mute: function(){
		    this.dataset.$volume.addClass(this.dataset.muteClass);
		    this.context.msg.run(api.publicApi.mute, {showTips: false});
		  },
		  unMute: function(){
		    this.dataset.$volume.removeClass(this.dataset.muteClass);
		    this.context.msg.run(api.publicApi.unMute, {showTips: false});
		  },
		  openAdLink: function(txpType){
		    if ( !(this.dataset.adinfo && this.dataset.adinfo.link) ) return;
		    window.open(this.dataset.adinfo.link);
		    var config = $.extend({}, this.dataset.adinfo);
		    if (txpType) config.txpType = txpType;
		    this.context.msg.broadcast(api.eventApi.onOpenAdLink, config);
		  },
		  skipAd: function(){
		    this.context.msg.broadcast(api.privateApi.skipAd);
		    this.context.msg.broadcast(api.privateApi.showUiControl,{isMoveBelow:false});
		  },
		  showPauseAd: function(data){
		    if ( !(data && data.length) ) {
		      this.dataset.$ad.addClass(Txplayer.dataset.hideClass);
		      this.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass);
		      return;
		    }
		    data = data[0];
		    this.dataset.adinfo = data;
		    this.dataset.$ad.removeClass(Txplayer.dataset.hideClass);
		    this.dataset.$pauseAd.removeClass(Txplayer.dataset.hideClass);
		    var img, width, height, linkUrl;
		    var that = this;
		    if ($.type(data.image)==='array') data.image = data.image[0];
		    img = data.image.url;
		    width = parseInt(data.image.width);
		    height = parseInt(data.image.height);
		    if ( !(img && img.indexOf('http')===0) )return;
		    this.dataset.$pauseAdImg.attr('src', img).css({
		      width: width,
		      height: height
		    });
		    this.dataset.$pauseAdImg.off('click').on('click', function(){
		      if (data.no_click !=='N') return;
		      if (!data.link) return;
		      that.openAdLink('pauseAd');
		    });
		    this.context.msg.broadcast(api.eventApi.onPuaseAdShow, this.dataset.adinfo);
		  },
		  isSkipAdButtonShow: function(){
		    if (this.context.config && $.type(this.context.config.showOpenVIPGuide)==='function') return true;
		    return false;
		  },
		  showAdUIOnPlaying: function(){
		    var that = this;
		    var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		    if ( !(type==='loadingad' || type==='insertad' || type==='endingad') ) return;
		    that.dataset.isAdCanNotSkip = that.context.msg.run(api.privateApi.isAdCanNotSkip);
		    that.dataset.$ad.removeClass(Txplayer.dataset.hideClass);
		    that.dataset.$detail.removeClass(Txplayer.dataset.hideClass);
		    if (util.isSupportMute()) {
		      that.dataset.$volume.removeClass(Txplayer.dataset.hideClass);
		    }
		    that.dataset.$linkArea.removeClass(Txplayer.dataset.hideClass);
		    if (!that.dataset.isAdCanNotSkip){
		      that.dataset.$canSkip.removeClass(Txplayer.dataset.hideClass);
		      if (that.isSkipAdButtonShow()){
		        that.dataset.$close.removeClass(Txplayer.dataset.hideClass);
		        that.dataset.$closeText.removeClass(Txplayer.dataset.hideClass);
		      }
		    }else{
		      that.dataset.$noSkip.removeClass(Txplayer.dataset.hideClass);
		    }
		    // 第一次播放
		    if (!that.dataset.duration) {
		      that.dataset.duration = that.context.msg.run(api.privateApi.getAdDuration);
		      that.dataset.$time.html(that.dataset.duration);
		    }
		    that.dataset.adinfo = that.context.msg.run(api.privateApi.getCurrentAdInfo);
		    that.dataset.$noSkipTips.addClass(Txplayer.dataset.hideClass);
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.hide();
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.hide();
		    }
		    var isPlayingAd = this.context.msg.run(api.privateApi.isPlayingAd);
		    if (isPlayingAd){
		      that.showAdUIOnPlaying();
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(){
		      var isPlayingAd = that.context.msg.run(api.privateApi.isPlayingAd);
		      if(isPlayingAd) that.showAdUIOnPlaying();
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data){
		      if (data.playListTypeEnd &&
		        (data.playListType==='loadingad' || data.playListType==='insertad')) {
		        that.hide();
		        that.dataset.duration = null;
		        if (that.dataset.volume!==0) that.unMute({showTips: false});
		      }
		      if (data.playListTypeEnd && data.isAllEnd){
		        that.hide();
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(){
		      if (!that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      var currenttime = that.context.msg.run(api.privateApi.getAdCurrentTime);
		      if (!that.dataset.duration) return;
		      that.dataset.$time.html(that.dataset.duration - currenttime);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onPauseAdDataReady)] = function(data){
		      if (data && $.type(data)==='array' && data.length){
		        that.showPauseAd(data);
		      }
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
	
	
		    this.dataset.$close.on('click', function(){
		      var filmDuration = that.context.msg.run(api.publicApi.getDuration);
		      if (filmDuration && filmDuration>0 && filmDuration<180){
		        that.skipAd();
		      }else{
		        if(that.isSkipAdButtonShow()){
		          that.context.config.showOpenVIPGuide();
		        }
		      }
		    });
		    this.dataset.$volume.on('click', function(){
		      if (that.dataset.$volume.hasClass(that.dataset.muteClass)){
		        that.unMute({showTips:false});
		      }else{
		        that.mute({showTips: false});
		      }
		    });
		    this.dataset.$detail.on('click', function(){
		      that.openAdLink();
		    });
		    this.dataset.$linkArea.on('click', function(){
		      that.openAdLink();
		    });
		    this.dataset.$why.on('click', function(){
		      that.context.msg.run(api.privateApi.pauseAd);
		      that.dataset.$noSkipTips.removeClass(Txplayer.dataset.hideClass);
		    });
		    this.dataset.$noSkipTipsClose.on('click', function(){
		      that.context.msg.run(api.privateApi.playAd);
		      that.dataset.$noSkipTips.addClass(Txplayer.dataset.hideClass);
		    });
		    this.dataset.$pauseAdClose.on('click', function(){
		      // that.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass);
		      that.hide();
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.hidePlayAdUI] = function(){
		      that.hide();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
		Txplayer.register('UiPlayerAd', UiPlayerAd);
	
	/***/ },
	
	/***/ 54:
	/***/ function(module, exports) {
	
		module.exports = "<txpdiv data-role=\"<%=adMod%>\" class=\"txp_ad <%=hideClass%>\">\n  <txpdiv class=\"txp_ad_inner\">\n    <a data-role=\"<%=linkArea%>\" href=\"javascript:;\" class=\"txp_ad_link <%=hideClass%>\"></a>\n    <a data-role=\"<%=detail%>\" href=\"javascript:;\" class=\"txp_ad_more <%=hideClass%>\">详情点击<txpdiv class=\"txp_icon_arrow\"></txpdiv></a>\n\n    <txpdiv class=\"txp_ad_control\">\n\n      <txpdiv data-role=\"<%=canSkip%>\" class=\"txp_ad_skip <%=hideClass%>\">\n        <% if(!isSkipAdButtonShow) {%>\n          广告剩余:\n          <txpdiv data-role=\"<%=time%>\" class=\"txp_ad_countdown\"></txpdiv>\n          秒\n        <% } else {%>\n          <txpdiv data-role=\"<%=time%>\" class=\"txp_ad_countdown\"></txpdiv>\n        <% } %>\n        <txpdiv data-role=\"<%=closeText%>\" class=\"txp_ad_skip_text <%=hideClass%>\">跳过广告</txpdiv>\n        <button data-role=\"<%=close%>\" class=\"txp_btn txp_btn_close <%=hideClass%>\" title=\"跳过广告\"></button>\n      </txpdiv>\n\n      <txpdiv data-role=\"<%=noSkip%>\" class=\"txp_ad_skip <%=hideClass%>\">\n        <txpdiv data-role=\"<%=time%>\" class=\"txp_ad_countdown\"></txpdiv>\n        <txpdiv class=\"txp_ad_skip_text\">应版权方的要求，好莱坞会员无法跳过该剧广告</txpdiv>\n        <button data-role=\"<%=why%>\" class=\"txp_btn txp_btn_hint\" title=\"无法跳过广告说明\"></button>\n      </txpdiv>\n\n      <button data-role=\"<%=volume%>\" class=\"txp_btn txp_btn_ad_volume <%=hideClass%>\">\n        <svg class=\"txp_icon txp_icon_volume\" version=\"1.1\" viewBox=\"0 0 24 24\">\n          <use class=\"txp_svg_volume\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume\"></use>\n          <use class=\"txp_svg_volume_mute\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#txp_svg_volume_mute\"></use>\n        </svg>\n      </button>\n    </txpdiv>\n\n    <txpdiv data-role=\"<%=noSkipTips%>\" class=\"txp_ad_dialog <%=hideClass%>\">\n      <txpdiv class=\"txp_dialog_bd\"><%=noSkipTipsText%></txpdiv>\n      <txpdiv data-role=\"<%=noSkipTipsClose%>\" class=\"txp_ad_btn\">我知道了!</txpdiv>\n      <a target=\"_blank;\" class=\"txp_ad_fb\" href=\"http://support.qq.com/write.shtml?fid=850\">意见反馈</a>\n      <button data-role=\"<%=noSkipTipsClose%>\" class=\"txp_btn txp_btn_close\"></button>\n    </txpdiv>\n  </txpdiv>\n\n  <!-- 左下广告位： 135*80 -->\n  <txpdiv class=\"txp_ad_corner <%=hideClass%>\">\n    <!-- 广告图片 -->\n    <img alt=\"\">\n  </txpdiv>\n\n  <!-- 中间广告位： 400*300 -->\n  <txpdiv data-role=\"<%=pauseAd%>\" class=\"txp_ad_center <%=hideClass%>\">\n    <button data-role=\"<%=pauseAdClose%>\" class=\"txp_btn txp_btn_close txp_btn_close_ad\" title=\"跳过广告\"></button>\n    <img data-role=\"<%=pauseAdImg%>\" alt=\"\">\n  </txpdiv>\n\n  <!-- 底部广告位： 480*70 -->\n  <txpdiv class=\"txp_ad_bottom <%=hideClass%>\">\n    <!-- 广告图片 -->\n    <img alt=\"\">\n  </txpdiv>\n\n  <!-- 底部广告位： 960*60 -->\n  <txpdiv class=\"txp_ad_bottom_lg <%=hideClass%>\">\n    <img alt=\"\">\n  </txpdiv>\n\n</txpdiv>";
	
	/***/ }
	
	/******/ });
