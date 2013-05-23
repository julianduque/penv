//
// Penv Tests
//
var penv = require('../lib/penv'),
	should = require('chai').should(),
	assert = require('chai').assert,
	rimraf = require('rimraf'),
	path = require('path'),
	fs = require('fs');

var testRoot = path.join(__dirname, 'root', 'app'),
    fixturesRoot = path.join(__dirname, 'fixtures'),
    fixtures = {
      "staging": fs.readFileSync(path.join(fixturesRoot, 'package-staging.json'), 'utf8'),
      "base": fs.readFileSync(path.join(fixturesRoot, 'package-base.json'), 'utf8')
    };

describe('Penv', function () {

  describe('#start() first: create backup', function () {
    it('should exist', function () {
      should.exist(penv.start);
    });

    before(function (next) {
      penv.config({
          root: testRoot,
          env: 'staging'
      });
      penv.start(function (err) {
        assert.ok(!err);
        next();
      });
    });

    it('backup package should exist', function () {
      var backupFile = fs.readFileSync(path.join(testRoot, '.package.json'), 'utf8');
      should.exist(backupFile);
    });

    it('should modify package.json', function () {
      var packageFile = fs.readFileSync(path.join(testRoot, 'package.json'), 'utf8');
      assert.deepEqual(JSON.parse(fixtures.staging), JSON.parse(packageFile));
    });
  });

  describe('#start() second: use backup', function () {
    it('should exist', function () {
      should.exist(penv.start);
    });

    before(function (next) {
      penv.config({
          root: testRoot,
          env: 'base'
      });
      penv.start(function (err) {
        assert.ok(!err);
        next();
      });
    });

    after(function (next) {
      rimraf(path.join(testRoot, '.package.json'), next)
    });

    it('should reset package.json', function () {
      var packageFile = fs.readFileSync(path.join(testRoot, 'package.json'), 'utf8');
      assert.deepEqual(JSON.parse(fixtures.base), JSON.parse(packageFile));
    });
  });

});