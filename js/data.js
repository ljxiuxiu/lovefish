/**
 * Created by lenovo on 2018/8/4.
 */
var dataObj= function () {
    //果实数量
    this.fruitNum=0;
    //分数    默认是1倍  吃了蓝色的，分数为两倍
    this.double=1;
    this.score=0;
    this.flag=false;
}

dataObj.prototype.draw= function () {
    ctx1.fillStyle="white";
    ctx1.font="bold 18px 华文新魏";
    ctx1.textAlign='center';
    ctx1.fillText("num："+this.fruitNum,canWidth*0.5,canHeight-20);
    ctx1.fillText("double："+this.double,canWidth*0.5,canHeight-50);
    ctx1.font="bold 36px verdana";
    ctx1.fillText("score："+this.score,canWidth*0.5,canHeight-550);
    if(this.flag){
        var textAlpha=textAlpha+daltaTime*0.0005;//透明度随时间变化
        if(textAlpha>1){
            textAlpha=1;
        }
        ctx1.font = '40px verdana';
        ctx1.shadowBlur = 10;
        ctx1.shadowColor = "white";
        ctx1.globalAlpha=textAlpha;
        ctx1.fillStyle = "rgb(255, 255, 255)";
        ctx1.fillText("GAME OVER", canWidth * 0.5, canHeight * 0.5 - 25);
        ctx1.font = '25px verdana';
        ctx1.fillText("CLICK TO RESTART", canWidth * 0.5, canHeight * 0.5 + 25);
    }
}
dataObj.prototype.addScore= function () {
    this.score+=this.fruitNum*3*this.double;
}
dataObj.prototype.reset= function () {
    this.fruitNum=0;
    this.double=1;
}