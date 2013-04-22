var f = function(){
	var _  = NEJ.P,
	    _v = _('nej.v'),
	    _t = _('nej.ut'),
	    _p = _('tst.ut'),
	    _proCustomCache;
	
	
	_p._$$CustomCache = NEJ.C();
	  _proCustomCache = _p._$$CustomCache._$extend(_t._$$AbstractListCache);
	
	
	_proCustomCache.__doLoadList = function(_options){
		
		// for test
		var _arr = [];
		var _len = _options.offset>=40?14:_options.limit;
		for(var i=0;i<_len;i++){
			_arr.push({id:+new Date+i,name:'user-'+(+new Date+i),loginTime:+new Date});
		}
		if (_options.offset==0){
			this._$setTotal(_options.key,54);
		}
		window.setTimeout(_options.onload._$bind(_options,_arr),1000);
		
	};
    /**
     * 从服务器上删除列表项，子类实现具体逻辑
     * @protected
     * @method {__doDeleteItem}
     * @param   {Object}   请求信息
     * @config  {String}   key      列表标识
     * @config  {Number}   id       列表项标识
     * @config  {String}   data     请求相关数据
     * @config  {Function} onload   列表项载入回调
     * @return {Void}
     */
    _proCustomCache.__doDeleteItem = function(_options){
    	
    	// for test
    	window.setTimeout(function(){
    		var _event = _options.onload(!0);
    		_v._$dispatchEvent(
    			_p._$$CustomCache,'listchange',_event);
    	},500);
    	
    };

    /**
     * 从服务器上删除列表项，子类实现具体逻辑
     * @protected
     * @method {__doDeleteItem}
     * @param   {Object}   请求信息
     * @config  {String}   key      列表标识
     * @config  {Number}   id       列表项标识
     * @config  {String}   data     请求相关数据
     * @config  {Function} onload   列表项载入回调
     * @return {Void}
     */
    _proCustomCache.__doUpdateItem = function(_options){
        
        // for test
        window.setTimeout(function(){
            var _event = _options.onload(_options.data);
            _v._$dispatchEvent(
                _p._$$CustomCache,'listchange',_event);
        },500);
        
    };
	
	_t._$$CustomEvent._$allocate({
		element:_p._$$CustomCache,
		event:'listchange'
	})
	
};
define('{pro}cache.js',
      ['{lib}util/event/event.js'
      ,'{lib}util/cache/cache.list.base.js'],f)
