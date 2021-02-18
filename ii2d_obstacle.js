class Circle {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
    this.color = "#FF0000";
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  move(m){
    //déplacement du centre du cercle de m
    this.center.add(m);
  }

  distance(m){
    return Math.abs(Math.sqrt(Math.pow((this.center.x-m.x),2)+Math.pow((this.center.y-m.y),2)) - this.radius);
  }

  is_inside(p){
    let dist = Math.sqrt(Math.pow((this.center.x-p.x),2)+Math.pow((this.center.y-p.y),2));
    return (dist <= this.radius);
  }

  intersect(p1,p2){
    // p1 => x_old
    // p2 => x_new

    let normal = new Vector(0,0);
    let position = new Vector(0,0);
    let p1In = this.is_inside(p1);
    let p2In = this.is_inside(p2);
    let isIntersect = ((p1In && !p2In) || (!p1In && p2In));

    //si intersection :
    if (isIntersect){
      position.set(p1);
      normal.set(p1.sous(this.center));
      normal.div(Math.abs(p1.sous(this.center)));
    }

    return {
      isIntersect: isIntersect,
      normal: normal,
      position: position
    }
  }
}

class Segment {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.color = "#FF0000";
    this.zone = null; // 0 = a, 1 = b, 2 = line
  }

  draw(){
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  move(m){
    //déplacement de a et b de m
    if (this.zone == 0){
      this.a.add(m);
    } else if (this.zone == 1) {
      this.b.add(m);
    } else {
      this.a.add(m);
      this.b.add(m);
    }
  }

  distance(m){
    let vAB = new Vector(this.b.x - this.a.x, this.b.y - this.a.y);
    let vBA = new Vector(this.a.x - this.b.x, this.a.y - this.b.y);
    let vAM = new Vector(m.x - this.a.x, m.y - this.a.y);
    let vBM = new Vector(m.x - this.b.x, m.y - this.b.y);
    let nAB = new Vector(- (this.b.y - this.a.y), this.b.x - this.a.x) //(-y, x)

    if ((vAM.x*vAB.x+vAM.y*vAB.y) < 0){ //zone A
      this.zone = 0;
      return Math.sqrt(Math.pow((this.a.x-m.x),2)+Math.pow((this.a.y-m.y),2));
    } else if ((vBM.x*vBA.x+vBM.y*vBA.y) < 0) { // Zone B
      this.zone = 1;
      return Math.sqrt(Math.pow((this.b.x-m.x),2)+Math.pow((this.b.y-m.y),2));
    } else { // Zone Line
      this.zone = 2;
      return Math.abs((nAB.x*vAM.x+nAB.y*vAM.y))/Math.sqrt(Math.pow((nAB.x),2)+Math.pow((nAB.y),2));
    }
  }

  signe(p,a,n){
    let signe = p.clone().sous(a).x*n.x+p.clone().sous(a).y*n.y;
    return (signe > 0)?true:false;
  }

  intersect(p1,p2){
    let nAB = new Vector(- (this.b.y - this.a.y), this.b.x - this.a.x);
    let np = new Vector(- (p2.y - p1.y), p2.x - p1.x);
    let position = new Vector(0,0);

    //calcul des signes => intersection ou non ?
    let intersect = ((this.signe(p1, this.a, nAB)) != (this.signe(p2, this.a, nAB))
    && (this.signe(this.a, p1, np)) != (this.signe(this.b, p1, np)))?true:false;

    (intersect)?position.set(p1):true;

    return {
      isIntersect: intersect,
      normal: nAB,
      position: position
    }
  }
}

class ObstacleManager {
  constructor() {
    this.all = [];
    this.selected = null;
  }

  draw(){
    for(let i = 0; i < this.all.length; ++i){
      this.all[i].draw();
    }
  }

  select(m){
    this.selected = null;
    let minDist = 20;
    for(let i=0; i < this.all.length;i++){
      //console.log('dist obs ' + i + ' : ' + this.all[i].distance(m));
      if(this.all[i].distance(m) <= minDist){
        minDist = this.all[i].distance(m);
        this.selected = this.all[i];
      }
    }
  }
}
