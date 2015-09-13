var state = 0;

var image = src => {
	var retval = new Image();
	retval.src = src;
	return retval;
}

var tut1 = image('tut1.png');
var tut2 = image('tut2.png');
var tut3 = image('tut3.png');
var tut4 = image('tut4.png');
var tut5 = image('tut5.png');
var tut6 = image('tut6.png');
var p1up = image('p1up.png');
var p1down = image('p1down.png');
var p1left = image('p1left.png');
var p1right = image('p1right.png');
var p1core = image('p1core.png');
var p2up = image('p2up.png');
var p2down = image('p2down.png');
var p2left = image('p2left.png');
var p2right = image('p2right.png');
var p2core = image('p2core.png');
var p3up = image('p3up.png');
var p3down = image('p3down.png');
var p3left = image('p3left.png');
var p3right = image('p3right.png');
var p3core = image('p3core.png');
var p4up = image('p4up.png');
var p4down = image('p4down.png');
var p4left = image('p4left.png');
var p4right = image('p4right.png');
var p4core = image('p4core.png');
var begin = image('begin.png');

var showIntro = _ => {
  with(W.getContext('2d')) {
    rgb(0.9, 0.9, 0.9);
    shadowBlur = 0;
    var img = imgSwitch();

    fillRect(-200, -100, 400, 200);
    drawImage(img, -200, -100);
  }
};

var ctlU;
var ctlD;
var ctlL;
var ctlR;
var ctlB;
var boundKeys = [];
introKeyListener = e => {
  if (e.keyCode === 13) {
    if (state < 6) {state++;return;}
    if (state === 16) {init = false; return;}
    if (state === 21) {init = false; return;}
    if (state === 26) {init = false; return;}
    return; //Cannot bind enter to anything else.
  }
  if(e.keyCode === 32 && scrubs.length == 0) {
    state = 26;
    var P1 = new player(87, 83, 65, 68, 81);
    var P2 = new player(73, 75, 74, 76, 85);
  }
  if(boundKeys[e.keyCode]) return;
  if(state >= 6) boundKeys[e.keyCode] = true;

  if (state === 6) {ctlU = e.keyCode;state++;return;}
  if (state === 7) {ctlD = e.keyCode;state++;return;}
  if (state === 8) {ctlL = e.keyCode;state++;return;}
  if (state === 9) {ctlR = e.keyCode;state++;return;}
  if (state === 10) {
    ctlB = e.keyCode;state++;
    var P1 = new player(ctlU, ctlD, ctlL, ctlR, ctlB);
    return;
  }

  if (state === 11) {ctlU = e.keyCode;state++;return;}
  if (state === 12) {ctlD = e.keyCode;state++;return;}
  if (state === 13) {ctlL = e.keyCode;state++;return;}
  if (state === 14) {ctlR = e.keyCode;state++;return;}
  if (state === 15) {
    ctlB = e.keyCode;state++;
    var P2 = new player(ctlU, ctlD, ctlL, ctlR, ctlB);
    return;
  }

  if (state === 16) {ctlU = e.keyCode;state++;return;}
  if (state === 17) {ctlD = e.keyCode;state++;return;}
  if (state === 18) {ctlL = e.keyCode;state++;return;}
  if (state === 19) {ctlR = e.keyCode;state++;return;}
  if (state === 20) {
    ctlB = e.keyCode;state++;
    var P3 = new player(ctlU, ctlD, ctlL, ctlR, ctlB);
    return;
  }

  if (state === 21) {ctlU = e.keyCode;state++;return;}
  if (state === 22) {ctlD = e.keyCode;state++;return;}
  if (state === 23) {ctlL = e.keyCode;state++;return;}
  if (state === 24) {ctlR = e.keyCode;state++;return;}
  if (state === 25) {
    ctlB = e.keyCode;state++;
    var P4 = new player(ctlU, ctlD, ctlL, ctlR, ctlB);
    return;
  }
};

var imgSwitch = function() {


  var img = null;
  switch (state) {
    case 0: img = tut1; break;
    case 1: img = tut2; break;
    case 2: img = tut3; break;
    case 3: img = tut4; break;
    case 4: img = tut5; break;
    case 5: img = tut6; break;
    case 6: img = p1up; break;
    case 7: img = p1down; break;
    case 8: img = p1left; break;
    case 9: img = p1right; break;
    case 10: img = p1core; break;
    case 11: img = p2up; break;
    case 12: img = p2down; break;
    case 13: img = p2left;  break;
    case 14: img = p2right; break;
    case 15: img = p2core;  break;
    case 16: img = p3up;    break;
    case 17: img = p3down;  break;
    case 18: img = p3left;  break;
    case 19: img = p3right; break;
    case 20:  img = p3core;  break;
    case 21: img = p4up;    break;
    case 22: img = p4down;  break;
    case 23: img = p4left;  break;
    case 24: img = p4right; break;
    case 25:  img = p4core;  break;
    default: img = begin; break;
  }
  return img;
};
