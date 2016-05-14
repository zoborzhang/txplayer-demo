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
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(14);
	
	
	/***/ },
	/* 1 */,
	/* 2 */,
	/* 3 */,
	/* 4 */,
	/* 5 */,
	/* 6 */,
	/* 7 */,
	/* 8 */,
	/* 9 */,
	/* 10 */,
	/* 11 */,
	/* 12 */,
	/* 13 */,
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * html5 高清播放器控制器
		 */
		var GetVideoInfo  = __webpack_require__(15);
		var $             = Txplayer.$;
		var api           = Txplayer.apiList;
		var util          = Txplayer.util;
		var Auth          = __webpack_require__(20);
	
	
		function H5PlayerControl(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		H5PlayerControl.prototype = {
		  init: function(){
		    this.dataset.hasVideoPlayed = false;
		    this.dataset.playerId = this.context.config.playerId;
		    this.dataset.vid = this.context.config.vid;
		    this.dataset.nextVid = this.context.config.nextVid;
		    var config = {
		      vid: this.context.config.vid,
		      charge: this.context.config.isNeedPay ? 1: 0
		    };
		    var context = {
		      msg: this.msg,
		      superMsg: this.context.msg,
		      config: config,
		      dataset: this.dataset,
		      sdtfrom: util.getStdfrom(),
		      guid: this.context.msg.run(api.publicApi.getUserId)
		    };
		    if (this.context.config.playerType==='ipadh5') {
		      context.defn = 'mp4';
		    }
		    this.dataset.vid = this.context.config.vid;
		    this.dataset.isNeedPay = this.context.config.isNeedPay;
		    this.dataset.autoplay = this.context.config.autoplay;
		    this.dataset.playStartTime = this.context.config.playStartTime;
		    this.dataset.skipPrelude = this.context.config.skipPrelude;
		    this.getinfo = new GetVideoInfo(context);
		    this.addEventListener();
		    this.exportsModuleApis();
		    if (this.dataset.autoplay || util.os.ios) {
		      this.play({
		        nextVid: this.dataset.nextVid,
		        vid: this.dataset.vid
		      });
		    }
		  },
		  play: function(options){
		    if ($.type(options)==='undefined') {
		      options = {};
		      // 已经播放过，继续播放
		      if (this.dataset.hasVideoPlayed) {
		        this.context.msg.broadcast(api.privateApi.setFocusVideoPlay);
		        return;
		      }
		      // 没有播放过，先请求是否有广告
		      if (!this.context.msg.listenerCount(api.privateApi.requestLoadingAd)){
		        this.loadVideoUrls({autoplay: this.dataset.autoplay});
		        this.context.msg.broadcast(api.eventApi.onPlayStart);
		        return;
		      }
		      if (this.dataset.hasLoadVideoUrl) {
		        this.context.msg.broadcast(api.privateApi.play);
		        return;
		      }
		    }
		    if ($.type(options)==='object' && !options.vid && this.dataset.hasLoadVideoUrl){
		      this.context.msg.broadcast(api.privateApi.play);
		      return;
		    }
		    if(this.dataset.hasRequestLoadingAdData){
		      this.context.msg.broadcast(api.privateApi.play);
		      return;
		    }
		    if ($.type(options)==='string'){
		      options = {
		        vid: options,
		        autoplay: true
		      }
		    }else if($.type(options)==='object' && !options.vid){
		      if (!options.nextVid) options = {};
		    }
		    if (options.hasOwnProperty('vid')) this.setVid(options.vid);
		    if (options.hasOwnProperty('autoplay')) this.dataset.autoplay = options.autoplay;
		    if (options.hasOwnProperty('isNeedPay')) this.dataset.isNeedPay = options.isNeedPay;
		    if (options.hasOwnProperty('nextVid')) this.dataset.nextVid = options.nextVid;
		    if (options.hasOwnProperty('bullet')) this.dataset.bullet = options.bullet;
		    if (options.hasOwnProperty('bulletId')) this.dataset.bulletId = options.bulletId;
		    if (options.hasOwnProperty('playStartTime')) this.dataset.playStartTime = options.playStartTime;
		    if (options.hasOwnProperty('playEndTime')) this.dataset.playEndTime = options.playEndTime;
		    if (options.hasOwnProperty('defaultDefinition')) this.dataset.defaultDefinition = options.defaultDefinition;
		    this.dataset.hasVideoPlayed = false;
		    this.dataset.hasLoadVideoUrl = false;
		    this.dataset.isLoadingAdEmpty = null;
		    // if (this.dataset.hasVideoPlayed){
		    //   this.dataset.playerId = util.createGUID();
		    // }
		    this.context.msg.broadcast(api.privateApi.clearPlaylist);
		    this.context.msg.broadcast(api.privateApi.clearFocusVideoUrl);
		    this.context.msg.broadcast(api.eventApi.onPlayStart);
		    this.context.msg.broadcast(api.privateApi.requestLoadingAd);
		    this.context.msg.broadcast(api.publicApi.setNextVid, options.nextVid);
		    this.dataset.hasRequestLoadingAdData =true;
		  },
		  pause: function(){
		    if (this.context.msg.run('isPlayingAd')) return;
		    this.context.msg.broadcast(api.privateApi.setFocusVideoPause);
		  },
		  setVid: function(vid){
		    if (!vid) return;
		    if (vid===this.dataset.vid) return;
		    this.dataset.vid = vid;
		    this.context.msg.broadcast(api.eventApi.onVidChange, vid);
		  },
		  getVid: function(){
		    return this.dataset.vid;
		  },
		  getSkipPreludeTime: function(){
		    var playStartTime;
		    if (this.context.msg.listenerCount(api.privateApi.isSkipPrelude) && !this.context.msg.run(api.privateApi.isSkipPrelude) ){
		      playStartTime = 0;
		    }else if(!this.dataset.skipPrelude){
		      playStartTime = 0;
		    }else{
		      playStartTime = this.dataset.playStartTime
		    }
		    return playStartTime;
		  },
		  seekTo: function(time){
		    this.context.msg.broadcast(api.privateApi.setFocusVideoCurrentTime, {
		      time: time,
		      autoplay: true
		    });
		  },
		  // 获取视频时长信息
		  getDuration: function(){
		    if ( !(this.dataset.cgiData && this.dataset.cgiData.preview) ) return 0;
		    var duration = this.dataset.cgiData.preview;
		    return duration;
		  },
		  getCurrentTime: function(){
		    if (this.context.msg.run('isPlayingAd')) {
		      return 0;
		    }
		    var currentTime = this.context.msg.run(api.privateApi.getFocusVideoCurrentTime);
		    return parseInt(currentTime);
		  },
		  loadVideoUrls: function(options){
		    options = options || {};
		    this.dataset.hasLoadVideoUrl = true;
		    var that = this;
		    var msgName = api.eventApi.onGetVideoUrlSuccess + '.loadVideoUrls';
		    var config = {};
		    this.context.msg.once(msgName, function(videoFirstPartUrl){
		      if(videoFirstPartUrl){
		        that.context.msg.broadcast(api.privateApi.addUrls2Player, [{
		          url: videoFirstPartUrl,
		          type: 'film'
		        }]);
		        if (options.autoplay) {
		          that.context.msg.emit(api.privateApi.play, videoFirstPartUrl);
		        }
		      }
		    });
		    config = $.extend({},{
		      vid: options.vid,
		      charge: options.charge,
		      autoplay: options.autoplay
		    });
		    var requestURL = function(){
		      delete config.autoplay;
		      that.requestVideoUrlsByVid(config);
		    };
		    this.auth = new Auth();
		    this.auth({
		      vid: this.dataset.vid
		    }).done(function(data){
		      if (data && data.cgi){
		        config.cgi = data.cgi;
		      }
		      if (data && data.param){
		        config = $.extend(config, data.param);
		      }
		      requestURL();
		    }).fail(function(){
		      requestURL();
		    });
		  },
		  requestVideoUrlsByVid: function(options){
		    options = options || {};
		    var config = {
		      vid: this.dataset.vid,
		      charge: this.dataset.isNeedPay ? 1: 0
		    };
		    var that = this;
		    $.extend(config, options);
		    this.context.msg.broadcast(api.eventApi.onGetinfoStart);
		    this.getinfo.getMobileVideoUrlByVid(config).done(function(videoFirstPartUrl, getinfoJSON){
		      that.dataset.cgiData = getinfoJSON;
		      that.context.msg.broadcast(api.eventApi.onGetinfoEnded);
		      that.context.msg.broadcast(api.eventApi.onGetVideoUrlSuccess, videoFirstPartUrl);
		    }).fail(function(data){
	
		    });
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onLoadingAdDataReady)] = function(data){
		      if (!data || $.type(data)!=='array' || !data.length) {
		        return;
		      }
		      var adUrls = [];
		      $(data).each(function(idx, item){
		        var filesize = $.type(item.image)==='array' ? item.image[0].cs : item.image.cs;
		        if (item.image.url) adUrls.push({
		          url: item.image.url,
		          type:'loadingad',
		          data: {
		            bytesTotal: filesize
		          }
		        });
		      });
		      if (adUrls.length===0) {
		        return;
		      }
		      that.dataset.isLoadingAdEmpty = false;
		      that.context.msg.broadcast(api.privateApi.addUrls2Player, adUrls);
		      that.context.msg.broadcast(api.privateApi.play);
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onLoadingadIsEmpty)] = function(){
		      that.dataset.isLoadingAdEmpty = true;
		      var config = {autoplay: true};
		      config.playStartTime = that.getSkipPreludeTime();
		      that.loadVideoUrls(config);
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data){
		      if (that.context.msg.run(api.privateApi.getCurrentPlayListType)==='film') {
		        that.dataset.hasVideoPlayed = true;
		        that.dataset.hasRequestLoadingAdData=false;;
		      }else{
		        if (that.dataset.isLoadingAdEmpty) return;
		        if (that.dataset.hasLoadVideoUrl) return;
		        that.loadVideoUrls();
		      }
		    }
	
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  },
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.moduleApis = {};
	
		    this.dataset.moduleApis[api.publicApi.getPlayerId] = function(data, options){
		      options.data = that.dataset.playerId;
		    }
		    this.dataset.moduleApis[api.publicApi.getVid] = function(data, options){
		      options.data = that.getVid();
		    }
		    this.dataset.moduleApis[api.publicApi.getDuration] = function(data, options){
		      options.data = that.getDuration();
		    }
		    this.dataset.moduleApis[api.publicApi.getCurrentTime] = function(data, options){
		      options.data = that.getCurrentTime();
		    }
		    this.dataset.moduleApis[api.publicApi.pause] = function(data, options){
		      that.pause();
		    }
		    this.dataset.moduleApis[api.publicApi.play] = function(data){
		      if (!data) data = {};
		      if ($.type(data)==='object' && !data.nextVid) data.nextVid = that.dataset.nextVid;
		      that.play(data);
		    }
		    this.dataset.moduleApis[api.publicApi.seekTo] = function(data){
		      that.seekTo(data);
		    }
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
	
		    this.dataset.privateApis[api.privateApi.getVideoInfoData] = function(data, options){
		      options.data = that.dataset.cgiData;
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
		}
	
		Txplayer.register('H5PlayerControl',H5PlayerControl);
	
	/***/ },
	/* 15 */
	/***/ function(module, exports, __webpack_require__) {
	
		var qvsec = __webpack_require__(16);
		var $ = Txplayer.$;
		var TizenAuth = __webpack_require__(17);
		var playerdefine = __webpack_require__(19);
		var definitionMap = playerdefine.definitionMap;
		var util = Txplayer.util;
		function GetVideoInfo(context){
		  this.context = context;
		  this.dataset = {};
		}
		GetVideoInfo.prototype = {
		  // for tizen
		  // 通过vid和鉴权的ckey获取视频的hls播放地址
		  getVideoHlsByVid: function(options){
		    if (!this._tizenauth) {
		      this._tizenauth = new TizenAuth(options);
		    }
		    var defer = $.Deferred();
		    var that = this;
		    var getKeyConfig = {
		      vid: options.vids
		    };
		    if (options.svrtime) getKeyConfig.svrtime = options.svrtime;
		    if (!options.retryTimes) options.retryTimes = 0;
		    this._tizenauth.getVkey(getKeyConfig)
		    .done(function(data){
		      if ( !(data && data.originalEvent && data.originalEvent.data) ){
		        defer.reject();
		        return ;
		      }
		      var config = $.extend({}, options);
		      config.cKey = data.originalEvent.data;
		      that.requestVideoHlsByVid(config)
		      .done(function(hlsUrls, definitionList,logoData, jsonData){
		        if (hlsUrls && hlsUrls.length) {
		          defer.resolve(hlsUrls, definitionList,logoData, jsonData);
		        }else{
		          defer.reject();
		        }
		      })
		      .fail(function(opt){
		        if ($.type(opt)==='object' && opt.code===-1 && opt.svrtime) {
		          if (options.retryTimes!==0) {
		            defer.reject({
		              code: '10002',
		              msg: '获取播放地址失败'
		            });
		            return;
		          }
		          options.retryTimes ++;
		          options.svrtime = opt.svrtime;
		          that.getVideoHlsByVid(options);
		        }
		      });
		    })
		    .fail(function(){
	
		    });
		    return defer;
		  },
		  // for tizen
		  // do cgi request
		  requestVideoHlsByVid: function(options){
		    var cfg = {
		      charge: 0,
		      vids: "",
		      fmt: "auto",
		      otype: "json",
		      dtype: 3, //返回hls播放地址
		      platform: '10601',
		      sphls: 1,
		      host: window != top ? document.referrer : document.location.host
		    };
		    var conf = {
		      cKey: options.cKey,
		      encryptVer: '4.1',
		      vids: options.vids,
		      defn: options.fmt
		    };
		    var params = $.extend(cfg, conf);
		    var cgi = 'http://h5vv.video.qq.com/getvinfo?callback=?';
		    if (location.protocol==='https:'){
		      cgi = 'https://sec.video.qq.com/p/h5vv.video/getvinfo?callback=?';
		    }
		    var that = this;
		    var defer = $.Deferred();
		    this.dataset.videoFormat = params.fmt;
		    this.dataset.vid = params.vids;
		    this.dataset.platform = params.platform;
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: "jsonp",
		      jsonpCallback: Txplayer.util.getJsonpCallbackName('getvinfo')
		    }).done(function(data){
		      if (!data) {
		        defer.reject();
		        return;
		      }
		      if (data && (data.em+'')==='85' && data.type===-3 && data.curTime) {
		        defer.reject({
		          code: -1,
		          svrtime: data.curTime
		        });
		        return;
		      }
		      var hlsUrls = that.getHlsFromData(data);
		      var hlsDefinitionList = that.getDefinitionListFromData(data);
		      var logoData = that.getLogoPositionFromData(data);
		      if (!(hlsUrls && hlsUrls.length)) {
		        defer.reject({
		          code: '10003',
		          msg: 'getvinfo 数据异常'
		        });
		        return;
		      }
		      defer.resolve(hlsUrls,hlsDefinitionList,logoData, data);
		    });
		    return defer;
		  },
		  // for tizen
		  // 从cgi data里获logo坐标数据
		  getLogoPositionFromData: function(data){
		    if ( data.s ==='o' &&
		      data.vl &&
		      data.vl.vi &&
		      $.type(data.vl.vi) === 'array' &&
		      data.vl.vi[0] &&
		      data.vl.vi[0].ll &&
		      data.vl.vi[0].ll.li &&
		      $.type(data.vl.vi[0].ll.li)==='array' &&
		      data.vl.vi[0].ll.li[0]
		    ) {
		      return data.vl.vi[0].ll.li[0];
		    }
		    return {};
		  },
		  // for tizen
		  // 从cgi data里获取清晰度列表
		  getDefinitionListFromData: function(data){
		    var list=[];
		    if ( data.s ==='o' &&
		      data.fl &&
		      data.fl.fi &&
		      $.type(data.fl.fi) === 'array' &&
		      data.fl.fi.length &&
		      data.fl.fi[0] ) {
		      for(var i=0, len = data.fl.fi.length; i<len; i++){
		        if (data.fl.fi[i].name in definitionMap) {
		          list.push({
		            name: data.fl.fi[i].name,
		            cname: data.fl.fi[i].cname,
		            sl: data.fl.fi[i].sl,
		            format: data.fl.fi[i].id,
		            lmt: data.fl.fi[i].lmt
		          });
		        }
		      }
		    }
		    return list;
		  },
	
	
		  // 从cgi数据里拼接hls地址
		  getHlsFromData: function(data){
		    var hls = [];
		    if (data.dltype===3 &&
		      data.s ==='o' &&
		      data.vl &&
		      data.vl.vi &&
		      data.vl.vi.length &&
		      data.vl.vi[0] &&
		      data.vl.vi[0].ul &&
		      data.vl.vi[0].ul.ui &&
		      data.vl.vi[0].ul.ui.length) {
		      $.each(data.vl.vi[0].ul.ui, function(idx, item){
		        if (item.url && item.hls && item.hls.pt) {
		          hls.push(item.url + item.hls.pt);
		        }
		      });
		    }
		    return hls;
		  },
		  // 检查getinfo的数据是否合法
		  /**
		   * 检查getinfo的数据是否合法
		   * @param  {Object} data getinfo返回的数据
		   * @return {Number}
		   *  1: ok
		   * -1: 鉴权重试
		   * -2: 不鉴权重试
		   */
		  checkGetInfoData: function(data){
		    if (!data) {
		      return false;
		    }
		    // 返回不正常
		    if (data && data.em !==0 && data.s !== 'o') {
		      // em=85,qq浏览器鉴权失败
		      if (data.em === 85 && data.type === -3) {
		        // auth retry
		        return -1;
		      }
		      // no auth retry
		      return -2;
		    }
		    return 1;
		  },
		  // 返回码错误整理
		  checkGetinfoRetCode: function(data){
		    // 返回码
		    // getinfo返回的结果详细说明见
		    // http://tapd.oa.com/v3/shiping_dev/wikis/view/getinfo
		    // 如果返回结果不是预期的合法数据
		    var vi, exVal, iRetCode=0;
		    if (!data || !data.s) {
		      iRetCode = 50;
		    } else if (data.s !== "o") {
		      iRetCode = data.em || 50;
		      exVal = data.exem;
		    } else if (!data.vl || !data.vl.vi || !$.isArray(data.vl.vi) || data.vl.cnt === 0) {
		      iRetCode = 68;
		    } else {
		      // TODO:多个视频vids需要循环做判断，现在这里只判断了一个视频
		      vi = data.vl.vi[0];
		    }
		    // 视频文件不可以播放，或者视频文件不允许访问，或者根本就没有播放地址，就告知62错误，表示视频状态不合法
		    // TODO:区分视频付费状态码
		    if (iRetCode === 0 && (vi.fst !== 5 || !$.isPlainObject(vi.ul) || !$.isArray(vi.ul.ui) || vi.ul.ui.length === 0)) {
		      iRetCode = 62; // 视频状态不合法
		    }
	
		    // 视频状态不对
		    else if (iRetCode === 0 && vi.st !== 2) {
		      if (vi.st != 8) {
		        iRetCode = 62; // 视频状态不合法
		      }
		      else {
		        iRetCode = 83;
		        exVal = vi.ch;
		      }
		    }
		    // iRetCode = 83
		    // QQ音乐活动
		    if (this.dataset.isQQMusicAuth && iRetCode === 83) {
		      exVal = -3;
		    }
		    // qq部落
		    if (Txplayer.util.isQQBuLuoHost()) {
		      exVal = 0;
		    }
		    return {
		      exVal: exVal,
		      iRetCode: iRetCode,
		      vi: vi
		    };
		  },
		  // 请求cgi获取手机端视频地址
		  getMobileVideoUrlByVid: function(options){
		    if (options.yyactid) this.dataset.isQQMusicAuth = true;
		    else  this.dataset.isQQMusicAuth = false;
		    var cfg = {
		      charge: 0,
		      vid: "",
		      defaultfmt: this.context.defn || "auto",
		      otype: "json",
		      platform: '11001',
		      sdtfrom: this.context.sdtfrom || '',
		      guid: this.context.guid,
		      host: window != top ? document.referrer : document.location.host
		    };
		    var params = $.extend(cfg, options);
		    var cgi = 'http://h5vv.video.qq.com/getinfo?callback=?';
		    if (location.protocol==='https:'){
		      cgi = 'https://sec.video.qq.com/p/h5vv.video/getinfo?callback=?';
		    }
		    if (params.cgi){
		      cgi = params.cgi;
		      delete params.cgi;
		    }
		    var qvData = qvsec.$xx(params.platform, params.vid, this.context.sdtfrom, 1);
		    if (qvData && qvData.u1 && qvData.u2 && qvData.c){
		      params['_qv_rmt'] = qvData.u1;
		      params['_qv_rmt2'] = qvData.u2;
		      util.cookie.set('qv_als', qvData.c)
		    }
		    var that = this;
		    var defer = $.Deferred();
		    this.dataset.videoFormat = params.fmt;
		    this.dataset.vid = params.vid;
		    this.dataset.platform = params.platform;
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: "jsonp",
		      jsonpCallback: Txplayer.util.getJsonpCallbackName('getinfo')
		    }).done(function(data){
		      var checkData = that.checkGetInfoData(data), checkCode, mp4Url;
		      if (checkData===1) {
		        checkCode = that.checkGetinfoRetCode(data);
		        if (checkCode.iRetCode===83) {
		          util.showInfo('付费信息', '当前视频需要付费观看,vid=' + params.vid);
		        }
		        else if ( checkCode.iRetCode!==0 ) {
		          Txplayer.util.error( checkCode.iRetCode );
		          defer.reject();
		          return;
		        }
		        mp4Url = that.getMobileVideoMp4Url({
		          path     : checkCode.vi.ul.ui[0].url,
		          fn       : checkCode.vi.fn,
		          vkey     : checkCode.vi.fvkey,
		          alias    : checkCode.vi.alias,
		          br       : checkCode.vi.br,
		          level    : checkCode.vi.level,
		          sha      : checkCode.vi.fsha,
		          platform : 2,
		          fmt      : that.dataset.videoFormat,
		          sdtfrom  : Txplayer.util.getStdfrom(),
		          vid      : that.dataset.vid
		        });
		        that.context.superMsg.broadcast(Txplayer.apiList.privateApi.reportGetinfo,{
		          filename: checkCode.vi.fn,
		          cdnIp: Txplayer.util.getHostNameByUrl(checkCode.vi.ul.ui[0].url),
		          cdnId: checkCode.vi.ul.ui[0].vt,
		          vkey: checkCode.vi.fvkey
		        });
		        defer.resolve(mp4Url, data);
		      }
		    });
		    return defer;
		  },
		  // 从cgi数据拼接手机端视频播放地址
		  getMobileVideoMp4Url: function(json){
		    json = json || {};
		    var videourl,
		      hasAlias = false;
		    if (json.alias && typeof json.fn == "string" && json.vid) {
		      json.fn = json.fn.replace(json.vid, json.alias);
		      hasAlias = true;
		    }
		    // if (typeof json.path == "string") {
		    //   json.path = json.path.replace(/\/\/(.+?)(\/|#|$|\?)/,function() {
		    //     if (arguments.length > 1) {
		    //       return arguments[0].replace(arguments[1], '');
		    //     }
		    //     return arguments[0];
		    //   });
		    // }
		    if (json["path"].indexOf('?') > -1) {
		      videourl = json["path"] + '&' + json["fn"] + '&' + [
		        "vkey=" + json.vkey,
		        "br=" + json["br"],
		        'platform=' + this.dataset.platform,
		        'fmt=' + json.fmt,
		        "&level=" + json.level,
		        "&sdtfrom=" + Txplayer.util.getStdfrom()
		      ].join('&');
		    } else {
		      videourl = json["path"] + json["fn"] + '?' + [
		        "vkey=" + json.vkey,
		        "br=" + json["br"],
		        'platform=' + this.dataset.platform,
		        'fmt=' + json.fmt,
		        "&level=" + json.level,
		        "&sdtfrom=" + Txplayer.util.getStdfrom()
		      ].join('&');
		    }
	
		    if (typeof json.sha==='string' && json.sha.length > 0) {
		      videourl += "&sha=" + json.sha;
		    }
		    if (hasAlias) {
		      videourl += "&vidalias=1";
		    }
		    return videourl;
		  },
		  // 从cgi数据拼接手机端视频播放地址
		  requestMobileVideoHlsUrl: function(options){
		    var cgi = 'http://info.zb.video.qq.com';
		    var defer = $.Deferred();
		    if (location.protocal==='https:') cgi = 'https://sec.video.qq.com/p/info.zb/video/';
		    var params = {
		      cnlid: options.vid,
		      host: util.getMainHostName(),
		      cmd: 2,
		      qq: util.getQQFromCookie(),
		      guid: encodeURIComponent(util.createGUID()),
		      txvjsv: '2.0',
		      stream: 2
		    };
		    var extData = {
		      debug: "",
		      ip: ""
		    };
		    $.each(extData, function(el) {
		      extData[el] = util.getUrlParam(el);
		    });
		    $.extend(params, extData);
		    if (util.os.windows) {
		      params.system = 0;
		    }
		    if (util.os.iphone || util.os.ipod) {
		      params.system = 1;
		      params.sdtfrom = 113;
		    }
		    if (util.os.ipad) {
		      params.sdtfrom = 213;
		    }
		    if (util.os.android) {
		      params.system = 2;
		      params.sdtfrom = 313;
		    }
		    if (util.os.mac) {
		      params.system = 3;
		    }
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: 'jsonp'
		    }).done(function(rs) {
		      if ( !(rs && rs.playurl) ) {
		        defer.reject(rs);
		        return;
		      }
		      defer.resolve(rs.playurl);
		    });
		    return defer;
		  },
	
	
		  // 从cgi数据拼接PC端视频播放地址
		  getPcVideoMp4Url: function(json){
		    var that = this;
		    var vl = json.vl,
		        vi = vl.vi,
		        vitem = vi[0],
		        videoMode,
		        list = [],
		        len = vitem.cl.fc,
		        filename = vitem.fn,
		        newFileName,
		        splitInfo;
		    // 没有分片信息
		    if (!vitem.cl.ci &&
		      vitem.fvkey &&
		      vitem.fn &&
		      vitem.ul &&
		      vitem.ul.ui &&
		      vitem.ul.ui.length
		    ) {
		      videoMode = {};
		      videoMode.vid = vitem.lnk;
		      videoMode.width = parseInt(vitem.vw);
		      videoMode.height = parseInt(vitem.vh);
		      videoMode.bytesTotal = parseInt(vitem.fs);
		      videoMode.byteRate = vitem.br;
		      videoMode.filename = vitem.fn;
		      newFileName = vitem.fn;
		      videoMode.newFileName = newFileName;
		      videoMode.fileNameSuffix = getSplitFileSuffixName(newFileName);
		      videoMode.urlArray = getInfoPath(vitem.ul, vitem.lnk, newFileName, videoMode.fileNameSuffix);
		      videoMode.vt = vitem.ul.ui[0].vt;
		      videoMode.duration = parseInt(vitem.td, 10);
		      list.push(videoMode);
		      return list;
		    }
		    if (!vitem.cl.ci || len !== vitem.cl.ci.length) {
		      return ;
		    }
	
		    for (var i = 0; i < len; i++) {
		      splitInfo = vitem.cl.ci[i];
		      videoMode = {};
		      videoMode.vid = vitem.lnk;
		      videoMode.width = parseInt(vitem.vw);
		      videoMode.height = parseInt(vitem.vh);
		      videoMode.bytesTotal = parseInt(splitInfo.cs);
		      videoMode.duration = parseInt(splitInfo.cd);
		      videoMode.byteRate = vitem.br;
		      videoMode.filename = vitem.fn;
		      newFileName = getSplitFileName(filename, i+1);
		      videoMode.newFileName = newFileName;
		      videoMode.fileNameSuffix = getSplitFileSuffixName(newFileName);
		      videoMode.urlArray = getInfoPath(vitem.ul, vitem.lnk, newFileName, videoMode.fileNameSuffix);
		      videoMode.vt = vitem.ul.ui[0].vt;
		      list.push(videoMode);
		    }
	
		    function getSplitFileName(filename, index){
		      if (index===0) return filename;
		      var idx = filename.lastIndexOf('.'),
		        str = filename.substr(0, idx) + '.' + index + filename.substring(idx);
		      return str;
		    }
	
		    function getSplitFileSuffixName(filename){
		      var idx = filename.indexOf('.'),
		        str = filename.substr(idx);
		      return str;
		    }
	
		    function getInfoPath(ul, vid, filename, fileSuffix){
		      var urlArray = [],
		        ui = {},
		        modeUrl = {},
		        len = ul.ui.length;
		      for(var i=0; i<len; i++){
		        ui = ul.ui[i];
		        modeUrl = {};
		        if (!ui.url) continue;
		        if ( ui.url && ui.url.indexOf(vid + '.flv')===-1 && ui.url.indexOf(vid+'.mp4')===-1 ){
		          modeUrl.url = ui.url + filename;
		        }else{
		          modeUrl.url = ui.url;
		        }
		        if (ui.vt) {
		          modeUrl.vt = parseInt(ui.vt);
		        }
		        // 计算sdtfrom
		        if ( modeUrl.url.indexOf('sdtfrom')===-1 ) {
		          if (modeUrl.url.indexOf('?')>-1) {
		            modeUrl.url += '&sdtfrom=' + Txplayer.util.getStdfrom();
		          }else{
		            modeUrl.url += '?sdtfrom=' + Txplayer.util.getStdfrom();
		          }
		          modeUrl.url += '&guid=' + that.context.guid;
		        }
		        urlArray.push(modeUrl);
		      }
		      return urlArray;
		    }
		    return list;
		  },
		  // 请求cgi获取视频的高清播放地址的播放列表
		  getHDVideoUrlByVid: function(options){
		    var cfg = {
		      isHLS: false,
		      charge: false,
		      vid: "",
		      defn: "auto",
		      defnpayver: 1,
		      otype: "json",
		      guid: this.context.guid,
		      platform: '10901',
		      sdtfrom: this.context.sdtfrom || '',
		      host: window != top ? document.referrer : document.location.host
		    };
		    var params = $.extend(cfg, options);
		    var cgi = 'http://h5vv.video.qq.com/getinfo?callback=?';
		    if (location.protocol==='https:'){
		      cgi = 'https://sec.video.qq.com/p/h5vv.video/getinfo?callback=?';
		    }
		    var qvData = qvsec.$xx(params.platform, params.vid, this.context.sdtfrom, 1);
		    if (qvData && qvData.u1 && qvData.u2 && qvData.c){
		      params['_qv_rmt'] = qvData.u1;
		      params['_qv_rmt2'] = qvData.u2;
		      util.cookie.set('qv_als', qvData.c)
		    }
		    var that = this;
		    var defer = $.Deferred();
		    this.dataset.videoFormat = params.defn;
		    this.dataset.vid = params.vid;
		    this.dataset.platform = params.platform;
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: "jsonp",
		      jsonpCallback: Txplayer.util.getJsonpCallbackName('getinfo')
		    }).done(function(data){
		      var checkData = that.checkGetInfoData(data), checkCode, sectionsData, firstSectionUrl;
		      if (checkData===1) {
		        checkCode = that.checkGetinfoRetCode(data);
		        if (checkCode.iRetCode===83) {
		          util.showInfo('付费信息', '当前视频需要付费观看,vid=' + params.vid);
		        }
		        else if ( checkCode.iRetCode!==0 ) {
		          Txplayer.util.error( checkCode.iRetCode );
		          defer.reject();
		          return;
		        }
		        sectionsData = that.getPcVideoMp4Url(data);
		        if ($.type(sectionsData)==='array' && sectionsData.length) firstSectionUrl = sectionsData[0].urlArray[0].url + '&vkey=' +checkCode.vi.fvkey + '&guid='+that.context.guid;
		        that.dataset.sectionsData = sectionsData;
		        that.dataset.firstSectionUrl = firstSectionUrl;
		        that.dataset.getinfoData = data;
		        that.dataset.definitionList = that.getDefinitionListFromData(data);
		        defer.resolve( firstSectionUrl, sectionsData, that.dataset.definitionList,data );
		        that.context.superMsg.broadcast(Txplayer.apiList.privateApi.reportGetinfo,{
		          filename: checkCode.vi.fn,
		          cdnIp: Txplayer.util.getHostNameByUrl(checkCode.vi.ul.ui[0].url),
		          cdnId: checkCode.vi.ul.ui[0].vt,
		          vkey: checkCode.vi.fvkey
		        });
		      }else{
		        defer.reject({
		          code: data.em
		        });
		      }
		    });
		    return defer;
		  },
		  // 请求cgi获取鉴权ckey
		  getHDVideoVkey: function(videoData){
		    var defer = $.Deferred(),
		      cgi = 'http://h5vv.video.qq.com/getkey?callback=?&';
		    if (location.protocol==='https:'){
		      cgi = 'https://sec.video.qq.com/p/h5vv.video/getkey?callback=?';
		    }
		    var params = {
		      "otype": "json",
		      "vid": videoData.vid,
		      "format": getSelectedFormat(this.dataset.getinfoData.fl.fi),
		      "filename": videoData.newFileName,
		      "platform": '10901',
		      "vt": videoData.vt,
		      "charge":videoData.isNeedPay ? 1 : 0,
		      "_rnd": (+new Date())
		    };
		    $.ajax({
		      url: cgi,
		      data: params,
		      dataType: "jsonp",
		      jsonpCallback: Txplayer.util.getJsonpCallbackName('getkey')
		    }).done(function(data){
		      if (data && data.key) {
		        defer.resolve(data.key);
		      }else{
		        defer.reject(data);
		      }
		    }).fail(function(){
		      defer.reject({});
		    });
		    function getSelectedFormat(fi) {
		      for (var i = 0, len = fi.length; i < len; i++) {
		        if (fi[i].sl == 1) {
		          return fi[i].id;
		        }
		      }
		      return -1;
		    }
		    return defer;
		  },
		};
		module.exports = GetVideoInfo;
	
	/***/ },
	/* 16 */
	/***/ function(module, exports) {
	
		var Qvsec = {};
		Qvsec.ha = function(clss) {
		  var k = [],
		    i = 0;
		  for (; i < 64;) {
		    k[i] = 0 | (Math.abs(Math.sin(++i)) * 4294967296)
		  };
	
		  function add(x, y) {
		    return (((x >> 1) + (y >> 1)) << 1) + (x & 1) + (y & 1)
		  };
		  var calcSHA = function(str) {
		    var b, c, d, j, x = [],
		      str2 = window.unescape(encodeURI(str)),
		      a = str2.length,
		      h = [b = 1732584193, c = -271733879, ~b, ~c],
		      i = 0;
		    for (; i <= a;) x[i >> 2] |= (str2.charCodeAt(i) || 128) << 8 * (i++ % 4);
		    x[str = (a + 8 >> 6) * clss + 14] = a * 8;
		    i = 0;
		    for (; i < str; i += clss) {
		      a = h,
		        j = 0;
		      for (; j < 64;) {
		        a = [d = a[3], add(b = a[1], (d = add(add(a[0], [b & (c = a[2]) | ~b & d, d & b | ~d & c, b ^ c ^ d, c ^ (b | ~d)][a = j >> 4]), add(k[j], x[[j, 5 * j + 1, 3 * j + 5, 7 * j][a] % clss + i]))) << (a = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, clss, 23, 6, 10, 15, 21][4 * a + j++ % 4]) | d >>> 32 - a), b, c]
		      };
		      for (j = 4; j;) h[--j] = add(h[j], a[j])
		    };
		    str = '';
		    for (; j < 32;) str += ((h[j >> 3] >> ((1 ^ j++ & 7) * 4)) & 15).toString(clss);
		    return str;
		  };
		  return calcSHA
		}(16);
	
	
		Qvsec.stringToHex = function(s) {
		  var r = "";
		  var hexes = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
		  for (var i = 0; i < s.length; i++) {
		    r += hexes[s.charCodeAt(i) >> 4] + hexes[s.charCodeAt(i) & 0xf];
		  }
		  return r;
		}
	
		Qvsec.hexToString = function(h) {
		  var r = "";
		  for (var i = (h.substr(0, 2) == "0x") ? 2 : 0; i < h.length; i += 2) {
		    r += String.fromCharCode(parseInt(h.substr(i, 2), 16));
		  }
		  return r;
		}
	
		Qvsec._Seed = "#$#@#*ad";
	
		Qvsec.tempcalc = function(a, b) {
		  var r = "";
		  for (var i = 0; i < a.length; i++)
		    r += String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i % 4));
		  return r;
		}
	
		Qvsec.u1 = function(a, b) {
		  var r = "";
		  for (var i = b; i < a.length; i += 2)
		    r += a.charAt(i);
		  return r;
		}
	
		Qvsec._urlStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	
		Qvsec.urlenc = function(input, sts, ts) {
		  var output = "";
		  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		  var i = 0;
		  while (i < input.length) {
		    chr1 = input.charCodeAt(i++);
		    chr2 = input.charCodeAt(i++);
		    chr3 = input.charCodeAt(i++);
		    if (i == 15) {
		      output = output + 'A';
		      output = output + sts;
		      output = output + ts;
		    }
		    enc1 = chr1 >> 2;
		    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		    enc4 = chr3 & 63;
		    if (isNaN(chr2)) {
		      enc3 = enc4 = 64;
		    } else if (isNaN(chr3)) {
		      enc4 = 64;
		    }
		    output = output +
		      Qvsec._urlStr.charAt(enc1) + Qvsec._urlStr.charAt(enc2) +
		      Qvsec._urlStr.charAt(enc3) + Qvsec._urlStr.charAt(enc4);
		  }
		  return output;
		}
	
		Qvsec.$xx = function(plt, vid, std, sts) {
		  var ts = '' + Math.floor(new Date().valueOf() / 1000);
		  sts = ('' + sts).charAt(0);
		  var rf = '';
		  var ua = '';
		  var p = {
		    plt: plt || '',
		    vid: vid || '',
		    std: std || '',
		    sts: sts || '',
		    ts: ts,
		    rf: rf,
		    ua: ua
		  };
		  if (window.JSON)
		    p = JSON.stringify(p)
		  else
		    p = (function() {
		      var arr = []
		      for (var prop in p) {
		        arr.push('"' + prop + '":' + '"' + p[prop] + '"');
		      }
		      return '{' + arr.join(',') + '}'
		    })(p);
	
		  var result = Qvsec.hexToString(Qvsec.ha(plt + vid + ts + Qvsec._Seed + rf + ua + sts.charAt(0) + std));
		  var u = Qvsec.urlenc(Qvsec.tempcalc(result, Qvsec._Seed), sts.charAt(0), ts);
		  var c = Qvsec.urlenc(Qvsec.tempcalc(result, '86FG@hdf'), sts.charAt(0), ts);
		  var u1 = Qvsec.u1(u, 0);
		  var u2 = Qvsec.u1(u, 1);
		  return {
		    p: p,
		    u: u,
		    c: c,
		    u1: u1,
		    u2: u2,
		    t: ts
		  };
		};
		module.exports = Qvsec;
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var htmlstr = __webpack_require__(18);
		function TizenAuth(context){
		  this.context = context;
		  this.dataset = {};
		  this.msg = new Txplayer.Events();
		};
		TizenAuth.prototype = {
		  getVkey: function(options){
		    var that = this, defer = $.Deferred();
		    this.insertHTML();
		    this.dataset.vid = options.vid;
		    this.dataset.$getKeyDom.off('message').on('message', function(data){
		      defer.resolve(data);
		    });
		    if (this.dataset.isTizenKeyDomReady) {
		      this.getKeyByPostMsg(options.svrtime);
		    }else{
		      this.msg
		      // .off('getTizenKeyDomReady', this.getKeyByPostMsg)
		      .on('getTizenKeyDomReady', function(){
		        that.getKeyByPostMsg(options.svrtime);
		      });
		    }
		    return defer;
		  },
		  getKeyByPostMsg: function(svrTime){
		    var that = this;
		    var time = svrTime ? svrTime : parseInt((+new Date())/1000);
		    var code = [
		      that.dataset.vid, time, 'mac'
		    ].join(':');
		    this.dataset.getKeyDom.postMessage(code);
		  },
		  insertHTML: function(){
		    if (this.dataset.isInsertedHtml) return;
		    var that = this;
		    this.dataset.id = that.context.playerid+'_tizen_nacl';
		    var htmldata = $.tmpl(htmlstr, {
		      data: {
		        id: that.dataset.id,
		        path: 'newlib/Release/hello_tutorial_nexe.nmf'
		      }
		    });
		    $(document.body).append(htmldata);
		    this.dataset.isInsertedHtml = true;
		    this.dataset.$getKeyDom = $('#' + this.dataset.id);
		    this.dataset.getKeyDom = this.dataset.$getKeyDom.get(0);
		    this.addEventListener();
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.$getKeyDom.on('load', function(){
		      that.msg.emit('getTizenKeyDomReady');
		      that.dataset.isTizenKeyDomReady = true;
		    });
		  },
		}
	
	
		module.exports = TizenAuth;
	
	/***/ },
	/* 18 */
	/***/ function(module, exports) {
	
		module.exports = "<embed id=\"<%=data.id%>\" width=0 height=0 src=\"<%=data.path%>\" type=\"application/x-nacl\" />";
	
	/***/ },
	/* 19 */
	/***/ function(module, exports) {
	
		var playerstate = {
		  "unstarted" : -1,
		  "ended"     : 0,
		  "playing"   : 1,
		  "paused"    : 2,
		  "buffering" : 3,
		  "cued"      : 4,
		  "stop"      : 5
		};
	
		var definitionMap = {
		  'msd' : '流畅180P',
		  'sd'  : '标清270P',
		  'hd'  : '高清480P',
		  'shd' : '超清720P',
		  'fhd' : '蓝光1080P'
		};
	
		module.exports = {
		  playerstate   : playerstate,
		  definitionMap : definitionMap
		};
	
	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {
	
		var $ = Txplayer.$;
		var util = Txplayer.util;
		var AppHelper = __webpack_require__(21);
	
		var rules = [
		  // 不鉴权
		  {
		    reg: function(){
		      if (this.cfg.noAuth) return true;
		      return false;
		    },
		    request: function(def){
		      var that = this;
		      def.resolve({
		        param:{
		          vids: that.cfg.vid,
		          defaultfmt: that.cfg.fmt
		        }
		      });
		    }
		  },
		  // 1. QQ浏览器鉴权
		  {
		    reg: function(){
		      if ( util.browser.mqqbrowser &&
		          !util.browser.mqq &&
		          window === top
		      ) {
		        return true;
		      }
		      return false;
		    },
		    request: function(def){
		      var that = this,
		        iosReady,
		        androidReady;
		      var ts = typeof that.cfg.svr_time!=='undefined' ?
		          (that.cfg.svr_time+'') :
		          (parseInt(+new Date()/1000)+'');
		      var getKey = function(){
		        var data = { vid: that.cfg.vid }, getCkey, p;
		        data.timestamp = ts;
		        if (util.os.ios) {
		          getCkey = window.x5.ios.getBrowserSignature;
		          if (util.os.ipad) {
		            p = data;
		          }else{
		            p = 'vid:' + data.vid + '['+ data.timestamp +']';
		          }
		        } else{
		          getCkey = window.x5.android.getBrowserSignature;
		          p = 'vid:' + data.vid + '['+ data.timestamp +']';
		        }
		        getCkey( p,
		          function(d){
		            var config;
		            // ipad qq浏览器
		            if(typeof d==='object' && d.key && d.ver && d.platform){
		              config = {
		                cgi: getCGI('getvinfo'),
		                param: {
		                  cKey: d.key,
		                  encryptVer: d.ver,
		                  platform: d.platform,
		                  vid: that.cfg.vid,
		                  defn: that.cfg.fmt
		                }
		              };
		              def.resolve(config);
		            }
		            // ios qq浏览器
		            else if(typeof d==='object' && d.data){
		              config = {
		                cgi: getCGI('getvinfo'),
		                param: {
		                  cKey: d.data,
		                  encryptVer: '4.0',
		                  platform: '161001',
		                  vid: that.cfg.vid,
		                  defn: that.cfg.fmt
		                }
		              };
		              def.resolve(config);
		            }
		            // 安卓qq浏览器
		            else if(typeof d ==='string'){
		              config = {
		                cgi: getCGI('getvinfo'),
		                param: {
		                  cKey: d,
		                  encryptVer: '4.0',
		                  platform: '161001',
		                  vid: that.cfg.vid,
		                  defn: that.cfg.fmt
		                }
		              };
		              def.resolve(config);
		            }else{
		              def.reject();
		            }
		          },
		          function(){
		            def.reject();
		        });
		      };
		      iosReady = window.x5 && window.x5.ios && $.type(window.x5.ios.getBrowserSignature)==='function';
		      androidReady = window.x5 && $.type(window.x5.getBrowserSignature)==='function';
		      if(iosReady || androidReady){
		        getKey();
		      }else{
		        AppHelper.loadMqqBrowserAPI().done(function(){
		          iosReady = window.x5 && window.x5.ios && $.type(window.x5.ios.getBrowserSignature)==='function';
		          androidReady = window.x5 && $.type(window.x5.getBrowserSignature)==='function';
		          if( !(iosReady || androidReady) ){
		            def.reject();
		          }else{
		            getKey();
		          }
		        }).fail(function(){
		          def.reject();
		        });
		      }
		    }
		  }
	
		  // others...
		];
	
		function getCGI(cginame){
		  var data = {
		    getinfo: [
		      'http://h5vv.video.qq.com/getinfo?',
		      'https://sec.video.qq.com/p/h5vv.video/getinfo?'
		    ],
		    edugetvinfo: [
		      'http://sv.video.qq.com/edugetvinfo?',
		      'https://sec.video.qq.com/p/sv.video/edugetvinfo?'
		    ],
		    mvgetinfo: [
		      'http://sv.video.qq.com/mvgetinfo?',
		      'https://sec.video.qq.com/p/sv.video/mvgetinfo?'
		    ],
		    getinfoInews: [
		      'http://h5wx.video.qq.com/getinfo?callback=?',
		      'https://sec.video.qq.com/p/h5wx.video/getinfo?callback=?'
		    ],
		    getvinfo: [
		      'http://h5vv.video.qq.com/getvinfo?',
		      'https://sec.video.qq.com/p/h5vv.video/getvinfo?'
		    ],
		    getkey: [
		      'http://h5vv.video.qq.com/getkey?',
		      'https://sec.video.qq.com/p/h5vv.video/getkey?'
		    ],
		    mvgetkey: [
		      'http://sv.video.qq.com/mvgetkey?',
		      'https://sec.video.qq.com/p/sv.video/mvgetkey?'
		    ],
		    getkeyInews: [
		      'http://h5wx.video.qq.com/getkey?callback=?',
		      'https://sec.video.qq.com/p/h5wx.video/getkey?callback=?'
		    ],
		    zb: [
		      'http://info.zb.video.qq.com/?',
		      'https://sec.video.qq.com/p/info.zb/video/?'
		    ],
		    rmd_mobile:[
		      'http://like.video.qq.com/fcgi-bin/rmd_mobile?',
		      'https://sec.video.qq.com/p/like.video/fcgi-bin/rmd_mobile?'
		    ],
		    like:[
		      'http://like.video.qq.com/fcgi-bin/like?',
		      'https://sec.video.qq.com/p/like.video/fcgi-bin/like?'
		    ],
		    dataout_ex:[
		      'http://sns.video.qq.com/fcgi-bin/dlib/dataout_ex?',
		      'https://sec.video.qq.com/p/sns.video/fcgi-bin/dlib/dataout_ex?'
		    ],
		    get_dtype: [
		      'http://h5vv.video.qq.com/getdtype?',
		      'https://sec.video.qq.com/p/h5vv.video/getdtype?'
		    ]
		  };
		  if(window.location.protocol==='https:'){
		    return data[cginame][1];
		  }else{
		    return data[cginame][0];
		  }
		}
	
		function Auth(){
		  return this.init();
		}
		Auth.prototype = {
		  init: function(){
		    return this.reg_request;
		  },
		  reg_request: function(cfg, cfg2){
		    var that = this;
		    that.cfg = cfg;
		    that.cfg2 = cfg2;
		    var defer = $.Deferred(), has_match = false;
		    $(rules).each(function(idx, rule){
		      if($.type(rule.reg)!=='function') return true;
		      if($.type(rule.request)!=='function') return true;
		      // 规则匹配失败继续下一条
		      if (!rule.reg.call(that)) return true;
		      has_match = true;
		      // 请求鉴权相关参数
		      rule.request.call(that, defer);
		      // 匹配成功，后续规则就不匹配了
		      return false;
		    });
	
		    if(!has_match) defer.reject();
	
		    // 统一设置超时时间6s
		    setTimeout(function(){
		      defer.reject();
		    }, 6000);
		    return defer;
		  }
		};
	
		module.exports = Auth;
	
	/***/ },
	/* 21 */
	/***/ function(module, exports) {
	
		var AppHelper = {};
		var $ = Txplayer.$;
		var config = {
		  mqqBrowserApiUrl: '//res.imtt.qq.com/browser_lightapp/QQBrowserApi/getCryptext/browser_interface_getCryptext.js'
		};
	
		AppHelper.loadMqqBrowserAPI = function(){
		  if(Txplayer.dataset.loadMqqBrowserAPIDefer){
		    return Txplayer.dataset.loadMqqBrowserAPIDefer;
		  }
		  var defer = $.Deferred();
		  Txplayer.dataset.loadMqqBrowserAPIDefer = defer;
		  if (window.x5) {
		    defer.resolve();
		  }else {
		    var apiurl = config.mqqBrowserApiUrl;
		    $.getScript(apiurl, function() {
		      window.x5 ? defer.resolve() : defer.reject();
		    });
		  }
		  setTimeout(function() {
		    defer.reject();
		  }, 5000);
		  return defer;
		};
	
		module.exports = AppHelper;
	
	/***/ }
	/******/ ]);
