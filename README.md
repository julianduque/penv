# penv

A package.json environment customizer

Sometimes we need a different `package.json` for our different environments like production, development and staging. (Example `jitsu` deploys)

With `penv` you can customize your `package.json` file with properties defined inside an `environments.json` file.

## Installation

```
$ npm install -g penv
```

## Example

Create your environments.json file with the customized properties

### package.json

```
{
  "name": "app",
  "subdomain": "myapp",
  "scripts": {
    "start": "node app.js"
  },
  "version": "0.0.1",
  "engines": {
    "node": "0.8.x"
  }
}
```

### environments.json

```
{
  "staging": {
    "name": "app-staging",
    "subdomain": "myapp-staging"
  }
}
```

Then run

```
$ penv staging
```

And you will have a customized `package.json` like the following:

### customized package.json
```
{
  "name": "app-staging",
  "subdomain": "myapp-staging",
  "scripts": {
    "start": "node app.js"
  },
  "version": "0.0.1",
  "engines": {
    "node": "0.8.x"
  }
}
```

The original `package.json` file will be renamed to `.package.json` for backup purposes.
You can restore your original package.json by running

```
$ penv base
```



## License

(MIT)