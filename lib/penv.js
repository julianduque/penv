//
// Require Dependencies
//
var async = require('utile').async,
    colors = require('colors'),
    fs = require('fs'),
    path = require('path'),
    utile = require('utile');

//
// Penv Module + Defaults
//
var penv = module.exports = {
  root: process.cwd() + '/',
  env: process.argv[2] || '',
  pkgName: 'package.json',
  envName: 'environments.json',
};

//
// Workflow
//
penv.start = function (next) {
  penv.config();
  async.waterfall([
    penv.getJSON,
    penv.writePackageJSON
  ], function (err) {
    next(err, penv.pkgFile);
  });
}

penv.config = function (opts) {
  if (opts) {
    utile.mixin(penv, opts);
  }
  // add root path to file names
  penv.pkgFile = path.join(penv.root, penv.pkgName);
  penv.envFile = path.join(penv.root, penv.envName);
  penv.bkpFile = path.join(penv.root, '.' + penv.pkgName);
}

penv.getJSON = function (next) {
  async.parallel([
    penv.getPackageJSON,
    penv.getEnvironmentJSON
  ], next);
}

//
// Look for backup file. If backup does not exist
// parse the original and create a backup
//
penv.getPackageJSON = function (next) {
  fs.readFile(penv.bkpFile, 'utf-8', function (err, file) {
    if (!err) {
      return penv.parseJSON(penv.bkpFile, file, next);
    }
    fs.readFile(penv.pkgFile, 'utf-8', function (err, file) {
      if (!err) {
        penv.createPackageBackup(function (err) {
          if (err) {
            return console.log('error: '.red + penv.bkpFile.grey + ' not created'.white);
          }
        })
        return penv.parseJSON(penv.pkgFile, file, next);
      }
      next('error: '.red + penv.pkgFile.grey + ' not found'.white);
    });
  });
}

penv.createPackageBackup = function (next) {
  return fs.rename(penv.pkgFile, penv.bkpFile, function (err) {
    if (err) {
      return next('error: '.red + ' backup failed'.white);
    }
    next(null);
  });
}

penv.getEnvironmentJSON = function (next) {
  fs.readFile(penv.envFile, 'utf-8', function (err, file) {
    if (err) {
      console.log(penv.envFile);
      return next('error: '.red + penv.envFile.grey + ' not found'.white)
    }
    penv.parseJSON(penv.envFile, file, function (err, parsed) {
      if (err) {
        return next(err);
      }
      if (parsed[penv.env]) {
        return next(null, parsed[penv.env]);
      }
      if (penv.env !== 'base') {
        console.log('\nwarning: '.red + penv.envFile.grey + ' does not contain property: '.white + penv.env.grey);
      }
      next(null, {});
    });
  });
}

penv.writePackageJSON = function (packages, next) {
  var merged = utile.mixin({}, packages[0], packages[1]);
  fs.writeFile(penv.pkgFile, JSON.stringify(merged, null, 2), function (err) {
    if (err) {
      return next('error: '.red + ' failed to write '.white + penv.pkgFile.grey);
    }
    next(null);
  });
}

penv.parseJSON = function (fileName, file, next) {
  var parsed;
  try {
    parsed = JSON.parse(file);
  } catch (e) {
    return next('error: '.red + ' failed to parse '.white + fileName.grey);
  }
  next(null, parsed);
}