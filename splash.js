var splash = (_=>{

	var gg=1;    var g=1;
	var gy=wh/2; var y=wh*3/4;
	var gs=0.2;  var s=0.05;
	var gr=0;    var r=2*Math.PI;
	var ga=1;    var a=0.01;
	var gc=1;    var c=-2000;

	var img = new Image();
	img.src = "pureSex.png";
	var cont = new Image();
	cont.src = "continue.png";
	
	return {
		isActive:_=>gg!==0,
		render:gfx=>{
			g += (gg-g)*0.2;
			if(g<0.01)return;
			gy = wh/2;
			y += (gy-y)*0.02;
			s += (gs-s)*0.02;
			r += (gr-r)*0.04;
			a += (ga-a)*0.005;
			c += (gc-c)*0.05;

			gfx.save();
			gfx.fillStyle="rgba(0,0,0,"+(a*g)+")";
			gfx.fillRect(0,0,ww,wh);

			gfx.globalAlpha = g;
			gfx.translate(ww/2,y);
			gfx.scale(s,s);
			gfx.rotate(r);
			gfx.drawImage(img,-img.width/2,-img.height/2);
			gfx.restore();

			gfx.globalAlpha = g*(Math.max(0,c)*(Math.sin(tick*0.003)*0.2+0.6));
			gfx.save();
			gfx.translate(ww/2,wh/2+350);
			gfx.drawImage(cont,-cont.width/2,-cont.height/2);
			gfx.restore();
			gfx.globalAlpha = 1;
		},close:_=>{
			gg = 0;
		}
	};
})();
