/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 14:24:07
 * @LastEditTime: 2019-10-15 14:59:07
 * @LastEditors: Please set LastEditors
 */
( function ($,root) {
    
    function IndexControl (len) {
        this.index = 0;
        this.len = len;
    }

    IndexControl.prototype = {
        prev: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }

    }

    root.indexControl = IndexControl;
})(window.Zepto,window.player || (window.player = {}));