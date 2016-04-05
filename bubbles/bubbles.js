var c = document.getElementById('canvas');

var width = c.width = window.innerWidth;
var height = c.height = window.innerHeight;
var ctx = c.getContext('2d');

var opts = {
  numCircles: 1,
  maxCircles: 50,
  started: false
};

var circles = [];

function init() {
  
  opts.numCircles = 1;
  circles = [];
  
  circles.push({
    x: width/3,
    y: height/2,
    dx: 1,
    dy: 0,
    size: 1,
    maxSize: 40,
    step: 0,
  });
  
  ctx.lineWidth = 2;
  
  if (!opts.started) {
    loop(); 
  }
}

function loop() {
  
  if (opts.numCircles >= opts.maxCircles) {
    for (var i = opts.numCircles; i >= opts.maxCircles; i--) {
      circles.splice(i, 1);
    }
    opts.numCircles = opts.maxCircles;
  }
  
  opts.started = true;
  
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, width, height);
  for (var i = 0; i < opts.numCircles; i++) {
    var circle = circles[i];
    
    circle.x += circle.dx;
    circle.y += circle.dy; 
    circle.step++;
    
    // ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.strokeStyle = "hsl(hue,80%,50%)".replace("hue", circle.x%360);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2, false);
    ctx.stroke();
    // ctx.fill();
    
    if (circle.step%5 === 0) {
      circle.size++;
    }
    
    if (outOfBounds(circle)) {
      circles.splice(i, 1);
      opts.numCircles--;
      i--;
      circle.size = 0; // Just so that it doesnt trigger next if as well
    }
    
    if (circle.size > circle.maxSize) {
      circles.splice(i, 1);
      opts.numCircles--;
      i--;
      
      for (var j = 0; j < 3; j++) {
        circles.push({
          x: circle.x,
          y: circle.y,
          dx: getRandom(-1,1),
          dy: getRandom(-1,1),
          size: 1,
          maxSize: Math.random() * 54 + 1,
          step: 0
        });
      }
      opts.numCircles += 3;
    }
  }
  window.requestAnimationFrame(loop);
}
init();

function outOfBounds(circle) {
  return (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

window.addEventListener('resize', function() {
	width = c.width = window.innerWidth;
	height = c.height = window.innerHeight;
	init();
});
