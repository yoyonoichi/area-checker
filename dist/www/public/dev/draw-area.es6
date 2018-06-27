import Paper from 'paper'

class DrawArea {
    
  constructor(canvas) {
    this.canvas = canvas;
    Paper.setup(canvas);
    
    this.vertexRadius = 20;
    
    this.area = this.initArea();
    
    this.points = [];
    this.items = [];
  }
  
  reset() {
    this.isClosed = false;
    this.ready = false;
    
    if(this.points.length) {
      this.points.forEach((p) => {
        p.remove();
      });
    }
    this.points = [];
    
    if(this.items.length) {
      this.items.forEach((item) => {
        item.remove();
      });
    }
    this.items = [];
    
    this.area.removeSegments();
  }
  
  hasDone() {
    return this.isClosed; 
  }
  
  getItems() {
    return this.items;
  }
  
  getPoints() {
    return this.points; 
  }
  
  initArea(color1 = 'rgba(255,0,0,0.1)', color2 = '#aaa') {
    return new Paper.Path({
      fillColor: color1,
      strokeWidth: 1,
      strokeColor: color2
    });
  }
  
  drawItems(width, height, total, color) {
    
    for(let i=0; i<total; i++) {
      let x = ~~(Math.random() * width);
      let y = ~~(Math.random() * height);
      
      this.items[i] = this.drawItem(x, y, color);
    }
    
    this.ready = true;
  }
  
  drawItem(x, y, color) {
  
    var item = new Paper.Path.Star({
      center: [x, y],
      points: 8,
      radius1: 10,
      radius2: 15,
      fillColor: color
    });
    
    item.centerX = x;
    item.centerY = y;
    
    return item;
    
  }
  
  drawDot(x, y, color1 = '#aaa', color2 = '#444') {
    
    var dot = new Paper.Path.Circle({
      center: [x, y],
      radius: 10,
      fillColor: color1,
      strokeColor: color2
    });
    
    dot.centerX = x;
    dot.centerY = y;
    
    return dot;
    
  }
  
  drawLine(close, x, y) {
    
    if(close) {
      
      var start = this.area.getFirstSegment().getPoint();
      this.area.add(start);
      this.area.close = true;
      
    } else {
      
      this.area.add(new Paper.Point(x, y));
      
    }
  }
  
  drawVertex(x, y) {
    
    if(this.ready) {
      var total = this.points.length;

      if(total > 2 && this.onVertex(x, y)) {

        this.isClosed = true;
        this.drawLine(true); 

      }else{

        this.points.push(this.drawDot(x, y));
        this.drawLine(false, x, y);
      }
    }
  }
  
  onVertex(x, y) {
    return this.points[0].contains(new Paper.Point(x, y));
  }
  
  checkItems() {
   
    this.items.forEach((item) => {
      
      var center = new Paper.Point(item.centerX, item.centerY);
      
      if(this.area.contains(center)) {
        item.fillColor = '#ff0000';
      }
    });
  }
}

export default DrawArea