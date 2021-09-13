var bgImg
var jetImg,jet;
var gameState ="start"
var alien,alienImg;
var asteroid,asteroidImg;
var powerPellet,powerPelletImg
var alienG,asteroidG,powerPelletG;
var jetSound
var life=3;
var score = 0;
var bullets,bulletG,bulletImg;
var alienScore=0;
var heartImg,heart1,heart2,heart3;




function preload(){
 bgImg=loadImage("images/bg.jpg")
 jetImg=loadImage("images/aircraft.png")
 alienImg=loadImage("images/alien1.png")
 asteroidImg=loadImage("images/rock.png")
 powerPelletImg=loadImage("images/power.png")
 jetSound=loadSound("sound/whoos.mp3")
 bulletImg=loadImage("images/missile.png")
 heartImg=loadImage("images/heart.png")
}

function setup() {
  createCanvas(500,700);
  jet=createSprite(250, 600, 50, 50);
  jet.addImage("jetImg",jetImg)
  jet.scale=0.3
  jet.visible=false
  alienG=new Group();
  asteroidG=new Group();
  powerPelletG=new Group();
  jet.debug=true;
  bulletG=new Group();

  heart1=createSprite(420,20)
  heart1.addImage("heartImg",heartImg);
  heart1.scale=0.1

  heart2=createSprite(450,20)
  heart2.addImage("heartImg",heartImg);
  heart2.scale=0.1

  heart3=createSprite(480,20)
  heart3.addImage("heartImg",heartImg);
  heart3.scale=0.1
  
  
}

function draw() {
  background(bgImg);  
  drawSprites();

  

  if (gameState === "start"){

    heart1.visible=false
    heart2.visible=false
    heart3.visible=false



    textSize(50)
    fill("")
    textFont("Fixedsys")
    text("-Mission Surival-",80,100)

    textSize(25)
    fill("white")
    textFont("Fixedsys")
    text("   Mr.Robert ,head of Space Agency",50,200)
    text("    and his team has found a planet",45,230)
    text("    which is good  for human survival.",40,260)
    text("      They want to protect the planet ",35,290)
    text("      from aliens and you have to go ",30,320)
    text("       on your jet and protect the planet.",25,350)
    text("Press 'S' to Start",160,550)

    if(keyDown("S")){
      gameState="play"
    }
  

   }

  if (gameState === "play"){ 
    
    textSize(25)
    fill("white")
    text("Score:"+Math.round(score),20,50)
    text("Alien Score:"+alienScore,20,80)

    score=score+0.05


    // jetSound.play();

    jet.visible=true


    if(keyDown(LEFT_ARROW)){
      jet.x=jet.x-10
    }
  
    
    if(keyDown(RIGHT_ARROW)){
      jet.x=jet.x+10
    }

    if(keyWentDown(UP_ARROW)){
      bullets=createSprite(jet.x,jet.y)
      bullets.velocityY=-17
      bullets.scale=0.08
      bullets.depth=jet.depth
      jet.depth+=1
      bullets.addImage("bulletImg",bulletImg)
      bullets.lifetime=800
      bulletG.add(bullets)
      
      
    }




    spawnAliens();
    spawnAsteroid();
    spawnPowerPellet();

    if(alienG.isTouching(jet)){

      life=life-1;
      alienG[0].destroy();

    }
    if(life===0){
      gameState = "end";
    
    }

    if(life===2){
      heart1.visible=true
      heart2.visible=true
      heart3.visible=false
    }

    if(life===1){
      heart1.visible=true
      heart2.visible=false
      heart3.visible=false
    }

    if(life===3){
      heart1.visible=true
      heart2.visible=true
      heart3.visible=true
    }


    if(bulletG.isTouching(alienG)){
      alienG[0].destroy();
      bulletG[0].destroy();
      alienScore+=1
    }

    if(asteroidG.isTouching(jet)){

      life=life-1;
      asteroidG[0].destroy();

    }

    // if(powerPelletG.isTouching(jet)){
    //   if(life)

    //   life=life+1;
    //   alienG[0].destroy();

    // }

  }

   if (gameState === "end"){
    heart1.visible=false
    heart2.visible=false
    heart3.visible=false
    textSize(25)
    fill("white")
    text("Score:"+Math.round(score),20,50)
    text("Alien Score:"+alienScore,20,80)
     text("Game Over",200,350);
    
     asteroidG.destroyEach();
     alienG.destroyEach();


   }



 

}

function spawnAliens(){

  if(frameCount%60===0){
    alien=createSprite(random(50,450),10,20,20)
    alien.velocityY=15
    alien.addImage("alienImg",alienImg)
    alien.scale=0.2
    alienG.add(alien);
    alien.debug=true;
    alien.setCollider("rectangle",0,0,300,50)
    alien.lifeTime=700
  }
  
}

function spawnAsteroid(){

  if(frameCount%200===0){
    asteroid=createSprite(random(50,450),10,20,20)
    asteroid.velocityY=15
    asteroid.addImage("asteroid",asteroidImg)
    asteroid.scale=0.2
    asteroidG.add(asteroid);
    asteroid.lifeTime=700


  }

}

function spawnPowerPellet(){

  if(frameCount%500===0){
    powerPellet=createSprite(random(50,450),10,20,20)
    powerPellet.velocityY=8
    powerPellet.addImage("powerPellet",powerPelletImg)
    powerPellet.scale=0.08
    powerPelletG.add(powerPellet);
    powerPellet.lifeTime=700

  }

}