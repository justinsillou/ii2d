var canvas;
var ctx; // !!! context 2D (drawing)
var engine;
var mouseIsDown;
var oldMouse = new Vector();



window.addEventListener("load",main);

function main() {
   	canvas=document.getElementById("canvas");
    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('mousemove', handleMouseMove, false);
    canvas.addEventListener('mouseup', handleMouseUp, false);

  	ctx=canvas.getContext("2d");

    engine=new Engine();

    var gen1 = new GeneratorBox();
    gen1.birthRate = 2;
    gen1.min.setXY(50,50); // setXY à faire dans la classe Vector
    gen1.max.setXY(55,55); //100, 200

    var gen2 = new GeneratorBox();
    gen2.birthRate = 1;
    gen2.min.setXY(150,150);
    gen2.max.setXY(155,155); //250, 300

    let circle1 = new Circle(new Vector(100, 100), 50);
    let circle2 = new Circle(new Vector(250, 200), 10);
    let seg1=new Segment(new Vector(100,200),new Vector(250,300));
    let seg2=new Segment(new Vector(350,420),new Vector(400,30));


    engine.particleManager.generatorList.push(gen1,gen2); // ajoute au tableau generatorList
    engine.obstacleManager.all.push(circle1, circle2, seg1, seg2);
    engine.start();
}

function handleMouseDown(){
  // get the mouse relative to canvas
  mouseIsDown = true;
  let mouseX = event.offsetX;
  let mouseY = event.offsetY;
  let mouse = new Vector(mouseX, mouseY);
  oldMouse.set(mouse);
  engine.particleManager.select(mouse);
  engine.obstacleManager.select(mouse);
  if (engine.obstacleManager.selected){
    console.log(engine.obstacleManager.selected);
    engine.obstacleManager.selected.color = "#00FF00";
  }
  //console.log(engine.particleManager.selected);
  //console.log(engine.obstacleManager.all[3].distance(mouse));
}

function handleMouseMove(){
  if (mouseIsDown){
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;
    let mouse = new Vector(mouseX, mouseY);
    if (engine.particleManager.selected){ //pour ne pas avoir d'erreur si null
      let m = new Vector(mouse.x-oldMouse.x,mouse.y-oldMouse.y);
      engine.particleManager.selected.move(m);
      oldMouse.set(mouse);
    }

    if (engine.obstacleManager.selected){
      let m = new Vector(mouse.x-oldMouse.x,mouse.y-oldMouse.y);
      engine.obstacleManager.selected.move(m);
      oldMouse.set(mouse);
    }
  }
}

function handleMouseUp(){
  mouseIsDown = false;
  if (engine.obstacleManager.selected){
    engine.obstacleManager.selected.color = "#FF0000";
  }
}
