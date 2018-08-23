/**
 * Created by lenovo on 2018/8/4.
 */

var orgObj= function () {
    this.x=[];
    this.y=[];
    //先从小的圆圈开始，慢慢变大
    this.alive=[];
    this.r=[];
}

orgObj.prototype.num=3;

orgObj.prototype.init= function (index) {
    for(var i=0;i<this.num;i++){
        this.x[i]=0;
        this.y[i]=0;
        this.alive[i]=false;
        this.r[i]=0;
    }
}


orgObj.prototype.draw= function () {
    if(data.flag){
        return;
    }
    ctx1.save();
    ctx1.lineWidth=2;
    ctx1.shadowBlur=10;         //阴影
    ctx1.shadowColor="white";   //阴影颜色
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            this.r[i]+=daltaTime*0.02;
            //大到一定地步，就消失
            if(this.r[i]>60){
                this.alive[i]=false;
                return;
            }
            //透明度  与半径成反比
            var alpha=1-this.r[i]/60;
            ctx1.beginPath();
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2,false);
            ctx1.strokeStyle="rgba(255,157,51,"+alpha+")";
            ctx1.stroke();
            ctx1.closePath();
        }
    }
    ctx1.restore();
}

orgObj.prototype.bornOrg= function () {
    for(var i=0;i<this.num;i++){
        if(!this.alive[i]){
            //出生
            this.alive[i]=true;
            this.r[i]=20;
            this.x[i]=baby.x;
            this.y[i]=baby.y;
            return;
        }
    }
}
