/**
 * Created by lenovo on 2018/8/4.
 */
var momObj= function () {
    //x，y，旋转角度
    this.x;
    this.y;
    this.angle;
    //鱼眼睛  鱼尾巴  鱼身体
    //this.bigEye=new Image();
    this.bigBody=new Image();
    //this.bigTail=new Image();

    //鱼尾巴的定时器
    this.bigTailTimer=0;
    this.bigTailCount=0;
    //鱼眼睛
    this.bigEyeTimer=0;
    this.bigEyeCount=0;
    //多长时间眨眼
    this.bigEyeInterval=1000;
    //鱼身体
    this.bigBodyCount=0;
}


momObj.prototype.init= function () {
    //鱼的位置应该在正中间
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;

    //图片不能规定死
    //this.bigEye.src="images/bigEye0.png";
    this.bigBody.src="images/bigSwim0.png";
    //this.bigTail.src="images/bigTail0.png";
}

momObj.prototype.draw= function () {
    //鱼的x,y跟着鼠标移动
            //目标位置  当前位置    0.95倍的速率，去接近目标
    this.x=lerpDistance(mx,this.x,0.95);
    this.y=lerpDistance(my,this.y,0.95);

    //如果直接等于，就看不到移动的变化
    //this.x=mx;
    //this.y=my;

    //旋转角度  Math.atan2计算
    var deltaX=mx-this.x;   //只有慢慢接近，这个值才不是0
    var deltaY=my-this.y;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    //计算旋转
    this.angle=lerpAngle(beta,this.angle,0.6);
    //鱼尾        setInterval(function(){},);
    this.bigTailTimer+=daltaTime;
    if( this.bigTailTimer>50 ){
        // 0 1 2 3 4 5 6 7 8
        //  8个一循环
        this.bigTailCount=(this.bigTailCount+1)%8;
        this.bigTailTimer%=50;
    }
    var bigTailCount=this.bigTailCount;

    //眼睛
    this.bigEyeTimer+=daltaTime;
    if( this.bigEyeTimer> this.bigEyeInterval ){
        this.bigEyeCount=(this.bigEyeCount+1)%2;
        this.bigEyeTimer%=this.bigEyeInterval;
        //睁眼的时间肯定比眨眼的时间长   而且       睁眼的时间不固定
        if(this.bigEyeCount==0){
            this.bigEyeInterval=Math.random()*1500+2000;
        }else{
            this.bigEyeInterval=200;  //闭眼的时间
        }
    }
    var bigEyeCount=this.bigEyeCount;

    var momBodyCount=this.bigBodyCount;

    ctx1.save();
    ctx1.translate(this.x,this.y);  //移动
    ctx1.rotate(this.angle);

    ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width*0.5+30,-bigTail[bigTailCount].height*0.5);
    //判断
    if(data.double==1){
        ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height*0.5);
    }else{
        ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
    }
    ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width*0.5,-bigEye[bigEyeCount].height*0.5);

    ctx1.restore();

}