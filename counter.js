module.exports = function(col, name) {
  return {
    col: col,
    name: name,
    init: function(fn) {
      var name = this.name;
      this.col.remove({_id:name}, function(err) {
        if(err) {
          return fn(err);
        }
        this.col.insert({_id: name, seq: 1}, function(err, doc) {
          fn(err);
        });
      });
    },
    next: function(fn) {
      this.col.findAndModify(
        {
          query: { _id: this.name },
          update: { $inc: { seq: 1 } },
          new: true
        }, function(err, doc) {
          fn(null, doc.seq);
        });
    }
  };
}

// Adapted from http://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/
