module.exports = function(col, name) {
  return {
    col: col,
    name: name,
    init: function(fn) {
      this.col.insert({_id: this.name, seq: 1}, function(err, doc) {
        fn(err);
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
