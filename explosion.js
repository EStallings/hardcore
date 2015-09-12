<html><head><meta charset="UTF-8"><style>*{position:absolute;margin:0px;}</style></head><body><script>
with(Math){
C = (D=document).body.appendChild(W=D.createElement("canvas")).getContext("2d");
(onresize=function(e){W.width=ww=innerWidth;W.height=wh=innerHeight;})();

	function rint(n) { return Math.floor(Math.random()*n); }
	
	function lerp(v0, v1, t) {
		return (1-t)*v0 + t*v1;
	}

	function smootherstep(x)
	{
		return x*x*x*(x*(x*6 - 15) + 10);
	}

	function easeOutExpo(x) {
		return -Math.pow( 2, -10 * x ) + 1;
	}

	function rangeVar(start, end) {
		return Math.random() * (end - start) + start;
	}

	C.scale(128, 128);
	
	var cx = ww/2;
	var cy = wh/2;
	var rad = 3;

	var rawColors = [
		// '#F29822',
		// '#F2A822',
		// '#F2D822',
		'#F08',
		// '#EF0',
		'#08F',
		'#8F0',
		// '#F90',
	]
	var rayColors = []

C.fillStyle = '#fff';
C.fillRect(0,0,ww,wh);

	for(var i = 0; i < rawColors.length; i++) {
		var grd=C.createRadialGradient(cx,cy,rad/4,cx,cy,rad);
		grd.addColorStop(0,rawColors[i]);
		grd.addColorStop(1,"white");
		rayColors[i] = grd;
	}

	var rays = [];

	for(var i = 0; i < Math.PI*2; i += 0.06) {
		ray = {};
		ray.a = i;
		ray.goalr = rint(2*rad/3) + rad/3;
		ray.startr = rint(ray.goalr-rad/10);
		ray.innerGoalr = rint(rad)+rad/6;
		ray.innerStartr = rint(ray.innerGoalr);
		ray.color = rint(rayColors.length);
		ray.alpha = Math.random();
		ray.step = 0;
		rays.push(ray);
	}

	function drawRays() {
		C.clearRect(0,0,ww,wh);
		var step = 0;
		for(var i = 0; i < rays.length; i++) {
			C.beginPath();
			C.lineWidth = rays[i].alpha * 30;
			C.strokeStyle = rayColors[rays[i].color];
			C.shadowColor = rawColors[rays[i].color];
			C.shadowBlur = rays[i].alpha*20;
			var r1 = lerp(rays[i].innerStartr, rays[i].innerGoalr, easeOutExpo(rays[i].step));
			var r2 = lerp(rays[i].startr, rays[i].goalr, easeOutExpo(rays[i].step));
			rays[i].step = Math.min(rays[i].step + 0.03, 1);
			var a = rays[i].a;
			var x1 = Math.cos(a)*r1;
			var y1 = Math.sin(a)*r1;
			var x2 = Math.cos(a)*r2;
			var y2 = Math.sin(a)*r2;
			C.moveTo(cx + x1, cy + y1);
			C.lineTo(cx + x2, cy + y2);
			C.stroke();
			C.closePath();
		}
		if(Math.abs(rays[0].step - 1) < 0.8) {
			C.globalAlpha *= 0.85;
		}
	}

	function draw() {
		drawRays();
		requestAnimationFrame(draw);
	}draw();
	


}</script></body></html>