 var monkey,monkeyAnime,monkeyCol;
 var banana, bananaImg;

 var obs, obsImg;
 var obsGroup;
 var back,backImg;
 var score=0;
 var ground;
 var foodGroup;
 var state=1 ;
 var col=0; 

function preload()
{
 monkeyCol=loadImage("Monkey_01.png");
  
monkeyAnime=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png") ;
 
  bananaImg=loadImage("banana.png"); 
  obsImg=loadImage("stone.png");
  backImg=loadImage("jungle.jpg")
  }

function setup() {
  createCanvas(600, 300);
  ground=createSprite(300,280,600,2);
  ground.visible=false;
  
  obsGroup= new Group();
  foodGroup=new Group();
  
   back=createSprite(200,10);
  back.addImage("back",backImg);
  back.scale=1.4;
  
   monkey = createSprite(80, 250);
  monkey.addAnimation("anime",monkeyAnime);
  monkey.scale=0.12;
  
}

function draw() {
  background(0,0,0);
   monkey.collide(ground);
   console.log(state);

  if(state==1){
  monkey.velocityY=monkey.velocityY+0.8;
  
 back.velocityX=-3;
  if(back.x<0){
    back.x=back.width/2;
  }
  
 if(keyDown("space")&&monkey.y>200){
    monkey.velocityY=-16;
  }
 
 if(monkey.isTouching(foodGroup)){
 score=score+5;  
  if(col==1){
   col=col-1;
  }  
    
 foodGroup.destroyEach();
 }

 switch(score)
 {
   case 10: monkey.scale=0.14;
     break;
   case 20: monkey.scale=0.16;
     break;  
   case 30: monkey.scale=0.18;
     break;  
   case 40: monkey.scale=0.20;
     break; 
   defalt:break;  
 }
  
   
 if(monkey.isTouching(obsGroup)){
   col=col+1;
   obsGroup.destroyEach();
 }   
 
 if(col===1 && monkey.scale>0.12){
   monkey.scale=monkey.scale-0.02;
 }   
  
 if(col==2 && state===1){
   state=0;
 }   
    
   obstacle();
   food();
    
  }
 
  if(state===0){
    back.velocityX=0;  
   }
  
  drawSprites();
  
  if(state===0){
 over();
    if(keyDown("r")){
      reset();
    }
  }
  
 stroke("white"); 
 textSize(20);
 fill("white"); 
 text("Survival Time: "+score,400,50);
 
}


function food(){

if(frameCount%130==0){
 banana = createSprite(600,random(120,200),2,2);
 banana.addImage("banana",bananaImg);
 banana.scale=0.06;
 banana.velocityX=-5;
 banana.lifetime=120;
 foodGroup.add(banana);
}
}


function obstacle(){
if(frameCount%300==0){
 var obs = createSprite(600,260,2,2);
 obs.addImage("Stone",obsImg);
 obs.scale=0.12;
 obs.velocityX=-6;
 obs.lifetime=100;
 obsGroup.add(obs);
}  
}

function over(){
  stroke("white"); 
 textSize(20);
 fill("white"); 
 text("GAME OVER",280,150);
  
 text("Press R to restart",280,170) 
}

function reset(){
  score=0;
  col=0;
   state=1;
}









