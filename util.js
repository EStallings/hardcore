function rint(n) { return Math.floor(Math.random()*n); }
function rand(n) { return Math.random()*n; }

function lerp(v0, v1, t) {
	return (1-t)*v0 + t*v1;
}

function smootherstep(x)
{
	return x*x*x*(x*(x*6 - 15) + 10);
}

function easeOutExpo(x) {
	return -Math.pow( 2, -10 * x ) + 1;
}

function rangeVar(start, end) {
	return Math.random() * (end - start) + start;
}