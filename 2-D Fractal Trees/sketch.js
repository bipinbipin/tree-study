// https://www.youtube.com/watch?v=kKT0v3qhIQY

var tree;
var max_dist = 10;
var min_dist = 10;

function setup() {
	createCanvas(400, 400);
	tree = new Tree();
}

function draw() {
	background(51);
	tree.show();
}