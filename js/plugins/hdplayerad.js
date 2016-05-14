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
	
		module.exports = __webpack_require__(25);
	
	
	/***/ },
	
	/***/ 25:
	/***/ function(module, exports) {
	
		/**
		 * mobile 前贴广告
		 */
		var $ = Txplayer.$;
		var api = Txplayer.apiList;
		var util = Txplayer.util;
	
		var insertAdStatusMap = {
		  'not-start': 0,
		  'request-cgi': 1,
		  'request-cgi-done': 1.1,
		  'playing': 2,
		  'play-end': 3
		};
		var adtypeMap = {
		  '前贴': 'WL',
		  '中插': 'WC',
		  '后贴': 'WH',
		  '暂停': 'WZ'
		};
		function HdPlayerAd(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		HdPlayerAd.prototype = {
		  init: function(){
		    this.dataset.dataKey = Txplayer.dataset.localStorageKey.adRfid;
		    this.addEventListener();
		    this.exportsModuleApis();
		  },
		  getExtentionPlatform: function(){
		    if (util.os.iphone){
		      return 'iphone';
		    }else if (util.os.ipad){
		      return 'ipad';
		    }else if(util.os.android){
		      return 'android';
		    }else if (util.os.mac) {
		      return 'mac';
		    }
		  },
		  noAd4Advertisers: function(){
		    return Txplayer.util.getUrlParam('oid')==='700700700';
		  },
		  requestCgi: function(options){
		    options = options || {};
		    var cgi = 'http://livew.l.qq.com/livemsg?',
		      defer = $.Deferred(),
		      that = this,
		      rfid = util.getData(this.dataset.dataKey);
	
		    if (!options.adType) {
		      util.showError('请求广告cgi参数错误, adType必须传');
		      return;
		    }
		    if (location.protocol==='https:') cgi = 'https://livew.l.qq.com/livemsg?';
		    var notifyEmptyAd = function(){
		      if (options.adType===adtypeMap['前贴']) {
		        that.context.msg.broadcast(api.eventApi.onLoadingadIsEmpty);
		      }
		    };
		    if (this.noAd4Advertisers() &&
		      options.adType===adtypeMap['前贴']){
		      notifyEmptyAd();
		      return;
		    }
		    // 中插、暂停、后贴就不请求数据了
		    if (this.noAd4Advertisers()){
		      return;
		    }
		    if (that.context.config && $.type(that.context.config.getUserType)==='function') {
		      that.dataset.pu = that.context.config.getUserType();
		    }
		    var cgi_params = {
		      pf: 'H5',
		      ad_type: options.adType,
		      pf_ex: this.getExtentionPlatform(),
		      url: location.href,
		      ty: "web",
		      plugin: "1.0.0",
		      v: Txplayer.dataset.ver,
		      coverid: '',
		      vid: this.context.config.vid,
		      vptag: "",
		      pu: that.dataset.pu || '-1',
		      // 接口合并
		      adaptor: 1,
		      dtype: 1,
		      // 是否是直播，0/1
		      live:0,
		      // 随机数，防止缓存
		      _time_random: (+new Date())
		    };
		    if (options.hasOwnProperty('zcindex')) cgi_params.zcindex = options.zcindex;
		    if (options.adType===adtypeMap['前贴'] && rfid) cgi_params.rfid = rfid;
		    var adChid = util.getAdChannelId();
		    if (adChid) cgi_params.chid = adChid;
		    // 微信登录跳过广告
		    if (util.cookie.get('main_login')==='wx') {
		      cgi_params.uid = util.cookie.get('vuserid');
		      cgi_params.tkn = util.cookie.get('vusession');
		      cgi_params.lt = 'wx';
		    }
		    cgi += $.param(cgi_params);
		    $.ajax({
		      url: cgi,
		      dataType: 'xml',
		      type: 'GET',
		      cache: false,
		      timeout: 8000,
		      xhrFields: {
		        withCredentials: true
		      }
		    })
		    .done(function(data){
		      var json;
		      try{
		        json = util.xml2json(data);
		        json = json['#document'].root;
		      }catch(e){
		        // 待上报
		        util.showError('解析广告数据异常',e);
		        that.context.msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		          msg: e.message,
		          code: '3000',
		          stack: e.stack
		        });
		      }
		      if (!json) {
		        notifyEmptyAd();
		        return;
		      }
		      that.dataset.adJson = json;
		      // 禁止跳过广告
		      if (json.adLoc && (json.adLoc.adFlag+'')==='1') that.dataset.forbiddenSkip = true;
		      if (!(json && json.adList && json.adList.item)) {
		        notifyEmptyAd();
		        return;
		      }
		      that.dataset.adList = [];
		      if ($.isArray(json.adList.item)) {
		        that.dataset.adList = json.adList.item;
		      } else if (json.adList.item.image) {
		        that.dataset.adList.push(json.adList.item);
		      }
		      if (options.adType===adtypeMap['暂停']) {
		        that.dataset.adList = that.filterPauseAd(that.dataset.adList);
		      }else{
		        that.dataset.adList = that.filter(that.dataset.adList);
		      }
		      // 无广告的请求
		      if (that.dataset.adList.length === 0) {
		        notifyEmptyAd();
		        return;
		      }
		      // 记录中插广告 开始时间数据
		      if (options.adType===adtypeMap['前贴']) {
		        that.recordInsertAdStartTime(json.adLoc.breakTime);
		        that.context.msg.broadcast(api.eventApi.onLoadingAdDataReady, that.dataset.adList);
		      }
		      if (options.adType===adtypeMap['后贴']) {
		        that.context.msg.broadcast(api.eventApi.onEndingAdDataReady, that.dataset.adList);
		      }
		      if (options.adType===adtypeMap['中插']) {
		        that.updateInsertAdListStatus(that.dataset.currentInsertAdPoint, insertAdStatusMap['request-cgi-done']);
		        that.context.msg.broadcast(api.eventApi.onInsertAdDataReady, {
		          data: that.dataset.adList,
		          insertTime: that.dataset.currentInsertAdPoint
		        });
		      }
		      if (options.adType===adtypeMap['暂停']) {
		        that.context.msg.broadcast(api.eventApi.onPauseAdDataReady, that.dataset.adList);
		      }
		      defer.resolve();
		    })
		    .fail(function(xhr, err){
		      var msg;
		      if (xhr.status===404){
		        msg = '检测广告被屏蔽';
		      }else{
		        msg = xhr.status;
		      }
		      util.showError('广告请求失败', msg+'-'+err);
		      if (options.adType===adtypeMap['前贴']) {
		        that.context.msg.broadcast(api.eventApi.onLoadingAdRequestError, {
		          code: xhr.status,
		          msg: msg
		        });
		      }
		      defer.reject();
		    });
		    return defer;
		  },
		  filter: function(list){
		    var retArr = [],
		      idx, len, item;
		    list = $.isArray(list) ? list : [];
		    for (idx = 0, len = list.length; idx < len; idx++) {
		      item = list[idx] || {};
		      item.oIdx = idx + 1;
		      if (item && item.image && item.duration > 0) {
		        item.image = ($.isArray(item.image) ? item.image[0] : item.image) || {};
		        if (item.image && (item.image.url || item.image.vid)) {
		          // 如果是非空订单则加入到待播放队列
		          // no_click值为Y时表示当前广告不可点击，将其链接置为空
		          item.link = (item.no_click === "Y") ? "" : item.link;
		          retArr.push(item);
		          continue;
		        }
		      }
		    }
		    return retArr;
		  },
		  filterPauseAd: function(list){
		    var ret = [];
		    $(list).each(function(idx, item){
		      if (item && item.image){
		        if ($.type(item.image)==='array') item.image = item.image[0];
		        if (item.image && item.image.width && item.image.height && item.image.url){
		          ret.push(item);
		        }
		      }
		    });
		    return ret;
		  },
		  recordInsertAdStartTime: function(data){
		    if (!data || !data.hasOwnProperty('t')) return;
		    var that = this, times = [];
		    if ($.type(data.t)==='string') times = [data.t];
		    else times = data.t;
		    this.dataset.insertAdList = [];
		    $(times).each(function(idx, item){
		      that.dataset.insertAdList.push({
		        startTime: parseInt(item),
		        status: insertAdStatusMap['not-start']
		      });
		    });
		  },
		  startInsertAd: function(currentTime){
		    if (!currentTime) return;
		    currentTime = parseInt(currentTime);
		    var inTimeArea = false, that = this;
		    var checkInTimeArea = function(adTime){
		      return currentTime <= (adTime+15) && currentTime>=(adTime-15);
		    };
		    $(this.dataset.insertAdList).each(function(idx, item){
		      if (checkInTimeArea(item.startTime) &&
		        parseInt(item.status)===insertAdStatusMap['not-start']) {
		        that.dataset.currentInsertAdPoint = item.startTime;
		        inTimeArea = true;
		        return false;
		      }
		    });
		    if (!inTimeArea) return;
		    this.requestCgi({
		      adType: adtypeMap['中插'],
		      zcindex: 0
		    });
		    this.updateInsertAdListStatus(that.dataset.currentInsertAdPoint, insertAdStatusMap['request-cgi']);
		  },
		  updateInsertAdListStatus: function(time, status){
		    if (!time || !status) return;
		    $(this.dataset.insertAdList).each(function(idx, item){
		      if (item.startTime===time) {
		        item.status = status;
		        return false;
		      }
		    });
		  },
		  getAdCurrentTime: function(){
		    if ( !this.context.msg.run(api.privateApi.isPlayingAd) ) return 0;
		    var type = this.context.msg.run(api.privateApi.getCurrentPlayListType);
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, type);
		    var currentTime = this.context.msg.run('getFocusVideoCurrentTime');
		    var timeCount = 0;
		    var totleTime = 0;
		    $(this.dataset.adList).each(function(idx, item){
		      if (idx===index) return false;
		      if (!item.duration) return;
		      timeCount += parseInt(item.duration,10)/1000;
		    });
		    totleTime = currentTime + timeCount;
		    return parseInt(totleTime);
		  },
		  getAdDuration: function(){
		    if ( !this.context.msg.run(api.privateApi.isPlayingAd) ) return 0;
		    var timeCount = 0;
		    $(this.dataset.adList).each(function(idx, item){
		      if (!item.duration) return;
		      timeCount += parseInt(item.duration,10)/1000;
		    });
		    return timeCount;
		  },
		  getCurrentAdInfo: function(){
		    if ( !this.context.msg.run(api.privateApi.isPlayingAd) ) return {};
		    var type = this.context.msg.run(api.privateApi.getCurrentPlayListType);
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, type);
		    var data;
		    if (this.dataset.adList && this.dataset.adList[index]) {
		      data = this.dataset.adList[index];
		    }
		    if (!data) return {};
		    return data;
		  },
		  isAdCanNotSkip: function(){
		    if ( this.dataset.adJson && this.dataset.adJson.adLoc && this.dataset.adJson.adLoc.adFlag==='1' ) return true;
		    return false;
		  },
		  pauseAd: function(){
		    this.context.msg.broadcast(api.privateApi.setFocusVideoPause);
		  },
		  playAd: function(){
		    this.context.msg.broadcast(api.privateApi.setFocusVideoPlay);
		  },
		  skipAd: function(){
		    // var adCount = this.context.msg.run(api.privateApi.calcTotalPlaylist, 'loadingad');
		    // if (adCount!==1) return false;
		    var duration = this.context.msg.run(api.publicApi.getDuration);
		    if (duration>180) return false;
		    this.context.msg.broadcast(api.privateApi.clearPlaylist,'loadingad');
		    this.context.msg.broadcast(api.privateApi.clearFocusVideoUrl);
		    this.context.msg.broadcast(api.privateApi.play);
		  },
		  getPlayAdJsonData: function(){
		    return this.dataset.adJson;
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.startInsertAd( that.context.msg.run(api.publicApi.getCurrentTime) );
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data){
		      if (data.playListTypeEnd && data.playListType==='loadingad') {
		        that.dataset.isPlayingAd = false;
		        that.context.msg.broadcast(api.eventApi.onLoadingAdEnded);
		        // 保存rfid
		        if (that.dataset.adJson && that.dataset.adJson.adLoc && that.dataset.adJson.adLoc.rfid) {
		          util.setData(that.dataset.dataKey, that.dataset.adJson.adLoc.rfid);
		        }
		      }else if (data.playListTypeEnd && data.playListType==='insertad') {
		        that.dataset.isPlayingAd = false;
		        that.updateInsertAdListStatus(that.dataset.currentInsertAdPoint, insertAdStatusMap['play-end']);
		        that.context.msg.broadcast(api.eventApi.onInsertAdEnded);
		      }
		      // 广告播放完
		      if (data.playListTypeEnd && data.playListType!=='film'){
		        that.context.msg.broadcast(api.privateApi.showUiControl,{isMoveBelow:false});
		        that.context.userMsg.broadcast(api.eventApi.onAdEnd, {
		          type: data.playListType
		        });
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data){
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      if (type==='loadingad' && !that.dataset.loadingAdHasPlayed) {
		        that.context.msg.broadcast(api.eventApi.onLoadingAdStart);
		        that.context.userMsg.broadcast(api.eventApi.onAdStart, {
		          type: type
		        });
		        that.dataset.loadingAdHasPlayed = true;
		      }else if(type === 'insertad' && !that.dataset.insertAdHasPlayed){
		        that.context.msg.broadcast(api.eventApi.onInsertAdStart);
		        that.context.userMsg.broadcast(api.eventApi.onAdStart, {
		          type: type
		        });
		        that.dataset.insertAdHasPlayed = true;
		      }else if(type === 'endingad' && !that.dataset.endingAdHasPlayed){
		        that.context.msg.broadcast(api.eventApi.onEndingAdStart);
		        that.context.userMsg.broadcast(api.eventApi.onAdStart, {
		          type: type
		        });
		        that.dataset.endingAdHasPlayed = true;
		      }
		      if (type!=='film'){
		        that.context.msg.broadcast(api.privateApi.hideUiControl, {isMoveBelow:false});
		        that.context.msg.broadcast(api.privateApi.hidePlayerUiTools);
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data){
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      if (type!=='film') return;
		      if ( that.context.msg.run(api.privateApi.isTheLastOfPlayList, type) && !that.dataset.hasRequestEndingAdData) {
		        that.dataset.hasRequestEndingAdData = true;
		        that.requestCgi({adType: adtypeMap['后贴']});
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(data){
		      // 判断是否是广告
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      that.dataset.isPlayingAd = (type !== 'film');
	
		      // 播放广告，隐藏控制栏
		      if (type!=='film'){
		        that.context.msg.broadcast(api.privateApi.hideUiControl, {isMoveBelow:false});
		        that.context.msg.broadcast(api.privateApi.hidePlayerUiTools);
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data){
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      that.dataset.isPlayingAd = (type !== 'film');
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onUserPausePlayer)] = function(){
		      if (that.dataset.isPlayingAd) return;
		      that.context.msg.broadcast(api.privateApi.requestPauseAd);
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data){
		      if (data.playListTypeEnd && data.isAllEnd){
		        that.dataset.isPlayingAd = false;
		        that.dataset.hasRequestGetinfo = false;
		        that.dataset.hasRequestEndingAdData = false;
		      }
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onGetVideoUrlSuccess)] = function(){
		      var isPlayingAd = that.dataset.isPlayingAd;
		      if (that.dataset.hasRequestGetinfo) {
		        that.dataset = {};
		        if (isPlayingAd) that.dataset.isPlayingAd = true;
		      }
		      that.dataset.hasRequestGetinfo = true;
		    }
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onError)] = function(data){
		      if (data && data.type==='film') return;
		      var type = that.context.msg.run(api.privateApi.getCurrentPlayListType);
		      var isLast = that.context.msg.run(api.privateApi.isTheLastOfPlayList, type);
		      var isEnd = that.context.msg.run(api.privateApi.isTheLastOfPlayList);
		      if (isLast){
		        that.dataset.isPlayingAd = false;
		        that.context.msg.broadcast(api.privateApi.clearPlaylist, type);
		        that.context.msg.broadcast(api.privateApi.hidePlayAdUI);
		      }
		      that.context.msg.broadcast(api.eventApi.onLoadingAdPlayError, {
		        isLastAd: isLast
		      });
		    }
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.privateApis[api.privateApi.pauseAd] = function(data, options){
		      that.pauseAd();
		    }
		    this.dataset.privateApis[api.privateApi.playAd] = function(data, options){
		      that.playAd();
		    }
		    this.dataset.privateApis[api.privateApi.isAdCanNotSkip] = function(data, options){
		      options.data = that.isAdCanNotSkip();
		    }
		    this.dataset.privateApis[api.privateApi.getCurrentAdInfo] = function(data, options){
		      options.data = that.getCurrentAdInfo();
		    }
		    this.dataset.privateApis[api.privateApi.getAdDuration] = function(data, options){
		      options.data = that.getAdDuration();
		    }
		    this.dataset.privateApis[api.privateApi.getAdCurrentTime] = function(data, options){
		      options.data = that.getAdCurrentTime();
		    }
		    this.dataset.privateApis[api.privateApi.isPlayingAd] = function(data, options){
		      options.data = !!that.dataset.isPlayingAd;
		    }
		    this.dataset.privateApis[api.privateApi.getPlayAdJsonData] = function(data, options){
		      options.data = that.getPlayAdJsonData();
		    }
		    this.dataset.privateApis[api.privateApi.requestLoadingAd] = function(){
		      that.requestCgi({adType: adtypeMap['前贴']});
		    }
		    this.dataset.privateApis[api.privateApi.requestPauseAd] = function(){
		      that.requestCgi({adType: adtypeMap['暂停']});
		    }
		    this.dataset.privateApis[api.privateApi.skipAd] = function(){
		      that.skipAd();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('HdPlayerAd', HdPlayerAd);
	
	/***/ }
	
	/******/ });
