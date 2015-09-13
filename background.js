var flairColors = [
	'#f80',
	'#f08',
	'#8f0',
	'#0f8',
	'#80f',
	'#08f'
];

var tmp = null;
backgroundEffects = {
	effects: [],
	W : tmp=document.createElement("canvas"),
	C : document.body.appendChild(tmp).getContext("2d"),
	colors : ['#ff69b4', '#69ffb4', '#b469ff', '#b4ff69', '#69ffb4'],
	logos : [],
	loadImage : function(src, tint) {
		var fg = new Image();
		fg.src = src;
		return fg;
	},
	drawImage : function(img, x, y, sx, sy) {
		this.C.drawImage(img,x,y,sx,sy);

	},
	init : function() {
		this.flairColor = this.colors[rint(this.colors.length)];
		this.logos.push({ img: this.loadImage('extralogo1.png', this.flairColor), w:180, h:180, ox:0, oy:0});
		this.logos.push({ img: this.loadImage('extralogo2.png', this.flairColor), w:150, h:150, ox:0, oy:0});
		this.logos.push({ img: this.loadImage('extralogo3.png', this.flairColor), w:200, h:200, ox:0, oy:0});
		this.logos.push({ img: this.loadImage('extralogo4.png', this.flairColor), w:150, h:150, ox:0, oy:20});
		this.logos.push({ img: this.loadImage('extralogo5.png', this.flairColor), w:150, h:150, ox:0, oy:20});
		this.logo = this.logos[rint(this.logos.length)];
		this.dj = peopleSprites.makePerson(true, this.flairColor);
	},
	circle : function(x, y, r) {
		this.C.beginPath();
		this.C.arc(x, y, r, 0, Math.PI*2);
		this.C.fill();
		this.C.closePath();
	},
	speaker : function(x, y, r) {
		this.C.fillStyle = '#fff';
		this.circle(x, y, r);
		this.C.fillStyle = '#333';
		this.circle(x, y, r/3);
	},
	draw : function(t) {

		this.C.shadowColor = this.flairColor;
		this.C.shadowBlur = 20;
		this.drawImage(this.logo.img, gw*32/2+32-(this.logo.w/2)+this.logo.ox, -150-(this.logo.h/2)+this.logo.oy, this.logo.w, this.logo.h);
		this.C.shadowBlur = 0;

		//DJ:
		t = 4*t*(BPM/6000)/(Math.PI*2);
		var x = gw/2*32-16;
		var y = -116;
		var sint = Math.sin(t);
		var hy2 = lerp(-1, 1, sint);
		this.C.drawImage(this.dj.bodyCvs, x, y+hy2);
		this.C.drawImage(this.dj.headCvs, x+Math.cos(t)*3, y+sint*3);

		//DJ Booth:
		this.C.shadowColor = this.flairColor;
		this.C.shadowBlur = 20;
		this.C.fillStyle = '#898989';
		this.C.fillRect(x-16, y+55+40, 128, 32);
		this.C.fillStyle = '#a0a0a0';
		this.C.fillRect(x-16, y+55, 128, 40);

		this.C.fillStyle = '#fff';
		this.circle(x+20, y+55+20, 16);
		this.circle(x+76, y+55+20, 16);
		this.C.fillRect(x+41, y+60, 6, 6);
		this.C.fillRect(x+50, y+60, 6, 6);
		this.C.fillRect(x+41, y+70, 6, 6);
		this.C.fillRect(x+50, y+70, 6, 6);
		this.C.fillRect(x+41, y+80, 6, 6);
		this.C.fillRect(x+50, y+80, 6, 6);

		this.C.font = '25px Bold';
		this.C.scale(1,0.75);
		this.C.fillStyle = this.C.shadowColor;
		this.C.fillText('铁杆', x+23, y+120);
		this.C.scale(1,4/3);
		this.C.strokeStyle = '#000';
		this.C.beginPath();
		this.C.moveTo(x+20-Math.cos(t/4)*16, y+55+20-Math.sin(t/4)*16);
		this.C.lineTo(x+20, y+55+20);
		this.C.stroke();
		this.C.moveTo(x+76-Math.cos((t+2)/4)*16, y+55+20-Math.sin((t+2)/4)*16);
		this.C.lineTo(x+76, y+55+20);
		this.C.stroke();
		this.C.closePath();

		//Speakers
		this.C.fillStyle = '#333';
		this.C.fillRect(32, -90, 80, 110);
		this.C.fillRect(gw*32-80+32, -90, 80, 110);

		this.C.fillRect(-160, -90, 160, gh*32+160-32);
		this.C.fillRect(gw*32+64, -90, 160, gh*32+160-32);
		this.C.fillStyle = '#222';
		this.C.fillRect(32, -160, 80, 70);
		this.C.fillRect(gw*32-80+32, -160, 80, 70);

		this.C.fillRect(-160, -160, 160, 70);
		this.C.fillRect(gw*32+64, -160, 160, 70);

		this.speaker(32+40, y+100, 23+1.5*sint);
		this.speaker(32+40, y+55, 14+2*sint);
		this.speaker(gw*32-80+32+40, y+100, 23+1.5*sint);
		this.speaker(gw*32-80+32+40, y+55, 14+2*sint);

		function pattern1 (that, x, y) {
			that.speaker(x, y, 32+1.5*sint);
			that.speaker(x-55, y, 16+1*sint);
			that.speaker(x+55, y, 16+1*sint);
			that.speaker(x-40, y-50, 24+1.5*sint);
			that.speaker(x+40, y-50, 24+1.5*sint);
		}
		function pattern2 (that, x, y) {
			that.speaker(x-40, y+50, 24+1.5*sint);
			that.speaker(x+40, y+50, 24+1.5*sint);
			that.speaker(x, y+130, 50+3*sint);
		}
		pattern1(this, -80, 0);
		pattern1(this, -80, gh*32/2);
		pattern1(this, gw*32+144, 0);
		pattern1(this, gw*32+144, gh*32/2);
		pattern2(this, -80, gh*32/2);
		pattern2(this, gw*32+144, gh*32/2);

		this.C.fillStyle = '#222';
		this.C.fillRect(-160, -160+gh*32/2, 160, 70);
		this.C.fillRect(gw*32+64, -160+gh*32/2, 160, 70);

		var decorText1 = '罗我思故我在非常的事情本身我这样做阿梅德';
		var decorText2 = '보라나는그것이내가바로그일자체입니다때문에생각하는가';
	}

}
