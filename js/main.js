/**
 * Created by lenovo on 2018/8/2.
 */

document.body.onload=game;


//先定义一堆的变量
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var bgPic;
var ane;        //海葵
var fruit;       //果实
var mom;        //大鱼
var data;
var wave;
var waveOrg;

var daltaTime;
var lastTime;

//定义鼠标x，y坐标
var mx=0;
var my=0;

//定义小鱼的动画的图片
var babyTail=[];
var babyEye=[];
var babyBody=[];

//定义大鱼的动画的图片
var bigEye=[];
var bigTail=[];
var momBodyOrange=[];
var momBodyBlue=[];

//整个游戏的主入口
function game(){
    //游戏的初始化
    init();
    //setInterval(gameLoop,60);
    //一开始，应该先得到一个时间
    lastTime=new Date();
    gameLoop();
}

function init(){
    can1=document.getElementById("canvas1");
    ctx1=can1.getContext("2d");     //绘制鱼   UI  特效

    can1.onmousemove= function (e) {
        //注意，没有做兼容
        mx=e.offsetX;
        my=e.offsetY;
    }

    can2=document.getElementById("canvas2");
    ctx2=can2.getContext("2d");     //绘制背景，鱼食

    //在canvas上面绘制图片
    canWidth=can1.width;
    canHeight=can1.height;
    //背景图片
    bgPic=new Image();
    //js的加载图片，会把路径调整到与网页相关的路径
    //css的加载图片，映射   以css文件为基准
    bgPic.src="images/background.jpg";
    //等待图片加载完之后再显示出来
    //bgPic.onload= function () {
        ctx2.drawImage(bgPic,0,0,canWidth,canHeight);

        //画海葵
        ane=new aneObj();
        ane.init();


        fruit=new fruitObj();
        fruit.init();

        mom=new momObj();
        mom.init();

        baby=new babyObj();
        baby.init();

    //小鱼图片
    for(var i=0;i<8;i++){
        babyTail[i]=new Image();
        babyTail[i].src="images/babyTail"+i+".png";

        bigTail[i]=new Image();
        bigTail[i].src="images/bigTail"+i+".png";

        momBodyOrange[i]=new Image();
        momBodyOrange[i].src="images/bigSwim"+i+".png";
        momBodyBlue[i]=new Image();
        momBodyBlue[i].src="images/bigSwimBlue"+i+".png";


    }
    for(var i=0;i<2;i++){
        babyEye[i]=new Image();
        babyEye[i].src="images/babyEye"+i+".png";

        bigEye[i]=new Image();
        bigEye[i].src="images/bigEye"+i+".png";
    }
    for(var i=0;i<20;i++){
        babyBody[i]=new Image();
        babyBody[i].src="images/babyFade"+i+".png";
    }

    data=new dataObj();

    wave=new waveObj();
    wave.init();
    waveOrg=new orgObj();
    waveOrg.init();
    //}
}

function gameLoop(){
    //自动的，计算帧，然后每次调用这个函数        原理 和定时器的原理，是差不多的
    window.requestAnimationFrame(gameLoop);
    var now=new Date();
    daltaTime=now-lastTime;     //看成是定时器的时间   setInterval(gameLoop,60);
                                    //只不过定时器的时间是死的，我们这个时间是活的
    lastTime=now;

    //清空画布
    ctx2.drawImage(bgPic,0,0,canWidth,canHeight);

    //无限制的让海葵摆动
    ane.draw();

    //无限制的出生果实
    fruitMonitor();
    fruit.draw();

    //这里ctx1里面的东西，也要清空画布
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    baby.draw();
    momFruitCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    waveOrg.draw();
}