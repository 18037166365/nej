/*
 * ------------------------------------------
 * 清除格式执行命令封装实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    '{lib}base/global.js',
    '{lib}base/klass.js',
    '{lib}util/editor/command/simple.js'
],function(NEJ,_k,_t0,_p,_o,_f,_r){
    /**
     * 清除格式执行命令封装
     * @class   {nej.ut.cmd._$$RemoveFormat} 左对齐执行命令封装
     * @extends {nej.ut.cmd._$$SimpleCommand}
     * @param   {Object} 可选配置参数
     */
    _p._$$RemoveFormat = _k._$klass();
    _p._$$RemoveFormat._$extend(_t0._$$SimpleCommand);
    /**
     * 命令名称
     * @type String
     */
    _p._$$RemoveFormat.command = 'RemoveFormat';
    // regist command implemention
    _p._$$RemoveFormat._$regist();

    if (CMPT){
        NEJ.copy(NEJ.P('nej.ut.cmd'),_p);
    }

    return _p;
});