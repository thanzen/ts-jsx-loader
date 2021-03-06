var assert = require("assert")
var fs = require('fs');
var path = require('path');
var jsxLoader = require('../index');

var context = {
    cacheable: function() {},
    emitError: function() {}
}

var files = fs.readdirSync(__dirname)
    .filter(function(f) { return path.extname(f) == '.test' })
    .forEach(function(f) {
        describe(path.basename(f, '.test'), function() {
            it('should have the correct output', function(done){
                fs.readFile(path.join(__dirname, f), {encoding: 'utf-8'}, function(err, testFile) {
                    if (err) return done(err)
                    fs.readFile(path.join(__dirname, f+'.output'), {encoding: 'utf-8'}, function(err, outputFile) {
                        if (err) return done(err)
                        
                        assert.equal(jsxLoader.call(context, testFile), outputFile);
                        done();
                    })
                })
          })
        })
    })
