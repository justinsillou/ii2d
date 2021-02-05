/**
 *
 *
 * */


/*
 * @return random int in [a,b]
 * */
var randInt=function(a,b) {
	return Math.floor(Math.random()*(b-a)+a);
}




class Engine {
  /// data initializations
  constructor() {
    this.particleManager = new ParticleManager();
		this.obstacleManager = new ObstacleManager();
    this.time=0;
    this.deltaTime=0.1;
  }

  /// main draw function for each frame (do not update data)
  draw() {
    ctx.clearRect(0,0,500,500);
		this.particleManager.draw();
		this.obstacleManager.draw();
		/* Question 6
		this.c = new Vector();
		this.c.setRandInt(new Vector(100,100),new Vector(250,250));
		ctx.fillStyle = '#000000';
		ctx.fillRect(this.c.x,this.c.y,100,100);
		*/
  }

  /// update before each draw
  updateData() {
		this.particleManager.update();
  }

  /// main loop : update -> draw -> ...
  loop() {
    this.time+=this.deltaTime;
    this.updateData();
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
}

  /// entry point
  start() {
    this.loop();
  }

}
