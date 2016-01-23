console.log("starting snow!");

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();

var flakes = [];
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var flakeCount = 400;

function reset(flake) {
	flake.x = Math.floor(Math.random() * canvas.width);
	flake.y = Math.floor(Math.random() * canvas.height);
	flake.size = (Math.random() * 3) + 2;
    flake.speed = (Math.random() * 1) + 0.5;
	flake.velY = flake.speed;
    flake.opacity = (Math.random() * 0.5) + 0.3;
}

function snow() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < flakeCount; i++) {
        var flake = flakes[i];




        flake.y = flake.y += flake.velY;
        
        if (flake.y >= canvas.height || flake.y <= 0) {
        	reset(flake);
        }

        ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
		ctx.beginPath();
	    ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
	    ctx.fill();
	}

	requestAnimationFrame(snow);
}


function init() {
	for (var i =0; i < flakeCount; i++ ) {
		var x = Math.floor(Math.random() * canvas.width);
		var y = Math.floor(Math.random() * canvas.height) - 50;
		var size = (Math.random() * 3) + 2;
        var speed = (Math.random() * 1) + 0.5;
        var opacity = (Math.random() * 0.5) + 0.3;


        flakes.push({
        	x: x,
        	y: y,
        	velY: speed,
        	velX: 0,
        	size: size,
        	speed: speed,
        	opacity: opacity
        });
	}
	snow();
}	

init();
