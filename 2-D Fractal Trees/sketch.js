// https://www.youtube.com/watch?v=kKT0v3qhIQY

var tree;
var max_dist = 75;
var min_dist = 5;

function setup() {
	createCanvas(600, 600);
	tree = new Tree();
}

function draw() {
	background(20);
	tree.show();
	tree.grow();
}