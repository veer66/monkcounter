Monk Counter
============

Installation
------------
npm install monkcounter

Usage
-----

# Initialize

```javascript
  var db = require('monk')('localhost/test');
  var counterCol = db.get('counter');
  var counter  = require("monkcounter")(counterCol, "global");

  counter.init(function(err) {
    if(!err) {
      console.log("DONE");
      db.close();
    }
  });
```

# Count

```javascript
  var db = require('monk')('localhost/test');
  var counterCol = db.get('counter');
  var counter  = require("monkcounter")(counterCol, "global");

  counter.next(function(err, i) {
    if(!err) {
      console.log(i);
      db.close();
    }
  });
```
