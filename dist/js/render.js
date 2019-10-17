/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 12:42:01
 * @LastEditTime: 2019-10-16 17:11:59
 * @LastEditors: Please set LastEditors
 */


(function ($,root) {

    /**
     * 渲染图片
     * @param {*} src 图片路径
     */
    function renderImg (src) {

        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src',src)
        }
    }

    function renderInfo (data) {
        var songInfo = `
        <P class="song">${data.song}</P>
        <P class="album">${data.album}</P>
        <P class="singer">${data.singer}</P>`;

        $('.info').html(songInfo)
    }

    /**
     * 渲染是否喜欢
     * @param {*} isLike 
     */
    function renderIslike (isLike) {
        if (isLike) {
            $('.like').addClass('liking');
        } else {
            $('.like').removeClass('liking');
        }
    }



    /**
     * 接收传递过来的数据，统一执行方法
     */
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIslike(data.islike);

    };
})(window.Zepto,window.player || (window.player = {}))

