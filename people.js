
var outlineWidth = 0.02;


var tmp = null;
peopleSprites = {
	W : tmp=document.createElement("canvas"),
	C : document.body.appendChild(tmp).getContext("2d"),
	shirtColors : [
		'#333',
		'#444',
		'#222',
		'#353535'
	],
	flairColors : [
		'#f80',
		'#f08',
		'#8f0',
		'#0f8',
		'#80f',
		'#08f',
	],
	skinTones : [
		'#FFDCB1',
		'#E5C298',
		'#CC8443',
		'#C77A58',
		'#440000',
		'#BE723C',
		'#DFB997'
	],
	head : function(C, x, shouldy, bodyHeight, headWidth, headHeight, headGap, headColor, flairColor, shadesType, hairColor, hairType) {
		C.fillStyle = headColor;
		C.shadowColor = flairColor;
		C.shadowBlur = 8;
		C.fillRect(x, shouldy-bodyHeight-headGap, headWidth, headHeight);
		C.fillStyle = '#000';
		switch(shadesType) {
			case 0:
				C.fillRect(x, shouldy-bodyHeight-headGap+0.25, headWidth, 0.07);
				C.fillRect(x+0.15, shouldy-bodyHeight-headGap+0.2, 0.2, 0.2);
				C.fillRect(x+headWidth-0.25, shouldy-bodyHeight-headGap+0.2, 0.2, 0.2);
				break;
			case 1:
				C.fillRect(x, shouldy-bodyHeight-headGap+0.2, headWidth, 0.07);
				C.fillRect(x+0.15, shouldy-bodyHeight-headGap+0.2, 0.2, 0.2);
				C.fillRect(x+headWidth-0.25, shouldy-bodyHeight-headGap+0.2, 0.2, 0.2);
				break;
			case 2:
				C.fillRect(x, shouldy-bodyHeight-headGap+0.2, headWidth, 0.07);
				C.fillRect(x, shouldy-bodyHeight-headGap+0.3, headWidth, 0.07);
				break;
			case 'DJ':
			
				C.fillStyle = flairColor;
				C.shadowColor = '#fff';
				C.fillRect(x, shouldy-bodyHeight-headGap+0.25, headWidth, 0.07);
				C.beginPath();
				C.moveTo(x-0.1, shouldy-bodyHeight-headGap+0.2);
				C.lineTo(x+0.3, shouldy-bodyHeight-headGap+0.2);
				C.lineTo(x+0.15, shouldy-bodyHeight-headGap+0.45);
				C.lineTo(x-0.1, shouldy-bodyHeight-headGap+0.2);
				C.fill();
				C.closePath();
				
				C.beginPath();
				C.moveTo(x+headWidth+0.1, shouldy-bodyHeight-headGap+0.2);
				C.lineTo(x+headWidth-0.3, shouldy-bodyHeight-headGap+0.2);
				C.lineTo(x+headWidth-0.15, shouldy-bodyHeight-headGap+0.45);
				C.lineTo(x+headWidth+0.1, shouldy-bodyHeight-headGap+0.2);
				C.fill();
				C.closePath();
				
				break;
			default:
				break;

		}

		switch(hairType) {
			case 0: //Mohawk
				break;
			case 1: //SquareTop
				break;
			case 2: //Front-do
				break;
			case 3: //Bald
				break;
			case 'DJ': //DJ
				break;
		}
	},
	bodyPill : function(C, x, hipy, shouldy, bodyWidth, bodyHeight, shirtColor, flairColor, clothesType) {
		C.shadowColor = flairColor;
		C.shadowBlur = 8;
		C.strokeStyle = shirtColor;
		C.lineWidth = bodyWidth;

		C.beginPath();
		C.moveTo(x+0.5, hipy+0.9);
		C.lineTo(x+0.5, shouldy+0.5);
		C.stroke();
		C.closePath();

		C.fillStyle = flairColor;
		C.strokeStyle = flairColor;
		switch(clothesType) {
			case 0:
				C.fillRect(x+0.5, shouldy+0.5, 0.1, 0.35);
				break;
			case 1:
				C.beginPath();
				C.lineWidth = 0.1;
				C.moveTo(x+0.45, shouldy+0.5);
				C.lineTo(x+0.5, shouldy+0.2+bodyHeight + bodyWidth/2);
				C.stroke();
				C.moveTo(x+0.55, shouldy+0.5);
				C.lineTo(x+0.5, shouldy+0.2+bodyHeight + bodyWidth/2);
				C.stroke();
				// C.fillRect(x+0.3, shouldy+0.5, 0.1, bodyHeight + bodyWidth/2);
				// C.fillRect(x+0.6, shouldy+0.5, 0.1, bodyHeight + bodyWidth/2);
				break;
			case 2:
				C.beginPath();
				C.lineWidth = 0.1;
				C.moveTo(x+0.45, shouldy+0.5);
				C.lineTo(x+0.65, shouldy+0.5+bodyHeight + bodyWidth/2);
				C.stroke();
				// C.moveTo(x+0.55, shouldy+0.5);
				// C.lineTo(x+0.75, shouldy+0.5+bodyHeight + bodyWidth/2);
				// C.stroke();
				// C.fillRect(x+0.3, shouldy+0.5, 0.1, bodyHeight + bodyWidth/2);
				// C.fillRect(x+0.6, shouldy+0.5, 0.1, bodyHeight + bodyWidth/2);
				C.fillRect(x+0.65, shouldy+0.6, 0.15, 0.1);
				C.fillRect(x+0.2, shouldy+0.6, 0.15, 0.1);
				break;
			case 3:
				C.fillRect(x+0.3, shouldy+0.5, 0.05, bodyHeight + bodyWidth/2);
				C.fillRect(x+0.6, shouldy+0.65, 0.1, 0.1);
				C.fillRect(x+0.6, shouldy+0.85, 0.1, 0.1);
				break;
			case 'DJ':
				C.fillRect(x+0.65, shouldy+0.6, 0.15, 0.1);
				C.fillRect(x+0.65, shouldy+0.8, 0.15, 0.1);
				C.fillRect(x+0.65, shouldy+1, 0.15, 0.1);
				C.fillRect(x+0.71, shouldy+0.6, 0.05, 0.2);
				C.fillRect(x+0.71, shouldy+0.9, 0.05, 0.2);

				C.fillRect(x+0.2, shouldy+0.6, 0.15, 0.1);
				C.fillRect(x+0.2, shouldy+0.8, 0.15, 0.1);
				C.fillRect(x+0.2, shouldy+1, 0.15, 0.1);
				C.fillRect(x+0.25, shouldy+0.6, 0.05, 0.2);
				C.fillRect(x+0.25, shouldy+0.9, 0.05, 0.2);
				C.fillRect(x+0.47, shouldy+0.6, 0.05, 0.5);
				break;
			default:
				console.err("No clothesType! " + clothesType);

		}
	},
	sprites : [],
	makePerson : function(DJ, flairOverride) {
		var headCvs, bodyCvs;
		var headCtx = document.body.appendChild(headCvs=document.createElement("canvas")).getContext("2d");
		var bodyCtx = document.body.appendChild(bodyCvs=document.createElement("canvas")).getContext("2d");
		bodyCvs.width = headCvs.width = 64;
		bodyCvs.height = headCvs.height = 128;
		headCtx.scale(32, 32);
		bodyCtx.scale(32, 32);
		var headColor = this.skinTones[rint(this.skinTones.length)];
		var shirtColor = this.shirtColors[rint(this.shirtColors.length)];
		if(DJ) {
			// var shirtColor = '#ff69b4';
			var flairColor = flairOverride;
			var clothesType = 'DJ';
			var shadesType = 'DJ';
			
			var x = 1;
			var y = 1;
			var bodyHeight = 0.44;
			
			var hipy = y+0.1;
			var shouldy = hipy - bodyHeight;
			var bodyWidth = 0.81;
			
			var headRadius = 0.68;
		}else {
			var flairColor = this.flairColors[rint(this.flairColors.length)];
			var clothesType = rint(4);
			var shadesType = rint(3);
			
			var x = 1;
			var y = 1;
			var bodyHeight = rangeVar(0.35, 0.44);
			
			var hipy = y+0.1;
			var shouldy = hipy - bodyHeight;
			var bodyWidth = rangeVar(0.81, 0.7);
			
			var headRadius = rangeVar(0.67, 0.70);
		}

		var headWidth = headRadius;
		var headHeight = headRadius;
		var headGap = -0.05;

		this.bodyPill(bodyCtx, x, hipy, shouldy, bodyWidth, bodyHeight, shirtColor, flairColor, clothesType);
		this.head(headCtx, x+(1-headWidth)/2,shouldy, bodyHeight, headWidth, headHeight, headGap, headColor, flairColor, shadesType);
		
		document.body.removeChild(headCvs);
		document.body.removeChild(bodyCvs);

		if(DJ) {
			return {headCvs : headCvs, bodyCvs : bodyCvs, flairColor : flairColor};
		}
		else {
			this.sprites.push({headCvs : headCvs, bodyCvs : bodyCvs, flairColor : flairColor});	
			return this.sprites.length-1;
		}
	},
	drawPerson : function(x, y, i, t) {
		x*=32;
		y*=32;
		t = Math.sin(4*t*(BPM/6000)/(Math.PI*2));
		var hdx = 1+((i%5)/5-0.5);
		var hdy = 1+((i%7)/7-0.5);

		var hx = lerp(-hdx, hdx, t);
		var hy = lerp(-hdy, hdy, t);
		var hy2 = lerp(-1, 1, t);

		this.C.drawImage(this.sprites[i].bodyCvs, x, y+hy2);
		this.C.drawImage(this.sprites[i].headCvs, x+hx, y+hy);
	},
	clear : function() {
		this.C.clearRect(0,0,ww,wh);
	}
};