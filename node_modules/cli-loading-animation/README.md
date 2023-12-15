# cli-loading-animation

This library combines [cli-spinners](https://www.npmjs.com/package/cli-spinners) and [log-update](https://www.npmjs.com/package/log-update) to display a loading animation in CLI apps made with Node.

### Install

```sh
# NPM
npm install cli-loading-animation

# Yarn
yarn add cli-loading-animation
```

### Example

```javascript
const { loading } = require('cli-loading-animation');

const { start, stop } = loading('Loading..');

start();

setTimeout(() => stop(), 3000);
```

### Custom Spinner

```javascript
const { loading } = require('cli-loading-animation');
const spinners = require('cli-spinners');

const { start, stop } = loading('Loading..', { clearOnEnd: false, spinner: spinners.bouncingBall });

start();

setTimeout(() => stop(), 3000);
```

Where `spinner` can be a object with `frames` (an array of strings) and `interval` (a number) property.

The library [cli-spinners](https://www.npmjs.com/package/cli-spinners) already provide several spinners in this format.

### Options

| Option     | Description                                                                                  | Default Value                            |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| spinner    | Custom Spinner to use                                                                        | **dots** from the `cli-spinners` library |
| clearOnEnd | Specifies if the loading line on the console must be cleared on calling the `stop` function. | true                                     |

### License

MIT