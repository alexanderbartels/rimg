# rimg - responsive image creation
[![CircleCI](https://circleci.com/gh/alexanderbartels/rimg.svg?style=shield)](https://circleci.com/gh/alexanderbartels/rimg)
[![dependencies](https://david-dm.org/alexanderbartels/rimg/status.svg)](https://david-dm.org/alexanderbartels/rimg)
[![dev dependencies](https://david-dm.org/alexanderbartels/rimg/dev-status.svg)](https://david-dm.org/alexanderbartels/rimg?type=dev)
[![npm version](https://badge.fury.io/js/rimg-cli.svg)](https://www.npmjs.com/package/rimg-cli)

<p align="center">
 <a href="https://github.com/alexanderbartels/jet">
  <img alt="rimg logo" title="rimg" src="https://github.com/alexanderbartels/rimg/blob/master/logo.svg" width="164">
 </a>
</p>

Rimg is a command line tool created to make it easier to create optimized images for the web. `rimg` stands for *r*esponsive-*im*a*g*e.

```bash
// install rimg command globally via npm
$ npm install -g rimg-cli

// use it (show help)
$ rimg --help
```

## Documentation

A complete documentation can be found at our [documentation website](https://github.com/alexanderbartels/rimg) that is hosted via GitHub Pages. The source can be found inside the `docs` folder. We're using [docsify](https://docsify.js.org/) to generate the website from markdown files.

## Building yourself

Build is done via `npm scripts`. But for native packaging the `pgk` module is used. To build the native package, that don't need node.js installed at runtime, a custom `pkg`fork is needed, until the open pull requests are merged.

```bash
// complete build (don't forget to link the custom pkg module) 
$ npm run build

// if you're only want to provide the npm command locally and don't need the distribution packages
$ npm link
```

## Testing

Tests are written in Typescript and executed with the `Mocha` Framework. Assertions are done with the `chai` Library and Mocks should be created using `sinon`. To run the tests locally execute one of the following commands:

```bash
// run all kind of tests
$ npm run test

// run only source code related unit tests
$ npm run test:unit
```

## Releases

On Every commit or merge to the master Branch the `semantic-release` module will check if a release should be created. To take full advantage from the tool, commits should be done via `npm run commit`. The command uses the `commitizen` module to generate useful commit messages. These messages are used to generate the GitHub Release. This Build will be triggered via our CircleCI Build Environment.
