/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 13:41:30
 * @LastEditTime: 2019-10-17 09:50:30
 * @LastEditors: Please set LastEditors
 */
(function ($,root) {

    function AudioManager () {

        this.audio = new Audio();
        this.status = 'pause';  //音频默认状态
        this.timer;
        this.duration = 0;
        // this.audio.oncanplay = function () {
        //     this.duration = this.audio.duration;
        // };
        this.curTime = this.audio.currentTime;


    }
    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'audio';
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        renderControl: function () {
            var that = this;
            var duration,
                minu,
                seco,
                allTimeStr = '';
            this.audio.oncanplay = function () {
                duration = that.audio.duration;
                that.duration = duration;
                // duration = this.duration;
                minu = parseInt(duration / 60);   //获取分钟
                seco = Math.round(duration % 60);   //获取秒
                if (minu < 10) {
                    allTimeStr = `0${minu}:${seco}`
                } else if (minu >= 10) {
                    allTimeStr = `${minu}:${seco}`
                }
                
            $('.alltime').html(allTimeStr);
            }
        },
        renderCurrentTime: function () {
            var curTimeStr = '',
                nowTime;
            var that = this;
            var barWidth = 0;
            var parentWidth = $('.bar-box').width();    //获取进度条父级的宽度
            
            this.timer = setInterval(function () {
                nowTime = that.audio.currentTime;
                that.curTime = nowTime;
                barWidth = nowTime * parentWidth / that.duration;
                $('.bar').width(barWidth);   //设置进度条的宽度
                minu = parseInt(nowTime / 60);   //获取分钟
                seco = parseInt(nowTime % 60);   //获取秒
                if (minu < 10) {
                    if (seco < 10) {
                        curTimeStr = `0${minu}:0${seco}`
                    } else {
                        curTimeStr = `0${minu}:${seco}`
                    }
                } else if (minu >= 10) {
                    if (seco < 10) {
                        curTimeStr = `0${minu}:0${seco}`
                    } else {
                        curTimeStr = `0${minu}:${seco}`
                    }
                }
                $('.curtime').html(curTimeStr);
                // that.renderBar();
            },1000)
        },

        // renderBar : function () {
        //     var parentWidth = $('.bar-box').width();    //获取进度条父级的宽度
        //     var that = this;
        //     var barWidth = 0;
        //     var duration;
        //         duration = that.audio.duration;
        //         barWidth = parentWidth / (duration / this.curTime) 
        //     console.log(barWidth);
        //     $('.bar').width(barWidth);   //设置进度条的宽度
        
        // }
    }

    root.audioManager = new AudioManager() ;
})(window.Zepto,window.player || (window.player = {}))