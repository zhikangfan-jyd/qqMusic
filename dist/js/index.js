/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-14 16:00:25
 * @LastEditTime: 2019-10-17 09:45:04
 * @LastEditors: Please set LastEditors
 */


var root = window.player;

var audio = root.audioManager;


var len;
var nowIndex;
var data;
function getData () {
    $.ajax({
        type:'GET',
        url:'../mock/data.json',
        success: function (res) {
            data = res; //将获取到的数据保存到全局变量
            len = data.length;
            nowIndex = new root.indexControl(len);
            var i = nowIndex.index;
            root.render(data[i]);    //默认进入渲染第一首歌曲

            audio.getAudio(data[i].audio);
            audio.renderControl();
            audio.renderCurrentTime();
            renderMusicList(data);
            renderActive(i);

        },
        error: function (error) {
            console.log(error);
        }
    })
}

/**
 * 绑定事件
 */
function bindEvent () {
    $('body').on('playChange',function (e,index) {
        root.render(data[index]);
        audio.getAudio(data[index].audio);
        audio.renderControl();
        audio.renderCurrentTime()
        renderActive(index);
        if (audio.status == 'play') {
            audio.play();
            audio.renderCurrentTime()
            rotated(0);
            
        }
        $('.img-box').attr('data-deg',0); //将图片当前旋转的角度记录到当前的标签属性上面
        $('.img-box').css({
            'transform': 'rotate(0deg)',
            'transition':'none'
        })
    })

    $('.prev').on('click',function () {

        var i = nowIndex.prev();
        $('body').trigger('playChange',i)
    })

    $('.next').on('click',function () {

        var i = nowIndex.next();
        $('body').trigger('playChange',i);
    })

    $('.play').on('click',function () {
        if (audio.status == 'play') {
            audio.pause();
            clearInterval(audio.timer);
            clearInterval(timer);
        } else {
            audio.play();
            audio.renderCurrentTime();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        }
        $('.play').toggleClass('playing');
    })


    $('.list').on('click',function () {
        $('.musicList').toggleClass('musicAlert');
    })

}

var timer = null;
/**
 * 图片旋转
 */
function rotated (deg) {
    clearInterval(timer);
    deg = parseInt(deg);
    timer = setInterval(() => {
        deg += 2;
        $('.img-box').attr('data-deg',deg); //将图片当前旋转的角度记录到当前的标签属性上面
        $('.img-box').css({
            'transform': `rotate(${deg}deg)`,
            'transition':'all 1s easy-in'
        })
    }, 200);
}




/**
 * 根据数据进行渲染音乐列表
 * @param {*} data 
 */
function renderMusicList (data) {
    var eleStr = '';
    for (var i = 0 ; i < data.length ; i++) {
        eleStr+= `<li onclick=renderByIndex(${i})><span class='musicName'>${data[i].song}</span><span class='musicSinger'>${data[i].singer}</span></li>`
    }
    $('.musicList').html(eleStr);
}


/**
 * 根据索引值进行播放和渲染
 * @param {*} index 
 */
function renderByIndex (index) {
    root.render(data[index]);
    audio.getAudio(data[index].audio);
    audio.renderControl();
    audio.play();
    audio.renderCurrentTime();
    rotated(0);
    $('.play').removeClass('playing');
    $('.play').addClass('playing');
    $('.list').trigger('click');
    renderActive(index);
}


/**
 * 根据索引值进行为选中的li进行添加样式
 * @param {*} index 
 */
function renderActive (index) {
    $('li').removeClass('active');
    $('li').eq(index).addClass('active');
}


getData();
bindEvent();


