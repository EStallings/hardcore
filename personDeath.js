var resizableCanvases = [];
ww = innerWidth;
wh = innerHeight;


function rint(n) { return Math.floor(Math.random()*n); }
function lerp(v0, v1, t) {
	return (1-t)*v0 + t*v1;
}

function rangeVar(start, end) {
	return Math.random() * (end - start) + start;
}


var flairColors = [
	'#f80',
	'#f08',
	'#8f0',
	'#0f8',
	'#80f',
	'#08f'
];
var tmp = null;
personDeathEffects = {
	effects: [],
	W : tmp=document.createElement("canvas"),
	C : document.body.appendChild(tmp).getContext("2d"),
	init : function() {
		// this.C.scale(128, 128);
		this.initialized = true;
	},
	newEffect : function(x, y, flairColor) {
		this.effects.push(new this.personDeathEffect(x, y, flairColor));
	},
	process : function() {
		this.C.fillStyle = '#000';
		this.C.fillRect(0,0,20,20);
		var nextEffects = [];
		for(var i = 0; i < this.effects.length; i++) {
			this.effects[i].drawParts();
			if(!this.effects[i].finished) nextEffects.push(this.effects[i]);
		}
		this.effects = nextEffects;
	},
	personDeathEffect : function(x, y, flairColor) {
		if(!personDeathEffects.initialized) personDeathEffects.init();
		this.parts = [];
		this.color = flairColor;
		this.finished = false;
		this.C = personDeathEffects.C;
		this.fade = 1;
		for(var i = 0; i <10; i ++) {
			var part = {};
			part.a = i;
			part.startx = Math.random()-0.5 + x;
			part.starty = Math.random()/2 + y;
			part.endy = part.starty - Math.random()*2;
			part.alpha = Math.random()*0.5 + 0.5;
			part.step = 0;
			this.parts.push(part);
		}

		this.drawParts = function() {	
			var step = 0;
			this.C.shadowColor = this.color;
			this.C.fillStyle = 'rgba(255,255,255,' + this.fade + ')';
			var fadeout = (Math.abs(this.parts[0].step - 1) < 0.8);
			for(var i = 0; i < this.parts.length; i++) {
				var part = this.parts[i];
				this.C.shadowBlur = part.alpha*20;
				this.C.fillRect(part.startx,lerp(part.starty, part.endy, Math.sqrt(part.step)), 0.2, 0.2);
				part.step = Math.min(part.step + 0.03, 1);
			}
			if(fadeout) {
				this.fade *= 0.85;
			}
			if(this.fade < 0.01) {
				this.finished = true;
			}
		}
	}
}

// personDeathEffects.newEffect(i, j*2, flairColors[rint(flairColors.length)]);


// function draw() {
// 	personDeathEffects.process();
// 	requestAnimationFrame(draw);
// }draw();