/**
 * Created by lenovo on 2018/8/4.
 */

var babyObj= function () {
    //x，y，旋转角度
    this.x;
    this.y;
    this.angle;

    /* this.babyEye=new Image();
     this.babyTail=new Image();
     this.babyBody=new Image();*/

    //鱼尾巴的定时器
    this.babyTailTimer=0;
    this.babyTailCount=0;
    //鱼眼睛
    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    //多长时间眨眼
    this.babyEyeInterval=1000;
    //鱼身体
    this.babyBodyTimer=0;
    this.babyBodyCount=0;
}

babyObj.prototype.init= function () {
    //鱼的位置应该在正中间
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5+50;
    this.angle=0;

    //图片不能规定死
   /* this.babyTail.src="images/babyTail0.png";
    this.babyEye.src="images/babyEye0.png";
    this.babyBody.src="images/babyFade0.png";*/

}

babyObj.prototype.draw= function () {
    //小鱼跟着大鱼走
    //目标位置  当前位置    0.95倍的速率，去接近目标
    this.x=lerpDistance(mom.x,this.x,0.95);
    this.y=lerpDistance(mom.y,this.y,0.95);

    //旋转角度  Math.atan2计算
    var deltaX=mom.x-this.x;   //只有慢慢接近，这个值才不是0
    var deltaY=mom.y-this.y;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    //计算旋转
    this.angle=lerpAngle(beta,this.angle,0.6);

    //鱼尾        setInterval(function(){},);
    this.babyTailTimer+=daltaTime;
    if( this.babyTailTimer>50 ){
        // 0 1 2 3 4 5 6 7 8
                                //  8个一循环
        this.babyTailCount=(this.babyTailCount+1)%8;
        this.babyTailTimer%=50;
    }
    var babyTailCount=this.babyTailCount;

    //眼睛
    this.babyEyeTimer+=daltaTime;
    if( this.babyEyeTimer> this.babyEyeInterval ){
        this.babyEyeCount=(this.babyEyeCount+1)%2;
        this.babyEyeTimer%=this.babyEyeInterval;
        //睁眼的时间肯定比眨眼的时间长   而且       睁眼的时间不固定
        if(this.babyEyeCount==0){
            this.babyEyeInterval=Math.random()*1500+2000;
        }else{
            this.babyEyeInterval=200;  //闭眼的时间
        }
    }
    var babyEyeCount=this.babyEyeCount;

    //身体
    var flag=false;
    this.babyBodyTimer+=daltaTime;
    if( this.babyBodyTimer> 300 ){
        this.babyBodyCount=this.babyBodyCount+1;
        this.babyBodyTimer%=300;

        if( this.babyBodyCount>19 ){
            //游戏结束
            this.babyBodyCount=19;

            data.flag=true;
        }
        this.babyBodyTimer=0
    }
    var babyBodyCount=this.babyBodyCount;


    ctx1.save();
    ctx1.translate(this.x,this.y);  //移动
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+20,-babyTail[babyTailCount].height*0.5);
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
    ctx1.restore();

}
/*var textAlpha;
 function gameOver() {
     flag=true;
     var textAlpha=textAlpha+daltaTime*0.0005;//透明度随时间变化
     if(textAlpha>1){
         textAlpha=1;
     }
    ctx1.save();
    ctx1.font = '40px verdana';
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    ctx1.globalAlpha=textAlpha;
    ctx1.fillStyle = "rgb(255, 255, 255)";
    ctx1.fillText("GAME OVER", canWidth * 0.5, canHeight * 0.5 - 25);
    ctx1.font = '25px verdana';
    ctx1.fillText("CLICK TO RESTART", canWidth * 0.5, canHeight * 0.5 + 25);
    ctx1.restore();
}*/
