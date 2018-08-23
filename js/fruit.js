/**
 * Created by lenovo on 2018/8/2.
 */
//对象函数
var fruitObj= function () {
    //坐标
    this.x=[];
    this.y=[];
    //控制果实的生长大小
    this.l=[];
    //速度
    this.speed=[];
    this.fruitType=[];    //类型
    this.alive=[];    //是否存活

    this.orange=new Image();
    this.blue=new Image();
}

//最多最多30个
fruitObj.prototype.num=30;
//我们可以通过对象的原型链  prototype  来扩展这个对象的属性和方法   相当于共有的
fruitObj.prototype.init= function () {
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;   //存活
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.speed[i]=0.005+Math.random()*0.015;    //  0.005~0.02
        this.fruitType[i]="";
    }
    this.orange.src="images/fruit.png";
    this.blue.src="images/blue.png";
}

//生出果实
fruitObj.prototype.born= function (i) {
    //果实并不是随机长的，而是选择了一个海葵，在海葵上面生长
    var aneId=Math.floor(Math.random()*ane.num);   //数组的索引
    //果实的位置有了
    this.x[i]=ane.x[aneId];
    this.y[i]=canHeight-ane.len[aneId];
    this.l[i]=0;
    this.alive[i]=true;

    //控制这个果实，是黄色的，还是蓝色的
    if( Math.random()>0.15 ){
        this.fruitType[i]="orange";
    }else{
        this.fruitType[i]="blue";
    }
}

//画果实
fruitObj.prototype.draw= function () {
    for(var i=0;i<this.num;i++){
        //我们要控制果实的生长，以及果实的数量
        if( this.alive[i] ){
            //设定果实的颜色
            if( this.fruitType[i]=="blue" ){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
            //果实怎么长大的？
            //果实不能一直变大
            if(this.l[i]<=14){
                                // 电脑越好，越流畅，那么果实走的时间应该越快
                this.l[i]+=this.speed[i]*daltaTime;
            }else{
                //果实成熟了，往上飘
                this.y[i]-=this.speed[i]*daltaTime*8;
            }

            //说是说长  在代码里面，本质  画图片
                        //  什么颜色   什么位置          多大
            ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

            //死亡
            if(this.y[i]<10){
                this.alive[i]=false;
            }
        }
    }
}

//定义入口点
function fruitMonitor(){
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]){
            //统计活着的数量
            num++;
        }
    }
    //控制在15个
    if(num<15){
        //让你出生一个
        sendFruit();
        return;
    }
}

function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        //生长        你死了，才能重新复活
        if( !fruit.alive[i] ){
            //果实出生
            fruit.born(i);
            return;
        }
    }
}

fruitObj.prototype.dead= function (i) {
    this.alive[i]=false;
}