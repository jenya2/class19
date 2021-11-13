var met,metImg,metsGroup;
var star,starImg,starGroup;
var invisibleBlockGroup,invisibleBlock;
var rocket, rocketImg;
var gameState = "play"

function preload(){
    rocketImg = loadImage("rocket.png");
    starImg = loadImage("star.png");
    metImg = loadImage("met.png");
    spaceImg = loadImage("space.png");
}

function setup() {
    createCanvas(600,600);
    space = createSprite(300,300);
    space.addImage("space",spaceImg);
    space.velocityY = 1;

    rocket = createSprite(200,200);
    rocket.addImage("rocket",rocketImg);
    rocket.scale = 0.3;
 
    invisibleBlockGroup = new Group()
    metsGroup = new Group()
    starGroup = new Group()
}  

function draw() {

 background(200);
if(gameState === "play"){
    if(space.y > 400){
        space.y = 300
    }

    if(keyDown("left_arrow")){
        rocket.x=rocket.x-3
    }
    if(keyDown("right_arrow")){
        rocket.x=rocket.x+3
    }
    if(keyDown("space")){
        rocket.velocityY=-10
    }
    rocket.velocityY=rocket.velocityY+0.1

    obstacles()
    
    if(metsGroup.isTouching(rocket)){
        rocket.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(rocket)||rocket.y>600){
        rocket.destroy()
        gameState="end"
    }
    drawSprites();
 }

 if(gameState === "end"){
     fill("blue")
     textSize(30)
     text("gameover",250,250)
 }
}

function obstacles(){
    if(frameCount % 240===0){
        var met = createSprite(200,-50)
        met.scale = 0.2
        var star = createSprite(200,15)
        star.scale = 0.07 
        var invisibleBlock = createSprite(200,15)

        met.x = Math.round(random(120,400))
        star.x = Math.round(random(50,500))
        invisibleBlock.width=star.width
        invisibleBlock.height=2
        invisibleBlock.debug=true

        met.addImage(metImg);

        //star.x=met.x
       // invisibleBlock.x = met.x
        star.addImage(starImg);


        rocket.depth=met.depth
        rocket.depth+=1
        rocket.lifetime=800
        star.lifetime=800
        invisibleBlock.lifetime=800

        star.velocityY=1
        met.velocityY=1
        invisibleBlock.velocityY=1
        metsGroup.add(met)
        starGroup.add(star)
        invisibleBlockGroup.add(invisibleBlock)
    }
}