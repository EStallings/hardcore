with((D=document).body.appendChild(W=D.createElement("canvas")).getContext("2d"))with(Math){
var audio = new Audio('perturbator.mp3');
var BPM = 128;
audio.play();
audio.loop = true;
explosion.init();
backgroundEffects.init();
var resizeableCanvases = [BKG, W, peopleSprites.W, explosion.W, personDeathEffects.W, backgroundEffects.W];
var resizeableCtxs = resizeableCanvases.map(i=>i.getContext('2d'));
(onresize=e=>resizeableCanvases.map(c=>{c.width=ww=innerWidth;c.height=wh=innerHeight;}))();

//==  USER DEFINABLES  =======================================================//

var updateInterval    = (60000/BPM)*2;
var animationInterval = updateInterval/2;

var gw = 10;
var gh = 10;

var renderScale = 40;

//==  JS UTILS  ==============================================================//

var clamp = (i,n,x) => min(max(i,n),x);

var rgb = (r,g,b,a) => fillStyle=strokeStyle=shadowColor="rgba("+~~(255*r)+","+~~(255*g)+","+~~(255*b)+","+(a===0?0:a||1)+")";
var pushPop = f => { resizeableCtxs.map(i=>i.save()); f(); resizeableCtxs.map(i=>i.restore()); };
var fillCircle = (x,y,r) => { beginPath(); arc(x,y,r,0,2*PI); fill(); };


var id =_=>0;

//==  GAME UTILS  ============================================================//

animationInterval = min(updateInterval,animationInterval);
var updateTick = performance.now();
var animating = true;
var init = true;

var NONE  = 0;
var NORTH = 1;
var EAST  = 2;
var SOUTH = 3;
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
var AIs =[
	that=>{that.pendingAction = ~~(random()*5)},
	that=>{if(random() < 0.50) { that.memoryAction = rint(5);} that.pendingAction = that.memoryAction;},
	that=>{if(that.dist > that.prefDist) { that.dist = 0; that.memoryAction = ((that.memoryAction)%4)+1;} that.pendingAction = that.memoryAction; that.dist++;},
	that=>{if(that.dist > that.prefDist) { that.dist = 0; that.memoryAction--; if(that.memoryAction <= 0) that.memoryAction = 4;} that.pendingAction = that.memoryAction; that.dist++;}
];

var person = function (x,y) {
	throng.push(this);

	this.x = x;
	this.y = y;
	this.pendingAction = NONE;
	this.activeAction  = NONE;
	this.player = undefined;
	this.ai = AIs[rint(AIs.length)];
	this.px = this.x;
	this.py = this.y;
	this.prefDist = rint(3)+2;
	this.dist = this.prefDist+1;
	this.memoryAction = this.pendingAction;
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
	console.log(this);
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

// var P1 = new player(87,83,65,68,81);
// var P2 = new player(79,76,75,59,73);

var gameKeyListener = e => {
	var k = e.keyCode;
	scrubs.map(i=>{
		if(k===i.ctlU)i.person.pendingAction = NORTH;
		if(k===i.ctlL)i.person.pendingAction = EAST;
		if(k===i.ctlD)i.person.pendingAction = SOUTH;
		if(k===i.ctlR)i.person.pendingAction = WEST;
		if(k===i.ctlB)i.person.pendingAction = BOMB;
	});
};

onclick  =_=> audio.muted = !audio.muted;
//==  MAIN LOOP  =============================================================//

var tick=performance.now(),prevTick=tick;
(loop = _ => pushPop(_=>{animating && requestAnimationFrame(loop);
	prevTick=tick;tick=performance.now();
	resizeableCtxs.map(i=>i.clearRect(0,0,ww,wh));
	resizeableCtxs.map(i=>i.translate(ww/2,wh/2));

	drawBkg();

	pushPop(_=>{
		resizeableCtxs.map(i=>i.translate(-renderScale*gw/2,-renderScale*gh/2));

		rgb(0,0,0,0.3);

		for(var i=0;i<gw;++i)for(var j=0;j<gh;++j)
			fillCircle(i,j,0.05);

		var progress = clamp((tick-updateTick)/animationInterval,0,1);
		var invP = 1-progress;
		throng.sort((a,b)=>{if(a.y == b.y){return a.spriteId-b.spriteId} return a.y-b.y});
		throng.map(i=>actionSwitch(i.activeAction,
			_=>peopleSprites.drawPerson(i.x,i.y,i.spriteId,tick),
			_=>peopleSprites.drawPerson(i.x,i.y+invP,i.spriteId,tick),
			_=>peopleSprites.drawPerson(i.x,i.y-invP,i.spriteId,tick),
			_=>peopleSprites.drawPerson(i.x+invP,i.y,i.spriteId,tick),
			_=>peopleSprites.drawPerson(i.x-invP,i.y,i.spriteId,tick)
		));

		explosion.draw();
		personDeathEffects.process();
		backgroundEffects.draw(tick);
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
				console.log(j);
				personDeathEffects.newEffect(j.x, j.y,peopleSprites.sprites[j.spriteId].flairColor);
				if(j.player)deads.push(j.player);
				if(i===j)return;
				if(j.player)i.player.points += 5;
				else        i.player.points -= 1;
			});
		});
		deads.map(i=>i.reassign());
		throng.map((e,i)=>{if(!e.player)e.ai(e)});
		// console.log("P1: "+P1.points+" | P2: "+P2.points);
	}

	if(init) {
		showIntro();
		onkeydown = introKeyListener;
	}
	else
		onkeydown = gameKeyListener;
}))();

}
