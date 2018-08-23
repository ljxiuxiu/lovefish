/**
 * Created by lenovo on 2018/8/4.
 */
var score=document.querySelector("span>em");
function momFruitCollision(){
    if(data.flag){
        return;
    }
    for(var i=0;i<fruit.num;i++){
        //循环判断每一个果实
        if(fruit.alive[i]){
            //计算距离 利用勾股定理来计算
            var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
            var len=calLength2(fruit.x[i],fruit.y[i],baby.x,baby.y);
            //如果鱼和果实的距离小于30
            if(l<900){
                //果实被吃掉
                fruit.dead(i);

                //大鱼的身体变化
                mom.bigBodyCount++;
                data.fruitNum++;
                //到了最大值，就不要变化了
                if(mom.bigBodyCount>7){
                    mom.bigBodyCount=7
                }
                //颜色
                if( fruit.fruitType[i]=="blue"){
                    data.double=2;
                }else{
                    data.double=1;
                }

                //画圆圈
                wave.bornWhite(fruit.x[i],fruit.y[i]);
            }
        }
    }
}


//大鱼喂小鱼
function momBabyCollision(){
    if(data.flag){
        return;
    }
    var l=calLength2(mom.x,mom.y,baby.x,baby.y);
    if(l<900){
        //大鱼的能量消失
        //小鱼的能力补满
        if(data.fruitNum>0){
            baby.babyBodyCount=0;
            mom.bigBodyCount=0;
            //注意，不能写在reset下面
            data.addScore();
            data.reset();
            waveOrg.bornOrg();
        }


    }
}