var state = 0;

var showIntro = function() {
  with(W.getContext('2d')) {
    rgb(0.9, 0.9, 0.9);
    shadowBlur = 20;
    var img = imgSwitch();


    fillRect(-200, -100, 400, 200);
    drawImage(img, -200, -100);
  }
};

introKeyListener = e => {
  if (e.keyCode === 13) {
    if (state === 0) state = 1;
    if (state === 1) state = 2;
  }
}

var imgSwitch = function() {
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

  var img = null;
  if (state === 0) img = p1up;
  else img = p1down;

  return img;
};
