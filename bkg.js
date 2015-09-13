var bkg = (D=document).body.appendChild(BKG=D.createElement("canvas")).getContext("2d")

Number.prototype.mod = function(n) {return ((this%n)+n)%n}
function hue(h){
	var r,g,b,i=Math.floor(h*6),q=1-(h*6-i),t=1-q;
	switch(i.mod(6)){
		case 0:r=1,g=t,b=0;break;
		case 1:r=q,g=1,b=0;break;
		case 2:r=0,g=1,b=t;break;
		case 3:r=0,g=q,b=1;break;
		case 4:r=t,g=0,b=1;break;
		case 5:r=1,g=0,b=q;break;
	}return "rgb("+Math.floor(255*(1-r))+","+Math.floor(255*(1-g))+","+Math.floor(255*(1-b))+")";
}

var drawBkg =_=>{ with(bkg) pushPop(_=>{
  scale(32,32);
  translate(-0.25,-0.15)
  translate(-gw/2,-gh/2);

  fillStyle = "#111"
  shadowBlur = 10;
  for(var i=0;i<gw;++i)for(var j=0;j<gh;++j){
    var x = i-gw/2;
    var y = j-gh/2;
    shadowColor = hue(tick*0.001+(x*x+y*y)*2.35*Math.sin(tick*0.00001));
    fillRect(i+0.05,j+0.05,0.9,0.9);
  }

  shadowBlur = 0;
  fillStyle = "#151515"
  for(var i=0;i<gw;++i)for(var j=0;j<gh;++j)
    fillRect(i+0.2,j+0.2,0.6,0.6);
})}
