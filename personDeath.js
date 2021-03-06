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
	
	newEffect : function(x, y, flairColor) {
		this.effects.push(new this.personDeathEffect(x, y, flairColor));
	},
	process : function() {
		this.C.scale(32,32);
		
		var nextEffects = [];
		for(var i = 0; i < this.effects.length; i++) {
			this.effects[i].drawParts();
			if(!this.effects[i].finished) nextEffects.push(this.effects[i]);
		}
		this.effects = nextEffects;
		this.C.scale(1/32, 1/32);
	},
	personDeathEffect : function(x, y, flairColor) {
		x += 1;
		y += 1;
		console.log(x, y);
		this.parts = [];
		this.color = flairColor;
		this.finished = false;
		this.C = personDeathEffects.C;
		this.fade = 1;
		for(var i = 0; i <10; i ++) {
			var part = {};
			part.a = i;
			part.startx = Math.random() + x;
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
				part.step = Math.min(part.step + 0.003, 1);
			}
			if(fadeout) {
				this.fade *= 0.90;
			}
			if(this.fade < 0.01) {
				this.finished = true;
			}
		}
	}
}