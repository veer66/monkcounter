var assert = require("assert")
var db = require('monk')('localhost/katin_test');
var counterCol = db.get('counter');
require("../counter");

var Counter = require("../counter")(counterCol, "c1");

describe('Counter', function() {
  describe('next()', function() {
    beforeEach(function(done) {
      counterCol.remove({}, function(err) {
        if(err) {
          return done(err);
        }
        Counter.init(function(err) {
          if(err) {
            return done(err);
          }
          done();
        });
      });
    });

    it('should return 1, 2', function(done) {
      Counter.next(function(err, val) {
        if(err) {
          return done(err);
        }
        assert(val == 1);
        Counter.next(function(err2, val2) {
          if(err2) {
            return done(err2);
          } 
          assert(val2 == 2);
          done();
        });
      });
    });
  })
});
