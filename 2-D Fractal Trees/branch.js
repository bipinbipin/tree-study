function Branch(parent, pos, dir) {
  this.parent = parent;
  this.pos = pos
  this.dir = dir;

  this.next = function() {
    var nextPos = p5.Vector.add(this.pos, this.dir);
    var nextBranch = new Branch(this, nextPos, this.dir.copy());
    return nextBranch;
  }

  this.show = function() {
    if (parent != null) {
      stroke(255);
      // console.log('draw branch ', this.pos, ' - parent: ', this.parent.pos)
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y)
    }
  }
}