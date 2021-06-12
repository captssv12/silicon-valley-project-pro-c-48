var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg,bgImg;
var mario, marioRunning,marioJumping;
var coin, coinG, coinImg;
var birdG, birdImg;
var pipeG, pipeImg;
var gameOver,gameOverImg,restart,restartImg;
var score;
var  pipe;

function preload(){

  bgImg=loadImage("bg.png");
  marioRunning=loadAnimation("mario_walking1.png","mario_walking2.png","mario_walking3.png");
  coinImg=loadImage("coin.png");
  birdImg=loadAnimation("bird1.png","bird2.png","bird3.png");
  pipeImg=loadImage("gumba.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");

}

function setup() {
  createCanvas(700,400);


bg=createSprite(200,200,100,100)
bg.addImage(bgImg)
bg.scale=1.9
bg.velocityX=-2

 invisibleGround = createSprite(100,320,2000,10);
 invisibleGround.visible = false;

 mario = createSprite(100,100,50,50);
 mario.addAnimation("running", marioRunning);
 mario.scale = 0.5;

 coinG=new Group();
birdG=new Group();
pipeG=new Group();

mario.setCollider("rectangle",0,0,10,80);
//mario.debug=true

gameOver = createSprite(400,150,10,10);
gameOver.addImage(gameOverImg);

restart = createSprite(400,230,10,10);
restart.addImage(restartImg);

gameOver.scale = 0.3;
restart.scale = 0.2;

score=0;

}

function draw(){

  background("blue");

  drawSprites();
textSize(25);
fill ("yellow")
  text("Score: "+ score, 500,50);

mario.collide(invisibleGround);

if(gameState === PLAY){
  gameOver.visible=false;
  restart.visible=false;

  //moving the bg
  if (bg.x < 270){
    bg.x = bg.width/1;
  }

if(coinG.isTouching(mario)){
  score=score+10;
  coinG[0].destroy();

}

//jump when space key is pressed
if(keyDown("space") && mario.y >= 139) {
  mario.velocityY = -12;
}
//add gravity
mario.velocityY = mario.velocityY + 0.8
//spawn coins,birds and pipe
spawnCoin();
spawnBird();
spawnPipe();


}
if(mario.isTouching(birdG)){
  gameState=END;
}

if(mario.isTouching(pipeG)){
  gameState=END;
}

 if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
    bg.velocityX = 0;
      mario.velocityY = 0
     
      //set lifetime of the game objects so that they are never destroyed
    birdG.setLifetimeEach(-1);
    pipeG.setLifetimeEach(-1);
    coinG.setLifetimeEach(-1)    ;
     birdG.setVelocityXEach(0);
     pipeG.setVelocityXEach(0);
     coinG.setVelocityXEach(0);
   }
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  //stop mario from falling down
  mario.collide(invisibleGround);


}


function spawnCoin()  {
  //write code here to spawn the clouds
  if (frameCount % 70 === 0) {
    coin = createSprite(600,100,40,10);
    coin.y = Math.round(random(150,200));
    coin.addImage(coinImg);
    coin.scale = 0.2;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 250;
    
    //adjust the depth
    coin.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //adding cloud to the group
   coinG.add(coin);
    }
}

function spawnBird() {
  if (frameCount % 110 === 0) {
    var bird = createSprite(600,100,40,10);
    bird.y = Math.round(random(100,200));
    bird.addAnimation("flying",birdImg);
    bird.scale = 0.2;
   bird.velocityX = -3;
    
     //assign lifetime to the variable
   bird.lifetime = 250;
    
    //adding cloud to the group
   birdG.add(bird);
    }
}

function spawnPipe() {
  //write code here to spawn the clouds
  if (frameCount % 170 === 0) {
     pipe = createSprite(700,315,50,50);
   // pipe.debug=true
    pipe.setCollider("rectangle",0,0,70,pipe.height);
pipe.addImage(pipeImg);
    //imageMode(CENTER)
    pipe.scale=0.05
    pipe.velocityX = -3;
    
     //assign lifetime to the variable
    pipe.lifetime = 250;

    //add each cloud to the group
    pipeG.add(pipe);
  }
  
}
function reset(){
  gameState = PLAY;
  birdG.destroyEach();
  pipeG.destroyEach();
  coinG.destroyEach();
 score=0;
  
}