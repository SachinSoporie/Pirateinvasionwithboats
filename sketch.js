const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;

var backgroundImg;
var cannonball;
var balls = [];
var boat, boats = [];


function preload() {
  towerImage = loadImage("./assets/tower.png");
  backgroundImg = loadImage("./assets/background.gif");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI/4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 60, 25, angle);
  cannonball = new CannonBall(cannon.x, cannon.y);
  boat = new Boat(width, height - 100, 200, 200, -100);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);

  ground.display();

  showBoats();
  
  tower.display();

  cannon.display();

  for (var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i], i);
    for(var j = 0; j < boats.length;j++){
      if(balls[i]!== undefined && boats[j]!== undefined){
        var collision = Matter.SAT.collides(ball[i].body, boats[j].body);
        if(collision.collided){
          boats[j].remove(j);
          World.remove(world, balls[i].body);
          balls.splice(index, 1);
          i--;
        }
      }
    }
  }
 
}
function showBoats(){
  if(boats.length > 0){
    if(boats.length < 4 && 
      boats[boats.length-1].body.position.x < width - 300){
        var positions = [-130, -100, -120, -80];
        var position = random(positions);
        boat = new Boat(width, height - 100, 200, 200, position);
        boats.push(boat);
      }
      for(var i = 0; i < boats.length;i++){
        Matter.Body.setVelocity(boats[i].body, {x: -0.9, y: 0})
        boats[i].display();
      }
  }
  else{
    boat = new Boat(width, height - 100, 200, 200, -100);
    boats.push(boat);
  }
}

function keyPressed(){
  if(keyCode === "down"){
    cannonball = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height-50){
    World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyReleased(){
  if(keyCode === "down"){
    balls[balls.length-1].shoot();
  }
}