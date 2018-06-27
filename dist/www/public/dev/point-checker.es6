import Paper from 'paper'

class PointChecker {
   
  constructor() {
    this.points = [];
  }
  
  setPoints(pts) {
    
    this.points = [];
    
    pts.forEach((pt, i) => { 
      this.points[i] = new Paper.Point(pt.x, pt.y);
    });
    
    this.area = new Paper.Path(this.points);
  }
  
  isInside(pt) {
    var area = new Paper.Path(this.points);
    return area.contains(new Paper.Point(pt.x, pt.y));
  }
    
  checkLines(pt) {
    var count = 0;
    
    for(let i=0,ii=this.points.length; i<ii; i++) {
      let a = this.points[i];
      let b = this.points[i+1] ? this.points[i+1] : this.points[0];
      
      if(a.y === b.y && a.y === pt.y){
        
        if((a.x < b.x && a.x <= pt.x && b.x >= pt.x) || (a.x > b.x && a.x <= pt.x && b.x <= pt.x)) {
          count++;
        }
      
      }else if((a.y < b.y && a.y < pt.y && b.y >= pt.y) || (a.y > b.y && a.y >= pt.y && b.y < pt.y)){
      
        if(this.checkCross(a, b, new Paper.Point(pt.x, pt.y), new Paper.Point(0, pt.y))) {
          count++;
        }
        
      }
    }
    
    return count % 2;      
  }
    
  checkCross(a1, a2, b1, b2) {
    return ((a2.subtract(a1)).cross(b1.subtract(a1)) * (a2.subtract(a1)).cross(b2.subtract(a1)) < 0) && ((b2.subtract(b1)).cross(a1.subtract(b1)) * (b2.subtract(b1)).cross(a2.subtract(b1)) < 0);
  }
}

export default PointChecker