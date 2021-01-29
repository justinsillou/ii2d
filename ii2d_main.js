var canvas;
var ctx; // !!! context 2D (drawing)

var engine;


window.addEventListener("load",main);

function main() {
   	canvas=document.getElementById("canvas");
  	ctx=canvas.getContext("2d");

    engine=new Engine();

    var gen1 = new GeneratorBox();
    gen1.birthRate = 2;
    gen1.min.setXY(50,50); // setXY à faire dans la classe Vector
    gen1.max.setXY(100,200);

    var gen2 = new GeneratorBox();
    gen2.birthRate = 1;
    gen2.min.setXY(150,150);
    gen2.max.setXY(250,300);

    engine.particleManager.generatorList.push(gen1,gen2); // ajoute au tableau generatorList

    engine.start();
}
