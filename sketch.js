
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var holder,polygon,ground;
var stand;


var polygon;
var slingShot;
var basket;
var target;


function setup() {
  createCanvas(900,400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  
  //polygon holder with slings
  polygon = Bodies.circle(50,200,20);
  World.add(world,polygon);

   //stand for target
   var stand_options ={
     isStatic: true
   };
  
  stand = Bodies.rectangle(450, 200 , 50, 400,stand_options);
  World.add(world, stand);

  //target(make green)
  var target_option={
  isStatic:true
  };
  target = Bodies.rectangle(450,180,20,20,target_option);
  World.add(world,target);
  //ground
  var ground_options={
isStatic:true
  };
  ground = Bodies.rectangle(400,400,400,40,ground_options)
  World.add(world,ground);
  //slingshot
  slingShot = new Slingshot(this.polygon,{x:100,y:200});



}
function draw() {
  background(56,44,44); 
  //text to show how to play again
text("Press The Space Bar to Play Again!",650 ,350);
 
text("hit the target to win!",200,350);
//win condition

  if(collide(polygon,target,80)==true)
  {
    text("YOU WIN!",100 ,100);
    World.remove(engine.world,target);
    target = null;
  }
  

  //show ball
  ellipse(polygon.position.x,polygon.position.y,20);

//show stand
  rect(stand.position.x,stand.position.y,20,400);

  //show target(make green)
  /*strokeWieght(4)
  stroke("green")
  Fill("yellow")*/
rect(target.position.x,target.position.y,20,20);
  //show ground
 rect(ground.position.x,ground.position.y,400,40)
  
//display slingshot
  slingShot.display();
  
}
function mouseDragged(){
  Matter.Body.setPosition(this.polygon,{x:mouseX,y:mouseY});
}
function mouseReleased(){
  slingShot.fly();
}
function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(this.polygon);
      
  }
}

//collide function
function collide(polygon,target,x)
{
  if(target!=null)
        {
         var d = dist(polygon.position.x,polygon.position.y,target.position.x,target.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

