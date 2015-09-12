with((D=document).body.appendChild(W=D.createElement("canvas")).getContext("2d"))with(Math){
explosion.init();
var resizeableCanvases = [W, peopleSprites.W, explosion.W];
(onresize=e=>resizeableCanvases.map(c=>{c.width=ww=innerWidth;c.height=wh=innerHeight;}))();

//==  USER DEFINABLES  =======================================================//

var updateInterval    = 1000;
var animationInterval = 500;

var gw = 10;
var gh = 10;

var renderScale = 40;

//==  JS UTILS  ==============================================================//

var clamp = (i,n,x) => min(max(i,n),x);

//var rgb = (r,g,b,a) => fillStyle=strokeStyle=shadowColor=`rgba(${~~(255*r)},${~~(255*g)},${~~(255*b)},${a===0?0:a||1})`;
var rgb = (r,g,b,a) => fillStyle=strokeStyle=shadowColor="rgba("+~~(255*r)+","+~~(255*g)+","+~~(255*b)+","+(a===0?0:a||1)+")";
var pushPop = f => { resizeableCanvases.map(i=>i.getContext('2d').save()); f(); resizeableCanvases.map(i=>i.getContext('2d').restore()); };
var fillCircle = (x,y,r) => { beginPath(); arc(x,y,r,0,2*PI); fill(); };

var id =_=>0;

//==  GAME UTILS  ============================================================//

animationInterval = min(updateInterval,animationInterval);
var updateTick = performance.now();
var animating = true;

var NONE  = 0;
var NORTH = 1;
var SOUTH = 2;
var EAST  = 3;
var WEST  = 4;
var BOMB  = 5;

var actionSwitch = (d,x,n,s,e,w,b) => {
	b=b||id;
	switch(d){
		case NONE : x(); break;
		case NORTH: n(); break;
		case SOUTH: s(); break;
		case EAST : e(); break;
		case WEST : w(); break;
		case BOMB : b(); break;
	}
};

var gridify =_=>{
	var retVal = [];
	for (var i=0;i<gw;++i) {
		retVal[i] = [];
		for (var j=0;j<gh;++j) retVal[i][j] = [];
	} return retVal;
};

//==  GAME FUNCS  ============================================================//

var grid     = gridify();
var throng   = [];
var scrubs = [];

var person = function (x,y) {
	throng.push(this);

	this.x = x;
	this.y = y;
	this.pendingAction = NONE;
	this.activeAction  = NONE;
	this.player = undefined;
	this.spriteId = peopleSprites.makePerson();

	(this.update =_=>{
		this.activeAction = this.pendingAction;
		this.pendingAction = NONE;
		actionSwitch(this.activeAction,id,
			_=>{--this.y;if(this.y< 0 ){this.y=   0;this.activeAction=NONE}},
			_=>{++this.y;if(this.y>=gh){this.y=gh-1;this.activeAction=NONE}},
			_=>{--this.x;if(this.x< 0 ){this.x=   0;this.activeAction=NONE}},
			_=>{++this.x;if(this.x>=gw){this.x=gw-1;this.activeAction=NONE}});
		grid[this.x][this.y].push(this);
	})();
}

var player = function(ctlU,ctlD,ctlL,ctlR,ctlB) {
	scrubs.push(this);
	this.person = undefined;
	this.points = 0;
	this.ctlU = ctlU;
	this.ctlD = ctlD;
	this.ctlL = ctlL;
	this.ctlR = ctlR;
	this.ctlB = ctlB;

	(this.reassign =_=>{
		throng.sort((a,b)=>{
			if (a.player && b.player) return 0;
			if (a.player) return 1;
			if (b.player) return -1;
		});

		var first = throng[0];
		if(!first.player){
			first.player = this;
			this.person = first;
		} else animating = false;
	})();
}

//==  TESTING  ===============================================================//

for (var i=0;i<20;++i) new person(~~(random()*gw),~~(random()*gh));

var P1 = new player(87,83,65,68,81);
var P2 = new player(79,76,75,59,73);

onkeydown = e => {
	var k = e.keyCode;
	scrubs.map(i=>{
		if(k===i.ctlU)i.person.pendingAction = NORTH;
		if(k===i.ctlL)i.person.pendingAction = EAST;
		if(k===i.ctlD)i.person.pendingAction = SOUTH;
		if(k===i.ctlR)i.person.pendingAction = WEST;
		if(k===i.ctlB)i.person.pendingAction = BOMB;
	});
};

onmouseup =_=> animating = true;

//==  MAIN LOOP  =============================================================//

var tick=performance.now(),prevTick=tick;
(loop = _ => pushPop(_=>{animating && requestAnimationFrame(loop);
	prevTick=tick;tick=performance.now();
	resizeableCanvases.map(i=>i.getContext('2d').clearRect(0,0,ww,wh));

	resizeableCanvases.map(i=>i.getContext('2d').translate(ww/2,wh/2));

	pushPop(_=>{
//		resizeableCanvases.map(i=>i.getContext('2d').scale(renderScale,renderScale));
		resizeableCanvases.map(i=>i.getContext('2d').translate(-renderScale*gw/2,-renderScale*gh/2));
		// resizeableCanvases.map(i=>i.getContext('2d').translate(0.5,0.5));

		// scale(renderScale,renderScale);
		// translate(-gw/2,-gh/2);
		// translate(0.5,0.5);

		rgb(0,0,0,0.3);

		for(var i=0;i<gw;++i)for(var j=0;j<gh;++j)
			fillCircle(i,j,0.05);

		var progress = clamp((tick-updateTick)/animationInterval,0,1);
		var invP = 1-progress;
		throng.sort((a,b)=>a.y-b.y);
		throng.map(i=>actionSwitch(i.activeAction,
			_=>peopleSprites.drawPerson(i.x,i.y,i.spriteId,tick),
			_=>peopleSprites.drawPerson(i.x,i.y+invP,i.spriteId,tick),
			_=>peopleSprites.drawPerson(i.x,i.y-invP,i.spriteId,tick),
			_=>peopleSprites.drawPerson(i.x+invP,i.y,i.spriteId,tick),
			_=>peopleSprites.drawPerson(i.x-invP,i.y,i.spriteId,tick)
		));

		rgb(1,0,0);fillCircle(P1.person.x,P1.person.y,0.5);
		rgb(0,1,0);fillCircle(P2.person.x,P2.person.y,0.5);
		explosion.draw();
	});


	if (tick%updateInterval<prevTick%updateInterval) {
		updateTick = tick;
		grid = gridify();
		//throng.map(i=>grid[i.x][i.y].push(i));
		throng.map(i=>i.update());
		var deads = [];
		throng.map(i=>{
			if (i.activeAction!==BOMB) return;
			explosion.explode(i.x,i.y);
			var x = i.x, y = i.y;
			var adjacentCells = grid[x][y];
			if(x>0)adjacentCells=adjacentCells.concat(grid[x-1][y]);
			if(y>0)adjacentCells=adjacentCells.concat(grid[x][y-1]);
			if(x<gw-1)adjacentCells=adjacentCells.concat(grid[x+1][y]);
			if(y<gh-1)adjacentCells=adjacentCells.concat(grid[x][y+1]);
			adjacentCells.map(j=>{
				throng.splice(throng.indexOf(j),1);
				if(j.player)deads.push(j.player);
				if(i===j)return;
				if(j.player)i.player.points += 5;
				else        i.player.points -= 1;
			});
		});
		deads.map(i=>i.reassign());
		throng.map((e,i)=>{if(!e.player)e.pendingAction = ~~(random()*5)});
		console.log("P1: "+P1.points+" | P2: "+P2.points);
	}
}))();

}
