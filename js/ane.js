/**
 * Created by lenovo on 2018/8/2.
 */

//面对对象编程
var aneObj= function () {
    //有很多很多海葵
    this.x=[];      //起始点坐标
    this.len=[];      //终止点坐标
    this.amp=[];   // 振幅
    this.alpha=0;//角度
    this.headx=[];   //头部坐标
    this.heady=[];   //头部坐标
}

//利用prototype原型链，来扩展一个对象的属性和方法

//规定数量
aneObj.prototype.num=50;

//确定值
aneObj.prototype.init= function () {
    for(var i=0;i<this.num;i++){
        //随机的值
        //      每次前进16px 就是越过上一个海葵   距离可控范围为20
        this.x[i]=16*i+Math.random()*20;
        //首先，保证有多高    随机的范围  200-250
        this.len[i]=200+Math.random()*50;
        this.amp[i]=Math.random()*35+25;
        this.headx[i]=this.x[i];
        this.heady[i]=canHeight-this.len[i];
    }
}

//开始画海葵
aneObj.prototype.draw= function () {
    this.alpha+=daltaTime*0.0012;
    var l=Math.sin(this.alpha);
    ctx2.save();
    ctx2.lineWidth=20;
    ctx2.globalAlpha=0.6;       // 透明度
    //ctx2.lineCap="round";     //圆头
    ctx2.lineJoin="round";      //设置圆尾
    ctx2.strokeStyle="#3b154e";
    //开始画
    for(var i=0;i<this.num;i++){
        ctx2.beginPath();
        //核心代码
        ctx2.moveTo(this.x[i],canHeight);
        this.headx[i]=this.x[i]+l*this.amp[i];//当前海葵的头部坐标
                                // 得到海葵到顶端的距离,从该点往下画海葵
        //quadraticCurveTo能画弧线,quadraticCurveTo() 方法通过使用表示二次贝塞尔曲线的指定控制点，向当前路径添加一个点。
        ctx2.quadraticCurveTo(this.x[i],canHeight-this.len[i],this.headx[i],this.heady[i]);
        ctx2.closePath();
        ctx2.stroke();
    }
    ctx2.restore();
}