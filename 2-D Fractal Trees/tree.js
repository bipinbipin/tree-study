function Tree() {
	this.leaves = [];
	this.branches = [];

	for (var i = 0; i < 500; i++) {
		this.leaves.push(new Leaf());
	}

	var pos = createVector(width/2, height);
	var dir = createVector(0, -1);
	var root = new Branch(null, pos, dir)

	this.branches.push(root);

	var current = root;
	var found = false;

	while (!found) {
		for (var i = 0; i < this.leaves.length; i++) {
			var d = p5.Vector.dist(current.pos, this.leaves[i].pos);
			if (d < max_dist) {
				console.log('close leaf found')
				found = true;
			}
		}

		console.log('no close leaves found')
		if (!found) {
			var branch = current.next();
			current = branch;
			this.branches.push(current);
		}
	}

	// draw the tree
	this.show = function() {
		for (var i = 0; i < this.leaves.length; i++) {
			this.leaves[i].show();
		}

		// console.log(this.branches)
		for(var i = 0; i < this.branches.length; i++) {
			this.branches[i].show();
		}
	}

	this.grow = function() {
		
		// iterate thru each leaf
		for (var i = 0; i < this.leaves.length; i++) {
			var leaf = this.leaves[i];

			// figure out closest branch to leaf
			var closestBranch = null;
			// keep track of running record distance until you find min (closest)
			var record = max_dist;
			for (var j = 0; j < this.branches.length; j++) {
				var branch = this.branches[j];

				// DISTANCE BETWEEN LEAF AND BRANCH
				var d = p5.Vector.dist(leaf.pos, branch.pos)

				// closer than minimum 
				if (d < min_dist) {
					leaf.reached = true;
					closestBranch = null;
					break;
				} else if (d > max_dist) {

					// if first iteration or if new lower distance
				} else if (closestBranch == null || d < record) {
					closestBranch = branch;
					record = d;
				}
			}

				// close branch found
			if (closestBranch != null) {
				// pull the branch toward the leaf
				var newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
				newDir.normalize();
				closestBranch.dir.add(newDir)
				closestBranch.count++;
			}
		}

		// loop thru leaf array backwards
		// remove the ones that have achieved min_dist (reached)
		for (var i = this.leaves.length - 1; i >= 0; i--) {
			if (this.leaves[i].reached) {
				this.leaves.splice(i, 1);
			}
		}

		// loop thru branches 
		// figure out which branches were attracted to which leafs
		// (count greater than 0)
		for (var i = this.branches.length-1; i >= 0; i--) {
			var branch = this.branches[i];
			if (branch.count > 0) {
				branch.dir.div(branch.count);
				this.branches.push(branch.next());
				branch.reset();
			}	
		}
	}

}
