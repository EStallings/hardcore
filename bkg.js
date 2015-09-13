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
  translate(-0.25,-0.15);
  translate(-gw/2,-gh/2);

  shadowBlur = 0;
  for(var i=0;i<gw;++i)for(var j=0;j<gh;++j){
    var x = i+0.5-gw/2;
    var y = j+0.5-gh/2;
    fillStyle = shadowColor = hue(tick*0.0003+(x*x+y*y)*2.35*Math.sin(tick*0.000003));
    fillRect(i+0.025,j+0.025,0.95,0.95);
  }shadowBlur = 0;

  fillStyle = "rgba(0,0,0,0.7)"
  for(var i=0;i<gw;++i)for(var j=0;j<gh;++j)
    fillRect(i+0.025,j+0.025,0.95,0.95);

  fillStyle = "rgba(0,0,0,0.75)"
  for(var i=0;i<gw;++i)for(var j=0;j<gh;++j)
    fillRect(i+0.1,j+0.1,0.8,0.8);
})}
