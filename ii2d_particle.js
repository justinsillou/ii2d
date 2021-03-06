/**
 *
 *
 *
 * */

class GeneratorBox {
  constructor() {
    this.nbBirth=0; //nb de particules a naitre
    this.birthRate=0.2; //fréquence de naissance
    this.min = new Vector(0,0);
    this.max = new Vector(500,500);
    this.minTimeLeft = 120;
    this.maxTimeLeft = 150;
  }

  initParticle(p) {
    p.color.r=randInt(0,255);
    p.color.g=randInt(0,255);
    p.color.b=randInt(0,255);
    p.color.a=1;
    p.position.setRandInt(this.min, this.max);
    p.lifeLeft=randInt(this.minTimeLeft, this.maxTimeLeft);
    p.initLife=p.lifeLeft;
    p.velocity.setRandInt(new Vector(-50,-50), new Vector(50,50));
  }

  distance(m){
    return Math.sqrt(Math.pow((this.min.x-m.x),2)+Math.pow((this.min.y-m.y),2));
  }

  move(m){
    /*
    this.min.setXY(m.x, m.y);
    this.max.setXY(m.x + 5, m.y + 5);
    */
    this.min.add(m);
    this.max.setXY(this.min.x + 5, this.min.y + 5);
  }
};



/**
 *
 *
 *
 *  */
class Particle {
  constructor() {
    this.position=new Vector(0,0);
    this.color={r:0,g:0,b:0,a:1};
    this.isAlive = false;
    this.velocity = new Vector(100,200); //pixels /sec en x et en y
    this.force = new Vector(0,0); // ajout de la force
    this.oldPosition = new Vector(0,0);
    this.oldVelocity = new Vector(0,0);
  }

  draw() {
    ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.color.a+')';
    ctx.fillRect(this.position.x, this.position.y, 5,5);
  }

  motion(dt){
    this.oldPosition.set(this.position);
    this.oldVelocity.set(this.velocity);

    this.velocity.set(this.velocity.clone().add(this.force.clone().mul(dt)));
    this.position.set(this.position.clone().add(this.velocity.clone().mul(dt)));
  }
};

/**
 *
 *
 *
 *
 * */


class ParticleManager {
  constructor() {
    this.all=[]
    this.nbAliveMax=20000;
    //this.generator = new GeneratorBox();
    this.generatorList = [];
    this.selected = null;

    /// reserve nbAliveMax particules (no new Particule required after constructor)
    for(let i=0;i<this.nbAliveMax;++i) {
      this.all.push(new Particle());
    }
  }

  /// update all particules (motion, ...)

  update() {
    /*
    for(let i=0;i<this.nbAliveMax;++i) {
      //this.all[i].position.setRandInt(new Vector(0,0),new Vector(500,500));
      if (i < this.nbAliveMax/2){
        this.generatorList[0].initParticle(this.all[i]);
      } else {
        this.generatorList[1].initParticle(this.all[i]);
      }

    }
    */
    this.generatorList[0].nbBirth += this.generatorList[0].birthRate;
    this.generatorList[1].nbBirth += this.generatorList[1].birthRate;

    for(let i=0;i<this.nbAliveMax;++i) {
      if (this.all[i].isAlive){

        //Changement du alpha de la particule:
        this.all[i].color.a = this.all[i].lifeLeft/this.all[i].initLife;

        if (this.all[i].lifeLeft <= 0){
          this.all[i].isAlive = false;
        }
        this.all[i].lifeLeft--; //décrémentation durée de vie
      } else {
        if (i < this.nbAliveMax/2){
          if(this.generatorList[0].nbBirth > 1){
            this.generatorList[0].initParticle(this.all[i]);
            this.generatorList[0].nbBirth--;
            this.all[i].isAlive = true;
          }
        } else {
          if(this.generatorList[1].nbBirth > 1){
            this.generatorList[1].initParticle(this.all[i]);
            this.generatorList[1].nbBirth--;
            this.all[i].isAlive = true;
          }
        }
      }
    }
  }


  /// draw all particules
  draw() {
    for(let i=0;i<this.nbAliveMax;++i) {
      if (this.all[i].isAlive){
        this.all[i].draw();
      }
    }
  }

  ///select generator near mouse
  select(m) {
    let minDist = 20;
    this.selected = null;
    for(let i=0; i < this.generatorList.length;i++){
      //console.log('dist gen ' + i + ' : ' + this.generatorList[i].distance(m));
      if(this.generatorList[i].distance(m) <= minDist){
        minDist = this.generatorList[i].distance(m);
        this.selected = this.generatorList[i];
      }
    }
  }
};
