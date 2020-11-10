var character, characterimg;
var obstacle1, obstacle2, obstacleimg;
var ground, groundimg;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bgmusic;
var score = 0;
var obstaclegrp;


function preload() {

  groundimg = loadImage("geometry dash ground - Copy (4).jpg");

  characterimg = loadImage("character.png");

  obstacle1 = loadImage("obstacle1.png");

  obstacle2 = loadImage("obstacle2 (2).png");

  bgmusic = loadSound("Forever Bound - Stereo Madness.mp3");
}


function setup() {
  createCanvas(600, 200);


  character = createSprite(50, 88, 20, 50);
  character.addImage("char", characterimg);
  character.scale = 0.2;

  bgmusic.loop();

  ground = createSprite(200, 180, 300, 20);
  ground.addImage("ground", groundimg);
  ground.velocityX = -5;

  character.setCollider("circle",0,0,40);
  character.debug=true;
  obstaclesgrp = createGroup();
}

function draw() {
  background(0, 0, 139);


  //bgmusic.stop();

  fill("white");
  stroke("black");
  textSize(20);

  text("Score: " + score, 400, 50);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }


  if (gameState === PLAY) {

    ground.velocityX = -(4 + 3 * score / 100)
    score = score+ Math.round(getFrameRate() / 60);

    if (keyDown("space") && character.y >= 100) {
      character.velocityY = -12;
    }

    //console.log(character.y);

    fill("white");
    stroke("black");
    textSize(20);

    text("Score: " + score, 400, 50);


    SpawnObstacles();
  } else if (gameState === END) {
    score = 0;
    obstaclesgrp.setLifetimeEach(-1);
    obstaclesgrp.setVelocityXEach(0);
    
    ground.velocityX = 0;
    character.velocityX = 0;
    
    score.visible = false;
    
    fill("white");
    stroke("black");
    textSize(20);
    
    text("Game Over", 200,50);

    bgmusic.stop();
  }



  if (character.isTouching(obstaclesgrp)) {
    gameState = END;
  }

  character.velocityY = character.velocityY + 0.8;
  character.collide(ground);

  obstaclesgrp.collide(ground);
  character.debug = false;
  drawSprites();

}

function SpawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 60, 10, 40);
    obstacle.velocityX = -5
    //obstacle.y = Math.round(random(10, 60));

    var rand = Math.round(random(1, 2));

    if (rand === 1) {
      obstacle.addImage("ob1", obstacle1);
    }

    if (rand === 2) {
      obstacle.addImage("ob2", obstacle2);
    }

    obstaclesgrp.add(obstacle);

    //console.log(rand);

    obstacle.lifetime = 300;
    obstacle.scale = 0.5;
    obstacle.setCollider("circle",20,30,40);
    //obstacle.debug = true;
    

    //obstacle.setDefaultCollider();
    //obstacle.setDefaultCollider();
  }
}