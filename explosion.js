	explosion = {
		init:function() {
			this.W = tmp=document.createElement("canvas");
			this.C = document.body.appendChild(this.W).getContext("2d");
		},
		cx : 2,
		cy : 2,
		rad : 84,
		finished : true,
		rayColors : [],
		rawColors : [
			'#F08',
			'#08F',
			'#8F0'
		],
		rays : [],
		globalAlpha : 0,
		explode : function(x, y) {
			this.globalAlpha = 1;
			this.cx = (x+1.5)*32;
			this.cy = (y+1.5)*32;
			this.rays = [];
			this.rayColors = [];
			this.finished = false;

			for(var i = 0; i < this.rawColors.length; i++) {
				var grd=this.C.createRadialGradient(x,y,this.rad/4,x,y,this.rad);
				grd.addColorStop(0,this.rawColors[i]);
				grd.addColorStop(1,"white");
				this.rayColors[i] = grd;
			}

			for(var i = 0; i < Math.PI*2; i += 0.1) {
				var ray = {};
				ray.a = i;
				ray.goalr = rand(2*this.rad/3) + this.rad/3;
				ray.startr = rand(ray.goalr-this.rad/10);
				ray.innerGoalr = rand(this.rad)+this.rad/6;
				ray.innerStartr = rand(ray.innerGoalr);
				ray.color = rint(this.rayColors.length);
				ray.alpha = Math.random();
				ray.step = 0;
				this.rays.push(ray);
			}

		},
		draw : function() {
			this.C.clearRect(0,0,ww,wh);
			if(this.finished) return;
			var step = 0;
			this.C.globalAlpha = this.globalAlpha;
			for(var i = 0; i < this.rays.length; i++) {
				var ray = this.rays[i];
				this.C.beginPath();
				this.C.lineWidth = ray.alpha * 20;
				this.C.strokeStyle = this.rayColors[ray.color];
				this.C.shadowColor = this.rawColors[ray.color];
				this.C.shadowBlur = ray.alpha*20;
				var r1 = lerp(ray.innerStartr, ray.innerGoalr, easeOutExpo(ray.step));
				var r2 = lerp(ray.startr, ray.goalr, easeOutExpo(ray.step));
				ray.step = Math.min(ray.step + 0.03, 1);
				var a = ray.a;
				var x1 = Math.cos(a)*r1;
				var y1 = Math.sin(a)*r1;
				var x2 = Math.cos(a)*r2;
				var y2 = Math.sin(a)*r2;
				this.C.moveTo(this.cx + x1, this.cy + y1);
				this.C.lineTo(this.cx + x2, this.cy + y2);
				this.C.stroke();
				this.C.closePath();
			}
			if(Math.abs(this.rays[0].step - 1) < 0.8) {
				this.globalAlpha *= 0.85;
			}
			if(this.globalAlpha < 0.1) {
				this.finished = true;
				this.globalAlpha = 0;
			}
		}
	}


	// explosion.explode(2, 2);
	// function draw() {
	// 	explosion.draw();
	// 	requestAnimationFrame(draw);
	// }draw();
	//
