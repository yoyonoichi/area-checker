import DrawArea from './draw-area'
import PointChecker from './point-checker'

var ID = '#AreaChecker';
var $root = $(ID);

const drawArea = new DrawArea($root.find('canvas')[0]);
const pointChecker = new PointChecker();

$('#Start').on('click', function() {
  
  drawArea.reset();
  drawArea.drawItems($root.width(), $root.height(), 30, '#0000ff');

});

$root.on('click', 'canvas', function(e) {
  
  var offset = $root.offset();
  
  if(drawArea.hasDone()) {
  
    //if(pointChecker.checkLines({x: e.pageX - offset.left, y: e.pageY - offset.top})) {
    if(pointChecker.isInside({x: e.pageX - offset.left, y: e.pageY - offset.top})) {
      console.log('inside');
    } else {
      console.log('outside');
    }
  
  } else {
    
    drawArea.drawVertex(e.pageX - offset.left, e.pageY - offset.top);
    
    if(drawArea.hasDone()) {
      
      drawArea.checkItems();
      
      
      //TEST WITHOUT CANVAS
      var vertexes = drawArea.getPoints();
      
      var points = vertexes.map((v) => {
        return {x: v.centerX, y: v.centerY};
      });
      
      pointChecker.setPoints(points); 
      
      /*drawArea.getItems().forEach((item) => {
        if(pointChecker.checkLines(item)) {
        //if(pointChecker.isInside(item)) {
          drawArea.drawItem(item.x, item.y, '#ff0000');  
        }
      });*/
    }
  }
});