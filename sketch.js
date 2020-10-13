  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  var monkey , monkey_running, monkey_stop
  var banana ,bananaImage, obstacle, obstacleImage

  var foodGroup, obstacleGroup

  var survivalTime = 0;
  var score;

  var ground2

function preload(){
  
  
 monkey_running =                      loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  
  createCanvas(600, 200);
  
  monkey = createSprite(80, 195, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
 
  ground = createSprite(400, 195, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  ground2 = createSprite(400, 195, 900, 10);
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalTime = 0;
  score = 0
  
  monkey.setCollider("rectangle",0,0,monkey.width = 100, monkey.height);

  
}

function draw() {

  background(180);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime, 400, 30);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 280, 30)
  
  if (gameState === PLAY) {
     
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
     if (foodGroup.isTouching(monkey)){
      score = score + 1;
   }
  
  if (keyDown("space")&& monkey.y >= 159.2) {
      monkey.velocityY = -14;
   }
    
      monkey.velocityY = monkey.velocityY + 0.8;
    
  if (ground.x < 0){
      ground.x = ground.width/ 2;
   }
    
      spawnBanana();
      spawnObstacle();
    
  if (foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
   }
    
  if(obstacleGroup.isTouching(monkey)) {
     gameState = END;   
   }
    
  } else if (gameState === END) {
     ground.velocityX = 0;
     monkey.velocityY = 0;
     foodGroup.velocityX = 0;
     obstacleGroup.velocityX = 0; 
    
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
    
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0); 
    
    
    
  }
   
     monkey.collide(ground);
 
  drawSprites();
}

function spawnBanana() {
  
  if (frameCount % 90 === 0) {
      var banana = createSprite(600, 120, 20, 20);
      banana.y = Math.round(random(20,170));
      banana.addImage(bananaImage);
      banana.scale =0.1;
      banana.velocityX = -6;
      banana.lifetime = 100;
      foodGroup.add(banana);
  } 
}


function spawnObstacle() {
  
  if (frameCount % 300 === 0){
      var obstacle = createSprite(600,165,20,20);
      var rand = Math.round(random(1,6));
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.14;
      obstacle.velocityX = -6;
      obstacle.lifetime = 110;
      obstacleGroup.add(obstacle);
  }
}

