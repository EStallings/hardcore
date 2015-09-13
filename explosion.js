	explosion = {
		init:function() {
			this.W = tmp=document.createElement("canvas");
			this.C = document.body.appendChild(this.W).getContext("2d");
		},
		rad : 84,
		rawColors : [
			'#F08',
			'#08F',
			'#8F0'
		],
		rays : [],
		explode : function(x, y) {
			var cx = (x+1.5)*32;
			var cy = (y+1.5)*32;
			var rayColors = [];

			for(var i = 0; i < this.rawColors.length; i++) {
				var grd=this.C.createRadialGradient(x,y,this.rad/4,x,y,this.rad);
				grd.addColorStop(0,this.rawColors[i]);
				grd.addColorStop(1,"white");
				rayColors[i] = grd;
			}

			for(var i = 0; i < Math.PI*2; i += 0.2) {
				var ray = {};
				ray.a = i;
				ray.globalAlpha = 1;
				ray.cx = cx;
				ray.cy = cy;
				ray.goalr = rand(2*this.rad/3) + this.rad/3;
				ray.startr = rand(ray.goalr-this.rad/10);
				ray.innerGoalr = rand(this.rad)+this.rad/6;
				ray.innerStartr = rand(ray.innerGoalr);
				var colorIndex = rint(rayColors.length);
				ray.rayColor = rayColors[colorIndex];
				ray.rawColor = this.rawColors[colorIndex];
				ray.alpha = Math.random();
				ray.step = 0;
				this.rays.push(ray);
			}

		},
		draw : function() {
			this.C.clearRect(0,0,ww,wh);
			var nextRays = [];
			for(var i = 0; i < this.rays.length; i++) {
				var ray = this.rays[i];
				this.C.globalAlpha = ray.globalAlpha;
				this.C.beginPath();
				this.C.lineWidth = ray.alpha * 20;
				this.C.strokeStyle = ray.rayColor;
				this.C.shadowColor = ray.rawColor;
				this.C.shadowBlur = ray.alpha*20;
				var r1 = lerp(ray.innerStartr, ray.innerGoalr, easeOutExpo(ray.step));
				var r2 = lerp(ray.startr, ray.goalr, easeOutExpo(ray.step));
				ray.step = Math.min(ray.step + 0.03, 1);
				var a = ray.a;
				var x1 = Math.cos(a)*r1;
				var y1 = Math.sin(a)*r1;
				var x2 = Math.cos(a)*r2;
				var y2 = Math.sin(a)*r2;
				this.C.moveTo(ray.cx + x1, ray.cy + y1);
				this.C.lineTo(ray.cx + x2, ray.cy + y2);
				this.C.stroke();
				this.C.closePath();

				if(Math.abs(ray.step - 1) < 0.8) {
					ray.globalAlpha *= 0.85;
				}
				if(ray.globalAlpha > 0.1){
					nextRays.push(ray);
				}
			}
			this.rays = nextRays;
		}
	}