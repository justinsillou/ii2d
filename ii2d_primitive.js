/**
 *
 * Vector
 *
 *  */
class Vector {
  constructor(x,y) {
    this.x=x;
    this.y=y;
  }

  /// @return p1+p2
  /// example : let p=Vector.add(p1,p2)
  static add(p1,p2) {
    return new Vector(p1.x+p2.x,p1.y+p2.y);
  }

  /// add u to this
  /// example : p.add(a).add(b)
  add(u) {
    this.x+=u.x;
    this.y+=u.y;
    return this;
  }

  /// @return a copy of this
  /// example : let p=a.clone()
  clone() {
    return new Vector(this.x,this.y);
  }

  /// copy p to this
  /// example : a.set(p)
  set(p) {
    this.x=p.x;
    this.y=p.y;
    return this;
  }

  setRandInt(p1,p2){
    this.x = Math.floor(Math.random()*(p2.x-p1.x)+p1.x);
    this.y = Math.floor(Math.random()*(p2.y-p1.y)+p1.y);
    return this;
  }

  setXY(x,y){
    this.x = x;
    this.y = y;
  }

 };
