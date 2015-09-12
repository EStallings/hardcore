function head(x, shouldy, bodyHeight, headGap, headRadius, headColor) {
	C.lineWidth = outlineWidth;
	C.strokeStyle = '#000';
	C.fillStyle = headColor;
	C.beginPath();
	C.arc(x+0.5,shouldy+0.5-bodyHeight-headGap,headRadius,0,Math.PI*2);
	C.fill();
	C.stroke();
	C.closePath();
}

function bodyPill(x, hipy, shouldy, bodywidth, shirtColor) {
	C.strokeStyle = '#000';
	C.lineWidth = bodyWidth;
	C.lineCap = 'round';
	C.beginPath();
	C.moveTo(x+0.5, hipy+0.5);
	C.lineTo(x+0.5, shouldy+0.5);
	C.stroke();
	C.closePath();

	C.strokeStyle = shirtColor;
	C.lineWidth = bodyWidth-outlineWidth*2;
	C.lineCap = 'round';
	C.beginPath();
	C.moveTo(x+0.5, hipy+0.5);
	C.lineTo(x+0.5, shouldy+0.5);
	C.stroke();
	C.closePath();
}

function pantsPill(x, hipy, shouldy, bodyWidth, bodyHeight, beltOffset, pantsColor) {
	C.strokeStyle = '#000';
	C.fillStyle = pantsColor;
	C.lineWidth = outlineWidth;
	var left = x + (1-bodyWidth)/2 + outlineWidth/2;
	var width = bodyWidth - outlineWidth;
	var bottom = Math.ceil(hipy);
	C.strokeRect(left, bottom - bodyHeight - beltOffset, width, bodyHeight + beltOffset);
	C.fillRect(left+outlineWidth/2, bottom + outlineWidth/2 - bodyHeight - beltOffset, width-outlineWidth, bodyHeight + beltOffset - outlineWidth);
	C.beginPath();
	C.moveTo(left + width/2, bottom + outlineWidth/2 - bodyHeight - beltOffset + 0.2);
	C.lineTo(left + width/2, bottom + outlineWidth/2 - outlineWidth);
	C.stroke();
}

function drawPerson(p) {
	bodyPill(p.x, p.hipy, p.shouldy, p.bodyWidth, p.shirtColor);
	pantsPill(p.x,p.hipy,p.shouldy, p.bodyWidth, p.bodyHeight, p.beltOffset, p.pantsColor);
	head(p.x,p.shouldy, p.bodyHeight, p.headGap, p.headRadius, p.headColor);
}

var pantColors = ['#997A00','#2E2500','#7A7A52','#3E4554','#CCCCCC','#001433','#001F7A'];
var shirtColors = ['#7D7D00','#E64848','#9933FF','#009900','#B2B28F','#8A2E2E','#E62E00','#CCCC00','#005266','#333300','#00523D','#3D3D29','#A3A375','#CCFF66']
var skinTones = ['#FFDCB1','#E5C298','#CC8443','#C77A58','#440000','#BE723C','#DFB997']
function rint(n) { return Math.floor(Math.random()*n); }

var outlineWidth = 0.02;

function rangeVar(start, end) {
	return Math.random() * (end - start) + start;
}

// this.shirtColor = shirtColors[rint(shirtColors.length)];
// this.pantsColor = pantColors[rint(pantColors.length)];
// this.headColor = skinTones[rint(skinTones.length)];
// this.bodyHeight = rangeVar(0.25, 0.4);
// this.hipy = this.y+0.1;
// this.shouldy = this.hipy - this.bodyHeight;
// this.bodyWidth = rangeVar(0.81, 0.7);
// this.headRadius = rangeVar(0.37, 0.34);
// this.headGap = rangeVar(0.42, 0.4);
// this.beltOffset = rangeVar(0.25, 0.1);