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
	
		module.exports = __webpack_require__(30);
	
	
	/***/ },
	
	/***/ 19:
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
	
	/***/ 30:
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * html5 高清播放器上报
		 */
		var $             = Txplayer.$;
		var api           = Txplayer.apiList;
		var util          = Txplayer.util;
		var definitionMap = __webpack_require__(19).definitionMap;
	
		function HdPlayerReport(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		HdPlayerReport.prototype = {
		  init: function(){
		    this.dataset.dataKey = Txplayer.dataset.localStorageKey.playTime;
		    this.resetDataset();
		    this.addEventListener();
		  },
		  resetDataset: function(){
		    if (!this.dataset.isGetinfoDone) return;
		    var protectList = ['isGetinfoDone', 'dataKey' ,'prevDefinition', 'setDefinitionStartTime', 'hasReportLoadingadLoadTime', 'filmFirstPlayingTime'];
		    for(var i in this.dataset){
		      if ($.inArray(i, protectList)>-1) continue;
		      delete this.dataset[i];
		    }
		  },
		  resetDatasetOnVidChange: function(){
		    var list = ['isGetinfoDone', 'setDefinitionStartTime', 'hasReportLoadingadLoadTime','filmFirstPlayingTime'];
		    var that = this;
		    $.each(list, function(idx, item){
		      delete that.dataset[item];
		    });
		  },
		  getDefaultReportData: function(){
		    var config = {
		      uin: Txplayer.util.getQQFromCookie(),
		      vid: this.context.msg.run(api.publicApi.getVid),
		      pid: this.context.msg.run(api.publicApi.getPlayerId),
		      guid: this.context.msg.run(api.publicApi.getUserId),
		      vt: this.getCDNChannelId(),
		      type: this.getBusinessType(),
		      url: document.URL,
		      bi: this.getCurrentVideoDuration(),
		      bt: this.context.msg.run(api.publicApi.getDuration),
		      version: Txplayer.dataset.ver,
		      platform: util.getPlatform(),
		      format: this.context.msg.run(api.privateApi.getDefinitionFormat),
		      defn: this.context.msg.run(api.publicApi.getDefinition),
		      ctime: util.dateFormat(),
		      ptag: util.cookie.get('ptag')
		    };
		    return config;
		  },
		  // 开始播放/调用广告前
		  reportStep3: function(isNewPlay){
		    var config = {
		      step: 3,
		      val: isNewPlay ? 1 : 2
		    };
		    this.doBossReport(config);
		  },
		  // 请求getinfo后
		  reportStep4: function(){
		    var config = {
		      step: 4,
		      val: this.context.msg.run(api.privateApi.calcTotalPlaylist,'film'),
		      val1: 1,
		      bi: 2
		    };
		    this.doBossReport(config);
		  },
		  // 统计播放时长
		  reportStep5: function(options){
		    options = options || {};
		    var config;
		    if (!options.isEnd){
		      config = options;
		      config.val1 = options.isEnd ? 1 : 2;
		      config.val = options.realtime;
		      config.bi = options.totaltime;
		      config.step = 5;
		      delete config.isEnd;
		      delete config.realtime;
		      delete config.totaltime;
		    }else{
		      config = {
		        step: 5,
		        val: options.realtime,
		        val1: options.isEnd ? 1 : 2,
		        bi: options.totaltime
		      };
		    }
		    this.doBossReport(config);
		  },
		  // 前贴广告首次缓冲时间
		  reportStep6: function(options){
		    var config = {
		      step: 6,
		      val: options.firstLoadTime,
		      val1: options.loadingAdStatus
		    };
		    this.doBossReport(config);
		  },
		  // 第一个loading广告开始播放时间
		  reportStep7: function(options){
		    var config = {
		      step: 7,
		      val: 0,
		      val1: 0
		    };
		    this.doBossReport(config);
		  },
		  // 第一个前贴广告缓冲完成上报下载平均速度
		  reportStep70: function(speed){
		    var config = {
		      step: 70,
		      val: speed
		    };
		    this.doBossReport(config);
		  },
		  // 第一个分片缓冲完成是上报下载速度
		  reportStep32_52: function(options){
		    var config = {
		      step: options.step,
		      val: options.waitingTimes,
		      val1: options.speed,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 统计首段请求首次缓冲耗时
		  reportStep30: function(options){
		    var config = {
		      step: 30,
		      val: options.loadTime,
		      val1: 0,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 统计非首段请求首次缓冲耗时
		  reportStep50: function(options){
		    var config = {
		      step: 50,
		      val: options.loadTime,
		      val1: 0,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 拖拽文件缓冲完成
		  reportStep60: function(options){
		    var config = {
		      step: 60,
		      val: options.seekCostTime,
		      val1: 0,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 首段/非首段 首次缓冲耗时
		  reportStep31_51: function(options){
		    if (!options.hasOwnProperty('waitingTime')) return;
		    var isOverMax = options.waitingTime > 10*1000;
		    options.waitingTime = isOverMax ? 10000 : options.waitingTime;
		    var config = {
		      step: options.step,
		      val: options.waitingTime,
		      val1: isOverMax,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // loading广告切正片耗时
		  reportStep35: function(options){
		    var config = {
		      step: 35,
		      val: options.swtichTime,
		      val1: '',
		      val2: this.context.msg.run(api.privateApi.getAdDuration),
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  // 正片切片切换耗时
		  reportStep55: function(options){
		    var config = {
		      step: 55,
		      val: options.swtichTime,
		      val1: '',
		      val2: options.prevFilmDuration,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration)
		    };
		    this.doBossReport(config);
		  },
		  //切换清晰度
		  reportStep100: function(options){
		    var config = {
		      step: 100,
		      val: options.costTime,
		      val1: options.val1,
		      val2: 1,
		      bi: this.context.msg.run(api.privateApi.getFocusVideoDuration),
		      predefn: options.predefn
		    };
		    this.doBossReport(config);
		  },
		  getCDNChannelId: function(){
		    var data = this.context.msg.run(api.privateApi.getVideosOriginData);
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex,'film');
		    if ( !(data && data[index]) ) return '';
		    return data[index].vt;
		  },
		  getCurrentVideoDuration: function(){
		    var data = this.context.msg.run(api.privateApi.getVideosOriginData);
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex,'film');
		    if ( !(data && data[index]) ) return '';
		    return data[index].duration;
		  },
		  getBusinessType: function(){
		    var data = this.context.msg.run(api.privateApi.getVideoInfoData);
		    if (data &&
		      data.vl &&
		      data.vl.vi &&
		      data.vl.vi[0] &&
		      $.type(data.vl.vi[0])==='object' &&
		      data.vl.vi[0].hasOwnProperty('type')
		    ) {
		      return data.vl.vi[0].type;
		    }
		    return '';
		  },
		  doBossReport: function(options){
		    var data = {};
		    data = $.extend(this.getDefaultReportData(), options);
		    if (data && data.bi){
		      data.bi = parseInt(data.bi);
		    }
		    if (data && data.bt){
		      data.bt = parseInt(data.bt);
		    }
		    var url = 'http://btrace.video.qq.com/kvcollect?BossId=2865&Pwd=1698957057';
		    url += '&' + $.param(data);
		    util.report(url);
		    if (Txplayer.dataset.debug){
		      if ($.type(Txplayer.showReportLog)==='function'){
		        Txplayer.showReportLog(data);
		      }
		    }
		  },
		  playTimeHeartBeatStart: function(){
		    var that = this;
		    if(!this.dataset.realPlayTime_TIMER){
		      this.dataset.realPlayTime_TIMER = setInterval(function(){
		        if (!that.dataset.realPlayTime) that.dataset.realPlayTime = 0;
		        that.dataset.realPlayTime += 5;
		      },5000);
		    }
		    if (!this.dataset.totalPlayTime_TIMER) {
		      this.dataset.totalPlayTime_TIMER = setInterval(function(){
		        if (!that.dataset.totalPlayTime) that.dataset.totalPlayTime = 0;
		        that.dataset.totalPlayTime += 5;
		        that.saveData();
		      },5000);
		    }
		  },
		  playTimeHeartBeatStop: function(isEnd){
		    if (isEnd){
		      clearInterval(this.dataset.totalPlayTime_TIMER);
		      delete this.dataset.totalPlayTime_TIMER;
		    }
		    clearInterval(this.dataset.realPlayTime_TIMER);
		  },
		  saveData: function(){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('saveData Error', '找不到vid');
		      return;
		    }
		    data[vid] = {
		      lastupdate: +new Date(),
		      realtime: this.dataset.realPlayTime,
		      totaltime: this.dataset.totalPlayTime
		    };
		    data[vid] = $.extend(this.getDefaultReportData(), data[vid]);
		    util.setData(this.dataset.dataKey, JSON.stringify(data));
		  },
		  getData: function(){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('getData Error', '找不到vid');
		      return;
		    }
		    return data[vid];
		  },
		  clearData: function(vid){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data;
		    vid = vid || this.context.msg.run(api.publicApi.getVid);
		    if (!jsonstr) {
		      data = {};
		    }else{
		      try{
		        data = JSON.parse(jsonstr);
		      }catch(e){
		        data = {};
		      }
		    }
		    if (!vid){
		      util.showError('clearData Error', '找不到vid');
		      return;
		    }
		    if (data[vid]) delete data[vid];
		    util.setData(this.dataset.dataKey, JSON.stringify(data));
		  },
		  reportPlayTimeWhenPageInit: function(){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data, that = this;
		    var checkAndReport = function(data, vid){
		      if (!data) return;
		      var now = parseInt(+new Date()/1000);
		      var lastupdate = parseInt(parseInt(data.lastupdate)/1000);
		      if ( (now-lastupdate)<=180) return;
		      data.isEnd = false;
		      that.reportStep5(data);
		      that.clearData(vid);
		    };
		    try{
		      data = JSON.parse(jsonstr);
		    }catch(e){
		      data = {};
		    }
		    for(var i in data){
		      checkAndReport(data[i], i);
		    }
		  },
		  reportPlayTimeOnEnded: function(){
		    var jsonstr = util.getData(this.dataset.dataKey);
		    var data, that = this;
		    var vid = this.context.msg.run(api.publicApi.getVid);
		    var checkAndReport = function(data, vid){
		      if (!data) return;
		      data.isEnd = true;
		      that.reportStep5(data);
		      that.clearData(vid);
		    };
		    try{
		      data = JSON.parse(jsonstr);
		    }catch(e){
		      data = {};
		    }
		    checkAndReport(data, vid);
		  },
		  addEventListener: function(){
		    var that = this;
		    // 开始播放，上报
		    this.context.msg.on(api.eventApi.onPlayStart, function(data, options){
		      data = data || {};
		      that.reportStep3(data.isNewPlay);
		    });
		    // 换了下一个视频，dataset重置，保证数据正常
		    this.context.msg.on(api.eventApi.onGetVideoUrlSuccess, function(data, options){
		      that.resetDataset();
		      that.reportStep4();
		      that.dataset.isGetinfoDone = true;
		    });
		    this.context.msg.on(api.eventApi.onVidChange, function(){
		      that.resetDatasetOnVidChange();
		    });
		    // 统计播放量，播放时长
		    this.context.msg.on(api.eventApi.onSectionPause, function(){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      that.playTimeHeartBeatStop();
		    });
		    // 广告上报开始时间统计
		    this.context.msg.on(api.eventApi.onSectionPlay, function(data){
		      // 广告加载统计
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) {
		        if (!that.dataset.loadingadFirstPlayTime) {
		          that.dataset.loadingadFirstPlayTime = +new Date();
		        }
		      }
		      // 正片首段文件
		      if (data.playListType==='film' && data.index===0 && !that.dataset.filmFirstPlayTime){
		        that.dataset.filmFirstPlayTime = +new Date();
		      }
		      // 正片非首段文件
		      if (data.playListType==='film' && data.index>0){
		        if (!that.dataset.filmPlayTime) that.dataset.filmPlayTime = {};
		        if (!that.dataset.filmPlayTime[data.index]){
		          that.dataset.filmPlayTime[data.index] = +new Date();
		        }
		      }
		    });
		    // 前贴广告上报处理
		    this.context.msg.on(api.eventApi.onSectionPlaying, function(data){
		      // 广告加载统计
		      var adFirstLoadTime='';
		      if (!that.context.msg.run(api.privateApi.isPlayingAd)){
		        that.playTimeHeartBeatStart();
		        if (!that.dataset.hasReportLoadingadLoadTime){
		          that.dataset.hasReportLoadingadLoadTime = true;
		          if (that.dataset.loadingadFirstPlayTime){
		            adFirstLoadTime = that.dataset.loadingadFirstPlayingTime - that.dataset.loadingadFirstPlayTime;
		          }else{
		            adFirstLoadTime = '';
		          }
		          that.reportStep6({
		            firstLoadTime: adFirstLoadTime,
		            loadingAdStatus: adFirstLoadTime===''?1:4
		          });
		        }
		      }else if (that.context.msg.run(api.privateApi.getCurrentPlayListType)==='loadingad'){
		        if (!that.dataset.loadingadFirstPlayingTime){
		          that.dataset.loadingadFirstPlayingTime = +new Date();
		          that.reportStep7();
		        }
		      }
	
		      // 正片首段文件
		      if (data.playListType==='film' &&
		          data.index===0 &&
		          !that.dataset.filmFirstPlayingTime &&
		          that.dataset.filmFirstPlayTime){
		        that.dataset.filmFirstPlayingTime = +new Date();
		        that.reportStep30({
		          loadTime: that.dataset.filmFirstPlayingTime - that.dataset.filmFirstPlayTime
		        });
		      }
		      // 正片非首段文件
		      if (data.playListType==='film' && data.index>0 && that.dataset.filmPlayTime){
		        if (!that.dataset.filmPlayingTime) that.dataset.filmPlayingTime = {};
		        if (!that.dataset.filmPlayingTime[data.index]){
		          that.dataset.filmPlayingTime[data.index] = +new Date();
		          that.reportStep50({
		            loadTime: that.dataset.filmPlayingTime[data.index] - that.dataset.filmPlayTime[data.index]
		          });
		        }
		      }
		    });
		    // 统计缓冲耗时
		    this.context.msg.on(api.eventApi.onSectionWaiting, function(data){
		      if (that.context.msg.run(api.privateApi.isPlayingAd)) return;
		      if (data.playListType!=='film') return;
		      var isVideoSeeking = that.context.msg.run(api.privateApi.isVideoSeeking);
		      if (isVideoSeeking) return;
		      if (data.seeking) return;
		      if (!that.dataset.waitingTimes) that.dataset.waitingTimes = 1;
		      if (that.dataset.waitingTimes===1) return;
		      that.dataset.waitingTimes ++;
		      var key = api.eventApi.onSectionPlaying + '.waiting_report';
		      var watingStartTime = +new Date();
		      var waitingEndTime;
		      that.context.msg.once(key, function(){
		        var step;
		        waitingEndTime = +new Date();
		        if (data.index===0){
		          step = 31;
		        }else{
		          step = 51;
		        }
		        that.reportStep31_51({
		          step: step,
		          waitingTime: waitingEndTime - watingStartTime
		        });
		      });
		    });
		    // 统计缓冲耗时
		    this.context.msg.on(api.eventApi.onNetworkBadStart, function(data){
		      if (data.playListType!=='film') return;
		      if (data.isOnWaiting) return;
		      var isVideoSeeking = that.context.msg.run(api.privateApi.isVideoSeeking);
		      if ( isVideoSeeking ) return;
		      if (!that.dataset.waitingTimes) that.dataset.waitingTimes = 1;
		      else that.dataset.waitingTimes ++;
		      var key = api.eventApi.onNetworkBadEnd + '.waiting_report';
		      var watingStartTime = +new Date();
		      var waitingEndTime;
		      that.context.msg.once(key, function(){
		        var step;
		        waitingEndTime = +new Date();
		        if (data.index===0) step = 31;
		        else step = 51;
		        that.reportStep31_51({
		          step: step,
		          waitingTime: waitingEndTime - watingStartTime
		        });
		      });
		    });
		    // 统计封片切换
		    this.context.msg.on(api.eventApi.onSectionEnded, function(data){
		      var key;
		      if (data.playListTypeEnd && data.playListType==='loadingad'){
		        that.dataset.loadingadEndTime = +new Date();
		      }
		      // 正片播放完成，清理统计缓冲次数数据
		      if ( data.playListType==='film' ) {
		        that.dataset.waitingTimes = 0;
		      }
		      // 统计前贴广告播完切正片的耗时
		      if (data.playListTypeEnd && data.playListType==='loadingad'){
		        var loadingadEndTime = +new Date();
		        var filmStartTime;
		        key = api.eventApi.onSectionPlaying + '.switch_section_report';
		        that.context.msg.once(key, function(){
		          filmStartTime = +new Date();
		          that.reportStep35({
		            swtichTime: filmStartTime - loadingadEndTime
		          });
		        });
		      }
		      // 统计正片切换分片耗时
		      if (data.playListType==='film' && !data.playListTypeEnd){
		        var prevFilmEndTime = +new Date();
		        var nextFilmStartTime;
		        key = api.eventApi.onSectionPlaying + '.switch_film_section_report';
		        var duration = data.videoTag.duration;
		        that.context.msg.once(key, function(){
		          nextFilmStartTime = +new Date();
		          that.reportStep55({
		            swtichTime: nextFilmStartTime - prevFilmEndTime,
		            prevFilmDuration: duration
		          });
		        });
		      }
		      // 统计播放时长
		      if (data.playListType==='film' && data.playListTypeEnd){
		        that.playTimeHeartBeatStop(true);
		        that.reportPlayTimeOnEnded();
		      }
		    });
		    // 统计播放量
		    this.context.msg.on(api.eventApi.onReady, function(){
		      that.reportPlayTimeWhenPageInit();
		    });
		    // 统计下载速度
		    this.context.msg.on(api.eventApi.onSectionBufferEnd, function(data){
		      if (data && data.playListType==='loadingad' && data.hasOwnProperty('averageSpeed')){
		        if (!that.dataset.hasReportStep70){
		          that.reportStep70(data.averageSpeed);
		          that.dataset.hasReportStep70 = true;
		        }
		      }else if (data && data.playListType==='film' && data.hasOwnProperty('averageSpeed')){
		        var step;
		        if (data.index===0) step = 32;
		        else step = 52;
		        that.reportStep32_52({
		          waitingTimes: that.dataset.waitingTimes,
		          speed: data.averageSpeed,
		          step: step
		        });
		      }
		    });
		    // 统计seek耗时
		    this.context.msg.on(api.eventApi.onSeekStart, function(){
		      that.dataset.filmSeekStartTime = +new Date();
		    });
		    // 统计seek耗时
		    this.context.msg.on(api.eventApi.onSeekEnded, function(){
		      that.dataset.filmSeekEndTime = +new Date();
		      that.reportStep60({
		        seekCostTime: that.dataset.filmSeekEndTime - that.dataset.filmSeekStartTime
		      });
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionStart, function(){
		      that.dataset.setDefinitionStartTime = +new Date();
		      that.dataset.prevDefinition = that.context.msg.run(api.publicApi.getDefinition);
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionDone, function(){
		      that.dataset.setDefinitionDoneTime = +new Date();
		      that.reportStep100({
		        costTime: that.dataset.setDefinitionDoneTime - that.dataset.setDefinitionStartTime,
		        val1: 2,
		        predefn: that.dataset.prevDefinition
		      });
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionFail, function(errMsg){
		      that.dataset.setDefinitionFailTime = +new Date();
		      that.reportStep100({
		        costTime: that.dataset.setDefinitionFailTime - that.dataset.setDefinitionStartTime,
		        val1: 1,
		        predefn: that.dataset.prevDefinition
		      });
		    });
		  }
		};
	
	
		Txplayer.register('HdPlayerReport', HdPlayerReport);
	
	/***/ }
	
	/******/ });
