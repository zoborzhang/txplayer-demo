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
	
		module.exports = __webpack_require__(26);
	
	
	/***/ },
	
	/***/ 26:
	/***/ function(module, exports) {
	
		var $             = Txplayer.$;
		var api           = Txplayer.apiList;
		var util          = Txplayer.util;
	
		function HdPlayerAdReport(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
	
		HdPlayerAdReport.prototype = {
		  init: function(){
		    this.addEventListener();
		    this.dp3Report(1);
		  },
		  setReportTimeData: function(){
		    if (!this.dataset.adData && $.type(this.dataset.adData)!=='object') return;
		    var list = [], that = this;
		    this.dataset.reportData = {};
		    if (this.dataset.adData.hasOwnProperty('ReportTime') && this.dataset.adData.reportUrl){
		      this.dataset.reportData[ this.dataset.adData.ReportTime ] = [this.dataset.adData.reportUrl];
		    }
		    if (this.dataset.adData.reportUrlOther &&
		      this.dataset.adData.reportUrlOther.reportitem){
		      if ( $.type(this.dataset.adData.reportUrlOther.reportitem)==='object'){
		        list = [this.dataset.adData.reportUrlOther.reportitem];
		      }else{
		        list = this.dataset.adData.reportUrlOther.reportitem;
		      }
		    }
		    if ( !list.length ) return;
		    $(list).each(function(idx, item){
		      if ( !(item.hasOwnProperty('reporttime') && item.url) ) return;
		      if (!that.dataset.reportData[item.reporttime]) that.dataset.reportData[item.reporttime] = [];
		      that.dataset.reportData[item.reporttime].push(item.url);
		    });
		  },
		  dp3Report: function(step, params){
		    if(!step) return;
		    var that = this;
		    var qq = util.cookie.get('luin') || util.cookie.get('uin') || '';
		    var report_params = {};
		    var base_param = {
		      'requestid': this.context.msg.run(api.publicApi.getUserId),
		      'pf': 'H5',
		      'chid': util.getAdChannelId(),
		      'adtype': this.dataset.adType,
		      'timestamp': (+new Date()),
		      'mvid': this.context.msg.run(api.publicApi.getVid),
		      "videoDuration" : this.context.msg.run(api.publicApi.getDuration) || 0,
		      'coverid': '',
		      'qq': qq
		    };
		    var step_param;
		    var report_url = '//dp3.qq.com/qqvideo/?';
		    var reportData = {};
	
		    if(step===2 ||step===5){
		      // 统计oid，vid，videopt
		      var oids = [], vids = [], videopts = [];
		      if(that.dataset.adJson &&
		          that.dataset.adJson.adList &&
		          that.dataset.adJson.adList.item){
		        var _item = $.type(that.dataset.adJson.adList.item)==='object'?[that.dataset.adJson.adList.item]: that.dataset.adJson.adList.item;
		        $(_item).each(function(idx, item){
		          if(!item.order_id || !item.duration) return;
		          if(item.duration) videopts.push(item.duration);
		          if(item.image && item.image.vid){
		            vids.push(item.image.vid);
		          }else if($.type(item.image)==='array' && item.image.length){
		            item.image[0].vid && vids.push(item.image[0].vid);
		          }
		          oids.push(item.order_id);
		        });
		      }
		      reportData.oid = oids.join(',');
		      reportData.vid = vids.join(',');
		      reportData.videopt = videopts.join(',');
		    }
	
		    if (step===1){
		      step_param = {};
		    }else if (step===2) {
		      step_param = {
		        'vid2aid': that.dataset.adJson.adLoc.vid2aid || 0,
		        // livew 接口耗时
		        // 'aid2oid': that.dataset.dp3ReportData.aid2oid,
		        'oid2url': that.dataset.adJson.adGetv&&that.dataset.adJson.adGetv.oid2url || 0,
		        'merged': 1,
		        'adaptor': 1,
		        'errorcode': '',
		        'adid': that.dataset.adJson.adLoc.aid || '',
		        // 订单号列表, 逗号分隔
		        'oid': reportData.oid,
		        // 素材vid, 逗号分隔
		        'vid': reportData.vid
		      };
		    }else if(step===3){
		      step_param = {
		        // 首次缓冲时间
		        'videofbt': params.videofbt,
		        'errorcode': ''
		      };
		    }else if(step===4){
		      step_param = {
		        'isskip': '',
		        'errorcode': '',
		        'adDidShowTime': this.context.msg.run(api.privateApi.getFocusVideoCurrentTime)
		      };
		    }else if(step===5){
		      step_param = {
		        'errorcode': '',
		        // 广告总时长
		        'adtt': this.context.msg.run(api.privateApi.getAdDuration),
		        // 每个广告时长
		        'videopt': reportData.videopt,
		        // 每个广告实际播放时长
		        'videott': params.adRealPlayedTime
		      };
		    }
		    if (!step_param) return;
		    report_params = $.extend(base_param, step_param);
		    report_params.step = step;
		    report_url += $.param(report_params);
		    util.report(report_url);
		  },
		  resetDataset: function(){
		    delete this.dataset.adFirstPlayTime;
		    delete this.dataset.adFirstPlayingTime;
		    delete this.dataset.adRealPlayedTime;
		  },
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionTimeupdate)] = function(data){
		      if (!data) return;
		      if (data.playListType!=='loadingad') return;
		      if (!data.videoTag) return;
		      // 统计广告的实际播放时长
		      if ($.type(that.dataset.adRealPlayedTime)==='array'){
		        that.dataset.adRealPlayedTime[that.dataset.adRealPlayedTime.length-1] = that.dataset.adRealPlayedTime[that.dataset.adRealPlayedTime.length-1] + 1;
		      }
		      var currentTime = parseInt(data.videoTag.currentTime);
		      if (that.dataset.reportData && that.dataset.reportData[currentTime]){
		        $(that.dataset.reportData[currentTime]).each(function(idx, item){
		          util.report(item);
		        });
		      }
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlay)] = function(data){
		      if (!data) return;
		      if ( data.playListType!=='loadingad' &&
		        data.playListType!=='insertad' &&
		        data.playListType!=='endingad' ) return;
	
		      if (!that.dataset.adRealPlayedTime) that.dataset.adRealPlayedTime=[];
		      // 统计广告的实际播放时长
		      if (!that.dataset.adRealPlayedTime.hasOwnProperty(data.videoTag.src)) {
		        that.dataset.adRealPlayedTime[data.videoTag.src] = null;
		        that.dataset.adRealPlayedTime.push(-1);
		      }
		      // 统计首次缓冲时间
		      that.dataset.adFirstPlayTime = +new Date();
		      that.dataset.adData = that.context.msg.run(api.privateApi.getCurrentAdInfo);
		      that.setReportTimeData();
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionPlaying)] = function(data){
		      if (!data) return;
		      if ( data.playListType!=='loadingad' &&
		        data.playListType!=='insertad' &&
		        data.playListType!=='endingad' ) return;
		      // 统计首次缓冲时间
		      that.dataset.adFirstPlayingTime = +new Date();
		      that.dp3Report(3, {
		        videofbt: (that.dataset.adFirstPlayingTime - that.dataset.adFirstPlayTime)
		      });
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onOpenAdLink)] = function(data){
		      if ( data && data.clickReportUrlOther && data.clickReportUrlOther.reportitem ){
		        util.report(data.clickReportUrlOther.reportitem.url);
		        return;
		      }
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onPuaseAdShow)] = function(data){
		      var othersReport = [];
		      if (data && data.reportUrl){
		        util.report(data.reportUrl);
		      }
		      if (data && data.reportUrlOther && data.reportUrlOther.reportitem) {
		        if ($.type(data.reportUrlOther.reportitem)==='object'){
		          othersReport.push(data.reportUrlOther.reportitem);
		        }else{
		          othersReport = data.reportUrlOther.reportitem;
		        }
		      }
		      $(othersReport).each(function(idx, item){
		        if (item && item.url) {
		          util.report(item.url);
		        }
		      });
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onSectionEnded)] = function(data){
		      if (data.playListTypeEnd && (
		        data.playListType==='loadingad' ||
		        data.playListType==='insertad' ||
		        data.playListType==='endingad'
		      )){
		        that.dp3Report(5, {
		          adRealPlayedTime: $.type(that.dataset.adRealPlayedTime)==='array'?that.dataset.adRealPlayedTime.join(',') : ''
		        });
		      }
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onLoadingAdDataReady)] = function(){
		      that.resetDataset();
		      that.dataset.adType = 'WL';
		      that.dataset.adJson = that.context.msg.run(api.privateApi.getPlayAdJsonData);
		      that.dp3Report(2);
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onEndingAdDataReady)] = function(){
		      that.resetDataset();
		      that.dataset.adType = 'WC';
		      that.dataset.adJson = that.context.msg.run(api.privateApi.getPlayAdJsonData);
		      that.dp3Report(2);
		    };
		    this.dataset.eventsList[util.getUniqueMsgKey(api.eventApi.onInsertAdDataReady)] = function(){
		      that.resetDataset();
		      that.dataset.adType = 'WH';
		      that.dataset.adJson = that.context.msg.run(api.privateApi.getPlayAdJsonData);
		      that.dp3Report(2);
		    };
		    $.each(this.dataset.eventsList,function(key, fn){
		      that.context.msg.on(key, fn);
		    });
		  }
		};
	
	
		Txplayer.register('HdPlayerAdReport', HdPlayerAdReport);
	
	/***/ }
	
	/******/ });
