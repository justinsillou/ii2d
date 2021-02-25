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
    this.deltaTime=0.01;
		this.epsilon = 1; //coefficient de restitution
		this.repulseur = false;
  }

	motion(){
		for(let i=0; i < this.particleManager.nbAliveMax; ++i){
			this.particleManager.all[i].motion(this.deltaTime);
		}
	}

	force(){
		for(let i=0; i < this.particleManager.nbAliveMax; ++i){
			let gravity = new Vector(0,9.81);
			this.particleManager.all[i].force.set(gravity.mul(100));
		}
	}

	impulse(p, ncol, pcol){
		let ncol2 = ncol.clone();

		//ncol unaire
		ncol.div(Math.sqrt(Math.pow(ncol.x,2) + Math.pow(ncol.y,2)));
		//vitesse
		let v_new = p.velocity.clone();
		let vn_new = ncol.mul(v_new.dot(ncol));
		let v_col = v_new.sous(vn_new.mul(1 + this.epsilon));
		p.velocity.set(v_col);

		//raz ncol pour la position
		ncol.set(ncol2);
		ncol.div(Math.sqrt(Math.pow(ncol.x,2) + Math.pow(ncol.y,2)));
		//position
		let x_new = p.position.clone();
		let h = ncol.mul(ncol.dot(pcol.sous(x_new)));
		let x_col = h.mul(1+this.epsilon).add(x_new);
		p.position.set(x_col);
	}

	solveCollision(p,o){
		let res = o.intersect(p.oldPosition, p.position);
		if (res.isIntersect){
			this.impulse(p, res.normale, res.position);
			//p.position.set(res.position);
		}
	}

	collision(){
		for(let i=0; i < this.particleManager.nbAliveMax; ++i){
			for(let j=0; j < this.obstacleManager.all.length; ++j){
				if(this.particleManager.all[i].isAlive){
					this.solveCollision(this.particleManager.all[i], this.obstacleManager.all[j]);
				}
			}
		}
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
		this.force();
		this.motion();
		this.collision();
		this.obstacleManager.update();
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
