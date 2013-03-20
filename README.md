# penv

A package.json environment customizer

Sometimes we need a different `package.json` for our different environments like production, development and testing. (Example `jitsu` deploys)

With `penv` you can customize your `package.json` file with the properties defined on a `penv-{env}.json` file

## Installation

```
$ npm install -g penv
```

## Example

Define a penv-{env}.json file with the customized properties

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

### penv-dev.json

```
{
  "name": "app-dev"
  "subdomain": "myapp-dev"
}
```

Then run

```
$ penv dev
```

And you will have a customized `package.json` like the following:

### customized package.json
```
{
  "name": "app-dev",
  "subdomain": "myapp-dev",
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

## License


The MIT License (MIT)
Copyright (c) 2013 Julián Duque

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.