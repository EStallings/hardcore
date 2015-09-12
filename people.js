C=document.body.appendChild(D=document.createElement("canvas")).getContext("2d");
D.width = ww=innerWidth;
D.height = wh=innerHeight;

	function rint(n) { return Math.floor(Math.random()*n); }

	var outlineWidth = 0.02;

	function rangeVar(start, end) {
		return Math.random() * (end - start) + start;
	}

	function head(C, x, shouldy, bodyHeight, headWidth, headHeight, headGap, headColor, flairColor, shadesType) {
		C.fillStyle = headColor;
		C.shadowColor = flairColor;
		C.shadowBlur = 5;
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

		}
	}

	function bodyPill(C, x, hipy, shouldy, bodyWidth, bodyHeight, shirtColor, flairColor, clothesType) {
		C.shadowColor = flairColor;
		C.shadowBlur = 5;
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
			default:
				console.err("No clothesType! " + clothesType);

		}

	}

	var shirtColors = [
		'#333',
		'#444',
		'#222',
		'#353535'
	]

	var flairColors = [
		'#f80',
		'#f08',
		'#8f0',
		'#0f8',
		'#80f',
		'#08f',
	]

	var skinTones = [
		'#FFDCB1',
		'#E5C298',
		'#CC8443',
		'#C77A58',
		'#440000',
		'#BE723C',
		'#DFB997'
	]

	function makePeople(n) {
		people = [];
		for(var i = 1; i < n; i++) {
			var headCvs, bodyCvs;
			var headCtx = document.body.appendChild(headCvs=document.createElement("canvas")).getContext("2d");
			var bodyCtx = document.body.appendChild(bodyCvs=document.createElement("canvas")).getContext("2d");
			headCvs.width = headCvs.height = 64;
			headCtx.scale(32, 32);
			bodyCtx.scale(32, 32);
			var shirtColor = shirtColors[rint(shirtColors.length)];
			var headColor = skinTones[rint(skinTones.length)];
			var flairColor = flairColors[rint(flairColors.length)];
			var clothesType = rint(4);
			var shadesType = rint(3);

			var x = 1;
			var y = 1;
			var bodyHeight = rangeVar(0.35, 0.44);

			var hipy = y+0.1;
			var shouldy = hipy - bodyHeight;
			var bodyWidth = rangeVar(0.81, 0.7);

			var headRadius = rangeVar(0.67, 0.70);
			var headWidth = headRadius;
			var headHeight = headRadius;
			var headGap = -0.05;

			bodyPill(bodyCtx, x, hipy, shouldy, bodyWidth, bodyHeight, shirtColor, flairColor, clothesType);
			head(headCtx, x+(1-headWidth)/2,shouldy, bodyHeight, headWidth, headHeight, headGap, headColor, flairColor, shadesType);
			people.push({headCvs : headCvs, bodyCvs : bodyCvs});
			document.body.removeChild(headCvs);
			document.body.removeChild(bodyCvs);
		}
	}

	function lerp(v0, v1, t) {
		return (1-t)*v0 + t*v1;
	}

	function smootherstep(x)
	{
		return x*x*x*(x*(x*6 - 15) + 10);
	}

	function drawPerson(x, y, i, t) {
		t = Math.sin(t*0.2); //TODO make this line up with Luke's timing
		var hdx = 1+((i%5)/5-0.5);
		var hdy = 1+((i%7)/7-0.5);

		var hx = lerp(-hdx, hdx, t);
		var hy = lerp(-hdy, hdy, t);
		var hy2 = lerp(-1, 1, t);

		//Use a people-canvas instead of "C"
		C.drawImage(people[i].bodyCvs, x, y+hy2);
		C.drawImage(people[i].headCvs, x+hx, y+hy);
	}

	var frame = 0;
	makePeople(30); //Instead of 30, use the number of unique people you need
	function draw() {
		C.clearRect(0,0,ww,wh); //Do this every frame
		for(var i = 0; i < people.length; i++) {
			drawPerson(i*32, 2, i, frame); //drawPerson(x*32, y*32, spriteId, frame)
		}
		frame++;
		requestAnimationFrame(draw);
	}draw();
