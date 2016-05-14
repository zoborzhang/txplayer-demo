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
	
		module.exports = __webpack_require__(27);
	
	
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
	/* 14 */,
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
	/* 20 */,
	/* 21 */,
	/* 22 */,
	/* 23 */,
	/* 24 */,
	/* 25 */,
	/* 26 */,
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * html5 高清播放器控制器
		 */
		var GetVideoInfo  = __webpack_require__(15);
		var $             = Txplayer.$;
		var api           = Txplayer.apiList;
		var util          = Txplayer.util;
		var definitionMap = __webpack_require__(19).definitionMap;
		var errcode = __webpack_require__(28);
	
		function HdPlayerControl(context){
		  this.msg = new Txplayer.Events();
		  this.dataset = {};
		  this.context = context;
		  this.init();
		}
		HdPlayerControl.prototype = {
		  // 初始化入口
		  init: function(){
		    this.dataset.hasVideoPlayed = false;
		    this.dataset.playerId = this.context.config.playerId;
		    this.dataset.vid = this.context.config.vid;
		    this.dataset.nextVid = this.context.config.nextVid;
		    var config = {
		      vid: this.context.config.vid,
		      defn: this.dataset.defaultDefinition,
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
		    this.dataset.vid = this.context.config.vid;
		    this.dataset.isNeedPay = this.context.config.isNeedPay;
		    this.dataset.autoplay = this.context.config.autoplay;
		    this.dataset.hdloadingadAutoplay = this.context.config.hdloadingadAutoplay;
		    this.dataset.playStartTime = this.context.config.playStartTime;
		    this.dataset.skipPrelude = this.context.config.skipPrelude;
		    this.dataset.defaultDefinition = this.context.config.defaultDefinition;
		    this.dataset.connectionPlayTime = this.context.config.connectionPlayTime;
		    if (!this.dataset.defaultDefinition){
		      var historyDefinition = this.context.msg.run(api.privateApi.getHistoryDefinition);
		      if (historyDefinition) this.dataset.defaultDefinition = historyDefinition;
		    }
		    this.getinfo = new GetVideoInfo(context);
		    this.addEventListener();
		    this.exportsModuleApis();
		    this.showDebugLogs();
		    if (this.dataset.autoplay) this.play({
		      nextVid: this.dataset.nextVid,
		      vid: this.dataset.vid,
		      connectionPlayTime: this.context.config.connectionPlayTime
		    });
		  },
		  // 通过vid获取视频播放地址列表
		  requestVideoUrlsByVid: function(options){
		    options = options || {};
		    var config = {
		      vid: this.dataset.vid,
		      defn: this.dataset.defaultDefinition,
		      charge: this.dataset.isNeedPay ? 1: 0,
		      fhdswitch: options.fhdswitch ? 1: 0
		    };
		    var that = this;
		    $.extend(config, options);
		    this.context.msg.broadcast(api.eventApi.onGetinfoStart);
		    this.getinfo.getHDVideoUrlByVid(config).done(function(videoFirstPartUrl, videosData, DefinitionList, getinfoJSON){
		      that.context.msg.broadcast(api.eventApi.onGetinfoEnded);
		      if (videosData) {
		        that.dataset.videosData = videosData;
		        that.dataset.DefinitionList = DefinitionList;
		      }
		      that.dataset.getinfoJSON = getinfoJSON;
		      // that.dataset.isDefinitionSwitching = false;
		      that.dataset.getVideoInfoErrorData = null;
		      that.context.msg.broadcast(api.eventApi.onGetVideoUrlSuccess, videoFirstPartUrl);
		    }).fail(function(data){
		      that.dataset.isDefinitionSwitching = false;
		      if (data && data.code===91) {
		        that.context.msg.broadcast(api.publicApi.pause);
		        that.context.msg.broadcast(api.privateApi.hideUiTips);
		        that.dataset.getVideoInfoErrorData = data;
		        that.context.msg.broadcast(api.eventApi.onVideoInterruptByError);
		      }else{
		        that.context.msg.broadcast(api.eventApi.onError, {
		          code: data.code,
		          msg: errcode[data.code],
		          type: 'cgi'
		        });
		        that.context.msg.broadcast(Txplayer.apiList.privateApi.reportError, {
		          msg: errcode[data.code],
		          code: data.code,
		          stack: ''
		        });
		      }
		      that.context.msg.broadcast(api.eventApi.onGetinfoEnded);
		    });
		  },
		  // 获取下一个分片的vkey
		  requestVideoNextPartKey: function(item, selectIndex){
		    selectIndex = selectIndex || 0;
		    if (!this.dataset.videosData) return false;
		    var that = this,
		      defer = $.Deferred();
		    this.dataset.preloadStatus = 'pending';
		    item.isNeedPay = this.context.config.isNeedPay;
		    this.context.msg.broadcast(api.eventApi.onGetvkeyStart);
		    this.getinfo.getHDVideoVkey(item).done(function(vkey){
		      that.dataset.getVkeyErrorData = null;
		      that.context.msg.broadcast(api.eventApi.onGetvkeyEnded);
		      if (!vkey) {
		        that.dataset.preloadStatus = 'fail';
		        defer.reject();
		        return;
		      }
		      defer.resolve(item.urlArray[selectIndex].url + '&vkey=' + vkey);
		    }).fail(function(data){
		      that.dataset.getVkeyErrorData = data;
		      util.showError('getvkey失败',data);
		      that.context.msg.broadcast(api.eventApi.onGetvkeyEnded);
		      defer.reject(data);
		    });
		    return defer;
		  },
		  // 获取视频的播放地址
		  loadVideoUrls: function(options){
		    options = options || {};
		    this.dataset.hasLoadVideoUrl = true;
		    var that = this;
		    var msgName = api.eventApi.onGetVideoUrlSuccess + '.loadVideoUrls';
		    this.context.msg.once(msgName, function(videoFirstPartUrl){
		      if (!that.dataset.videosData) {
		        util.showError('onGetVideoUrlSuccess失败', '找不到播放url列表');
		        return;
		      }
		      var urls = [];
		      $(that.dataset.videosData).each(function(idx, item){
		        if (idx ===0 && videoFirstPartUrl) {
		          urls.push({
		            url: videoFirstPartUrl,
		            type: 'film',
		            data: item
		          });
		          return;
		        }
		        urls.push({
		          _url: item.urlArray,
		          data: item,
		          type: 'film',
		          getUrlSync: function(){
		            var defer = $.Deferred();
		            that.requestVideoNextPartKey(this.data)
		            .done(function(url){
		              defer.resolve(url);
		            })
		            .fail(function(err){
		              defer.reject(err);
		            });
		            return defer;
		          }
		        });
		      });
		      var config = {
		        data: urls,
		        type: 'film'
		      };
		      that.dataset.videoPreloadList = urls;
		      that.context.msg.broadcast(api.eventApi.onPreloadListChange, videoFirstPartUrl);
		      if (options.repalcePlayList) config.repalcePlayList = true;
		      if (options.clear) config.clear = true;
		      that.context.msg.broadcast(api.privateApi.addUrls2Player, config);
		      that.setVid(options.vid);
		      if (options.autoplay) {
		        that.dataset.autoplay = true;
		        that.context.msg.emit(api.privateApi.play, videoFirstPartUrl);
		      }
		      if (options.playStartTime) {
		        that.seekTo(options.playStartTime);
		        var textTime = '<a>' + util.formatPlayTime(options.playStartTime) + '</a>';
		        that.context.msg.broadcast(api.privateApi.showUiTips, {
		          text: '您上次观看至 '+textTime+' 处，正在为您续播',
		          time: 3
		        });
		      }
		    });
		    this.requestVideoUrlsByVid({
		      vid: options.vid,
		      charge: options.charge,
		      defn: options.defn,
		      fhdswitch: options.fhdswitch
		    });
		  },
	
		  // 获取视频时长信息
		  getDuration: function(){
		    if (!this.dataset.videosData || $.type(this.dataset.videosData)!=='array') return 0;
		    var duration = 0;
		    $(this.dataset.videosData).each(function(idx, item){
		      duration += parseInt(item.duration);
		    });
		    return duration;
		  },
		  // 获取视频文件大小，单位K
		  getFileSize: function(){
		    if (!this.dataset.videosData || $.type(this.dataset.videosData)!=='array') return 0;
		    var filesize = 0;
		    $(this.dataset.videosData).each(function(idx, item){
		      filesize += parseInt(item.bytesTotal);
		    });
		    return parseInt(filesize/1024);
		  },
		  // 获取视频宽高尺寸
		  getVideoSize: function(){
		    if (!this.dataset.videosData || $.type(this.dataset.videosData)!=='array') return 0;
		    var filesize = 0, item = this.dataset.videosData[0];
		    return {
		      width: item.width,
		      height: item.height
		    };
		  },
		  // 设置清晰度
		  setDefinition: function(defn){
		    if (!defn) return;
		    if (this.dataset.isDefinitionSwitching) return;
		    var list = this.getDefinitionList();
		    var isInList, that = this;
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, 'film');
		    $(list).each(function(idx, item){
		      if (item.name===defn) {
		        isInList = true;
		        return true;
		      }
		    });
		    if (!isInList) {
		      util.error('未知清晰度格式，或者视频没有指定的清晰度');
		      return;
		    }
		    this.dataset.isDefinitionSwitching = true;
		    this.dataset.requestId = util.createGUID();
		    this.context.msg.broadcast(api.eventApi.onSetDefinitionStart, defn);
		    util.showInfo('开始切换清晰度', defn);
		    this.context.msg.once(api.eventApi.onPreloadListChange+'.switch_definition', function(url){
		      util.showInfo('开始切换清晰度', url);
		      var urlData;
		      if (index===0)  urlData = url;
		      else urlData = that.dataset.videoPreloadList[index];
		      that.context.msg.broadcast(api.privateApi.setPreloadVideoUrl, urlData);
		      that.context.msg.run(api.privateApi.setPreloadVideoKeepSpaceToFocusVideo).done(function(){
		        util.showInfo('切换清晰度成功','');
		        that.dataset.isDefinitionSwitching = false;
		        that.context.msg.broadcast(api.eventApi.onDefinitionChange, defn);
		        that.context.msg.broadcast(api.eventApi.onSetDefinitionDone);
		      }).fail(function(errorMsg){
		        util.showInfo('切换清晰度失败','');
		        that.dataset.isDefinitionSwitching = false;
		        that.context.msg.broadcast(api.eventApi.onSetDefinitionFail, errorMsg);
		      });
		    });
		    this.loadVideoUrls({
		      defn: defn,
		      vid: this.dataset.vid,
		      repalcePlayList: true,
		      // 强制切换清晰度
		      fhdswitch: 1
		    });
		    if (this.dataset.setDefinitionTimeout_TIMER){
		      clearTimeout(this.dataset.setDefinitionTimeout_TIMER);
		      this.dataset.setDefinitionTimeout_TIMER = null;
		    }
		    // 切换失败超时，切换出错处理
		    this.dataset.setDefinitionTimeout_TIMER = setTimeout(function(){
		      that.dataset.isDefinitionSwitching = false;
		    },30*1000);
		  },
		  // 获取清晰度列表
		  getDefinitionList: function(){
		    var list = this.dataset.DefinitionList;
		    if (!list) return [];
		    $(list).each(function(idx, item){
		      if (!definitionMap.hasOwnProperty(item.name)) return;
		      if (item.name==='mp4'){
		        item.cname = definitionMap[item.name] + item.cname.replace(/\D+/g,'') + 'P';
		      }else{
		        item.cname = definitionMap[item.name];
		      }
		    });
		    list.sort(function(a, b){
		      return parseInt(a.cname.replace(/\D+/g,'')) - parseInt(b.cname.replace(/\D+/g,''));
		    });
		    this.dataset.DefinitionList = list;
		    return list;
		  },
		  // 获取当前清晰度
		  getDefinition: function(){
		    var list = this.getDefinitionList();
		    var defn;
		    if ($.type(list)!=='array') return '';
		    $(list).each(function(idx, item){
		      if (item.sl===1) {
		        defn = item.name;
		        return true;
		      }
		    });
		    return defn;
		  },
		  // 获取当前清晰度格式
		  getDefinitionFormat: function(){
		    var list = this.getDefinitionList();
		    var format;
		    if ($.type(list)!=='array') return '';
		    $(list).each(function(idx, item){
		      if (item.sl===1) {
		        format = item.format;
		        return true;
		      }
		    });
		    return format;
		  },
		  // 获取当前播放的时间
		  getCurrentTime: function(){
		    if (this.context.msg.run('isPlayingAd')) {
		      return 0;
		    }
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, 'film');
		    var duration = 0;
		    $(this.dataset.videosData).each(function(idx, item){
		      if (idx === index) return false;
		      duration += item.duration;
		    });
		    duration += this.context.msg.run(api.privateApi.getFocusVideoCurrentTime);
		    return parseInt(duration);
		  },
		  getBufferedTime: function(){
		    if (this.context.msg.run('isPlayingAd')) {
		      return 0;
		    }
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, 'film');
		    var duration = 0;
		    $(this.dataset.videosData).each(function(idx, item){
		      if (idx === index) return false;
		      duration += item.duration;
		    });
		    duration += this.context.msg.run(api.privateApi.getFocusVideoBufferedTime);
		    return duration;
		  },
		  // 跳转到时间点
		  seekTo: function(options){
		    var seekTime;
		    if ( $.type(options)==='object' ){
		      seekTime = options.time;
		    }else if ( $.type(options)==='number' ){
		      seekTime = options;
		      options = {};
		    }
		    util.showInfo('seekTo', seekTime);
		    if (this.context.msg.run('isPlayingAd')) return;
		    if (typeof seekTime==='undefined') {
		      util.error('seekTo参数错: 参数不能为空');
		      return;
		    }
		    var duration = this.getDuration();
		    var index = this.context.msg.run(api.privateApi.getPlayListIndex, 'film');
		    if (seekTime > duration) {
		      util.error('seekTo参数错误: seekTime['+seekTime+']不能超过视频的时长['+duration+']');
		      return;
		    }
		    var seekInfo = this.getVideoSeekToInfo(seekTime);
		    var that = this;
		    this.context.msg.broadcast(api.eventApi.onSeekStart);
		    this.context.msg.once(api.eventApi.onSectionPlaying + '.seekStartLog', function(){
		      that.context.msg.broadcast(api.eventApi.onSeekEnded);
		    });
		    if (index === seekInfo.index) {
		      this.context.msg.broadcast(api.privateApi.setFocusVideoCurrentTime, {
		        time: seekTime-seekInfo.prevDurtion,
		        autoplay: true
		      });
		    }else{
		      if (this.dataset.videoPreloadList[seekInfo.index]) {
		        var config = this.dataset.videoPreloadList[seekInfo.index];
		        config.autoplay = true;
		        config.currentTime = seekTime - seekInfo.prevDurtion;
		        config.updateIndex = seekInfo.index;
		        this.context.msg.broadcast(api.privateApi.setFocusVideoUrl, config);
		      }
		    }
		    if (options && options.showTips) {
		      var textTime = '<a>' + util.formatPlayTime(seekTime) + '</a>';
		      that.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '您上次观看至 '+textTime+' 处，正在为您续播',
		        time: 3
		      });
		    }
		  },
		  play: function(options){
		    if (this.context.msg.run(api.privateApi.isPlayingAd)){
		      this.context.msg.broadcast(api.privateApi.setFocusVideoPlay);
		      return;
		    }
	
		    if ($.type(options)==='undefined' || (
		      $.type(options)==='object' && !options.vid
		    )) {
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
		    }
		    if ($.type(options)==='string'){
		      options = {
		        vid: options,
		        autoplay: true
		      }
		    }else if($.type(options)==='object' && !options.vid){
		      if (!options.nextVid) options = {};
		    }
		    // 播放下一个视频前，触发beforeVideoPlay
		    if (options && options.vid && options.vid !== this.dataset.vid) {
		      // beforeVideoPlay触发前更新vid的值
		      if (options.hasOwnProperty('vid')) this.setVid(options.vid);
		      this.context.msg.broadcast(api.eventApi.beforeVideoPlay)
		    }
		    if (options.hasOwnProperty('vid'))
		      this.setVid(options.vid);
		    if (options.hasOwnProperty('autoplay'))
		      this.dataset.autoplay = options.autoplay;
		    if (options.hasOwnProperty('isNeedPay'))
		      this.dataset.isNeedPay = options.isNeedPay;
		    if (options.hasOwnProperty('nextVid'))
		      this.dataset.nextVid = options.nextVid;
		    if (options.hasOwnProperty('bullet'))
		      this.dataset.bullet = options.bullet;
		    if (options.hasOwnProperty('bulletId'))
		      this.dataset.bulletId = options.bulletId;
		    if (options.hasOwnProperty('playStartTime'))
		      this.dataset.playStartTime = options.playStartTime;
		    if (options.hasOwnProperty('playEndTime'))
		      this.dataset.playEndTime = options.playEndTime;
		    if (options.hasOwnProperty('defaultDefinition'))
		      this.dataset.defaultDefinition = options.defaultDefinition;
		    if (options.connectionPlayTime)
		      this.dataset.connectionPlayTime = options.connectionPlayTime;
		    else
		      this.dataset.connectionPlayTime = 0;
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
		  },
		  pause: function(){
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
		    if (this.dataset.connectionPlayTime) {
		      playStartTime = this.dataset.connectionPlayTime;
		    }
		    return playStartTime;
		  },
		  getConnectionPlayTime: function(){
		    return this.dataset.connectionPlayTime;
		  },
	
		  showDebugLogs: function(){
		    if (!Txplayer.dataset.debug) return;
		    var logData = {};
		    this.context.msg.on(api.eventApi.onSetDefinitionStart, function(){
		      logData.setDefinitionStart = +new Date();
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionDone, function(){
		      logData.setDefinitionEnd = +new Date();
		      util.showInfo('切换清晰度耗时', (logData.setDefinitionEnd-logData.setDefinitionStart)+'毫秒');
		    });
		  },
	
		  // 计算跳转时间信息
		  getVideoSeekToInfo: function(time){
		    var count = 0, index;
		    $(this.dataset.videosData).each(function(idx, item){
		      index = idx;
		      count += item.duration;
		      if (count>time) {
		        count -= item.duration;
		        return false;
		      }
		    });
		    return {
		      index: index,
		      prevDurtion: count
		    };
		  },
		  // 事件处理
		  addEventListener: function(){
		    var that = this;
		    this.dataset.eventsList = {};
		    this.dataset.isLoadingAdEmpty = true;
	
		    this.context.msg.on(api.eventApi.onLoadingadIsEmpty, function(){
		      that.dataset.isLoadingAdEmpty = true;
		      var config = {autoplay: true};
		      config.playStartTime = that.getSkipPreludeTime();
		      that.loadVideoUrls(config);
		    });
		    this.context.msg.on(api.eventApi.onLoadingAdRequestError, function(){
		      that.dataset.isLoadingAdEmpty = true;
		      var config = {autoplay: true};
		      config.playStartTime = that.getSkipPreludeTime();
		      that.loadVideoUrls(config);
		    });
		    // 广告播放异常处理
		    this.context.msg.on(api.eventApi.onLoadingAdPlayError, function(data){
		      if (that.dataset.hasLoadVideoUrl || !data.isLastAd){
		        that.context.msg.broadcast(api.privateApi.playTheNext);
		      }else{
		        var config = {autoplay: true};
		        config.playStartTime = that.getSkipPreludeTime();
		        that.loadVideoUrls(config);
		      }
		    });
		    this.context.msg.on(api.eventApi.onSectionPlaying, function(data){
		      if (that.context.msg.run(api.privateApi.getCurrentPlayListType)==='film') {
		        that.dataset.hasVideoPlayed = true;
		      }else{
		        if (that.dataset.isLoadingAdEmpty) return;
		        if (that.dataset.hasLoadVideoUrl) return;
		        that.loadVideoUrls();
		      }
		    });
		    this.context.msg.on(api.eventApi.onSectionPlay, function(data){
		      if (that.dataset.hasVideoPlayed) return;
		      if ( that.context.msg.run(api.privateApi.getCurrentPlayListType)!=='film' ) return;
		    });
		    this.context.msg.on(api.eventApi.onSectionEnded, function(data){
		      // 广告播放完，清空广告播放列表
		      if (data.playListTypeEnd && data.playListType!=='film') {
		        var key = api.eventApi.onSectionPlay + '.clearPlaylist';
		        that.context.msg.once(key, function(){
		          that.context.msg.broadcast(api.privateApi.clearPlaylist, data.playListType);
		        });
		      }
		      // 正片播放完成，重置播放状态为没有播放过
		      if (data.playListTypeEnd && data.playListType==='film'){
		        that.dataset.hasVideoPlayed = false;
		      }
		      // 全部播放完成，重置index
		      if (data.isAllEnd){
		        that.dataset.hasLoadVideoUrl = false;
		        that.context.msg.broadcast(api.privateApi.clearPlaylist);
		      }
		    });
		    this.context.msg.on(api.eventApi.onLoadingAdDataReady, function(data){
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
		    });
		    this.context.msg.on(api.eventApi.onEndingAdDataReady, function(data){
		      if (!data || $.type(data)!=='array' || !data.length) {
		        return;
		      }
		      var adUrls = [];
		      $(data).each(function(idx, item){
		        if (item.image.url) adUrls.push({
		          url: item.image.url,
		          type:'endingad'
		        });
		      });
		      if (adUrls.length===0) {
		        return;
		      }
		      that.context.msg.broadcast(api.privateApi.addUrls2Player, adUrls);
		      that.context.msg.broadcast(api.privateApi.play);
		    });
		    this.context.msg.on(api.eventApi.onInsertAdDataReady, function(data){
		      if (!data.data || !data.insertTime) return;
		      var insertInfo = that.getVideoSeekToInfo(data.insertTime);
		      if ( !(insertInfo && insertInfo.hasOwnProperty('index')) ) return;
		      var list = [];
		      $(data.data).each(function(idx, item){
		        list.push({
		          url: item.image.url,
		          type: 'insertad'
		        });
		      });
		      var config = {
		        data: list,
		        type: 'insertad',
		        startIndex: insertInfo.index + 1
		      };
		      that.context.msg.broadcast(api.privateApi.addUrls2Player, config);
		      that.context.msg.broadcast(api.privateApi.lockAndPreloadNext);
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionStart, function(data){
		      var definitionName = definitionMap[data];
		      if (!definitionName) return;
		      definitionName = '<a>[' + definitionName + ']</a>';
		      that.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: '正在为您切换清晰度' + definitionName,
		        time: 40
		      });
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionDone, function(data){
		      that.context.msg.broadcast(api.privateApi.hideUiTips);
		    });
		    this.context.msg.on(api.eventApi.onSetDefinitionFail, function(data){
		      that.context.msg.broadcast(api.privateApi.showUiTips, {
		        text: 'sorry, 切换清晰度失败, 请稍后重试',
		        time: 5
		      });
		    });
		    this.context.msg.on(api.eventApi.onVideoInterruptByError, function(){
		      if(that.dataset.getVkeyErrorData && that.dataset.getVkeyErrorData.em===83){
		        that.context.userMsg.broadcast(api.eventApi.showUIVipGuide,{
		          trialFinish: true
		        });
		      }
		      else if (that.dataset.getVideoInfoErrorData && that.dataset.getVideoInfoErrorData.code===91) {
		        that.context.userMsg.broadcast(api.eventApi.showUIVipGuide,{
		          switchDefinitionFail: true
		        });
		      }
		    });
		    this.context.msg.on(api.eventApi.onSeekStart, function(){
		      that.dataset.isVideoSeeking = true;
		      util.showInfo('seek-start', +new Date());
		    });
		    this.context.msg.on(api.eventApi.onSeekEnded, function(){
		      that.dataset.isVideoSeeking = false;
		      util.showInfo('seek-end', +new Date());
		    });
		    this.context.msg.on(api.privateApi.isVideoSeeking, function(data, options){
		      var isSeeking = that.dataset.isVideoSeeking;
		      if (!isSeeking){
		        isSeeking = that.context.msg.run(api.privateApi.isFocusVideoSeeking);
		      }
		      options.data = isSeeking;
		    });
		  },
		  // 对外提供的接口
		  exportsModuleApis: function(){
		    var that = this;
		    this.dataset.privateApis = {};
		    this.dataset.moduleApis = {};
	
		    this.dataset.moduleApis[api.publicApi.getDuration] = function(data, options){
		      options.data = that.getDuration();
		    }
		    this.dataset.moduleApis[api.publicApi.getFileSize] = function(data, options){
		      options.data = that.getFileSize();
		    }
		    this.dataset.moduleApis[api.publicApi.getVideoSize] = function(data, options){
		      options.data = that.getVideoSize();
		    }
		    this.dataset.moduleApis[api.publicApi.getDefinition] = function(data, options){
		      options.data = that.getDefinition();
		    }
		    this.dataset.moduleApis[api.publicApi.getDefinitionList] = function(data, options){
		      options.data = that.getDefinitionList();
		    }
		    this.dataset.moduleApis[api.publicApi.setDefinition] = function(data, options){
		      options.data = that.setDefinition(data);
		    }
		    this.dataset.moduleApis[api.publicApi.getCurrentTime] = function(data, options){
		      options.data = that.getCurrentTime();
		    }
		    this.dataset.moduleApis[api.publicApi.seekTo] = function(data, options){
		      that.seekTo(data);
		    }
		    this.dataset.moduleApis[api.publicApi.play] = function(data){
		      if (!data) data = {};
		      if ($.type(data)==='object' && $.type(data.nextVid)==='undefined') data.nextVid = that.dataset.nextVid;
		      that.play(data);
		    }
		    this.dataset.moduleApis[api.publicApi.pause] = function(data){
		      that.pause();
		    }
		    this.dataset.moduleApis[api.publicApi.getVid] = function(data, options){
		      options.data = that.getVid();
		    }
		    this.dataset.moduleApis[api.publicApi.getPlayerId] = function(data, options){
		      options.data = that.dataset.playerId;
		    }
		    this.dataset.moduleApis[api.publicApi.setSmallWindowMode] = function(data, options){
		      if (data){
		        that.context.msg.broadcast(api.privateApi.hideUiControl, {isMoveBelow: false});
		      }else{
		        that.context.msg.broadcast(api.privateApi.showUiControl, {isMoveBelow: false});
		      }
		    };
		    $.each(this.dataset.moduleApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
	
	
		    this.dataset.privateApis[api.privateApi.getDefinitionFormat] = function(data, options){
		      options.data = that.getDefinitionFormat();
		    }
		    this.dataset.privateApis[api.privateApi.getVideoInfoData] = function(data, options){
		      options.data = that.dataset.getinfoJSON;
		    }
		    this.dataset.privateApis[api.privateApi.getVideosOriginData] = function(data, options){
		      options.data = that.dataset.videosData;
		    }
		    this.dataset.privateApis[api.privateApi.getRequestId] = function(data, options){
		      options.data = that.dataset.requestId || '';
		    }
		    this.dataset.privateApis[api.privateApi.hasLoadingAd] = function(data, options){
		      options.data = !that.dataset.isLoadingAdEmpty;
		    }
		    this.dataset.privateApis[api.privateApi.getBufferedTime] = function(data, options){
		      options.data = that.getBufferedTime();
		    }
		    this.dataset.privateApis[api.privateApi.getConnectionPlayTime] = function(data, options){
		      options.data = that.getConnectionPlayTime();
		    }
		    $.each(this.dataset.privateApis,function(key, fn){
		      that.context.msg.on(key, fn);
		    })
		  }
		};
	
		Txplayer.register('HdPlayerControl', HdPlayerControl);
	
	/***/ },
	/* 28 */
	/***/ function(module, exports) {
	
		var errorCode = {
		  10001: '初始化错误',
		  50: 'CGI系统错误,请刷新页面重试',
		  51: 'vid个数超出范围',
		  52: '访问视频付费信息失败，请刷新页面重试',
		  64: '校验视频付费信息失败，请刷新页面重试',
		  61: '您请求的视频已下架',
		  62: '视频状态不合法',
		  63: '清晰度格式不合法',
		  65: '速度格式不合法',
		  66: '视频格式不存在',
		  68: 'CGI系统错误,请刷新页面重试',
		  69: 'format列表为空',
		  71: '未找到HLS CDN',
		  73: '生成文件名失败',
		  74: '分片号不合法',
		  76: '获取m3u8文件名失败',
		  77: '生成HLS key失败',
		  81: 'referer限制',
		  82: 'qzone权限限制',
		  84: '访问IP是黑名单',
		  86: 'CGI访问频率限制'
		};
	
		module.exports = errorCode;
	
	/***/ }
	/******/ ]);
